jQuery.sap.declare("com.tutorial.Component");

jQuery.sap.require("com.tutorial.MyRouter" + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectPackageFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectNumberMOFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectSolutionFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectFeatureFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MOFeaturesInnovationFactory' + m_urlVersion);

document.title = "MOR " + m_curVersion;

var xxGlobal = 'abs';
sap.ui.core.UIComponent.extend("com.tutorial.Component", {
	metadata : {
		routing : {
			config : {
				viewType : "JS",
				viewPath : "ui5_routing",
				targetControl : "splitApp",
				targetAggregation : "pages",
				clearTarget : false,
				bypassed: {
		               target: "notFound"
		            }
			},

			routes : [ {
				pattern : ":?query:",
				name : "main",
				view : "Master",
			// targetAggregation : "masterPages",
			}, {
				pattern : "ListMO",
				name : "ListMO",
				view : "ListMO",
			//targetAggregation : "detailPages",
			//   targetControl : "splitApp",
			}, {
				pattern : "AddMoForAdministrate",
				name : "AddMoForAdministrate",
				view : "AddMoForAdministrate",
			}, {
				pattern : "Detail" + "" + "/{contextPath}",
				name : "Detail",
				view : "Detail",
			//targetAggregation : "detailPages",
			//   targetControl : "splitApp",
			}, {
				pattern : "DetailMO/:contextPath:/{lineItemId}",
				name : "DetailMO",
				view : "DetailMO",
			//targetAggregation : "detailPages",
			//   targetControl : "splitApp",
			},

			{
				pattern : "AddMo2/:contextPath:",
				name : "AddMo2",
				view : "AddMo2"

			}, {
				pattern : "AddPackage/{contextPath}",
				name : "AddPackage",
				view : "AddPackage"

			}, {
				pattern : "EditMo2/:contextPath:/{lineItemId}",
				name : "EditMo2",
				view : "EditMo2"

			},

			{
				pattern : "EditPackage/{contextPath}",
				name : "EditPackage",
				view : "EditPackage"

			}, 
			{
			pattern : "notFound" ,
			name : "notFound",
			view : "notFound"
	            },
			{
				pattern : "AddGlobalization",
				name : "AddGlobalization",
				view : "AddGlobalization",
			//targetAggregation : "detailPages",
			//   targetControl : "splitApp",
			}, {
				pattern : "AddCUP",
				name : "AddCUP",
				view : "AddCUP",
			//targetAggregation : "detailPages",
			//   targetControl : "splitApp",
			}, ],
			targets : {
				notFound : {
					viewName : "notFound",
					transition: "show",
					controlId:'splitApp',
					controlAggregation : "pages"
							}}
			
		
			
		}
	}

});

com.tutorial.Component.prototype.init = function() {
	console.log("Hi inside the init methos of the component")
	jQuery.sap.require("sap.ui.core.routing.History");
	jQuery.sap.require("sap.m.routing.RouteMatchedHandler");

	// call the init function of the parent
	sap.ui.core.UIComponent.prototype.init.apply(this);
	var router = this.getRouter();
	console.log(router);

	// create the views based on the url/hash
	this.routeHandler = new sap.m.routing.RouteMatchedHandler(router);
	console.log("before Initialize" + this.routeHandler);
	console.log(this.routeHandler);
	router.initialize();

};

com.tutorial.Component.prototype.destroy = function() {
	if (this.routeHandler) {
		this.routeHandler.destroy();
	}

	sap.ui.core.UIComponent.destroy.apply(this, arguments);
};

com.tutorial.Component.prototype.createContent = function() {
	var Oview = sap.ui.view({
		height : '100%',
		id : "app",
		viewName : "ui5_routing.App",
		type : sap.ui.core.mvc.ViewType.JS
	});
	// set i18n model
	var i18nModel = new sap.ui.model.resource.ResourceModel({
		bundleUrl : "i18n/i18n.hdbtextbundle"
	});
	Oview.setModel(i18nModel, "i18n");

	// set device model
	var deviceModel = new sap.ui.model.json.JSONModel({
		isPhone : jQuery.device.is.phone,
		listMode : (jQuery.device.is.phone) ? "None" : "SingleSelectMaster",
		listItemType : (jQuery.device.is.phone) ? "Active" : "Inactive"
	});
	deviceModel.setDefaultBindingMode("OneWay");
	Oview.setModel(deviceModel, "device");

	var packageService = com.tutorial.service.measureobject.MeasurementObjectPackageFactory.getInstance();
	var noMOService = com.tutorial.service.measureobject.MeasurementObjectNumberMOFactory.getInstance();

	// varianta 1	
	packageService.loadModel({
		successFunc : function(moData, response) {
			var oModelMo = new sap.ui.model.json.JSONModel();
			oModelMo.setData(moData);
			noMOService.loadModel({

				successFunc : function(moData, response) {
					Oview.setModel(oModelMo);

				},
				errorFunc : function() {
					console.log('error');
				}
			});

		},
		errorFunc : function() {
			/*sap.m.MessageBox.show("You currently don't have the rights to access the package.Would you like to see the instructions on how to request access ?", {
				icon : sap.m.MessageBox.Icon.WARNING,
				title : "Access denied",
				actions : [ sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO ],
				onClose : function(oAction) {
					if (oAction === sap.m.MessageBox.Action.YES) {
						window.open('https://jam4.sapjam.com/groups/6bAAfK3BQcz7xd6ahusStU/documents/WPbpHSRssjzZwaDpzQPyhp/slide_viewer?_lightbox=true');
					}
				}
			});*/
			console.log("You currently don't have the rights to access the package.Would you like to see the instructions on how to request access ?")
		}
	});

	/*		var solutionService = com.tutorial.service.measureobject.MeasurementObjectSolutionFactory.getInstance();
	//	var featureService = com.tutorial.service.measureobject.MeasurementObjectFeatureFactory.getInstance();
		var featureInnovationService = com.tutorial.service.measureobject.MOFeaturesInnovationFactory.getInstance();
		
		
		solutionService.loadModel({
			successFunc : function(moData, response) {
				var oModelMoSolution = new sap.ui.model.json.JSONModel();
				oModelMoSolution.setData({
						solutionData: moData.results
					});
					Oview.setModel(oModelMoSolution,"solutionModel");
			},
			errorFunc : function() {
				
			}
		});
		
		featureInnovationService.loadModel({
			successFunc : function(moData, response) {
				var oModelMoFeature = new sap.ui.model.json.JSONModel();
				oModelMoFeature.setData({
						featureData: moData.results
					});
					Oview.setModel(oModelMoFeature,"featureModel");	
			},
			errorFunc : function() {
				
			}
		});*/

	return Oview;
};