// Incoming call from PTSN to the dev phone browser

exports.handler = function(context, event, callback) {
    let twiml = new Twilio.twiml.VoiceResponse();

    twiml.say(`Hello! I'm connecting you to your dev phone...`);
    const dial = twiml.dial();
    dial.client(context.DEV_PHONE_NAME);

    return callback(null, twiml);
};
