const mongoose=require("mongoose");

const assignmentSchema=new mongoose.Schema({
    engineerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Engineer",
        required:true,        
    },
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project",
        required:true
    },
    startDate:{
        type:Date,
        required:true,
    },
    endDate:{
        type:Date,
        required:true
    },
    allocation:{
        type:Number,
        required:true,
        default:0, // Default to 0% allocation
    },
    status:{
        type:string,
        enum:{
            values:["active","completed","on hold","cancelled"],
            default:"active",
            message:"Status must be either active, completed, on hold, or cancelled"
        }
    }
},{timestamps:true});

const Assignment=mongoose.model("Assignment",assignmentSchema);
module.exports=Assignment;