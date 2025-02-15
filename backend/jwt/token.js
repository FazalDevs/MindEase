import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
export const generateToken = async (id, res) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
    });
    await User.findByIdAndUpdate(id, { token });
    return token;
};


