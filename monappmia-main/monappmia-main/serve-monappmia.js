// Simple static server to serve dist/ under /monappmia/ with SPA fallback
// Usage: node serve-monappmia.js [port]

import http from 'http';
import fs from 'fs';
import path from 'path';

const port = process.argv[2] ? Number(process.argv[2]) : 5177;
// Allow overriding base path via env (BASE) or CLI arg (second arg). Default to '/monappmia'
const baseArg = process.argv[3];
const base = process.env.BASE || baseArg || '/monappmia';
const distDir = path.resolve(process.cwd(), 'dist');

function sendFile(res, filePath, contentType = 'text/html') {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('Server error');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

function getContentType(ext) {
  switch (ext) {
    case '.js': return 'application/javascript';
    case '.css': return 'text/css';
    case '.json': return 'application/json';
    case '.png': return 'image/png';
    case '.jpg': case '.jpeg': return 'image/jpeg';
    case '.svg': return 'image/svg+xml';
    case '.webmanifest': return 'application/manifest+json';
    default: return 'text/html';
  }
}

const server = http.createServer((req, res) => {
  try {
    const url = decodeURIComponent(req.url || '/');

    // only serve under base
    if (!url.startsWith(base)) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }

    // map /monappmia/asset -> dist/asset (strip base)
    let relativePath = url.slice(base.length) || '/';
    // prevent directory traversal
    if (relativePath.includes('..')) {
      res.writeHead(400);
      res.end('Bad request');
      return;
    }

    let filePath = path.join(distDir, relativePath);
    // if path is directory or ends with / serve index.html (SPA fallback)
    fs.stat(filePath, (err, stats) => {
      if (err || stats.isDirectory()) {
        // fallback to index.html
        const indexPath = path.join(distDir, 'index.html');
        if (fs.existsSync(indexPath)) {
          sendFile(res, indexPath, 'text/html');
          return;
        }
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      // serve the file with correct content-type
      const ext = path.extname(filePath);
      const contentType = getContentType(ext);
      sendFile(res, filePath, contentType);
    });
  } catch (e) {
    res.writeHead(500);
    res.end('Server error');
  }
});

server.listen(port, () => {
  console.log(`Serving dist/ under ${base}/ on http://localhost:${port}${base}/`);
});
