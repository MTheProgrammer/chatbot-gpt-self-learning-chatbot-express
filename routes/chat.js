var express = require('express');
const router = express.Router();

const Chatbot = require("../services/chatbot");
const chatbot = new Chatbot();

// Enable the chatbot's ability to learn new responses
chatbot.setLearningEnabled(true);

router.get('/', function (req, res, next) {
    res.render('chat', {title: 'Express Chat'});
});

router.get('/teach', function (req, res, next) {
    const {question} = req.query;

    res.render('teach', {
        title: 'Teach Express Chat',
        question
    });
});

router.post('/teach', function (req, res, next) {
    const {question, answer} = req.body;

    chatbot.addCustomResponse(question, answer);

    res.redirect(301, '/');
});

// Create a route that accepts POST requests with a user message in the request body
router.post("/", (req, res) => {
    const {message} = req.body;

    // Use the chatbot to handle the user's message
    const answer = chatbot.handleMessage(message);

    // Send the chatbot's response back to the user
    res.render('chat', {title: 'Express Chat Answer', question: message, answer});
});

module.exports = router;
