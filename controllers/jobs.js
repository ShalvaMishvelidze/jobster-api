const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllJobs = async (req, res) => {
	const jobs = await Job.find({ createdBy: req.user.userID }).sort(
		'createdAt'
	);
	res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
	const {
		user: { userID },
		params: { ID: jobID },
	} = req;

	const job = await Job.findOne({
		_ID: jobID,
		createdBy: userID,
	});

	if (!job) {
		throw new NotFoundError(`No job with ID ${jobID}`);
	}

	res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
	req.body.createdBy = req.user.userID;
	const job = await Job.create(req.body);
	res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
	const {
		body: { company, position },
		user: { userID },
		params: { ID: jobID },
	} = req;

	if (company === '' || position === '') {
		throw new BadRequestError('company or Position fields cannot be empty');
	}

	const job = await Job.findByIDAndUpdate(
		{ _ID: jobID, createdBy: userID },
		req.body,
		{ new: true, runValIDators: true }
	);

	if (!job) {
		throw new NotFoundError(`No job with ID ${jobID}`);
	}

	res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
	const {
		user: { userID },
		params: { ID: jobID },
	} = req;

	const job = await Job.findByIDAndDelete({
		_ID: jobID,
		createdBy: userID,
	});

	if (!job) {
		throw new NotFoundError(`No job with ID ${jobID}`);
	}

	res.status(StatusCodes.OK).send();
};

module.exports = {
	createJob,
	deleteJob,
	getAllJobs,
	updateJob,
	getJob,
};
