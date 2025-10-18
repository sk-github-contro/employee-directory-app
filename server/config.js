require('dotenv').config();

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/employee-directory',
  PORT: process.env.PORT || 4000
};
