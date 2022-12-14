const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors')
const port = 5000

const app = express()
connectToMongo();
app.use(cors())
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Running on port ${port}`)
})