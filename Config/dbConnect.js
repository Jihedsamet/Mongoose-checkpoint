const mongoose = require("mongoose");

const dbConn = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://sametjihed6:QSsiFXB0ALeZsglG@cluster0.zxutint.mongodb.net/personDb"
    );
    console.log("we are connected");
  } catch (error) {
    console.log(error);
  }
};
module.exports = dbConn;
