const {Schema, model} = require('mongoose')

const postSchema = new Schema({
    title: {type:String, required: true},
    category: {type:String,enum:["Uncategorized","Technology",
    "Health",
    "Travel",
    "Food",
    "Fashion",
    "Lifestyle",
    "Investment",
    "Agriculture",
    "Weather",
    "Sports",
    "Entertainment",
    "Education",
    "Science",
    "Parenting",
    "Arts",
    "Self-Improvement",
    "Environment",
    "Politics",
    "Business",
    "Relationships",
    "History",
    "Literature",
    "Religion",
    "Inspiration"], message:"{VALUE is not supported}"},
    description: {type:String, required: true},
    creator: {type: Schema.Types.ObjectId, ref: "User"},
    thumbnail: {type: String},
}, {timestamps:true})


module.exports = model('Post', postSchema);