const express = require('express')
const server = express()
const path = require('path')
const mongoose = require('mongoose')

const Product = require('./models/product')

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

server.set('views', path.join(__dirname, 'views'))
server.set('view engine', 'ejs')
server.use(express.urlencoded({ extended: true }))

server.get('/products', async (req, res) => {
  const products = await Product.find({})
  res.render('products/index', { products })
})

server.get('/products/new', (req, res) => {
  res.render('products/new')
})

server.post('/products', async (req, res) => {
  const newProduct = new Product(req.body)
  await newProduct.save()
  res.redirect(`/products/${newProduct._id}`)
})

server.get('/products/:id', async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)
  res.render('products/show', { product })
})

server.get('/dogs', (req, res) => {
  res.send('dogs')
})

server.listen(3000, () => {
  console.log('Server is running on port 3000')
})
