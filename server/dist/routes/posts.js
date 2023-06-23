"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controllers/postController");
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
router.route('/posts')
    .get(postController_1.postlist_get)
    .post(authController_1.authVer, postController_1.postlist_post);
router.route('/posts/:postid')
    .get(postController_1.post_get)
    .put(authController_1.authVer, postController_1.post_put)
    .delete(authController_1.authVer, postController_1.post_delete);
router.route('/posts/:postid/comments')
    .get(postController_1.post_commentlist_get)
    .post(postController_1.post_commentlist_post);
router.route('/posts/:postid/comments/:commentid')
    .get(postController_1.post_comment_get)
    .delete(authController_1.authVer, postController_1.post_comment_delete);
exports.default = router;
