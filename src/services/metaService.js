const axios = require("axios");
require("dotenv").config();

const GRAPH_VERSION = process.env.META_GRAPH_VERSION || "v25.0";
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

const metaApi = axios.create({
  baseURL: `https://graph.facebook.com/${GRAPH_VERSION}`,
  timeout: 20000
});

const withToken = (params = {}) => ({
  ...params,
  access_token: PAGE_ACCESS_TOKEN
});

const handleMetaError = (error) => {
  if (error.response) {
    const data = error.response.data;
    return {
      status: error.response.status,
      message: data?.error?.message || "Meta API error",
      details: data
    };
  }

  return {
    status: 500,
    message: error.message || "Unknown server error",
    details: null
  };
};

const getPageInfo = async (pageId) => {
  try {
    const response = await metaApi.get(`/${pageId}`, {
      params: withToken({
        fields: "id,name,about,fan_count,picture"
      })
    });
    return response.data;
  } catch (error) {
    throw handleMetaError(error);
  }
};

const getPagePosts = async (pageId) => {
  try {
    const response = await metaApi.get(`/${pageId}/feed`, {
      params: withToken({
        fields: "id,message,created_time,permalink_url"
      })
    });
    return response.data;
  } catch (error) {
    throw handleMetaError(error);
  }
};

const createPagePost = async (pageId, message) => {
  try {
    const response = await metaApi.post(
      `/${pageId}/feed`,
      null,
      {
        params: withToken({ message })
      }
    );

    return response.data;
  } catch (error) {
    throw handleMetaError(error);
  }
};

const deletePost = async (postId) => {
  try {
    const response = await metaApi.delete(`/${postId}`, {
      params: withToken()
    });

    return response.data;
  } catch (error) {
    throw handleMetaError(error);
  }
};

const getPostComments = async (postId) => {
  try {
    const response = await metaApi.get(`/${postId}/comments`, {
      params: withToken({
        fields: "id,message,from,created_time"
      })
    });

    return response.data;
  } catch (error) {
    throw handleMetaError(error);
  }
};

const getPostLikes = async (postId) => {
  try {
    const response = await metaApi.get(`/${postId}/likes`, {
      params: withToken()
    });

    return response.data;
  } catch (error) {
    throw handleMetaError(error);
  }
};

/*
  Insights:
  - Không hard-code metric cố định nữa.
  - Mặc định thử "page_fans".
  - Có thể truyền query metric từ URL:
    /api/page/{pageId}/insights?metric=page_fans
*/
const getPageInsights = async (pageId, metric = "page_fans") => {
  try {
    console.log("=== INSIGHTS FUNCTION RUNNING ===");
    console.log("PAGE ID:", pageId);
    console.log("METRIC:", metric);

    const response = await metaApi.get(`/${pageId}/insights`, {
      params: withToken({ metric })
    });

    return response.data;
  } catch (error) {
    throw handleMetaError(error);
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