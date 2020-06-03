"use strict";

var _apolloServerExpress = require("apollo-server-express");

var _schema = require("./graphql/schema");

var _resolvers = require("./graphql/resolvers");

var _express = _interopRequireDefault(require("./express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var server = new _apolloServerExpress.ApolloServer({
  typeDefs: _schema.typeDefs,
  resolvers: _resolvers.resolvers,
  context: function context(req) {
    return _objectSpread({}, req);
  }
});
server.applyMiddleware({
  app: _express["default"]
});

_express["default"].get('/', function (req, res) {
  res.send('trying to heroku!');
});

_express["default"].listen({
  port: 4000
}, function () {
  return console.log("\uD83D\uDE80 Server ready at http://localhost:4000".concat(server.graphqlPath));
});
//# sourceMappingURL=index.js.map