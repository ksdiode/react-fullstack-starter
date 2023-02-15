const router = require('express').Router();
const User = require('../models/user');
const passport = require('passport');
const createService = require('../controller');

const service = createService(User, { select: 'userId updatedAt' });
const auth = passport.authenticate('jwt', { session: false });

router
  .get('/', service.getPage)
  .get('/:_id', service.getOne)
  .post('/', auth, service.create)
  .put('/:_id', auth, service.update)
  .delete('/:_id', auth, service.remove);

module.exports = router;
