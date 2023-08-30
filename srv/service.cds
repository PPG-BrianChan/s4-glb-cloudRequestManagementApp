using s4_glb_cloudRequestManagementApp as db from '../db/data-model';

service main {
    @Capabilities.Insertable: true
    entity incident   as projection on db.incident actions{
        action completeIncident();
    };
    entity status     as projection on db.status;
    entity btpUser   as projection on db.btpUser;
    // entity ppgUsers   as projection on db.ppgUsers;
    @Capabilities.FilterRestrictions.Filterable:false
    entity subaccount as projection on db.subaccount;
    entity ticketType as projection on db.ticketType;
}

service api {
    entity incident   as projection on db.incident;
    action updateApprovalStatus(objectID : String, decision : String, space :String);
}
