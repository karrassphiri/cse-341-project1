const express = require('express');
const path = require('path');

const app = express();
const port = 8080;

// middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'public', 'index.html');
  res.sendFile(indexPath);
});

app.get('/florence', (req, res) => {
  res.send('Florence Phiri');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
