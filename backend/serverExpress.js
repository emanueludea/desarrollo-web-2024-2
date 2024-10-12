//const express = require('express')

const {default:express} = await import("express");
const app = express()

app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/api', (req, res) => {
  res.send('hello API')
})

app.post('/api', (req, res) => {
  res.send('hello API POST')
})

app.put('/api', (req, res) => {
  console.log(req);
  res.send('hello API PUT')
});

app.post('/api2', (req, res) => {
  console.log(req.params);
  console.log(req.query);
  res.send('hello API2 POST');
});

app.listen(3000);