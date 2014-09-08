var fs = require('fs');
var request = require('request');
var util = require('util');

var courses = [];
getPage = function(n){
	var page = request('http://www.dgcoursereview.com/course.php?id=' + n)
	.pipe(fs.createWriteStream('page' + n + '.html'));
}
parseCourse = function(ref){
	fs.readFile(ref, 'utf8', function(err, data){
		if (err){
			console.log(err);
		} else {
			var start = data.indexOf('og:title" content=');
			var end = data.indexOf('<meta property="og:type');
			this.name = data.slice(start + 19, end - 4);
			start = data.indexOf('og:latitude" content=');
			end = data.indexOf('<meta property="og:longitude')
			this.lat = data.slice(start + 22, end - 4);
			start = data.indexOf('og:longitude" content=');
			end = data.indexOf('<meta property="og:street-address');
			this.lng = data.slice(start + 23, end - 4);
			return this;
		}
	});
}
for (var i = 10; i < 100; i++){
	courses[i] = new parseCourse('page' + i + '.html');
	console.log(courses[i]);
}
var coursesJSON = {};
coursesJSON.list = courses;
coursesJSON = util.inspect(coursesJSON);
fs.writeFile('courses.json', coursesJSON, function(err){
	if (err) throw err;
});
/*
var util = require('util'),
	twitter = require('twitter');
var twit = new twitter({
	consumer_key: 'Fajita_Mane',
	consumer_secret: '735405127',
	access_token_key: 'oRUmDe3QJoF4iwKiaPMGQ',
	access_token_secret: 'dJYV62pmLnwUXpG7T24uCDqjB1nvTgN3YG6kb4eQTI'
});
fs.readFile('players.txt', 'utf8', function (err, data) {
  if (err) {
	console.log(err);
  } else {
		console.log(data);
		var names = [];
		var line = "";
		for (var i = 0; i < data.length; i++){
			if (data[i] === "n" && data[i + 1] == " "){
				names.push(line)
				line = "";
			} else {
				line += data[i];
			}
		}
		console.log(names);
	}
});
*/
