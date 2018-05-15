var express = require("express");
var router = express.Router();
var TaskModel = require("../models/taskmodel");

// GET home page
router.get("/", function(req, res, next) {
  res.render("index", { title: "Task Tracker" });
});

// GET tasklist page
router.get("/tasklist", function(req, res) {
  TaskModel.find(function(err, tasks) {
    if (err) {
      res.status(500).send({ message: "error getting tasks" });
    }
    res.render("tasklist", {
      title: "Task List",
      tasks: tasks
    });
  });
});

// Remove Task
router.post("/removetask/:id", function(req, res) {
  TaskModel.findByIdAndRemove(req.params.id, function(err, task) {
    if (err) {
      console.log(err);
      if (err) {
        return res.status(500).send({ message: "Could not delete task with id " + req.params.id });
      }
    }

    if (!task) {
      res.render("success", { message: "Task not found with id " + req.params.id });
    }
  });
  res.render("success", { message: "Task deleted successfully!" });
});

// GET New TASK page
router.get("/addtask", function(req, res) {
  res.render("addtask", { title: "Add New Task" });
});

// Navigate to Update page
router.get("/update/:id", function(req, res) {
  TaskModel.findById(req.params.id, function(err, task) {
    if (err) {
      return res.status(404).send({ message: "Task not found" });
    }
    res.render("update", { task: task, title: "Update Task" });
  });
});

// Update Task
router.post("/updatetask/:id", function(req, res) {
  const id = req.params.id;
  const name = req.body.task;
  const description = req.body.desc;

  TaskModel.findByIdAndUpdate(id, { task: name, description: description }, function(err, task) {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Some error occurred while retrieving Tasks." });
    } else {
      res.redirect("/tasklist");
    }
  });
});

// POST to Add Task Service
router.post("/addtask", function(req, res) {
  var newTask = new TaskModel({ task: req.body.taskname, description: req.body.taskdesc });

  newTask.save(function(err) {
    if (err) {
      res.send("There was a problem adding the information to the database.");
    }

    res.redirect("tasklist");
  });
});

module.exports = router;
