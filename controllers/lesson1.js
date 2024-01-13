const path = require('path'); //added for frontend

const florenceRoute = (req, res) => {
  res.send('Florence Phiri');
};

const jothamRoute = (req, res) => {
  res.send ('Jotham Phiri');
};

const jathnielRoute = (req, res) => {
  res.send ('Jathniel Phiri');
};

const frontendRoute = (req, res) => {
  const indexPath = path.join(__dirname, '..', 'frontend', 'index.html');
  res.sendFile(indexPath);
} //added for frontend


module.exports = {
  florenceRoute,
  jathnielRoute,
  jothamRoute,
  frontendRoute,
};
