const articles = require("../articles");
const {
  getAllArticles,
  getArticleById,
  getArticlesByContent,
  addArticle,
  deleteArticleById,
  updateArticleById,
} = require("../controllers/articles");

const Article = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    content: { type: "string" },
  },
};

//schema get All Articles
const getAllArticlesOpts = {
  schema: {
    response: {
      200: {
        type: "array",
        items: Article,
      },
    },
  },
  handler: getAllArticles,
};

//schema get articles by contents
const getArticlesByContentsOpts = {
  schema: {
    response: {
      200: {
        type: "array",
        items: Article,
      },
    },
  },
  handler: getArticlesByContent,
};

//get article by id schema
const getArticleByIdOpts = {
  schema: {
    response: {
      200: Article,
    },
  },
  handler: getArticleById,
};

const postArticleOpts = {
  schema: {
    body: {
      type: "object",
      required: ["title", "content"],
      properties: {
        title: { type: "string" },
        content: { type: "string" },
      },
    },
    response: {
      201: Article,
    },
  },
  handler: addArticle,
};

const deleteArticleByIdOpts = {
  schema: {
    response: {
      201: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
  handler: deleteArticleById,
};

const updateArticleByIdOpts = {
  schema: {
    body: {
      type: "object",
      required: ["title", "content"],
      properties: {
        title: { type: "string" },
        content: { type: "string" },
      },
    },
    response: {
      201: Article,
    },
  },
  handler: updateArticleById,
};

function articlesRoutes(fastify, options, done) {
  //get all articles
  fastify.get("/articles", getAllArticlesOpts);

  //get article by id
  fastify.get("/articles/:id", getArticleByIdOpts);

  //Case insensitive search of article content
  fastify.get("/articles/find/:match", getArticlesByContentsOpts);

  fastify.post("/articles", postArticleOpts);

  fastify.delete("/articles/:id", deleteArticleByIdOpts);

  fastify.put("/articles/:id", updateArticleByIdOpts);

  done();
}

module.exports = articlesRoutes;
