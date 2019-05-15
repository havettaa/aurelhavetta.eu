jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");

jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectVIEWFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectPMOFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectFactory' + m_urlVersion);
jQuery.sap.require("com.tutorial.util.Formatter" + m_urlVersion);

var varPath;
var lineItem;
var mo_technical_name;
var assignments;
var innovations;
var mo_type ;

sap.ui.controller("ui5_routing.DetailMO", {
	
	onInit : function()
	{
		this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		this._oRouter.attachRoutePatternMatched(this._handleRouteMatched, this);


	},

	//the method handleNavBack is triggered when the back button is pressed
	handleNavBack : function(oEvent) {
		var oHistory = sap.ui.core.routing.History.getInstance();
		var sPreviousHash = oHistory.getPreviousHash();
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		if (sPreviousHash == undefined) {

			oRouter.navTo("main");
		} else {
			window.history.go(-1);
			return false;
		}
	},

	takeJsonp : function(data) {
		var results = data.data[0].results;
		
		if (results.length > 0) {
			response = results;

			var oUsage = new sap.ui.model.json.JSONModel(results);
			sap.ui.getCore().byId("R1vizFrame").setModel(oUsage);
			if (results.length === 0) {
				sap.ui.getCore().byId("R1vizFrame").setVisible(false);
				sap.ui.getCore().byId("textUsage").setVisible(true);
				that.getView().byId("deleteBtnDetailMO").setEnabled(true);
				that.getView().byId("deleteBtnDetailMO").destroyTooltip();
			} else {
				sap.ui.getCore().byId("R1vizFrame").setVisible(true);
				sap.ui.getCore().byId("textUsage").setVisible(false);
				that.getView().byId("deleteBtnDetailMO").setEnabled(false);
				that.getView().byId("deleteBtnDetailMO").setTooltip("MO has usage data. Cannot be deleted");
			}

		} else {
			response = null;
		}
	},
	
	//the method _handleRouteMatched is triggered after navigation to this page (this is necessary for routing)
	//_handleRouteMatched is a hook method for the router and will be called automatically by the framework, after the view is rendered
	// in this method are binded the necessary models on the DetailMO view
	_handleRouteMatched : function(oEvent) {
		
		var oParam = oEvent.getParameter("name");
		if (oParam !== "DetailMO") {
			return;
		}
		var that = this;
		varPath = oEvent.getParameter("arguments").contextPath;
		lineItem = oEvent.getParameter("arguments").lineItemId;

		var moViewService = com.tutorial.service.measureobject.MeasurementObjectVIEWFactory.getInstance();
		//sap.ui.getCore().byId("R1vizFrame").setBusy(true);
		sap.ui.getCore().byId("textUsage").setVisible(false);
		var results = [];
		var oUsage = new sap.ui.model.json.JSONModel(results);
		
		sap.ui.getCore().byId("R1vizFrame").setModel(oUsage);
		sap.ui.getCore().byId("R1vizFrame").setVisible(true);
		var filters = {
			KEY : lineItem
		};

		
		var oUsage = new sap.ui.model.json.JSONModel([
			{CALMONTH: 1, USAGE: 1},
			{CALMONTH: 2, USAGE: -1},
			{CALMONTH: 3, USAGE: 2},
			{CALMONTH: 4, USAGE: 1},
			{CALMONTH: 5, USAGE: 3},
			{CALMONTH: 6, USAGE: 0},
			{CALMONTH: 7, USAGE: -1},
			{CALMONTH: 8, USAGE: 0},
			{CALMONTH: 9, USAGE: 1},
			{CALMONTH: 10, USAGE: 3}
		]);
		sap.ui.getCore().byId("R1vizFrame").setModel(oUsage);
		sap.ui.getCore().byId("R1vizFrame").setVisible(true);
		sap.ui.getCore().byId("textUsage").setVisible(false);
		that.getView().byId("deleteBtnDetailMO").setEnabled(false);
		that.getView().byId("deleteBtnDetailMO").setTooltip("MO has usage data. Cannot be deleted");



		sap.ui.getCore().byId("PanelIdNav").removeAllContentMiddle();
		moViewService.loadModel({
			endpointParam : filters,
			successFunc : function(moData, response) {
				if(moData.results.length == 0)
				{							
				that._oRouter.navTo("notFound");
				return
				}
				var oModelMo = new sap.ui.model.json.JSONModel();
				oModelMo.setData(moData.results[0]);
				mo_type = moData.results[0].MO_TYPE ;

				that.getView().setModel(oModelMo);
				mo_technical_name = moData.results[0].TECHNICAL_NAME;

				// this is for chart from app controller:
				var productId = varPath;
				var key = mo_technical_name;
				var config = {
					json : true,
					skipMetadataAnnotationParsing : false
				};
				
				var response;
				var _servicePath = "https://jsonplaceholder.typicode.com/";
				var viewPath = "/users";
				$.ajax({
					async : true,
					url : _servicePath + viewPath,
					type : 'GET',
					 crossDomain: true,
					dataType : 'json',
					success : function(data) {
						sap.ui.getCore().byId("R1vizFrame").setBusy(false);
						var results = data.d.results;
						
						if (results.length >= 0) {
							//var results = data.d.results;
							response = results;

							var oUsage = new sap.ui.model.json.JSONModel(results);
							sap.ui.getCore().byId("R1vizFrame").setModel(oUsage);
							if (results.length === 0) {
								sap.ui.getCore().byId("R1vizFrame").setVisible(false);
								sap.ui.getCore().byId("textUsage").setVisible(true);
								that.getView().byId("deleteBtnDetailMO").setEnabled(true);
								that.getView().byId("deleteBtnDetailMO").destroyTooltip();
							} else {
								sap.ui.getCore().byId("R1vizFrame").setVisible(true);
								sap.ui.getCore().byId("textUsage").setVisible(false);
								that.getView().byId("deleteBtnDetailMO").setEnabled(false);
								that.getView().byId("deleteBtnDetailMO").setTooltip("MO has usage data. Cannot be deleted");
							}

						} else {
							
							response = null;
						}
					}
					
				})
			},
			errorFunc : function() {
			}
		});
		var oDataMOdel = new sap.ui.model.odata.ODataModel(m_xsodata);
		oDataMOdel.read("/CV_WHEREUSED_MOParameters(P_KEY_MO=\'" + lineItem + "\')/Results", null, null, true, fSuccessAss, fErrorAss);
		function fSuccessAss(oEvent) {
			assignments = oEvent.results;
			var listAssignments = oEvent.results;
			listAssignments.push({
				KEY : 'addAss',
				NAME : 'Add Assignment',
				PARENT_TYPE : 'add'
			});
			var oAssignments = new sap.ui.model.json.JSONModel(listAssignments);
			that.getView().setModel(oAssignments, 'assignments');
		}
		;
		function fErrorAss(oEvent) {
			console.log("An error occured while reading MO Assignments Data!")
		}
		;

		var url = "/usag/morepository/MOREPOSITORY/WebContent/getChildHierarchy.xsjs?keyMO=" + lineItem;
		var that = this;
		jQuery.ajax({
			url : url,
			method : 'GET',
			dataType : 'json',
			success : function(oEvent) {
				assignments = oEvent.results;
				var listAssignments = oEvent.results;
				listAssignments.push({
					KEY : 'addAss',
					NAME : 'Add Assignment',
					PARENT_TYPE : 'add'
				});
				var oAssignments = new sap.ui.model.json.JSONModel(listAssignments);
				// that.getView().setModel(oAssignments,'assignments');

			},
			error : function(XHR, Status, Error) {

				var error = Error;
				console.log(XHR.responseText);
			}
		});
		if (varPath != undefined) {

			var oDataMOdel = new sap.ui.model.odata.ODataModel(m_xsodata);
			oDataMOdel.read("/CV_NODE_PARENTSParameters(P_NODEID=\'" + varPath + "\')/Results/?$orderby=LEVEL", null, null, true, fSuccess, fError);
			function fSuccess(oEvent) {

				var parents = [];
				parents = oEvent.results;
				sap.ui.getCore().byId("PanelIdNav").removeAllContentMiddle();
				for ( var i in parents) {
					if (i != 0) {
						var breadcrumb = sap.ui.getCore().byId("PanelIdNav").addContentMiddle(new sap.m.Text({
							text : ">"

						}).addStyleClass("textForArrow"))
					}

					var oLink = new sap.m.Button({
						press : function(evt) {
							that._oRouter.navTo("Detail", {
								contextPath : this.nodeid,
								packageName : this.getText()
							});

						},
						text : parents[i].NAME

					});
					oLink.nodeid = parents[i].RESULT_NODE;
					if (i == parents.length - 1) {
					}
					var breadcrumb = sap.ui.getCore().byId("PanelIdNav").addContentMiddle(oLink);
				}
				var breadcrumb = sap.ui.getCore().byId("PanelIdNav").addContentMiddle(new sap.m.Text({
					text : ">"

				}).addStyleClass("textForArrow"))
				var oLink = new sap.m.Button({});
				oLink.addStyleClass("lastBreadcrumb");
				oLink.setText(that.getView().getContent()[0].getTitle() + ': MO Details');

				var breadcrumb = sap.ui.getCore().byId("PanelIdNav").addContentMiddle(oLink);
			}
			;
			function fError(oEvent) {
				console.log("An error occured while reading Parents Data!")
			}
			;
			var that = this;

		}

	},
	//the method editMo is triggered when the edit button is pressed. The functionality of this method is: depending from where the DetailMO page is opened (ListMO page or Detail page)
	//if it's opened from ListMO page, one parameter is required (lineItemId)
	//if it's opened from DetailMO page, two parameters are required (contextPath and lineItemId)
	editMo : function(evt) {
		if (varPath != undefined)
			this._oRouter.navTo("EditMo2", {
				contextPath : varPath,
				lineItemId : lineItem,

			});
		else
			this._oRouter.navTo("EditMo2", {
				lineItemId : lineItem,

			});

	},
	//the method deleteMO is triggered when the delete button is pressed
    //the Measurement object is deleted from the measurement objects table(Z_USAG_MO) and from the link table between MOs and packages(Z_USAG_PACKAGEMO)
	deleteMO : function(oEvent) {
		
		if (mo_type !='NEMO') return sap.m.MessageToast.show('You are only allowed to delete "NEMO" MO types.')

		var moServicePMO = com.tutorial.service.measureobject.MeasurementObjectPMOFactory.getInstance();

		var moService = com.tutorial.service.measureobject.MeasurementObjectFactory.getInstance();

		var good = false;
		var modelDataPMO = {
			keyPackage : varPath,
			keyMo : lineItem,
			successFunc : function(oData, response) {
				good = true;
				if (good) {
					var msg = 'Measurement Object successfully deleted';
					sap.m.MessageToast.show(msg);
				}

			},
			errorFunc : function() {
				var msg = 'Measurement Object successfully deleted';
				sap.m.MessageToast.show(msg, {
					closeOnBrowserNavigation : false
				});
			}
		};

		var modelData = {
			moKey : lineItem,
			successFunc : function(oData, response) {
				
			},
			errorFunc : function() {
			
			}
		};
		var router = sap.ui.core.UIComponent.getRouterFor(this);

		sap.m.MessageBox.confirm("Are you sure you want to delete this record? This MO will be deleted even if it is assigned!", {
			onClose : function(sResult) {
				if (sResult == sap.m.MessageBox.Action.OK) {
					moServicePMO.removeModel(modelDataPMO);
					moService.removeModel(modelData);
					if (varPath)
						router.navTo("Detail", {
							contextPath : varPath
						});
					else
						router.navTo("Main");

				}

			}
		});

	},

	getMyModel : function(a1, a2, a3) {

		var config = {
			json : true,
			skipMetadataAnnotationParsing : false
		};

		var oDataMOdel = new sap.ui.model.odata.ODataModel(m_xsodata, config);

		return oDataMOdel;

	},
	onAfterRendering : function() {
		console.log("onafter");

	},
// The method is used to create the chart for the usage
	createMyChart : function(id, title, model) {

		var oChart = new sap.makit.Chart(id, {
			width : "100%",
			height : "79%",
			type : sap.makit.ChartType.Line,
			showRangeSelector : false,
			showTotalValue : true,
			valueAxis : new sap.makit.ValueAxis({}),
			categoryAxis : new sap.makit.CategoryAxis({}),
			category : new sap.makit.Category({
				column : "CALMONTH"
			}),
			values : [ new sap.makit.Value({
				expression : "USAGE"
			}) ]
		});
		oChart.addColumn(new sap.makit.Column({
			name : "CALMONTH",
			value : "{CALMONTH}"
		}));
		oChart.addColumn(new sap.makit.Column({
			name : "USAGE",
			value : "{USAGE}"
		}));
		if (model) 
		{
			oChart.bindRows("/");
			return oChart;
		} else {
			var msg = 'No usage data available';
			sap.m.MessageToast.show(msg);
		}

	},
	openDialog : function() {

		sap.ui.getCore().byId("diaChart").open();

	},
	//the method is necessary inside the 'Add assignment' dialog. 
	fillInnovations : function(oEvent) {
		innovations = [];
		for (var i = 0; i < oEvent.results.length; i++) {
			if (oEvent.results[i].LEVEL == 0)
				innovations.push(oEvent.results[i]);

		}
	},
	//the method is necessary inside the 'Add assignment' dialog. 
	createHierarchy : function(oEvent) {
		var flat = [];
		for (var i = 0; i < oEvent.results.length; i++) {
			var key = oEvent.results[i].RESULT_NODE;
			flat[key] = oEvent.results[i];

			flat[key].visible = "Navigation";

		}
		for ( var i in flat) {
			flat[i].children = []; // add children container
		}

		// populate the child container arrays
		for ( var i in flat) {
			var parentkey = flat[i].PARENTS;
			if (flat[parentkey]) {
				flat[parentkey].children.push(flat[i]);
			}
		}
		var root = [];
		for ( var i in flat) {
			var parentkey = flat[i].PARENTS;
			if (flat[i].LEVEL === '1') {
				flat[i].PARENTS = root.push(flat[i]);
			}
		}

		var packModel = new sap.ui.model.json.JSONModel(root);
		return packModel;
	},
	
	initializeBreadcrumbs : function() {
		var that = this;
		var oLinkProd = new sap.m.Button({
			type : sap.m.ButtonType.Transparent,
			color : '#666666',
			layoutData : new sap.m.ToolbarLayoutData({
				shrinkable : true
			}),
			press : function(evt) {
				that.pressItemFromBreadcrumb(oLinkProd);

			}
		}).addStyleClass('lastBreadcrumb');
		oLinkProd.sPath = "packages>/";
		oLinkProd.setText("Add Product assignment");
		sap.ui.getCore().byId("panelBCIDProdMO").removeAllContent();
		sap.ui.getCore().byId("panelBCIDProdMO").addContent(oLinkProd);
		var oLinkSol = new sap.m.Button({
			type : sap.m.ButtonType.Transparent,
			color : '#666666',
			layoutData : new sap.m.ToolbarLayoutData({
				shrinkable : true
			}),
			press : function(evt) {
				that.pressItemFromBreadcrumb(oLinkSol);

			}
		}).addStyleClass('lastBreadcrumb');
		{
			oLinkSol.sPath = "packages>/";
			oLinkSol.setText("Add Solution assignment");
			sap.ui.getCore().byId("panelBCIDSolMO").removeAllContent();
			sap.ui.getCore().byId("panelBCIDSolMO").addContent(oLinkSol);
		}
		var oLinkGlob = new sap.m.Button({
			type : sap.m.ButtonType.Transparent,
			color : '#666666',
			layoutData : new sap.m.ToolbarLayoutData({
				shrinkable : true
			}),
			press : function(evt) {
				that.pressItemFromBreadcrumb(oLinkGlob);

			}
		}).addStyleClass('lastBreadcrumb');
		{
			oLinkGlob.sPath = "packages>/";
			oLinkGlob.setText("Add Globalization assignment");
			sap.ui.getCore().byId("panelBCIDGlobMO").removeAllContent();
			sap.ui.getCore().byId("panelBCIDGlobMO").addContent(oLinkGlob);
		}
		var oLinkInno = new sap.m.Button({
			type : sap.m.ButtonType.Transparent,
			color : '#666666',
			layoutData : new sap.m.ToolbarLayoutData({
				shrinkable : true
			}),
			press : function(evt) {
				that.pressItemFromBreadcrumb(oLinkInno);

			}
		}).addStyleClass('lastBreadcrumb');
		{
			oLinkInno.sPath = "packages>/";
			oLinkInno.setText("Add Innovation assignment");
			sap.ui.getCore().byId("panelBCIDInnoMO").removeAllContent();
			sap.ui.getCore().byId("panelBCIDInnoMO").addContent(oLinkInno);
		}

		var oLinkCupd = new sap.m.Button({
			type : sap.m.ButtonType.Transparent,
			color : '#666666',
			layoutData : new sap.m.ToolbarLayoutData({
				shrinkable : true
			}),
			press : function(evt) {
				that.pressItemFromBreadcrumb(oLinkCupd);

			}
		}).addStyleClass('lastBreadcrumb');
		oLinkCupd.sPath = "packages>/";
		oLinkCupd.setText("Add CUP Defined assignment");
		sap.ui.getCore().byId("panelBCIDCupdMO").removeAllContent();
		sap.ui.getCore().byId("panelBCIDCupdMO").addContent(oLinkCupd);
	},
	//the method is called when the plus button from where-used section is pressed, when the user wants to assign the MO. 
	//From this method are called the others necessary methods: initializeBreadcrumbs, createHierarchy, fillInnovations
	addAssignment : function() {
		sKey = sap.ui.getCore().byId("iconTabHierMO").getSelectedKey();
		var that = this;
		var listTemplate = new sap.m.ObjectListItem({
			type : "{packages>visible}",
			title : "{packages>NAME}",
			number : "{packages>TECHNICAL_NAME}",
			intro : "{packages>RESULT_NODE}",
			numberUnit : "{packages>current}"
		});
		this.initializeBreadcrumbs();

		sap.ui.getCore().byId("searchProdMO").setValue(null);
		sap.ui.getCore().byId("searchSolMO").setValue(null);
		sap.ui.getCore().byId("searchInnoMO").setValue(null);
		sap.ui.getCore().byId("searchGlobMO").setValue(null);
		sap.ui.getCore().byId("searchCupdMO").setValue(null);

		var packModelProd = [];
		var listPackProd = []
		var typeList = [];
		typeList['product'] = 'listPackProdMO';
		typeList['solution'] = 'listPackSolMO';
		typeList['globalization'] = 'listPackGlobMO';
		typeList['innovation'] = 'listPackInnoMO';
		typeList['cup'] = 'listPackCupdMO';

		var oDataModel = new sap.ui.model.odata.ODataModel(m_xsodata);
		oDataModel.read("/CV_PROD_PACKParameters(P_NODEID=\'*')/Results/?$filter=TYPE eq '" + 'product' + "' & $orderby=LEVEL", null, null, true, fSuccess, fError);
		function fSuccess(oEvent) {
			sap.ui.core.BusyIndicator.hide();
			listPackProd['product'] = sap.ui.getCore().byId(typeList['product']);
			packModelProd['product'] = that.createHierarchy(oEvent);
			listPackProd['product'].setModel(packModelProd['product'], 'packages');
			listPackProd['product'].bindItems({
				path : 'packages>/',
				template : listTemplate
			});

		}
		;
		function fError(oEvent) {
			console.log("An error occured while reading Package Data!")
		}
		;
		var oDataModelSol = new sap.ui.model.odata.ODataModel(m_xsodata);
		oDataModelSol.read("/CV_PROD_PACKParameters(P_NODEID=\'*')/Results/?$filter=TYPE eq '" + 'solution' + "' & $orderby=LEVEL", null, null, true, fSuccessSol, fErrorSol);
		function fSuccessSol(oEvent) {
			listPackProd['solution'] = sap.ui.getCore().byId(typeList['solution']);
			packModelProd['solution'] = that.createHierarchy(oEvent);
			listPackProd['solution'].setModel(packModelProd['solution'], 'packages');
			listPackProd['solution'].bindItems({
				path : 'packages>/',
				template : listTemplate
			});

		}
		;
		function fErrorSol(oEvent) {
			console.log("An error occured while reading Package Data!")
		}
		;
		var oDataModelGlob = new sap.ui.model.odata.ODataModel(m_xsodata);
		oDataModelGlob.read("/CV_PROD_PACKParameters(P_NODEID=\'*')/Results/?$filter=TYPE eq '" + 'globalization' + "' & $orderby=LEVEL", null, null, true, fSuccessGlob, fErrorGlob);
		function fSuccessGlob(oEvent) {
			listPackProd['globalization'] = sap.ui.getCore().byId(typeList['globalization']);
			packModelProd['globalization'] = that.createHierarchy(oEvent);
			listPackProd['globalization'].setModel(packModelProd['globalization'], 'packages');
			listPackProd['globalization'].bindItems({
				path : 'packages>/',
				template : listTemplate
			});

		}
		;
		function fErrorGlob(oEvent) {
			console.log("An error occured while reading Package Data!")
		}
		;
		var oDataModelInno = new sap.ui.model.odata.ODataModel(m_xsodata);
		oDataModelInno.read("/CV_PROD_PACKParameters(P_NODEID=\'*')/Results/?$filter=TYPE eq '" + 'innovation' + "' & $orderby=LEVEL", null, null, true, fSuccessInno, fErrorInno);
		function fSuccessInno(oEvent) {
			listPackProd['innovation'] = sap.ui.getCore().byId(typeList['innovation']);
			packModelProd['innovation'] = that.createHierarchy(oEvent);
			that.fillInnovations(oEvent);
			listPackProd['innovation'].setModel(packModelProd['innovation'], 'packages');
			listPackProd['innovation'].bindItems({
				path : 'packages>/',
				template : listTemplate
			});

		}
		;
		function fErrorInno(oEvent) {
			console.log("An error occured while reading Package Data!")
		}
		;

		var oDataModelCupd = new sap.ui.model.odata.ODataModel(m_xsodata);
		oDataModelCupd.read("/CV_PROD_PACKParameters(P_NODEID=\'*')/Results/?$filter=TYPE eq '" + 'cup' + "' & $orderby=LEVEL", null, null, true, fSuccessCupd, fErrorCupd);
		function fSuccessCupd(oEvent) {
			listPackProd['cup'] = sap.ui.getCore().byId(typeList['cup']);
			packModelProd['cup'] = that.createHierarchy(oEvent);
			listPackProd['cup'].setModel(packModelProd['cup'], 'packages');
			listPackProd['cup'].bindItems({
				path : 'packages>/',
				template : listTemplate,
			});

		}
		;
		function fErrorCupd(oEvent) {
			console.log("An error occured while reading Package Data!")
		}
		;

	},
	//the method is necessary inside the 'Add assignment' dialog. When an item from the product's list or innovation's list or globalization's list or cup defined's list is selected
	handleListSelect : function(evt) {
		var sPath = 'packages>' + evt.getParameter("listItem").getBindingContextPath() + "/children/";
		var listPack = sap.ui.getCore().byId(evt.getSource().getId());
		var that = this;
		listPack.bindItems(sPath, new sap.m.ObjectListItem({
			type : "{packages>visible}",
			title : "{packages>NAME}",
			intro : "{packages>RESULT_NODE}",
			number : "{packages>TECHNICAL_NAME}",
			numberUnit : "{packages>current}"

		}));
		var that = this;
		var panelBreadcrumbs;
		var sKey = sap.ui.getCore().byId("iconTabHierMO").getSelectedKey();
		if (sKey === 'Product')
			panelBreadcrumbs = 'panelBCIDProdMO';
		if (sKey === 'Solution')
			panelBreadcrumbs = 'panelBCIDSolMO';
		if (sKey === 'Globalization')
			panelBreadcrumbs = 'panelBCIDGlobMO';
		if (sKey === 'Innovation')
			panelBreadcrumbs = 'panelBCIDInnoMO';
		if (sKey === 'cup')
			panelBreadcrumbs = 'panelBCIDCupdMO';
		var breadcrumb = sap.ui.getCore().byId(panelBreadcrumbs).addContent(new sap.m.Text({
			text : ">"
		}).addStyleClass("textForArrow"));
		var contentToolBar = sap.ui.getCore().byId(panelBreadcrumbs).getContent();
		for (i in contentToolBar) {
			contentToolBar[i].removeStyleClass('lastBreadcrumb');
		}

		var oLink = new sap.m.Button({
			type : sap.m.ButtonType.Transparent,
			color : '#666666',
			layoutData : new sap.m.ToolbarLayoutData({
				shrinkable : true
			}),
			press : function(evt) {
				that.pressItemFromBreadcrumb(oLink);
			},
			text : evt.getParameter("listItem").getProperty("title"),
		}).addStyleClass('lastBreadcrumb');
		oLink.sPath = sPath;
		oLink.id = evt.getParameter("listItem").getProperty("intro");
		var breadcrumb = sap.ui.getCore().byId(panelBreadcrumbs).addContent(oLink);
		var breadcrumbs = sap.ui.getCore().byId(panelBreadcrumbs).getContent();

	},
	//the method is necessary inside the 'Add assignment' dialog. When an item is selected from the breadcrumbs inside the icontabbar.
	pressItemFromBreadcrumb : function(oLink) {
		var that = this;
		var index = null;
		var sKey = sap.ui.getCore().byId("iconTabHierMO").getSelectedKey();
		if (sKey === 'Product') {
			panelBreadcrumbs = 'panelBCIDProdMO';
			listId = 'listPackProdMO';
		}

		if (sKey === 'Solution') {
			panelBreadcrumbs = 'panelBCIDSolMO';
			listId = 'listPackSolMO';
		}

		if (sKey === 'Globalization') {
			panelBreadcrumbs = 'panelBCIDGlobMO';
			listId = 'listPackGlobMO';
		}
		if (sKey === 'Innovation') {
			panelBreadcrumbs = 'panelBCIDInnoMO';
			listId = 'listPackInnoMO';
		}
		if (sKey === 'cup') {
			panelBreadcrumbs = 'panelBCIDCupdMO';
			listId = 'listPackCupdMO';
		}
		$.each(sap.ui.getCore().byId(panelBreadcrumbs).getContent(), function(ind, value) {
			if (value.sPath == oLink.sPath) {
				index = ind;
			}
		});
		var contentToolBar = sap.ui.getCore().byId(panelBreadcrumbs).getContent();
		sap.ui.getCore().byId(panelBreadcrumbs).removeAllContent();
		var i = 0;
		contentToolBar[index].addStyleClass('lastBreadcrumb');
		while (i <= index) {
			sap.ui.getCore().byId(panelBreadcrumbs).addContent(contentToolBar[i]);
			i++;
		}
		var listPack = sap.ui.getCore().byId(listId);
		listPack.bindItems({
			path : oLink.sPath,
			template : new sap.m.ObjectListItem({
				type : "{packages>visible}",
				title : "{packages>NAME}",
				intro : "{packages>RESULT_NODE}",
				number : "{packages>TECHNICAL_NAME}",
				numberUnit : "{packages>current}"
			})
		});

	},
	//the method is necessary inside the 'Add assignment' dialog. Called when add button is pressed
	saveAssignment : function() {
		var sKey = sap.ui.getCore().byId("iconTabHierMO").getSelectedKey();
		if (sKey === 'Product')
			panelBreadcrumbs = 'panelBCIDProdMO';
		if (sKey === 'Solution')
			panelBreadcrumbs = 'panelBCIDSolMO';
		if (sKey === 'Globalization')
			panelBreadcrumbs = 'panelBCIDGlobMO';
		if (sKey === 'Innovation')
			panelBreadcrumbs = 'panelBCIDInnoMO';
		if (sKey === 'cup')
			panelBreadcrumbs = 'panelBCIDCupdMO';
		
		var keyMeasurementObjects = decodeURIComponent(lineItem);
		var keyPackage = sap.ui.getCore().byId(panelBreadcrumbs).getContent()[sap.ui.getCore().byId(panelBreadcrumbs).getContent().length - 1].id;
		var moprodService = com.tutorial.service.measureobject.MeasurementObjectPMOFactory.getInstance();

	
		var moOb = {
			"KEY_MEASUREMENT_OBJECTS" : keyMeasurementObjects,
			"KEY_PACKAGE" : keyPackage
		};
		var that = this;
		var assignmentsVal = false;
		var innovationsVal = false;

		for (i in assignments) {
			if (keyPackage == assignments[i].KEY)
				assignmentsVal = true;
		}
		for (i in innovations) {
			if (keyPackage == innovations[i].RESULT_NODE)
				innovationsVal = true;
		}
		if (assignmentsVal || innovationsVal) {
			if (assignmentsVal == true) {
				sap.m.MessageBox.alert('Measurement object already assigned to this package');

			}
			if (innovationsVal == true) {
				sap.m.MessageBox.alert('Measurement object cannot be assigned directly to innovations');

			}
		} else {
			var url = "/usag/morepository/MOREPOSITORY/WebContent/getAuthorizationData.xsjs?packID=" + moOb.KEY_PACKAGE;
			jQuery.ajax({
				url : url,
				method : 'GET',
				dataType : 'json',
				success : function(auth) {
					authorizationPack = auth;
					if (authorizationPack.EDIT == 'Y') {
						moprodService.createModel({
							moData : moOb,
							successFunc : function(notesData) {

								var msg = 'Measurement object successfully assigned';
								sap.m.MessageToast.show(msg);
								var router = sap.ui.core.UIComponent.getRouterFor(that);
								var config = {
									viewType : "JS",
									viewPath : "ui5_routing",
									targetControl : "splitApp",
									targetAggregation : "pages",
									clearTarget : false
								}
								router.fireRoutePatternMatched({
									name : "DetailMO",
									config : config,
									arguments : {
										contextPath : varPath,
										lineItemId : lineItem
									}
								});

							},
							errorFunc : function() {
								var msg = 'Measurement Object unsuccessfully assigned';
								sap.m.MessageToast.show(msg);
							},

						});
					} else {
						var msg = 'You do not have edit rights on the selected package';
						sap.m.MessageToast.show(msg);
					}
				},
				error : function(XHR, Status, Error) {

					var error = Error;
					console.log(XHR.responseText);
					authorizationPack = {};
				}
			});

		}

	},
	//the method is necessary inside the 'Add assignment' dialog. Called when a product/globalization/innovation/cup defined/package is searched
	handleSearchEditPack : function(evt) {
		var sKey = sap.ui.getCore().byId("iconTabHierMO").getSelectedKey();
		var listId = new String();
		if (sKey === 'Product')
			listId = 'listPackProdMO';
		if (sKey === 'Solution')
			listId = 'listPackSolMO';
		if (sKey === 'Globalization')
			listId = 'listPackGlobMO';
		if (sKey === 'Innovation')
			listId = 'listPackInnoMO';
		if (sKey === 'cup')
			listId = 'listPackCupdMO';
		var filters = [];
		var query = evt.getParameter("newValue");
		if (query && query.length > 0) {
			if (query && query.length > 0) {
				var filter = new sap.ui.model.Filter("NAME", sap.ui.model.FilterOperator.Contains, query);
				filters.push(filter);
			}
			var list = sap.ui.getCore().byId(listId);
			var binding = list.getBinding("items");
			var filarr = new sap.ui.model.Filter(filters);
			binding.filter(filarr);
		}
	}
});