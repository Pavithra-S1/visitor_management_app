const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const history = require('connect-history-api-fallback');
const Response = require('./src/helpers/response.js');

dotenv.config();
const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// Configuration for CORS Origin ------------------------------------------------------
app.use(
    cors({
      origin: '*',
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
    })
  );


app.use(
    "/api",
    require("./src/routes/auth.js"),
    require("./src/routes/users.js"),
    require("./src/routes/visitor_master.js"),
    require("./src/routes/hostModel.js"),
    require("./src/routes/visitor.js"),
  );

app.all("/api/*", (req, res) => {
    return Response.responseStatus(res, 404, "Endpoint Not Found");
  });

app.use(express.static(path.join(__dirname, './dist')));
app.use(history());

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist', 'index.html'));
  });

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Refex Contacts server listening at http://localhost:${PORT}`);
  });