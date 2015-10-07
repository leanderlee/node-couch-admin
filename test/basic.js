var should = require('chai').should();
var Admin = require('../');

describe('Basic', function () {

  it('should exist', function () {
    var a = Admin();
    a.should.be.an('object');
  })

})