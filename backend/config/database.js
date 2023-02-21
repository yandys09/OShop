require("colors");
const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(
        `Mongodb connected with server : ${data.connection.host}`.bgBlue.white
      );
    });
};

module.exports = connectDatabase;
