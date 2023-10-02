module.exports = async function (req, entity) {
    const query_get_lastCreated = SELECT.one
        .from(entity)
        .columns(["max(createdAt) as createdAt"]);
    var result = await cds.run(query_get_lastCreated);
    console.log(result);
    const query_get_ticketno = SELECT.one
        .from(entity)
        .columns(["ticketno"])
        .where({ createdAt: result.createdAt });
    result = await cds.run(query_get_ticketno);
    const jsonobj = JSON.parse(JSON.stringify(result));
    var ticketno;
    if (jsonobj.ticketno == null) {
        ticketno = 1;
    }
    else {
        console.log(jsonobj.ticketno);
        console.log(parseInt(jsonobj.ticketno) + 1)
        ticketno = parseInt(jsonobj.ticketno) + 1;
    }
    req.data.ticketNo = JSON.stringify(ticketno);
    req.data.status_code = 'O';
}