require('dotenv').config();

const { createApp } = require('./app');
const { appDataSource } = require('./models/index');
const { socketMessage } = require('./middlewares/socket.io');

const startServer = async () => {
  const app = createApp();
  const PORT = process.env.PORT;

  await appDataSource
    .initialize()
    .then(() => {
      const server = app.listen(PORT, () => {
        console.log(`🟢server is listening on ${PORT}🟢`);
      });

      const io = require('socket.io')(server, {
        path: '/socket.io',
        cors: {
          origin: true,
          credentials: true,
        },
      });
      app.set('io', io);

      socketMessage(io);
    })
    .catch((err) => {
      console.log(`❌Failed server connect❌`);
      appDataSource.destroy();
    });
};

startServer();
