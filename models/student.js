var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Student = new Schema({
    fullname: {type: String, required: true},
    custodian: {type: String, default: 'home'},
    cross: {type: String, required: true},
    image: {type: String}
});

module.exports = mongoose.model('Student', Student);
