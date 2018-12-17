const crypto = require('crypto');

module.exports = {
  generatePassword: async (password) => {
    const salt = await new Promise((resolve, reject) => {
      crypto.randomBytes(64, (err, buffer) => {
        if (err) reject(err);
        resolve(buffer.toString('base64'));
      });
    });

    const encryptedPassword = await new Promise((resolve, reject) => {
      crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, key) => {
        if (err) reject(err);
        resolve(key.toString('base64'));
      });
    });

    return {
      password: encryptedPassword,
      salt,
    };
  },
};
