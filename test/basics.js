require('chai').should();

var Admin = require('../');

describe('Admin (Basics)', function () {

  var a;

  beforeEach(function () {
    a = Admin();
  })

  it('should exist', function () {
    a.should.be.an('object');
  })

  it('should createUser', function (done) {
    done();
  })
  it('should changePassword', function (done) {
    done();
  })
  it('should createDatabase', function (done) {
    done();
  })
  it('should grantMembership', function (done) {
    done();
  })
  it('should revokeMembership', function (done) {
    done();
  })
  it('should grantAdmin', function (done) {
    done();
  })
  it('should revokeAdmin', function (done) {
    done();
  })
  it('should removeUser', function (done) {
    done();
  })
  it('should removeDatabase', function (done) {
    done();
  })


})