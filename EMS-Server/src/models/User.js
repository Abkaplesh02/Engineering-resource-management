const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        minLength:3,
        maxLength:60,
        default:"",
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
    },
    role:{
        type:String,
        enum:{
            values:["Admin","PM","Engineer"],
            message:`{VALUE} is not a valid role`
        },
        default:"Engineer",
    },
    password:{
        type:String,
        required:true,
        minLength:6,
    },
})

const User=mongoose.model("User",userSchema);
module.exports=User;




// This code defines a Mongoose schema and model for a User in a Node.js application.
// The User schema includes fields for name, email, role, and password, with validation rules
// such as required fields, string length limits, and unique email addresses.
// The role field is an enumerated type with predefined values, and the model is exported for
// use in other parts of the application. The schema ensures that user data is structured and validated
// before being stored in the MongoDB database, enhancing data integrity and consistency.
// The code also includes comments that provide context for the schema's purpose and usage in the application.
// The User model can be used to create, read, update, and delete user records in the database,
// facilitating user management functionalities in the application.
// The code is structured to be easily maintainable and scalable, allowing for future enhancements
// such as adding more fields or validation rules as needed.
// The use of Mongoose provides a powerful ODM (Object Data Modeling) layer for MongoDB,
// simplifying database interactions and ensuring that the application adheres to best practices in data management.
// The schema can be extended with additional fields or methods as the application evolves,
// making it a flexible solution for user data management in a Node.js environment.
// The code is ready to be integrated into a larger application, where it can be used in
// conjunction with other models and controllers to build a comprehensive user management system.
// The schema can also be used in conjunction with authentication and authorization mechanisms,                     