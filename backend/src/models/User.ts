import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  referralCode: string;     
  referredBy?: string;      

  referredUsers: string[];  

  credits: number;          
  hasMadeFirstPurchase: boolean; 
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    referralCode: { type: String, required: true, unique: true },

    referredBy: { type: String, default: null },

    referredUsers: [
      {
        type: String, // store referred user's ID
      },
    ],

    credits: { type: Number, default: 0 },

    hasMadeFirstPurchase: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
