"use strict";

var _should = _interopRequireDefault(require("should"));

var _connection = _interopRequireDefault(require("../connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('connection tests', function () {
  it('should have properties and properties should be right types', function () {
    var shouldCon = (0, _should["default"])(_connection["default"]);
    shouldCon.be.a.Object();
    shouldCon.have.property('connect');
    (0, _should["default"])(_connection["default"].connect).be.a.Function();
  });
  it('connect() should return an object with expected properties and types thereof', function (done) {
    var con = _connection["default"].connect();

    (0, _should["default"])(con).be.a.Promise();
    con.then(function (_ref) {
      var session = _ref.session;
      console.log('test 2', session.query);
      (0, _should["default"])(session.query).be.a.Function();
      (0, _should["default"])(session.close).be.a.Function();
      done();
    });
  });
  it('query should return results', function (done) {
    var con = _connection["default"].connect();

    con.then(function (connection) {
      console.log(connection.session);
      var query = connection.session.query("SELECT * FROM V", {});
      console.log('query for events', query);
      query.all().then(function (results) {
        (0, _should["default"])(results).be.a.Array();
        (0, _should["default"])(results[0]).be.a.Object();
        done();
      });
    });
  });
});