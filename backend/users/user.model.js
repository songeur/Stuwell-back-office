const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    user_login: { type: String, unique: true, required: true },
    user_firstname: { type: String, required: true },
    user_lastname: { type: String, required: true },
    user_pass: { type: String, required: true },
    user_nikname: { type: String, required: false },
    user_email: { type: String, required: false },
    user_url: { type: String, required: false },
    user_registered: { type: Date, default: Date.now },
    user_activation_key: { type: String, required: false },
    user_status: { type: String, required: false },
    display_name: { type: String, required: false }
});

// schema.set('toJSON', {
//     virtuals: true,
//     versionKey: false,
//     transform: function (doc, ret) {
//         delete ret._id;
//         delete ret.hash;
//     }
// });

module.exports = mongoose.model('User', schema);