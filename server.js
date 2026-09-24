const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  let filePath = reqPath === '/' ? 'FitPlan.html' : reqPath.slice(1);
  try {
    filePath = decodeURIComponent(filePath);
  } catch (e) {}

  const fullPath = path.join(__dirname, filePath);

  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
    const ext = path.extname(fullPath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    });
    fs.createReadStream(fullPath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`  FitPlan Server พร้อมใช้งานแล้ว!`);
  console.log(`  เปิดใช้งานที่: http://localhost:${PORT}`);
  console.log(`=======================================================`);
});
