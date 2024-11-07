const moment = require('moment');

const getCurrentTime = () => {
    return moment().format();
};

const params = {
    current_time: getCurrentTime()
};

module.exports = params;