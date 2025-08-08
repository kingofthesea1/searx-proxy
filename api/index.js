import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

// Replace this with the SearXNG instance you want to use
const SEARX_URL = 'https://searx.be'; // public SearXNG instance

app.get('/', async (req, res) => {
  const query = req.query.query;
  if (!query) {
    return res.status(400).send('Missing query parameter');
  }

  try {
    const searchUrl = `${SEARX_URL}/search?q=${encodeURIComponent(query)}&format=json`;
    const response = await fetch(searchUrl);
    if (!response.ok) throw new Error(`SearX returned ${response.status}`);

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching from SearXNG:', error);
    res.status(500).send('Search error');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
