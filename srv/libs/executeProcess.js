const { executeHttpRequest } = require('@sap-cloud-sdk/core');
const definitionId = "eu10.crossfunctional-dev-56c89xus.customobjectretirementprocess.customObjectRetirementApprovalProcess"

module.exports = async function (req, entity) {
    console.log("Executing SBPA");
    let payload = {};

    payload = {
        "definitionId": definitionId,
        "context": {
            "incidentNumber": req.ticketNo,
            "note":req.note,
            "subaccount":req.subaccount,
            "targetID":req.targetid,
            "approverGroup": 'SBPA_TEST_GROUP',
            "approvalsubject": `Approval Request - ${req.objectName}`,
            "const_approve": "Approve",
            "const_reject": "Reject",
            "objectguid": req.ID
        }
    }
    try {
        const result = await executeHttpRequest(
            {
                destinationName: 'SBPA-Process_Trigger_Destination'
            },
            {
                method: 'POST',
                data: payload,
                headers: {
                    'content-type': 'application/json'
                }
            }
        )

        await _updateStatus(inputID, entity);
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