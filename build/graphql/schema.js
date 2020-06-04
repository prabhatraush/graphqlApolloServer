"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeDefs = void 0;

var _apolloServerExpress = require("apollo-server-express");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n type Query {\n     user: User!\n }\n\n type User {\n    _id: ID!\n    name: String!\n    email: String!\n    password: String\n    createdPosts: [Post!]\n  }\n\n type Post {\n    _id: ID!\n    title: String!\n    description: String!\n    createdAt: String!\n    creator: User!\n  }\n\n  type AuthData {\n      token: String!\n      tokenExpire: Int!\n  }\n\n  type Mutation {\n      signup(name: String, email: String, password: String): User\n      login(email: String, password: String): AuthData\n      addPost(title: String, description: String): Post\n  }\n\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var typeDefs = (0, _apolloServerExpress.gql)(_templateObject());
exports.typeDefs = typeDefs;
//# sourceMappingURL=schema.js.map