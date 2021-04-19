const jwt = require('jsonwebtoken');
require('dotenv/config');

module.exports = {
  generateToken(data) { return jwt.sign(data, process.env.TOKEN, { expiresIn: '1d'})},

  async decodeToken (token) { return await jwt.verify(token, process.env.TOKEN) },

  authorize (req, res, next) {
    const token = req.headers['x-access-token'];

    if(!token){
      res.status(401).json({
        message: 'Acesso Restrito'
      });
    } else {
      jwt.verify(token, process.env.TOKEN, function (error, decoded) {
        if(error){
          res.status(401).json({
            message: 'Token Inválido'
          });
        } else {
          next();
        }
      });
    }
  },


}