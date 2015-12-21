var mongoose = require('mongoose');

var OrderSchema = mongoose.Schema({
    name: {type: String, required: true},
    phone: String,
    email: {type: String, required: true},
    licensePlate: {type: String, required: true},
    description: {type: String, required: true},
    created: Date
});

module.exports = mongoose.model('Order', OrderSchema);
