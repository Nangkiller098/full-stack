const fs = require("fs").promises;
const moment = require("moment");
const multer = require("multer");

//log error
const logError = async (
  controller = "user.list",
  message = "error message",
  res
) => {
  try {
    // Append the log message to the file (create the file if it doesn't exist)
    const timestamp = moment().format("YYYY-MM-DD HH:mm:ss"); // Use 'moment' for formatted timestamp
    const path = `./logs/${controller}.txt`;
    const logMessage = `[${timestamp}]  ${message}\n\n`;
    await fs.appendFile(path, logMessage);
  } catch (error) {
    console.error("Error writing to log file:", error);
  }
  res.status(500).send("Internal Server Error");
};

//validation value
const validation = (value) => {
  if (value == "" || value == null || value == undefined) {
    return true;
  }
  return false;
};

//upload image
const upload = multer({
  storage: multer.diskStorage({
    //image path
    destination: function (req, file, callback) {
      callback(null, Config.image_path);
    },
    filename: function (req, file, callback) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      callback(null, file.fieldname + "-" + uniqueSuffix);
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 3, //max 3MB
  },
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype != "image/png" &&
      file.mimetype !== "image/jpg" &&
      file.mimetype !== "image/jpeg"
    ) {
      // not allow
      callback(null, false);
    } else {
      callback(null, true);
    }
  },
});

// const myupload=multer({
//   storage:,
//   limits:,
//   fileFilter:,
// })

module.exports = { logError, validation, upload };
