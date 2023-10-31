const { executeHttpRequest } = require('@sap-cloud-sdk/http-client');
const definitionId = "eu10.s4-dev-7ydmdsrh.s4glbbtpaccessrequestprocess.btpAccessRequestApprovalProcess"

module.exports = async function (req, entity) {
    console.log("Executing SBPA");
    let payload = {};

    payload = 
    {
        "definitionId": definitionId,
        "context": {
            "incidentnumber": req.ticketNo.toString(),
            "targetid": req.targetid_email,
            "subaccount": req.subaccount,
            "note": req.note,
            "subject": `Approval Request - User ${req.targetid_email} in Subaccount ${req.subaccount}`,
            "approve": "Approve",
            "reject": "Reject",
            "objectguid": req.ID,
            "approvergroup": "PPG_SAP_BTP_ADMIN"
        }
    }
    
    try {
        const result = await executeHttpRequest(
            {
                destinationName: 'spa_process_trigger_destination'
            },
            {
                method: 'POST',
                data: payload,
                headers: {
                    'content-type': 'application/json'
                }
            }
        )

        await _updateStatus(req.ID, entity);
        console.log('Success:', result.data)
    } catch (error) {
        console.log(error.message)
    }
}

async function _updateStatus(ID, entity) {
    let setStatus = 'S';
    const query_releaseOrder = UPDATE(entity, { ID: ID }).set({ status_code: setStatus });
    const result = await cds.run(query_releaseOrder);
}