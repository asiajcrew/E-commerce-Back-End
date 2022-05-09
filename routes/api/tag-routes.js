const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const tagData = require('../../seeds/tag-seeds');


// The `/api/tags` endpoint

// get all tags
router.get('/', (req, res) => {
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    include: [
      {
        model: Product,
        attributes: ['product_name']
      }
    ]
  })
  .then(tagData => res.json(tagData))
});

// get one tag
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'tag_name'],
    include: [
      {
        model: Product,
        attributes: ['product_name']
      }
    ]
  })
  .then(tagData => {
    if (!tagData) {
      res.status(404).json({ message: 'No tag found' });
      return;
    }
    res.json(tagData);
  });
});

// create a new tag
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(tagData => res.json(tagData))
});

// update tag
router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(tagData => {
    if (!tagData) {
      res.status(404).json({ message: 'No Tag found with this id' });
      return;
    }
    res.json(tagData)
  });
});

// delete tag
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(tagData => {
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json(tagData)
  });
});

module.exports = router;
