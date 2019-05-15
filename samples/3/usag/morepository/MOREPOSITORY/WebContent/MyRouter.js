// This file is not used at all (break point in functions never hit)
jQuery.sap.declare("com.tutorial.MyRouter");

jQuery.sap.require("sap.ui.core.routing.Router");
jQuery.sap.require("sap.ui.core.routing.History");
jQuery.sap.require("sap.m.routing.RouteMatchedHandler");



sap.ui.core.routing.Router.extend("com.tutorial.MyRouter", {

	constructor : function() {

		console.log("inside constructor");
		sap.ui.core.routing.Router.apply(this, arguments);
		this.oRouteMatchedHandler = new sap.m.routing.RouteMatchedHandler(this);

	},

	myNavBack : function(sRoute, mData) {
		var oHistory = sap.ui.core.routing.History.getInstance();

		var sUrl = this.getURL(sRoute, mData);

		var sDirection = oHistory.getDirection(sUrL);
		if ("Backwards" === sDirection) {
			window.history.go(-1);
		} else {
			var bReplace = true;
			this.navTo(sRoute, mData, bReplace);
		}
	},

	myNavToWithoutHash : function(viewName, viewType, master, data) {
		var oSplitApp = sap.ui.getCore.byId("splitApp");
		var oView = this.getView(viewName, viewType);
		oSplitApp.addPage(oView, master);
		oSplitApp.to(oView.getId(), "show", data);
	}
})