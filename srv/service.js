module.exports = (srv) => {
    const { incident } = srv.entities;

    srv.before('NEW', 'incident', async (req) => {
        console.log("Stop here");
        if(req.data.ticketType_code === 'A'){
            req.data.btpHidden = false
            req.data.fioriHidden = true
        }else{
            req.data.btpHidden = true
            req.data.fioriHidden = false
        }
    })

    // srv.on('NEW', 'incident', async (req,next) => {
        // console.log("Stop here");
        // if(req.data.ticketType_code === 'A'){
        //     req.data.btpHidden = false
        // }else{
        //     req.data.btpHidden = true
        // }
        // return next()
        // if(req.data.ticketType_code === 'A'){
        //     req.data.btpHidden = false
        // }else{
        //     req.data.btpHidden = true
        // }
    // })

    // srv.before('CREATE', 'customObject', async (req) => {
    //     console.log("Setting generated values")
    //     req.data.status_code = 'C'
    //     let isValid = await validateEntry(req.data,customObject);
    //     if(!isValid){
    //         return req.error ({
    //             code: "KEYS_EXIST",
    //             message: 'Keys already exist in Database!',
    //             status: 502
    //           })
    //     }
    // })

    // srv.on('executeProcess', async (req) => {
    //     await executeProcess(req, customObject);
    // })

    // srv.on('updateApprovalStatus', async (req) => {
    //     await updateApprovalStatus(req, customObject);
    // })

    // srv.on('completeDeletion', async (req) => {
    //     await completeDeletion(req, customObject)
    // })

    // srv.on('PUT', 'excelUpload', async (req) => {
    //     await massUpload(req,customObject)
    // })

    // srv.after('READ', 'customObject', async (req, result) => {
    //     await expandAssociation(req, result, srv);
    // })
}