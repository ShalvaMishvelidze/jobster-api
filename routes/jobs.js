const express = require("express");
const router = express.Router();
const testUser = require("../middleware/testUser");
const {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
} = require("../controllers/jobs");

router.route("/").post(testUser, createJob).get(getAllJobs);

router
  .route("/:id")
  .get(getJob)
  .delete(testUser, deleteJob)
  .patch(testUser, updateJob);

module.exports = router;
