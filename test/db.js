var should = require('chai').should();
var Admin = require('../');

describe('Database', function () {

  var a = Admin();

  before(function (done) {
    a.removeDatabase('cdb-admin-test', function (err) {
      done();
    });
  });

  after(function (done) {
    a.removeDatabase('cdb-admin-test', function (err) {
      done();
    })
  })

  it('should create db', function (done) {
    a.createDatabase('cdb-admin-test', function (err) {
      should.not.exist(err);
      done();
    });
  })

  it('should not create another db with same name', function (done) {
    a.createDatabase('cdb-admin-test', function (err) {
      should.exist(err);
      done();
    });
  })

  it('should remove db', function (done) {
    a.createDatabase('cdb-admin-test', function (err) {
      should.exist(err);
      a.removeDatabase('cdb-admin-test', function (err) {
        should.not.exist(err);
        a.createDatabase('cdb-admin-test', function (err) {
          should.not.exist(err);
          done();
        });
      });
    });
  })

})