require('dotenv').config();
const app = require("./app");
const logger = require("./utils/logger");
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send("Welcome to Markdown services");
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
