// middleware d'authentification, compare la chaine secrete présente dans 
//le cookie qui contien token de la requête 

// module permettant de travailler avec les token d'authéntification
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  try {
    const cookie = req.cookies['jwt'];

		const claims = jwt.verify(cookie, 'az8K56GTF712dpB');
		if (!claims) {
			return res.status(401).json({ error: 'unauthenticated' });
		} else {

      next();
    }
  } catch {
    res.status(401).json({ error: new Error('Invalid request!') });
  }
};