const express = require('express');
const pool = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM events ORDER BY event_date, event_time');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Não foi possível carregar os eventos' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM events WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Evento não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao ler o evento' });
  }
});

router.post('/', async (req, res) => {
  const { event_date, event_time, subject, description, status } = req.body;
  if (!event_date || !subject) {
    return res.status(400).json({ error: 'event_date e subject são obrigatórios' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO events (event_date, event_time, subject, description, status) VALUES (?, ?, ?, ?, ?)',
      [event_date, event_time || null, subject, description || null, status || 'pending']
    );
    const [rows] = await pool.query('SELECT * FROM events WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Não foi possível criar o evento' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { event_date, event_time, subject, description, status } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE events SET event_date = ?, event_time = ?, subject = ?, description = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [event_date, event_time || null, subject, description || null, status || 'pending', id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Evento não encontrado' });
    const [rows] = await pool.query('SELECT * FROM events WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Não foi possível atualizar o evento' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM events WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Evento não encontrado' });
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Não foi possível apagar o evento' });
  }
});

module.exports = router;
