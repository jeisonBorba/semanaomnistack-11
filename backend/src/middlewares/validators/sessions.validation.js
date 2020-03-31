const { celebrate, Segments, Joi } = require('celebrate');

exports.create = [
	
	celebrate({
		[Segments.BODY]: Joi.object().keys({
			email: Joi.string().required().email(),
			password: Joi.string().required()
		})
	}), (req, res, next) => next()

]