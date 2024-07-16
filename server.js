import express from "express";
import qr from "qr-image";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, './public')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get("/generate", (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).send('URL is required');
      }
    
    const qrCode = qr.image(url, { type: 'png' });
    res.type('png');
    qrCode.pipe(res);
})


app.listen(port, () => {
    console.log(`QR Code Generator app listening at http://localhost:${port}`);
  });

export default app;