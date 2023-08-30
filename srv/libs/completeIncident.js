module.exports = async function (req, entity) {
    try {
        const query_getData = SELECT.one.from(entity).columns('ticketNo', 'status_code').where({ ID: req.params[0].ID })
        const getResult = await cds.run(query_getData);

        if (getResult !== null) {
            if (getResult.status_code !== 'A') {
                throw new Error(`Error when confirming incident ${getResult.ticketNo}: Not allowed due to status`)
            } else {
                const query_confirmIncident = UPDATE(entity, { ID: req.params[0].ID }).set({ status_code: 'C' });
                const updateResult = await cds.run(query_confirmIncident);
                console.log("Incident confirmed successfully");
            }
        }
    } catch (error) {
        console.log(error.message)
        return req.error({
            code: "INVALID_STATUS",
            message: error.message,
            status: 502
        })
    }
}