const jwt = require('jsonwebtoken');
require("dotenv").config();
const bcrypt = require('bcrypt');
const {Users} = require('../models/Users');
const {errorResponse, successResponse, formatedError} = require('../controller/baseController');

const tokenBlacklist = [];

// When a user logs out, add their token to the blacklist
function addToBlacklist(token) {
    tokenBlacklist.push(token);
}

// Check if a token is blacklisted
function isTokenBlacklisted(token) {
    return tokenBlacklist.includes(token);
}

// Your controller function to find by a specific column (e.g., username)
const findUserByUsername = async (res, username) => {
    try {
        return Users.findOne({
            where: {
                email: username // Filter by the 'username' column
            }
        }).then(user =>{
            if (!user)
                return errorResponse(res, 422, "Invalid username or Password !");
            return user;
        });
    }
    catch (error) {
        return errorResponse(res, 500, error.message);
    }
};

const getUserById = async (id) => {
    return  await Users.findByPk(id);
}
async function login(req, res) {
    const { username, password } = req.body;
    try {
        // Check if username or password is null or empty
        if (!username || !password) {
            return errorResponse(res, 422, "Username or password cannot be empty");
        }
        // Find the user by username
        const user = await findUserByUsername(res, username);

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return errorResponse(res, 422, "Invalid username or password: ");
        }

        const payload = {
            userId: user.id,
            role: user.role,
            email : user.email
        };
        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.APP_KEY, {
            expiresIn: process.env.EXPIRE,
        });

        const [updatedRowsCount, updatedRows] = await Users.update({last_login: new Date()}, {
            where: { id: user.id },
            returning: true, // This ensures Sequelize returns the updated record
        });

        // Fetch user details including StaffDetail, AccountType, Permission (excluding password)
        const userData = await getUserById(user.id);
        const  data = {
            token: token,
            userData
        }
        return successResponse(res, data);
    } catch (error) {
        return errorResponse(res, 422, formatedError(error));
    }
}

const logout = (req, res) => {
    // Assuming you have the token available in the request
    const token = req.headers.authorization;
    addToBlacklist(token);
    return successResponse(res, {message : "Logged out successfully"});
};

const verifyToken = (req, res, next) => {
    const token = req.query._token??req.headers['authorization'];

    if (token) {
        const tokenValue = req.query._token??token.split(' ')[1];
        //Check if token is blacklisted
        if (isTokenBlacklisted(tokenValue)) {
            return errorResponse(res, 401, "Token expired");
        }
        jwt.verify(tokenValue, process.env.APP_KEY, async (err, decoded) => {
            if (err) {
                return errorResponse(res, 401, "Invalid token or token mismatch");
            } else {

                req.userId = decoded.userId;
                req.role = decoded.role;
                req.email = decoded.email;
                req.decoded = decoded;
                req.token_key = tokenValue;
                next();
            }
        });
    } else {
        return errorResponse(res, 401, "Invalid or missing token !");
    }
};
module.exports = { login, logout, verifyToken};