const { v4: uuidv4 } = require("uuid");
let articles = require("../articles");

const getAllArticles = (req, reply) => {
  reply.send(articles);
};

const getArticleById = (req, reply) => {
  const id = req.params.id.toString();
  let article = articles.find((article) => article.id.toString() === id);

  if (!article) {
    reply.code(404).send({ error: "Article not found" });
  } else {
    reply.send(article);
  }
};

const getArticleByTitle = (req, reply) => {
  const { title } = req.params;
  let article = articles.find((article) => article.title.trim() === title);

  if (!article) {
    reply.code(404).send({ error: "Article not found" });
  } else {
    reply.send(article);
  }
};

const getArticlesByContent = (req, reply) => {
  const { match } = req.params;
  const results = articles.filter((article) =>
    article.content.toLowerCase().includes(match.toLowerCase())
  );
  reply.send(results);
};

const addArticle = (req, reply) => {
  const { title, content } = req.body;
  console.log(req.body);
  const article = {
    id: uuidv4(),
    title,
    content,
  };
  articles = [...articles, article];
  reply.code(201).send(article);
};

const deleteArticleById = (req, reply) => {
  const { id } = req.params;
  articles = articles.filter((article) => article.id !== id);
  //   reply.send({ message: `Article ${id} has been removed` });
  reply.send(articles);
};

const updateArticleById = (req, reply) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const article = articles.find((article) => article.id === id);
  if (article) {
    article.title = title;
    article.content = content;
    reply.send(article);
  } else {
    reply.status(404).send({ message: `Article ${id} not found` });
  }
};

module.exports = {
  getAllArticles,
  getArticleById,
  getArticlesByContent,
  addArticle,
  deleteArticleById,
  updateArticleById,
  getArticleByTitle,
};
