async function updateCallStatusFromEvent(context, callSid, data) {
    const client = context.getTwilioClient();
    try {
        return await client.sync
            .services(context.SYNC_SERVICE_SID)
            .syncMaps(context.CALL_LOG_MAP_NAME)
            .syncMapItems(callSid)
            .update({
                data,
            });
    } catch (err) {
        return await client.sync
            .services(context.SYNC_SERVICE_SID)
            .syncMaps(context.CALL_LOG_MAP_NAME)
            .syncMapItems
            .create({
                key: callSid,
                data,
            });
    }
}

exports.handler = async function (context, event, callback) {
    console.log(`Call: ${event.CallSid} status: ${event.CallStatus}`);
    try {
        const data = {
            Sid: event.CallSid,
            Status: event.CallStatus,
            Duration: event.CallDuration,
            Direction: event.CallDirection,
            From: event.From,
            To: event.To,
            Timestamp: event.Timestamp,
        };
        const item = await updateCallStatusFromEvent(context, event.CallSid, data);
    } catch (err) {
        console.error(err);
        return callback(err);
    }
    return callback(null, {});
};