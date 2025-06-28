import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/api/ping', (_, res) => {
  res.send('pong ✅');
});

app.listen(PORT, () => {
  console.log(`🟢 Backend running on http://localhost:${PORT}`);
});

