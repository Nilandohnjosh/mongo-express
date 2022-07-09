const express = require('express')
const server = express()
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

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

// Middleware
server.use(express.static(path.join(__dirname, 'public')))
server.use(express.urlencoded({ extended: true }))
server.use(methodOverride('_method'))

const categories = ['fruit', 'vegetable', 'dairy']

server.get('/products', async (req, res) => {
  const { category } = req.query
  if (category) {
    const products = await Product.find({ category })
    res.render('products/index', { products, category })
  } else {
    const products = await Product.find({})
    res.render('products/index', { products, category: 'All' })
  }
})

server.get('/products/new', (req, res) => {
  res.render('products/new', { categories })
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

server.get('/products/:id/edit', async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)
  res.render('products/edit', { product, categories })
})

server.put('/products/:id', async (req, res) => {
  const { id } = req.params
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  })
  res.redirect(`/products/${product._id}`)
})

server.delete('/products/:id', async (req, res) => {
  const { id } = req.params
  const deletedProduct = await Product.findByIdAndDelete(id)
  res.redirect('/products')
})

server.get('/dogs', (req, res) => {
  res.send('dogs')
})

server.listen(3000, () => {
  console.log('Server is running on port 3000')
})
