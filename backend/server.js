const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "https://round-robin-coupon-distribution-rosy.vercel.app", // Allow all origins (change to frontend URL after first deployment)
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

// Models
const Coupon = mongoose.model('Coupon', new mongoose.Schema({
  code: String,
  discount: Number,
  status: { type: String, default: 'active' },
  assignedTo: { type: String, default: null }
}));

const Admin = mongoose.model('Admin', new mongoose.Schema({
  username: String,
  password: String
}));

const ClaimHistory = mongoose.model('ClaimHistory', new mongoose.Schema({
  email: String,
  couponCode: String,
  ip: String,
  timestamp: { type: Date, default: Date.now }
}));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log("MongoDB Connected");

  // Check and create admin user if not exists
  const adminUsername = 'admin';
  const adminPassword = 'admin123';
  const admin = await Admin.findOne({ username: adminUsername });
  if (!admin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await Admin.create({ username: adminUsername, password: hashedPassword });
    console.log("Admin user created successfully");
  }
}).catch(err => console.error(err));

// Middleware to check IP cooldown
const claimCooldown = new Map();

const checkAbuse = (req, res, next) => {
  const ip = req.ip;
  if (claimCooldown.has(ip) && Date.now() - claimCooldown.get(ip) < 60000) {
    return res.status(429).json({ message: "You can only claim a coupon once per minute." });
  }
  claimCooldown.set(ip, Date.now());
  next();
};

// Claim Coupon with Round-Robin Distribution
app.post('/claim', checkAbuse, async (req, res) => {
  const { email } = req.body;
  const availableCoupons = await Coupon.find({ status: 'active', assignedTo: null }).sort({ _id: 1 });

  if (availableCoupons.length === 0) {
    return res.status(400).json({ message: "No coupons available." });
  }

  // Get the next coupon in a round-robin manner
  const nextCoupon = availableCoupons[0];
  nextCoupon.assignedTo = email;
  await nextCoupon.save();

  await ClaimHistory.create({ email, couponCode: nextCoupon.code, ip: req.ip });

  res.json({ message: `Success! Your coupon: ${nextCoupon.code}` });
});

// Admin Login
app.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });

  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({ message: "Login successful" });
});

// Middleware to verify admin credentials
const verifyAdmin = async (req, res, next) => {
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username });

  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  next();
};

// Admin Panel Routes
app.get('/admin/coupons', verifyAdmin, async (req, res) => {
  const coupons = await Coupon.find();
  res.json(coupons);
});

app.post('/admin/coupons', verifyAdmin, async (req, res) => {
  const { code, discount } = req.body;
  await Coupon.create({ code, discount });
  res.json({ message: "Coupon added successfully" });
});

app.patch('/admin/coupons/:id/toggle', verifyAdmin, async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);
  if (!coupon) return res.status(404).json({ message: "Coupon not found" });
  
  coupon.status = coupon.status === 'active' ? 'inactive' : 'active';
  await coupon.save();
  res.json({ message: "Coupon status updated" });
});

app.get('/admin/claims', verifyAdmin, async (req, res) => {
  const history = await ClaimHistory.find().sort({ timestamp: -1 });
  res.json(history);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
