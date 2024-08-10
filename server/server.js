import express from 'express';
import supabase from './supabase.js';
import cors from 'cors'; // Import CORS middleware

const app = express();
const port = 3001;

// Use CORS middleware
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('json spaces', 2);

// Health Check
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// Quality Control Endpoints

// Get all quality control records
app.get('/quality-control', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('quality_control')
      .select();
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new quality control record
app.post('/quality-control', async (req, res) => {
  const { product, defects, status, date, comments } = req.body;
  try {
    const { data, error } = await supabase
      .from('quality_control')
      .insert([{ product, defects, status, date, comments }])
      .select();
    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a quality control record
app.put('/quality-control/:id', async (req, res) => {
  const id = req.params.id;
  const { product, defects, status, date, comments } = req.body;
  try {
    const { data, error } = await supabase
      .from('quality_control')
      .update({ product, defects, status, date, comments })
      .eq('id', id)
      .select();
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a quality control record
app.delete('/quality-control/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const { data, error } = await supabase
      .from('quality_control')
      .delete()
      .eq('id', id);
    if (error) throw error;
    res.json({ message: `Record with id ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Production Tracking Endpoints

// Get all production records
app.get('/production', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('production')
      .select();
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new production record
app.post('/production', async (req, res) => {
  const { product, quantity, status, date } = req.body;
  try {
    const { data, error } = await supabase
      .from('production')
      .insert([{ product, quantity, status, date }])
      .select();
    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a production record
app.put('/production/:id', async (req, res) => {
  const id = req.params.id;
  const { product, quantity, status, date } = req.body;
  try {
    const { data, error } = await supabase
      .from('production')
      .update({ product, quantity, status, date })
      .eq('id', id)
      .select();
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a production record
app.delete('/production/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const { data, error } = await supabase
      .from('production')
      .delete()
      .eq('id', id);
    if (error) throw error;
    res.json({ message: `Record with id ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
