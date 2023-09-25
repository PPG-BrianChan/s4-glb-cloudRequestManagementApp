sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 's4glbcloudrequestmanagementappui',
            componentId: 'incidentList',
            entitySet: 'incident'
        },
        CustomPageDefinitions
    );
});