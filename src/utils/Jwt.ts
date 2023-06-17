import { sign, verify } from 'jsonwebtoken';

class Jwt {
  #secret = 'secret';

  signToken(payload: object) {
    try {
      const token = sign(payload, this.#secret, { expiresIn: '1h' });

      return Promise.resolve(token);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  verifyToken(token: string) {
    try {
      const decoded = verify(token, this.#secret);

      return Promise.resolve(decoded);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default new Jwt();
