const insertDefaultValues = require('./libs/insertDefaultValues.js');
const getBTPUsers = require('./libs/getBTPUsers.js');
const getSubaccountList = require('./libs/getSubaccountList.js');
const updateApprovalStatus = require('./libs/updateApprovalStatus.js');

module.exports = (srv) => {
    const { incident } = srv.entities;

    srv.before('NEW', 'incident', async (req) => {
        if (req.data.ticketType_code === 'A') {
            req.data.btpHidden = false
            req.data.fioriHidden = true
        } else {
            req.data.btpHidden = true
            req.data.fioriHidden = false
        }
    })

    srv.before('CREATE', 'incident', async (req) => {
        await insertDefaultValues(req,incident)
    })

    srv.after('CREATE', 'incident', async (req) => {
        //Send WF

        //Send email
    })

    srv.on('READ', 'subaccount', async (req) => {
        let subaccountList = getSubaccountList(req);
        return subaccountList;
    })

    srv.on('READ', 'btpUser', async (req) => {
        let userList = getBTPUsers(req);
        return userList;
    })

    srv.on('updateApprovalStatus', async(req) =>{
        await updateApprovalStatus(req, incident);
    })
}

