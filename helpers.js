// determines the file to be read
function determineFilename() {
	if (!process.argv[2]) {
		console.error("Error: FILENAME must be included as the third argument.");
		process.exit(1);
	} else {
		return process.argv[2];
	}
}

// checks to see if URL starts with http:// or https://
function isValidURL(url) {
	return url.slice(0, 7) === "http://" || url.slice(0, 8) === "https://";
}

// filters the array of urls to only contain valid urls. If any url is invalid, error is printed and program continues
function filterURLArr(urlArr) {
	return urlArr.filter((url) => {
		return isValidURL(url)
			? url
			: console.error("Error: URL must begin with http:// or https://");
	});
}

// retreives just the domain name from the url
function getDomain(url) {
	let splitURL = url.split("/");
	return splitURL[2];
}

module.exports = {
	determineFilename,
	isValidURL,
	filterURLArr,
	getDomain,
};
