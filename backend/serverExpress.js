//const express = require("express"); //CommonJS

//const {default:express} = await import("express"); // REPL
import express from "express"; //ES6
const app = express();

const myMd = (req, res, next)=>{
  console.log('pasaste por el middleware');
  res.set('content-type', 'application/json')
  next();
}

app.use(myMd);
app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/api", (req, res) => {
  res.send("hello API");
});

app.post("/api", (req, res) => {
  res.send(JSON.stringify({status: 200, message: 'todot bien'}));
});

app.put("/api", (req, res) => {
  console.log(req);
  res.send("hello API PUT");
});

app.post("/api2/:id/:nombre", (req, res) => {
  console.log(req.params);
  console.log(req.query);
  res.send("hello API2 POST");
});

app.all("/api3", (req, res) => {
  console.log("api3");
  res.send("api3");
});

app.get("*", (req, res) => {
  console.log("cualquier ruta");
  res.send("cualquiercosa");
});

app.listen(8080);
