const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');
const productData= require('../../seeds/product-seeds')

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  Product.findAll({
    attributes: ['id', 'product_name', 'price', 'stock'],
    include: [
      {
        model: Category,
        attributes: ['id']
      },
      {
        model: Tag,
        attributes: ['id']
      }
    ]
  })
  .then(productData => res.json(productData))
});

// get one product
router.get('/:id', (req, res) => {
  Product.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'product_name', 'price', 'stock'],
    include: [
      {
        model: Category,
        attributes: ['id']
      },
      {
        model: Tag,
        attributes: ['id']
      }
    ]
  })
  .then(productData => {
    if (!productData) {
      res.status(404).json({ message: 'No product found' });
      return;
    }
    res.json(productData);
  });
});

// create new product
router.post('/', (req, res) => {
  Product.create({
    product_name: req.body.product_name,
    price: req.body.price,
    stock: req.body.stock
  })
  .then((productTagIds) => res.status(200).json(productTagIds))
});

// update product
router.put('/:id', (req, res) => {
  Product.update(
    {  
        product_name: req.body.title
    },
    {
        where: {
            id: req.params.id
        }
    }
  )
  .then(productData => {
      if (!productData) {
          res.status(404),json({ message: 'No product found with this id' });
          return;
      }
      res.json(productData);
  })
});

// delete product
router.delete('/:id', (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(productData => {
    if (!productData) {
      res.status(404).json({ message: 'No product found with this id' });
      return;
    }
    res.json(productData)
  });
});

module.exports = router;
