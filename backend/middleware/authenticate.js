import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
export const authenticate = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) return res.status(403).json({ message: 'Unauthorized' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded)
        req.userId = await User.findById(decoded.id);
        if (!req.userId) return res.status(403).json({ message: 'Unauthorized' });
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
export default {};
