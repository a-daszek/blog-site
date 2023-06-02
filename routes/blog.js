const express = require("express");

const router = express.Router();

router.get("/", function(req, res){
    res.redirect("/posts")
});

router.get("/posts", function(req, res){
    res.render("posts-list");
});

router.get("/new-post", function(req, res){
    res.render("new-post");
})

module.exports = router;