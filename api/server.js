import express from "express";
import qr from "qr-image";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, '../public')));

app.get("/", (req, res) => {
  try {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  } catch (error) {
    console.error('Error serving index.html:', error);
    res.status(500).send('Error serving the file');
  }
});

app.get("/generate", (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).send('URL is required');
    }
    const qrCode = qr.image(url, { type: 'png' });
    res.type('png');
    qrCode.pipe(res);
  } catch (error) {
    console.error('Error generating QR code:', error);
    res.status(500).send('Error generating QR code');
  }
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`QR Code Generator app listening at http://localhost:${port}`);
  });
}

export default app;
export default app;
