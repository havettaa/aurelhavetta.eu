sap.ui.define(["com/tutorial/service/mockserver"], function () {
	var test = "";
	
	
	var MyControl = {
		onInit: function(){
			var x = "test";
		}
	};
	return MyControl;
});

/*sap.ui.define([
	"sap/ui/core/util/MockServer"
], function (MockServer) {
	"use strict";
	var _sAppModulePath = "sap/ui/demo/nav/", _sJsonFilesModulePath = _sAppModulePath + "localService/mockdata";

	return {
		init: function () {
			var sManifestUrl = jQuery.sap.getModulePath(_sAppModulePath + "manifest", ".json"),
				sJsonFilesUrl = jQuery.sap.getModulePath(_sJsonFilesModulePath),
				oManifest = jQuery.sap.syncGetJSON(sManifestUrl).data,
				oMainDataSource = oManifest["sap.app"].dataSources.employeeRemote,
				sMetadataUrl = jQuery.sap.getModulePath(_sAppModulePath + oMainDataSource.settings.localUri.replace(".xml", ""), ".xml");

			// create
			var oMockServer = new MockServer({
				rootUri: oMainDataSource.uri
			});

			oMockServer.start();
		}
	};

});
*/