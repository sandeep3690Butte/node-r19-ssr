import path from 'path';
import fs from 'fs';
import express from 'express';
import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './../client/App';
import { ChunkExtractor } from '@loadable/server';

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/static', express.static(path.resolve(__dirname, '../client')));

app.get(/.*/, (req, res) => {
  try {
    const statsFile = path.resolve(process.cwd(), 'dist','client/loadable-stats.json');

    if (!fs.existsSync(statsFile)) {
      return res.status(500).send('Missing loadable-stats.json. Run build first.');
    }

    const extractor = new ChunkExtractor({ statsFile });
    const jsx = extractor.collectChunks(
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    );

    const template = fs.readFileSync(
      path.resolve(__dirname, '../../public/index.template.html'),
      'utf8'
    );

    const [htmlStart, htmlEnd] = template.split('<!--APP-->');
    const styles = extractor.getStyleTags();
    const scripts = extractor.getScriptTags();

    console.log(`scripts: ${scripts}`);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    // 1️⃣ Write HTML head + styles before streaming
    res.write(
      htmlStart.replace(
        '</head>',
        `
        <style>
          body {
            margin: 0;
            background:#cec3c8;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          }
        </style>
        ${styles}
      </head>`
      )
    );

    const { pipe, abort } = renderToPipeableStream(jsx, {
      onShellReady() {
        // 2️⃣ Start piping React content
        pipe(res);

        // When React is done streaming, append closing tags manually
        res.write(
          htmlEnd.replace('</body>', `${scripts}\n</body>`)
        );

        // 3️⃣ Close response
        res.end();
      },

      onError(err) {
        console.error(err);
      },
    });

    setTimeout(abort, 10000);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
