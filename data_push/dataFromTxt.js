const fs = require("fs");

//A function to make entries objects and save them on an array
//Starting from a text file

try {
  //We get the data in the text file
  const data = fs.readFileSync("googleDoc.txt", "utf8");
  //Custom regex to separate each entry based on the line breaks
  let entryRegex = /(?<=\n).*(?=\.)/gm;
  //We use the regex to actually separate them
  let firstSplit = data.match(entryRegex);
  //Initiate an array to push the entries once we clean them up
  let dataArray = [];

  firstSplit.forEach((result, index) => {
    //Split the entries based on a coomon marking (spaces in between to make it cleaner)
    let secondSplit = result.split(" - ");
    //create an object out of the splited entries
    dataArray.push({
      word: secondSplit[0],
      definition: secondSplit[1],
      //This two are placeholders for now as they were not entered in the original text file
      type: "(n.)",
      related: ["jelly", "shoulder", "one"],
    });
  });

  const stringData = JSON.stringify(dataArray);

  fs.writeFile("structuredData.js", stringData, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("data written succesfully");
  });
} catch (err) {
  console.error(err);
}
