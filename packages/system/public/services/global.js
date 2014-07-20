'use strict';

//Global service for global variables
angular.module('mean.system').factory('Global', ['$rootScope',

  function($rootScope) {
    var _this = this;
    _this._data = {
      user: (!$rootScope.user || angular.equals({}, $rootScope.user)) ? window.user : $rootScope.user,
      // if $rootScope.user does not have real user, fall back on window.user
      authenticated: false,
      isAdmin: false
    };
    if (window.user && window.user.roles) {
      _this._data.authenticated = window.user.roles.length;
      _this._data.isAdmin = window.user.roles.indexOf('admin') !== -1;
    }

      console.log('Global says user is: ' + JSON.stringify(_this._data));
    return _this._data;
  }
]);
