import http from 'http';
import path from 'path';
import fs from 'fs';
const fsp = fs.promises;

const requestListener = (request, response) => {

  if (request.url === '/settings') {
    fsp.readFile(`${path.resolve()}/settings.txt`)
      .then((content) => {
        response.setHeader('Content-Type', 'text/plain');
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
