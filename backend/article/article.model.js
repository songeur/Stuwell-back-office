const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    data: { type: String, required: false }
});

// schema.set('toJSON', {
//     virtuals: true,
//     versionKey: false,
//     transform: function (doc, ret) {
//         delete ret._id;
//         delete ret.hash;
//     }
// });

module.exports = mongoose.model('Article', schema);