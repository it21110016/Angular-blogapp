// import user model
const User = require('../models/user');
// const bcrypt = require('bcrypt');
// import jwt module
const jwt = require('jsonwebtoken');

const { OAuth2Client } = require('google-auth-library');

// Initialize the OAuth2 client with your Google OAuth 2.0 client ID and client secret
const client = new OAuth2Client({
  clientId: '87702682850-o2vvulmvnn5tmc6mdckf3pq3o92i6bhg.apps.googleusercontent.com',
  clientSecret: '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',
});


// method to add a new user
const signUp = async (req, res) => {

  try {

    const { firstName, lastName, email, password } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Hash the password
    // const saltRounds = 10;
    // const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      // password: hashedPassword,
      password
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

//method to get all existing users
const getAllusers = async (req, res) => {

  try {

    const users = await User.find();

    if (users) {
      res.status(200).send(users);
    }
    else {
      res.status(400).send("Failed to get users");
    }

  } catch (error) {
    console.log(error.message);
  }
}

// method to login an user
const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'User does not exist, sign up first' });
    }

    // Check if the password is correct
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    // if (!isPasswordValid) {
    //   return res.status(401).json({ error: 'Invalid credentials' });
    // }

    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
      expiresIn: '1h', // Token expiration time
    });

    res.json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const gLogin = async (req, res) => {
  try {
    // Get the Google ID token from the request body
    const { googleIdToken } = req.body;

    // Verify the Google ID token using the initialized OAuth2 client
    const ticket = await client.verifyIdToken({
      idToken: googleIdToken,
      audience: '87702682850-o2vvulmvnn5tmc6mdckf3pq3o92i6bhg.apps.googleusercontent.com', // Replace with your actual client ID
    });

    // Get the payload from the verified Google ID token
    const payload = ticket.getPayload();

    // You can now use the `payload` data to identify the user and generate a JWT token
    const userId = payload.sub;

    // Generate a JWT token (you should use a proper library like `jsonwebtoken`)
    const token = jwt.sign({ userId }, 'your-secret-key', {
      expiresIn: '1h', // Token expiration time
    });

    // Send the JWT token as the response
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};



module.exports = { signUp, login, getAllusers, gLogin };