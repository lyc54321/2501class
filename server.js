
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

function readJSON(file) {
  try {
    const data = fs.readFileSync(path.join(__dirname, file), 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return {};
  }
}

function writeJSON(file, data) {
  fs.writeFileSync(path.join(__dirname, file), JSON.stringify(data, null, 2));
}

app.get('/api/users', (req, res) => {
  res.json(readJSON('users.json'));
});

app.post('/api/users', (req, res) => {
  const data = readJSON('users.json');
  data.users = req.body.users;
  writeJSON('users.json', data);
  res.json({ success: true });
});

app.get('/api/homework', (req, res) => {
  res.json(readJSON('homework.json'));
});

app.post('/api/homework', (req, res) => {
  const data = readJSON('homework.json');
  data.homework = req.body.homework;
  writeJSON('homework.json', data);
  res.json({ success: true });
});

app.get('/api/feedback', (req, res) => {
  res.json(readJSON('feedback.json'));
});

app.post('/api/feedback', (req, res) => {
  const data = readJSON('feedback.json');
  data.feedback = req.body.feedback;
  writeJSON('feedback.json', data);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});
