const express = require('express');
const router = express.Router();
const thoughtController {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
} = require('../../controllers/thoughtController');

// GET all thoughts
router.get('/', thoughtController.getAllThoughts);

// GET a single thought by its _id
router.get('/:thoughtId', thoughtController.getThoughtById);

// POST to create a new thought
router.post('/', thoughtController.createThought);

// PUT to update a thought by its _id
router.put('/:thoughtId', thoughtController.updateThought);

// DELETE to remove a thought by its _id
router.delete('/:thoughtId', thoughtController.deleteThought);

// POST to create a reaction in a thought's reactions array field
router.post('/:thoughtId/reactions', thoughtController.createReaction);

// DELETE to remove a reaction by the reaction's reactionId value
router.delete('/:thoughtId/reactions/:reactionId', thoughtController.removeReaction);

module.exports = router;