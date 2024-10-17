import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  moneda_principal: { type: Number, default: 0 },
  monedas_minadas: { type: Number, default: 0 },
  cantidad_referidos: { type: Number, default: 0 },
  usdt: { type: Number, default: 0 },
  potenciador_activo: { type: Boolean, default: false },
  carta_activa: { type: String, default: '' },
  clicks: { type: Number, default: 0 },
  miningRate: { type: Number, default: 1 },
  currentLevel: { type: Number, default: 1 },
  levelProgress: { type: Number, default: 0 },
  lastDailyReward: { type: Date },
  referralCode: { type: String, unique: true },
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  miningCards: [{
    name: String,
    level: Number,
    production: Number
  }],
  lastClickTime: { type: Date },
  clickCount: { type: Number, default: 0 },
  extraClicks: { type: Number, default: 0 },
  boosters: [{
    type: String,
    expiresAt: Date
  }]
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const UserModel = mongoose.model('User', userSchema);