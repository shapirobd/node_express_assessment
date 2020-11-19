const axios = require("axios");

// this function creates an array of axios.get requests, each one retrieving info on a user by username
function createReqArr(devs) {
	const reqArr = [];
	devs.map((dev) => {
		reqArr.push(axios.get(`https://api.github.com/users/${dev}`));
	});
	return reqArr;
}

// this function generates an object containing bio & name for each developer found in results
function generateOutput(results) {
	return results.map((result) => ({
		bio: result.data.bio,
		name: result.data.name,
	}));
}

module.exports = { createReqArr, generateOutput };
