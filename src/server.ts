/* eslint-disable no-console */
import mongoose from 'mongoose';
import envConfig from './config/envConfig';
import app from './app';
import { Server } from 'http';

let server: Server;
const main = async () => {
  try {
    await mongoose.connect(envConfig.database_url as string);
    console.log(`🤩 Database is connected`);

    server = app.listen(envConfig.PORT, () => {
      console.log(
        `App is listening on PORT ${envConfig.PORT} & Process ID ${process.pid}`
      );
    });
  } catch (err) {
    console.log(`Failed to connect to Database ${err}`);
  }

  // handling Gracefully shutting off the server for unhandledRejection
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
};

main();

// handling shutting off the server for uncaughtException
process.on('uncaughtException', error => {
  console.log(error);
  process.exit(1);
});

// handling signal for termination
process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  if (server) {
    server.close();
  }
});
