import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
      date: {
            type: Date,
            required: true
      },
      name: {
            type: String,
            required: true
      },
      time: {
            type: String,
            required: true
      },
    
      subject: {
            type: String,
            required: true
      },
      check:{
            type:Boolean,
            default:false
      }
},{
      timestamps: true
      }
)

const UserModel = mongoose.model('UserModel', userSchema)

export default UserModel