//@ui5-bundle s4glbcloudrequestmanagementappui/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"s4glbcloudrequestmanagementappui/Component.js":function(){sap.ui.define(["sap/fe/core/AppComponent"],function(e){"use strict";return e.extend("s4glbcloudrequestmanagementappui.Component",{metadata:{manifest:"json"}})});
},
	"s4glbcloudrequestmanagementappui/i18n/i18n.properties":'# This is the resource bundle for s4glbcloudrequestmanagementappui\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=Cloud Request Management App\n\n#YDES: Application description\nappDescription=Manage BTP and Cloud related requests\n\nflpTitle=Cloud Request\n\nflpSubtitle=Manage\n',
	"s4glbcloudrequestmanagementappui/manifest.json":'{"_version":"1.49.0","sap.app":{"id":"s4glbcloudrequestmanagementappui","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:lrop","version":"1.11.0","toolsId":"0c7a8fa8-3eee-424e-9e80-3493fa89ab20"},"dataSources":{"mainService":{"uri":"main/","type":"OData","settings":{"annotations":[],"localUri":"localService/metadata.xml","odataVersion":"4.0"}}},"crossNavigation":{"inbounds":{"cloudRequst-Manage":{"semanticObject":"cloudRequst","action":"Manage","title":"{{flpTitle}}","subTitle":"{{flpSubtitle}}","signature":{"parameters":{},"additionalParameters":"allowed"}}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"dependencies":{"minUI5Version":"1.118.0","libs":{"sap.m":{},"sap.ui.core":{},"sap.ushell":{},"sap.fe.templates":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"s4glbcloudrequestmanagementappui.i18n.i18n"}},"":{"dataSource":"mainService","preload":true,"settings":{"synchronizationMode":"None","operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}},"@i18n":{"type":"sap.ui.model.resource.ResourceModel","uri":"i18n/i18n.properties"}},"resources":{"css":[]},"routing":{"config":{},"routes":[{"pattern":":?query:","name":"incidentList","target":"incidentList"},{"pattern":"incident({key}):?query:","name":"incidentObjectPage","target":"incidentObjectPage"}],"targets":{"incidentList":{"type":"Component","id":"incidentList","name":"sap.fe.templates.ListReport","options":{"settings":{"entitySet":"incident","variantManagement":"Page","navigation":{"incident":{"detail":{"route":"incidentObjectPage"}}}}}},"incidentObjectPage":{"type":"Component","id":"incidentObjectPage","name":"sap.fe.templates.ObjectPage","options":{"settings":{"editableHeaderContent":false,"entitySet":"incident"}}}}}},"sap.fiori":{"registrationIds":[],"archeType":"transactional"},"sap.cloud":{"public":true,"service":"s4-glb-cloudRequestManagementApp-approuter"}}'
}});