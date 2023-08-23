namespace s4_glb_cloudRequestManagementApp;

using {
    cuid,
    managed
} from '@sap/cds/common';

entity incident : cuid, managed {
    ticketNo    : String(8);
    ticketType  : Association to ticketType;
    approverid  : String; //Not needed, request should be sent to BTP Admin Group! Update from workflow! READ ONLY!
    status      : Association to one status;
    //Subaccount Information
    subaccount  : String;
    space       : String;
    // roleCollections : String;            //Not needed, configurations right will not be granted!
    targetid    : Association to btpUser;
    note        : String; //Enter reason here, based on reason admin will determine space to grant access to; Multiline
    //Fiori app enablement
    system      : String(3);
    client      : String(3);
    //Config values
    btpHidden   : Boolean;
    fioriHidden : Boolean;
}

// entity ppgUsers {
//     key userid   : String;
//         fullname : String;
//         email    : String
// }

@cds.persistence.exists: false
entity btpUser {
    key email    : String;
        fullName : String;
}

entity status {
    key code        : String(1);
        description : String;
}

entity ticketType {
    key code        : String(1);
        description : String;
}

@cds.persistence.exists: false
entity subaccount {
    key displayName : String;
        description : String;
}
