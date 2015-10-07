var should = require('chai').should();
var Admin = require('../');

describe('Permissions', function () {

  var a = Admin();

  before(function (done) {
    a.removeDatabase('cdb-admin-test', function (err) {
      a.createDatabase('cdb-admin-test', function (err) {
        a.createUser('tester', 'pass0', function (err) {
          done();
        })
      })
    })
  })

  after(function (done) {
    a.grantAdmin('tester', 'cdb-admin-test', function (err) {
      a.grantMembership('tester', 'cdb-admin-test', function (err) {
        done();
      })
    })
  })

  it('should get empty perms', function (done) {
    a.getPermissions('cdb-admin-test', function (err, perms) {
      perms.should.be.eql({})
      done();
    });
  })

  it('should grant member permissions', function (done) {
    a.grantMembership('tester', 'cdb-admin-test', function (err) {
      should.not.exist(err);
      a.getPermissions('cdb-admin-test', function (err, perms) {
        perms.should.be.an('object');
        perms.members.should.be.an('object');
        perms.members.names.should.be.an('array');
        perms.members.roles.should.be.an('array');
        perms.admins.should.be.an('object');
        perms.admins.names.should.be.an('array');
        perms.admins.roles.should.be.an('array');
        perms.members.names.should.contain('tester');
        perms.admins.names.should.not.contain('tester');
        done();
      });
    });
  })

  it('should revoke member permissions', function (done) {
    a.revokeMembership('tester', 'cdb-admin-test', function (err) {
      should.not.exist(err);
      a.getPermissions('cdb-admin-test', function (err, perms) {
        perms.should.be.an('object');
        perms.members.names.should.not.contain('tester');
        perms.admins.names.should.not.contain('tester');
        done();
      });
    });
  })

  it('should grant admin permissions', function (done) {
    a.grantAdmin('tester', 'cdb-admin-test', function (err) {
      should.not.exist(err);
      a.getPermissions('cdb-admin-test', function (err, perms) {
        perms.should.be.an('object');
        perms.members.names.should.not.contain('tester');
        perms.admins.names.should.contain('tester');
        done();
      });
    });
  })

  it('should revoke admin permissions', function (done) {
    a.revokeAdmin('tester', 'cdb-admin-test', function (err) {
      should.not.exist(err);
      a.getPermissions('cdb-admin-test', function (err, perms) {
        perms.should.be.an('object');
        perms.members.names.should.not.contain('tester');
        perms.admins.names.should.not.contain('tester');
        done();
      });
    });
  })

  it('should grant both permissions', function (done) {
    a.grantAdmin('tester', 'cdb-admin-test', function (err) {
      a.grantMembership('tester', 'cdb-admin-test', function (err) {
        should.not.exist(err);
        a.getPermissions('cdb-admin-test', function (err, perms) {
          perms.should.be.an('object');
          perms.members.names.should.contain('tester');
          perms.admins.names.should.contain('tester');
          done();
        });
      });
    });
  })

})