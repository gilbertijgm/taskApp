import mongoose from 'mongoose';

export const usersCollectionName = "users"; //creo el nombre de la colecion o tabla

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
}, {
    timestamps: true
});


export const UserModel = mongoose.model(
    usersCollectionName,
    userSchema
);