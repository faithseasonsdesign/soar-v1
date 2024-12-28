

const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    userFirstName: { type: String, required: true },
    userLastName: { type: String, required: true },
    userEmailAddress: { 
        type: String, 
        required: true, 
        unique: true,
    },
    userPhoneNumber: { 
        type: String, 
        required: true, 
        unique:true,
    },
    userCountry: { type: String, required: true },
    userLocation: { type: String, required: true },
    userNameOfCourse: { type: String, required: true },
    userCourseSpecialization: { type: String, required: true },
    userPassword: { 
        type: String, 
        required: true, 
        minlength: 8, 
        select: false,  
    },
    userOTP: { 
        type: String, 
        required: true, 
    },
}, { timestamps: true });

module.exports = mongoose.model('User', usersSchema);
