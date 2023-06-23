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
exports.post_comment_delete = exports.post_comment_get = exports.post_commentlist_post = exports.post_commentlist_get = exports.post_delete = exports.post_put = exports.post_get = exports.postlist_post = exports.postlist_get = void 0;
const message_1 = __importDefault(require("../models/message"));
const posts_1 = __importDefault(require("../models/posts"));
const express_validator_1 = require("express-validator");
const postlist_get = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const content = yield posts_1.default.find({}, '-__v').exec();
        if (content.length) {
            return res.status(200).json({
                content
            });
        }
        res.status(404).json({
            error: 404,
            message: 'No Posts Found'
        });
    }
    catch (err) {
        next(err);
    }
});
exports.postlist_get = postlist_get;
exports.postlist_post = [
    (0, express_validator_1.body)('postTitle').trim().isLength({ min: 1 }).escape().withMessage("Title can't be empty"),
    (0, express_validator_1.body)('postBody').trim().isLength({ min: 1 }).escape().withMessage("Body can't be empty"),
    (req, res, next) => {
        const { postTitle, postBody } = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        const post = new posts_1.default({
            postTitle,
            postBody
        });
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        else {
            post.save((err) => {
                if (err) {
                    return next(err);
                }
                res.status(200).json({
                    message: 'Post Created Succesfully'
                });
            });
        }
    }
];
const post_get = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const content = yield posts_1.default.findById(req.params.postid, '-__v').exec();
        if (!content) {
            return res.status(404).json({
                error: 404,
                message: 'Post Not Found'
            });
        }
        res.status(200).json({
            content
        });
    }
    catch (err) {
        next(err);
    }
});
exports.post_get = post_get;
exports.post_put = [
    (0, express_validator_1.body)('postTitle').trim().isLength({ min: 1 }).escape().withMessage("Title can't be empty"),
    (0, express_validator_1.body)('postBody').trim().isLength({ min: 1 }).escape().withMessage("Body can't be empty"),
    (req, res, next) => {
        const { postTitle, postBody } = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        else {
            posts_1.default.findByIdAndUpdate(req.params.postid, { postTitle: postTitle, postBody: postBody }, {}, function (err, result) {
                if (err) {
                    return res.status(400).json({
                        message: 'Post Update Failed',
                    });
                }
                res.status(200).json({
                    message: 'Post Sucessfully Updated'
                });
            });
        }
    }
];
const post_delete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const content = yield posts_1.default.findById(req.params.postid).exec();
        const deletePost = yield content.deleteOne();
        if (!deletePost) {
            return res.status(400).json({
                message: 'Post failed to delete'
            });
        }
        res.status(200).json({
            message: 'Post Sucessfully Deleted along with all associated comments'
        });
    }
    catch (err) {
        next(err);
    }
});
exports.post_delete = post_delete;
const post_commentlist_get = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const content = yield message_1.default.find({ post: req.params.postid }, '-__v -post').exec();
        if (!content.length) {
            return res.status(404).json({
                error: 404,
                message: 'No comments found in this post'
            });
        }
        res.status(200).json({
            comments: content
        });
    }
    catch (err) {
        next(err);
    }
});
exports.post_commentlist_get = post_commentlist_get;
exports.post_commentlist_post = [
    (0, express_validator_1.body)('postedBy').trim().isLength({ min: 1 }).escape().withMessage("Username can't be empty"),
    (0, express_validator_1.body)('msgBody').trim().isLength({ min: 1 }).escape().withMessage("Body can't be empty"),
    (req, res, next) => {
        const { postedBy, msgBody } = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        const msg = new message_1.default({
            postedBy,
            msgBody,
            post: req.params.postid
        });
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        else {
            msg.save((err) => {
                if (err) {
                    return next(err);
                }
                else {
                    posts_1.default.findByIdAndUpdate({ _id: req.params.postid }, { $push: { postComments: msg } }, function (err, result) {
                        if (err) {
                            return next(err);
                        }
                        res.status(200).json({
                            message: 'Message created succesfully'
                        });
                    });
                }
            });
        }
    }
];
const post_comment_get = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const content = yield message_1.default.findById(req.params.commentid, '-__v -post').exec();
        if (!content) {
            return res.status(404).json({
                error: 404,
                message: 'Comment Not Found'
            });
        }
        res.status(200).json({
            content
        });
    }
    catch (err) {
        next(err);
    }
});
exports.post_comment_get = post_comment_get;
const post_comment_delete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const content = yield message_1.default.findById(req.params.commentid).exec();
        const deleteMsg = yield (content === null || content === void 0 ? void 0 : content.deleteOne());
        if (!deleteMsg) {
            return res.status(400).json({
                message: 'Failed to delete comment'
            });
        }
        res.status(200).json({
            message: 'Comment Deleted Sucessfully'
        });
    }
    catch (err) {
        next(err);
    }
});
exports.post_comment_delete = post_comment_delete;
