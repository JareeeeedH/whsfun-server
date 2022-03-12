const router = require("express").Router();
const messageModel = require("../models/messageModel");

router.use((req, res, next) => {
  console.log("client into  message route");
  next();
});

// get All
router.get("/post", async (req, res) => {
  const allMessage = await messageModel.find({}).populate("speaker", ["name", "data"]);
  return res.send({ message: "ok", data: allMessage });
});

// get by fun Id
router.get("/post/:funId", async (req, res) => {
  console.log("into funId");
  let { funId } = req.params;
  const foundViews = await messageModel.find({ funId }).populate("speaker", ["name", "data"]);
  return res.send({ message: "ok", data: foundViews });
});

// post
router.post("/post", async (req, res) => {
  const { title, content, points, speaker, funId, nose, taste, finish } = req.body.postData;

  try {
    const newPost = await messageModel({ title, content, points, speaker, funId, nose, taste, finish }).save();
    return res.send({ message: "ok", data: newPost });
  } catch (err) {
    console.log("post message Error --->", err);
    return res.status(400).send({ message: "failed", err });
  }
});

module.exports = router;
