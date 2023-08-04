const User = require('../models/User');
const Thought = require('../models/Thought');

const userController = {
  // Controller function to get all users
  getAllUsers: async (req, res) => {
    try {
      // Fetch all users from the database
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Could not fetch users.' });
    }
  },

  //  Get a single user by its _id and populated thought and friend data
  getUserById: async (req, res) => {
    try {
      const userId = req.params.userId;
      // Fetch the user by _id and populate thoughts and friends
      const user = await User.findById(userId).populate('thoughts friends');
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
      res.json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Could not fetch the user.' });
    }
  },

  // This will create a new user
  createUser: async (req, res) => {
    try {
      const { username, email } = req.body;
      // Create a new user in the database
      const newUser = await User.create({ username, email });
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Could not create a new user.' });
    }
  },

  // Ability to update a user by its _id
  updateUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const { username, email } = req.body;
      // Find the user by _id and update the fields
      const updatedUser = await User.findByIdAndUpdate(userId, { username, email }, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found.' });
      }
      res.json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Could not update the user.' });
    }
  },

  // Ability to delete a user by its _id
  deleteUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      // Find the user by _id and delete it
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found.' });
      }
      // Bonus: Remove the user's associated thoughts when deleted
      await Thought.deleteMany({ username: deletedUser.username });
      res.json({ message: 'User and associated thoughts deleted.' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Could not delete the user.' });
    }
  },

  // This will add a new friend to a user's friend list
  addFriend: async (req, res) => {
    try {
      const userId = req.params.userId;
      const friendId = req.params.friendId;
      // Find the user and friend by their _ids
      const user = await User.findById(userId);
      const friend = await User.findById(friendId);
      if (!user || !friend) {
        return res.status(404).json({ error: 'User or friend not found.' });
      }
      // Update the friends array in both the user and friend documents
      user.friends.push(friendId);
      friend.friends.push(userId);
      await user.save();
      await friend.save();
      res.json({ message: 'Friend added successfully.' });
    } catch (error) {
      console.error('Error adding friend:', error);
      res.status(500).json({ error: 'Could not add a friend.' });
    }
  },

  // This will be for removing a friend from a user's friend list
  removeFriend: async (req, res) => {
    try {
      const userId = req.params.userId;
      const friendId = req.params.friendId;
      // Find the user and friend by their _ids
      const user = await User.findById(userId);
      const friend = await User.findById(friendId);
      if (!user || !friend) {
        return res.status(404).json({ error: 'User or friend not found.' });
      }
      user.friends.pull(friendId);
      friend.friends.pull(userId);
      await user.save();
      await friend.save();
      res.json({ message: 'Friend removed successfully.' });
    } catch (error) {
      console.error('Error removing friend:', error);
      res.status(500).json({ error: 'Could not remove the friend.' });
    }
  },
};

module.exports = userController;