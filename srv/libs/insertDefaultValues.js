module.exports = async function (req, entity) {
    var ticketno;
    const query_get_lastCreated = SELECT.one
        .from(entity)
        .columns(["max(createdAt) as createdAt"]);
    var result = await cds.run(query_get_lastCreated);
    console.log(result);
    if (result.createdAt !== null) {
        const query_get_ticketno = SELECT.one
            .from(entity)
            .columns(["ticketNo"])
            .where({ createdAt: result.createdAt });
        result = await cds.run(query_get_ticketno);
        console.log("ticketNo", result)
        if (result.ticketNo !== null) {
            const jsonobj = JSON.parse(JSON.stringify(result));
            ticketno = parseInt(jsonobj.ticketNo) + 1;
        }
    } else {
        ticketno = 1;
    }
    req.data.ticketNo = JSON.stringify(ticketno);
    req.data.status_code = 'O';
}