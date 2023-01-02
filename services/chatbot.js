const natural = require("natural");
const _ = require("lodash");

const FAQ_DATABASE = [
    {
        question: "What is the capital of France?",
        response: "The capital of France is Paris."
    },
    {
        question: "What is the currency of Japan?",
        response: "The currency of Japan is the Japanese yen."
    },
    // Add additional FAQs here...
];

const UNKNOWN_RESPONSE = "I'm sorry, I don't know the answer to that question. Could you please provide more information or ask a different question?";

class Chatbot {
    constructor() {
        this.learningEnabled = false;
        this.customResponses = [];
    }

    // Enable or disable the chatbot's ability to learn new responses
    setLearningEnabled(enabled) {
        this.learningEnabled = enabled;
    }

    // Add a new custom response to the chatbot's knowledge base
    addCustomResponse(question, response) {
        this.customResponses.push({question, response});
    }

    // Find the appropriate response for a given question
    findResponse(question) {
        for (const faq of this.customResponses) {
            const tokenizedFaq = natural.PorterStemmer.tokenizeAndStem(faq.question);
            if (_.isEqual(tokenizedFaq, question)) {
                return faq.response;
            }
        }

        // Check if the tokenized and stemmed question has a predefined response in the FAQ database
        for (const faq of FAQ_DATABASE) {
            const tokenizedFaq = natural.PorterStemmer.tokenizeAndStem(faq.question);
            if (_.isEqual(tokenizedFaq, question)) {
                return faq.response;
            }
        }

        // If no response is found, return the unknown response
        return UNKNOWN_RESPONSE;
    }

    // Handle a user's message
    handleMessage(message) {
        const tokenizedMessage = natural.PorterStemmer.tokenizeAndStem(message);

        const response = this.findResponse(tokenizedMessage);

        // If learning is enabled and the chatbot doesn't have a predefined response, ask the user for more information
        if (this.learningEnabled && response === UNKNOWN_RESPONSE) {
            return "Can you provide more information or an example for me to learn from?";
        }

        return response;
    }
}

module.exports = Chatbot;
