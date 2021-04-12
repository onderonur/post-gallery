import authController from '@api/auth/auth.controller';
import createHandler from '@api/shared/create-handler.middleware';

const logout = createHandler({
  POST: authController.logout,
});

export default logout;
