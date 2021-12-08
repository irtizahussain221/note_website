const router = require("express").Router();

router.get("/getFolders", function (req, res, next) {
  res.json({ status: "Will be implemented pretty soon!" });
});

router.post("/createFolder", function (req, res, next) {
  res.json({ status: "Will be implemented pretty soon!" });
});

router.delete("/deleteFolder", function (req, res, next) {
  res.json({ status: "Will be implemented pretty soon!" });
});

module.exports = router;
