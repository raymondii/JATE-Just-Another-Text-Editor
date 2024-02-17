const path = require('path');

module.exports = (app) => {
  // Define route to serve the index.html file
  app.get('/', (req, res) => {
    // Send the index.html file as response
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  });
};
