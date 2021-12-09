const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Note = require("../models/note");
const {
  notesCreationValidation,
  noteDetailsPasswordValidation,
  noteUpdateValidation,
} = require("../validation/notes.validate");

router.get("/:folderID/notesList", async function (req, res, next) {
  try {
    let folderID = req.params.folderID;
    let notes = await Note.find({ folder: folderID }, "-password -text");
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(notes);
  } catch (error) {
    return next(error);
  }
});

router.post("/getNote", async function (req, res, next) {
  let { error } = noteDetailsPasswordValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    let note = await Note.find({ _id: req.body._id });
    if (!note[0]) return res.status(404).json({ error: "Note not found!" });

    //checking if the password is valid
    const validPassword = await bcrypt.compare(
      req.body.password,
      note[0].password
    );
    if (!validPassword) return res.status(401).send("Invalid Password!");

    //if everything is fine, then returning the note
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.json(note);
  } catch (error) {
    return next(error);
  }
});

router.post("/createNotes", async function (req, res, next) {
  let { error } = notesCreationValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    let { password } = req.body;
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);
    let note = new Note({
      name: req.body.name,
      password: hashedPassword,
      text: req.body.text,
      folder: req.body.folder,
    });

    let savedNote = await note.save();
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(savedNote);
  } catch (error) {
    return next(error);
  }
  res.json("Will be implemented soon!");
});

router.put("/updateNotes", async function (req, res, next) {
  let { error } = noteUpdateValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let note = await Note.find({ _id: req.body._id });
    if (!note[0]) return res.status(404).json({ error: "Note not found!" });

    //checking if the password is valid
    const validPassword = await bcrypt.compare(
      req.body.password,
      note[0].password
    );
    if (!validPassword) return res.status(401).send("Invalid Password!");

    //hashing new password
    let { password } = req.body;
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    //If everything is fine, then updating the note
    let updatedNote = await Note.findByIdAndUpdate(
      req.body._id,
      {
        $set: {
          _id: req.body._id,
          name: req.body.name,
          password: hashedPassword,
          text: req.body.text,
          folder: req.body.folder,
        },
      },
      { new: true }
    );
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(updatedNote);
  } catch (error) {
    return next(error);
  }
});

router.delete("/deleteNotes", async function (req, res, next) {
  let { error } = noteDetailsPasswordValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let note = await Note.find({ _id: req.body._id });
    if (!note[0]) return res.status(404).json({ error: "Note not found!" });

    //checking if the password is valid
    const validPassword = await bcrypt.compare(
      req.body.password,
      note[0].password
    );
    if (!validPassword) return res.status(400).send("Invalid Password!");

    //if everything is fine, then deleting the note
    let deletedNote = await Note.findByIdAndDelete(req.body._id);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(deletedNote);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
