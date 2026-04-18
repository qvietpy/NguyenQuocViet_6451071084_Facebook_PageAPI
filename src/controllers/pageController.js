const metaService = require("../services/metaService");

const getPageInfo = async (req, res) => {
  try {
    const { pageId } = req.params;
    const data = await metaService.getPageInfo(pageId);
    res.json(data);
  } catch (error) {
    res.status(error.status || 500).json(error);
  }
};

const getPagePosts = async (req, res) => {
  try {
    const { pageId } = req.params;
    const data = await metaService.getPagePosts(pageId);
    res.json(data);
  } catch (error) {
    res.status(error.status || 500).json(error);
  }
};

const createPagePost = async (req, res) => {
  try {
    const { pageId } = req.params;
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        status: 400,
        message: "message is required"
      });
    }

    const data = await metaService.createPagePost(pageId, message);
    res.status(201).json({
      success: true,
      postId: data.id,
      raw: data
    });
  } catch (error) {
    res.status(error.status || 500).json(error);
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const data = await metaService.deletePost(postId);

    res.json({
      success: true,
      raw: data
    });
  } catch (error) {
    res.status(error.status || 500).json(error);
  }
};

const getPostComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const data = await metaService.getPostComments(postId);
    res.json(data);
  } catch (error) {
    res.status(error.status || 500).json(error);
  }
};

const getPostLikes = async (req, res) => {
  try {
    const { postId } = req.params;
    const data = await metaService.getPostLikes(postId);
    res.json(data);
  } catch (error) {
    res.status(error.status || 500).json(error);
  }
};

const getPageInsights = async (req, res) => {
  try {
    const { pageId } = req.params;
    const { metric } = req.query;

    const data = await metaService.getPageInsights(
      pageId,
      metric || "page_fans"
    );

    res.json(data);
  } catch (error) {
    res.status(error.status || 500).json(error);
  }
};

module.exports = {
  getPageInfo,
  getPagePosts,
  createPagePost,
  deletePost,
  getPostComments,
  getPostLikes,
  getPageInsights
};