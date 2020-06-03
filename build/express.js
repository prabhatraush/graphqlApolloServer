"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var dotenv = require('dotenv');

dotenv.config();
var url = process.env.MONGO_URL || "mongodb+srv://prabhatraushan:Ssq8CgcSFya7qBfG@mongodbeah-wq8qy.mongodb.net/test?retryWrites=true&w=majority";

_mongoose["default"].connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

var app = (0, _express["default"])();
app.use((0, _cookieParser["default"])()); // Serve only the static files form the dist directory

app.use(_express["default"]["static"]("./../build"));
app.get('/*', function (req, res) {
  res.sendFile(_path["default"].join(__dirname, './../build/index.js'));
});
var _default = app;
exports["default"] = _default;
//# sourceMappingURL=express.js.map