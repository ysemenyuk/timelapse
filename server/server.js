import http from 'http';
import path from 'path';
import process from 'process';
import fs from 'fs';
const fsp = fs.promises;

const requestListener = (request, response) => {
  console.log(1, path.resolve())
  console.log(2, process.cwd())
  if (request.url === '/settings') {
    fsp.readFile(`${path.resolve()}/settings.json`)
      .then((content) => {
        response.setHeader('Content-Type', 'application/json');
        response.write(content);
      })
      .catch((e) => {
        response.statusCode = 500;
        response.write(`error: ${e.message}`);
      })
      .finally(() => {
        response.end();
      })
  } else {
    response.write('Hello');
    response.end();
  }
}

const server = http.createServer(requestListener);
server.listen(8080);
