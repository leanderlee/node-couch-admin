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
    
  })
  it('should changePassword', function (done) {

  })
  it('should createDatabase', function (done) {

  })
  it('should grantMembership', function (done) {

  })
  it('should revokeMembership', function (done) {

  })
  it('should grantAdmin', function (done) {

  })
  it('should revokeAdmin', function (done) {

  })
  it('should removeUser', function (done) {

  })
  it('should removeDatabase', function (done) {

  })


})