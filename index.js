// Alexa Skill to Help with Elementary Homework
// Use this to help kids with ADHD
// This help the kids to focus on the problem asked and not the arithmetic
const Alexa = require('ask-sdk-core');

const appName = 'mi calculadora'

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'Hola, con esta skill puedo ayudarte con tu tarea. Puedes preguntarme sumas, restas, multiplicaciones y divisiones.';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
const AddIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AddIntent';
    },
    handle(handlerInput) {
        
        let speechText = '';
        let displayText = '';
        let intent = handlerInput.requestEnvelope.request.intent;
        let firstNumber = intent.slots.firstNumber.value
        let secondNumber = intent.slots.secondNumber.value
        
        if (firstNumber && secondNumber){
            
            let result = parseInt(firstNumber) + parseInt(secondNumber);
            speechText = `${firstNumber} más ${secondNumber} es igual a ${result}.`;
            displayText = 'El resultado de ' + speechText;
            
            return handlerInput.responseBuilder
                    .speak(speechText)
                    .withSimpleCard(appName, displayText)
                    .withShouldEndSession(false)
                    .getResponse();
            
        } else {
        return handlerInput.responseBuilder
            .addDelegateDirective(intent)
            .getResponse();
        }
    }
};

const SubstractIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'SubstractIntent';
    },
    handle(handlerInput) {
        
        let speechText = '';
        let displayText = '';
        let intent = handlerInput.requestEnvelope.request.intent;
        let firstNumber = intent.slots.firstNumber.value
        let secondNumber = intent.slots.secondNumber.value
        
        if (firstNumber && secondNumber){
            
            let result = parseInt(firstNumber) - parseInt(secondNumber);
            if (Math.sign(result) === -1){
                result = 'menos ' + Math.abs(result);
            }
            speechText = `${firstNumber} menos ${secondNumber} es igual a ${result}.`;
             displayText = 'El resultado de ' + speechText;
            
            return handlerInput.responseBuilder
                    .speak(speechText)
                    .withSimpleCard(appName, displayText)
                    .withShouldEndSession(false)
                    .getResponse();
            
        } else {
        return handlerInput.responseBuilder
            .addDelegateDirective(intent)
            .getResponse();
        }
    }
};

const MultiplicationIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'MultiplicationIntent';
    },
     handle(handlerInput) {
        
        let speechText = '';
        let displayText = '';
        let intent = handlerInput.requestEnvelope.request.intent;
        let firstNumber = intent.slots.firstNumber.value
        let secondNumber = intent.slots.secondNumber.value
        
        if (firstNumber && secondNumber){
            
            let result = parseInt(firstNumber) * parseInt(secondNumber);
            speechText = `${firstNumber} por ${secondNumber} es igual a ${result}.`;
             displayText = 'El resultado de ' + speechText;
            
            return handlerInput.responseBuilder
                    .speak(speechText)
                    .withSimpleCard(appName, displayText)
                    .withShouldEndSession(false)
                    .getResponse();
            
        } else {
        return handlerInput.responseBuilder
            .addDelegateDirective(intent)
            .getResponse();
        }
    }
};

const DivisionIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'DivisionIntent';
    },
     handle(handlerInput) {
        
        let speechText = '';
        let displayText = '';
        let intent = handlerInput.requestEnvelope.request.intent;
        let firstNumber = intent.slots.firstNumber.value
        let secondNumber = intent.slots.secondNumber.value
        
        if (firstNumber && secondNumber){
            
            let result = parseInt(firstNumber) / parseInt(secondNumber);
            
            if (firstNumber > secondNumber){
               result = result.toFixed(4)
            }
            speechText = `${firstNumber} entre ${secondNumber} es igual a ${result}.`;
             displayText = 'El resultado de ' + speechText;
            
            return handlerInput.responseBuilder
                    .speak(speechText)
                    .withSimpleCard(appName, displayText)
                    .withShouldEndSession(false)
                    .getResponse();
            
        } else {
        return handlerInput.responseBuilder
            .addDelegateDirective(intent)
            .getResponse();
        }
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'Puedes preguntarme cuando es 5 mas 6';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'Adios!';
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = handlerInput.requestEnvelope.request.intent.name;
        const speechText = `Acabas de activar ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.message}`);
        const speechText = `Lo siento no puedo entender lo que dices, prueba otra cosa.`;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

// This handler acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        AddIntentHandler,
        SubstractIntentHandler,
        MultiplicationIntentHandler,
        DivisionIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler) // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    .addErrorHandlers(
        ErrorHandler)
    .lambda();
