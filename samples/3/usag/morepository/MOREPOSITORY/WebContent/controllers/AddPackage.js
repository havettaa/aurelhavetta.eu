jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectPackageTableFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectPKPrimaryInfoFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectAssignmentsPackageFactory' + m_urlVersion);
jQuery.sap.require("com.tutorial.util.Formatter" + m_urlVersion);

var varPath;
var productName;
var productID;

sap.ui.controller("ui5_routing.AddPackage", {
	//the method handleNavBack is triggered when the back button is pressed
	handleNavBack : function(evt) {
		this.resetField();
		var router = sap.ui.core.UIComponent.getRouterFor(this);
		var oHistory = sap.ui.core.routing.History.getInstance();
		var sPreviousHash = oHistory.getPreviousHash();

		if (sPreviousHash !== undefined) {
			window.history.go(-1);
		} else {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			router.navTo("main");
		}

	},

	onInit : function() {
		this.router = sap.ui.core.UIComponent.getRouterFor(this);
		console.log("Hi in add for MO --" + this._oRouter);
		this.router.attachRoutePatternMatched(this._handleRouteMatched, this);
	},
	//the method _handleRouteMatched is triggered after navigation to this page (this is necessary for routing)
	_handleRouteMatched : function(oEvent) {

		var oParam = oEvent.getParameter("name");
		if (oParam !== "AddPackage") {
			return;
		}
		var that = this;
		varPath = oEvent.getParameter("arguments").contextPath;

		console.log("Inside : " + varPath);

		var oDataMOdel = new sap.ui.model.odata.ODataModel(m_xsodata);
		oDataMOdel.read("/CV_PACKAGES_ALLParameters(PAR_NODE=\'" + varPath + "\')/Results", null, null, true, fSuccessPack, fErrorPack);
		function fSuccessPack(oEvent) {

			var oModelMo = new sap.ui.model.json.JSONModel();
			oModelMo.setData(oEvent.results[0]);
			that.getView().setModel(oModelMo);

			oModelMo.updateBindings(true);
			productName = oEvent.results[0].PRODUCT_NAME;
			productID = oEvent.results[0].KEY;
			var type = oEvent.results[0].TYPE;
			sap.ui.getCore().byId("productTextForPackageId").setText(productName);
		}

		function fErrorPack(oEvent) {
		}

		var oDataMOdel = new sap.ui.model.odata.ODataModel(m_xsodata);
		oDataMOdel.read("/CV_NODE_PARENTSParameters(P_NODEID=\'" + varPath + "\')/Results/?$orderby=LEVEL", null, null, true, fSuccess, fError);
		function fSuccess(oEvent) {

			var parents = [];
			parents = oEvent.results;
			sap.ui.getCore().byId("PanelIdPakageNav").removeAllContentMiddle();
			for ( var i in parents) {
				if (i != 0) {
					var breadcrumb = sap.ui.getCore().byId("PanelIdPakageNav").addContentMiddle(new sap.m.Text({
						text : ">"

					}).addStyleClass("textForArrow"))
				}

				var oLink = new sap.m.Button({
					text : parents[i].NAME,
					enabled : false
				});
				oLink.nodeid = parents[i].RESULT_NODE;
				if (i == parents.length - 1)
					oLink.addStyleClass("lastBreadcrumb");
				var breadcrumb = sap.ui.getCore().byId("PanelIdPakageNav").addContentMiddle(oLink);
			}
		}
		;
		function fError(oEvent) {
			console.log("An error occured while reading Parents Data!")
		}
		;

		var url = "/usag/morepository/MOREPOSITORY/WebContent/getUser.xsjs";

		jQuery.ajax({
			url : url,
			method : 'GET',
			dataType : 'json',
			success : function(user) {
				username = user.USER;
				var userID = username;
				var url = "https://ifp.wdf.sap.corp/sap/bc/zxa/FIND_EMPLOYEE_JSON?query=" + userID;
				sap.ui.getCore().byId('ownerFieldId').setText(userID);
			},
			error : function(XHR, Status, Error) {

				var error = Error;
				console.log(XHR.responseText);
				username = "default";
			}
		});

	},
	//the method generateKey is triggered from addMo method to generate a new key for the new psckage that will be added
	generateKey : function() {
		var key = Math.floor((Math.random() * 10000) + 1);
		return key.toString();
	},
	
    //the method addMO is triggered when it's intended to add a package (add button is pressed)
	//before adding the new entry, the technical name is checked to see if it already exists
    // a new entry is added in usag.morepository::Z_USAG_PACKAGE with the type 'custom'
	addMo : function(evt) {

		var packageService = com.tutorial.service.measureobject.MeasurementObjectPKPrimaryInfoFactory.getInstance();
		var key_value;
		packageService.loadModel({
			endpointParam : varPath,
			successFunc : function(moData, response) {
				var oModelMo = new sap.ui.model.json.JSONModel();
				oModelMo.setData(moData.results[0]);

				if (moData.results[0].TYPE = "product") {
					key_value = moData.results[0].KEY;
				} else {
					key_value = varPath;
				}
			},
			errorFunc : function() {
				console.log('error');
			}
		});

		var moService = com.tutorial.service.measureobject.MeasurementObjectPackageTableFactory.getInstance();
		var moKey = this.generateKey();
		var dateNew = com.tutorial.util.Formatter.GetUnformattedDate();
		var that = this;
		var moOb = {

			"NAME" : this.byId('nameFieldId').getValue(),
			"TECHNICAL_NAME" : this.byId('technicalNameFieldId').getValue(),
			"KEY" : moKey,
			"DESCRIPTION" : this.byId('descriptionFieldId').getValue(),
			"OWNER" : sap.ui.getCore().byId('ownerFieldId').getText(),
			"TYPE" : "custom",
			"STEP" : "2",
			"PARENTID" : varPath,
			"INDICATOR" : 0,
			"MAIN_TECHNICAL_NAME" : this.byId('technicalNameFieldId').getValue() + '_Copy',
			"CHANGED_BY" :sap.ui.getCore().byId('ownerFieldId').getText(),
			"CHANGED_DATE" : dateNew

		};
		var found = false;
		if (moOb.TECHNICAL_NAME && moOb.NAME) {
			var oDataMOdel = new sap.ui.model.odata.ODataModel(m_xsodata);
			oDataMOdel.read("/PACKTABLE?$filter=TECHNICAL_NAME eq '" + moOb.TECHNICAL_NAME + "' or NAME eq '" + moOb.NAME + "'", null, null, true, fSuccess, fError);
			function fSuccess(oEvent) {
				if (oEvent.results.length != 0) {
					var name = false;
					var techname = false;
					for ( var i in oEvent.results) {
						if (oEvent.results[i].TECHNICAL_NAME === moOb.TECHNICAL_NAME) {
							techname = true;

						}
					}

					var oMeasureOb = new sap.ui.model.json.JSONModel(oEvent.results);
					found = true;
					console.log(oEvent.results[0]);
				}

				if (techname) {
					that.byId('technicalNameFieldId').setValueState("Error");
					var msg = 'Technical Name already exists';
					sap.m.MessageToast.show(msg);
				}

				else {
					var nameErr = that.byId('technicalNameFieldId').getValueState();
					console.log("nume eroare" + nameErr);

					if (nameErr == "Error") {

						sap.m.MessageToast.show("Make sure you fill in the allowed characters only.")
					} else {
						moService.createModel({
							moData : moOb,
							successFunc : function(notesData) {
								var msg = 'Package successfully added';
								sap.m.MessageToast.show(msg);
								that.resetField();
								that.byId('technicalNameFieldId').setValue("");
								that.byId('technicalNameFieldId').setValueState("None");

								var router = sap.ui.core.UIComponent.getRouterFor(that);
								router.navTo("Detail", {
									contextPath : varPath
								});

							},
							errorFunc : function() {
								var msg = 'Package unsuccessfully added';
								sap.m.MessageToast.show(msg);
							}
						});
					}
				}
			}
			;
			function fError(oEvent) {
				console.log("An error occured while reading Package Data!")
			}
			;
		} else {
			if (!moOb.TECHNICAL_NAME && !moOb.NAME) {
				this.byId('technicalNameFieldId').setValueState("Error");
				this.byId('nameFieldId').setValueState("Error");
				sap.m.MessageToast.show("Please fill in Technical name and Name");
			} else if (!moOb.TECHNICAL_NAME) {
				this.byId('technicalNameFieldId').setValueState("Error");
				sap.m.MessageToast.show("Please fill in Technical name");
			} else if (!moOb.NAME) {
				this.byId('nameFieldId').setValueState("Error");
				sap.m.MessageToast.show("Please fill in  name");
			}

		}

	},
	// after the package was successfully added, the method resetField is called to reset all the fields to null value
	resetField : function() {
		this.byId('technicalNameFieldId').setValue("");
		this.byId('technicalNameFieldId').setValueState("None");
		this.byId('nameFieldId').setValue("");
		this.byId('descriptionFieldId').setValue("");
		sap.ui.getCore().byId('ownerFieldId').setText("");
	}
});