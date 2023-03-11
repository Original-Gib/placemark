import Joi from "joi";

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const VenueSpec = {
  venueName: Joi.string().required(),
  street: Joi.string().required(),
  genre: Joi.string().required(),
};

export const CitySpec = {
  cityName: Joi.string().required(),
};
