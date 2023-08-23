const { executeHttpRequest } = require('@sap-cloud-sdk/http-client');
const sorty = require('sorty');
module.exports = async function (req) {
    let userList = [];
    try {
        let initID = 'initial';
        let nextIterationExist;
        do {
            let response = await executeHttpRequest(
                {
                    destinationName: "SCIM_API_Endpoint"
                },
                {
                    method: 'GET',
                    url: `/Users?count=100&startId=${initID}`
                }
            );
            let tempuserlist = response.data.Resources.map(btpUser => {
                let user = {};
                user.email = btpUser.emails[0].value;
                user.fullName = `${btpUser.name.givenName} ${btpUser.name.familyName}`;
                return user;
            });
            userList = userList.concat(tempuserlist);
            initID = response.data.nextId
            nextIterationExist = !(initID == 'end')
        }
        while (nextIterationExist)
        let criteria = [];
        criteria.push({ name: 'email', dir: 'asc' })
        sorty(criteria, userList)
        let count = userList.length;
        Object.assign(userList, { $count: count });
        return userList;
    } catch (error) {
        console.log(error.message)
    }
}