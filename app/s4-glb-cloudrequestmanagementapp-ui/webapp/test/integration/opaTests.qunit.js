sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        's4glbcloudrequestmanagementappui/test/integration/FirstJourney',
		's4glbcloudrequestmanagementappui/test/integration/pages/incidentList',
		's4glbcloudrequestmanagementappui/test/integration/pages/incidentObjectPage'
    ],
    function(JourneyRunner, opaJourney, incidentList, incidentObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('s4glbcloudrequestmanagementappui') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheincidentList: incidentList,
					onTheincidentObjectPage: incidentObjectPage
                }
            },
            opaJourney.run
        );
    }
);