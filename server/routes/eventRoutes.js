// eventRoutes.js
const mongoose = require('mongoose');
const express = require('express');

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../config');
const EventRead = mongoose.model("EventRead");
const Event = require('../schemas/eventSchema');
const router = express.Router();


router.get('/getEventDetails', async (req, res) => {
    try {
      const events = await Event.find({});
      res.json(events);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.get('/getEventDetails/:id', async (req, res) => {
    const eventId = req.params.id;
  
    try {
      const event = await Event.findOne({ id: eventId });
  
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
      res.json(event);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
router.post("/getAllReadEvents", async (req, res) => {
    try {
        const token = req.headers.authorization;
        const user = jwt.verify(token, JWT_SECRET);
        const userEmail = user.email;
    
        const readEvents = await EventRead.find({ emailId: userEmail }).select(
          "eventId"
        );
    
        res.json({ events: readEvents });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/updateEventRead", async (req, res) => {
    const { token, id } = req.body;

    try {
        const user = jwt.verify(token, JWT_SECRET);
        const useremail = user.email;

        const isRead = await EventRead.findOne({ emailId: useremail, eventId: id });

        if (isRead) {
        return res.send({ status: "Already Read" });
        }

        await EventRead.create({
        emailId: useremail,
        eventId: id,
        });

        res.send({ status: "IsUpdated" });
    } catch (error) {
        console.log(error);
        res.send({ status: "Error" });
    }
});

module.exports = router;