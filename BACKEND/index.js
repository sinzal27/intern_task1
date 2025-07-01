const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());



app.get('/', async (req, res) => {
    try {
        res.json('Project is active');
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});


// Get list of volunteer opportunities
app.get('/api/opportunities', async (req, res) => {
  const result = await pool.query(`
    SELECT vo.id, vo.title, vo.description, vo.event_date, vo.location, o.name AS organization
    FROM volunteer_opportunities vo
    JOIN organizations o ON vo.organization_id = o.id
    ORDER BY vo.event_date ASC
  `);
  res.json(result.rows);
});

// Sign up a volunteer
app.post('/api/volunteer', async (req, res) => {
  const { name, email, phone, opportunity_id } = req.body;
  await pool.query(
    'INSERT INTO volunteers (name, email, phone, opportunity_id) VALUES ($1, $2, $3, $4)',
    [name, email, phone, opportunity_id]
  );
  res.status(201).send('Volunteer signed up');
});


//All Tables

// GET all organizations
app.get('/api/organizations', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM organizations ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching organizations');
  }
});

// GET all volunteer opportunities
app.get('/api/opportunities', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT vo.id, vo.title, vo.description, vo.event_date, vo.location, o.name AS organization
      FROM volunteer_opportunities vo
      JOIN organizations o ON vo.organization_id = o.id
      ORDER BY vo.event_date ASC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching opportunities');
  }
});

// GET all volunteers
app.get('/api/volunteers', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT v.id, v.name, v.email, v.phone, vo.title AS opportunity
      FROM volunteers v
      JOIN volunteer_opportunities vo ON v.opportunity_id = vo.id
      ORDER BY v.id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching volunteers');
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

