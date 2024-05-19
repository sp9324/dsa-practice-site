const { User } = require('../models/user.js');

// exports.createUser = async (req, res) => {
//   const { name, email, password } = req.body;

//   const user = new User({
//     name,
//     email,
//     password
//   });

//   await user.save();

//   res.send({
//     message: 'User registered successfully!'
//   });
// };

exports.getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
};

// exports.updatePoints = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const { isCorrect } = req.body;
//         const user = await User.findById(userId);
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }
  
//       if (isCorrect) {
//         // Increment points by 5 if the answer is correct
//         user.points += 5;
//         await user.save();
//       }
  
//       res.json(user);
//     } catch (error) {
//       res.status(500).json({ error: 'Error updating user points' });
//     }
//   };

module.exports = {
  getUserById,
  // updatePoints,
};
