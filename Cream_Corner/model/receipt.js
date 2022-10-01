
import mongoose from 'mongoose';

const receiptModel = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    customer_number : {
        type : String,
        required : true
    },
    chocoloate_blizzards : {
        type : Number,
    },
    strawberry_sundaes : {
        type : Number,
    },
    blueberry_shakes: {
        type : Number,
    },
    sub_total: {
        type : String,
    },
    tax: {
        type : String,
    },
    total_cost: {
        type : String,
    },
    createdAt: {
        type: Date,
        default : new Date(),
    }

})

const OrderModel = mongoose.model('Orders', receiptModel)

export default OrderModel;