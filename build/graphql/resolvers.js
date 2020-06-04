"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _users = _interopRequireDefault(require("./../models/users"));

var _posts = _interopRequireDefault(require("./../models/posts"));

var _contactus = _interopRequireDefault(require("./../models/contactus"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require("@babel/polyfill");

var resolvers = {
  Query: {
    user: function () {
      var _user = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var users;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _users["default"].find({});

              case 2:
                users = _context.sent;
                console.log(users.name);
                return _context.abrupt("return", users);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function user() {
        return _user.apply(this, arguments);
      }

      return user;
    }()
  },
  Mutation: {
    signup: function () {
      var _signup = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(root, args, ctx, info) {
        var existUser, hashPassword, user, result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _users["default"].findOne({
                  email: args.email
                });

              case 2:
                existUser = _context2.sent;

                if (!existUser) {
                  _context2.next = 5;
                  break;
                }

                throw new Error('User exists already.');

              case 5:
                _context2.next = 7;
                return _bcrypt["default"].hash(args.password, 12);

              case 7:
                hashPassword = _context2.sent;
                user = new _users["default"]({
                  name: args.name,
                  email: args.email,
                  password: hashPassword
                });
                _context2.next = 11;
                return user.save();

              case 11:
                result = _context2.sent;
                return _context2.abrupt("return", result);

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function signup(_x, _x2, _x3, _x4) {
        return _signup.apply(this, arguments);
      }

      return signup;
    }(),
    login: function () {
      var _login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(root, args, ctx, info) {
        var user, pwdMatch, token;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _users["default"].findOne({
                  email: args.email
                });

              case 2:
                user = _context3.sent;

                if (user) {
                  _context3.next = 5;
                  break;
                }

                throw new Error('User does not exist!');

              case 5:
                _context3.next = 7;
                return _bcrypt["default"].compare(args.password, user.password);

              case 7:
                pwdMatch = _context3.sent;
                console.log(pwdMatch, args.password);

                if (pwdMatch) {
                  _context3.next = 11;
                  break;
                }

                throw new Error('Incorrect Credentials');

              case 11:
                token = _jsonwebtoken["default"].sign({
                  userId: user._id,
                  email: user.email
                }, 'secretkey', {
                  expiresIn: '1h'
                });
                return _context3.abrupt("return", {
                  token: token,
                  tokenExpire: 1
                });

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function login(_x5, _x6, _x7, _x8) {
        return _login.apply(this, arguments);
      }

      return login;
    }(),
    addPost: function () {
      var _addPost = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(root, args, ctx, info) {
        var Authorization, token, verifiedPlayLoad, payload, post, result, creator;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                console.log(ctx);
                Authorization = ctx.req.get("Authorization");
                console.log(Authorization);
                token = Authorization ? Authorization.replace("Bearer ", "") : new AuthenticationError("Auth Token Missing");
                _context4.next = 6;
                return _jsonwebtoken["default"].verify(token, 'secretkey');

              case 6:
                verifiedPlayLoad = _context4.sent;

                if (verifiedPlayLoad) {
                  _context4.next = 9;
                  break;
                }

                throw new AuthenticationError("Unauthenticated");

              case 9:
                _context4.next = 11;
                return _jsonwebtoken["default"].decode(token);

              case 11:
                payload = _context4.sent;
                console.log(payload);
                post = new _posts["default"]({
                  title: args.title,
                  description: args.description,
                  creator: payload.id
                });
                _context4.next = 16;
                return post.save();

              case 16:
                result = _context4.sent;
                _context4.next = 19;
                return _users["default"].findById(req.userId);

              case 19:
                creator = _context4.sent;

                if (creator) {
                  _context4.next = 22;
                  break;
                }

                throw new Error('User not found.');

              case 22:
                _context4.next = 24;
                return creator.save();

              case 24:
                return _context4.abrupt("return", post);

              case 25:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function addPost(_x9, _x10, _x11, _x12) {
        return _addPost.apply(this, arguments);
      }

      return addPost;
    }(),
    addContact: function () {
      var _addContact = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(root, args, ctx, info) {
        var contact, result;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                contact = new _contactus["default"]({
                  name: args.name,
                  mobile: args.mobile,
                  email: args.email,
                  description: args.description
                });
                result = contact.save();
                return _context5.abrupt("return", result);

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function addContact(_x13, _x14, _x15, _x16) {
        return _addContact.apply(this, arguments);
      }

      return addContact;
    }()
  }
};
exports.resolvers = resolvers;
//# sourceMappingURL=resolvers.js.map