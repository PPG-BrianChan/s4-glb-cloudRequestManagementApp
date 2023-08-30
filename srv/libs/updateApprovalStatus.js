const sendMail = require('./sendMail');
module.exports = async function (req, entity) {
    console.log(`Received request from workflow with data:Object ID=${req.data.objectID},Decision=${req.data.decision}`)
    var updateStatus;
    if (req.data.decision == 'Approve') {
        updateStatus = 'A'
    } else {
        updateStatus = 'R'
    }
    try {
        const query_update_status = UPDATE(entity, { ID: req.data.objectID }).set({ status_code: updateStatus, space : req.data.space });
        await cds.run(query_update_status)
        console.log("Data updated successfully")
        if (req.data.decision == 'Approve') {
            console.log("Proceeding to send mail")
            await _sendMail(req, entity);
        }
    } catch (error) {
        console.log(error.message);
    }
}

async function _sendMail(req, entity) {
    //Find object name
    let query = SELECT.from(entity).columns("ID", "ticketNo").where({ ID: req.data.objectID });
    let selectResult = await cds.run(query);

    if (selectResult) {
        var ticketNo = selectResult[0].ticketNo
        var objectID = selectResult[0].ID
    }

    mailInput = {
        "ticketNo" : ticketNo,
        "objectID" : objectID
    }

    await sendMail('adminAction',mailInput,'cchan@ppg.com');
}