
import mongoose from 'mongoose';

const userModel = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }

})

const UserModel = mongoose.model('Logins', userModel)

export default UserModel;