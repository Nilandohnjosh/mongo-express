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

const seedProducts = [
  {
    name: 'Fairy Eggplant',
    price: 1.0,
    category: 'vegetable',
  },
  {
    name: 'Melon',
    price: 1.5,
    category: 'vegetable',
  },
  {
    name: 'Watermelon',
    price: 4.99,
    category: 'vegetable',
  },
  {
    name: 'Celery',
    price: 2.3,
    category: 'vegetable',
  },
]

Product.insertMany(seedProducts)
  .then((res) => {
    console.log(res)
    console.log('Seeded products')
  })
  .catch((err) => {
    console.log('Error seeding products:', err.message)
  }) // end of .catch

// const p = new Product({
//   name: 'Ruby Grapefruit',
//   price: 1.99,
//   category: 'fruit',
// })
// p.save()
//   .then(() => {
//     console.log('Product saved!')
//     console.log(p)
//   })
//   .catch((err) => {
//     console.log('Error saving product:', err.message)
//   })
