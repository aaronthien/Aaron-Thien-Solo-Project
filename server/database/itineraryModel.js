const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://aaronthien052401:CxlO2f4T0rNlSO31@cluster0.bzcrrlq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  // sets the name of the DB that our collections are part of
  dbName: 'VacationApp'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const itinerarySchema = new Schema ({
    activity: {type: String, required: true}, // name of activity
    startTime: {type: String, required: false},
    endTime: {type: String, required: false},
    description: {type: String, required: true} // description of activity
})

module.exports = mongoose.model('Itinerary', itinerarySchema)