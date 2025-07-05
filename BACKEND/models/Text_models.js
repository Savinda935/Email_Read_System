const mongoose = require("mongoose");
//update

const Schema = mongoose.Schema;

const textSchema = new Schema({
    date: {
        type: String,
        required: false
    },
    time: {
        type: String,
        required: false
    },
    intrusion_observed: {
        type: String,
        required: false
    },
    devname: {
        type: String,
        required: false
    },
    srcip: {
        type: String,
        required: false
    },
    dstip: {
        type: String,
        required: false
    },
    dstcountry: {
        type: String,
        required: false
    },
    crlevel: {
        type: String,
        required: false
    },
    attack: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Text = mongoose.model("Text", textSchema);
module.exports = Text;
