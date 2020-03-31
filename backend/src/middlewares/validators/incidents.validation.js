const { celebrate, Segments, Joi } = require('celebrate');

exports.index = [
  celebrate({
		[Segments.QUERY]: Joi.object().keys({
			page: Joi.number()
		})
	}), (req, res, next) => next()
]

exports.create = [
	celebrate({
		[Segments.BODY]: Joi.object().keys({
			title: Joi.string().required(),
			description: Joi.string().required(),
			value: Joi.number().min(1)
		})
	}), (req, res, next) => next()
]

exports.delete = [
	celebrate({
		[Segments.PARAMS]: Joi.object().keys({
			id: Joi.number().required()
		})
	}), (req, res, next) => next()
]