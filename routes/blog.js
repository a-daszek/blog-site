const express = require("express");

const db = require("../data/database");

const router = express.Router();

router.get("/", function(req, res){
    res.redirect("/posts")
});

router.get("/posts", function(req, res){
    res.render("posts-list");
});

router.get("/new-post", async function(req, res){
    await db.query("SELECT * FROM authors");
    res.render("create-post");
});

// npm install --save mysql2

module.exports = router;