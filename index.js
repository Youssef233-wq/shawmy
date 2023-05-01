const express = require('express');
const fs = require('fs');
const app = express();

// Serve the static files from the 'public' directory
app.use(express.static('public'));

// Endpoint to get the current progress values
app.get('/progress.json', function(req, res) {
  fs.readFile('progress.json', function(err, data) {
    if (err) {
      // If the file doesn't exist, return an empty object
      if (err.code === 'ENOENT') {
        res.json({});
      } else {
        res.status(500).send('Internal Server Error');
      }
    } else {
      try {
        const progress = JSON.parse(data);
        res.json(progress);
      } catch (e) {
        res.status(500).send('Internal Server Error');
      }
    }
  });
});

// Endpoint to update the progress values
app.put('/progress.json', express.json(), function(req, res) {
  const progress = req.body;
  fs.writeFile('progress.json', JSON.stringify(progress), function(err) {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else {
      res.send('OK');
    }
  });
});

// Start the server
app.listen(3000, function() {
  console.log("Server started on port 3000");
});