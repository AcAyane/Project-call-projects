const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
var pathName = null;
var pathName1 = null;
var i = 1;
const Post = require("../../models/Projet");
const CV = require("../../models/CV");
const storage = multer.diskStorage({
    destination: "./client/src/App/components/layout/img",
    filename: function (req, file, cb) {
        cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
    }
});
const storage1 = multer.diskStorage({
    destination: "./client/src/App/components/layout/img",
    filename: function (req, file, cb) {
        cb(null, "CV-" + Date.now() + path.extname(file.originalname));
    }
});



// @route POST api/posts
// @desc Post Posts
// @access Public
router.post("/", (req, res) => {
    const newPost = new Post({
        PDP: req.body.PDP,
        name: req.body.name,
        descr: req.body.descr,
        imgPath: pathName
    });
    newPost.save()
        .then(newPost => console.log(newPost));
});

router.post("/CV", (req, res) => {
    const newCV = new CV({
        name: req.body.name,
        email: req.body.email,
        filePath: pathName1
    });
    newCV.save()
        .then(newCV => console.log(newCV));
});
router.post("/approvePost", (req, res) => {
    Post.findOneAndUpdate({ name: req.body.name }, { $set: { approved: true } }, { upsert: true }, function (err, data) {
        if (err) { throw err; }
        else { console.log("Updated"); }
    })
});
router.post("/approveCV", (req, res) => {
    CV.findOneAndUpdate({ name: req.body.name }, { $set: { approved: true } }, { upsert: true }, function (err, data) {
        if (err) { throw err; }
        else { console.log("Updated"); }
    })
});

// @route GET api/posts
// @desc Post Posts
// @access Public
router.get("/", (req, res) => {
    Post.find({ approved: true }).then(user => res.send(user));
});
router.get("/A", (req, res) => {
    Post.find({ approved: false }).then(user => res.send(user));
});

router.get("/CV", (req, res) => {
    CV.find({ approved: false }).then(user => res.send(user));
});


router.post("/upload", (req, res, err) => {
    const upload = multer({
        storage: storage,
        limits: { fileSize: 1000000 },
    }).single("myImage");
    upload(req, res, (err) => {
        console.log("Request ---", req.body);
        console.log("Request file ---", req.file);//Here you get file.
        pathName = req.file.filename;
        i++;
        if (!err) return res.send(200).end()
    });
});

router.post("/uploadCV", (req, res, err) => {
    const upload = multer({
        storage: storage1,
        limits: { fileSize: 1000000 },
    }).single("myCV");
    upload(req, res, (err) => {
        console.log("Request ---", req.body);
        console.log("Request file ---", req.file);//Here you get file.
        pathName1 = req.file.filename;
        i++;
        if (!err) return res.send(200).end()
    });
});

module.exports = router;