const router = require("express").Router();
const Folder = require("../models/folder");
const Note = require("../models/note");
const {
  folderValidation,
  folderDeleteValidation,
} = require("../validation/folder.validate");

router.get("/getFolders", async function (req, res, next) {
  try {
    let folders = await Folder.find().populate("notes");
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(folders);
  } catch (error) {
    return next(err);
  }
});

router.post("/createFolder", async function (req, res, next) {
  const { error } = folderValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let folder = new Folder(req.body);
    let result = await folder.save();
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json("Create Operation Successfull!");
  } catch (error) {
    return next(error);
  }
});

router.delete("/deleteFolder", async function (req, res, next) {
  const { error } = folderDeleteValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let folder = await Folder.findById(req.body._id);
    if (folder === null) return res.status(404).json("Folder not found!");

    await Note.deleteMany({ folder: req.body._id });
    await Folder.findByIdAndDelete(req.body._id);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json("Delete Operation Successfull!");
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
