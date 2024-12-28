

const mongoose = require('mongoose');
const connectionString = process.env.URI_STRING;

const dbConnection = async () => {
    try {
        await mongoose.connect(connectionString, {});
        return true;
    } catch (error) {
        console.error('Failed to connect to the SOAR Database:', error.message);
        return false;
    }
};

module.exports = {
    dbConnection,
};
