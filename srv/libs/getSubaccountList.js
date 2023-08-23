const axios = require('axios');
const { getDestination } = require('@sap-cloud-sdk/connectivity')
module.exports = async function (req, entity) {
    try {
        await _getSubaccountData().then(Response => {
            subaccountList = Response;
            let count = subaccountList.length;
            Object.assign(subaccountList, { $count: count })
        });
        return subaccountList
    } catch (error) {
        console.log(error);
    }
}

function _getSubaccountData() {
    return new Promise((resolve, reject) => {
        let returnData = [];
        const destination = getDestination(
            {
                destinationName: "SharedDevTools_CloudManagementService"
            }
        ).then(response => {
            let tokenData = new URLSearchParams();
            tokenData.append('username', response.username);
            tokenData.append('password', response.password);
            tokenData.append('grant_type', 'password');

            const encodedCredentials = Buffer.from(`${response.clientId}:${response.clientSecret}`).toString('base64');
            let tokenConfig = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${encodedCredentials}`
                }
            };

            axios.post(response.tokenServiceUrl, tokenData, tokenConfig)
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

    })
}