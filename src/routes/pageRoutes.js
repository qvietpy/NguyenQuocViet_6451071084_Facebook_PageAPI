const express = require("express");
const router = express.Router();
const controller = require("../controllers/pageController");

/**
 * @swagger
 * tags:
 *   name: Page API
 *   description: Endpoints cho Facebook Page Graph API
 */

/**
 * @swagger
 * /api/page/{pageId}:
 *   get:
 *     summary: Lấy thông tin page
 *     tags: [Page API]
 *     parameters:
 *       - in: path
 *         name: pageId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get("/page/:pageId", controller.getPageInfo);

/**
 * @swagger
 * /api/page/{pageId}/posts:
 *   get:
 *     summary: Lấy danh sách bài viết của page
 *     tags: [Page API]
 *     parameters:
 *       - in: path
 *         name: pageId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get("/page/:pageId/posts", controller.getPagePosts);

/**
 * @swagger
 * /api/page/{pageId}/posts:
 *   post:
 *     summary: Tạo bài viết mới cho page
 *     tags: [Page API]
 *     parameters:
 *       - in: path
 *         name: pageId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *             required:
 *               - message
 *     responses:
 *       201:
 *         description: Tạo bài viết thành công
 */
router.post("/page/:pageId/posts", controller.createPagePost);

/**
 * @swagger
 * /api/page/post/{postId}:
 *   delete:
 *     summary: Xóa bài viết
 *     tags: [Page API]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa thành công
 */
router.delete("/page/post/:postId", controller.deletePost);

/**
 * @swagger
 * /api/page/post/{postId}/comments:
 *   get:
 *     summary: Lấy comments của bài viết
 *     tags: [Page API]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get("/page/post/:postId/comments", controller.getPostComments);

/**
 * @swagger
 * /api/page/post/{postId}/likes:
 *   get:
 *     summary: Lấy likes của bài viết
 *     tags: [Page API]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get("/page/post/:postId/likes", controller.getPostLikes);

/**
 * @swagger
 * /api/page/{pageId}/insights:
 *   get:
 *     summary: Lấy insights của page
 *     description: Có thể truyền metric qua query string, ví dụ ?metric=page_fans
 *     tags: [Page API]
 *     parameters:
 *       - in: path
 *         name: pageId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: metric
 *         required: false
 *         schema:
 *           type: string
 *           example: page_fans
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get("/page/:pageId/insights", controller.getPageInsights);

module.exports = router;