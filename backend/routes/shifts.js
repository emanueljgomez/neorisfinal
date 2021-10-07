const router = require("express").Router();
let Shift = require("../models/shift.model");

router.route("/").get((req, res) => {
  Shift.find()
    .then((shifts) => res.json(shifts))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Create
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newShift = new Shift({
    username,
    description,
    duration,
    date,
  });

  newShift
    .save()
    .then(() => res.json("Shift added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Read
router.route("/:id").get((req, res) => {
  Shift.findById(req.params.id)
    .then((shift) => res.json(shift))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Delete
router.route("/:id").delete((req, res) => {
  Shift.findByIdAndDelete(req.params.id)
    .then(() => res.json("Shift deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Update
router.route("/update/:id").post((req, res) => {
  Shift.findById(req.params.id)
    .then((shift) => {
      shift.username = req.body.username;
      shift.description = req.body.description;
      shift.duration = Number(req.body.duration);
      shift.date = Date.parse(req.body.date);

      shift
        .save()
        .then(() => res.json("Shift updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
