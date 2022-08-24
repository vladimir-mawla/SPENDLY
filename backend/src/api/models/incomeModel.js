const mongoose = require('mongoose')

const incomeSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
            immutable: true,
        },
        type: {
            type: String,
            required: [true, 'Please add a type'],
            lowercase: true,
        },
        amount: {
            type: Number,
            required: [true, 'Please add an amount'],
            min: 1,
        },
        date: {
            type: Date,
            default: () => Date.now(),
            required: false,
        },
    },
    {
        timestamps: true,
    }
)


module.exports = mongoose.model('Income', incomeSchema)