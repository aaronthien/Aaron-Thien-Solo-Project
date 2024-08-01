const Itinerary = require('./itineraryModel');

const ItineraryController = {
    async createItinerary(req, res, next) {
        const {activity, startTime, endTime, description} = req.body;
        // console.log(activity, startTime, endTime, description);
        try {
            const newItinerary = await Itinerary.create({ //creates on back end
                activity: activity,
                startTime: startTime,
                endTime: endTime,
                description: description
            });
            console.log(newItinerary);
            res.status(201).send(newItinerary._id)
        } catch(err) {
            // console.log(err);
            res.status(400).send('Could not create')
        }
    },
    async showAllPlans(req, res, next) {
        try {
            const data = await Itinerary.find({});
            const newData = data.map((itinerary, id) => {
                const {activity, startTime, endTime, description, _id} = itinerary;
                return {activity, startTime, endTime, description, _id}
            })
            // console.log(newData);
            res.status(200).json(newData);
        } catch (err) {
            res.status(500).send(err)
        }
    },
    async deleteItinerary(req, res, next) {
        const { _id } = req.body
        try{
            const deleted = await Itinerary.deleteOne({_id})
            console.log(deleted)
            res.status(202).send(deleted)
        }
        catch(err) {
            res.status(500).send(err)
        }
    } 
}


module.exports = ItineraryController;

// front end makes request to back end
// fromt end someone pushes button, that button makes fetch req cause onclick will make ftech request
// wuithin it you can add in stuff to body if post request
// whatever you pass intp body goes int req.body, 