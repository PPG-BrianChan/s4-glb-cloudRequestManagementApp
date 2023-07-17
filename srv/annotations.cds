using main from './service';

annotate main.incident with @odata.draft.enabled: true;

annotate main.incident with {
    ID              @title: '{i18n>ID}'
                    @readonly;
    ticketNo        @title: '{i18n>ticketNo}';
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
    ticketType      @title: '{i18n>ticketType}';
    description     @title: '{i18n>description}'
                    @readonly;
    approverid      @title: '{i18n>approverid}';
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
    subaccount      @title: '{i18n>subaccount}';
    space           @title: '{i18n>space}';
    roleCollections @title: '{i18n>roleCollections}';
    targetid        @title: '{i18n>targetid}';
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
    code
}

annotate main.ticketType with {
    @Common: {
        Text           : description,
        TextArrangement: #TextOnly
    }
    code
}

annotate main.incident with
@UI: {
    HeaderInfo         : {
        TypeName      : '{i18n>CloudRequestIncident}',
        TypeNamePlural: '{i18n>CloudRequestIncidents}',
        Title         : {Value: '{i18n>CloudRequestIncident}'},
        Description   : {Value: description}
    },
    SelectionFields    : [
        ticketNo,
        ticketType_code,
        approverid_userid,
        status_code
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
            Label : '{i18n>Admin}',
            Target: '@UI.FieldGroup#Admin'
        }
    ],

    FieldGroup #BTPDetails: {Data: [
        {Value: subaccount},
        {Value: space},
        {Value: roleCollections},
        {Value: targetid_userid},
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

    LineItem            : [
        {Value : ticketNo},
        {Value : ticketType_code},
        {Value : description},
        {Value : approverid_userid},
        {Value : createdBy},
        {Value : createdAt},
        {Value : modifiedBy},
        {Value : modifiedAt}
    ]
};
