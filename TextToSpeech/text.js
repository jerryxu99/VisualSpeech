const fs = require('fs');
const util = require('util');

// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');

// Creates a client
const client = new textToSpeech.TextToSpeechClient();

async function getSpeech(text) {
  // Construct the request
  const request = {
    input: { text: text },
    // Select the language and SSML voice gender (optional)
    voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
    // select the type of audio encoding
    audioConfig: { audioEncoding: 'MP3' },
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file

  const writeFile = util.promisify(fs.writeFile);
  await writeFile('output.mp3', response.audioContent, 'binary');
  fs.readFile('./output.mp3', (err, data) => {
    console.log('data:');
    console.log(data);
  });
  console.log(response.audioContent);
  return response.audioContent;
}

module.exports = getSpeech;
