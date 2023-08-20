using main from './service';

annotate main.incident with @odata.draft.enabled: true;

annotate main.incident with {
    ID              @title: '{i18n>ID}'
                    @readonly;
    ticketNo        @title: '{i18n>ticketNo}'
                    @readonly;
    @Core.Immutable:true
    @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        Label         : 'Ticket Type',
        CollectionPath: 'ticketType',
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: 'ticketType_code',
                ValueListProperty: 'code',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'description',
            }
        ]
    }
    @Common          : {
        Text           : ticketType.description,
        TextArrangement: #TextOnly
    }
    ticketType      @title: '{i18n>ticketType}';
    description     @title: '{i18n>description}'
                    @readonly;
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
        $Type         : 'Common.ValueListType',
        Label         : 'Subaccount',
        CollectionPath: 'subaccount',
        Parameters    : [
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
    subaccount      @title: '{i18n>subaccount}';
    space           @title: '{i18n>space}';
    targetid        @title: '{i18n>targetid}';
    note            @title: '{i18n>note}'
                    @UI.MultiLineText: true
                    @mandatory:fioriHidden;     //Fiori hidden = true = BTP display = Note must be mandatory
    system          @title: '{i18n>system}';
    client          @title: '{i18n>client}';
    createdBy       @title: '{i18n>CreatedBy}';
    createdAt       @title: '{i18n>CreatedAt}';
    modifiedBy      @title: '{i18n>ModifiedBy}';
    modifiedAt      @title: '{i18n>ModifiedAt}';
};

annotate main.status with {
    @Common: {
        Text           : description,
        TextArrangement: #TextOnly
    }
    code        @title: '{i18n>StatusCode}'
}

annotate main.subaccount with {
    displayName        @title: '{i18n>SubaccountName}';
    description        @title: '{i18n>Description}'
}

annotate main.ticketType with {
    @Common: {
        Text           : description,
        TextArrangement: #TextOnly
    }
    code    @title: '{i18n>ticketType}';
    description @title:'{i18n>Description}'
}

annotate main.incident with
@UI: {
    HeaderInfo         : {
        TypeName      : '{i18n>CloudRequestIncident}',
        TypeNamePlural: '{i18n>CloudRequestIncidents}',
        Title         : {Value: '{i18n>CloudRequestIncident}'},
        Description   : {Value: ticketNo}
    },
    SelectionFields    : [
        ticketNo,
        ticketType_code,
        status_code
    ],
    HeaderFacets : [
        {
            $Type : 'UI.ReferenceFacet',
            Target : '@UI.FieldGroup#Header',
        },
    ],
    Facets             : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : '{i18n>BTPDetails}',
            Target: '@UI.FieldGroup#BTPDetails',
            ![@UI.Hidden]:btpHidden
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : '{i18n>FioriDetails}',
            Target: '@UI.FieldGroup#FioriDetails',
            ![@UI.Hidden]:fioriHidden,
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : '{i18n>AdminDetails}',
            Target: '@UI.FieldGroup#Admin'
        },
    ],

    FieldGroup #BTPDetails: {Data: [
        {Value: subaccount},
        {Value: space},
        {Value: targetid_userid},
        {Value: note,}
    ]},

    FieldGroup #FioriDetails: {Data: [
        {Value: system},
        {Value: client}
    ]},

    FieldGroup #Admin  : {Data: [
        {Value: ID},
        {Value: createdBy},
        {Value: createdAt},
        {Value: modifiedBy},
        {Value: modifiedAt}
    ]},

    FieldGroup #Header: {Data: [
        {Value: ticketType_code},
    ]},

    LineItem            : [
        {Value : ticketNo},
        {Value : ticketType_code},
        {Value : description},
        {Value : createdBy},
        {Value : createdAt},
        {Value : modifiedBy},
        {Value : modifiedAt}
    ]
};
