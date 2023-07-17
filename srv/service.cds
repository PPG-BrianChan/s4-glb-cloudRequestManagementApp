using s4_glb_cloudRequestManagementApp as db from '../db/data-model';

service main {
    @Capabilities.Insertable : true
    entity incident as projection on db.incident;

    entity status        as projection on db.status;
    entity users         as projection on db.users;
    entity ticketType    as projection on db.ticketType;
}