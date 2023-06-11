const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    id: Number,
    title: String,
    year: String,
    photo: String,
    photoDescription: String,
    description: String
});
  
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;