using main from './service';

annotate main.incident with @odata.draft.enabled: true;

annotate main.incident with {
    ID         @title           : '{i18n>ID}'
               @readonly;
    ticketNo   @title           : '{i18n>ticketNo}'
               @readonly;
    approverid @title           : '{i18n>approverid}'
               @readonly;
    @Common          : {
        Text           : ticketType.description,
        TextArrangement: #TextOnly
    }
    ticketType @title           : '{i18n>ticketType}';
    @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        Label         : 'Status',
        CollectionPath: 'status',
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: 'status_code',
                ValueListProperty: 'code',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'description',
            }
        ]
    }
    @Common          : {
        Text           : status.description,
        TextArrangement: #TextOnly
    }
    @title           : '{i18n>status}'
    @readonly
    status;
    @Common.ValueList: {
        $Type          : 'Common.ValueListType',
        Label          : 'Subaccount',
        CollectionPath : 'subaccount',
        SearchSupported: false,
        Parameters     : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: 'subaccount',
                ValueListProperty: 'displayName',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'description',
            }
        ]
    }
    subaccount @title           : '{i18n>subaccount}';
    @readonly
    space      @title           : '{i18n>space}';
    // @Common.ValueList: {
    //     $Type         : 'Common.ValueListType',
    //     Label         : 'BTP Users',
    //     CollectionPath: 'btpUser',
    //     Parameters    : [
    //         {
    //             $Type            : 'Common.ValueListParameterInOut',
    //             LocalDataProperty: 'targetid_email',
    //             ValueListProperty: 'email',
    //         },
    //         {
    //             $Type            : 'Common.ValueListParameterDisplayOnly',
    //             ValueListProperty: 'fullName',
    //         }
    //     ]
    // }
    // @Common          : {
    //     Text           : targetid.fullName,
    //     TextArrangement: #TextLast
    // }
    targetid   @title           : '{i18n>targetid}'
               @mandatory       : true;
    note       @title           : '{i18n>note}'
               @UI.MultiLineText: true
               @UI.Placeholder  : '{i18n>notePlaceHolder}'
               @mandatory       : true;//fioriHidden; //Fiori hidden = true = BTP display = Note must be mandatory
    // system     @title           : '{i18n>system}';
    // client     @title           : '{i18n>client}';
    createdBy  @title           : '{i18n>CreatedBy}';
    createdAt  @title           : '{i18n>CreatedAt}';
    modifiedBy @title           : '{i18n>ModifiedBy}';
    modifiedAt @title           : '{i18n>ModifiedAt}';
};

annotate main.incident with
@UI: {
    HeaderInfo              : {
        TypeName      : '{i18n>CloudRequestIncident}',
        TypeNamePlural: '{i18n>CloudRequestIncidents}',
        Title         : {Value: '{i18n>CloudRequestIncident}'},
        Description   : {Value: ticketNo}
    },
    SelectionFields         : [
        ticketNo,
        ticketType_code,
        status_code
    ],
    HeaderFacets            : [{
        $Type : 'UI.ReferenceFacet',
        Target: '@UI.FieldGroup#Header',
    }, ],
    Facets                  : [
        {
            $Type        : 'UI.ReferenceFacet',
            Label        : '{i18n>BTPDetails}',
            Target       : '@UI.FieldGroup#BTPDetails',
            // ![@UI.Hidden]: btpHidden
        },
        // {
        //     $Type        : 'UI.ReferenceFacet',
        //     Label        : '{i18n>FioriDetails}',
        //     Target       : '@UI.FieldGroup#FioriDetails',
        //     ![@UI.Hidden]: fioriHidden,
        // },
        {
            $Type : 'UI.ReferenceFacet',
            Label : '{i18n>AdminDetails}',
            Target: '@UI.FieldGroup#Admin'
        },
    ],

    FieldGroup #BTPDetails  : {Data: [
        {Value: subaccount},
        {Value: space},
        {Value: targetid_email},
        {Value: note, }
    ]},

    // FieldGroup #FioriDetails: {Data: [
    //     {Value: system},
    //     {Value: client}
    // ]},

    FieldGroup #Admin       : {Data: [
        {Value: ID},
        {Value: createdBy},
        {Value: createdAt},
        {Value: modifiedBy},
        {Value: modifiedAt}
    ]},

    FieldGroup #Header      : {Data: [
        {Value: ticketType_code},
        {Value: status_code}
    ]},

    LineItem                : [
        {
            $Type  : 'UI.DataFieldForAction',
            Action : 'main.completeIncident',
            Label  : 'Confirm Incident'
        },
        {Value: ticketNo},
        {Value: ticketType_code},
        {Value: createdBy},
        {Value: createdAt},
        {Value: modifiedBy},
        {Value: modifiedAt}
    ]
};

annotate main.status with {
    @Common: {
        Text           : description,
        TextArrangement: #TextOnly
    }
    code @title: '{i18n>StatusCode}'
}

annotate main.subaccount with {
    displayName @title: '{i18n>SubaccountName}';
    description @title: '{i18n>Description}'
}

annotate main.ticketType with {
    @Common: {
        Text           : description,
        TextArrangement: #TextOnly
    }
    code        @title: '{i18n>ticketType}';
    description @title: '{i18n>Description}'
}

annotate main.btpUser with {
    @Common: {
        Text           : fullName,
        TextArrangement: #TextLast
    }
    fullName @title: '{i18n>fullName}';
    email    @title: '{i18n>email}';
}
