const data = require("./structuredData");
const axios = require("axios");

const uploadData = async () => {
  data.forEach(async (entry, index) => {
    await axios.post("http://localhost:5000/api/addword", entry);

    console.log("uploaded succesfully", index);
  });
};

uploadData().catch((err) => console.log(err));
