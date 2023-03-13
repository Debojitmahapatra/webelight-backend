const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId


const productSchema = new mongoose.Schema({
    ProductName: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: String,
        required: true,
        trim: true,
      },
    image: {
        type: String,
        required: true,
        trim: true,
      },
    userId: {
        type: ObjectId,
        ref: 'Admin',
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null
    },
    
    releasedAt: {
        type:Date,
    }
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)