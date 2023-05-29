import jwt from 'jsonwebtoken';
import { pathViews } from '../../utils/static-path';

const jwtMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.sendFile('public/login/login.html', pathViews);
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_JWT_SECRET);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token invalid' });
    }
};

const generateTokenMiddleware = (req, res, next) => {
    try {
        const token = jwt.sign({
            email: req.body.email,
            password: req.body.password
        }, process.env.TOKEN_JWT_SECRET, { expiresIn: '1h' });
        res.setHeader('Authorization', token);
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Error generating token' });
    }
};

module.exports = {
    jwtMiddleware,
    generateTokenMiddleware
};