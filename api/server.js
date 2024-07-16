import express from "express";
import qr from "qr-image";

const app = express();
const port = 3000;

// app.set('view engine', 'html');

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile('../public/index.html');
})

app.get("/generate", (req, res) => {
    const url = req.query.url;
    console.log(url)
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

// module.exports = app;