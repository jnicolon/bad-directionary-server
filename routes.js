const express = require("express");
const Word = require("./models/Word");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const { uploadImage, uploadAudio } = require("./file_upload/s3");

const upload = multer({ dest: "uploads/" });

//In this file are the routes for the api

//to get all the words in the collection
router.get("/words", async (req, res) => {
  const words = await Word.find();
  res.send(words);
});

//to get a specific word in the collection
router.get("/singleword", async (req, res) => {
  const caseSensitiveWord = req.query.word.toLowerCase();

  const word = await Word.findOne({ word: caseSensitiveWord });
  res.send(word);
});

//to add a single word in the collection
router.post("/addword", async (req, res) => {
  let wordTemp;
  if (req.body.word) {
    wordTemp = req.body.word.toLowerCase();
  } else {
    wordTemp = "word not found";
  }

  try {
    const word = new Word({
      word: wordTemp,
      definition: req.body.definition,
      related: req.body.related,
      imagePath: req.body.imagePath,
      audioPath: req.body.audioPath,
    });

    await word.save();

    res.send(word);
  } catch (err) {
    res.status(404);
    res.send({ error: err });
  }
});

//to delete a single word in the collection
router.delete("/deleteword/:word", async (req, res) => {
  try {
    await Word.deleteOne({ word: req.params.word });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Word does not exist" });
  }
});

//to upload an image to the server
router.post("/uploadImage", upload.single("image"), async (req, res) => {
  const file = req.file;
  const result = await uploadImage(file);

  fs.unlink(file.path, (err) => {
    if (err) throw err;
    console.log("file deleted");
  });

  res.send({ imagePath: result.Location });
});

//to upload an audio file to the server

router.post("/uploadAudio", upload.single("audio"), async (req, res) => {
  const file = req.file;
  const result = await uploadAudio(file);

  fs.unlink(file.path, (err) => {
    if (err) throw err;
    console.log("file deleted");
  });

  res.send({ audioPath: result.Location });
});

module.exports = router;
