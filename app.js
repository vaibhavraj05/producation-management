const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression")
const routes = require("./routes");
const app = express();
app.use(express.json());

// Enable cors support to accept cross origin requests
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));

// Enable helmet js middlewares to configure secure headers
app.use(helmet());

// Enable gzip compression module for REST API
app.use(compression());

app.use("/health", (_req, res) => {
  res.send({ message: "Application runing successfully!" });
});

routes.registerRoutes(app);

// 404 Error Handling
app.use((_, res) => {
  res.send("Invalid Endpoint!")
});

module.exports = app;
