// models/users.model.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firebaseId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    // email: { type: String, required: true, unique: true },
    planType: String,
    totalAssets: Number,
    purchaseDate:{
        type: Date,
        default: Date.now
    },
    usedAssets:Number
    // profilePicture: String
});

const User = mongoose.model('User', userSchema);
export default User;
