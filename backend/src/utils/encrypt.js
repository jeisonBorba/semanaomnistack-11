const bcrypt = require('bcryptjs');

module.exports = {
  encryptPassword(password) {
		return bcrypt.hash(password, 8);
	},

	checkPassword(password, password_hash) {
    return bcrypt.compare(password, password_hash);
  }
}