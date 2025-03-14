const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const Admin = mongoose.model('Admin', new mongoose.Schema({
  username: String,
  password: String
}));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log("MongoDB Connected");

  const username = 'admin';
  const password = 'admin123';
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = new Admin({ username, password: hashedPassword });
  await admin.save();

  console.log("Admin user created successfully");
  mongoose.connection.close();
}).catch(err => console.error(err));