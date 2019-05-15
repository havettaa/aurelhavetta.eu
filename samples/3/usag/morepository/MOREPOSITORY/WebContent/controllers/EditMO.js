jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");

jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectTypesFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectTypesService' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectSusageStatusFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectFrequencyFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectUOMFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectAGGREGATIONFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectLegFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectMoNotInPackageFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectPMOFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectVIEWFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectLegFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectPKPrimaryInfoFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectProdFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectSolutionFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectFeatureFactory' + m_urlVersion);
jQuery.sap.require("com.tutorial.util.Formatter" + m_urlVersion);

var varPath;
var lineItem;
var productNameVar;
var obj;

sap.ui.controller("ui5_routing.EditMo2", {
	oldData : {},
	
	onInit : function()
	{
		this.router = sap.ui.core.UIComponent.getRouterFor(this);
		console.log("Hi in edit for MO --" + this._oRouter);
		this.router.attachRoutePatternMatched(this._handleRouteMatched, this);
	},

	//the method handleNavBack is triggered when the back button is pressed	
	handleNavBack : function(oEvent) {
		this.byId('technicalNameFieldId').setValueState("None");
		var oHistory = sap.ui.core.routing.History.getInstance();
		var sPreviousHash = oHistory.getPreviousHash();

		if (sPreviousHash !== undefined) {
			window.history.go(-1);
		} else {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			router.navTo("main");
		}

	},

	//the method _handleRouteMatched is triggered after navigation to this page (this is necessary for routing)
	//_handleRouteMatched is a hook method for the router and will be called automatically by the framework, after the view is rendered
	// in this method are binded the necessary models on the EditMo2 view
	_handleRouteMatched : function(oEvent) {

		var url = "/usag/morepository/MOREPOSITORY/WebContent/getUser.xsjs";
		jQuery.ajax({
			url : url,
			method : 'GET',
			dataType : 'json',
			success : function(user) {
				username = user.USER;
			},
			error : function(XHR, Status, Error) {
				var error = Error;
				console.log(XHR.responseText);
				username = "default";
			}
		});

		var oParam = oEvent.getParameter("name");
		if (oParam !== "EditMo2") {
			return;
		}
		var that = this;
		sap.ui.getCore().byId("labelGlobalEditMO").setText("Edit Measurement object");

		varPath = oEvent.getParameter("arguments").contextPath;
		lineItem = oEvent.getParameter("arguments").lineItemId;
		sap.ui.getCore().byId("PanelIdNavMO").removeAllContentMiddle();

		var moViewService = com.tutorial.service.measureobject.MeasurementObjectVIEWFactory.getInstance();
		var lineItemIdDecoded = decodeURIComponent(lineItem);
		var filters = {
			KEY : lineItemIdDecoded
		};

		moViewService.loadModel({
			endpointParam : filters,
			successFunc : function(moData, response) {	
				var dateNew = com.tutorial.util.Formatter.GetUnformattedDate();
				var obToField = moData.results[0];
				obj = obToField;

				moKey = obToField.KEY;
				that.byId('technicalNameFieldId').setValue(obToField.TECHNICAL_NAME);
				that.byId('descriptionFieldId').setValue(obToField.DESCRIPTION);
				that.oldData["DESCRIPTION"] = (obToField.DESCRIPTION);
				that.byId('keyTextFieldId').setValue(obToField.NAME);
				that.oldData["NAME"] = (obToField.NAME);
				that.byId('inputMOType').setValue(obToField.MO_TYPE);
				that.byId('inputUOM').setValue(obToField.UNIT_OF_MEASURE);
				that.oldData["UNIT_OF_MEASURE"] = (obToField.UNIT_OF_MEASURE);
				that.byId('inputAGGREGATION').setValue(obToField.AGGREGATION);
				that.oldData["AGGREGATION"] = (obToField.AGGREGATION);
				that.byId('inputFieldEdit').setValue(obToField.FEATURE);
				that.byId('inputSolutionEdit').setValue(obToField.SOLUTION);
				that.byId('moLogicFieldId').setValue(obToField.MO_LOGIC);
				that.oldData["MO_LOGIC"] = (obToField.MO_LOGIC);
				that.byId('inputFrequency').setValue(obToField.MEASUREMENT_FREQUENCY);
				that.oldData["MEASUREMENT_FREQUENCY"] = (obToField.MEASUREMENT_FREQUENCY);
				that.byId('inputStatus').setValue(obToField.MEASUREMENT_METHOD);
				that.oldData["MEASUREMENT_METHOD"] = (obToField.MEASUREMENT_METHOD);
				that.byId('dateFieldID').setValue(dateNew);
				
				//that.byId('dateFieldID').setValue(obToField.DATE_OF_ENTER);

				if (obToField.MO_TYPE == 'NEMO') {
					that.byId("technicalNameFieldId").setEditable(false);
					that.byId("inputFrequency").setPlaceholder("Please assign a Measurement Frequency");
					that.byId("inputStatus").setPlaceholder("Please assign a measurement method");
					that.byId("inputUOM").setPlaceholder("Add Unit of Measure");
					that.byId("inputAGGREGATION").setPlaceholder("Add Aggregation");
					that.byId("moLogicFieldId").setPlaceholder("Add Measurement Object Logic");

					if (that.byId("inputUOM").getValue() == "")
						sap.ui.getCore().byId('butonelSysUOMEdit').setIcon("sap-icon://arrow-down");
					else
						sap.ui.getCore().byId('butonelSysUOMEdit').setIcon("sap-icon://cancel");

					if (that.byId("inputFrequency").getValue() == "")
						sap.ui.getCore().byId('butonelSysEdit').setIcon("sap-icon://arrow-down");
					else
						sap.ui.getCore().byId('butonelSysEdit').setIcon("sap-icon://cancel");

					if (that.byId("inputStatus").getValue() == "")
						sap.ui.getCore().byId('butonelSysSusageEdit').setIcon("sap-icon://arrow-down");
					else
						sap.ui.getCore().byId('butonelSysSusageEdit').setIcon("sap-icon://cancel");

					if (that.byId("inputAGGREGATION").getValue() == "")
						sap.ui.getCore().byId('butonelSysAggregationEdit').setIcon("sap-icon://arrow-down");
					else
						sap.ui.getCore().byId('butonelSysAggregationEdit').setIcon("sap-icon://cancel");

					that.byId("inputMOType").setEditable(false);
					sap.ui.getCore().byId("butonelSysTypeEdit").setVisible(false);
					that.byId("inputMOType").setPlaceholder(" ");
				} else {
					that.byId("keyTextFieldId").setEditable(false);
					that.byId("technicalNameFieldId").setEditable(false);
					that.byId("inputMOType").setEditable(false);
					sap.ui.getCore().byId("butonelSysTypeEdit").setVisible(false);
					that.byId("inputMOType").setPlaceholder(" ");

					that.byId("inputFrequency").setPlaceholder("Please assign a Measurement Frequency");
					that.byId("inputStatus").setPlaceholder("Please assign a measurement method");
					that.byId("inputUOM").setPlaceholder("Add Unit of Measure");
					that.byId("inputAGGREGATION").setPlaceholder("Add Aggregation");
					that.byId("moLogicFieldId").setPlaceholder("Add Measurement Object Logic");

					if (that.byId("inputUOM").getValue() == "")
						sap.ui.getCore().byId('butonelSysUOMEdit').setIcon("sap-icon://arrow-down");
					else
						sap.ui.getCore().byId('butonelSysUOMEdit').setIcon("sap-icon://cancel");

					if (that.byId("inputFrequency").getValue() == "")
						sap.ui.getCore().byId('butonelSysEdit').setIcon("sap-icon://arrow-down");
					else
						sap.ui.getCore().byId('butonelSysEdit').setIcon("sap-icon://cancel");

					if (that.byId("inputStatus").getValue() == "")
						sap.ui.getCore().byId('butonelSysSusageEdit').setIcon("sap-icon://arrow-down");
					else
						sap.ui.getCore().byId('butonelSysSusageEdit').setIcon("sap-icon://cancel");

					if (that.byId("inputAGGREGATION").getValue() == "")
						sap.ui.getCore().byId('butonelSysAggregationEdit').setIcon("sap-icon://arrow-down");
					else
						sap.ui.getCore().byId('butonelSysAggregationEdit').setIcon("sap-icon://cancel");
				}

			},
			errorFunc : function() {
			}
		});
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

		motypesService.loadModel({
			successFunc : function(moData, response) {
				sap.ui.getCore().getModel('model').getData().MoTypes = moData.results;
				that.byId("listMOType").setModel(sap.ui.getCore().getModel('model'));
				sap.ui.getCore().getModel('model').updateBindings(true);
			},
			errorFunc : function() {

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
			Feature : null,
			Solution : null

		};

		var oModelMo = new sap.ui.model.json.JSONModel();
		oModelMo.setData({
			Products : [],
			Solutions : [],
			Features : []

		});
		sap.ui.getCore().setModel(oModelMo, 'pageModel');

		var prodService = com.tutorial.service.measureobject.MeasurementObjectProdFactory.getInstance();

		if (varPath != undefined) {
			var oDataMOdel = new sap.ui.model.odata.ODataModel(m_xsodata);
			oDataMOdel.read("/CV_NODE_PARENTSParameters(P_NODEID=\'" + varPath + "\')/Results/?$orderby=LEVEL", null, null, true, fSuccess, fError);
			function fSuccess(oEvent) {

				var parents = [];
				parents = oEvent.results;
				sap.ui.getCore().byId("PanelIdNavMO").removeAllContentMiddle();
				for ( var i in parents) {
					if (i != 0) {
						var breadcrumb = sap.ui.getCore().byId("PanelIdNavMO").addContentMiddle(new sap.m.Text({
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
					var breadcrumb = sap.ui.getCore().byId("PanelIdNavMO").addContentMiddle(oLink);
				}

			}
			;
			function fError(oEvent) {
				console.log("An error occured while reading Parents Data!")
			}
			;

		}
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

		this.MOAssigments.Frequency = selectedID;
		sap.ui.getCore().byId("butonelSysEdit").setIcon("sap-icon://cancel");

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

		this.MOAssigments.Status = selectedID;
		sap.ui.getCore().byId("butonelSysSusageEdit").setIcon("sap-icon://cancel");

	},
	//the method filterMotype is called when the mouse is put on the input(id "inputMOType") of Measurement Object Type. At the mouse press the pop-up with possible entries appear (id "listMOType").
	filterMotype : function() {

		var searchValue = jQuery.trim(this.byId("inputMOType").getValue());
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
		var selectedItem = this.byId("listMOType").getSelectedItem().getProperty("title");
		var selectedID = this.byId("listMOType").getSelectedItem().getTitle();
		var moService = com.tutorial.service.measureobject.MeasurementObjectFactory.getInstance();
		this.byId("inputMOType").setValue(selectedItem);
		this.byId("popoverMOType").close();

		this.MOAssigments.MotypeID = selectedID;

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

		this.MOAssigments.UOM = selectedItem;
		this.MOAssigments.UOMID = selectedID;
		sap.ui.getCore().byId("butonelSysUOMEdit").setIcon("sap-icon://cancel");
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

		this.MOAssigments.AGGREGATION = selectedItem;
		sap.ui.getCore().byId("butonelSysAggregationEdit").setIcon("sap-icon://cancel");
	},
    //the method saveMo is triggered when the user wants to save the changes (save button is pressed)
	saveMo : function(oEvent) {

		var that = this;
		var moService = com.tutorial.service.measureobject.MeasurementObjectFactory.getInstance();
		var packageLegService = com.tutorial.service.measureobject.MeasurementObjectLegFactory.getInstance();
		var moOb = {
			"DESCRIPTION" : this.byId('descriptionFieldId').getValue(),
			"KEY" : lineItem,
			"NAME" : this.byId('keyTextFieldId').getValue(),
			"DATE_OF_CHANGE" : this.byId('dateFieldID').getValue(),
			"UNIT_OF_MEASURE" : this.byId("inputUOM").getValue(),
			"AGGREGATION" : this.byId("inputAGGREGATION").getValue(),
			"CHANGED_BY" : username,
			"MO_LOGIC" : this.byId('moLogicFieldId').getValue(),
			"MEASUREMENT_FREQUENCY" : this.byId('inputFrequency').getValue(),
			"MEASUREMENT_METHOD" : this.byId('inputStatus').getValue()

		};

		if ((!this.byId('technicalNameFieldId').getValue()) || (!this.byId('keyTextFieldId').getValue())) {
			if (!this.byId('technicalNameFieldId').getValue())
				this.byId('technicalNameFieldId').setValueState("Error");
			if (!this.byId('keyTextFieldId').getValue())
				this.byId('keyTextFieldId').setValueState("Error");
			var msg = 'Please fill the mandatory fields!';
			sap.m.MessageToast.show(msg);
		} else {
			moService.updateModel({
				updatedData : moOb,
				oldData : this.oldData,
				successFunc : function(moData) {

					keyPackage = varPath;
					var moViewService = com.tutorial.service.measureobject.MeasurementObjectVIEWFactory.getInstance();

					var filters = {
						KEY : lineItem
					};

					moViewService.loadModel({
						endpointParam : filters,
						successFunc : function(moData, response) {
							var oModelMo = new sap.ui.model.json.JSONModel();
							oModelMo.setData(moData.results[0]);
							that.getView().setModel(oModelMo);
							oModelMo.updateBindings(true);
							var msg = 'Measurement Object successfully updated';
							sap.m.MessageToast.show(msg);

							var router = sap.ui.core.UIComponent.getRouterFor(that);
							router.navTo("DetailMO", {
								contextPath : varPath,
								lineItemId : lineItem
							});
						},
						errorFunc : function() {
						}
					});
				},
				errorFunc : function() {
					var msg = 'Measurement Object unsuccessfully updated';
					sap.m.MessageToast.show(msg);
				},
				moKey : moKey
			});

		}
	},



});