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
		let urlArr = data.split("\n");
		getURLS(urlArr);
	});
}

async function getURLS(urlArr) {
	for (let url of urlArr) {
		if (url.slice(0, 7) === "http://" || url.slice(0, 8) === "https://") {
			let resp = await axios.get(url);
			let domain = getDomain(url);
			writeNewFile(resp.data, domain);
		} else {
			console.error("Invalid URL - must begin with http:// or https://");
		}
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
