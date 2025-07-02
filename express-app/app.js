const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
  res.send('<h1 style="color: blue;"> Express Server is Working!</h1>');
});

app.listen(3000, () => { console.log('Server running on http://localhost:3000'); });

