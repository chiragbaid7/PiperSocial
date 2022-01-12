const router = require('express').Router();

const {ValidateUserRegistration} = require('../../../../middleware/validation');
const UserHandler = require('../../../controllers/v1/user')

router.post('/signup', ValidateUserRegistration, UserHandler.createUser);
router.post('/signin', UserHandler.getUser);

module.exports= router;