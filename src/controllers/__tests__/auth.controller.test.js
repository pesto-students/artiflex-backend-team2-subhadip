import { mockRequest, mockResponse } from '../../utils/interceptor';
import { AuthController } from '..';
import authController from '../auth.controller';

describe('Auth Controller', () => {
  describe('POST /signup', () => {
    it('should create a new user and return a 201 status code for valid signup data', async () => {
      const req = mockRequest({
        body: {
          first_name: 'test firt name',
          last_name: 'test last name',
          email: 'testuser@gmail.com',
          mobile_no: '1234567899',
          password: 'testpassword',
        },
      });
      const res = mockResponse();

      await AuthController.signUp(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'User Created' });
    });

    it('should return a 400 status code for missing required fields ', async () => {
      const req = mockRequest({
        body: {
          first_name: 'test firt name',
          last_name: 'test last name',
          email: 'testuser@gmail.com',
          mobile_no: '1234567899',
          password: 'testpassword',
        },
      });
      const res = mockResponse();

      await AuthController.signUp(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        error: 'Something want wrong.',
      });
    });
  });

  describe('POST /signin', () => {
    it('should return a 201 status code and a token for valid credentials', async () => {
      const req = mockRequest({
        body: {
          username: 'testuser',
          password: 'testpassword',
        },
      });
      const res = mockResponse();

      await authController.signIn(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        status: 'ok',
        message: 'User Found',
        token: expect.any(String),
      });
    });

    it('should return a 401 status code for invalid credentials', async () => {
      const req = mockRequest({
        body: {
          username: 'testuser',
          password: 'wrongpassword',
        },
      });
      const res = mockResponse();

      await authController.signIn(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Authentication failed. Wrong password.',
      });
    });
  });
});
