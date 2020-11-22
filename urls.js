const fs = require("fs");
const axios = require("axios");
const {
	determineFilename,
	isValidURL,
	filterURLArr,
	getDomain,
} = require("./helpers");

// reads file of urls and creates array from the list of urls
function readURLFile(filename) {
	fs.readFile(filename, "utf8", (err, data) => {
		if (err) {
			console.error("Error: ", err);
			process.exit(1);
		}
		let urlArr = filterURLArr(data.split("\n"));
		getURLS(urlArr);
	});
}

// makes array of GET requests for each url from urlArr and generates array of responses for each request
async function getURLS(urlArr) {
	let reqArr = [];
	urlArr.map((url) => {
		reqArr.push(axios.get(url));
	});
	let resps = await Promise.all(reqArr);
	writeNewFiles(resps);
}

// writes the data from each response to a new file titled the domain name of the url
function writeNewFiles(resps) {
	for (let resp of resps) {
		let domain = getDomain(resp.config.url);
		fs.writeFile(domain, resp.data, "utf8", (err) => {
			if (err) {
				console.error("Error: ", err);
			}
		});
	}
}

let filename = determineFilename();
readURLFile(filename);
