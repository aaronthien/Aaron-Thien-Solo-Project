const express = require('express');
const itineraryController = require('./itineraryController');
const router = express.Router();



router.post('/',
    itineraryController.createItinerary,
//   (req, res) => res.status(200).json([])
);

router.get('/',
    itineraryController.showAllPlans,
);

router.delete('/',
    itineraryController.deleteItinerary
)


// router.post('/character',
//   starWarsController.addCharacter,
//   (req, res) => res.status(200).json({})
// );

module.exports = router;