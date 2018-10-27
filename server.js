const express = require('express');
const next = require('next');
const enforce = require('express-sslify');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();
    if (!dev) {
      server.use(enforce.HTTPS({ trustProtoHeader: true }));
    }
    server.get('*', (req, res) => handle(req, res));

    server.listen(port, (err) => {
      if (err) throw err;
    });
  });
