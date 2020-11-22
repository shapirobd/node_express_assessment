const express = require("express");
const axios = require("axios");
const ExpressError = require("../expressError");
const { createReqArr, generateOutput } = require("../helpers");
const router = new express.Router();

// this route finds users from github by username and returns an object for each, containing their bio and name
router.post("/", async (req, res, next) => {
	try {
		const devs = req.body.developers;
		const reqArr = createReqArr(devs);
		const results = await Promise.all(reqArr);
		return res.send(generateOutput(results));
	} catch (err) {
		next(err);
	}
});

module.exports = router;
