jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectPackageTableFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectPKPrimaryInfoFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectAssignmentsPackageFactory' + m_urlVersion);
jQuery.sap.require("com.tutorial.util.Formatter" + m_urlVersion);

var varPath;
var productName;
var productID;

//AUREL HAS CHANGED
sap.ui.controller("ui5_routing.AddCUP", {
	//the method handleNavBack is triggered when the back button is pressed
	handleNavBack : function(evt) 
	{
		this.byId('technicalNameFieldCUPId').setValue("");
		var router = sap.ui.core.UIComponent.getRouterFor(this);

		if (sap.ui.getCore().byId("iconTabBar1") == undefined)
			router.navTo("main");
		else 
		{
			router.navTo("main", {
				query : 
				{
					tab : sap.ui.getCore().byId("iconTabBar1").getSelectedKey()
				}
			}, true);
		}
	},

	onInit : function() 
	{
		this.router = sap.ui.core.UIComponent.getRouterFor(this);
		console.log("Hi in add for MO --" + this._oRouter);
		this.router.attachRoutePatternMatched(this._handleRouteMatched, this);
	},
	
	//the method _handleRouteMatched is triggered after navigation to this page (this is necessary for routing)
	_handleRouteMatched : function(oEvent) 
	{
		this.byId('nameFieldCUPId').setValue("");
		this.byId('technicalNameFieldCUPId').setValue("");
		this.byId('descriptionFieldCUPId').setValue("");
		
		var url = "/usag/morepository/MOREPOSITORY/WebContent/getUser.xsjs";
		var that = this ;
		jQuery.ajax({
			url : url,
			method : 'GET',
			dataType : 'json',
			success : function(user) 
			{
				username = user.USER;
				var userID = username;
				that.byId('ownerFieldCUPId').setText(username);
			},
			error : function(XHR, Status, Error) 
			{
				var error = Error;
				console.log(XHR.responseText);
				username = "default";
			}
		});
		
		this.byId('technicalNameFieldCUPId').setValueState("None");
		this.byId('nameFieldCUPId').setValueState("None");

		var oParam = oEvent.getParameter("name");
		if (oParam !== "AddCUP") 
		{
			return;
		}
		var that = this;

	},

	//the method generateKey is triggered from addMo method to generate a new key for the new cup defined package that will be added
	generateKey : function() 
	{
		var key = Math.floor((Math.random() * 10000) + 1);
		return key.toString();
	},
	//the method addMO is triggered when it's intended to add a CUP package (add button is pressed)
	//before adding the new entry, the technical name is checked to see if it already exists
	// a new entry is added in usag.morepository::Z_USAG_PACKAGE with the type 'cup'
	
	
	requestAccess4RootCUP: function(keypack)
	{	
		var url = "/usag/morepository/MOREPOSITORY/WebContent/getUser.xsjs";
		var oModel =  new sap.ui.model.odata.ODataModel(m_xsodata);
		var key=keypack ;
						jQuery.ajax({   
							url: url,   
							method: 'GET',   
							dataType: 'json',   
							success: function(user) 
							{
								username = user.USER;
								if (username != 'undefined')
								{
									authObj = {USER: username, ID_PACKAGE: key, SHARE_EDIT: 'N'};
									console.log(authObj);
									oModel.create('/USERS_PACKAGES', authObj, null, function()
									{
										//sap.m.MessageToast.show("Edit request approved successful! Please refresh the page!");
									},function()
									{
										sap.m.MessageToast.show("Requesting rights for the new root package failed");
									});
								}
								
							},
			
							error: function(XHR, Status, Error) 
							{			
								var error = Error;
								console.log(XHR.responseText);
								sap.m.MessageToast.show("Request failed, please contact one of the package editors");
							}
						});
	
	},
	
	addMo : function(evt) 
	{
		this.byId('technicalNameFieldCUPId').setValueState("None");
		this.byId('nameFieldCUPId').setValueState("None");
		var dateNew = com.tutorial.util.Formatter.GetUnformattedDate();
		var moService = com.tutorial.service.measureobject.MeasurementObjectPackageTableFactory.getInstance();
		var moKey = this.generateKey(); // AUTOINCREMENT ?

		var that = this;
		var moOb = 
		{
			"NAME" : this.byId('nameFieldCUPId').getValue(),
			"TECHNICAL_NAME" : this.byId('technicalNameFieldCUPId').getValue(),
			"KEY" : moKey,
			"DESCRIPTION" : this.byId('descriptionFieldCUPId').getValue(),
			"OWNER" : this.byId('ownerFieldCUPId').getText(),
			"PRODUCTID_ASSOCIATED" : productID,//varPath,
			"TYPE" : "cup",
			"STEP" : "1",
			"PARENTID" : 'User-defined',
			"PRODUCT_NAME" : productName,
			"CHANGED_BY" : this.byId('ownerFieldCUPId').getText(),
			"CHANGED_DATE" : dateNew
		};
		var found = false;
		var oDataMOdel = new sap.ui.model.odata.ODataModel(m_xsodata);
		oDataMOdel.read("/PACKTABLE?$filter=TECHNICAL_NAME eq '" + moOb.TECHNICAL_NAME + "' or NAME eq '" + moOb.NAME + "'", null, null, true, fSuccess, fError);
		function fSuccess(oEvent) 
		{
			if (oEvent.results.length != 0) 
			{
				var name = false;
				var techname = false;
				for ( var i in oEvent.results) 
				{
					if (oEvent.results[i].TECHNICAL_NAME === moOb.TECHNICAL_NAME) 
					{
						techname = true;
					}
				}

				var oMeasureOb = new sap.ui.model.json.JSONModel(oEvent.results);
				found = true;
				console.log(oEvent.results[0]);
				
			}

			if (techname) 
			{
				that.byId('technicalNameFieldCUPId').setValueState("Error");
				var msg = 'Technical Name already exists';
				sap.m.MessageToast.show(msg);
			}

			else 
			{
				moService.createModel({
					moData : moOb,
					successFunc : function(notesData) 
					{
						var msg = 'CUP package successfully added';
						that.requestAccess4RootCUP(moOb.KEY);
						sap.m.MessageToast.show(msg);
						that.resetField();
						that.byId('technicalNameFieldCUPId').setValue("");

						var router = sap.ui.core.UIComponent.getRouterFor(that);

						if (sap.ui.getCore().byId("iconTabBar1") == undefined)
							router.navTo("main");
						else 
						{
							router.navTo("main", {
								query : 
								{
									tab : sap.ui.getCore().byId("iconTabBar1").getSelectedKey()
								}
							}, true /* without history */);
						}

					},
					errorFunc : function() 
					{
						var msg = 'CUP package unsuccessfully added';
						sap.m.MessageToast.show(msg);
					}
				});
			}
		};
		
		function fError(oEvent) 
		{
			console.log("An error occured while reading Package Data!")
		}
		;

		//}
	},
	
	// after the CUP package was successfully added, the method resetField is called to reset all the fields to null value
	resetField : function() 
	{
		this.byId('nameFieldCUPId').setValue("");
		this.byId('technicalNameFieldCUPId').setValue("");
		this.byId('descriptionFieldCUPId').setValue("");
		this.byId('ownerFieldCUPId').setText("");
	}
});