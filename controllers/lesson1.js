
const path = require('path');

module.exports = {
  getRoot: (req, res) => {
    const indexPath = path.join(__dirname, '..', 'public', 'index.html');
    res.sendFile(indexPath);
  },

  getFlorence: (req, res) => {
    res.send('Florence Phiri');
  },
};
