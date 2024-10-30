const http = require('http');
const fs = require('fs');
const path = require('path');

// Utility function to check if a string is a palindrome
function isPalindrome(str) {
  const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  return cleanedStr === cleanedStr.split('').reverse().join('');
}

// Create the server
const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    // Serve the HTML page for the root route
    if (req.url === '/') {
      fs.readFile('./index.html', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data);
        }
      });
    } else if (req.url.endsWith('.css') || req.url.endsWith('.js')) {
      // Serve static CSS and JavaScript files
      const ext = path.extname(req.url);
      const contentType = ext === '.css' ? 'text/css' : 'application/javascript';
      fs.readFile(`.${req.url}`, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end('Not Found');
        } else {
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(data);
        }
      });
    }
  } else if (req.method === 'POST' && req.url === '/check-palindrome') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      const { text } = JSON.parse(body); // Parse the JSON data from the client
      const result = isPalindrome(text);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ isPalindrome: result }));
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

// Start the server
const PORT = 7000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
