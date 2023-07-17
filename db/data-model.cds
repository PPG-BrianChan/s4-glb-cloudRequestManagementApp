namespace s4_glb_cloudRequestManagementApp;

using {
    cuid,
    managed
} from '@sap/cds/common';

entity incident : cuid, managed {
    ticketNo        : String(8);
    ticketType      : Association to ticketType;
    description     : String;
    approverid      : Association to users;
    status          : Association to one status;
    //Subaccount Information
    subaccount      : String;
    space           : String;
    roleCollections : String;
    targetid        : Association to users;
    //Fiori app enablement
    system          : String(3);
    client          : String(3);
    btpHidden : Boolean;
    fioriHidden : Boolean;
}

entity users {
    key userid   : String;
        fullname : String;
        email    : String
}

entity status {
    key code        : String(1);
        description : String;
}

entity ticketType {
    key code : String(1);
        description: String;
}
