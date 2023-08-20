using s4_glb_cloudRequestManagementApp as db from '../db/data-model';

service main {
    @Capabilities.Insertable: true
    entity incident   as projection on db.incident;
    entity status     as projection on db.status;
    entity btpUser   as projection on db.btpUser;
    // entity ppgUsers   as projection on db.ppgUsers;
    entity subaccount as projection on db.subaccount;
    entity ticketType as projection on db.ticketType;
}
