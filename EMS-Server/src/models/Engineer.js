const mongoose=require('mongoose');

const engineerSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    skills:{
        type:[String],
        required:true,
        default:[],
    },
    weeklyCapacity:{
        type:Number,
        required:true,
        default:40, // Default to 40 hours per week
    },

    availableHours:{
        type:Number,
        default:40, // Default to 40 hours per week
    }
},{timestamps:true});

const Engineer=mongoose.model("Engineer",engineerSchema);
module.exports=Engineer;