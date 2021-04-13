import authController from '@api/auth/auth.controller';
import prepareHandler from '@api/shared/prepare-handler.middleware';
import createHandler from '@api/shared/create-handler.middleware';

const login = createHandler({
  POST: authController.login,
});

export default prepareHandler(login);
