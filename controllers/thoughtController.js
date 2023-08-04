const Thought = require('../models/Thought');

const thoughtController = {
  // Able to get all thoughts
  getAllThoughts: async (req, res) => {
    try {
      // Fetch all thoughts from the database
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (error) {
      console.error('Error fetching thoughts:', error);
      res.status(500).json({ error: 'Could not fetch thoughts.' });
    }
  },

  // Able to get a single thought by its _id
  getThoughtById: async (req, res) => {
    try {
      const thoughtId = req.params.thoughtId;
      // Fetch the thought by _id
      const thought = await Thought.findById(thoughtId);
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found.' });
      }
      res.json(thought);
    } catch (error) {
      console.error('Error fetching thought:', error);
      res.status(500).json({ error: 'Could not fetch the thought.' });
    }
  },

  // Ability to create a new thought
  createThought: async (req, res) => {
    try {
      const { thoughtText, username } = req.body;
      // Create a new thought in the database
      const newThought = await Thought.create({ thoughtText, username });
      res.status(201).json(newThought);
    } catch (error) {
      console.error('Error creating thought:', error);
      res.status(500).json({ error: 'Could not create a new thought.' });
    }
  },

  // Ability to update a thought by its _id
  updateThought: async (req, res) => {
    try {
      const thoughtId = req.params.thoughtId;
      const { thoughtText } = req.body;
      // Find the thought by _id and update the thoughtText field
      const updatedThought = await Thought.findByIdAndUpdate(thoughtId, { thoughtText }, { new: true });
      if (!updatedThought) {
        return res.status(404).json({ error: 'Thought not found.' });
      }
      res.json(updatedThought);
    } catch (error) {
      console.error('Error updating thought:', error);
      res.status(500).json({ error: 'Could not update the thought.' });
    }
  },

  // Ability to delete a thought by its _id
  deleteThought: async (req, res) => {
    try {
      const thoughtId = req.params.thoughtId;
      // Find the thought by _id and delete it
      const deletedThought = await Thought.findByIdAndDelete(thoughtId);
      if (!deletedThought) {
        return res.status(404).json({ error: 'Thought not found.' });
      }
      res.json({ message: 'Thought deleted successfully.' });
    } catch (error) {
      console.error('Error deleting thought:', error);
      res.status(500).json({ error: 'Could not delete the thought.' });
    }
  }
};

module.exports = thoughtController;