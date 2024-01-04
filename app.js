require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const bodyParser = require("body-parser");
const cors =require('cors')
app.use(cors({
  origin:'*'
}))
app.use(bodyParser.json());

app.use("/api/users", userRouter);
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});
