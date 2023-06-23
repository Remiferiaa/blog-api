"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const posts_1 = __importDefault(require("./posts"));
const luxon_1 = require("luxon");
const MessageSchema = new mongoose_2.Schema({
    postedAt: { type: Date, default: Date.now },
    postedBy: { type: String, required: true },
    msgBody: { type: String, required: true },
    post: { type: mongoose_2.Schema.Types.ObjectId, ref: 'Post' }
}, { id: false });
MessageSchema.pre('deleteOne', { document: true }, function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const current = this;
        yield posts_1.default.updateOne({ _id: current.post }, { "$pull": { postComments: current._id } });
        next();
    });
});
MessageSchema
    .virtual('posted')
    .get(function () {
    return luxon_1.DateTime.fromJSDate(this.postedAt).toLocaleString(luxon_1.DateTime.DATE_MED);
});
MessageSchema.set('toJSON', { getters: false, virtuals: true });
exports.default = mongoose_1.default.model('Message', MessageSchema);
