const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

mongoose
  .connect('mongodb://127.0.0.1:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connection successful');
  })
  .catch((e) => {
    console.log('Connection error');
  });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = new mongoose.model('User1', userSchema);

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email }).exec();
    if (user) {
      if (password === user.password) {
        // Send user data on successful login
        res.send({ success: true, message: 'Login Successful', user: user });
      } else {
        // Send a failure message if the password doesn't match
        res.send({ success: false, message: "Password didn't match" });
      }
    } else {
      // Send a failure message if the user is not registered
      res.send({ success: false, message: 'User not registered' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
});
//app.use('/project',require('./routes/projects'))


app.listen(9002, () => {
  console.log('Backend started at port 9002');
});