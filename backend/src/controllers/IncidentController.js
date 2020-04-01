const connection = require('../database/connection');

module.exports = {
	async index(req, res) {
		const { page = 1 } = req.query;

		const [count] = await connection('incidents').count();

		const incidents = await connection('incidents')
			.select([
				'incidents.*', 
				'ongs.name', 
				'ongs.email', 
				'ongs.whatsapp', 
				'ongs.city', 
				'ongs.uf'
			])
			.join('ongs', 'ongs.id', '=', 'incidents.ong_id')
			.options({ nestTables: true })
			.limit(5)
			.offset((page - 1) * 5);

		res.header('X-Total-Count', count['count(*)']);		

		return res.json(incidents);
	},

	async create(req, res) {
		const { title, description, value } = req.body;
		const ong_id = req.userId;

		const [id] = await connection('incidents').insert({
			title,
			description,
			value,
			ong_id
		});

		return res.json({ id });
	},

	async delete(req, res) {
		const { id } = req.params;
		const ong_id = req.userId;

		const incident = await connection('incidents')
			.where('id', id)
			.select('ong_id')
			.first();

		if (!incident) {
			return res.status(404).json({ error: 'Nenhum caso encontrado para esta ONG.' });
		}

		if (incident.ong_id !== ong_id) {
			return res.status(401).json({ error: 'Você não tem permissão para apagar este caso.' });
		}

		await connection('incidents')
			.where('id', id)
			.delete();

		return res.status(204).send();
	}
}