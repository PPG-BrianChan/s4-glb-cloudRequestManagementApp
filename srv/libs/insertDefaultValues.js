module.exports = async function (req, entity) {
    const query_get_ticketno = SELECT.one
        .from(entity)
        .columns("max(ticketNo) as ticketno");
    const result = await cds.run(query_get_ticketno);
    const jsonobj = JSON.parse(JSON.stringify(result));
    var ticketno;
    if (jsonobj.ticketno == null) {
        ticketno = 1;
    }
    else {
        ticketno = parseInt(jsonobj.ticketno) + 1;
    }
    req.data.ticketNo = ticketno;
    req.data.status_code = 'O';
}