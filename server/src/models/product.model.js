import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
        },
        thumbnailUrl: {
            type: String,
            required: true,

        }
    },
    {timestamps: true}
);
export const Product = mongoose.model('Product', productSchema)