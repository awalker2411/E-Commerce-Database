const router = require('express').Router();
const { Category, Product } = require('../../models');
const { create } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const catInfo = await Category.findAll({include: Product})
    res.status(200).json(catInfo)
  }catch(err){
    res.status(500).json(err)
  }
});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const oneCatInfo = await Category.findByPk(req.params.id, {include: Product})
    if(!oneCatInfo){
      res.status(404).json({message: `Category ID not found.`})
    }
    res.status(200).json(oneCatInfo)
  }catch(err){
    res.status(500).json(err)
  }
});

router.post('/', async(req, res) => {
  // create a new category
  try{
    const createCat = await Category.create(req.body)
    res.status(200).json(createCat)
  }catch(err){
    res.status(500).json(err)
  }
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  try{
    const updateCat = await Category.update({category_name: req.body.category_name}, {where: {id: req.params.id}})
    if(!updateCat){
      res.status(404).json({message: `Category ID not found.`})
    }
    res.status(200).json(updateCat)
  }catch(err){
    res.status(500).json(err)
  }
});

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  try{
    const deleteCat = await Category.destroy({where:{id: req.params.id}})
    if(!deleteCat){
      res.status(404).json({message: `Category ID not found.`})
    }
    res.status(200).json(deleteCat)
  }catch(err){
    res.status(500).json(err)
  }
})

module.exports = router;