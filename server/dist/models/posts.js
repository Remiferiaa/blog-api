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
const message_1 = __importDefault(require("./message"));
const luxon_1 = require("luxon");
const PostSchema = new mongoose_2.Schema({
    postedAt: { type: Date, default: Date.now },
    postTitle: { type: String, required: true },
    postBody: { type: String, required: true },
    postComments: [{ type: mongoose_2.Schema.Types.ObjectId, ref: 'Message' }],
}, { id: false });
PostSchema.pre('deleteOne', { document: true }, function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const current = this;
        yield message_1.default.deleteMany({ post: current._id });
        next();
    });
});
PostSchema
    .virtual('published')
    .get(function () {
    return luxon_1.DateTime.fromJSDate(this.postedAt).toLocaleString(luxon_1.DateTime.DATE_MED);
});
PostSchema.virtual('commentCount').get(function () {
    return this.postComments.length;
});
PostSchema.set('toJSON', { getters: false, virtuals: true });
exports.default = mongoose_1.default.model('Post', PostSchema);
