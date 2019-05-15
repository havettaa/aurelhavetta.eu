jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");

jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectTypesFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectTypesService' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectSusageStatusFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectFrequencyFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectUOMFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectAGGREGATIONFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectPMOFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectPKPrimaryInfoFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectLegFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectGetChildFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectProdFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectSolutionFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectFeatureFactory' + m_urlVersion);
jQuery.sap.require("com.tutorial.util.Formatter" + m_urlVersion);

var varPath;
var packNameForMO;

sap.ui.controller("ui5_routing.AddMo2", {
	//the method handleNavBack is triggered when the back button is pressed
	handleNavBack : function(oEvent) {
		this.resetField();
		var router = sap.ui.core.UIComponent.getRouterFor(this);
		if (varPath != undefined)
			router.navTo("Detail", {
				contextPath : varPath
			});
		else
			if (sap.ui.getCore().byId("iconTabBar1") == undefined)
				router.navTo("main");
			else {
				router.navTo("main", {
					query : {
						tab : sap.ui.getCore().byId("iconTabBar1").getSelectedKey()
					}
				}, true);
			}
		var that = this;
		var moprodService = com.tutorial.service.measureobject.MeasurementObjectPMOFactory.getInstance();
		moprodService.loadModel({
			endpointParam : varPath,
			successFunc : function(moData, response) {
				var oModelMo = new sap.ui.model.json.JSONModel();
				oModelMo.setData(moData.results[0]);
				that.getView().setModel(oModelMo);
				oModelMo.updateBindings(true);

			},
			errorFunc : function() {
				var msg = 'Unsuccessfully added';
				sap.m.MessageToast.show(msg);
			}
		})
	},
 
	onInit : function() {
		this.router = sap.ui.core.UIComponent.getRouterFor(this);
		console.log("Hi in add for MO --" + this._oRouter);
		this.router.attachRoutePatternMatched(this._handleRouteMatched, this);
		var model = new sap.ui.model.odata.v2.ODataModel(m_xsodata);
		this.getView().setModel(model, "techs");
	},
	//the method _handleRouteMatched is triggered after navigation to this page (this is necessary for routing)
	//_handleRouteMatched is a hook method for the router and will be called automatically by the framework, after the view is rendered
	// in this method are binded the necessary models on the AddMo2 view
	_handleRouteMatched : function(oEvent) {

		var url = "/usag/morepository/MOREPOSITORY/WebContent/getUser.xsjs";
		jQuery.ajax({
			url : url,
			method : 'GET',
			dataType : 'json',
			success : function(user) {
				username = user.USER;
				console.log("owneeeeeeeeeer1" + username)
			},
			error : function(XHR, Status, Error) {
				var error = Error;
				console.log(XHR.responseText);
				username = "default";
			}
		});

		var oParam = oEvent.getParameter("name");
		if (oParam !== "AddMo2") {
			return;
		}
		var that = this;
		varPath = oEvent.getParameter("arguments").contextPath;

		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData({
			enabledName : false,
			enabledTech : false,
			enabledDescription : false,
			enabledLogic : false,
			enabledFrequency : false,
			enabledMethod : false,
			enabledUOM : false,
			enabledAggregation : false,

		});
		this.getView().setModel(oModel, "typeMO");

		console.log("Inside the Line Item " + varPath);

		if (varPath != undefined) {
			var packageService = com.tutorial.service.measureobject.MeasurementObjectPKPrimaryInfoFactory.getInstance();

			packageService.loadModel({
				endpointParam : varPath,
				successFunc : function(moData, response) {
					packNameForMO = moData.results[0].NAME;
					var productName = moData.results[0].PRODUCT_NAME;

					sap.ui.getCore().byId("labelGlobalMO").setText("Measurement Object will be added to " + packNameForMO);
					sap.ui.getCore().byId("productTextForSearchView").setText(productName);

				},
				errorFunc : function() {
					console.log('error');
				}
			});

		}

		this.MOAssigments = {};

		var oModelMoType = new sap.ui.model.json.JSONModel();
		oModelMoType.setData({
			MoTypes : [],
			Uoms : [],
			Aggregations : [],
			Frequencies : [],
			SusageStatuses : []
		});

		sap.ui.getCore().setModel(oModelMoType, 'model');

		var motypesService = com.tutorial.service.measureobject.MeasurementObjectTypesFactory.getInstance();
		var uomService = com.tutorial.service.measureobject.MeasurementObjectUOMFactory.getInstance();
		var aggregationService = com.tutorial.service.measureobject.MeasurementObjectAGGREGATIONFactory.getInstance();
		var frequency = com.tutorial.service.measureobject.MeasurementObjectFrequencyFactory.getInstance();
		var susageStatus = com.tutorial.service.measureobject.MeasurementObjectSusageStatusFactory.getInstance();

		frequency.loadModel({
			successFunc : function(moData, response) {
				sap.ui.getCore().getModel('model').getData().Frequencies = moData.results;
				that.byId("listFrequency").setModel(sap.ui.getCore().getModel('model'));
				sap.ui.getCore().getModel('model').updateBindings(true);
			},
			errorFunc : function() {

			}
		});
		susageStatus.loadModel({
			successFunc : function(moData, response) {
				sap.ui.getCore().getModel('model').getData().SusageStatuses = moData.results;
				that.byId("listStatus").setModel(sap.ui.getCore().getModel('model'));
				sap.ui.getCore().getModel('model').updateBindings(true);
			},
			errorFunc : function() {

			}
		});
		var oModel = new sap.ui.model.odata.ODataModel(m_xsodata, true);
		var filters = [];
		filters.push(new sap.ui.model.Filter("ID", sap.ui.model.FilterOperator.Contains, 'NEMO'));
		var that = this;
		oModel.read("/OBJTYPES", {
			filters : filters,
			success : function(oData, oResponse) {

				sap.ui.getCore().getModel('model').getData().MoTypes = oData.results;
				that.getView().byId('listMOType').setModel(sap.ui.getCore().getModel('model'));
				that.getView().byId('listMOType').setSelectedItem(that.getView().byId('listMOType').getItems()[0]);
				that.handleMotypeSelected();
			}
		});
		// UOM
		uomService.loadModel({
			successFunc : function(moData, response) {
				sap.ui.getCore().getModel('model').getData().Uoms = moData.results;
				that.byId("listUOM").setModel(sap.ui.getCore().getModel('model'));
				sap.ui.getCore().getModel('model').updateBindings(true);
			},
			errorFunc : function() {

			}
		});

		aggregationService.loadModel({
			successFunc : function(moData, response) {
				sap.ui.getCore().getModel('model').getData().Aggregations = moData.results;
				that.byId("listAGGREGATION").setModel(sap.ui.getCore().getModel('model'));
				sap.ui.getCore().getModel('model').updateBindings(true);
			},
			errorFunc : function() {
			}
		});

		this.MOAssigments2 = {
			Product : null,
			ProductID : '',
			FeatureID : '',
			Feature : null,
			Solution : null,
			SolutionID : ''
		};

		var oModelMo = new sap.ui.model.json.JSONModel();
		oModelMo.setData({
			Products : [],
			Solutions : [],
			Features : [],
		});
		sap.ui.getCore().setModel(oModelMo, 'pageModel');

		var prodService = com.tutorial.service.measureobject.MeasurementObjectProdFactory.getInstance();
		var solutionService = com.tutorial.service.measureobject.MeasurementObjectSolutionFactory.getInstance();
		var featureService = com.tutorial.service.measureobject.MeasurementObjectFeatureFactory.getInstance();


		var oDataMOdel = new sap.ui.model.odata.ODataModel(m_xsodata);
		oDataMOdel.read("/CV_NODE_PARENTSParameters(P_NODEID=\'" + varPath + "\')/Results/?$orderby=LEVEL", null, null, true, fSuccess, fError);
		function fSuccess(oEvent) {

			var parents = [];
			parents = oEvent.results;
			sap.ui.getCore().byId("PanelIdNavAdd").removeAllContentMiddle();
			for ( var i in parents) {
				if (i != 0) {
					var breadcrumb = sap.ui.getCore().byId("PanelIdNavAdd").addContentMiddle(new sap.m.Text({
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
				var breadcrumb = sap.ui.getCore().byId("PanelIdNavAdd").addContentMiddle(oLink);
			}
		}
		;
		function fError(oEvent) {
			console.log("An error occured while reading Parents Data!")
		}
		;

	},

//the method filterFrequency is called when the mouse is put on the input(id "inputFrequency") of Measurement Frequency. At the mouse press the pop-up with possible entries appear (id "listFrequency").
	filterFrequency : function() {

		var searchValue = jQuery.trim(this.byId("inputFrequency").getValue());
		var showSearch = (searchValue.length !== 0);

		var binding = this.byId("listFrequency").getBinding("items");
		if (showSearch && binding !== undefined) {
			var filters = [];
			filters.push(new sap.ui.model.Filter("NAME", sap.ui.model.FilterOperator.Contains, searchValue));
			binding.filter(filters);
		} else {
			binding.filter(false);
		}
	},
	//the method handleFrequencySelected is called when a value from the list displayed (id: "listFrequency") is selected
	handleFrequencySelected : function(evt) {
		var selectedItem = this.byId("listFrequency").getSelectedItem().getProperty("title");
		var selectedID = this.byId("listFrequency").getSelectedItem().getTitle();
		var moService = com.tutorial.service.measureobject.MeasurementObjectFactory.getInstance();

		this.byId("inputFrequency").setValue(selectedItem);
		this.byId("popoverFrequency").close();
		sap.ui.getCore().byId("butonelSys").setIcon("sap-icon://cancel");
		this.MOAssigments.Frequency = selectedID;

	},

	//the method filterStatus is called when the mouse is put on the input(id "inputStatus") of Measurement method. At the mouse press the pop-up with possible entries appear (id "listStatus").
	filterStatus : function() {

		var searchValue = jQuery.trim(this.byId("inputStatus").getValue());
		var showSearch = (searchValue.length !== 0);

		var binding = this.byId("listStatus").getBinding("items");
		if (showSearch && binding !== undefined) {
			var filters = [];
			filters.push(new sap.ui.model.Filter("NAME", sap.ui.model.FilterOperator.Contains, searchValue)); // name

			binding.filter(filters);
		} else {
			binding.filter(false);
		}
	},
	//the method handleStatusSelected is called when a value from the list displayed (id: "listStatus") is selected
	handleStatusSelected : function(evt) {
		var selectedItem = this.byId("listStatus").getSelectedItem().getProperty("title");

		var selectedID = this.byId("listStatus").getSelectedItem().getTitle();
		var moService = com.tutorial.service.measureobject.MeasurementObjectFactory.getInstance();

		this.byId("inputStatus").setValue(selectedItem);

		this.byId("popoverStatus").close();
		sap.ui.getCore().byId("butonelSysSusage").setIcon("sap-icon://cancel");
		this.MOAssigments.Status = selectedID;

	},
	//the method filterMotype is called when the mouse is put on the input(id "inputMOType") of Measurement Object Type. At the mouse press the pop-up with possible entries appear (id "listMOType").
	filterMotype : function() {

		var searchValue = jQuery.trim(sap.ui.getCore().byId('inputMOType').getValue());
		var showSearch = (searchValue.length !== 0);

		var binding = this.byId("listMOType").getBinding("items");
		if (showSearch && binding !== undefined) {
			var filters = [];
			filters.push(new sap.ui.model.Filter("NAME", sap.ui.model.FilterOperator.Contains, searchValue)); 
			binding.filter(filters);
		} else {
			binding.filter(false);
		}
	},
	
	//the method handleMotypeSelected is called when a value from the list displayed (id: "listMOType") is selected
	handleMotypeSelected : function(evt) {
		this.resetField();
		var selectedItem = this.byId("listMOType").getSelectedItem().getProperty("title");
		var selectedID = this.byId("listMOType").getSelectedItem().getTitle();
		var moService = com.tutorial.service.measureobject.MeasurementObjectFactory.getInstance();
		var that = this;
		sap.ui.getCore().byId('inputMOType').setValue(selectedItem);
		this.byId("popoverMOType").close();

		this.MOAssigments.MotypeID = selectedID;
		if (sap.ui.getCore().byId('inputMOType').getValue() == 'NEMO') {
			sap.ui.getCore().byId('butonelSys').setIcon("sap-icon://arrow-down");
			sap.ui.getCore().byId('butonelSysSusage').setIcon("sap-icon://arrow-down");
			sap.ui.getCore().byId('butonelSysUOM').setIcon("sap-icon://arrow-down");
			sap.ui.getCore().byId('butonelSysAggregation').setIcon("sap-icon://arrow-down");
			sap.ui.getCore().byId('technicalNameFieldIdMO').setShowValueHelp(false);
			sap.ui.getCore().byId('butonelSys').setVisible(true);
			sap.ui.getCore().byId('butonelSysSusage').setVisible(true);
			sap.ui.getCore().byId('butonelSysUOM').setVisible(true);
			sap.ui.getCore().byId('butonelSysAggregation').setVisible(true);

			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData({
				enabledName : true,
				enabledTech : true,
				enabledDescription : true,
				enabledLogic : true,
				enabledFrequency : true,
				enabledMethod : true,
				enabledUOM : true,
				enabledAggregation : true,
			});
			this.getView().setModel(oModel, "typeMO");
		} else {
			sap.ui.getCore().byId('butonelSys').setVisible(false);
			sap.ui.getCore().byId('butonelSysSusage').setVisible(false);
			sap.ui.getCore().byId('butonelSysUOM').setVisible(false);
			sap.ui.getCore().byId('butonelSysAggregation').setVisible(false);

			sap.ui.getCore().byId('technicalNameFieldIdMO').setShowValueHelp(true)
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData({
				enabledName : false,
				enabledTech : true,
				enabledDescription : true,
				enabledLogic : false,
				enabledFrequency : false,
				enabledMethod : false,
				enabledUOM : false,
				enabledAggregation : false,
				AGG : 'SUM',
				FREQ : 'Monthly',
				UOM : 'Traffic'
			});
			this.MOAssigments.Frequency = 'Monthly';
			this.MOAssigments.UOM = 'Traffic';
			this.MOAssigments.AGGREGATION = 'SUM';
			this.getView().setModel(oModel, "typeMO");
		}

	},

	//the method filterUOM is called when the mouse is put on the input(id "inputUOM") of Unit of Measure. At the mouse press the pop-up with possible entries appear (id "listUOM").
	filterUOM : function() {

		var searchValue = jQuery.trim(this.byId("inputUOM").getValue());
		var showSearch = (searchValue.length !== 0);

		var binding = this.byId("listUOM").getBinding("items");
		if (showSearch && binding !== undefined) {
			var filters = [];
			filters.push(new sap.ui.model.Filter("NAME", sap.ui.model.FilterOperator.Contains, searchValue)); 
			binding.filter(filters);
		} else {
			binding.filter(false);
		}
	},
	//the method handleUOMSelected is called when a value from the list displayed (id: "listUOM") is selected
	handleUOMSelected : function(evt) {
		var selectedItem = this.byId("listUOM").getSelectedItem().getProperty("title");
		var selectedID = this.byId("listUOM").getSelectedItem().getTitle();
		var moService = com.tutorial.service.measureobject.MeasurementObjectFactory.getInstance();
		this.byId("inputUOM").setValue(selectedItem);
		this.byId("popoverUOM").close();
		sap.ui.getCore().byId("butonelSysUOM").setIcon("sap-icon://cancel");
		this.MOAssigments.UOM = selectedItem;
	},

	//the method filterAGGREGATION is called when the mouse is put on the input(id "inputAGGREGATION") of Aggregation. At the mouse press the pop-up with possible entries appear (id "listAGGREGATION").
	filterAGGREGATION : function() {

		var searchValue = jQuery.trim(this.byId("inputAGGREGATION").getValue());
		var showSearch = (searchValue.length !== 0);

		var binding = this.byId("listAGGREGATION").getBinding("items");
		if (showSearch && binding !== undefined) {
			var filters = [];
			filters.push(new sap.ui.model.Filter("NAME", sap.ui.model.FilterOperator.Contains, searchValue)); 
			binding.filter(filters);
		} else {
			binding.filter(false);
		}
	},
	//the method handleAGGREGATIONSelected is called when a value from the list displayed (id: "listAGGREGATION") is selected
	handleAGGREGATIONSelected : function(evt) {
		var selectedItem = this.byId("listAGGREGATION").getSelectedItem().getProperty("title");
		var selectedID = this.byId("listAGGREGATION").getSelectedItem().getTitle();
		var moService = com.tutorial.service.measureobject.MeasurementObjectFactory.getInstance();
		this.byId("inputAGGREGATION").setValue(selectedItem);
		this.byId("popoverAGGREGATION").close();
		sap.ui.getCore().byId("butonelSysAggregation").setIcon("sap-icon://cancel");
		this.MOAssigments.AGGREGATION = selectedItem;
	},
	
	//the method generateKey is triggered from addMo method to generate a new key for the new psckage that will be added
	generateKey : function() {
		var key = Math.floor((Math.random() * 10000) + 1);

		return key.toString();
	},
	checkEmptyFields : function() {
		if (sap.ui.getCore().byId('inputMOType').getValue() == "NEMO") {
			if ((!sap.ui.getCore().byId('technicalNameFieldIdMO').getValue()) || (!sap.ui.getCore().byId('keyTextFieldId').getValue()) || (!sap.ui.getCore().byId('inputMOType').getValue())) {
				// check that inputs are not empty
				if (!sap.ui.getCore().byId('technicalNameFieldIdMO').getValue())
					sap.ui.getCore().byId('technicalNameFieldIdMO').setValueState("Error");
				if (!sap.ui.getCore().byId('keyTextFieldId').getValue())
					sap.ui.getCore().byId('keyTextFieldId').setValueState("Error");
				if (!sap.ui.getCore().byId('inputMOType').getValue())
					sap.ui.getCore().byId('inputMOType').setValueState("Error");
				var msg = 'Please fill the mandatory fields!';
				sap.m.MessageToast.show(msg);
				return false;
			}
			return true;
		} else {
			if ((!sap.ui.getCore().byId('technicalNameFieldIdMO').getValue()) || (!sap.ui.getCore().byId('keyTextFieldId').getValue()) || (!sap.ui.getCore().byId('inputMOType').getValue())) {
				// check that inputs are not empty
				if (!sap.ui.getCore().byId('technicalNameFieldIdMO').getValue())
					sap.ui.getCore().byId('technicalNameFieldIdMO').setValueState("Error");
				if (!sap.ui.getCore().byId('inputMOType').getValue())
					sap.ui.getCore().byId('inputMOType').setValueState("Error");
				var msg = 'Please fill the mandatory fields!';
				sap.m.MessageToast.show(msg);
				return false;
			}
			return true;
		}
	},
	checkDuplicates : function(oEvent) {
		var router = sap.ui.core.UIComponent.getRouterFor(this);
		var found = false;
		if (oEvent.results.length != 0) {
			console.log("Duplicate TECHNICAL NAME");
			var oMeasureOb = new sap.ui.model.json.JSONModel(oEvent.results);
			found = true;
			console.log(oEvent.results[0]);
		}

		if (found) {
			if (varPath != undefined) {
				var that = this;
				sap.m.MessageBox.show("MO already exists, do you want to assign it to the current package?", {
					icon : sap.m.MessageBox.Icon.INFORMATION,
					title : "Info MessageBox",
					actions : [ sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO ],
					onClose : function(oAction) {
						if (oAction === sap.m.MessageBox.Action.YES) {
							keyPackage = varPath;
							var moOb2 = {
								"KEY_MEASUREMENT_OBJECTS" : oEvent.results[0].KEY,//moKey,
								"KEY_PACKAGE" : keyPackage
							};
							var keyMO = oEvent.results[0].KEY;

							var oDataMOdel = new sap.ui.model.odata.ODataModel(m_xsodata);
							oDataMOdel.read("/LEG?$filter=KEY_PACKAGE eq '" + moOb2.KEY_PACKAGE + "' and KEY_MEASUREMENT_OBJECTS eq '" + moOb2.KEY_MEASUREMENT_OBJECTS + "'", null, null, true,
									fSuccess, fError);
							function fSuccess(oEvent) {
								if (oEvent.results.length != 0) {
									sap.ui.getCore().byId('technicalNameFieldIdMO').setValueState("Error");
									console.log("Assignment already exists");
									var msg = 'This MO is already assigned to this package';
									sap.m.MessageToast.show(msg);
								} else {

									//update the date of assignment of the MO with key_MO
									var moService = com.tutorial.service.measureobject.MeasurementObjectFactory.getInstance();

									var dateObj = new Date();
									var month = dateObj.getUTCMonth() + 1; //months from 1-12

									if (month < 10) {
										month = 0 + month.toString()
									}

									var day = dateObj.getUTCDate();

									if (day < 10) {
										day = 0 + day.toString()
									}

									var year = dateObj.getUTCFullYear();

									var hour = dateObj.getHours();

									if (hour < 10) {
										hour = 0 + hour.toString()
									}

									var minutes = dateObj.getMinutes();

									if (minutes < 10) {
										minutes = 0 + minutes.toString()
									}

									var seconds = dateObj.getSeconds();

									if (seconds < 10) {
										seconds = 0 + seconds.toString()
									}

									var newdate = year.toString() + month.toString() + day.toString() + hour.toString() + minutes.toString() + seconds.toString();

									var moObUpdate = {
										"DATE_OF_ASSIGNMENT" : newdate
									};

									moService.updateModel({
										updatedData : moObUpdate,
										successFunc : function(moData) {
											keyPackage = keyPackage;

										},
										errorFunc : function() {
											var msg = 'Measurement Object unsuccessfully updated';
											sap.m.MessageToast.show(msg);
										},
										moKey : keyMO
									});

									var moprodService = com.tutorial.service.measureobject.MeasurementObjectPMOFactory.getInstance();
									moprodService.createModel({
										moData : moOb2,
										successFunc : function(notesData) {
											var msg = 'Successfully added';
											sap.m.MessageToast.show(msg);
											that.resetField();
											sap.ui.getCore().byId('inputMOType').setValue("");
											sap.ui.getCore().byId('inputMOType').setValueState("None");

											sap.ui.getCore().byId('technicalNameFieldIdMO').setValue("");
											sap.ui.getCore().byId('technicalNameFieldIdMO').setValueState("None");

											sap.ui.getCore().byId('keyTextFieldId').setValue("");
											sap.ui.getCore().byId('keyTextFieldId').setValueState("None");
											router.navTo("Detail", {
												contextPath : varPath
											});

										},
										errorFunc : function() {
											sap.ui.getCore().byId('inputMOType').setValue("");
											sap.ui.getCore().byId('inputMOType').setValueState("None");

											sap.ui.getCore().byId('technicalNameFieldIdMO').setValue("");
											sap.ui.getCore().byId('technicalNameFieldIdMO').setValueState("None");

											sap.ui.getCore().byId('keyTextFieldId').setValue("");
											sap.ui.getCore().byId('keyTextFieldId').setValueState("None");
											var msg = 'Unsuccessfully added';
											sap.m.MessageToast.show(msg);
										}
									});
								}
							}
							function fError(oEvent) {
								var msg = 'Unsuccessfully read assignment data';
								sap.m.MessageToast.show(msg);
							}
							//	

						} else {
							sap.ui.getCore().byId('technicalNameFieldIdMO').setValueState("Error");
							var msg = 'Technical Name already exists. Please enter a different name';
							sap.m.MessageToast.show(msg);
						}
					}

				});
			} else {
				sap.m.MessageBox.show("MO already exists, do you want to display it?", {
					icon : sap.m.MessageBox.Icon.INFORMATION,
					title : "Info MessageBox",
					actions : [ sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO ],
					linkTitle : "Link",
					onClose : function(oAction) {
						if (oAction === sap.m.MessageBox.Action.YES) {
							router.navTo("DetailMO", {
								lineItemId : oEvent.results[0].KEY
							});

						} else {
							sap.ui.getCore().byId('technicalNameFieldIdMO').setValueState("Error");
							var msg = 'Technical Name already exists. Please enter a different name';
							sap.m.MessageToast.show(msg);
						}
					}
				});
			}
		}
		return !found;

	},

    //the method addMO is triggered when it's intended to add a mo (add button is pressed)
	//before adding the new entry, the technical name is checked to see if it already exists
    // a new entry is added in usag.morepository::Z_USAG_MO
	addMo : function(evt) {
		var oTable = sap.ui.getCore().byId("tableMoForPackageId");
		var that = this;
		var oBus = sap.ui.getCore().getEventBus();
		var moService = com.tutorial.service.measureobject.MeasurementObjectFactory.getInstance();
		var moprodService = com.tutorial.service.measureobject.MeasurementObjectPMOFactory.getInstance();
		var moKey = this.generateKey();
		var router = sap.ui.core.UIComponent.getRouterFor(this);
		var listMOTYPE;

		if (this.byId("listMOType").getSelectedItem() == null)
			listMOTYPE = null;
		else
			listMOTYPE = this.byId("listMOType").getSelectedItem().getCustomData()[0].getValue();

		var moOb = {
			"TECHNICAL_NAME" : sap.ui.getCore().byId('technicalNameFieldIdMO').getValue(),
			"DESCRIPTION" : this.byId('descriptionFieldId').getValue(),
			"KEY" : sap.ui.getCore().byId('technicalNameFieldIdMO').getValue(),
			"NAME" : sap.ui.getCore().byId('keyTextFieldId').getValue(),
			"DATE_OF_ENTER" : this.byId('dateFieldID').getValue(),
			"FEATUREID" : null,
			"PRODUCTID" : null,
			"SOLUTIONID" : null,
			"FEATURE" : null,
			"PRODUCT" : null,
			"SOLUTION" : null,
			"MO_TYPE" : listMOTYPE,
			"UNIT_OF_MEASURE" : this.MOAssigments.UOM,
			"AGGREGATION" : this.MOAssigments.AGGREGATION,
			"MO_LOGIC" : this.byId('moLogicFieldId').getValue(),
			"MEASUREMENT_FREQUENCY" : this.MOAssigments.Frequency,
			"MEASUREMENT_METHOD" : this.MOAssigments.Status,
			"OWNER" : username
		};
		console.log("owneeeeeeeeeer2" + moOb.OWNER + username)

		if (this.checkEmptyFields())

		{
			var oDataMOdel = new sap.ui.model.odata.ODataModel(m_xsodata);
			oDataMOdel.read("/MEASUREMENT_OBJECTS?$filter=TECHNICAL_NAME eq '" + moOb.TECHNICAL_NAME + "'", null, null, true, fSuccess, fError);
			function fSuccess(oEvent) {
				if (that.checkDuplicates(oEvent)) {
					moService.createModel({
						moData : moOb,
						successFunc : function(notesData) {
							
							var oTable = sap.ui.getCore().byId("tableMoForPackageId");
							if (varPath != undefined) {
								keyPackage = varPath;
								var moOb2 = {
									"KEY_MEASUREMENT_OBJECTS" : sap.ui.getCore().byId('technicalNameFieldIdMO').getValue(),
									"KEY_PACKAGE" : keyPackage
								};
								moprodService.createModel({
									moData : moOb2,
									successFunc : function(notesData) {
										var msg = 'Measurement Object successfully added';
										sap.m.MessageToast.show(msg);
										that.resetField();
										sap.ui.getCore().byId('inputMOType').setValue("");
										sap.ui.getCore().byId('inputMOType').setValueState("None");

										sap.ui.getCore().byId('technicalNameFieldIdMO').setValue("");
										sap.ui.getCore().byId('technicalNameFieldIdMO').setValueState("None");

										sap.ui.getCore().byId('keyTextFieldId').setValue("");
										sap.ui.getCore().byId('keyTextFieldId').setValueState("None");
										router.navTo("Detail", {
											contextPath : varPath
										});

									},
									errorFunc : function() {
										sap.ui.getCore().byId('inputMOType').setValue("");
										sap.ui.getCore().byId('inputMOType').setValueState("None");

										sap.ui.getCore().byId('technicalNameFieldIdMO').setValue("");
										sap.ui.getCore().byId('technicalNameFieldIdMO').setValueState("None");

										sap.ui.getCore().byId('keyTextFieldId').setValue("");
										sap.ui.getCore().byId('keyTextFieldId').setValueState("None");
										var msg = 'Unsuccessfully added';
										sap.m.MessageToast.show(msg);
									}
								});
							} else {
								that.resetField();
								if (sap.ui.getCore().byId("iconTabBar1") == undefined)
									router.navTo("main");
								else {
									router.navTo("main", {
										query : {
											tab : sap.ui.getCore().byId("iconTabBar1").getSelectedKey()
										}
									}, true);
								}
								sap.ui.getCore().byId('inputMOType').setValue("");
								sap.ui.getCore().byId('inputMOType').setValueState("None");

								sap.ui.getCore().byId('technicalNameFieldIdMO').setValue("");
								sap.ui.getCore().byId('technicalNameFieldIdMO').setValueState("None");

								sap.ui.getCore().byId('keyTextFieldId').setValue("");
								sap.ui.getCore().byId('keyTextFieldId').setValueState("None");
							}
						},
						errorFunc : function() {

							sap.m.MessageToast.show('Measurement Object unsuccessfully added');

							sap.ui.getCore().byId('inputMOType').setValue("");
							sap.ui.getCore().byId('inputMOType').setValueState("None");

							sap.ui.getCore().byId('technicalNameFieldIdMO').setValue("");
							sap.ui.getCore().byId('technicalNameFieldIdMO').setValueState("None");

							sap.ui.getCore().byId('keyTextFieldId').setValue("");
							sap.ui.getCore().byId('keyTextFieldId').setValueState("None");
						}
					});

				}
			}
			;
			function fError(oEvent) {
				console.log("An error occured while reading Measurement Object Data!")
			}
			;
		}

	},

	// after the mo was successfully added, the method resetField is called to reset all the fields to null value
	resetField : function() {
		sap.ui.getCore().byId('technicalNameFieldIdMO').setValue("");
		sap.ui.getCore().byId('technicalNameFieldIdMO').setValueState("None");

		sap.ui.getCore().byId('keyTextFieldId').setValue("");
		sap.ui.getCore().byId('keyTextFieldId').setValueState("None");

		this.byId('descriptionFieldId').setValue("");

	//	this.byId('inputField').setValue("");
		//this.byId('inputSolution').setValue("");
		sap.ui.getCore().byId('inputMOType').setValue("");
		this.byId('inputUOM').setValue("");
		this.byId('inputAGGREGATION').setValue("");
		this.byId('moLogicFieldId').setValue("");
		this.byId('inputFrequency').setValue("");
		this.byId('inputStatus').setValue("");
	},



});