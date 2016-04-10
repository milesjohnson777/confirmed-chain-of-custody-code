var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = new Schema({
    districtNumber: {type: Number, required: true},
    fullname: {type: String, required: true},
    custodian: {type: String, required: true, default: 'home'}
});

module.exports = mongoose.model('Student', StudentSchema);
