const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoosePaginate = require('mongoose-paginate-v2');

const saltRounds = 10;

const UserSchema = mongoose.Schema(
  {
    userId: { type: String, require: true },
    password: { type: String, require: true },
  },
  { timestamps: true }
);

UserSchema.methods = {
  async comparePassword(plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
  },

  async getToken() {
    const { userId } = this;
    const token = await jwt.sign(
      {
        type: 'JWT',
        user: { userId },
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXP, //  '15m' 15분
        issuer: process.env.JWT_ISSUER,
      }
    );
    return token;
  },
};

UserSchema.statics = {
  async login({ userId, password }) {
    const user = await this.findOne({ userId });
    let isLogin = user && (await user.comparePassword(password));
    if (isLogin) {
      const token = await user.getToken();
      return { isLogin, userId: user.userId, token };
    } else {
      return {
        isLogin,
        reason: '사용자 ID 또는 비밀번호가 일치하지 않습니다.',
      };
    }
  },
};

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    const salt = bcrypt.genSaltSync(saltRounds);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
  } else {
    next();
  }
});

UserSchema.plugin(mongoosePaginate);

const User = mongoose.model('User ', UserSchema);
module.exports = User;
