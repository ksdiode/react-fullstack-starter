const passport = require('passport');
const { ExtractJwt, Strategy: JWTStrategy } = require('passport-jwt');
const User = require('../models/user');

const JWTConfig = {
  // jwt가 있는 헤더명 설정
  jwtFromRequest: ExtractJwt.fromHeader('Authorization'),
  secretOrKey: process.env.JWT_SECRET_KEY,
};

const JWTVerify = async (jwtPayload, done) => {
  try {
    // payload의 id값으로 유저의 데이터 조회
    const user = await User.findOne({ userId: jwtPayload.user.userId });
    // 유저 데이터가 있다면 유저 데이터 객체 전송
    if (user) {
      return done(null, user);
    }
    // 유저 데이터가 없을 경우 에러 표시
    done(null, false, { reason: '올바르지 않은 인증정보 입니다.' });
  } catch (error) {
    console.error(error);
    done(error);
  }
};

module.exports = (app) => {
  app.use(passport.initialize());

  // 로그인 성공시 호출할 함수 등록
  passport.serializeUser((user, done) => done(null, user));
  // 모든 요청시 호출할 함수 등록, user가 req.user가 됨
  passport.deserializeUser((user, done) => done(null, user));

  passport.use('jwt', new JWTStrategy(JWTConfig, JWTVerify));
};
