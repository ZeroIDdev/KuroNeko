import jwt from 'jsonwebtoken';

export const AuthMidleware = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);

  if (!authorization) {
    return res.status(401).json({ error: 'Need authorization' });
  }

  const token = authorization.split(' ')[1];

  try {
    await jwt.verify(token, process.env.TOKEN);
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: error.message });
  }
};
