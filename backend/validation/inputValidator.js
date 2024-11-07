const validator = require("validator");
const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
        return 'Password must contain at least 8 characters, including an uppercase letter, a lowercase letter, and a special character.';
    }
    return null;
};

const isEmail = (email) =>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)){
        return "please enter a valid email address";
    }
    return '';
};

const isInteger = (num) => {
    if (!Number.isInteger(num)){
        return `${num} is not and integer`;
    }
    return '';
}

const isEmpty = (input) => {
    if (input.trim().length === 0){
        return `${input} Could not be empty`;
    }
    return '';
}

module.exports = {validatePassword, isEmail, isInteger, isEmpty}