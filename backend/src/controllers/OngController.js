const connection = require('../database/connection');
const gererateUniqueId = require('../utils/generateUniqueId');
const encrypt = require('../utils/encrypt');

module.exports = {
	async index(req, res) {
		const ongs = await connection('ongs').select('*');

		return res.json(ongs);
	},

	async create(req, res) {
		const { name, email, password, whatsapp, city, uf } = req.body;

		const ong = await connection('ongs')
			.where('email', email)
			.select('id')
			.first();

		if (ong) {
			return res.status(401).json({ message: 'Já existe uma ONG cadastrada para o e-mail informado.' });
		}

		const id = gererateUniqueId();
		const password_hash = await encrypt.encryptPassword(password);

		await connection('ongs').insert({
			id,
			name,
			email,
			password,
			password_hash,
			whatsapp,
			city,
			uf
		});
	
		return res.json({ 
			id,
      name,
      email
		 });
	}
}