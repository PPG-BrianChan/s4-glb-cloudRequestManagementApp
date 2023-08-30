const { executeHttpRequest } = require('@sap-cloud-sdk/http-client');;

module.exports = async function (mailfunction, req, recipient) {

    var approvalpayload = {
        "sender": "sapcoebtpgeneral@ppg.com",
        "recipient": recipient,
        "subject": `TESTING BTP Access Request: Incident ${req.ticketNo} to be approved`,
        "type": "HTML",
        "body": `You have received incident to be approved. More details can be found at the BTP My Inbox app at https://crossfunctional-dev-56c89xus.sap-process-automation.cfapps.eu10.hana.ondemand.com/comsapspaprocessautomation.comsapspainbox/inbox.html.`
    }

    var adminActionpayload = {
        "sender": "sapcoebtpgeneral@ppg.com",
        "recipient": recipient,
        "subject": `TESTING BTP Access Request: Incident ${req.ticketNo} to be completed`,
        "type": "HTML",
        "body": `We have received access request with incident number ${req.ticketNo}. You may access details of the incident and update the status of the incident at 
                <br>https://crossfunctional-dev-56c89xus.launchpad.cfapps.eu10.hana.ondemand.com/site/DEV#customObjects-Manage?sap-ui-app-id-hint=saas_approuter_objectRetirementApp.s4glbcustomobjectretirementappui&ID=${req.objectID}`
    }

    var payload;
    switch (mailfunction) {
        case "approval":
            payload = approvalpayload;
            break;
        case "adminAction":
            payload = adminActionpayload;
            break;
    }

    try {
        // console.log("Mail sending disabled for now");
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
    }
    catch (error) {
        console.log("Error occured during mail sending, kindly check at application log or mail service");
    }
}