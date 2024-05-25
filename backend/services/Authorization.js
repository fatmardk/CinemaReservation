const jwt = require('jsonwebtoken');

class Authorization {
    authorized(req, res, next) {
        const headerToken = req.headers.authorization;
        if (headerToken) {
            const token = headerToken.split(' ')[1];
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            if (verified) {
                next();
            } else {
                res.status(401).json({ errors: [{ msg: 'Please add a valid token!' }] });
            }
        } else {
            return res.status(401).json({ errors: [{ msg: 'Please add a token, unauthorizated!' }] });
        }
    }
}

module.exports = new Authorization();