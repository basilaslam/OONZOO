import mongoose, { Document, Schema } from 'mongoose';

// Define the user schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['ADMIN', 'USER'],
    default: 'USER',
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
});

// Define the user model interface
export interface IUser extends Document {
  email: string;
  password: string;
  role: string;
  username: string;
}

// Create the user model
    
    const User = mongoose.model<IUser>('User', userSchema);
    export default User;
    