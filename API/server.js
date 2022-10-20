const dotenv = require('dotenv');
const { connectDB } = require('./configs/setupDB');

// Handling uncaught error exceptions
process.on('uncaughtException', (error) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(error.name, error.message);
  process.exit(1);
});

// initialize dotenv
dotenv.config({
  path: './config.env',
});

const app = require('./app');

// Call db connection
connectDB();

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});

// handling unhandled rejections
process.on('unhandledRejection', (error) => {
  console.log(error.name, error.message);
  console.log('UNHANDLED REJECTION! Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
