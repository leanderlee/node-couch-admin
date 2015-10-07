var request = require('request');
var qs = require('querystring');

function Admin (opts) {

  opts = opts || {};

  this.url = opts.url || 'http://localhost:5984';
  this.user = opts.user || 'admin';
  this.pass = opts.pass || 'mysecretpassword';
  this.user_id_prefix = opts.user_id_prefix || 'org.couchdb.user';
  this.user_db = opts.user_db || '_users';
  this.config_db = opts.config_db || '_users';
  this.session_db = opts.session_db || '_session';

}

Admin.prototype._username = function (name) {
  return this.user_id_prefix + ':' + name;
}
Admin.prototype._request = function (method, url, data, headers, cb) {
  headers = headers || {};
  var opts = {
    url: this.url + '/' + url,
    auth: { user: this.user, pass: this.pass },
    headers: headers,
    json: true
  };
  request(opts, function (err, res, body) {
    if (err) return cb(err);
    if (res.statusCode >= 400) return cb({ error: true, status: res.statusCode });
    cb(null, body, res);
  })
}

Admin.prototype.createAdmin = function (user, pass, cb) {
  this._request('PUT', this.config_db + '/admins/' + user, pass, null, cb);
}
Admin.prototype.removeAdmin = function (user, cb) {
  this._request('DELETE', this.config_db + '/admins/' + user, null, null, cb);
}
Admin.prototype.getAdmins = function (cb) {
  this._request('GET', this.config_db + '/admins/' + user, null, null, cb);
}

Admin.prototype.getUser = function (user, cb) {
  this._request('GET', this.user_db + '/' + this._username(user), null, null, cb);
}
Admin.prototype.verifyUser = function (user, password, cb) {
  this._request('POST', this.session_db, { name: user, password: password }, null, cb);
}
Admin.prototype.createUser = function (user, pass, cb) {
  this._request('PUT', this.user_db + '/' + this._username(user), {
    name: user,
    type: 'user',
    roles: [],
    password: pass
  }, null, cb);
}
Admin.prototype.changePassword = function (user, pass, cb) {
  var self = this;
  self.getUser(user, function (err, userObj) {
    if (err) return cb(err);
    self._request('PUT', this.user_db + '/' + self._username(user), {
      name: user,
      type: 'user',
      roles: userObj.roles || [],
      password: pass
    }, { 'If-Match': userObj._rev }, cb);
  })
}
Admin.prototype.removeUser = function (user, cb) {
  var self = this;
  self.getUser(user, function (err, userObj) {
    if (err) return cb(err);
    var headers = null;
    if (userObj && userObj._rev) {
      headers['If-Match'] = userObj._rev;
    }
    self._request('DELETE', this.user_db + '/' + self._username(user), null, headers, cb);
  })
}

Admin.prototype.createDatabase = function (db, cb) {
  this._request('PUT', db, null, null, cb);
}
Admin.prototype.removeDatabase = function (db, cb) {
  this._request('DELETE', db, null, null, cb);
}

Admin.prototype.getPermissions = function (db, cb) {
  this._request('GET', db + '/_security', null, null, cb); 
}
Admin.prototype.grantMembership = function (user, db, cb) {
  self.getPermissions(db, function (err, perms) {
    if (err) return cb(err);
    var headers = null;
    if (perms && perms._rev) {
      headers['If-Match'] = perms._rev;
    }
    perms.admins = perms.admins || { names: [], roles: [] };
    perms.members = perms.members || { names: [], roles: [] };
    var pos = perms.members.names.indexOf(user);
    if (pos === -1) {
      perms.members.names.push(user);
    }
    this._request('PUT', db + '/_security', perms, headers, cb);
  });
}
Admin.prototype.revokeMembership = function (user, db, cb) {
  self.getPermissions(db, function (err, perms) {
    if (err) return cb(err);
    var headers = null;
    if (perms && perms._rev) {
      headers['If-Match'] = perms._rev;
    }
    perms.admins = perms.admins || { names: [], roles: [] };
    perms.members = perms.members || { names: [], roles: [] };
    var pos = perms.members.names.indexOf(user);
    if (pos !== -1) {
      perms.members.names.splice(pos, 1);
    }
    this._request('PUT', db + '/_security', perms, headers, cb);
  });
}
Admin.prototype.grantAdmin = function (user, db, cb) {
  self.getPermissions(db, function (err, perms) {
    if (err) return cb(err);
    var headers = null;
    if (perms && perms._rev) {
      headers['If-Match'] = perms._rev;
    }
    perms.admins = perms.admins || { names: [], roles: [] };
    perms.members = perms.members || { names: [], roles: [] };
    var pos = perms.admins.names.indexOf(user);
    if (pos === -1) {
      perms.admins.names.push(user);
    }
    this._request('PUT', db + '/_security', perms, headers, cb);
  });
}
Admin.prototype.revokeAdmin = function (user, db, cb) {
  self.getPermissions(db, function (err, perms) {
    if (err) return cb(err);
    var headers = null;
    if (perms && perms._rev) {
      headers['If-Match'] = perms._rev;
    }
    perms.admins = perms.admins || { names: [], roles: [] };
    perms.members = perms.members || { names: [], roles: [] };
    var pos = perms.admins.names.indexOf(user);
    if (pos !== -1) {
      perms.admins.names.splice(pos, 1);
    }
    this._request('PUT', db + '/_security', perms, headers, cb);
  });
}

module.exports = function (opts) {
  return new Admin(opts);
}