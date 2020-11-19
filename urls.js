const fs = require("fs");
const axios = require("axios");

let filename;
if (!process.argv[2]) {
	console.error("Error: FILENAME must be included as the third argument.");
	process.exit(1);
} else {
	filename = process.argv[2];
}

readURLFile(filename);

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

function filterURLArr(urlArr) {
	return urlArr.filter((url) => {
		return isValidURL(url)
			? url
			: console.error("Error: URL must begin with http:// or https://");
	});
}

function isValidURL(url) {
	return url.slice(0, 7) === "http://" || url.slice(0, 8) === "https://";
}

async function getURLS(urlArr) {
	let reqArr = [];
	urlArr.map((url) => {
		reqArr.push(axios.get(url));
	});
	let resps = await Promise.all(reqArr);
	for (let resp of resps) {
		let domain = getDomain(resp.config.url);
		writeNewFile(resp.data, domain);
	}
}

function writeNewFile(data, domain) {
	fs.writeFile(domain, data, "utf8", (err) => {
		if (err) {
			console.error("Error: ", err);
		}
	});
}

function getDomain(url) {
	let splitURL = url.split("/");
	return splitURL[2];
}
