var request = require('request');
var qs = require('querystring');

function Admin (opts) {

  opts = opts || {};

  this.url = opts.url || 'http://localhost:5984';
  this.user = opts.user || 'admin';
  this.pass = opts.pass || 'mysecretpassword';
  this.db = opts.db || '_users';

}

Admin.prototype._request = function (method, db, data) {

}

Admin.prototype.createUser = function (user, pass, cb) {
  cb(null);
}
Admin.prototype.changePassword = function (user, pass, cb) {
  cb(null);
}
Admin.prototype.createDatabase = function (db, cb) {
  cb(null);
}
Admin.prototype.grantMembership = function (user, db, cb) {
  cb(null);
}
Admin.prototype.revokeMembership = function (user, db, cb) {
  cb(null);
}
Admin.prototype.grantAdmin = function (user, db, cb) {
  cb(null);
}
Admin.prototype.revokeAdmin = function (user, db, cb) {
  cb(null);
}
Admin.prototype.removeUser = function (user, cb) {
  cb(null);
}
Admin.prototype.removeDatabase = function (db, cb) {
  cb(null);
}

module.exports = Admin;