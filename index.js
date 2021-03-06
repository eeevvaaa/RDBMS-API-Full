const express = require('express');
const helmet = require('helmet');
const port = 9000;

const cohortsRoutes = require('./cohorts/cohortsRoutes');
const studentsRoutes = require('./students/studentsRoutes');

const server = express();

server.use(helmet());
server.use(express.json());

//sanity
server.get('/', (req, res) => {
  res.json('Hi!');
});

//routes
server.use('/api/cohorts', cohortsRoutes);
server.use('/api/students', studentsRoutes);

//port
server.listen(port, () => console.log(`\n--- Server running on port ${port} ---\n`));