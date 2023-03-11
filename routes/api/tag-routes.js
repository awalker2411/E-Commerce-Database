const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tagInfo = await Tag.findAll({include:[{model:Product}]})
    if(!tagInfo){
      res.status(404).json({message: `Tag ID not found.`})
    }
    res.status(200).json(tagInfo)
  }catch(err){
    res.status(500).json(err)
  }
});

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const oneTagInfo = await Tag.findByPk(req.params.id,{include: Product})
    res.status(200).json(oneTagInfo)
  }catch(err){
    res.status(500).json(err)
  }
});

router.post('/', async(req, res) => {
  // create a new tag
  try{
    const newTag = await Tag.create(req.body)
    res.status(200).json(newTag)
  }catch(err){
    res.status(400).json(err)
  }
});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try{
    const updateTag = await Tag.update(req.body,{where:{id:req.params.id}})
    if(!updateTag){
      res.status(404).json({message: `Tag ID not found.`})
    }
    res.status(200).json(updateTag)
  }catch(err){
    res.status(500).json(err)
  }
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try{
    const deleteTag = await Tag.destroy({where:{id:req.params.id}})
    res.status(200).json(deleteTag)
  }catch(err){
    res.status(500).json(err)
  }
});

module.exports = router;
