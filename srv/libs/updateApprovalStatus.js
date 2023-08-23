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

    var payload = {
        "sender": "sapcoebtpgeneral@ppg.com",
        "recipient": "CChan@ppg.com",  //For testing
        "subject": `TESTING : BTP Access Request Received`,
        "type": "HTML",
        "body": `We have received access request with incident number ${ticketNo}. You may access details of the incident and update the status of the incident at 
                <br>https://crossfunctional-dev-56c89xus.launchpad.cfapps.eu10.hana.ondemand.com/site/DEV#customObjects-Manage?sap-ui-app-id-hint=saas_approuter_objectRetirementApp.s4glbcustomobjectretirementappui&ID=${objectID}`
    }

    try {
        await executeHttpRequest(
            {
                destinationName: "Mail_Service_API"
            },
            {
                method: 'POST',
                data: payload,
                url: "/mailrequests"
            }
        )
        console.log("Mail sent successfully")
    }
    catch (error) {
        console.log(error.message);
        console.log("Error occured during mail sending, kindly check at mail service");
    }
}