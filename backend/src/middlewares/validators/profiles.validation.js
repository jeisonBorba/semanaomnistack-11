const { celebrate, Segments, Joi } = require('celebrate');

exports.index = [
	celebrate({
		[Segments.HEADERS]: Joi.object({
				authorization: Joi.string().required()
		}).unknown()
	}), (req, res, next) => next()
]