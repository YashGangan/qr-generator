/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

// get input with inquirer
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';


inquirer
  .prompt([
    {
        "message": "Enter the url",
        "name": "URL"
    }
  ])
  .then((answers) => {
    var img = qr.image(answers.URL);
    img.pipe(fs.createWriteStream('img.png'));

    fs.writeFile('url-entered.txt', answers.URL, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
}); 
 
    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      throw console.error();
    } else {
      // Something else went wrong
      console.log("Some Error")
    }
  });