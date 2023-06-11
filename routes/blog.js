const express = require("express");

const db = require("../data/database");

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", async function (req, res) {
  const query = `SELECT posts.*, authors.name AS author_name FROM posts INNER JOIN authors ON posts.author_id = authors.id`; //back-quotes - we use them to add dynamic values or split them across multiple lines
  const [posts] = await db.query(query);
  res.render("posts-list", { posts: posts });
});

router.get("/new-post", async function (req, res) {
  const [authors] = await db.query("SELECT * FROM authors");
  res.render("create-post", { authors: authors });
});

router.post("/posts", async function (req, res) {
  const data = [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.body.author,
  ];
  await db.query("INSERT INTO posts (title, summary, body, author_id) VALUES (?)", [
    data,
  ]);
  res.redirect("/posts");
});

router.get("/posts/:id", async function (req, res) { // colon indicates that it"s a dynaminc route
  const query = `
    SELECT posts.*, authors.name AS author_name, authors.email AS author_email FROM posts
    INNER JOIN authors ON posts.author_id = authors.id
    WHERE posts.id = ?
  `; // WHERE na końcu zawsze

  const [posts] = await db.query(query, [req.params.id]); // we want the first item so we use array destructuring

  if (!posts || posts.length === 0) {
    return res.status(404).render("404");
  }
  res.render("post-detail", { post: posts[0] });
});

module.exports = router;

// npm install --save mysql2