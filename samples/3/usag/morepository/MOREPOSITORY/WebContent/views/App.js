/*sap.ui.jsview("ui5_routing.App", {

 *//** Specifies the Controller belonging to this View. 
 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
 * @memberOf ui5_routing.App
 */
/* 
 getControllerName : function() {
 return "ui5_routing.App";
 },

 *//**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf ui5_routing.App
	 */
/*
 * createContent: function (oController) { this.setDisplayBlock(true); this.app =
 * new sap.m.SplitApp("splitApp",{
 * 
 * });
 * 
 * return new sap.m.Shell("shell",{ title:"{i18n>ShellTitle}", showLogout:false,
 * app:this.app }); }
 * 
 * });
 */

//Aurel TEST CHANGE
sap.ui.jsview("ui5_routing.App", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf ui5_routing.App
	 */
	getControllerName : function() {
		return "ui5_routing.App";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf ui5_routing.App
	 */
	createContent : function(oController) {
		this.setDisplayBlock(false);

		/*
		 * this.app = new sap.m.App("splitApp", {
		 * 
		 * });
		 * 
		 * return new sap.m.Shell("shell", { title : "{i18n>ShellTitle}",
		 * showLogout : false, app : this.app });
		 */

		return new sap.m.App("splitApp", {
			height : '100%'
		});

	}

});