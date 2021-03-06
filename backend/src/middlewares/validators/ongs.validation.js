const { celebrate, Segments, Joi } = require('celebrate');

exports.create = [
	
	celebrate({
		[Segments.BODY]: Joi.object().keys({
			name: Joi.string().required(),
			email: Joi.string().required().email(),
			password: Joi.string().required().min(8),
			whatsapp: Joi.string().required().min(10).max(11),
			city: Joi.string().required(),
			uf: Joi.string().required().length(2)
		})
	}), (req, res, next) => next()

]