const express = require('express');
const dotenv = require('dotenv');
const eventsRouter = require('./routes/events');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/events', eventsRouter);

app.get('/', (req, res) => {
  res.json({ message: 'API REST de agenda em Node.js está ativa', endpoints: ['/events'] });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint não encontrado' });
});

app.listen(port, () => {
  console.log(`Servidor a correr em http://localhost:${port}`);
});
