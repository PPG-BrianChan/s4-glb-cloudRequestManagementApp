const { executeHttpRequest } = require('@sap-cloud-sdk/http-client');
const axios = require('axios');
const sorty = require('sorty');

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

    srv.on('READ', 'subaccount', async (req) => {
        var subaccountList = [];
        try {
            await getSubaccountData().then(Response => {
                subaccountList = Response;
                let count = subaccountList.length;
                Object.assign(subaccountList, { $count: count })
            });
            return subaccountList
        } catch (error) {
            console.log(error);
        }
    })

    srv.on('READ', 'btpUser', async (req) => {
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
                nextIterationExist = !(initID =='end')
            }
            while (nextIterationExist)
            let criteria = [];
            criteria.push({name:'email',dir:'asc'})
            sorty(criteria,userList)
            let count = userList.length;
            Object.assign(userList,{$count : count});
            return userList;
        } catch (error) {
            console.log(error.message)
        }
    })

    function getSubaccountData() {
        return new Promise((resolve, reject) => {
            let returnData = [];
            let tokenUrl = 'https://ppgindustriesinc-03.authentication.eu10.hana.ondemand.com/oauth/token';
            let tokenData = new URLSearchParams();
            tokenData.append('username', 'cchan@ppg.com');
            tokenData.append('password', 'Chan123@PPG');
            tokenData.append('grant_type', 'password');

            let tokenConfig = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic c2ItdXQtNDJlOWNiOWItODQyYy00ZTU1LWI2MTctZWI3YmM4OTFjZWFjLWNsb25lIWIyNDgwOTJ8Y2lzLWNlbnRyYWwhYjE0OjViMTdkYWNmLTE2NjAtNGNjYi1hZDgzLTAyNGMzYzFkNjc4YyRtOE5wdlZ3eXIyS0lkTzFyblhTdy1mOTVYbktqRk50YS1pSmF4YjhwWlMwPQ==',
                }
            };

            axios.post(tokenUrl, tokenData, tokenConfig)
                .then(response => {
                    let token = response.data.access_token;
                    let serviceUrl = 'https://accounts-service.cfapps.eu10.hana.ondemand.com/accounts/v1/subaccounts?derivedAuthorizations=any';
                    let serviceConfig = {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    }
                    axios.get(serviceUrl, serviceConfig)
                        .then(response => {
                            returnData = response.data.value.map(resultData => {
                                var subaccount = {};
                                subaccount.displayName = resultData.displayName;
                                subaccount.description = resultData.description;
                                return subaccount;
                            });

                            resolve(returnData);
                        })
                        .catch(error => {
                            console.error('An error occurred:', error);
                            reject(error);
                        })
                })
                .catch(error => {
                    console.error('An error occurred:', error);
                    reject(error);
                });
        })
    }
}

