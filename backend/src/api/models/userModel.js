const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        orgName: {
            type: String,
            required: [true, 'Please add an organization name'],
            unique: true,
            immutable: true,
        },
        firstName: {
            type: String,
            required: [true, 'Please add a first name'],
            lowercase: true,
        },
        lastName: {
            type: String,
            required: [true, 'Please add a last name'],
            lowercase: true,
        },
        email: {
            type: String,
            required: [true, 'Please add a email'],
            lowercase: true,
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
            select: false,
        },
        websiteAddress: {
            type: String,
            required: false,
            default: "",
        },
        country: {
            type: String,
            required: false,
            default: "",
        },
        city: {
            type: String,
            required: false,
            default: "",
        },
        phone: {
            type: String,
            required: false,
            default: "",
        },
        about: {
            type: String,
            required: false,
            default: "",
        },
        logoURL: {
            type: String,
            required: false,
            default: ""
        },
        transactions: {
            type: Number,
            default: 0,
        },
        totalIncome: {
            type: Number,
            default: 0,
        },
        totalExpenses: {
            type: Number,
            default: 0,
        },
        settings: {
            emailExports: {
                type: Boolean,
                default: true,
            },
            publicVisibility: {
                type: Boolean,
                default: true,
            }
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', userSchema)