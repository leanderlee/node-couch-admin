var should = require('chai').should();
var Admin = require('../');

describe('Users', function () {

  var a = Admin();

  before(function (done) {
    a.removeDatabase('cdb-admin-test', function (err) {
      a.createDatabase('cdb-admin-test', function (err) {
        a.removeUser('tester', function (err) {
          done();
        })
      })
    })
  })

  it('should not get a removed user', function (done) {
    a.getUser('tester', function (err, user) {
      should.exist(err);
      done();
    });
  })

  it('should create a user of the same name', function (done) {
    a.createUser('tester', 'pass1', function (err) {
      should.not.exist(err);
      done();
    });
  })

  it('should get a newly created user', function (done) {
    a.getUser('tester', function (err, user) {
      should.not.exist(err);
      user.name.should.be.equal('tester');
      user.type.should.be.equal('user');
      done();
    });
  })

  it('should not verify a user with wrong password', function (done) {
    a.verifyUser('tester', 'wrongpass', function (err, cookie) {
      should.exist(err);
      done();
    });
  })

  it('should verify a user with correct password', function (done) {
    a.verifyUser('tester', 'pass1', function (err, cookie) {
      should.not.exist(err);
      cookie.should.be.a('string');
      cookie.should.match(/^AuthSession=/);
      done();
    });
  })

  it('should change a user password', function (done) {
    a.changePassword('tester', 'pass2', function (err) {
      should.not.exist(err);
      done();
    });
  })

  it('should not verify a user with old password', function (done) {
    a.verifyUser('tester', 'pass1', function (err, cookie) {
      should.exist(err);
      should.not.exist(cookie);
      done();
    });
  })

  it('should verify a user with new password', function (done) {
    a.verifyUser('tester', 'pass2', function (err, cookie) {
      should.not.exist(err);
      cookie.should.be.a('string');
      cookie.should.match(/^AuthSession=/);
      done();
    });
  })

  it('should not verify a user that does not exist', function (done) {
    a.verifyUser('fakeuser', '', function (err, cookie) {
      should.exist(err);
      should.not.exist(cookie);
      a.verifyUser('fakeuser', 'pass1', function (err, cookie) {
        should.exist(err);
        should.not.exist(cookie);
        done();
      });
    });
  })

  it('should not remove a user that does not exist', function (done) {
    a.removeUser('fakeuser', function (err) {
      should.exist(err);
      done();
    });
  })
  
  it('should remove a user', function (done) {
    a.removeUser('tester', function (err) {
      should.not.exist(err);
      done();
    });
  })

  it('should not get a removed user', function (done) {
    a.getUser('tester', function (err) {
      should.exist(err);
      done();
    });
  })
  


})