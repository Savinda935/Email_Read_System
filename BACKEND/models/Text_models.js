const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const textSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    // Add any other fields you need for your text schema here
});

const Text = mongoose.model("Text", textSchema);
module.exports = Text;