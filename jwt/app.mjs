import express from "express";
import cors from "cors";
import { query, validationResult } from "express-validator";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/public", express.static("./front"));

app.get("/hello", query("person").notEmpty(), (req, res) => {
  console.log("hello");
  const result = validationResult(req);
  if (result.isEmpty()) {
    // return res.send(`Hello, ${req.query.person}!`);
    return res.json({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVtYW51ZWwxIiwicm9sIjoiYWRtaW4iLCJpYXQiOjE3MzExMDI1MjQsImV4cCI6MTczMTEwMzEyNH0.dT3cAf2AEjdgxK49NMqMTdK1-EfRYyjuI-7-SQKj3J8",
    });
  }

  res.send({ errors: result.array() });
});
const port = 3000;
app.listen(port, () => {
  console.log(`listening on ${port}!`);
});
