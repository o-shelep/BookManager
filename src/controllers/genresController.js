const pool = require('../config/db');

async function getAll(req, res, next) {
  try {
    const [rows] = await pool.query('SELECT * FROM genres ORDER BY name');
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Genre name is required' });
    }
    const [result] = await pool.query(
      'INSERT INTO genres (name) VALUES (?)',
      [name.trim()]
    );
    res.status(201).json({ id: result.insertId, name: name.trim() });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Genre already exists' });
    }
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Genre name is required' });
    }
    const [result] = await pool.query(
      'UPDATE genres SET name = ? WHERE id = ?',
      [name.trim(), req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Genre not found' });
    }
    res.json({ id: Number(req.params.id), name: name.trim() });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Genre already exists' });
    }
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const [result] = await pool.query('DELETE FROM genres WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Genre not found' });
    }
    res.json({ message: 'Genre deleted successfully' });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAll, create, update, remove };
