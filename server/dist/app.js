"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const login_1 = __importDefault(require("./routes/login"));
const posts_1 = __importDefault(require("./routes/posts"));
const cors_1 = __importDefault(require("cors"));
const http_errors_1 = __importDefault(require("http-errors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const user_1 = __importDefault(require("./models/user"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JwtStrategy = passport_jwt_1.default.Strategy;
const ExtractJwt = passport_jwt_1.default.ExtractJwt;
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
};
passport_1.default.use(new JwtStrategy(opts, function (jwt_payload, done) {
    user_1.default.findOne({ _id: jwt_payload.owner._id }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    });
}));
const app = (0, express_1.default)();
const mongoDB = process.env.DB;
mongoose_1.default.connect(mongoDB);
const db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
app.use((0, compression_1.default)());
app.use((0, helmet_1.default)());
app.use('/', login_1.default);
app.use('/api', posts_1.default);
app.listen(process.env.PORT, () => console.log(`App listening on port ${process.env.PORT}`));
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500).json({
        error: err.status,
        message: err.message
    });
});
