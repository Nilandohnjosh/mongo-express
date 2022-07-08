const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')

mongoose
  .connect('mongodb://localhost:27017/farmStand', {
    useNewUrlParser: true,
    // useUnifiedTopoly: true,
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err.message)
  })

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/dogs', (req, res) => {
  res.send('dogs')
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
