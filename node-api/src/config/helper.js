const fs = require("fs").promises;
const moment = require("moment");

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
module.exports = { logError };
