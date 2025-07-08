const mongoose=require("mongoose");

const projectSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    startDate:{
        type:Date,
        required:true,  
    },
    endDate:{
        type:Date,
        required:true,
    },
    description:{
        type:String,
        default:"No description provided",
    },
    client:{
        type:String
    },
    status:{
        type:String,
        enum:{
            values:["active","completed","on hold","cancelled"],
            default:"active",
            message:"Status must be either active, completed, on hold, or cancelled"
        }
    }
},{timestamps:true});

const Project=mongoose.model("Project",projectSchema);
module.exports=Project;