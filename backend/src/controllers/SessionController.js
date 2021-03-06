const jwt = require('jsonwebtoken');

const connection = require('../database/connection');
const authConfig = require('../config/auth');
const encrypt = require('../utils/encrypt') ;

module.exports = {
	async create(req, res) {
		const { email, password } = req.body;

		const ong = await connection('ongs')
			.select(['id', 'name', 'password_hash'])
			.where('email', email)
			.first();

		if (!ong) {
			return res.status(404).json({ message: 'ONG não encontrada.' });
		}

		if (!(await encrypt.checkPassword(password, ong.password_hash))) {
      return res.status(401).json({ message: 'E-mail ou password incorreto.' });
		}
		
		const { id, name } = ong;
			
    return res.json({
      ong: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
	}
}