const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const votesFilePath = path.join(__dirname, 'votes.json');

// Initialize votes file if it doesn't exist
if (!fs.existsSync(votesFilePath)) {
  fs.writeFileSync(votesFilePath, JSON.stringify({ totalVotes: 0 }));
}

app.get('/api/votes', (req, res) => {
  const votes = JSON.parse(fs.readFileSync(votesFilePath));
  res.json(votes);
});

app.post('/api/votes', (req, res) => {
  const votes = JSON.parse(fs.readFileSync(votesFilePath));
  votes.totalVotes += 1;
  fs.writeFileSync(votesFilePath, JSON.stringify(votes));
  res.json(votes);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});