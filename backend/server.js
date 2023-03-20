const socketIO = require('socket.io');

require('dotenv').config();

const { createApp } = require('./app');
const { appDataSource } = require('./models/index');
const { socketMessage } = require('./middlewares/socket.io');

const startServer = async () => {
  const app = createApp();
  const PORT = process.env.PORT;
  const SOCKET_PORT = process.env.SOCKET_PORT;

  const io = socketIO(SOCKET_PORT);

  socketMessage(io);

  await appDataSource
    .initialize()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`🟢server is listening on ${PORT}🟢`);
      });
    })
    .catch((err) => {
      console.log(`❌Failed server connect❌`);
      appDataSource.destroy();
    });
};

startServer();
