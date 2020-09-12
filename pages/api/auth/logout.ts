import authController from '@api/controllers/authController';
import createHandler from '@api/middlewares/createHandler';

const logout = createHandler({
  POST: authController.logout,
});

export default logout;
