import authController from '@api/controllers/authController';
import prepareHandler from '@api/middlewares/prepareHandler';
import createHandler from '@api/middlewares/createHandler';

const login = createHandler({
  POST: authController.login,
});

export default prepareHandler(login);
