const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://Sudeep36:Sudeep123@cluster0.9cblt.mongodb.net/Coursedb');


const AdminSchema = new mongoose.Schema({
    username:String,
    password:String
});

const UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    purchasedCourses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Course'
        }
    ]
});

const CourseSchema = new mongoose.Schema({
    courseTitle:String,
    courseDescription:String,
    price:Number,
    imageLink:String
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}