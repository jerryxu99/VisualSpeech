const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
const getText = require('./SpeechToText/speech');
const getSpeech = require('./TextToSpeech/text');
const cors = require('cors');
const path = require('path');

const jsonParser = bodyParser.json();

app.use(cors());

app.get('/speechToText', async (req, res) => {
  try {
    const text = await getText();
    res.send({ text });
  } catch (e) {
    res.send(e);
  }
});

app.post('/textToSpeech', jsonParser, async (req, res) => {
  const { text } = req.body;
  const speechBuffer = await getSpeech(text);
  console.log({ speechBuffer });
  res.send({ speechBuffer });
});

app.get('/audio.mp3', (req, res) => {
  res.sendFile(path.join(__dirname, './', 'output.mp3'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
