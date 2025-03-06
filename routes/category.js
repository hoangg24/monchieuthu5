const express = require('express');
const router = express.Router();
const categoryModel = require('../schemas/category');

// Create a new category
router.post('/', async (req, res) => {
    try {
        let newCategory = new categoryModel({
            name: req.body.name,
            description: req.body.description
        });
        await newCategory.save();
        res.status(201).send({
            success: true,
            data: newCategory
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message
        });
    }
});

// Read all categories
router.get('/', async (req, res) => {
    try {
        let categories = await categoryModel.find();
        res.status(200).send({
            success: true,
            data: categories
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message
        });
    }
});

// Read a single category by id
router.get('/:id', async (req, res) => {
    try {
        let category = await categoryModel.findById(req.params.id);
        if (!category) return res.status(404).send({
            success: false,
            message: 'Category not found'
        });
        res.status(200).send({
            success: true,
            data: category
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message
        });
    }
});

// Update a category by id
router.put('/:id', async (req, res) => {
    try {
        let category = await categoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) return res.status(404).send({
            success: false,
            message: 'Category not found'
        });
        res.status(200).send({
            success: true,
            data: category
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message
        });
    }
});

// Delete a category by id
router.put('/delete/:id', async (req, res) => {
    try {
        let category = await categoryModel.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true });
        if (!category) return res.status(404).send({
            success: false,
            message: 'Category not found'
        });
        res.status(200).send({
            success: true,
            data: category
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
