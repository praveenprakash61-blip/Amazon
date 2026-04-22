import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const publicRoot = join(process.cwd(), 'public');
const host = process.env.HOST ?? '127.0.0.1';

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
};

const server = createServer(async (request, response) => {
  const requestPath = request.url === '/' ? '/index.html' : request.url;
  const normalizedPath = normalize(requestPath).replace(/^\/+/, '').replace(/^(\.\.[/\\])+/, '');
  const filePath = join(publicRoot, normalizedPath);

  try {
    const file = await readFile(filePath);
    response.writeHead(200, {
      'content-type': mimeTypes[extname(filePath)] ?? 'text/plain; charset=utf-8',
    });
    response.end(file);
  } catch {
    if (normalizedPath === 'app.mjs') {
      const file = await readFile(join(publicRoot, 'app.mjs'));
      response.writeHead(200, { 'content-type': 'text/javascript; charset=utf-8' });
      response.end(file);
      return;
    }

    if (normalizedPath === 'src/snake-game.mjs') {
      const file = await readFile(join(process.cwd(), 'src', 'snake-game.mjs'));
      response.writeHead(200, { 'content-type': 'text/javascript; charset=utf-8' });
      response.end(file);
      return;
    }

    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('Not found');
  }
});

const port = Number(process.env.PORT ?? 3000);

server.listen(port, host, () => {
  console.log(`Snake game running at http://${host}:${port}`);
});
