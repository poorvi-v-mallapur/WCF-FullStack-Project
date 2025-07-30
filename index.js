const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the root and subfolders
app.use(express.static(__dirname));

// Optional: If you want to serve index.html for all unknown routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Java World app running at http://localhost:${PORT}`);
});