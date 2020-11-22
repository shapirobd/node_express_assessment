const express = require("express");
const routes = require("./routes/userRoutes");
const ExpressError = require("./expressError");
const app = express();

app.use(express.json());
app.use("/", routes);

app.use((req, res, next) => {
	return new ExpressError("User Not Found", 404);
});

app.use((err, req, res, next) => {
	res.status(err.status || 500);
	return res.json({
		error: err.message,
	});
});

module.exports = app;
