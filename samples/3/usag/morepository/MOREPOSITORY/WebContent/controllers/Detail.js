jQuery.sap.require("sap.m.MessageToast");
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.ui.core.util.Export");
jQuery.sap.require("sap.ui.core.util.ExportTypeCSV");
jQuery.sap.require("sap.m.Toolbar");
jQuery.sap.require("sap.m.OverflowToolbar");
jQuery.sap.require("sap.m.OverflowToolbarLayoutData");

jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectNumberMOFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectGetChildFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectAssignmentsPackageFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectPackageFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectPKPrimaryInfoFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectMoNotInPackageFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectPackageTableFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectAssignmentsPackageFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectVIEWFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectPKPrimaryInfoFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectPMOFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectLegFactory' + m_urlVersion);
jQuery.sap.require("com.tutorial.util.Formatter" + m_urlVersion);

var varPath;
var InnoOrNot ;
var productNameVar;
var productName;
var typePackT;
var typeVarPath;
var authorizationPack;


sap.ui.controller("ui5_routing.Detail",{

		 oldData : {},
		_formFragments: {},
		_serviceURL: '',
					
		onInit : function() 
		{
						
			var that = this;
			this._oRouter = sap.ui.core.UIComponent
					.getRouterFor(this);
			console.log("Hi in details --" + this._oRouter);
			var gridList = sap.ui.getCore().byId('gridPack');

			gridList.onAfterRendering = function() 
			{  
				if (sap.ui.layout.Grid.prototype.onAfterRendering) 
				{  
					sap.ui.layout.Grid.prototype.onAfterRendering.apply(this);  
				}     
					        
				$("li").draggable({ 
					start: function( event, ui)
					{
									
						ui.helper.width($('#'+this.id).parent().width());
						this.className = this.className + " dragListItem";
						if(sap.ui.getCore().byId('upOneLevelID') != undefined)
						{
							sap.ui.getCore().byId('upOneLevelID').removeStyleClass('hideUpOneLevel');
							sap.ui.getCore().byId('upOneLevelID').addStyleClass('showUpOneLevel');
						}
		 
					},
					stop: function( event, ui)
					{
						this.className = this.className.replace(" dragListItem", "");
						this.className = this.className.replace(" sapMLIBActive", "");
						if(sap.ui.getCore().byId('upOneLevelID') != undefined)
						{
							sap.ui.getCore().byId('upOneLevelID').removeStyleClass('showUpOneLevel');
							sap.ui.getCore().byId('upOneLevelID').addStyleClass('hideUpOneLevel');
						}
					},
					revert: "invalid",
					zIndex: 1000000,
					helper: "clone"  
				});  
					         
				$("li").droppable({
					hoverClass: 'dropListItem',
					drop: function( event, ui ) 
					{  							  
						var droppedPackage = ui.draggable.context.id;  
						var draggedElement = sap.ui.getCore().byId(droppedPackage); 

						var moveToPackage = event.target.id;
						var moveToElement = sap.ui.getCore().byId(moveToPackage); 
						that.movePackage(draggedElement.getContent()[3].getText(), moveToElement.getContent()[3].getText());
						gridList.removeContent(draggedElement);
						draggedElement.destroyContent();
						draggedElement.destroy();						       
					},
					over: function( event, ui ) 
					{  
					    console.log( ui.draggable.context.id) ;
					}
				});
					
				if(authorizationPack != undefined)
				{
					if(authorizationPack.EDIT == 'N' ||typeVarPath=="innovation" )
					{			        
					    $("li").draggable('disable');
					    $("li").className = 'disableMoveAuth';
					}
					else
					{
					    $("li").draggable('enable');
					}
				}
			} 
			
			this._oRouter.attachRoutePatternMatched(this._handleRouteMatched, this) ;
		},
					
		onAfterRendering : function()
		{
						 
		},
					
		//the method loadUsersWithShareRights is called when the link 'Check package editors' is pressed from DisplayPackage fragment
		loadUsersWithShareRights: function (oEvent)
		{
			var thepack = varPath ;								
			var oDataModel = new sap.ui.model.odata.ODataModel(m_xsodata);
			oDataModel.read("/U_P_RIGHTSParameters(P_NODEID='"+thepack+"')/Results",null, null, true, fSuccess, fError);
			function fSuccess(oEvent)
			{
				var oModelRS = new sap.ui.model.json.JSONModel(oEvent.results);
							
				oModelRS.setData(oEvent.results)
				sap.ui.getCore().byId('oListDialogShareID').setModel(oModelRS,'userswithrights');
				sap.ui.getCore().byId('listUsersShareRights').setModel(oModelRS,'userswithrights');
				sap.ui.getCore().byId('oListDialogShareID').open();
				
			}
			
			function fError (oEvent)
			{
				console.log("a intrat in ferror")
			}		
	
		},
					
		//the method _handleRouteMatched is triggered after navigation to this page (this is necessary for routing)
		//_handleRouteMatched is a hook method for the router and will be called automatically by the framework, after the view is rendered
		// in this method are binded the necessary models on the Detail view
		_handleRouteMatched : function(oEvent) 
		{						
			if ("Detail" !== oEvent.getParameter("name")) 
			{
				return;
			}
			var that = this;
			varPath = oEvent.getParameter("arguments").contextPath;
			var oView = that.getView();
			var oDataMOdel = new sap.ui.model.odata.ODataModel(m_xsodata);
			sap.ui.getCore().byId('oListDialogID').setModel(oDataMOdel,'select');
			
			// Load package detail model
			this.refreshModel(varPath);

			var packageLegService = com.tutorial.service.measureobject.MeasurementObjectLegFactory.getInstance();
			packageLegService.loadModel({
				endpointParam : varPath,
				successFunc : function(moData, response) 
				{
					var oTable = sap.ui.getCore().byId("tableMoForPackageId");
					var oModelMo = new sap.ui.model.json.JSONModel();
					oModelMo.setData({
						moPakage : moData.results,
					});
					oTable.setModel(oModelMo);
					var oModelNumber = new sap.ui.model.json.JSONModel();
					oModelNumber.setData({
						number : moData.results.length,
					});
					that.getView().setModel(oModelNumber,'moNumber');
					var oSorter = new sap.ui.model.Sorter({
						path: "DATE_OF_ASSIGNMENT", 
						descending: true, 
					});
					sap.ui.getCore().byId("tableMoForPackageId").getBinding("items").sort(oSorter);
				},
				errorFunc : function() 
				{
					console.log('error');
				}
			});
			
			// load child packages && parents for breadcrumbs
			// to be after the child loads, so the load is sequential
					
			oDataMOdel.read("/CRP_D_PROD_SUPPORT.xml?$filter=KEY eq '" + varPath + "'", null, null,true, fSuccessParent, fErrorParent);
											
			function fSuccessParent(oEvent) 
			{
				var prodCatParent = new sap.ui.model.json.JSONModel(
					oEvent.results[0]);
				oView.setModel(prodCatParent, 'productsParent');
						
			};
			
			function fErrorParent(oEvent) 
			{
				console.log("An error occured while reading Package Data!")
			};
					
			oDataMOdel.read("/CRP_D_PROD_SUPPORT.xml?$orderby=NAME&$filter=PARENTID eq '" + varPath + "'", null, null,true, fSuccessChild, fErrorChild);
			
			function fSuccessChild(oEvent) 
			{
				var children = new sap.ui.model.json.JSONModel();
				children.setData({
					childData: oEvent.results
				});
				oView.setModel(children, 'childModel');
			};
			
			function fErrorChild(oEvent) 
			{
				console.log("An error occured while reading Package Data!")
			};
					
		},
		
		refreshModel : function(varPath)
		{
			var that = this;
			
			// After reload, always display non-edit view.
			this._showFormFragment('DisplayPackage');

			var oDataMOdel = new sap.ui.model.odata.ODataModel(m_xsodata);	
			oDataMOdel.read("/Products.json",null, null, true, fSuccessPack, fErrorPack);
					
			function fSuccessPack(oEvent)
			{
				if(oEvent.results.length == 0)
				{							
					that._oRouter.navTo("notFound");
					return
				}
				
				var packageDetails = oEvent.results[0];
				that.oldData.NAME = packageDetails.NAME;
				that.oldData.DESCRIPTION = packageDetails.DESCRIPTION;
				
				var oModelMo = new sap.ui.model.json.JSONModel();
				oModelMo.setData(packageDetails);
				that.getView().setModel(oModelMo);
				typeVarPath = packageDetails.TYPE;

				sap.ui.getCore().byId('oListDialogID').setModel(oModelMo);
				sap.ui.getCore().byId('dialogShareMain').setModel(oModelMo);
				
				var url = "/usag/morepository/MOREPOSITORY/WebContent/getAuthorizationData.xsjs?packID=" + varPath; 
				that.getAuthorization(varPath,typeVarPath);
					
			};
			
			function fErrorPack(oEvent)
			{  
				console.log("An error occured while reading Package Data!");
			};
			

			// load parents for breadcrumbs
			oDataMOdel.read("/Products.json?$orderby=LEVEL",null, null, true, fSuccess, fError);
			
			function fSuccess(oEvent)
			{  
				var parents = [];
				parents = oEvent.results; 
				sap.ui.getCore().byId("headertoolbarPanelId").removeAllContentMiddle();
				for (var i in parents)
				{		
					if(i != 0)
						sap.ui.getCore().byId("headertoolbarPanelId").addContentMiddle(new sap.m.Text({text : ">"}).addStyleClass("textForArrow"));
					
					var oLink = new sap.m.Button({
						press : function(evt) 
						{												
							if (sap.ui.getCore().byId("editButtonFromAboveID").mProperties.pressed)
								return;
										
							that._oRouter.navTo("Detail", {contextPath :  this.nodeid});
							sap.ui.getCore().byId('redoButtonelForSelectNew').firePress();
							that.mainToolbarViewExpandedButtons();
						},
						text :parents[i].NAME,
						tooltip :parents[i].NAME
					}).addStyleClass("breadcrumbsBtn");
							
					oLink.nodeid = parents[i].RESULT_NODE;
					if(i == parents.length-1) 						
						oLink.addStyleClass("lastBreadcrumb"); 
						
					sap.ui.getCore().byId("headertoolbarPanelId").addContentMiddle(oLink);
					productName = parents[0].NAME;
				}
		
			};  
			
			function fError(oEvent)
			{  
				console.log("An error occured while reading Parents Data!")  
			}; 	
			
		},
		
		getAuthorization : function(varPath,typeVarPath)
		{
			var that = this;
			var url = "/usag/morepository/MOREPOSITORY/WebContent/getAuthorizationData.xsjs?packID=" + varPath
			jQuery.ajax({   
				url: url,   
				method: 'GET',   
				dataType: 'json',   
				success: function(auth) 
				{
					authorizationPack = auth;
					that.mainToolbarViewExpandedButtons();
					that.moToolbarViewButtons();
					that.addButtonView('addButtonID',true);
					that.addButtonView('addButtonIDNew',true);
										
					// console.log(typeVarPath + authorizationPack);
					if(authorizationPack != undefined)
					{
						if(authorizationPack.EDIT == 'N' ||typeVarPath=="innovation" )
						{										       
							$("li").draggable('disable');
							$("li").className = 'disableMoveAuth';
						}
						else
						{
							$("li").draggable('enable');
						}
					}

					if (	sap.ui.getCore().byId('gridPack').getContent()[0] == undefined )
					{
						sap.ui.getCore().byId('multiSelectIdBt3').setVisible(false);
						sap.ui.getCore().byId('selectButtonId').setVisible(false);
					}
					else 
					{													
						sap.ui.getCore().byId('multiSelectIdBt3').setVisible(true);
						sap.ui.getCore().byId('selectButtonId').setVisible(true);
					}
										
				},
				
				error: function(XHR, Status, Error) 
				{
					var error = Error;
					console.log(XHR.responseText);
					authorizationPack = {};
				}
			});	
			
			
			
		},
				
		// the method handleNavButtonPress is called when the user press the back button from Detail view				
		handleNavButtonPress : function(oEvent) 
		{
			if(sap.ui.getCore().byId("list"))
			{
				sap.ui.getCore().byId("list").removeSelections(true);
			}
					
			if(sap.ui.getCore().byId("listSolution"))
			{
				sap.ui.getCore().byId("listSolution").removeSelections(true);
			}
					
			if(sap.ui.getCore().byId("listFeature"))
			{
				sap.ui.getCore().byId("listFeature").removeSelections(true);
			}
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			var oHistory = sap.ui.core.routing.History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) 
			{
				window.history.go(-1);
				return false;
			} 
			else
			{
				router.navTo("main");
			}
					
		},
		
		// the method handleLineItemPress is called when the user select a row from the table named 'Measurement Objects assigned to the current package'						
		handleLineItemPress : function(oEvent) 
		{
			var context = oEvent.getParameter("listItem")
					.getBindingContext().oModel.getData().moPakage[oEvent
					.getParameter("listItem").getBindingContext().sPath
					.split("/")[2]];
			console.log("inside handle line item" + context);
			console.log(this.oHasher);
			var sViewId = encodeURIComponent(context.KEY_MEASUREMENT_OBJECTS);
			var sViewId1 = context.KEY_PACKAGE;
			this._oRouter.navTo("DetailMO", 
			{
				contextPath : sViewId1,
				lineItemId : sViewId,
			});

		},
		// the method assignNewMO is called when the user select the add button with the tooltip 'Assign Measurement Objects'. Then the dialog with the Measurement Objects is opened
		assignNewMO : function(oEvent) 
		{
			sap.ui.getCore().byId("oListDialogID").open();
		}, 
		// the method searchMOAll is called when the user wants to search for a MO in the 'Assign Measurement Objects' dialog.
		searchMOAll: function(oEvent,selectType,inputType,
		checkProduct, checkInno, checkCUP, checkGlob, searchassignments)
		{
				
			if(oEvent.getParameter('clearButtonPressed') == false)
			{
				var product;
				var inno;
				var cup;
				var glob;
				var searchassign;
				if(checkProduct == true)
					product = 'product';

				if(checkInno == true)
					inno = 'innovation';

				if(checkCUP == true)
					cup = 'cup';

				if(checkGlob == true)
					glob = 'globalization';
				
				if(searchassignments == true)
					searchassign = 'X';
					else
						searchassign = '';
				var oModel = new sap.ui.model.odata.ODataModel(m_xsodata, true);
				var oODataJSONModel =  new sap.ui.model.json.JSONModel(); 
				oModel.read("/CV_SEARCH_MOParameters(ID_PACKAGE=\'"+varPath+"\',P_MONAME=\'" + oEvent.getParameter('query')  + 
						"\',P_MOTYPE=\'" + selectType  +
						"\',P_PROD=\'" + product  +
						"\',P_INNO=\'" + inno  +
						"\',P_GLOB=\'" + glob  +
						"\',P_CUP=\'" + cup  +
						"\',P_ASSIGN=\'" + searchassign  +
						"\',P_PRODNAME=\'" + inputType  + "')/Results",  
						null,  
						null,  
						false,  
						function(oData, oResponse)
						{  		      
							oODataJSONModel.setData(oData);  
							sap.ui.getCore().byId('listMOPacSingle').setModel(oODataJSONModel);
						}            
				);  
			}
				
		},
				
		handleSearch : function(evt) 
		{
			var filters = [];
			var query = evt.getParameter("newValue");
			if (query && query.length > 0) 
			{
				if (query && query.length > 0) 
				{
					var filter = new sap.ui.model.Filter("NAME", sap.ui.model.FilterOperator.Contains, query);
					filters.push(filter);
					var filter = new sap.ui.model.Filter("TECHNICAL_NAME", sap.ui.model.FilterOperator.Contains, query);
					filters.push(filter);
				}
				
				if(sap.ui.getCore().byId("listMOPac").getVisible() == true)
					var list = sap.ui.getCore().byId("listMOPac");
				else
				{
					var list = sap.ui.getCore().byId("listProdMOAssign");
				}
				var binding = list.getBinding("items");
				var filarr = new sap.ui.model.Filter(filters);
				binding.filter(filarr);
			}

		},
		
		handleSearchSingle : function(evt) 
		{
			// create model filter
			var filters = [];
			var query = evt.getParameter("newValue");
			if (query && query.length > 0) 
			{
				if (query && query.length > 0) 
				{
					var filter = new sap.ui.model.Filter("NAME", sap.ui.model.FilterOperator.Contains, query);
					filters.push(filter);
					var filter = new sap.ui.model.Filter("TECHNICAL_NAME", sap.ui.model.FilterOperator.Contains, query);
					filters.push(filter);
				}
		
				var list = sap.ui.getCore().byId("listMOPacSingle");
				var binding = list.getBinding("items");
				var filarr = new sap.ui.model.Filter(filters);
				binding.filter(filarr);
			}

		},
		
		handleAssignMoSelected : function(evt)
		{
			var that = this;
			var list;
			if(sap.ui.getCore().byId("listMOPacSingle").getVisible() == true)
				list = sap.ui.getCore().byId("listMOPacSingle");
			else
				list = sap.ui.getCore().byId("listMOPac");
			var moSelectedItems = list.getSelectedItems();
			var oTable = sap.ui.getCore().byId("tableMoForPackageId");
			that.keyPackage = varPath;
			var unassigned = []; 
			var msg = 'The following measurement objects are already assigned:';
			moSelectedItems.forEach(function(iValue,i) 
			{
				var moprodService = com.tutorial.service.measureobject.MeasurementObjectPMOFactory.getInstance();
				var keyMeasurementObjects = iValue.getContent()[0].getContent()[0].getText();
				var moOb = 
				{
					"KEY_MEASUREMENT_OBJECTS" : keyMeasurementObjects,
					"KEY_PACKAGE" : that.keyPackage
				};
				var dateObj = new Date();
				var month = dateObj.getUTCMonth() + 1; 
						
				if (month < 10)
					{month = 0 + month.toString()}
					
				var day = dateObj.getUTCDate();
						
				if (day < 10)
					{day = 0 + day.toString()}
					
				var year = dateObj.getUTCFullYear();
						
				var hour = dateObj.getHours();
						
				if (hour < 10)
					{hour = 0 + hour.toString()}
						
				var minutes = dateObj.getMinutes();
						
				if (minutes < 10)
				{minutes = 0 + minutes.toString()}
						
				var seconds = dateObj.getSeconds();
						
				if (seconds < 10)
					{seconds = 0 + seconds.toString()}

				var newdate = year.toString() + month.toString()+ day.toString() + hour.toString()+ minutes.toString() + seconds.toString();

				var moObTable = 
				{	
					"ACTIVE" : iValue.getCustomData()[0].getValue(),
					"DESCRIPTION" : iValue.getCustomData()[1].getValue(),
					"KEY_MEASUREMENT_OBJECTS" : keyMeasurementObjects,
					"KEY_PACKAGE" : that.keyPackage,
					"NAME" : iValue.getCustomData()[12].getValue(),
					"AGGREGATION" : iValue.getCustomData()[2].getValue(),
					"MO_TYPE" : iValue.getCustomData()[3].getValue(),
					"UNIT_OF_MEASURE" : iValue.getCustomData()[4].getValue(),
					"NO_CUST_MO" : iValue.getCustomData()[5].getValue(),
					"S_ACUPTRAF" : iValue.getCustomData()[6].getValue(),
					"TECHNICAL_NAME" : iValue.getCustomData()[7].getValue(),
					"DATE_OF_ASSIGNMENT" : newdate
				};
					
				var oDataMOdell = new sap.ui.model.odata.ODataModel(m_xsodata);
				oDataMOdell.read("/Products.json?$filter=KEY_PACKAGE eq '" + moOb.KEY_PACKAGE+"' and KEY_MEASUREMENT_OBJECTS eq '" + moOb.KEY_MEASUREMENT_OBJECTS + "'",null, null, true, fSuccessA, fErrorA);
				
				var oModelNumber = new sap.ui.model.json.JSONModel();

				oModelNumber.setData({
					number : oTable.getModel().getData().moPakage.length,
				});
				that.getView().setModel(oModelNumber,'moNumber');
				
				
				function fSuccessA (oEvent)
				{
					if (oEvent.results[0]==undefined)
					{
						moprodService.createModel({
							moData : moOb,
							successFunc : function(notesData) 
							{
								if(iValue.getCustomData()[10].getProperty('value') == null)
								{
									var moService = com.tutorial.service.measureobject.MeasurementObjectFactory.getInstance();
									var moOb2 = {
										"DATE_OF_ASSIGNMENT" : newdate											
									};
								
									moService.updateModel({
										updatedData : moOb2,
										successFunc : function(moData) 
										{
											keyPackage = varPath;
										},
										errorFunc : function() 
										{
											var msg = 'Measurement Object unsuccessfully updated';
											sap.m.MessageToast.show(msg);
										},
										moKey : keyMeasurementObjects
									});
								
								}
								
								/*
								var monotinpackageService = com.tutorial.service.measureobject.MeasurementObjectMoNotInPackageFactory.getInstance();

								monotinpackageService.loadModel({
									endpointParam : that.keyPackage,
									successFunc : function(moData, response) 
									{
										var oModelMo = new sap.ui.model.json.JSONModel();
										oModelMo.setData(moData);
										sap.ui.getCore().byId('listMOPac').setModel(oModelMo);
										sap.ui.getCore().byId('listMOPac').getModel().updateBindings(true);
									},
									errorFunc : function() 
									{
									}
								});
								*/
								var packageService = com.tutorial.service.measureobject.MeasurementObjectPackageFactory.getInstance();

								var filters = 
								{
									KEY_PACKAGE : that.keyPackage
								}

								packageService.loadModel({
									endpointParam : filters,
									successFunc : function(moData, response) 
									{
										var oModelMo = new sap.ui.model.json.JSONModel();
										oModelMo.setData(moData);
									},
									errorFunc : function() 
									{
									}
								});
																
								var oModel = oTable.getModel().getData().moPakage;
							 
								oTable.getModel().setProperty("/moPakage", oModel);
																  
								oTable.getModel().getData().moPakage.splice(0,0, moObTable);

								
								oTable.getModel().updateBindings(true);
								oTable.getModel().refresh(true);
							
								var oSorter = new sap.ui.model.Sorter({
									path: "DATE_OF_ASSIGNMENT", 
									descending: true, 
								});
							   
								sap.ui.getCore().byId("tableMoForPackageId").getBinding("items").sort(oSorter);
								var msg = 'Successfully added';
								sap.m.MessageToast.show(msg);
					
							},
							
							errorFunc : function() 
							{
								var msg = 'Already assigned';
								sap.m.MessageToast.show(msg);
							}
						});
						
					}
					else 
					{
						//console.log(i+"i ul")
						msg = msg + moObTable.NAME + ';' ;
						if(i == moSelectedItems.length-1)
							sap.m.MessageToast.show(msg);
					}
				}
				
				function fErrorA ()
				{
					console.log("din serviciu")
				}
			});
			sap.ui.getCore().byId('oListDialogID').close();
										
		},
		
		pressItemFromFirstBreadcrumb : function(x,evt) 
		{
			var key = x; 				
			var contentToolBar = sap.ui.getCore().byId("headertoolbarPanelId").getContent();
			sap.ui.getCore().byId("headertoolbarPanelId").removeAllContentMiddle();

			sap.ui.getCore().byId("headertoolbarPanelId").addContentMiddle(contentToolBar[0]);
				
			var sViewId = evt.oSource.mProperties.target;

			this._oRouter.navTo("Detail", 
			{
				contextPath : key
			});
		},
				
		deletePackageSelect : function(oItemList) 
		{
			var that = this;
			var moService = com.tutorial.service.measureobject.MeasurementObjectPackageTableFactory.getInstance();
			var oGrid = sap.ui.getCore().byId("gridPack");
			var modelData = 
			{
				moKey : oItemList.getContent()[3].getText(),
				successFunc : function(oData, response) 
				{
					var msg = 'Package successfully removed';
					sap.m.MessageToast.show(msg);
					var results;
					var packChild = com.tutorial.service.measureobject.MeasurementObjectAssignmentsPackageFactory.getInstance();
					packChild.loadModel({
						endpointParam : modelData.moKey,
						successFunc : function(moData, response) 
						{
							results = moData.results;
							for(var i in results)
							{
								console.log(results[i].KEY);
							}
						},
						
						errorFunc : function() 
						{
							console.log('error');
						}
					});
							
					oGrid.removeContent(oItemList);
					oItemList.destroyContent();
					oItemList.destroy();
				},
				
				errorFunc : function() 
				{
					var msg = 'Package unsuccessfully removed';
					sap.m.MessageToast.show(msg);								
				}
			};
					
			sap.m.MessageBox.confirm("This will remove all of the subpackages and MO assignments. Continue?", 
			{
				icon: sap.m.MessageBox.Icon.WARNING,
				title: "Warning",
				onClose : function(sResult) 
				{
					if (sResult == sap.m.MessageBox.Action.OK) 
					{
						moService.removeModel(modelData);
					}
				}
			});
		},
				
		deletePackageSelect2 : function(oItemList) 
		{
			var that = this;
			var moService = com.tutorial.service.measureobject.MeasurementObjectPackageTableFactory.getInstance();
			var oGrid = sap.ui.getCore().byId("gridPack");
					
			var array = [];
			var listitems = sap.ui.getCore().byId('gridPack').getContent();
			for (i in listitems)
			{
				if (listitems[i].getContent()[0].getSelected() == true)
				{
					array[i] = listitems[i]
				}
			}
			sap.m.MessageBox.confirm("Are you sure you want to delete the selected packages? This will remove all of the subpackages and MO assignments. Continue?", {
				icon: sap.m.MessageBox.Icon.WARNING,
				title: "Warning",
				onClose : function(sResult) 
				{
					var msg;
					if (sResult == sap.m.MessageBox.Action.OK) 
					{
					// /for all selected packages
								
						for (i in array)
						{	
							var packId = array[i].getContent()[3].getText() ;
							var oDataMOdell = new sap.ui.model.odata.ODataModel(m_xsodata);
							// get all subpackages
							// ordered desc by level 
							oDataMOdell.read("/GETCHILD_PACKSParameters(P_QUERY_NODE='"+packId+"')/Results/?$orderby=LEVEL desc",null, null, true, fSuccessEachSubPackage, fErrorEachSubPackage);
							function fSuccessEachSubPackage (oEvent)
							{
								msg='Packages successfully removed';
								if (oEvent.results[0]==undefined) {
									console.log("intraa")} 
								else
								{  
								// //FOR all subpackages + the one selected
												 
									for (j in oEvent.results)
									{	
										var thePackageTBDeleted = oEvent.results[j].RESULT_NODE;
										// delete all mos assigned by pack_id
										msg="Packages successfully removed";
										var url = "/usag/morepository/MOREPOSITORY/WebContent/DeleteSubpackages.xsjs?thePackageTBDeleted=" + thePackageTBDeleted; 
																											
										jQuery.ajax({   
												url: url,   
												method: 'GET',   
												dataType: 'json',   
												success: function(response) 
												{ 
													console.log(response+"aaaaaaaa")
												}
										});
																												
										// after the assignments were removed ,delete the package itself

									}
									sap.m.MessageToast.show('Packages successfully removed.');;
								}
											
							}
										
							function fErrorEachSubPackage () 
							{
								console.log("Error at each subpackage service");
								sap.m.MessageToast.show('Packages unsuccessfully removed.');
							}
		
							array[i].destroyContent();
							array[i].destroy();
						}
					}

				}

			});

		},
		
		//the method deletePackageSelect2ForMainToolbar is called when the user wants to delete the current package together with all of its subpackages and MO assignments.					
		deletePackageSelect2ForMainToolbar : function(oItemList) 
		{
			var that = this;
			var moService = com.tutorial.service .measureobject.MeasurementObjectPackageTableFactory.getInstance();

			sap.m.MessageBox.confirm("Are you sure you want to delete the selected package? This will remove all of the subpackages and MO assignments. Continue?", {
				icon: sap.m.MessageBox.Icon.WARNING,
				title: "Warning",
				onClose : function(sResult) 
				{
					if (sResult == sap.m.MessageBox.Action.OK) 
					{
						var packId = varPath ; var msg;
						var oDataMOdell = new sap.ui.model.odata.ODataModel(m_xsodata);
						// get all subpackages
						// ordered desc by level
						oDataMOdell.read("/GETCHILD_PACKSParameters(P_QUERY_NODE='"+packId+"')/Results/?$orderby=LEVEL desc",null, null, true, fSuccessEachSubPackage, fErrorEachSubPackage);
						function fSuccessEachSubPackage (oEvent)
						{
							msg='Packages successfully removed';
							if (oEvent.results[0]==undefined) 
							{
								console.log("intraa")
							} 
							else
							{  
								// //FOR all subpackages + the one selected
								for (j in oEvent.results)
								{	
									var thePackageTBDeleted = oEvent.results[j].RESULT_NODE;
									// delete all mos assigned by pack_id
									var url = "/usag/morepository/MOREPOSITORY/WebContent/DeleteSubpackages.xsjs?thePackageTBDeleted=" + thePackageTBDeleted; 
									jQuery.ajax({   
										url: url,   
										method: 'GET',   
										dataType: 'json',   
										success: function(response) 
										{ 
											console.log(response+"aaaaaaaa")
										}
									});
								// after the assignments were removed ,delete the package itself
								}										
							}
											
						}
										
						function fErrorEachSubPackage () 
						{
							console.log("Error at each subpackage service");
							msg='Packages unsuccessfully removed';
						}
						
						var parentid; 
						
						var packageService = com.tutorial.service.measureobject.MeasurementObjectPKPrimaryInfoFactory.getInstance();
									
						packageService.loadModel({
							endpointParam : varPath,
							successFunc : function(moData, response) 
							{
								parentid = moData.results[0].PARENTID;																			
							},
							errorFunc : function() 
							{
								console.log('error');
							}
						});	
										
						var oDataMOdel2 = new sap.ui.model.odata.ODataModel(m_xsodata);
						oDataMOdel2.read("/CV_NODE_PARENTSParameters(P_NODEID=\'"+parentid+"\')/Results/?$orderby=LEVEL",null, null, true, fSuccess3, fError3);
						function fSuccess3(oEvent)
						{  
							oDataMOdel2.updateBindings(true);
							if (parentid =="" ||parentid==null)
							{
								var hrefNew = window.location.origin + window.location.pathname + '#/?tab=tabCUP';
								window.open(hrefNew, '_self');
							}									
							else
							{
								that._oRouter.navTo("Detail", {
									contextPath : parentid										
								});
							}
							sap.m.MessageToast.show(msg);
							that.mainToolbarViewExpandedButtons();
						};  
						
						function fError3(oEvent)
						{  
							console.log("An error occured while reading Parents Data!");
						};																																																																					
					}

				}
			});

		},
		
		checkPackageSelect : function(oItemList, type) 
		{
					
			var that = this;
			var moService = com.tutorial.service.measureobject.MeasurementObjectPackageTableFactory.getInstance();
			var oGrid = sap.ui.getCore().byId("gridPack");
				
			var modelData = 
			{
				moKey : oItemList.getContent()[3].getText(),
				successFunc : function(oData, response) 
				{
					var msg = 'Package selected';
					sap.m.MessageToast.show(msg);
					var results;
					var packChild = com.tutorial.service.measureobject.MeasurementObjectAssignmentsPackageFactory.getInstance();
					packChild.loadModel({
						endpointParam : modelData.moKey,
						successFunc : function(moData, response) 
						{
							results = moData.results;
							for(var i in results)
							{
								//console.log(results[i].KEY);
							}
						},
						errorFunc : function() 
						{
							console.log('error');
						}
					});
				},
				errorFunc : function() 
				{
					var msg = 'Package unsuccessfully removed';
					sap.m.MessageToast.show(msg);							
				}
			};
			
								
			var oDataMOdel = new sap.ui.model.odata.ODataModel(m_xsodata);
			// download current product/ solution
								
			if (type === 'product')
			{
				var oExport = new sap.ui.core.util.Export({
					exportType: new sap.ui.core.util.ExportTypeCSV({
						separatorChar: ','
					}),
					models: oDataMOdel,
					rows: {path: "/CA_PROD_DOWNLOAD_ALLParameters(P_NODEID=\'"+varPath+"\')/Results"},
					columns:[
								{name: 'ID', template: {content: '="{ID}"'}},
								{name: 'Product name', template: {content: '{PRODUCT_NAME}'}},
								{name: 'Product Id', template: {content: '="{PRODUCT_ID}"'}},
								{name: 'PPMS_ID', template: {content: '="{PPMS_ID}"'}},
								{name: 'PACKAGE_LEVEL1', template: {content: '{PACKAGE_LEVEL1}'}},
								{name: 'PACKAGEID_LEVEL1', template: {content: '{PACKAGEID_LEVEL1}'}},
								{name: 'PACKAGE_LEVEL2', template: {content: '{PACKAGE_LEVEL2}'}},
								{name: 'PACKAGEID_LEVEL2', template: {content: '{PACKAGEID_LEVEL2}'}},
								{name: 'PACKAGE_LEVEL3', template: {content: '{PACKAGE_LEVEL3}'}},
								{name: 'PACKAGEID_LEVEL3', template: {content: '{PACKAGEID_LEVEL3}'}},
								{name: 'PATH', template: {content: '="{PATH}"'}},
								{name: 'MO_KEY', template: {content: '{MO_KEY}'}},
								{name: 'MO_NAME', template: {content: '{MO_NAME}'}},
								{name: 'MO_TYPE', template: {content: '{MO_TYPE}'}},
							]
				});
			}
								
			if (type === 'solution')
			{
				var oExport = new sap.ui.core.util.Export({
					exportType: new sap.ui.core.util.ExportTypeCSV({
						separatorChar: ','
					}),
					models: oDataMOdel,
					rows: {path: "/CA_PROD_DOWNLOAD_ALLParameters(P_NODEID=\'"+varPath+"\')/Results"},
					columns:[
								{name: 'ID', template: {content: '="{ID}"'}},
								{name: 'Solution name', template: {content: '{PRODUCT_NAME}'}},
								{name: 'Solution Id', template: {content: '="{PRODUCT_ID}"'}},
								{name: 'PPMS_ID', template: {content: '="{PPMS_ID}"'}},
								{name: 'PACKAGE_LEVEL1', template: {content: '{PACKAGE_LEVEL1}'}},
								{name: 'PACKAGEID_LEVEL1', template: {content: '{PACKAGEID_LEVEL1}'}},
								{name: 'PACKAGE_LEVEL2', template: {content: '{PACKAGE_LEVEL2}'}},
								{name: 'PACKAGEID_LEVEL2', template: {content: '{PACKAGEID_LEVEL2}'}},
								{name: 'PACKAGE_LEVEL3', template: {content: '{PACKAGE_LEVEL3}'}},
								{name: 'PACKAGEID_LEVEL3', template: {content: '{PACKAGEID_LEVEL3}'}},
								{name: 'PATH', template: {content: '="{PATH}"'}},
								{name: 'MO_KEY', template: {content: '{MO_KEY}'}},
								{name: 'MO_NAME', template: {content: '{MO_NAME}'}},
								{name: 'MO_TYPE', template: {content: '{MO_TYPE}'}},
							]
				});
			}
								
			if (type === 'innovation')
			{
				var oExport = new sap.ui.core.util.Export({
					exportType: new sap.ui.core.util.ExportTypeCSV({
						separatorChar: ','
					}),
					models: oDataMOdel,
					rows: {path: "/CA_PROD_DOWNLOAD_ALLParameters(P_NODEID=\'"+varPath+"\')/Results"},
					columns:[
								{name: 'ID', template: {content: '="{ID}"'}},
								{name: 'Innovation name', template: {content: '{PRODUCT_NAME}'}},
								{name: 'Innovation Id', template: {content: '="{PRODUCT_ID}"'}},
								{name: 'PPMS_ID', template: {content: '="{PPMS_ID}"'}},
								{name: 'PACKAGE_LEVEL1', template: {content: '{PACKAGE_LEVEL1}'}},
								{name: 'PACKAGEID_LEVEL1', template: {content: '{PACKAGEID_LEVEL1}'}},
								{name: 'PACKAGE_LEVEL2', template: {content: '{PACKAGE_LEVEL2}'}},
								{name: 'PACKAGEID_LEVEL2', template: {content: '{PACKAGEID_LEVEL2}'}},
								{name: 'PACKAGE_LEVEL3', template: {content: '{PACKAGE_LEVEL3}'}},
								{name: 'PACKAGEID_LEVEL3', template: {content: '{PACKAGEID_LEVEL3}'}},
								{name: 'PATH', template: {content: '="{PATH}"'}},
								{name: 'MO_KEY', template: {content: '{MO_KEY}'}},
								{name: 'MO_NAME', template: {content: '{MO_NAME}'}},
								{name: 'MO_TYPE', template: {content: '{MO_TYPE}'}},
							]
				});
			}
							
			if (type === 'globalization')
			{
				var oExport = new sap.ui.core.util.Export({
					exportType: new sap.ui.core.util.ExportTypeCSV({
						separatorChar: ','
					}),
					models: oDataMOdel,
					rows: {path: "/CA_PROD_DOWNLOAD_ALLParameters(P_NODEID=\'"+varPath+"\')/Results"},
					columns:[
								{name: 'ID', template: {content: '="{ID}"'}},
								{name: 'Globalization name', template: {content: '{PRODUCT_NAME}'}},
								{name: 'Globalization Id', template: {content: '="{PRODUCT_ID}"'}},
								{name: 'PPMS_ID', template: {content: '="{PPMS_ID}"'}},
								{name: 'PACKAGE_LEVEL1', template: {content: '{PACKAGE_LEVEL1}'}},
								{name: 'PACKAGEID_LEVEL1', template: {content: '{PACKAGEID_LEVEL1}'}},
								{name: 'PACKAGE_LEVEL2', template: {content: '{PACKAGE_LEVEL2}'}},
								{name: 'PACKAGEID_LEVEL2', template: {content: '{PACKAGEID_LEVEL2}'}},
								{name: 'PACKAGE_LEVEL3', template: {content: '{PACKAGE_LEVEL3}'}},
								{name: 'PACKAGEID_LEVEL3', template: {content: '{PACKAGEID_LEVEL3}'}},
								{name: 'PATH', template: {content: '="{PATH}"'}},
								{name: 'MO_KEY', template: {content: '{MO_KEY}'}},
								{name: 'MO_NAME', template: {content: '{MO_NAME}'}},
								{name: 'MO_TYPE', template: {content: '{MO_TYPE}'}},
							]
				});
			}

			if (type === 'cup')
			{
				var oExport = new sap.ui.core.util.Export({
					exportType: new sap.ui.core.util.ExportTypeCSV({
						separatorChar: ','
					}),
					models: oDataMOdel,
					rows: {path: "/CA_PROD_DOWNLOAD_ALLParameters(P_NODEID=\'"+varPath+"\')/Results"},
					columns:[
								{name: 'ID', template: {content: '="{ID}"'}},
								{name: 'Cup Defined name', template: {content: '{PRODUCT_NAME}'}},
								{name: 'Cup Defined Id', template: {content: '="{PRODUCT_ID}"'}},
								{name: 'PPMS_ID', template: {content: '="{PPMS_ID}"'}},
								{name: 'PACKAGE_LEVEL1', template: {content: '{PACKAGE_LEVEL1}'}},
								{name: 'PACKAGEID_LEVEL1', template: {content: '{PACKAGEID_LEVEL1}'}},
								{name: 'PACKAGE_LEVEL2', template: {content: '{PACKAGE_LEVEL2}'}},
								{name: 'PACKAGEID_LEVEL2', template: {content: '{PACKAGEID_LEVEL2}'}},
								{name: 'PACKAGE_LEVEL3', template: {content: '{PACKAGE_LEVEL3}'}},
								{name: 'PACKAGEID_LEVEL3', template: {content: '{PACKAGEID_LEVEL3}'}},
								{name: 'PATH', template: {content: '="{PATH}"'}},
								{name: 'MO_KEY', template: {content: '{MO_KEY}'}},
								{name: 'MO_NAME', template: {content: '{MO_NAME}'}},
								{name: 'MO_TYPE', template: {content: '{MO_TYPE}'}},
							]
				});
			}

			oExport.saveFile().always(function() 
			{
				oExport.destroy();
			})

		},
				
		downloadExcel: function(oEvent)
		{
			var oModel = new sap.ui.model.odata.ODataModel(m_xsodata, true);
			var oODataJSONModel =  new sap.ui.model.json.JSONModel(); 
			oModel.read("/CA_PROD_DOWNLOAD_ALLParameters(P_NODEID=\'"+varPath+"\')/Results",  
						null,  
						null,  
						false,  
						function(oData, oResponse)
						{  
							oODataJSONModel.setData(oData);  
						}            
			);  
					
			var JSONData = oODataJSONModel.getJSON();
			var ReportTitle = "sep=,";
			var ShowLabel = true;
					
			// If JSONData is not an object then JSON.parse will
			// parse the JSON string in an Object
			var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
				  
			var CSV = '';    
			// Set Report title in first row or line
				  
			CSV += ReportTitle + '\r\n\n';

			// This condition will generate the Label/Header
			if (ShowLabel) 
			{
				var row = "";
									  
				// This loop will extract the label from 1st index of on array
				for (var index in arrData.results[0]) 
				{
					if (index !== '__metadata' && index !== 'ID' && index !== 'MEASURE_TEST')
					{
						if (arrData.results[0].TYPE === 'product' && index === 'PRODUCT_NAME') {row += 'PRODUCT NAME' + ',';}
						else if (arrData.results[0].TYPE === 'solution' && index === 'PRODUCT_NAME') {row += 'SOLUTION NAME' + ',';}
						else if (arrData.results[0].TYPE === 'feature' && index === 'PRODUCT_NAME') {row += 'INNOVATION NAME' + ',';}
						else if (arrData.results[0].TYPE === 'globalization' && index === 'PRODUCT_NAME') {row += 'GLOBALIZATION NAME' + ',';}
						else if (arrData.results[0].TYPE === 'cup' && index === 'PRODUCT_NAME') {row += 'CUP DEFINED NAME' + ',';}
						else if (arrData.results[0].TYPE === 'product' && index === 'PRODUCT_ID') {row += 'PRODUCT ID' + ',';}
						else if (arrData.results[0].TYPE === 'solution' && index === 'PRODUCT_ID') {row += 'SOLUTION ID' + ',';}
						else if (arrData.results[0].TYPE === 'feature' && index === 'PRODUCT_ID') {row += 'INNOVATION ID' + ',';}
						else if (arrData.results[0].TYPE === 'globalization' && index === 'PRODUCT_ID') {row += 'GLOBALIZATION ID' + ',';}
						else if (arrData.results[0].TYPE === 'cup' && index === 'PRODUCT_ID') {row += 'CUP DEFINED ID' + ',';}
						else
							// Now convert each value to string and comma-seprated
							row += index + ',';
					}
				}

				row = row.slice(0, -1);
					  
				// append Label row with line break
				CSV += row + '\r\n';
			}
				  
			// 1st loop is to extract each row
			for (var i = 0; i < arrData.results.length; i++) 
			{
				var row = "";
					  
				// 2nd loop will extract each column and convert it in string comma-seprated
				for (var index in arrData.results[i]) 
				{
					if (index !== '__metadata' && index !== 'ID' && index !== 'MEASURE_TEST'){
						if (index === 'PRODUCT_ID'){row += '="' + arrData.results[i][index] + '",';}
						else if (index === 'PPMS_ID'){row += '="' + arrData.results[i][index] + '",';}
						else if (index === 'PATH'){row += '="' + arrData.results[i][index] + '",';}
						else
							row += '"' + arrData.results[i][index] + '",';
					}
				}

				row.slice(0, row.length - 1);
					  
				// add a line break after each row
				CSV += row + '\r\n';
			}

			if (CSV == '') 
			{        
				console.log("Invalid data");
				return;
			}   
				  
			// Generate a file name
			var fileName = productName;
			// this will remove the blank-spaces from the title and replace it with an underscore
			// fileName += ReportTitle.replace(/ /g,"_");
				  
			// Initialize file format you want csv or xls
			var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
									
			var link = document.createElement("a");    
			link.href = uri;
				  
			// set the visibility hidden so it will not effect on your web-layout
			link.style = "visibility:hidden";
			link.download = fileName + ".csv";
				  
			// this part will append the anchor tag and remove it after automatic click
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			  
		},

		//the method switchListDeteleMode is called when the 'Unassign Measurement Objects' button is pressed
		switchListDeteleMode : function(evt) 
		{
					
			if (authorizationPack.EDIT == 'Y')
			{
				var list = sap.ui.getCore().byId("tableMoForPackageId");
				var deleteButton = sap.ui.getCore().byId("deleteItemsIdBt");
				var returnDeleteButton = this.getView().byId("returnDeleteItemsIdBt");
					
				deleteButton.setVisible(false);
				returnDeleteButton.setVisible(true);
				list.setMode(sap.m.ListMode.Delete);
					
				console.log(sap.ui.getCore().byId("__item3-tableMoForPackageId-0-imgDel"));
					
			}
		},
		//the method switchListSelecteMode is called when the 'Cancel' button is pressed. This is pressed to cancel the delete mode (this appears in delete mode)
		switchListSelecteMode : function(evt) 
		{
			if (authorizationPack.EDIT == 'Y')
			{
				var list = sap.ui.getCore().byId("tableMoForPackageId");
				var deleteButton = sap.ui.getCore().byId("deleteItemsIdBt");
				var returnDeleteButton = this.getView().byId("returnDeleteItemsIdBt");

				deleteButton.setVisible(true);
				returnDeleteButton.setVisible(false);
				list.setMode(sap.m.ListMode.SingleSelectMaster);
			}
		},
				
		deleteListSelect : function(oEvent) 
		{
			var moService = com.tutorial.service.measureobject.MeasurementObjectPMOFactory.getInstance()
			var oTable = sap.ui.getCore().byId("tableMoForPackageId");
			var oItem = oEvent.getParameter("listItem");
			var dataMo = oItem.getBindingContext().oModel.getData().moPakage[oItem.getBindingContext().sPath.split("/")[2]];
			var good = false;
			//if (dataMo.MO_TYPE !='NEMO') return sap.m.MessageToast.show('You are only allowed to delete NEMO MO type.')
			var modelData = 
			{
				keyPackage : dataMo.KEY_PACKAGE,
				keyMo : dataMo.KEY_MEASUREMENT_OBJECTS,
				successFunc : function(oData, response) 
				{
					good = true;
					var indexModel = oItem.getBindingContext().sPath.split("/")[2];
					$.each(oTable.getModel().getData().moPakage, function(idx, value) 
					{
						if (idx == indexModel) 
						{
							oTable.getModel().getData().moPakage.splice(idx, 1);
						}
					});

					oTable.getModel().updateBindings(true);
							
					if(good)
					{
						var msg = 'Measurement Object successfully removed';
						sap.m.MessageToast.show(msg);
					}							
				},
				
				errorFunc : function() 
				{
					var msg = 'Measurement Object unsuccessfully removed';
					sap.m.MessageToast.show(msg, 
					{
						closeOnBrowserNavigation : false
					});
				}
			};

			sap.m.MessageBox.confirm("Please confirm to unassign the Measurement Object from this package.", 
			{
				onClose : function(sResult) 
				{
					if (sResult == sap.m.MessageBox.Action.OK) 
					{
						moService.removeModel(modelData);								
					}
				}
			});
		},
				
		displayDetailsOfListChild : function(oEvent) 
		{
			var that = this;
			var temp = sap.ui.getCore().byId("listchilddata").getSelectedContexts()[0];
			var molvl = temp.oModel.getData().childData[temp.getPath().split("/")[2]];
			
			var breadcrumb = sap.ui.getCore().byId("headertoolbarPanelId").addContentMiddle(new sap.m.Text({
				text : ">"
			}).addStyleClass("textForArrow"))
			var oLink = new sap.m.Link({
				press : function(evt) 
				{
					that.pressItemFromBreadcrumb(molvl, oLink);
				},
				text : molvl.NAME
			})

			var breadcrumb = sap.ui.getCore().byId("headertoolbarPanelId").addContentMiddle(oLink);
				
			var key = molvl.KEY;												
			var sViewId = key;

			this._oRouter.navTo("Detail", 
			{
				contextPath : sViewId
			});
		},
				
		pressItemFromBreadcrumb : function(molvl, oLink) 
		{
			var index = null;
			$.each(sap.ui.getCore().byId("headertoolbarPanelId").getContent(), function(ind, value) 
			{
				if (value.getText() == oLink.getText()) 
				{
					index = ind;
				}
			})
			var contentToolBar = sap.ui.getCore().byId("headertoolbarPanelId").getContent();
			sap.ui.getCore().byId("headertoolbarPanelId").removeAllContentMiddle();

			var i = 0;
			while (i <= index) 
			{
				sap.ui.getCore().byId("headertoolbarPanelId").addContentMiddle(contentToolBar[i]);						
				i++;
			}
					
			var key = molvl.KEY;
			var sViewId = key;

			this._oRouter.navTo("Detail", {
				contextPath : sViewId
			});
		},
				
		addMo2 : function(evt) 
		{
			var context = evt.getSource().getBindingContext();
			var keyPackage = varPath;
			console.log("inside product" + keyPackage);
				
			this._oRouter.navTo("AddMo2", {
				contextPath : keyPackage
			});
		},
		
		addMo : function(evt) 
		{				
			console.log("inside product" + varPath);
				
			this._oRouter.navTo("AddPackage", {
				contextPath : varPath
			});
		},
				
		editMo : function(evt) 
		{
			var context = evt.getParameter("listItem")
			this._oRouter.navTo("EditPackage", {
				contextPath : varPath
			});
		},
				
		showOnRightContent : function(sizePx)
		{

			$('#__container1-canvas ').css("left","0", "important");
			$('#__container1-canvas ').css("right",sizePx, "important");
					
			$('#__container1-pane ').css("left","auto", "important");
			$('#__container1-pane ').css("right","0", "important");
											
		},
				
		hideOnRightContent : function()
		{
			$('#__container1-canvas ').css("right","0px", "important");
		},
				
		tileSelected : function(key)
		{
			this._oRouter.navTo("Detail", {
				contextPath : key
			});
		},
		
		//the method _getFormFragment is called to return the current fragment which is displayed.
		_getFormFragment: function (sFragmentName) 
		{
			var oFormFragment = this._formFragments[sFragmentName];
		 
			if (oFormFragment) 
			{
				return oFormFragment;
			}
		 
			oFormFragment = sap.ui.jsfragment("ui5_routing." + sFragmentName,this);
		 
			return this._formFragments[sFragmentName] = oFormFragment;
		},
		
		//the method _showFormFragment is called when the user wants to display on the right side of the page "DisplayPackage" view or "ChangePackage" view, depending on the value of sFragmentName parameter.
		_showFormFragment : function (sFragmentName) 
		{
			var oPage = sap.ui.getCore().byId("PackageDetailsID");
			oPage.removeAllContent();
			oPage.addContent(this._getFormFragment(sFragmentName));

			if(sFragmentName === "DisplayPackage")
			{	
				sap.ui.getCore().byId('editButtonFromAboveID').setPressed(false);
			}
			else
			{

				sap.ui.getCore().byId('changedByFieldId').setText(username);
			}
		},
				
		//the method switchFragments is called when the user wants to switch the view from the right side of the page. The options for sFragmentName parameter are:  "DisplayPackage" or "ChangePackage"
		switchFragments : function(fragmentName)
		{
			this._showFormFragment(fragmentName);
		},
				
		// the method saveMo is triggered when the user wants to
		// save the changes of the package(save button is pressed)
		saveMo : function() 
		{
			var that = this;
			
			var oBus = sap.ui.getCore().getEventBus();
			var moService = com.tutorial.service.measureobject.MeasurementObjectPackageTableFactory.getInstance();
			var moKey = varPath;
											
			var moOb = 
			{
					"NAME" : sap.ui.getCore().byId('nameFieldId').getValue(),
					"KEY" : moKey,
					"DESCRIPTION" : sap.ui.getCore().byId('descriptionFieldId').getValue(),
					"CHANGED_BY":sap.ui.getCore().byId('changedByFieldId').getText(),
					"CHANGED_DATE": sap.ui.getCore().byId('changedDateID').getText()
							
			};
			
			
			
			moService.updateModel({
				updatedData :  moOb,
				oldData: this.oldData,
				successFunc : function(notesData)
				{
					sap.m.MessageToast.show('Package successfully updated');
					
					that.refreshModel(that.getView().getModel().getData().KEY);
					
					var oDataMOdel = new sap.ui.model.odata.ODataModel(m_xsodata);
					oDataMOdel.read("/CV_NODE_PARENTSParameters(P_NODEID=\'"+varPath+"\')/Results/?$orderby=LEVEL",null, null, true, fSuccess, fError);
					function fSuccess(oEvent)
					{  
						oDataMOdel.updateBindings(true);						
						sap.ui.getCore().byId('detail').setBusy(false);
					};  
					function fError(oEvent)
					{  
						console.log("An error occured while reading Parents Data!");
						sap.ui.getCore().byId('detail').setBusy(false);
					}; 	
				},
				
				errorFunc : function() 
				{
					var msg = 'Package unsuccessfully updated';
					sap.m.MessageToast.show(msg);
					sap.ui.getCore().byId('detail').setBusy(false);
				},
				
				moKey : moKey
			});

		},
		
		createHierarchy : function(oEvent)
		{
			var flat = [];
			for (var i = 0; i < oEvent.results.length; i++) 
			{
				var key = oEvent.results[i].RESULT_NODE;
				flat[key] = oEvent.results[i];
				if (key != varPath)
					flat[key].visible = "Navigation";
				else
					flat[key].visible = "Inactive"; 
				if(flat[key].NAME == sap.ui.getCore().byId("productTextForPackageEditId").getText())
				{
					flat[key].current = '*Current assignment';
				}
			}
			for (var i in flat) 
			{
				flat[i].children = []; // add children container
			}

			// populate the child container arrays
			for (var i in flat) 
			{
				var parentkey = flat[i].PARENTS;
				if (flat[parentkey]) 
				{
					flat[parentkey].children.push(flat[i]);
				}
			}
			var root = [];
			for (var i in flat) 
			{
				var parentkey = flat[i].PARENTS;
				if (flat[i].LEVEL == '1') 
				{					    
					flat[i].PARENTS = root.push(flat[i]);
				}
			}
			console.log(root);
					
			var packModel = new sap.ui.model.json.JSONModel(root);
			return packModel;
		},
		
		initializeBreadcrumbs : function()
		{
			var that = this;
			var oLinkProd = new sap.m.Button({
				type: sap.m.ButtonType.Transparent,
				color: '#666666',
				layoutData: new sap.m.ToolbarLayoutData({
					shrinkable: true
				}), 
				press : function(evt) 
				{
					that.pressItemFromBreadcrumb(oLinkProd);
				}
			}).addStyleClass('lastBreadcrumb');
			oLinkProd.sPath = "packages>/";
			oLinkProd.setText("Change Product");
			sap.ui.getCore().byId("panelBCIDProd").removeAllContent();
			sap.ui.getCore().byId("panelBCIDProd").addContent(oLinkProd);
			var oLinkSol = new sap.m.Button({
				type: sap.m.ButtonType.Transparent,
				color: '#666666',
				layoutData: new sap.m.ToolbarLayoutData({
					shrinkable: true
				}), 
				press : function(evt) 
				{
					that.pressItemFromBreadcrumb(oLinkSol);
							
				}
			}).addStyleClass('lastBreadcrumb');
			{
				oLinkSol.sPath = "packages>/";
				oLinkSol.setText("Change Solution");
				sap.ui.getCore().byId("panelBCIDSol").removeAllContent();
				sap.ui.getCore().byId("panelBCIDSol").addContent(oLinkSol);
			}
			var oLinkGlob = new sap.m.Button({
				type: sap.m.ButtonType.Transparent,
				color: '#666666',
				layoutData: new sap.m.ToolbarLayoutData({
					shrinkable: true
				}), 
				press : function(evt) 
				{
					that.pressItemFromBreadcrumb(oLinkGlob);
				}
			}).addStyleClass('lastBreadcrumb');
			{
				oLinkGlob.sPath = "packages>/";
				oLinkGlob.setText("Change Globalization");
				sap.ui.getCore().byId("panelBCIDGlob").removeAllContent();
				sap.ui.getCore().byId("panelBCIDGlob").addContent(oLinkGlob);
			}
			var oLinkCupd = new sap.m.Button({
				type: sap.m.ButtonType.Transparent,
				color: '#666666',
				layoutData: new sap.m.ToolbarLayoutData({
					shrinkable: true
				}), 
				press : function(evt) 
				{
					that.pressItemFromBreadcrumb(oLinkCupd);
				}
			}).addStyleClass('lastBreadcrumb');
			oLinkCupd.sPath = "packages>/";
			oLinkCupd.setText("Change CUP Defined");
			sap.ui.getCore().byId("panelBCIDCupd").removeAllContent();
			sap.ui.getCore().byId("panelBCIDCupd").addContent(oLinkCupd);
		},
				
		editPackage : function()
		{ 
			sKey = sap.ui.getCore().byId("iconTabHier").getSelectedKey();
			var that = this;
			var CustomListItemCopy = new sap.m.CustomListItem({
				type : "{= ${packages>NO_MO_NOTNULL} === null ? 'Inactive' : 'Active'}",
				customData: [ new sap.ui.core.CustomData({
								key: "RESULT_NODE",
								value:"{packages>RESULT_NODE}"}),
								new sap.ui.core.CustomData({
									key: "NAME",
									value:"{packages>NAME}"
								})
							],
				content: 	[
								new sap.m.HBox(
								{
									items: 	[
												new sap.ui.core.Icon({
													size: "2rem",
													color: "#107DAB",
													src: "{= ${packages>TYPE} === 'feature' ? 'sap-icon://lightbulb' : ( ${packages>TYPE} === 'product' ? 'sap-icon://add-product': ( ${packages>TYPE} === 'cup' ? 'leads' : ( ${packages>TYPE} === 'solution' ? 'sap-icon://puzzle' : ( ${packages>TYPE} === 'innovation' ? 'sap-icon://lightbulb' : 'sap-icon://globe'))))}",
												}).addStyleClass("sapUiSmallMarginEnd"),
												
												new sap.m.VBox({
													width:'100%',
													items:		[
																new sap.m.HBox(
																{
																	justifyContent: "SpaceBetween",
																	items:	[	
																				new sap.m.Text({
																						text: "{packages>NAME}",																						 
																					}).addStyleClass("sapMObjLTitle"),
																					
																					new sap.m.Text({
																						text: "{= ${packages>NO_MO_NOTNULL} === null ? 'No MOs Assigned' : ${packages>NO_MO_NOTNULL} + ' MOs assigned'}",
																					}).addStyleClass("sapMObjLTitle"),																						
																			]
																}),
																
																new sap.m.HBox({
																	justifyContent: "SpaceBetween",
																	items: 	[
																				new sap.m.Text({
																						
																						text: "{packages>TECHNICAL_NAME}",
																				}),
																				new sap.m.Text({
																						text: "{packages>current}",																						  
																				})
																			]
																})																						
															]
												})
											]
								}).addStyleClass("sapUiSmallMarginBegin sapUiSmallMarginEnd sapUiSmallMarginTopBottom")
							]
			});
					
			var sorterCopy = new sap.ui.model.Sorter("NO_MO_NOTNULL", true);
			this.initializeBreadcrumbs();
			sap.ui.getCore().byId("searchProd").setValue(null);
			sap.ui.getCore().byId("searchSol").setValue(null);
			sap.ui.getCore().byId("searchGlob").setValue(null);
			sap.ui.getCore().byId("searchCupd").setValue(null);
			var packModelProd = [];
			var listPackProd = []
			var typeList = [];
			typeList['product'] = 'listPackProd';
			typeList['solution'] = 'listPackSol';
			typeList['globalization'] = 'listPackGlob';
			typeList['cup'] = 'listPackCupd';
					
			var oDataModel = new sap.ui.model.odata.ODataModel(m_xsodata);
			oDataModel.read("/CV_PROD_PACKParameters(P_NODEID=\'*')/Results/?$filter=TYPE eq '"+'product'+"' & $orderby=LEVEL",null, null, true, fSuccess, fError);
			function fSuccess(oEvent)
			{  
				listPackProd['product'] = sap.ui.getCore().byId(typeList['product']);
				packModelProd['product'] = that.createHierarchy(oEvent);
				listPackProd['product'].setModel(packModelProd['product'],'packages');
				listPackProd['product'].bindItems({
					path: 'packages>/',
					template: CustomListItemCopy,
					sorter: sorterCopy
				});
			};  
					
			function fError(oEvent)
			{  
				console.log("An error occured while reading Package Data!")  
			}; 	
			
			var oDataModelSol = new sap.ui.model.odata.ODataModel(
			m_xsodata);
			oDataModelSol.read("/CV_PROD_PACKParameters(P_NODEID=\'*')/Results/?$filter=TYPE eq '"+'solution'+"' & $orderby=LEVEL",null, null, true, fSuccessSol, fErrorSol);
			function fSuccessSol(oEvent)
			{  
				listPackProd['solution'] = sap.ui.getCore().byId(typeList['solution']);
				packModelProd['solution'] = that.createHierarchy(oEvent);
				listPackProd['solution'].setModel(packModelProd['solution'],'packages');
				listPackProd['solution'].bindItems({
					path: 'packages>/',
					template: CustomListItemCopy,
					sorter: sorterCopy
				});				 
			};  
				
			function fErrorSol(oEvent)
			{  
				console.log("An error occured while reading Package Data!")  
			};
			
			var oDataModelGlob = new sap.ui.model.odata.ODataModel(m_xsodata);
			oDataModelGlob.read("/CV_PROD_PACKParameters(P_NODEID=\'*')/Results/?$filter=TYPE eq '"+'globalization'+"' & $orderby=LEVEL",null, null, true, fSuccessGlob, fErrorGlob);
			function fSuccessGlob(oEvent)
			{  
				listPackProd['globalization'] = sap.ui.getCore().byId(typeList['globalization']);
				packModelProd['globalization'] = that.createHierarchy(oEvent);
				listPackProd['globalization'].setModel(packModelProd['globalization'],'packages');
				listPackProd['globalization'].bindItems({
					path: 'packages>/',
					template: CustomListItemCopy,
					sorter: sorterCopy
				});			 
			};  
			
			function fErrorGlob(oEvent)
			{  
				console.log("An error occured while reading Package Data!")  
			}; 	
			
			var oDataModelCupd = new sap.ui.model.odata.ODataModel(m_xsodata);
			oDataModelCupd.read("/CV_PROD_PACKParameters(P_NODEID=\'*')/Results/?$filter=TYPE eq '"+'cup'+"' & $orderby=LEVEL",null, null, true, fSuccessCupd, fErrorCupd);
			
			function fSuccessCupd(oEvent)
			{  
				listPackProd['cup'] = sap.ui.getCore().byId(typeList['cup']);
				packModelProd['cup'] = that.createHierarchy(oEvent);
				listPackProd['cup'].setModel(packModelProd['cup'],'packages');
				listPackProd['cup'].bindItems({
					path: 'packages>/',
					template: CustomListItemCopy,
					sorter: sorterCopy
				});		 
			}; 
			
			function fErrorCupd(oEvent)
			{  
				console.log("An error occured while reading Package Data!")  
			}; 	 		
		},
		
		//the method createHierarchy2 is called to create the hierarchies PARENT-CHILD for Product, Globalization and CUP Defined, needed for Move Package dialog.
		createHierarchy2 : function(oEvent)
		{
			var flat = [];
			for (var i = 0; i < oEvent.results.length; i++) 
			{
				var key = oEvent.results[i].RESULT_NODE;
				flat[key] = oEvent.results[i];
				if (key != varPath)
					flat[key].visible = "Navigation";
				else
					flat[key].visible = "Navigation";
				if(flat[key].NAME == productName)
				{
					flat[key].current = '*Current assignment';
				}
			}
			for (var i in flat) 
			{
				flat[i].children = []; // add children container
			}

			// populate the child container arrays
			for (var i in flat) 
			{
				var parentkey = flat[i].PARENTS;
				if (flat[parentkey]) 
				{
					flat[parentkey].children.push(flat[i]);
				}
			}
			var root = [];
			for (var i in flat) 
			{
				var parentkey = flat[i].PARENTS;
				if (flat[i].LEVEL == '1') 
				{
					flat[i].PARENTS = root.push(flat[i]);
				}
			}
			console.log(root);
					
			var packModel = new sap.ui.model.json.JSONModel(root);
			return packModel;
		},
				
				
		//the method initializeBreadcrumbs2 is called when the user select(with the check box) at least a package and then select the move button from the Packages toolbar
		initializeBreadcrumbs2 : function()
		{						
			var that = this;
			var oLinkProd = new sap.m.Button({
				type: sap.m.ButtonType.Transparent,
				color: '#666666',
				layoutData: new sap.m.ToolbarLayoutData({
					shrinkable: true
				}), 
				press : function(evt) 
				{
					that.pressItemFromBreadcrumb2(oLinkProd);
				}
			}).addStyleClass('lastBreadcrumb');
			oLinkProd.sPath = "packages>/";
			oLinkProd.setText("Change Product");
			sap.ui.getCore().byId("panelBCIDProdid").removeAllContent();
			var oLinkSol = new sap.m.Button({
				type: sap.m.ButtonType.Transparent,
				color: '#666666',
				layoutData: new sap.m.ToolbarLayoutData({
					shrinkable: true
				}), 
				press : function(evt) 
				{
					that.pressItemFromBreadcrumb2(oLinkSol);								
				}
			}).addStyleClass('lastBreadcrumb');
			{
				oLinkSol.sPath = "packages>/";
				oLinkSol.setText("Change Solution");
				sap.ui.getCore().byId("panelBCIDSolid").removeAllContent();								
			}
			
			var oLinkGlob = new sap.m.Button({
				type: sap.m.ButtonType.Transparent,
				color: '#666666',
				layoutData: new sap.m.ToolbarLayoutData({
					shrinkable: true
				}), 
				press : function(evt) 
				{
					that.pressItemFromBreadcrumb2(oLinkGlob);									
				}
			}).addStyleClass('lastBreadcrumb');
			{
				oLinkGlob.sPath = "packages>/";
				oLinkGlob.setText("Change Globalization");
				sap.ui.getCore().byId("panelBCIDGlobid").removeAllContent();							
			}
						
			var oLinkCupd = new sap.m.Button({
				type: sap.m.ButtonType.Transparent,
				color: '#666666',
				layoutData: new sap.m.ToolbarLayoutData({
					shrinkable: true
				}), 
				press : function(evt) 
				{
					that.pressItemFromBreadcrumb2(oLinkCupd);								
				}
			}).addStyleClass('lastBreadcrumb');
			oLinkCupd.sPath = "packages>/";
			oLinkCupd.setText("Change CUP Defined");
			sap.ui.getCore().byId("panelBCIDCupdid").removeAllContent();
		},
		
		//the method handleListSelect2 is called when a package from Move Package dialog, from Product tab, Globalization tab or CUP Defined tab is selected
		handleListSelect2 : function(evt)
		{   
			sap.ui.getCore().byId('buttonDialogChangeID').setEnabled(true);
			var sPath = 'packages>' + evt.getParameter("listItem").getBindingContextPath() +"/children/";
			var listPack = sap.ui.getCore().byId(evt.getSource().getId());
			var that = this;	
					
			var panelBreadcrumbs;
			var sKey = sap.ui.getCore().byId("iconTabHierid").getSelectedKey();
											
			var contentToolBar = sap.ui.getCore().byId('otb3Move').getContent();
			if (contentToolBar.length>1) 
			{
				var breadcrumb = sap.ui.getCore().byId('otb3Move').addContent(new sap.m.Text({
									text : ">",
									layoutData: new sap.m.ToolbarLayoutData({
										shrinkable: true
									}),
				}).addStyleClass("textForArrow"));
			}
			for(i in contentToolBar)
			{
				contentToolBar[i].removeStyleClass('lastBreadcrumb');
			}
				
			var oLink = new sap.m.Link({
				type: sap.m.ButtonType.Transparent,
				color: '#666666',
				layoutData: new sap.m.ToolbarLayoutData({
					shrinkable: true
				}),
				press : function(evt) 
				{
					that.pressItemFromBreadcrumb2(oLink);
				},
				text : evt.getParameter("listItem").getCustomData()[1].getValue('NAME'),
			}).addStyleClass('lastBreadcrumb');
			oLink.sPath = sPath;
			oLink.id = evt.getParameter("listItem").getCustomData()[0].getValue('RESULT_NODE');
			var breadcrumb = sap.ui.getCore().byId('otb3Move').addContent(oLink);
			var breadcrumbs = sap.ui.getCore().byId('otb3Move').getContent();
					
			var CustomListItemCopy = new sap.m.CustomListItem({
				type : "{= ${packages>NO_MO_NOTNULL} === null ? 'Inactive' : 'Active'}",
				customData: [ 	new sap.ui.core.CustomData({
									key: "RESULT_NODE",
									value:"{packages>RESULT_NODE}"
								}),
								new sap.ui.core.CustomData({
									key: "NAME",
									value:"{packages>NAME}"
								})
							],
				content: 	[
								new sap.m.HBox({
									items: 	[
												new sap.ui.core.Icon({
													size: "2rem",
													color: "#107DAB",
													src: "{= ${packages>TYPE} === 'feature' ? 'sap-icon://lightbulb' : ( ${packages>TYPE} === 'product' ? 'sap-icon://add-product': ( ${packages>TYPE} === 'cup' ? 'leads' : ( ${packages>TYPE} === 'solution' ? 'sap-icon://puzzle' : ( ${packages>TYPE} === 'innovation' ? 'sap-icon://lightbulb' : 'sap-icon://globe'))))}",
												}).addStyleClass("sapUiSmallMarginEnd"),
											
												new sap.m.VBox({
													width:'100%',
													items:		[
																new sap.m.HBox(
																{
																	justifyContent: "SpaceBetween",
																	items:	[	
																				new sap.m.Text({
																						text: "{packages>NAME}",																						 
																					}).addStyleClass("sapMObjLTitle"),
																					
																					new sap.m.Text({
																						text: "{= ${packages>NO_MO_NOTNULL} === null ? 'No MOs Assigned' : ${packages>NO_MO_NOTNULL} + ' MOs assigned'}",
																					}).addStyleClass("sapMObjLTitle"),																						
																			]
																}),
																
																new sap.m.HBox({
																	justifyContent: "SpaceBetween",
																	items: 	[
																				new sap.m.Text({
																						
																						text: "{packages>TECHNICAL_NAME}",
																				}),
																				new sap.m.Text({
																						text: "{packages>current}",																						  
																				})
																			]
																})																						
															]
												})
											]
								}).addStyleClass("sapUiSmallMarginBegin sapUiSmallMarginEnd sapUiSmallMarginTopBottom")
							]
			});
					
			var sorterCopy = new sap.ui.model.Sorter("NO_MO_NOTNULL", true);
			listPack.bindItems({
				path: sPath,
				template: CustomListItemCopy,
				sorter: sorterCopy
			});

		},
				
		//the method pressItemFromBreadcrumb2 is called when a package from the breadcrumbs is selected (from Move Package dialog) 
		pressItemFromBreadcrumb2 : function(oLink) 
		{
			var that = this;
			var index = null;
			var sKey = sap.ui.getCore().byId("iconTabHierid").getSelectedKey();
			if (sKey === 'Product')
			{
				panelBreadcrumbs = 'panelBCIDProdid';
				listId = 'listPackProdid';
			}
						
			if (sKey === 'Solution')
			{
				panelBreadcrumbs = 'panelBCIDSolid';
				listId = 'listPackSolid';
			}
						
			if (sKey === 'Globalization')
			{
				panelBreadcrumbs = 'panelBCIDGlobid';
				listId = 'listPackGlobid';
			}
			
			if (sKey === 'cup')
			{
				panelBreadcrumbs = 'panelBCIDCupdid';
				listId = 'listPackCupdid';
			}
			
			$.each(sap.ui.getCore().byId(panelBreadcrumbs).getContent(), function(ind, value) 
			{
				if (value.sPath == oLink.sPath) 
				{
					index = ind;
				}
			});
											
			var contentToolBar = sap.ui.getCore().byId('otb3Move').getContent();
			sap.ui.getCore().byId('otb3Move').removeAllContent();
			var i = 0;
			contentToolBar[index].addStyleClass('lastBreadcrumb');
			while (i <= index) 
			{
				sap.ui.getCore().byId('otb3Move').addContent(contentToolBar[i]);
				i++;
			}
			var listPack = sap.ui.getCore().byId(listId);
												
			var CustomListItemCopy = new sap.m.CustomListItem({
				type : "{= ${packages>NO_MO_NOTNULL} === null ? 'Inactive' : 'Active'}",
						
				customData: [ 	new sap.ui.core.CustomData({
									key: "RESULT_NODE",
									value:"{packages>RESULT_NODE}"
								}),
								new sap.ui.core.CustomData({
									key: "NAME",
									value:"{packages>NAME}"
								})
							],
				content: 	[
								new sap.m.HBox({
									items: 	[
												new sap.ui.core.Icon({
													size: "2rem",
													color: "#107DAB",
													src: "{= ${packages>TYPE} === 'feature' ? 'sap-icon://lightbulb' : ( ${packages>TYPE} === 'product' ? 'sap-icon://add-product': ( ${packages>TYPE} === 'cup' ? 'leads' : ( ${packages>TYPE} === 'solution' ? 'sap-icon://puzzle' : ( ${packages>TYPE} === 'innovation' ? 'sap-icon://lightbulb' : 'sap-icon://globe'))))}",
												}).addStyleClass("sapUiSmallMarginEnd"),
											
												new sap.m.VBox({
													width:'100%',
													items:		[
																new sap.m.HBox(
																{
																	justifyContent: "SpaceBetween",
																	items:	[	
																				new sap.m.Text({
																						text: "{packages>NAME}",																						 
																					}).addStyleClass("sapMObjLTitle"),
																					
																					new sap.m.Text({
																						text: "{= ${packages>NO_MO_NOTNULL} === null ? 'No MOs Assigned' : ${packages>NO_MO_NOTNULL} + ' MOs assigned'}",
																					}).addStyleClass("sapMObjLTitle"),																						
																			]
																}),
																
																new sap.m.HBox({
																	justifyContent: "SpaceBetween",
																	items: 	[
																				new sap.m.Text({
																						
																						text: "{packages>TECHNICAL_NAME}",
																				}),
																				new sap.m.Text({
																						text: "{packages>current}",																						  
																				})
																			]
																})																						
															]
												})
											]
								}).addStyleClass("sapUiSmallMarginBegin sapUiSmallMarginEnd sapUiSmallMarginTopBottom")
							]
			});
					
			var sorterCopy = new sap.ui.model.Sorter("NO_MO_NOTNULL", true);
			listPack.bindItems({
				path: oLink.sPath,
				template: CustomListItemCopy,
				sorter: sorterCopy}
			);

		},
				
		handleSearchEditPack2 : function(evt)
		{
			var sKey = sap.ui.getCore().byId("iconTabHierid").getSelectedKey();
			var listId = new String();
			if (sKey === 'Product')	
				listId = 'listPackProdid';
			if (sKey === 'Solution')		
				listId = 'listPackSolid';
			if (sKey === 'Globalization')
				listId = 'listPackGlobid';
			if (sKey === 'cup')
				listId = 'listPackCupdid';
			var filters = [];
			var query = evt.getParameter("newValue");
			if (query && query.length > 0) 
			{
				if (query && query.length > 0) 
				{
					var filter = new sap.ui.model.Filter("NAME", sap.ui.model.FilterOperator.Contains, query);
					filters.push(filter);
				}
				var list = sap.ui.getCore().byId(listId);
				var binding = list.getBinding("items");
				var filarr = new sap.ui.model.Filter(filters);
				binding.filter(filarr);
			}
		},
				
		moveAuthCheck: function()
		{
			var that = this;
			var movePack = sap.ui.getCore().byId('otb3Move').getContent()[sap.ui.getCore().byId('otb3Move').getContent().length-1].id;
			if (movePack==undefined && sap.ui.getCore().byId("iconTabHierid").getSelectedKey()=="cup" )
			{
				return that.movePack2();
			}
			var url = "/usag/morepository/MOREPOSITORY/WebContent/getAuthorizationData.xsjs?packID=" + movePack; 
			jQuery.ajax({   
					url: url,   
					method: 'GET',   
					dataType: 'json',   
					success: function(auth) 
					{
						authorizationPack = auth;
						if(authorizationPack.EDIT == 'Y')
						{
							that.movePack2();
						}
						else
						{
							var msg = 'You do not have edit rights on the selected package';
							sap.m.MessageToast.show(msg);
						}
					},
					error: function(XHR, Status, Error) 
					{
						var error = Error;
						console.log(XHR.responseText);
						var msg = 'You do not have edit rights on the selected package';
						sap.m.MessageToast.show(msg);
					}
			});
		},
				
		movePack2 : function()
		{
			var that = this;
			var moService = com.tutorial.service.measureobject.MeasurementObjectPackageTableFactory.getInstance();
			var oGrid = sap.ui.getCore().byId("gridPack");
					
			var array = [];
			var array_items_err = [];
			var listitems = sap.ui.getCore().byId('gridPack').getContent();
			for (i in listitems)
			{
				if (listitems[i].getContent()[0].getSelected() == true)
					array[i] = listitems[i] ;
				else 
					array_items_err[i] = listitems[i];
			}
			var okOrNotOk = 1;
			for (i in array)
			{
				if (array[i].getContent()[3].getText() == sap.ui.getCore().byId('otb3Move').getContent()[sap.ui.getCore().byId('otb3Move').getContent().length-1].id )
				{
					okOrNotOk = 0;
					break;
				}
			}
					
			if (okOrNotOk == 0)
			{
				sap.m.MessageBox.show("You have tried to move a package under itself. Please check and try again!", {
					icon: sap.m.MessageBox.Icon.ERROR,                    
					title: "Error",                                          
					actions: sap.m.MessageBox.Action.OK   ,              
					onClose: null   ,                                    
					styleClass: ""  ,                                     
					initialFocus: null  ,                                 
					textDirection: sap.ui.core.TextDirection.Inherit     
				});
			}						
			else
			{
				sap.m.MessageBox.confirm("Are you sure you want to move the selected packages? Continue?", {
					icon: sap.m.MessageBox.Icon.WARNING,
					title: "Warning",
					onClose : function(sResult) 
					{
						if (sResult == sap.m.MessageBox.Action.OK) 
						{
							if (array.length > 0)
							{	
								for (i in array)
								{
									var sKey = sap.ui.getCore().byId("iconTabHierid").getSelectedKey();
									if (sKey === 'Product')
										panelBreadcrumbs = 'panelBCIDProdid';
									if (sKey === 'Solution')
										panelBreadcrumbs = 'panelBCIDSolid';
									if (sKey === 'Globalization')
										panelBreadcrumbs = 'panelBCIDGlobid';
									if (sKey === 'cup')
										panelBreadcrumbs = 'panelBCIDCupdid';
																		
									var oBus = sap.ui.getCore().getEventBus();
									var moService2 = com.tutorial.service.measureobject.MeasurementObjectPackageTableFactory.getInstance();
									var moKey = varPath;var moOb ;
									if (sap.ui.getCore().byId('otb3Move').getContent()[sap.ui.getCore().byId('otb3Move').getContent().length-1].id==undefined && panelBreadcrumbs=="panelBCIDCupdid")
									{
										
										moOb = 	{
												"KEY" : array[i].getContent()[3].getText(),
												"TYPE" : "cup",
												"PARENTID" : "", 
												"PRODUCTID_ASSOCIATED" : sap.ui.getCore().byId('otb3Move').getContent()[0].id,
												"PRODUCT_NAME" : 	sap.ui.getCore().byId('otb3Move').getContent()[0].getText()
										
										};
									}
									else
									{
										moOb = 	{
												"KEY" : array[i].getContent()[3].getText(),
												"TYPE" : "custom",
												"PARENTID" : sap.ui.getCore().byId('otb3Move').getContent()[sap.ui.getCore().byId('otb3Move').getContent().length-1].id, 
												"PRODUCTID_ASSOCIATED" : sap.ui.getCore().byId('otb3Move').getContent()[0].id,
												"PRODUCT_NAME" : 	sap.ui.getCore().byId('otb3Move').getContent()[0].getText()
								
										};
									}
									sap.ui.getCore().byId('detail').setBusy(true);
									moService2.updateModel({
										updatedData : moOb,
										successFunc : function(notesData) 
										{
											that.requestAccess4RootCUP(array[i].getContent()[3].getText());											
										},
										errorFunc : function() 
										{
											var msg = 'Packages unsuccessfully moved';
											sap.m.MessageToast.show(msg);
											sap.ui.getCore().byId('detail').setBusy(false);
										},
										moKey : array[i].getContent()[3].getText()
									});										
								}
							}
							else 
							{
								var sKey = sap.ui.getCore().byId("iconTabHierid").getSelectedKey();
								if (sKey === 'Product')
									panelBreadcrumbs = 'panelBCIDProdid';
								if (sKey === 'Solution')
									panelBreadcrumbs = 'panelBCIDSolid';
								if (sKey === 'Globalization')
									panelBreadcrumbs = 'panelBCIDGlobid';
								if (sKey === 'cup')
									panelBreadcrumbs = 'panelBCIDCupdid';
																		
								var moService2 = com.tutorial.service.measureobject.MeasurementObjectPackageTableFactory.getInstance();
								var moOb = 
								{
									"KEY" : varPath,			
									"TYPE" : "custom",
									"PARENTID" : sap.ui.getCore().byId('otb3Move').getContent()[sap.ui.getCore().byId('otb3Move').getContent().length-1].id, 
									"PRODUCTID_ASSOCIATED" : sap.ui.getCore().byId('otb3Move').getContent()[0].id,
									"PRODUCT_NAME" : 	sap.ui.getCore().byId('otb3Move').getContent()[0].getText()
								};
								sap.ui.getCore().byId('detail').setBusy(true);
								moService2.updateModel({
									updatedData : moOb,
									successFunc : function(notesData)
									{
										
									},
									errorFunc : function()
									{
										var msg = 'Packages unsuccessfully moved';
										sap.m.MessageToast.show(msg);
										sap.ui.getCore().byId('detail').setBusy(false);
									},
									moKey : varPath
								});
							}
							var oDataMOdel2 = new sap.ui.model.odata.ODataModel(m_xsodata);
							oDataMOdel2.read("/CV_NODE_PARENTSParameters(P_NODEID=\'"+varPath+"\')/Results/?$orderby=LEVEL",null, null, true, fSuccess3, fError3);
						
							function fSuccess3(oEvent)
							{  
								oDataMOdel2.updateBindings(true);
								that.handleNavBack() ;
								sap.ui.getCore().byId('redoButtonelForSelectNew').firePress();
								
								sap.ui.getCore().byId('detail').setBusy(false);
							};  
							function fError3(oEvent)
							{  
								console.log("An error occured while reading Parents Data!");
								sap.ui.getCore().byId('detail').setBusy(false);
							}; 
							var parentID = sap.ui.getCore().byId('otb3Move').getContent()[sap.ui.getCore().byId('otb3Move').getContent().length-1].id;
							sap.m.MessageBox.show("Do you want to navigate to the target package?", {
								icon: sap.m.MessageBox.Icon.INFORMATION,
								title: "Packages successfully moved",
								actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
								id: "messageBoxId1",
								defaultAction: sap.m.MessageBox.Action.NO,
								onClose : function(sResult)
								{
									if (sResult == sap.m.MessageBox.Action.YES) 
									{											
										if (parentID==undefined){
											var hrefNew = window.location.origin + window.location.pathname + '#/?tab=tabCUP';
										}
										else
										{
											var hrefNew = window.location.origin + window.location.pathname + '#/Detail/' + parentID;
										}
										window.open(hrefNew, '_blank');
									}
								}
									
							});
						}
					}
				});
			}
		},
				
		// ------------- for move functionality of main toolbar---------------
		//the method createHierarchy2MoveMainToolbar is called to create the hierarchies PARENT-CHILD for Product, Globalization and CUP Defined, needed for Move Package dialog.
		createHierarchy2MoveMainToolbar : function(oEvent)
		{
			var flat = [];
			for (var i = 0; i < oEvent.results.length; i++) 
			{
				var key = oEvent.results[i].RESULT_NODE;
				flat[key] = oEvent.results[i];
				if (key != varPath)
					flat[key].visible = "Navigation";
				else
					flat[key].visible = "Navigation";
				if(flat[key].NAME == productName)
				{
					flat[key].current = '*Current assignment';
				}
			}
			for (var i in flat) 
			{
				flat[i].children = []; // add children container
			}

			// populate the child container arrays
			for (var i in flat) 
			{
				var parentkey = flat[i].PARENTS;
				if (flat[parentkey]) {
					flat[parentkey].children.push(flat[i]);
				}
			}
			var root = [];
			for (var i in flat) 
			{
				var parentkey = flat[i].PARENTS;
				if (flat[i].LEVEL == '1') 
				{
					flat[i].PARENTS = root.push(flat[i]);
				}
			}
			//  console.log(root);
					
			var packModel = new sap.ui.model.json.JSONModel(root);
			return packModel;
		},
				
		//the method initializeBreadcrumbsCopy2MainToolbar is called when the user wants to move the current package he is inside, for this he select the move button of the main toolbar
		initializeBreadcrumbs2MoveMainToolbar : function()
		{						
			var that = this;
			var oLinkProd = new sap.m.Button({
				type: sap.m.ButtonType.Transparent,
				color: '#666666',
				layoutData: new sap.m.ToolbarLayoutData({
					shrinkable: true
				}), 
				press : function(evt) 
				{
					that.pressItemFromBreadcrumb2MoveMainToolbar(oLinkProd);
				}
			}).addStyleClass('lastBreadcrumb');
			oLinkProd.sPath = "packages>/";
			oLinkProd.setText("Change Product");
			sap.ui.getCore().byId("panelBCIDProdidMoveMainToolbar").removeAllContent();
			var oLinkSol = new sap.m.Button({
				type: sap.m.ButtonType.Transparent,
				color: '#666666',
				layoutData: new sap.m.ToolbarLayoutData({
					shrinkable: true
				}), 
				press : function(evt) 
				{
					that.pressItemFromBreadcrumb2MoveMainToolbar(oLinkSol);
				}
			}).addStyleClass('lastBreadcrumb');
			{
				oLinkSol.sPath = "packages>/";
				oLinkSol.setText("Change Solution");
				sap.ui.getCore().byId("panelBCIDSolidMoveMainToolbar").removeAllContent();
			}
			var oLinkGlob = new sap.m.Button({
				type: sap.m.ButtonType.Transparent,
				color: '#666666',
				layoutData: new sap.m.ToolbarLayoutData({
					shrinkable: true
				}), 
				press : function(evt) 
				{
					that.pressItemFromBreadcrumb2MoveMainToolbar(oLinkGlob);
				}
			}).addStyleClass('lastBreadcrumb');
			{
				oLinkGlob.sPath = "packages>/";
				oLinkGlob.setText("Change Globalization");
				sap.ui.getCore().byId("panelBCIDGlobidMoveMainToolbar").removeAllContent();
			}
						
			var oLinkCupd = new sap.m.Button({
				type: sap.m.ButtonType.Transparent,
				color: '#666666',
				layoutData: new sap.m.ToolbarLayoutData({
					shrinkable: true
				}), 
				press : function(evt) 
				{
					that.pressItemFromBreadcrumb2MoveMainToolbar(oLinkCupd);
				}
			}).addStyleClass('lastBreadcrumb');
			oLinkCupd.sPath = "packages>/";
			oLinkCupd.setText("Change CUP Defined");
			sap.ui.getCore().byId("panelBCIDCupdidMoveMainToolbar").removeAllContent();
		},
				
		handleSearchEditPack2MoveMainToolbar : function(evt)
		{
			var sKey = sap.ui.getCore().byId("iconTabHieridMoveMainToolbar").getSelectedKey();
			var listId = new String();
			if (sKey === 'Product')	
				listId = 'listPackProdidMoveMainToolbar';
			if (sKey === 'Solution')		
				listId = 'listPackSolidMoveMainToolbar';
			if (sKey === 'Globalization')
				listId = 'listPackGlobidMoveMainToolbar';
			if (sKey === 'cup')
				listId = 'listPackCupdidMoveMainToolbar';
			var filters = [];
			var query = evt.getParameter("newValue");
			if (query && query.length > 0) 
			{
				if (query && query.length > 0) 
				{
					var filter = new sap.ui.model.Filter("NAME", sap.ui.model.FilterOperator.Contains, query);
					filters.push(filter);
				}
				var list = sap.ui.getCore().byId(listId);
				var binding = list.getBinding("items");
				var filarr = new sap.ui.model.Filter(filters);
				binding.filter(filarr);
			}
		},
				
		//the method pressItemFromBreadcrumb2MoveMainToolbar is called when a package from the breadcrumbs is selected (from Move Package dialog of main toolbar) 
		pressItemFromBreadcrumb2MoveMainToolbar : function(oLink) 
		{
			var that = this;
			var index = null;
			var sKey = sap.ui.getCore().byId("iconTabHieridMoveMainToolbar").getSelectedKey();
			if (sKey === 'Product')
			{
				panelBreadcrumbs = 'panelBCIDProdidMoveMainToolbar';
				listId = 'listPackProdidMoveMainToolbar';
			}
						
			if (sKey === 'Solution')
			{
				panelBreadcrumbs = 'panelBCIDSolidMoveMainToolbar';
				listId = 'listPackSolidMoveMainToolbar';
			}
						
			if (sKey === 'Globalization')
			{
				panelBreadcrumbs = 'panelBCIDGlobidMoveMainToolbar';
				listId = 'listPackGlobidMoveMainToolbar';
			}
					
			if (sKey === 'cup')
			{
				panelBreadcrumbs = 'panelBCIDCupdidMoveMainToolbar';
				listId = 'listPackCupdidMoveMainToolbar';
			}
			$.each(sap.ui.getCore().byId(panelBreadcrumbs).getContent(), function(ind, value) {
				if (value.sPath == oLink.sPath) 
				{
					index = ind;
				}
			});
					
			var contentToolBar = sap.ui.getCore().byId('otb3MainToolbarMove').getContent();
			sap.ui.getCore().byId('otb3MainToolbarMove').removeAllContent();
			var i = 0;
			contentToolBar[index].addStyleClass('lastBreadcrumb');
			while (i <= index)
			{
				sap.ui.getCore().byId('otb3MainToolbarMove').addContent(contentToolBar[i]);
				i++;
			}
			var listPack = sap.ui.getCore().byId(listId);		
					
			var CustomListItemCopy = new sap.m.CustomListItem({
				type : "{= ${packages>NO_MO_NOTNULL} === null ? 'Inactive' : 'Active'}",
				customData: [ 	
								new sap.ui.core.CustomData({
									key: "RESULT_NODE",
									value:"{packages>RESULT_NODE}"
								}),
								new sap.ui.core.CustomData({
									key: "NAME",
									value:"{packages>NAME}"
								})
							],
				content: 	[
								new sap.m.HBox({
									items: 	[
												new sap.ui.core.Icon({
													size: "2rem",
													color: "#107DAB",
													src: "{= ${packages>TYPE} === 'feature' ? 'sap-icon://lightbulb' : ( ${packages>TYPE} === 'product' ? 'sap-icon://add-product': ( ${packages>TYPE} === 'cup' ? 'leads' : ( ${packages>TYPE} === 'solution' ? 'sap-icon://puzzle' : ( ${packages>TYPE} === 'innovation' ? 'sap-icon://lightbulb' : 'sap-icon://globe'))))}",
												}).addStyleClass("sapUiSmallMarginEnd"),
											
												new sap.m.VBox({
													width:'100%',
													items:		[
																new sap.m.HBox(
																{
																	justifyContent: "SpaceBetween",
																	items:	[	
																				new sap.m.Text({
																						text: "{packages>NAME}",																						 
																					}).addStyleClass("sapMObjLTitle"),
																					
																					new sap.m.Text({
																						text: "{= ${packages>NO_MO_NOTNULL} === null ? 'No MOs Assigned' : ${packages>NO_MO_NOTNULL} + ' MOs assigned'}",
																					}).addStyleClass("sapMObjLTitle"),																						
																			]
																}),
																
																new sap.m.HBox({
																	justifyContent: "SpaceBetween",
																	items: 	[
																				new sap.m.Text({
																						
																						text: "{packages>TECHNICAL_NAME}",
																				}),
																				new sap.m.Text({
																						text: "{packages>current}",																						  
																				})
																			]
																})																						
															]
												})
											]
								}).addStyleClass("sapUiSmallMarginBegin sapUiSmallMarginEnd sapUiSmallMarginTopBottom")
							]
			});
					
			var sorterCopy = new sap.ui.model.Sorter("NO_MO_NOTNULL", true);
			listPack.bindItems({
				path: oLink.sPath,
				template: CustomListItemCopy,
				sorter: sorterCopy
			});
		},
				
		//the method handleListSelect2MoveMainToolbar is called when a package from Move Package dialog, from Product tab, Globalization tab or CUP Defined tab is selected
		handleListSelect2MoveMainToolbar : function(evt)
		{  
			sap.ui.getCore().byId('buttonDialogChangeIDForMainToolbar').setEnabled(true);
			var sPath = 'packages>' + evt.getParameter("listItem").getBindingContextPath() +"/children/";
			var listPack = sap.ui.getCore().byId(evt.getSource().getId());
			var that = this;
			
			var panelBreadcrumbs;
			var sKey = sap.ui.getCore().byId("iconTabHieridMoveMainToolbar").getSelectedKey();
			if (sKey === 'Product')
				panelBreadcrumbs = 'panelBCIDProdidMoveMainToolbar';
			if (sKey === 'Solution')
				panelBreadcrumbs = 'panelBCIDSolidMoveMainToolbar';
			if (sKey === 'Globalization')
				panelBreadcrumbs = 'panelBCIDGlobidMoveMainToolbar';
			if (sKey === 'cup')
				panelBreadcrumbs = 'panelBCIDCupdidMoveMainToolbar';
			var contentToolBar = sap.ui.getCore().byId('otb3MainToolbarMove').getContent();
			if (contentToolBar.length>1) 
			{
				var breadcrumb = sap.ui.getCore().byId('otb3MainToolbarMove').addContent(new sap.m.Text({
					text : ">",
					layoutData: new sap.m.ToolbarLayoutData({
						shrinkable: true
					}),
				}).addStyleClass("textForArrow"));
			}
			for(i in contentToolBar)
			{
				contentToolBar[i].removeStyleClass('lastBreadcrumb');
			}
				
			var oLink = new sap.m.Link({
				type: sap.m.ButtonType.Transparent,
				color: '#666666',
				layoutData: new sap.m.ToolbarLayoutData({
					shrinkable: true
				}),
				press : function(evt) 
				{
					that.pressItemFromBreadcrumb2MoveMainToolbar(oLink);
				},
				text : evt.getParameter("listItem").getCustomData()[1].getValue('NAME'),
						
			}).addStyleClass('lastBreadcrumb');
			oLink.sPath = sPath;
			oLink.id = evt.getParameter("listItem").getCustomData()[0].getValue('RESULT_NODE');
			var breadcrumb = sap.ui.getCore().byId('otb3MainToolbarMove').addContent(oLink);
			var breadcrumbs = sap.ui.getCore().byId('otb3MainToolbarMove').getContent();
					
			var CustomListItemCopy = new sap.m.CustomListItem({
				type : "{= ${packages>NO_MO_NOTNULL} === null ? 'Inactive' : 'Active'}",
						
				customData: [ 	new sap.ui.core.CustomData({
									key: "RESULT_NODE",
									value:"{packages>RESULT_NODE}"
								}),
								new sap.ui.core.CustomData({
									key: "NAME",
									value:"{packages>NAME}"
								})
							],
				content: 	[
								new sap.m.HBox({
									items: 	[
												new sap.ui.core.Icon({
													size: "2rem",
													color: "#107DAB",
													src: "{= ${packages>TYPE} === 'feature' ? 'sap-icon://lightbulb' : ( ${packages>TYPE} === 'product' ? 'sap-icon://add-product': ( ${packages>TYPE} === 'cup' ? 'leads' : ( ${packages>TYPE} === 'solution' ? 'sap-icon://puzzle' : ( ${packages>TYPE} === 'innovation' ? 'sap-icon://lightbulb' : 'sap-icon://globe'))))}",
												}).addStyleClass("sapUiSmallMarginEnd"),
											
												new sap.m.VBox({
													width:'100%',
													items:		[
																new sap.m.HBox(
																{
																	justifyContent: "SpaceBetween",
																	items:	[	
																				new sap.m.Text({
																						text: "{packages>NAME}",																						 
																					}).addStyleClass("sapMObjLTitle"),
																					
																					new sap.m.Text({
																						text: "{= ${packages>NO_MO_NOTNULL} === null ? 'No MOs Assigned' : ${packages>NO_MO_NOTNULL} + ' MOs assigned'}",
																					}).addStyleClass("sapMObjLTitle"),																						
																			]
																}),
																
																new sap.m.HBox({
																	justifyContent: "SpaceBetween",
																	items: 	[
																				new sap.m.Text({
																						
																						text: "{packages>TECHNICAL_NAME}",
																				}),
																				new sap.m.Text({
																						text: "{packages>current}",																						  
																				})
																			]
																})																						
															]
												})
											]
								}).addStyleClass("sapUiSmallMarginBegin sapUiSmallMarginEnd sapUiSmallMarginTopBottom")
							]									
			});
					
			var sorterCopy = new sap.ui.model.Sorter("NO_MO_NOTNULL", true);
			listPack.bindItems({
				path: sPath,
				template: CustomListItemCopy,
				sorter: sorterCopy}
			);	

			
		},
				
		moveAuthCheckMain: function()
		{
			var that = this;
			var movePack = sap.ui.getCore().byId('otb3MainToolbarMove').getContent()[sap.ui.getCore().byId('otb3MainToolbarMove').getContent().length-1].id;
			if (movePack==undefined && sap.ui.getCore().byId("iconTabHieridMoveMainToolbar").getSelectedKey()=="cup" )
			{
				return that.movePack2ForMainToolbar(); // / added for root
														// move into cup hier ,no rights
														// check required for root into cup
			}
			var url = "/usag/morepository/MOREPOSITORY/WebContent/getAuthorizationData.xsjs?packID=" + movePack; 
			jQuery.ajax({   
					url: url,   
					method: 'GET',   
					dataType: 'json',   
					success: function(auth) 
					{
						authorizationPack = auth;
						if(authorizationPack.EDIT == 'Y')
						{
							that.movePack2ForMainToolbar();
						}
						else
						{
							var msg = 'You do not have edit rights on the selected package';
							sap.m.MessageToast.show(msg);
						}
					},
					error: function(XHR, Status, Error) 
					{
						var error = Error;
						console.log(XHR.responseText);
						var msg = 'You do not have edit rights on the selected package';
						sap.m.MessageToast.show(msg);
					}
			});					
		},

		movePack2ForMainToolbar : function()
		{
			var that = this;
			var moService = com.tutorial.service.measureobject.MeasurementObjectPackageTableFactory.getInstance();
			var oGrid = sap.ui.getCore().byId("gridPack");
			if (varPath == sap.ui.getCore().byId('otb3MainToolbarMove').getContent()[sap.ui.getCore().byId('otb3MainToolbarMove').getContent().length-1].id )
			{
				sap.m.MessageBox.show("It's not possible to move package under itself.", {
					icon: sap.m.MessageBox.Icon.ERROR,                    
					title: "Error",                                          
					actions: sap.m.MessageBox.Action.OK   ,               
					onClose: null   ,                                     
					styleClass: ""  ,                                     
					initialFocus: null  ,                                 
					textDirection: sap.ui.core.TextDirection.Inherit     
				});																				
			}
			else 
			{
				sap.m.MessageBox.confirm("Are you sure you want to move the selected package? Continue?", {
					icon: sap.m.MessageBox.Icon.WARNING,
					title: "Warning",
					onClose : function(sResult) 
					{
						if (sResult == sap.m.MessageBox.Action.OK) 
						{									
							var sKey = sap.ui.getCore().byId("iconTabHieridMoveMainToolbar").getSelectedKey();
							if (sKey === 'Product')
								panelBreadcrumbs = 'panelBCIDProdidMoveMainToolbar';
							if (sKey === 'Solution')
								panelBreadcrumbs = 'panelBCIDSolidMoveMainToolbar';
							if (sKey === 'Globalization')
								panelBreadcrumbs = 'panelBCIDGlobidMoveMainToolbar';
							if (sKey === 'cup')
								panelBreadcrumbs = 'panelBCIDCupdidMoveMainToolbar';
							
							var moService2 = com.tutorial.service.measureobject.MeasurementObjectPackageTableFactory.getInstance();
							var moOb ;
							if (sap.ui.getCore().byId('otb3MainToolbarMove').getContent()[sap.ui.getCore().byId('otb3MainToolbarMove').getContent().length-1].id==undefined && panelBreadcrumbs=="panelBCIDCupdidMoveMainToolbar")
							{
								moOb = 	{
													
										"KEY" : varPath ,
										"TYPE" : "cup",
										"PARENTID" : "", 
										"PRODUCTID_ASSOCIATED" : sap.ui.getCore().byId('otb3MainToolbarMove').getContent()[0].id,
										"PRODUCT_NAME" : 	sap.ui.getCore().byId('otb3MainToolbarMove').getContent()[0].getText()
											
								};
							}
							else 
							{
								moOb = 	{
										
										"KEY" : varPath,
										"TYPE" : "custom",
										"PARENTID" : sap.ui.getCore().byId('otb3MainToolbarMove').getContent()[sap.ui.getCore().byId('otb3MainToolbarMove').getContent().length-1].id, 
										"PRODUCTID_ASSOCIATED" : sap.ui.getCore().byId('otb3MainToolbarMove').getContent()[0].id,
										"PRODUCT_NAME" : 	sap.ui.getCore().byId('otb3MainToolbarMove').getContent()[0].getText()
								
								};
							}
																			
							sap.ui.getCore().byId('detail').setBusy(true);
							moService2.updateModel({
								updatedData : moOb,
								successFunc : function(notesData) 
								{
											
								},
								errorFunc : function() 
								{
									var msg = 'Packages unsuccessfully moved';
									sap.m.MessageToast.show(msg);
									sap.ui.getCore().byId('detail').setBusy(false);
								},
								moKey : varPath
							});
																												
							var oDataMOdel2 = new sap.ui.model.odata.ODataModel(m_xsodata);
							oDataMOdel2.read("/CV_NODE_PARENTSParameters(P_NODEID=\'"+varPath+"\')/Results/?$orderby=LEVEL",null, null, true, fSuccess3, fError3);
						
							function fSuccess3(oEvent)
							{  
								oDataMOdel2.updateBindings(true);
								that.handleNavBack();
								sap.ui.getCore().byId('detail').setBusy(false);

								that.mainToolbarViewExpandedButtons();
							};  
							function fError3(oEvent)
							{  
								console.log("An error occured while reading Parents Data!");
								sap.ui.getCore().byId('detail').setBusy(false);
							}; 
							var parentID = sap.ui.getCore().byId('otb3MainToolbarMove').getContent()[sap.ui.getCore().byId('otb3MainToolbarMove').getContent().length-1].id;
							sap.m.MessageBox.show("Do you want to navigate to the target package?", {
								icon: sap.m.MessageBox.Icon.INFORMATION,
								title: "Packages successfully moved",
								actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
								id: "messageBoxId1",
								defaultAction: sap.m.MessageBox.Action.NO,
								onClose : function(sResult) 
								{
									if (sResult == sap.m.MessageBox.Action.YES) 
									{
										if (sap.ui.getCore().byId('otb3MainToolbarMove').getContent()[sap.ui.getCore().byId('otb3MainToolbarMove').getContent().length-1].id==undefined && panelBreadcrumbs=="panelBCIDCupdidMoveMainToolbar")
										{													
											that.requestAccess4RootCUP(varPath);
										}
										var hrefNew = window.location.origin + window.location.pathname + '#/?tab=tabCUP';													
										window.open(hrefNew, '_blank');													
									}
								}											
							});
						}
					}
				});
			} 
		},
		
		//the method editPackage2MoveMainToolbar is called when the user wants to move the current package to another parent (from the main toolbar).
		// in this method are loaded the data for Product, Globalization and CUP Defined and also are initialized the breadcrumbs
		editPackage2MoveMainToolbar : function()
		{ 
			sKey = sap.ui.getCore().byId("iconTabHieridMoveMainToolbar").getSelectedKey();
			var that = this;
											
			var CustomListItemCopy = new sap.m.CustomListItem({
				type : "{= ${packages>NO_MO_NOTNULL} === null ? 'Inactive' : 'Active'}",
					
				customData: [ 	new sap.ui.core.CustomData({
									key: "RESULT_NODE",
									value:"{packages>RESULT_NODE}"}),
									new sap.ui.core.CustomData({
										key: "NAME",
										value:"{packages>NAME}"
									})
							],
				content: 	[	new sap.m.HBox({
									items: 	[	new sap.ui.core.Icon({
													size: "2rem",
													color: "#107DAB",
													src: "{= ${packages>TYPE} === 'feature' ? 'sap-icon://lightbulb' : ( ${packages>TYPE} === 'product' ? 'sap-icon://add-product': ( ${packages>TYPE} === 'cup' ? 'leads' : ( ${packages>TYPE} === 'solution' ? 'sap-icon://puzzle' : ( ${packages>TYPE} === 'innovation' ? 'sap-icon://lightbulb' : 'sap-icon://globe'))))}",
												}).addStyleClass("sapUiSmallMarginEnd"),
											
												new sap.m.VBox({
													width:'100%',
													items:		[
																new sap.m.HBox(
																{
																	justifyContent: "SpaceBetween",
																	items:	[	
																				new sap.m.Text({
																						text: "{packages>NAME}",																						 
																					}).addStyleClass("sapMObjLTitle"),
																					
																					new sap.m.Text({
																						text: "{= ${packages>NO_MO_NOTNULL} === null ? 'No MOs Assigned' : ${packages>NO_MO_NOTNULL} + ' MOs assigned'}",
																					}).addStyleClass("sapMObjLTitle"),																						
																			]
																}),
																
																new sap.m.HBox({
																	justifyContent: "SpaceBetween",
																	items: 	[
																				new sap.m.Text({
																						
																						text: "{packages>TECHNICAL_NAME}",
																				}),
																				new sap.m.Text({
																						text: "{packages>current}",																						  
																				})
																			]
																})																						
															]
												})
											]
								}).addStyleClass("sapUiSmallMarginBegin sapUiSmallMarginEnd sapUiSmallMarginTopBottom")
							]									
			});
					
			var sorterCopy = new sap.ui.model.Sorter("NO_MO_NOTNULL", true);

			this.initializeBreadcrumbs2MoveMainToolbar();
			sap.ui.getCore().byId("searchProdidMoveMainToolbar").setValue(null);
			sap.ui.getCore().byId("searchSolidMoveMainToolbar").setValue(null);
			sap.ui.getCore().byId("searchGlobidMoveMainToolbar").setValue(null);
			sap.ui.getCore().byId("searchCupdidMoveMainToolbar").setValue(null);
					
			var packModelProd = [];
			var listPackProd = []
			var typeList = [];
			typeList['product'] = 'listPackProdidMoveMainToolbar';
			typeList['solution'] = 'listPackSolidMoveMainToolbar';
			typeList['globalization'] = 'listPackGlobidMoveMainToolbar';
			typeList['cup'] = 'listPackCupdidMoveMainToolbar';
			var sorter1 = new sap.ui.model.Sorter("packages>NO_MO_NOTNULL", true);

			var oDataModel = new sap.ui.model.odata.ODataModel(m_xsodata);
			oDataModel.read("/CV_PROD_PACKParameters(P_NODEID=\'*')/Results/?$filter=TYPE eq '"+'product'+"'& $orderby=LEVEL",null, null, true, fSuccess, fError);
			function fSuccess(oEvent)
			{  
				listPackProd['product'] = sap.ui.getCore().byId(typeList['product']);
				packModelProd['product'] = that.createHierarchy2MoveMainToolbar(oEvent);
				listPackProd['product'].setModel(packModelProd['product'],'packages');
				listPackProd['product'].bindItems({
					path: 'packages>/',
					template: CustomListItemCopy,
					sorter: sorterCopy
				});
			};  
			function fError(oEvent)
			{  
				console.log("An error occured while reading Package Data!")  
			}; 	
			var oDataModelSol = new sap.ui.model.odata.ODataModel(m_xsodata);
			oDataModelSol.read("/CV_PROD_PACKParameters(P_NODEID=\'*')/Results/?$filter=TYPE eq '"+'solution'+"' & $orderby=LEVEL",null, null, true, fSuccessSol, fErrorSol);
			
			function fSuccessSol(oEvent)
			{  
				listPackProd['solution'] = sap.ui.getCore().byId(typeList['solution']);
				packModelProd['solution'] = that.createHierarchy2MoveMainToolbar(oEvent);
				listPackProd['solution'].setModel(packModelProd['solution'],'packages');
				listPackProd['solution'].bindItems({
					path: 'packages>/',
					template: CustomListItemCopy,
					sorter: sorterCopy
				});				 
			};  
			function fErrorSol(oEvent)
			{  
				console.log("An error occured while reading Package Data!")  
			}; 	
			var oDataModelGlob = new sap.ui.model.odata.ODataModel(m_xsodata);
			oDataModelGlob.read("/CV_PROD_PACKParameters(P_NODEID=\'*')/Results/?$filter=TYPE eq '"+'globalization'+"' & $orderby=LEVEL",null, null, true, fSuccessGlob, fErrorGlob);
			
			function fSuccessGlob(oEvent)
			{  
				listPackProd['globalization'] = sap.ui.getCore().byId(typeList['globalization']);
				packModelProd['globalization'] = that.createHierarchy2MoveMainToolbar(oEvent);
				listPackProd['globalization'].setModel(packModelProd['globalization'],'packages');
				listPackProd['globalization'].bindItems({
					path: 'packages>/',
					template: CustomListItemCopy,
					sorter: sorterCopy
				});			 
			};  
			function fErrorGlob(oEvent)
			{  
				console.log("An error occured while reading Package Data!")  
			}; 	
					
			var oDataModelCupd = new sap.ui.model.odata.ODataModel(
			m_xsodata);
			oDataModelCupd.read("/CV_PROD_PACKParameters(P_NODEID=\'*')/Results/?$filter=TYPE eq '"+'cup'+"' & $orderby=LEVEL",null, null, true, fSuccessCupd, fErrorCupd);
		
			function fSuccessCupd(oEvent)
			{  
				listPackProd['cup'] = sap.ui.getCore().byId(typeList['cup']);
				packModelProd['cup'] = that.createHierarchy2MoveMainToolbar(oEvent);
				listPackProd['cup'].setModel(packModelProd['cup'],'packages');
				listPackProd['cup'].bindItems({
					path: 'packages>/',
					template: CustomListItemCopy,
					sorter: sorterCopy
				});
	 
			};  
		
			function fErrorCupd(oEvent)
			{  
				console.log("An error occured while reading Package Data!")  
			}; 						 		
		},
		
		//the method editPackage2 is called when the user wants to move a package or more to another package.
		// in this method are loaded the data for Product, Globalization and CUP Defined and also are initialized the breadcrumbs
		editPackage2 : function()
		{ 
			sKey = sap.ui.getCore().byId("iconTabHierid").getSelectedKey();
			var that = this;
							
			var CustomListItemCopy = new sap.m.CustomListItem({
				type : "{= ${packages>NO_MO_NOTNULL} === null ? 'Inactive' : 'Active'}",
				customData: [ 	new sap.ui.core.CustomData({
									key: "RESULT_NODE",
									value:"{packages>RESULT_NODE}"
								}),
								new sap.ui.core.CustomData({
									key: "NAME",
									value:"{packages>NAME}"
								})
							],
				content: 	[	new sap.m.HBox({
									items: 	[	new sap.ui.core.Icon({
													size: "2rem",
													color: "#107DAB",
													src: "{= ${packages>TYPE} === 'feature' ? 'sap-icon://lightbulb' : ( ${packages>TYPE} === 'product' ? 'sap-icon://add-product': ( ${packages>TYPE} === 'cup' ? 'leads' : ( ${packages>TYPE} === 'solution' ? 'sap-icon://puzzle' : ( ${packages>TYPE} === 'innovation' ? 'sap-icon://lightbulb' : 'sap-icon://globe'))))}",
												}).addStyleClass("sapUiSmallMarginEnd"),
											
												new sap.m.VBox({
													width:'100%',
													items:		[
																new sap.m.HBox(
																{
																	justifyContent: "SpaceBetween",
																	items:	[	
																				new sap.m.Text({
																						text: "{packages>NAME}",																						 
																					}).addStyleClass("sapMObjLTitle"),
																					
																					new sap.m.Text({
																						text: "{= ${packages>NO_MO_NOTNULL} === null ? 'No MOs Assigned' : ${packages>NO_MO_NOTNULL} + ' MOs assigned'}",
																					}).addStyleClass("sapMObjLTitle"),																						
																			]
																}),
																
																new sap.m.HBox({
																	justifyContent: "SpaceBetween",
																	items: 	[
																				new sap.m.Text({
																						
																						text: "{packages>TECHNICAL_NAME}",
																				}),
																				new sap.m.Text({
																						text: "{packages>current}",																						  
																				})
																			]
																})																						
															]
												})
											]
								}).addStyleClass("sapUiSmallMarginBegin sapUiSmallMarginEnd sapUiSmallMarginTopBottom")
							]									
			});
					
			var sorterCopy = new sap.ui.model.Sorter("NO_MO_NOTNULL", true);
				
			this.initializeBreadcrumbs2();
			sap.ui.getCore().byId("searchProdid").setValue(null);
			sap.ui.getCore().byId("searchSolid").setValue(null);
			sap.ui.getCore().byId("searchGlobid").setValue(null);
			sap.ui.getCore().byId("searchCupdid").setValue(null);
					
			var packModelProd = [];
			var listPackProd = []
			var typeList = [];
			typeList['product'] = 'listPackProdid';
			typeList['solution'] = 'listPackSolid';
			typeList['globalization'] = 'listPackGlobid';
			typeList['cup'] = 'listPackCupdid';
	
			var oDataModel = new sap.ui.model.odata.ODataModel(m_xsodata);
			oDataModel.read("/CV_PROD_PACKParameters(P_NODEID=\'*')/Results/?$filter=TYPE eq '"+'product'+"'& $orderby=LEVEL",null, null, true, fSuccess, fError);
			function fSuccess(oEvent)
			{  
				listPackProd['product'] = sap.ui.getCore().byId(typeList['product']);
				packModelProd['product'] = that.createHierarchy2(oEvent);
				listPackProd['product'].setModel(packModelProd['product'],'packages');
				listPackProd['product'].bindItems({
					path: 'packages>/',
					template: CustomListItemCopy,
					sorter: sorterCopy
				});
			};  
					
			function fError(oEvent)
			{  
				console.log("An error occured while reading Package Data!")  
			}; 	
			var oDataModelSol = new sap.ui.model.odata.ODataModel(m_xsodata);
			oDataModelSol.read("/CV_PROD_PACKParameters(P_NODEID=\'*')/Results/?$filter=TYPE eq '"+'solution'+"' & $orderby=LEVEL",null, null, true, fSuccessSol, fErrorSol);
			function fSuccessSol(oEvent)
			{  
				listPackProd['solution'] = sap.ui.getCore().byId(typeList['solution']);
				packModelProd['solution'] = that.createHierarchy2(oEvent);
				listPackProd['solution'].setModel(packModelProd['solution'],'packages');
				listPackProd['solution'].bindItems({
					path: 'packages>/',
					template: CustomListItemCopy,
					sorter: sorterCopy
				});				 
			};  
			function fErrorSol(oEvent)
			{  
				console.log("An error occured while reading Package Data!")  
			}; 	
			var oDataModelGlob = new sap.ui.model.odata.ODataModel(m_xsodata);
			oDataModelGlob.read("/CV_PROD_PACKParameters(P_NODEID=\'*')/Results/?$filter=TYPE eq '"+'globalization'+"' & $orderby=LEVEL",null, null, true, fSuccessGlob, fErrorGlob);
			
			function fSuccessGlob(oEvent)
			{  
				listPackProd['globalization'] = sap.ui.getCore().byId(typeList['globalization']);
				packModelProd['globalization'] = that.createHierarchy2(oEvent);
				listPackProd['globalization'].setModel(packModelProd['globalization'],'packages');
				listPackProd['globalization'].bindItems({
					path: 'packages>/',
					template: CustomListItemCopy,
					sorter: sorterCopy
				});			 
			};  
			
			function fErrorGlob(oEvent)
			{  
				console.log("An error occured while reading Package Data!")  
			}; 	
					
			var oDataModelCupd = new sap.ui.model.odata.ODataModel(m_xsodata);
			oDataModelCupd.read("/CV_PROD_PACKParameters(P_NODEID=\'*')/Results/?$filter=TYPE eq '"+'cup'+"' & $orderby=LEVEL",null, null, true, fSuccessCupd, fErrorCupd);
			function fSuccessCupd(oEvent)
			{  
				listPackProd['cup'] = sap.ui.getCore().byId(typeList['cup']);
				packModelProd['cup'] = that.createHierarchy2(oEvent);
				listPackProd['cup'].setModel(packModelProd['cup'],'packages');
				listPackProd['cup'].bindItems({
					path: 'packages>/',
					template: CustomListItemCopy,
					sorter: sorterCopy
				});		 
			}; 
			
			function fErrorCupd(oEvent)
			{  
				console.log("An error occured while reading Package Data!")  
			}; 						 		
		},
		
		//the method createHierarchyCopy2 is called to create the hierarchies for Product, Globalization and CUP Defined, needed for Copy Package dialog.
		createHierarchyCopy2 : function(oEvent)
		{
			var flat = [];
			for (var i = 0; i < oEvent.results.length; i++) 
			{
				var key = oEvent.results[i].RESULT_NODE;
				flat[key] = oEvent.results[i];
				if (key != varPath)
					flat[key].visible = "Navigation";
				else
					flat[key].visible = "Navigation";
				if(flat[key].NAME == productName)
				{
					flat[key].current = '*Current assignment';
				}
			}
			for (var i in flat) 
			{
				flat[i].children = []; // add children container
			}

			// populate the child container arrays
			for (var i in flat) 
			{
				var parentkey = flat[i].PARENTS;
				if (flat[parentkey]) 
				{
					flat[parentkey].children.push(flat[i]);
				}
			}
			var root = [];
			for (var i in flat) 
			{
				var parentkey = flat[i].PARENTS;
				if (flat[i].LEVEL == '1') 
				{
					flat[i].PARENTS = root.push(flat[i]);
				}
			}
			var packModel = new sap.ui.model.json.JSONModel(root);
			return packModel;
		},

		//the method initializeBreadcrumbsCopy2 is called when the user select(with the check box) at least a package and then select the copy button from the Packages toolbar
		//the breadcrumbs are part of Copy Package dialog	
		initializeBreadcrumbsCopy2 : function()
		{
			var that = this;
			var oLinkProd = new sap.m.Button({
				type: sap.m.ButtonType.Transparent,
				color: '#666666',
				layoutData: new sap.m.ToolbarLayoutData({
					shrinkable: true
				}), 
				press : function(evt) 
				{
					that.pressItemFromBreadcrumbCopy2(oLinkProd);								
				}
			}).addStyleClass('lastBreadcrumb');
			oLinkProd.sPath = "packages>/";
			oLinkProd.setText("Change Product");
			sap.ui.getCore().byId("panelBCIDProdCopyid").removeAllContent();
			var oLinkSol = new sap.m.Button({
				type: sap.m.ButtonType.Transparent,
				color: '#666666',
				layoutData: new sap.m.ToolbarLayoutData({
					shrinkable: true
				}), 
				press : function(evt) 
				{
					that.pressItemFromBreadcrumbCopy2(oLinkSol);
				}
			}).addStyleClass('lastBreadcrumb');
			{
				oLinkSol.sPath = "packages>/";
				oLinkSol.setText("Change Solution");
				sap.ui.getCore().byId("panelBCIDSolCopyid").removeAllContent();
			}
			var oLinkGlob = new sap.m.Button({
				type: sap.m.ButtonType.Transparent,
				color: '#666666',
				layoutData: new sap.m.ToolbarLayoutData({
					shrinkable: true
				}), 
				press : function(evt) 
				{
					that.pressItemFromBreadcrumbCopy2(oLinkGlob);
				}
			}).addStyleClass('lastBreadcrumb');
			{
				oLinkGlob.sPath = "packages>/";
				oLinkGlob.setText("Change Globalization");
				sap.ui.getCore().byId("panelBCIDGlobCopyid").removeAllContent();
			}
						
			var oLinkCupd = new sap.m.Button({
				type: sap.m.ButtonType.Transparent,
				color: '#666666',
				layoutData: new sap.m.ToolbarLayoutData({
					shrinkable: true
				}), 
				press : function(evt) 
				{
					that.pressItemFromBreadcrumbCopy2(oLinkCupd);
				}
			}).addStyleClass('lastBreadcrumb');
			oLinkCupd.sPath = "packages>/";
			oLinkCupd.setText("Change CUP Defined");
			sap.ui.getCore().byId("panelBCIDCupdCopyid").removeAllContent();
		},

		//the method pressItemFromBreadcrumbCopy2 is called when a package from the breadcrumbs is selected (from Copy Package dialog) 
		pressItemFromBreadcrumbCopy2 : function(oLink) 
		{
			var that = this;
			var index = null;
			var sKey = sap.ui.getCore().byId("iconTabHierForCopyid").getSelectedKey();
			if (sKey === 'Product')
			{
				panelBreadcrumbs = 'panelBCIDProdCopyid';
				listId = 'listPackProdCopyid';
			}
						
			if (sKey === 'Solution')
			{
				panelBreadcrumbs = 'panelBCIDSolCopyid';
				listId = 'listPackSolCopyid';
			}
						
			if (sKey === 'Globalization')
			{
				panelBreadcrumbs = 'panelBCIDGlobCopyid';
				listId = 'listPackGlobCopyid';
			}
			
			if (sKey === 'cup')
			{
				panelBreadcrumbs = 'panelBCIDCupdCopyid';
				listId = 'listPackCupdCopyid';
			}
			$.each(sap.ui.getCore().byId('otb3').getContent(), function(ind, value) {
				if (value.sPath == oLink.sPath) 
				{
					index = ind;
				}
			});
			var contentToolBar = sap.ui.getCore().byId('otb3').getContent();
			sap.ui.getCore().byId('otb3').removeAllContent();
			var i = 0;
			contentToolBar[index].addStyleClass('lastBreadcrumb');
			while (i <= index) 
			{
				sap.ui.getCore().byId('otb3').addContent(contentToolBar[i]);
				i++;
			}
			var listPack = sap.ui.getCore().byId(listId);				
			var CustomListItemCopy = new sap.m.CustomListItem({
				type : "{= ${packages>NO_MO_NOTNULL} === null ? 'Inactive' : 'Active'}",
								
				customData:	[ 	new sap.ui.core.CustomData({
									key: "RESULT_NODE",
									value:"{packages>RESULT_NODE}"
								}),
								new sap.ui.core.CustomData({
									key: "NAME",
									value:"{packages>NAME}"
								})
							],
				content: 	[
								new sap.m.HBox({
									items: 	[	new sap.ui.core.Icon({
													size: "2rem",
													color: "#107DAB",
													src: "{= ${packages>TYPE} === 'feature' ? 'sap-icon://lightbulb' : ( ${packages>TYPE} === 'product' ? 'sap-icon://add-product': ( ${packages>TYPE} === 'cup' ? 'leads' : ( ${packages>TYPE} === 'solution' ? 'sap-icon://puzzle' : ( ${packages>TYPE} === 'innovation' ? 'sap-icon://lightbulb' : 'sap-icon://globe'))))}",
												}).addStyleClass("sapUiSmallMarginEnd"),
													
												new sap.m.VBox({
													width:'100%',
													items:		[
																new sap.m.HBox(
																{
																	justifyContent: "SpaceBetween",
																	items:	[	
																				new sap.m.Text({
																						text: "{packages>NAME}",																						 
																					}).addStyleClass("sapMObjLTitle"),
																					
																					new sap.m.Text({
																						text: "{= ${packages>NO_MO_NOTNULL} === null ? 'No MOs Assigned' : ${packages>NO_MO_NOTNULL} + ' MOs assigned'}",
																					}).addStyleClass("sapMObjLTitle"),																						
																			]
																}),
																
																new sap.m.HBox({
																	justifyContent: "SpaceBetween",
																	items: 	[
																				new sap.m.Text({
																						
																						text: "{packages>TECHNICAL_NAME}",
																				}),
																				new sap.m.Text({
																						text: "{packages>current}",																						  
																				})
																			]
																})																						
															]
												})
											]
								}).addStyleClass("sapUiSmallMarginBegin sapUiSmallMarginEnd sapUiSmallMarginTopBottom")

							]
			});
							
			var sorterCopy = new sap.ui.model.Sorter("NO_MO_NOTNULL", true);
			listPack.bindItems({
				path: oLink.sPath,
				template: CustomListItemCopy,
				sorter: sorterCopy}
			);	

		},
		
		//the method handleListSelectCopy2 is called when a package from Copy Package dialog, from Product tab, Globalization tab or CUP Defined tab is selected
		handleListSelectCopy2 : function(evt)
		{   
			sap.ui.getCore().byId('buttonDialogChangeForCopyID').setEnabled(true);						
			var sPath = 'packages>' + evt.getParameter("listItem").getBindingContextPath() +"/children/";
			var listPack = sap.ui.getCore().byId(evt.getSource().getId());	
			var that = this;
			var panelBreadcrumbs;
			var sKey = sap.ui.getCore().byId("iconTabHierForCopyid").getSelectedKey();
			var contentToolBar = sap.ui.getCore().byId('otb3').getContent();
			if (contentToolBar.length>1) 
			{
				var breadcrumb = sap.ui.getCore().byId('otb3').addContent(new sap.m.Text({
					text : ">",
					layoutData: new sap.m.ToolbarLayoutData({
						shrinkable: true
					}),
					
				}).addStyleClass("textForArrow"));
			}
		
			for(i in contentToolBar)
			{
				contentToolBar[i].removeStyleClass('lastBreadcrumb');
			}
			var oLink = new sap.m.Link({
				type: sap.m.ButtonType.Transparent,
				color: '#666666',
				layoutData: new sap.m.ToolbarLayoutData({
					shrinkable: true
				}),
				press : function(evt) 
				{
					that.pressItemFromBreadcrumbCopy2(oLink);
				},
				text : evt.getParameter("listItem").getCustomData()[1].getValue('NAME'),
			}).addStyleClass('lastBreadcrumb');
			oLink.sPath = sPath;
			oLink.id = evt.getParameter("listItem").getCustomData()[0].getValue('RESULT_NODE');
			var breadcrumb = sap.ui.getCore().byId('otb3').addContent(oLink);
			var breadcrumbs = sap.ui.getCore().byId('otb3').getContent();
					
			var CustomListItemCopy = new sap.m.CustomListItem({
				type : "{= ${packages>NO_MO_NOTNULL} === null ? 'Inactive' : 'Active'}",
				press :  function(oEvent) 
				{
					oController.handleListSelectCopy2(oEvent);
				},
				customData: [ 	new sap.ui.core.CustomData({
									key: "RESULT_NODE",
									value:"{packages>RESULT_NODE}"
								}),
								new sap.ui.core.CustomData({
									key: "NAME",
									value:"{packages>NAME}"
								})
							],				
				content: 	[	new sap.m.HBox({
									items: 	[	new sap.ui.core.Icon({
													size: "2rem",
													color: "#107DAB",
													src: "{= ${packages>TYPE} === 'feature' ? 'sap-icon://lightbulb' : ( ${packages>TYPE} === 'product' ? 'sap-icon://add-product': ( ${packages>TYPE} === 'cup' ? 'leads' : ( ${packages>TYPE} === 'solution' ? 'sap-icon://puzzle' : ( ${packages>TYPE} === 'innovation' ? 'sap-icon://lightbulb' : 'sap-icon://globe'))))}",
												}).addStyleClass("sapUiSmallMarginEnd"),
											
												new sap.m.VBox({
													width:'100%',
													items:		[
																new sap.m.HBox(
																{
																	justifyContent: "SpaceBetween",
																	items:	[	
																				new sap.m.Text({
																						text: "{packages>NAME}",																						 
																					}).addStyleClass("sapMObjLTitle"),
																					
																					new sap.m.Text({
																						text: "{= ${packages>NO_MO_NOTNULL} === null ? 'No MOs Assigned' : ${packages>NO_MO_NOTNULL} + ' MOs assigned'}",
																					}).addStyleClass("sapMObjLTitle"),																						
																			]
																}),
																
																new sap.m.HBox({
																	justifyContent: "SpaceBetween",
																	items: 	[
																				new sap.m.Text({
																						
																						text: "{packages>TECHNICAL_NAME}",
																				}),
																				new sap.m.Text({
																						text: "{packages>current}",																						  
																				})
																			]
																})																						
															]
												})
											]
								}).addStyleClass("sapUiSmallMarginBegin sapUiSmallMarginEnd sapUiSmallMarginTopBottom")
							]
								
			});
					
			var sorterCopy = new sap.ui.model.Sorter("NO_MO_NOTNULL", true);
			listPack.bindItems({
					path: sPath,
					template: CustomListItemCopy,
					sorter: sorterCopy
			});	
		},
				
		generateKey : function() 
		{
			var key = Math.floor((Math.random() * 10000) + 1);
			return key.toString();
		},
				
		copyAuthCheck: function()
		{
			var that = this;
			copyPack = sap.ui.getCore().byId('otb3').getContent()[sap.ui.getCore().byId('otb3').getContent().length-1].id;
			var url = "/usag/morepository/MOREPOSITORY/WebContent/getAuthorizationData.xsjs?packID=" + copyPack; 
			jQuery.ajax({   
				url: url,   
				method: 'GET',   
				dataType: 'json',   
				success: function(auth) 
				{
					authorizationPack = auth;
					if(authorizationPack.EDIT == 'Y')
					{
						that.copyPack2();
					}
					else
					{
						var msg = 'You do not have edit rights on the selected package';
						sap.m.MessageToast.show(msg);
					}
				},
				error: function(XHR, Status, Error) 
				{
					var error = Error;
					console.log(XHR.responseText);
					var msg = 'You do not have edit rights on the selected package';
					sap.m.MessageToast.show(msg);
				}
			});
		},

		copyPack2 : function()
		{
			var that = this;
			var oGrid = sap.ui.getCore().byId("gridPack");
			var array = [];
			var listitems = sap.ui.getCore().byId('gridPack').getContent();
			var j = 0;
			var i;
			for (i in listitems)
			{
				if (listitems[i].getContent()[0].getSelected() == true)
				{
					array[j] = listitems[i]
					j++;
				}
			}
			sap.m.MessageBox.confirm("Are you sure you want to copy the selected packages? Continue?", {
				icon: sap.m.MessageBox.Icon.WARNING,
				title: "Warning",
				onClose : function(sResult) 
				{
					if (sResult == sap.m.MessageBox.Action.OK) 
					{
						var sKey = sap.ui.getCore().byId("iconTabHierForCopyid").getSelectedKey();
						if (sKey === 'Product')
							panelBreadcrumbs = 'panelBCIDProdCopyid';
						if (sKey === 'Solution')
							panelBreadcrumbs = 'panelBCIDSolCopyid';
						if (sKey === 'Globalization')
							panelBreadcrumbs = 'panelBCIDGlobCopyid';
						if (sKey === 'cup')
							panelBreadcrumbs = 'panelBCIDCupdCopyid';
									
						var parentid = sap.ui.getCore().byId('otb3').getContent()[sap.ui.getCore().byId('otb3').getContent().length-1].id;
						var productid_associated = sap.ui.getCore().byId('otb3').getContent()[0].id;
						var product_name = sap.ui.getCore().byId('otb3').getContent()[0].getText();
						var k;
						var g = 0;
						for (k in array)
						{
							that.parentPackageCopy(array[g].getContent()[3].getText(), parentid, productid_associated, product_name);
							g++;
						}
						sap.m.MessageBox.show("Do you want to navigate to the target package?", {
							icon: sap.m.MessageBox.Icon.INFORMATION,
							title: "Packages successfully copied",
							actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
							id: "messageBoxId1",
							defaultAction: sap.m.MessageBox.Action.NO,
							onClose : function(sResult) 
							{
								if (sResult == sap.m.MessageBox.Action.YES) 
								{									
									var hrefNew = window.location.origin + window.location.pathname + '#/Detail/' + parentid;										
									window.open(hrefNew, '_blank');										
									sap.ui.getCore().byId('otb3').removeAllContent();
									
								}
							}								
						});
					}
				}
		  });
						
		},
		
		level : function (id, parentid, productid_associated, product_name) 
		{    
			var that = this;
			// for subpackages
			var moService = com.tutorial.service.measureobject.MeasurementObjectPackageTableFactory.getInstance();
									
			var packChild = com.tutorial.service.measureobject.MeasurementObjectAssignmentsPackageFactory.getInstance();
			packChild.loadModel({
				endpointParam : id,
				successFunc : function(moDataSub, response) 
				{
					var moService5 = com.tutorial.service.measureobject.MeasurementObjectPackageTableFactory.getInstance();
					if(moDataSub.results.length>0)
					{
						var z;
						var w = 0;
						for(z in moDataSub.results)
						{
							var moIncrement = that.copy1StPackage(moDataSub.results[w].KEY, parentid, productid_associated, product_name);
							that.copyMOs(moDataSub.results[w].KEY, moIncrement)
							that.level(moDataSub.results[w].KEY, moIncrement, productid_associated, product_name);
							w++;
						}

					}
					else return;
				},
				errorFunc : function() 
				{
					console.log('error');
				}
			});						
		},

		parentPackageCopy : function(id, parentid, productid_associated, product_name)
		{
			var that = this;
			var moIncrement = that.copy1StPackage(id, parentid, productid_associated, product_name);
			that.copyMOs(id, moIncrement)
			that.level(id, moIncrement, productid_associated, product_name);
		},
		copyMOs : function(id, moIncrement)
		{
			var that = this;
			var packageLegService = com.tutorial.service.measureobject.MeasurementObjectLegFactory.getInstance();
			packageLegService.loadModel({
				endpointParam : id,
				successFunc : function(moDataMO, response) 
				{
					var m;
					for (m in moDataMO.results)
					{
						moServicePMO = com.tutorial.service.measureobject.MeasurementObjectPMOFactory.getInstance();
						var modelDataPMO = 
						{
							"KEY_PACKAGE" : moIncrement,
							"KEY_MEASUREMENT_OBJECTS" : moDataMO.results[m].KEY_MEASUREMENT_OBJECTS
						};
						moServicePMO.createModel({
							moData : modelDataPMO,
							successFunc : function(notesData) 
							{
													
							},
							errorFunc : function() 
							{
								var msg = 'Measurement Objects unsuccessfully copied';
								sap.m.MessageToast.show(msg);
							}
						});
											
					}
				},
				errorFunc : function() 
				{
					console.log('error');
				}
			});
		},
				
		checkLastCharacters : function(x)
		{
			var k;
			var g = 0;
			for (k=0; k<1000; k++)
			{
				if (x.indexOf("_Copy"+g) > -1)
				{ }
				else
				{g++;}
			}
			return g;
		},
				
		copy1StPackage : function(id, parentid, productid_associated, product_name) 
		{
			var that = this;
			var url = "/usag/morepository/MOREPOSITORY/WebContent/getUser.xsjs";
			jQuery.ajax({   
				url: url,   
				method: 'GET',   
				dataType: 'json',   
				success: function(user) 
				{
					username = user.USER;
					console.log(username +user+user.USER + "useeeeeeeeer")
				},
				error: function(XHR, Status, Error) 
				{
					var error = Error;
					console.log(XHR.responseText);
					username = "default";
				}
			});	
			var moIncrement = that.generateKey() + '_' + that.generateKey();
			var packageService = com.tutorial.service.measureobject.MeasurementObjectPKPrimaryInfoFactory.getInstance();
			var moObCreate;
			packageService.loadModel({
				endpointParam : id,
				successFunc : function(moData, response) 
				{
					// HERE CHECK WHICH IS THE MAX VALUE OF INDICATOR FOR THIS ID
					var x = moData.results[0].TECHNICAL_NAME.toString();
					var lastCharacters = that.checkLastCharacters(moData.results[0].TECHNICAL_NAME.toString());
								
					var mainTech = moData.results[0].MAIN_TECHNICAL_NAME;
					var oDataMOdel = new sap.ui.model.odata.ODataModel(m_xsodata);	
					oDataMOdel.read("/CV_CHECK_MAX_COPY?$filter=MAIN_TECHNICAL_NAME eq '"+mainTech+"'", null, null,true, fSuccessCheckCopy, fErrorCheckCopy);
					function fSuccessCheckCopy(oEvent) 
					{
						var checkCopy = moData.results[0].INDICATOR;
						var ind = checkCopy + 1; 
																	
						var indText = '_Copy' + ind.toString();
						var techNameTruncate = x
						var mainIndText;
										
						console.log(username + "useeeeeeeeer")
						if(lastCharacters > 999)
						{
							mainIndText = x + '_Copy';console.log(username + "useeeeeeeeer")
							moObCreate ={
											"NAME" : moData.results[0].NAME , 
											"KEY" : moIncrement,
											"TECHNICAL_NAME": moData.results[0].TECHNICAL_NAME + indText, 
											"DESCRIPTION" : moData.results[0].DESCRIPTION,
											"OWNER" : username, 
											"LIST_MAINTAINANCE_USERS" : moData.results[0].LIST_MAINTAINANCE_USERS,
											"LIST_MO" : moData.results[0].LIST_MO,
											"TYPE" : "custom",
											"PARENTID" : parentid,
											"PRODUCTID_ASSOCIATED" : productid_associated,
											"PRODUCT_NAME" : 	product_name,
											"INDICATOR" : ind,
											"MAIN_TECHNICAL_NAME" : mainIndText
							};
						}
						else
						{
							mainIndText = x.substring(0, x.length-6) + '_Copy';
							moObCreate ={
											"NAME" : moData.results[0].NAME , 
											"KEY" : moIncrement,
											"TECHNICAL_NAME": x.substring(0, x.length-6) + indText, 
											"DESCRIPTION" : moData.results[0].DESCRIPTION,
											"OWNER" :username , 
											"LIST_MAINTAINANCE_USERS" : moData.results[0].LIST_MAINTAINANCE_USERS,
											"LIST_MO" : moData.results[0].LIST_MO,
											"TYPE" : "custom",
											"PARENTID" : parentid,
											"PRODUCTID_ASSOCIATED" : productid_associated,
											"PRODUCT_NAME" : 	product_name,
											"INDICATOR" : ind,
											"MAIN_TECHNICAL_NAME" : mainIndText
							};
						}
						
						var moService2 = com.tutorial.service.measureobject.MeasurementObjectPackageTableFactory.getInstance();
						moService2.createModel({
							moData : moObCreate,
							successFunc : function(notesData) 
							{
												
							},
							errorFunc : function() 
							{
								var msg = 'Packages unsuccessfully copied';
								sap.m.MessageToast.show(msg);
							}
						});			
					
					};
					function fErrorCheckCopy(oEvent) 
					{
						console.log("An error occured while reading Package Data!")
					};
									
								
				},
				errorFunc : function() 
				{
					console.log('error');
				}
			});	
			return moIncrement;
		},
				
		//the method createHierarchyCopy2MainToolbar is called to create the hierarchies PARENT-CHILD for Product, Globalization and CUP Defined, needed for Copy Package dialog from main toolbar
		createHierarchyCopy2MainToolbar : function(oEvent)
		{
			var flat = [];
			for (var i = 0; i < oEvent.results.length; i++) 
			{
				var key = oEvent.results[i].RESULT_NODE;
				flat[key] = oEvent.results[i];
				if (key != varPath)
					flat[key].visible = "Navigation";
				else
					flat[key].visible = "Navigation";
				if(flat[key].NAME == productName)
				{
					flat[key].current = '*Current assignment';
				}
			}
			for (var i in flat) 
			{
				flat[i].children = []; // add children container
			}
			// populate the child container arrays
			for (var i in flat) 
			{
				var parentkey = flat[i].PARENTS;
				if (flat[parentkey]) 
				{
					flat[parentkey].children.push(flat[i]);
				}
			}
			var root = [];
			for (var i in flat) 
			{
				var parentkey = flat[i].PARENTS;
				if (flat[i].LEVEL == '1') 
				{
						flat[i].PARENTS = root.push(flat[i]);
				}
			}
			console.log(root);
					
			var packModel = new sap.ui.model.json.JSONModel(root);
			return packModel;
		},
		copyAuthCheckMain: function()
		{
			var that = this;
			copyPack = sap.ui.getCore().byId('otb3MainToolbar').getContent()[sap.ui.getCore().byId('otb3MainToolbar').getContent().length-1].id;
			var url = "/usag/morepository/MOREPOSITORY/WebContent/getAuthorizationData.xsjs?packID=" + copyPack; 
			jQuery.ajax({   
				url: url,   
				method: 'GET',   
				dataType: 'json',   
				success: function(auth)
				{
					authorizationPack = auth;
					if(authorizationPack.EDIT == 'Y')
					{
						that.copyPack2ForMainToolbar();
					}
					else
					{
						var msg = 'You do not have edit rights on the selected package';
						sap.m.MessageToast.show(msg);
					}
				},
				error: function(XHR, Status, Error)
				{
					var error = Error;
					console.log(XHR.responseText);
					var msg = 'You do not have edit rights on the selected package';
					sap.m.MessageToast.show(msg);
				}
			});
		},
				
		copyPack2ForMainToolbar : function()
		{
			var that = this;
					
			sap.m.MessageBox.confirm("Are you sure you want to copy the selected package? Continue?", {
				icon: sap.m.MessageBox.Icon.WARNING,
				title: "Warning",
				onClose : function(sResult) 
				{
					if (sResult == sap.m.MessageBox.Action.OK) 
					{
						var sKey = sap.ui.getCore().byId("iconTabHierForCopyidMainToolbar").getSelectedKey();
						if (sKey === 'Product')
							panelBreadcrumbs = 'panelBCIDProdCopyidMainToolbar';
						if (sKey === 'Solution')
							panelBreadcrumbs = 'panelBCIDSolCopyidMainToolbar';
						if (sKey === 'Globalization')
							panelBreadcrumbs = 'panelBCIDGlobCopyidMainToolbar';
						if (sKey === 'cup')
							panelBreadcrumbs = 'panelBCIDCupdCopyidMainToolbar';
									
						var parentid = sap.ui.getCore().byId('otb3MainToolbar').getContent()[sap.ui.getCore().byId('otb3MainToolbar').getContent().length-1].id;
						var productid_associated = sap.ui.getCore().byId('otb3MainToolbar').getContent()[0].id;
						var product_name = sap.ui.getCore().byId('otb3MainToolbar').getContent()[0].getText();
						var k;
					
						that.parentPackageCopy(varPath, parentid, productid_associated, product_name);
					
						sap.m.MessageBox.show("Do you want to navigate to the target package?", {
							icon: sap.m.MessageBox.Icon.INFORMATION,
							title: "Package successfully copied",
							actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
							id: "messageBoxId1",
							defaultAction: sap.m.MessageBox.Action.NO,
							onClose : function(sResult) 
							{
								if (sResult == sap.m.MessageBox.Action.YES) 
								{										
									var hrefNew = window.location.origin + window.location.pathname + '#/Detail/' + parentid;										
									window.open(hrefNew, '_blank');										
								}
							}
							
						});						 
					}
				}
		  });
						
		},
				
		//the method initializeBreadcrumbsCopy2MainToolbar is called when the user wants to copy the current package he is inside, for this he select the copy button from the main toolbar
		initializeBreadcrumbsCopy2MainToolbar : function()
		{
			var that = this;
			var oLinkProd = new sap.m.Button({
				type: sap.m.ButtonType.Transparent,
				color: '#666666',
				layoutData: new sap.m.ToolbarLayoutData({
					shrinkable: true
				}), 
				press : function(evt) 
				{
					that.pressItemFromBreadcrumbCopy2MainToolbar(oLinkProd);
				}
			}).addStyleClass('lastBreadcrumb');
			oLinkProd.sPath = "packages>/";
			oLinkProd.setText("Change Product");
			sap.ui.getCore().byId("panelBCIDProdCopyidMainToolbar").removeAllContent();
			var oLinkSol = new sap.m.Button({
				type: sap.m.ButtonType.Transparent,
				color: '#666666',
				layoutData: new sap.m.ToolbarLayoutData({
					shrinkable: true
				}), 
				press : function(evt) 
				{
					that.pressItemFromBreadcrumbCopy2MainToolbar(oLinkSol);
				}
			}).addStyleClass('lastBreadcrumb');
			{
				oLinkSol.sPath = "packages>/";
				oLinkSol.setText("Change Solution");
				sap.ui.getCore().byId("panelBCIDSolCopyidMainToolbar").removeAllContent();
			}
			var oLinkGlob = new sap.m.Button({
				type: sap.m.ButtonType.Transparent,
				color: '#666666',
				layoutData: new sap.m.ToolbarLayoutData({
					shrinkable: true
				}), 
				press : function(evt) 
				{
					that.pressItemFromBreadcrumbCopy2MainToolbar(oLinkGlob);
				}
			}).addStyleClass('lastBreadcrumb');
			{
				oLinkGlob.sPath = "packages>/";
				oLinkGlob.setText("Change Globalization");
				sap.ui.getCore().byId("panelBCIDGlobCopyidMainToolbar").removeAllContent();
			}
			var oLinkCupd = new sap.m.Button({
				type: sap.m.ButtonType.Transparent,
				color: '#666666',
				layoutData: new sap.m.ToolbarLayoutData({
					shrinkable: true
				}), 
				press : function(evt)
				{
					that.pressItemFromBreadcrumbCopy2MainToolbar(oLinkCupd);
				}
			}).addStyleClass('lastBreadcrumb');
			oLinkCupd.sPath = "packages>/";
			oLinkCupd.setText("Change CUP Defined");
			sap.ui.getCore().byId("panelBCIDCupdCopyidMainToolbar").removeAllContent();
		},
				
		//the method pressItemFromBreadcrumbCopy2MainToolbar is called when a package from the breadcrumbs is selected (from Copy Package dialog of the main toolbar) 
		pressItemFromBreadcrumbCopy2MainToolbar : function(oLink) 
		{
			var that = this;
			var index = null;
			var sKey = sap.ui.getCore().byId("iconTabHierForCopyidMainToolbar").getSelectedKey();
			if (sKey === 'Product')
			{
				panelBreadcrumbs = 'panelBCIDProdCopyidMainToolbar';
				listId = 'listPackProdCopyidMainToolbar';
			}
						
			if (sKey === 'Solution')
			{
				panelBreadcrumbs = 'panelBCIDSolCopyidMainToolbar';
				listId = 'listPackSolCopyidMainToolbar';
			}
						
			if (sKey === 'Globalization')
			{
				panelBreadcrumbs = 'panelBCIDGlobCopyidMainToolbar';
				listId = 'listPackGlobCopyidMainToolbar';
			}
					
			if (sKey === 'cup')
			{
				panelBreadcrumbs = 'panelBCIDCupdCopyidMainToolbar';
				listId = 'listPackCupdCopyidMainToolbar';
			}
			$.each(sap.ui.getCore().byId(panelBreadcrumbs).getContent(), function(ind, value) {
				if (value.sPath == oLink.sPath) 
				{
					index = ind;
				}
			});
			var contentToolBar = sap.ui.getCore().byId('otb3MainToolbar').getContent();
			sap.ui.getCore().byId('otb3MainToolbar').removeAllContent();
			var i = 0;
			contentToolBar[index].addStyleClass('lastBreadcrumb');
			while (i <= index) 
			{
				sap.ui.getCore().byId('otb3MainToolbar').addContent(contentToolBar[i]);
				i++;
			}
			var listPack = sap.ui.getCore().byId(listId);
					
			var CustomListItemCopy = new sap.m.CustomListItem({
				type : "{= ${packages>NO_MO_NOTNULL} === null ? 'Inactive' : 'Active'}",
				press :  function(oEvent) 
				{
					oController.handleListSelectCopy2(oEvent);
				},
				customData: [ 	new sap.ui.core.CustomData({
									key: "RESULT_NODE",
									value:"{packages>RESULT_NODE}"
								}),
								new sap.ui.core.CustomData({
									key: "NAME",
									value:"{packages>NAME}"
								})
							],
				content: 	[	new sap.m.HBox({
									items: 	[	new sap.ui.core.Icon({
													size: "2rem",
													color: "#107DAB",
													src: "{= ${packages>TYPE} === 'feature' ? 'sap-icon://lightbulb' : ( ${packages>TYPE} === 'product' ? 'sap-icon://add-product': ( ${packages>TYPE} === 'cup' ? 'leads' : ( ${packages>TYPE} === 'solution' ? 'sap-icon://puzzle' : ( ${packages>TYPE} === 'innovation' ? 'sap-icon://lightbulb' : 'sap-icon://globe'))))}",
												}).addStyleClass("sapUiSmallMarginEnd"),
											
												new sap.m.VBox({
													width:'100%',
													items:		[
																new sap.m.HBox(
																{
																	justifyContent: "SpaceBetween",
																	items:	[	
																				new sap.m.Text({
																						text: "{packages>NAME}",																						 
																					}).addStyleClass("sapMObjLTitle"),
																					
																					new sap.m.Text({
																						text: "{= ${packages>NO_MO_NOTNULL} === null ? 'No MOs Assigned' : ${packages>NO_MO_NOTNULL} + ' MOs assigned'}",
																					}).addStyleClass("sapMObjLTitle"),																						
																			]
																}),
																
																new sap.m.HBox({
																	justifyContent: "SpaceBetween",
																	items: 	[
																				new sap.m.Text({
																						
																						text: "{packages>TECHNICAL_NAME}",
																				}),
																				new sap.m.Text({
																						text: "{packages>current}",																						  
																				})
																			]
																})																						
															]
												})
											]
								}).addStyleClass("sapUiSmallMarginBegin sapUiSmallMarginEnd sapUiSmallMarginTopBottom")
							]
			});
					
			var sorterCopy = new sap.ui.model.Sorter("NO_MO_NOTNULL", true);
			listPack.bindItems({
				path: oLink.sPath,
				template: CustomListItemCopy,
				sorter: sorterCopy
			});
		},
				
		//the method handleListSelectCopy2MainToolbar is called when a package from Copy Package dialog, from Product tab, Globalization tab or CUP Defined tab is selected
		handleListSelectCopy2MainToolbar : function(evt)
		{   
			sap.ui.getCore().byId('buttonDialogChangeForCopyIDMainToolbar').setEnabled(true);
					
			var sPath = 'packages>' + evt.getParameter("listItem").getBindingContextPath() +"/children/";
			var listPack = sap.ui.getCore().byId(evt.getSource().getId());
			var that = this;	
			var panelBreadcrumbs;
			var sKey = sap.ui.getCore().byId("iconTabHierForCopyidMainToolbar").getSelectedKey();
			if (sKey === 'Product')
				panelBreadcrumbs = 'panelBCIDProdCopyidMainToolbar';
			if (sKey === 'Solution')
				panelBreadcrumbs = 'panelBCIDSolCopyidMainToolbar';
			if (sKey === 'Globalization')
				panelBreadcrumbs = 'panelBCIDGlobCopyidMainToolbar';
			if (sKey === 'cup')
				panelBreadcrumbs = 'panelBCIDCupdCopyidMainToolbar';
			var contentToolBar = sap.ui.getCore().byId('otb3MainToolbar').getContent();
			if (contentToolBar.length>1) 
			{
				var breadcrumb = sap.ui.getCore().byId('otb3MainToolbar').addContent(new sap.m.Text({
					text : ">",
					layoutData: new sap.m.ToolbarLayoutData({
						shrinkable: true
					})
				}).addStyleClass("textForArrow"));
			}
			for(i in contentToolBar)
			{
				contentToolBar[i].removeStyleClass('lastBreadcrumb');
			}
				
			var oLink = new sap.m.Link({
				type: sap.m.ButtonType.Transparent,
				color: '#666666',
				layoutData: new sap.m.ToolbarLayoutData({
					shrinkable: true
				}),
				press : function(evt) 
				{
					that.pressItemFromBreadcrumbCopy2MainToolbar(oLink);
				},
				text : evt.getParameter("listItem").getCustomData()[1].getValue('NAME'),
			}).addStyleClass('lastBreadcrumb');
			oLink.sPath = sPath;
			oLink.id = evt.getParameter("listItem").getCustomData()[0].getValue('RESULT_NODE');
			var breadcrumb = sap.ui.getCore().byId('otb3MainToolbar').addContent(oLink);
			var breadcrumbs = sap.ui.getCore().byId('otb3MainToolbar').getContent();
					
			var CustomListItemCopy = new sap.m.CustomListItem({
				type : "{= ${packages>NO_MO_NOTNULL} === null ? 'Inactive' : 'Active'}",
				customData: [ 	new sap.ui.core.CustomData({
									key: "RESULT_NODE",
									value:"{packages>RESULT_NODE}"
								}),
								new sap.ui.core.CustomData({
									key: "NAME",
									value:"{packages>NAME}"})
							],
				content: 	[	new sap.m.HBox({
									items: 	[	new sap.ui.core.Icon({
													size: "2rem",
													color: "#107DAB",
													src: "{= ${packages>TYPE} === 'feature' ? 'sap-icon://lightbulb' : ( ${packages>TYPE} === 'product' ? 'sap-icon://add-product': ( ${packages>TYPE} === 'cup' ? 'leads' : ( ${packages>TYPE} === 'solution' ? 'sap-icon://puzzle' : ( ${packages>TYPE} === 'innovation' ? 'sap-icon://lightbulb' : 'sap-icon://globe'))))}",
												}).addStyleClass("sapUiSmallMarginEnd"),
											
												new sap.m.VBox({
													width:'100%',
													items:		[
																new sap.m.HBox(
																{
																	justifyContent: "SpaceBetween",
																	items:	[	
																				new sap.m.Text({
																						text: "{packages>NAME}",																						 
																					}).addStyleClass("sapMObjLTitle"),
																					
																					new sap.m.Text({
																						text: "{= ${packages>NO_MO_NOTNULL} === null ? 'No MOs Assigned' : ${packages>NO_MO_NOTNULL} + ' MOs assigned'}",
																					}).addStyleClass("sapMObjLTitle"),																						
																			]
																}),
																
																new sap.m.HBox({
																	justifyContent: "SpaceBetween",
																	items: 	[
																				new sap.m.Text({
																						
																						text: "{packages>TECHNICAL_NAME}",
																				}),
																				new sap.m.Text({
																						text: "{packages>current}",																						  
																				})
																			]
																})																						
															]
												})
											]
								}).addStyleClass("sapUiSmallMarginBegin sapUiSmallMarginEnd sapUiSmallMarginTopBottom")
							]
			});
					
			var sorterCopy = new sap.ui.model.Sorter("NO_MO_NOTNULL", true);
			listPack.bindItems({
				path: sPath,
				template: CustomListItemCopy,
				sorter: sorterCopy
			});
		},
				
		handleSearchEditPackCopy2MainToolbar : function(evt)
		{
			console.log("Hello");
			var sKey = sap.ui.getCore().byId("iconTabHierForCopyidMainToolbar").getSelectedKey();
			var listId = new String();
			if (sKey === 'Product')	
				listId = 'listPackProdCopyidMainToolbar';
			if (sKey === 'Solution')		
				listId = 'listPackSolCopyidMainToolbar';
			if (sKey === 'Globalization')
				listId = 'listPackGlobCopyidMainToolbar';
			if (sKey === 'cup')
				listId = 'listPackCupdCopyidMainToolbar';
			var filters = [];
			var query = evt.getParameter("newValue");
			if (query && query.length > 0) 
			{
				if (query && query.length > 0) 
				{
					var filter = new sap.ui.model.Filter("NAME", sap.ui.model.FilterOperator.Contains, query);
					filters.push(filter);
				}
				var list = sap.ui.getCore().byId(listId);
				var binding = list.getBinding("items");
				var filarr = new sap.ui.model.Filter(filters);
				binding.filter(filarr);
			}
		},
				
		//the method editPackageForCopy2MainToolbar is called when the user wants to copy the current package to another root (parent).
		// in this method are loaded the data for Product, Globalization and CUP Defined and also are initialized the breadcrumbs
		editPackageForCopy2MainToolbar : function()
		{ 
			sKey = sap.ui.getCore().byId("iconTabHierForCopyidMainToolbar").getSelectedKey();
			var that = this;
			var CustomListItemCopy = new sap.m.CustomListItem({
				type : "{= ${packages>NO_MO_NOTNULL} === null ? 'Inactive' : 'Active'}",
				customData: [ 	new sap.ui.core.CustomData({
									key: "RESULT_NODE",
									value:"{packages>RESULT_NODE}"
								}),
								new sap.ui.core.CustomData({
									key: "NAME",
									value:"{packages>NAME}"
								})
							],
				content: 	[	new sap.m.HBox({
									items: 	[	new sap.ui.core.Icon({
													size: "2rem",
													color: "#107DAB",
													src: "{= ${packages>TYPE} === 'feature' ? 'sap-icon://lightbulb' : ( ${packages>TYPE} === 'product' ? 'sap-icon://add-product': ( ${packages>TYPE} === 'cup' ? 'leads' : ( ${packages>TYPE} === 'solution' ? 'sap-icon://puzzle' : ( ${packages>TYPE} === 'innovation' ? 'sap-icon://lightbulb' : 'sap-icon://globe'))))}",
												}).addStyleClass("sapUiSmallMarginEnd"),
											
												new sap.m.VBox({
													width:'100%',
													items:		[
																new sap.m.HBox(
																{
																	justifyContent: "SpaceBetween",
																	items:	[	
																				new sap.m.Text({
																						text: "{packages>NAME}",																						 
																					}).addStyleClass("sapMObjLTitle"),
																					
																					new sap.m.Text({
																						text: "{= ${packages>NO_MO_NOTNULL} === null ? 'No MOs Assigned' : ${packages>NO_MO_NOTNULL} + ' MOs assigned'}",
																					}).addStyleClass("sapMObjLTitle"),																						
																			]
																}),
																
																new sap.m.HBox({
																	justifyContent: "SpaceBetween",
																	items: 	[
																				new sap.m.Text({
																						
																						text: "{packages>TECHNICAL_NAME}",
																				}),
																				new sap.m.Text({
																						text: "{packages>current}",																						  
																				})
																			]
																})																						
															]
												})
											]
								}).addStyleClass("sapUiSmallMarginBegin sapUiSmallMarginEnd sapUiSmallMarginTopBottom")
							]
			});
					
			var sorterCopy = new sap.ui.model.Sorter("NO_MO_NOTNULL", true);
				
			this.initializeBreadcrumbsCopy2MainToolbar();
			sap.ui.getCore().byId("searchProdForCopyidMainToolbar").setValue(null);
			sap.ui.getCore().byId("searchSolForCopyidMainToolbar").setValue(null);
			sap.ui.getCore().byId("searchGlobForCopyidMainToolbar").setValue(null);
			sap.ui.getCore().byId("searchCupdForCopyidMainToolbar").setValue(null);
					
			var packModelProd = [];
			var listPackProd = []
			var typeList = [];
			typeList['product'] = 'listPackProdCopyidMainToolbar';
			typeList['solution'] = 'listPackSolCopyidMainToolbar';
			typeList['globalization'] = 'listPackGlobCopyidMainToolbar';
			typeList['cup'] = 'listPackCupdCopyidMainToolbar';
										
			var oDataModel = new sap.ui.model.odata.ODataModel(m_xsodata);
			oDataModel.read("/CV_PROD_PACKParameters(P_NODEID=\'*')/Results/?$filter=TYPE eq '"+'product'+"' & $orderby=LEVEL",null, null, true, fSuccess, fError);
			function fSuccess(oEvent)
			{  
				listPackProd['product'] = sap.ui.getCore().byId(typeList['product']);
				packModelProd['product'] = that.createHierarchyCopy2MainToolbar(oEvent);
				listPackProd['product'].setModel(packModelProd['product'],'packages');
				listPackProd['product'].bindItems({
					path: 'packages>/',
					template: CustomListItemCopy,
					sorter: sorterCopy
				});
			};  
					
			function fError(oEvent)
			{  
				console.log("An error occured while reading Package Data!")  
			}; 	
			var oDataModelSol = new sap.ui.model.odata.ODataModel(m_xsodata);
			oDataModelSol.read("/CV_PROD_PACKParameters(P_NODEID=\'*')/Results/?$filter=TYPE eq '"+'solution'+"' & $orderby=LEVEL",null, null, true, fSuccessSol, fErrorSol);
			
			function fSuccessSol(oEvent)
			{  
				listPackProd['solution'] = sap.ui.getCore().byId(typeList['solution']);
				packModelProd['solution'] = that.createHierarchyCopy2MainToolbar(oEvent);
				listPackProd['solution'].setModel(packModelProd['solution'],'packages');
				listPackProd['solution'].bindItems({
					path: 'packages>/',
					template: CustomListItemCopy,
					sorter: sorterCopy
				});				 
			};  
				
			function fErrorSol(oEvent)
			{  
				console.log("An error occured while reading Package Data!")  
			}; 	
			var oDataModelGlob = new sap.ui.model.odata.ODataModel(m_xsodata);
			oDataModelGlob.read("/CV_PROD_PACKParameters(P_NODEID=\'*')/Results/?$filter=TYPE eq '"+'globalization'+"' & $orderby=LEVEL",null, null, true, fSuccessGlob, fErrorGlob);
			function fSuccessGlob(oEvent)
			{  
				listPackProd['globalization'] = sap.ui.getCore().byId(typeList['globalization']);
				packModelProd['globalization'] = that.createHierarchyCopy2MainToolbar(oEvent);
				listPackProd['globalization'].setModel(packModelProd['globalization'],'packages');
				listPackProd['globalization'].bindItems({
					path: 'packages>/',
					template: CustomListItemCopy,
					sorter: sorterCopy
				});			 
			};
			
			function fErrorGlob(oEvent)
			{  
				console.log("An error occured while reading Package Data!")  
			}; 	
					
			var oDataModelCupd = new sap.ui.model.odata.ODataModel(m_xsodata);
			oDataModelCupd.read("/CV_PROD_PACKParameters(P_NODEID=\'*')/Results/?$filter=TYPE eq '"+'cup'+"' & $orderby=LEVEL",null, null, true, fSuccessCupd, fErrorCupd);
			function fSuccessCupd(oEvent)
			{  
				listPackProd['cup'] = sap.ui.getCore().byId(typeList['cup']);
				packModelProd['cup'] = that.createHierarchyCopy2MainToolbar(oEvent);
				listPackProd['cup'].setModel(packModelProd['cup'],'packages');
				listPackProd['cup'].bindItems({
					path: 'packages>/',
					template: CustomListItemCopy,
					sorter: sorterCopy
				});		 
			};  
			function fErrorCupd(oEvent)
			{  
				console.log("An error occured while reading Package Data!")  
			}; 
							
		},

		handleSearchEditPackCopy2 : function(evt)
		{
			var sKey = sap.ui.getCore().byId("iconTabHierForCopyid").getSelectedKey();
			var listId = new String();
			if (sKey === 'Product')	
				listId = 'listPackProdCopyid';
			if (sKey === 'Solution')		
				listId = 'listPackSolCopyid';
			if (sKey === 'Globalization')
				listId = 'listPackGlobCopyid';
			if (sKey === 'cup')
				listId = 'listPackCupdCopyid';
			var filters = [];
			var query = evt.getParameter("newValue");
			if (query && query.length > 0)
			{
				if (query && query.length > 0) 
				{
					var filter = new sap.ui.model.Filter("NAME", sap.ui.model.FilterOperator.Contains, query);
					filters.push(filter);
				}
				var list = sap.ui.getCore().byId(listId);
				var binding = list.getBinding("items");
				var filarr = new sap.ui.model.Filter(filters);
				binding.filter(filarr);
			}
		},
				
		prefillDataForPanelCopy2 : function()
		{ 
			sap.ui.getCore().byId('panelForFirstSentenceID').removeAllContent();
			var array = [];
			var listitems = sap.ui.getCore().byId('gridPack').getContent();
			var j = 0;
			var i;
			for (i in listitems)
			{
				if (listitems[i].getContent()[0].getSelected() == true)
				{
					array[j] = listitems[i];
					j++;
				}
			}
			var x = array[0].getContent()[2].getText();
					
			sap.ui.getCore().byId('panelForFirstSentenceID').addContent(sap.ui.getCore().byId('firstLabelforPanel'));
			sap.ui.getCore().byId('panelForFirstSentenceID').addContent(new sap.m.Label({
				text : x.substring(0, x.length-5)
			}).addStyleClass("lastBreadcrumb"));
					
			var y = array.length - 1;
					
			if (y > 0)
			{
				sap.ui.getCore().byId('panelForFirstSentenceID').addContent(sap.ui.getCore().byId('labelForPack3'));
				sap.ui.getCore().byId('panelForFirstSentenceID').addContent(new sap.m.Label({
					text : y
				}).addStyleClass("lastBreadcrumb"));
				sap.ui.getCore().byId('panelForFirstSentenceID').addContent(sap.ui.getCore().byId('labelForPack4').addStyleClass("lastBreadcrumb"));
			}
					
			this.prefillDataForSecondSentence();
		},
				
		prefillDataForSecondSentence : function()
		{
			sap.ui.getCore().byId('panelForSecondSentenceID').removeAllContent();
			sap.ui.getCore().byId('panelForSecondSentenceID').addContent(sap.ui.getCore().byId('secondLabelforPanel'));
			var oDataMOdel = new sap.ui.model.odata.ODataModel(m_xsodata);	
			oDataMOdel.read("/CV_NODE_PARENTSParameters(P_NODEID=\'"+varPath+"\')/Results/?$orderby=LEVEL",null, null, true, fSuccess, fError);
			function fSuccess(oEvent)
			{  
				var parents = [];
				parents = oEvent.results; 
						
				for (var i in parents)
				{		
					if(i!=0)
						sap.ui.getCore().byId("panelForSecondSentenceID").addContent(new sap.m.Text({text : ">"}).addStyleClass("textForArrowInDialog"));
					var oLink = new sap.m.Link({
						text :parents[i].NAME,
						tooltip :parents[i].NAME,
						enabled : false
					}).addStyleClass("breadcrumbsBtn");
							
					oLink.nodeid = parents[i].RESULT_NODE;
						
					sap.ui.getCore().byId("panelForSecondSentenceID").addContent(oLink);							
				}

			};  
					
			function fError(oEvent)
			{  
				console.log("An error occured while reading Parents Data!")  
			}; 	
			this.prefillDataForThirdSentence();						
		},
				
		prefillDataForThirdSentence : function()
		{
			sap.ui.getCore().byId('otb3').addContent(sap.ui.getCore().byId('fourthLabelforPanelID'));
		},
							
		prefillDataForPanelCopy2Move : function()
		{ 
			sap.ui.getCore().byId('panelForFirstSentenceIDMove').removeAllContent();
			var array = [];
			var listitems = sap.ui.getCore().byId('gridPack').getContent();
			var j = 0;
			var i;
			for (i in listitems)
			{
				if (listitems[i].getContent()[0].getSelected() == true)
				{
					array[j] = listitems[i];
					j++;
				}
			}
			var x = array[0].getContent()[2].getText();
					
			sap.ui.getCore().byId('panelForFirstSentenceIDMove').addContent(sap.ui.getCore().byId('firstLabelforPanelMove'));
			sap.ui.getCore().byId('panelForFirstSentenceIDMove').addContent(new sap.m.Label({
				text : x.substring(0, x.length-6)
			}).addStyleClass("lastBreadcrumb"));
					
			var y = array.length - 1;
					
			if (y > 0)
			{
				sap.ui.getCore().byId('panelForFirstSentenceIDMove').addContent(sap.ui.getCore().byId('labelForPack3Move'));
				sap.ui.getCore().byId('panelForFirstSentenceIDMove').addContent(new sap.m.Label({
					text : y
				}).addStyleClass("lastBreadcrumb"));
				sap.ui.getCore().byId('panelForFirstSentenceIDMove').addContent(sap.ui.getCore().byId('labelForPack4Move').addStyleClass("lastBreadcrumb"));
			}
					
					
			this.prefillDataForSecondSentenceMove();
		},
				
		prefillDataForSecondSentenceMove : function()
		{
			sap.ui.getCore().byId('panelForSecondSentenceIDMove').removeAllContent();
			sap.ui.getCore().byId('panelForSecondSentenceIDMove').addContent(sap.ui.getCore().byId('secondLabelforPanelMove'));
			var oDataMOdel = new sap.ui.model.odata.ODataModel(m_xsodata);	
			oDataMOdel.read("/CV_NODE_PARENTSParameters(P_NODEID=\'"+varPath+"\')/Results/?$orderby=LEVEL",null, null, true, fSuccess, fError);
			function fSuccess(oEvent)
			{  
				var parents = [];
				parents = oEvent.results; 
						
				for (var i in parents)
				{		
					if(i!=0)
					sap.ui.getCore().byId("panelForSecondSentenceIDMove").addContent(new sap.m.Text({text : ">"}).addStyleClass("textForArrowInDialog"));
					var oLink = new sap.m.Link({
						text :parents[i].NAME,
						tooltip :parents[i].NAME,
						enabled : false
					}).addStyleClass("breadcrumbsBtn");
							
					oLink.nodeid = parents[i].RESULT_NODE;								
					sap.ui.getCore().byId("panelForSecondSentenceIDMove").addContent(oLink);							
				}
			};  
					
			function fError(oEvent)
			{  
				console.log("An error occured while reading Parents Data!")  
			}; 	
			this.prefillDataForThirdSentenceMove();
		},
									
		prefillDataForThirdSentenceMove : function()
		{
			sap.ui.getCore().byId('otb3Move').addContent(sap.ui.getCore().byId('fourthLabelforPanelIDMove'));
		},
								
		// --- for copy of main toolbar new enhancements
		prefillDataForPanelCopy2MainToolbar : function()
		{ 
			sap.ui.getCore().byId('panelForFirstSentenceIDMainToolbar').removeAllContent();
			sap.ui.getCore().byId('panelForFirstSentenceIDMainToolbar').addContent(sap.ui.getCore().byId('firstLabelforPanelMainToolbar'));
			
			var oDataMOdel = new sap.ui.model.odata.ODataModel(m_xsodata);	
			oDataMOdel.read("/CV_NODE_PARENTSParameters(P_NODEID=\'"+varPath+"\')/Results/?$orderby=LEVEL",null, null, true, fSuccess, fError);
			function fSuccess(oEvent)
			{  
				var parents = [];
				parents = oEvent.results; 
				var oLink = new sap.m.Link({
					text :parents[parents.length-1].NAME,
					tooltip :parents[parents.length-1].NAME,
					enabled : false
				}).addStyleClass("breadcrumbsBtn");
								
				oLink.nodeid = parents[parents.length-1].RESULT_NODE;
				sap.ui.getCore().byId("panelForFirstSentenceIDMainToolbar").addContent(oLink);	
			};  
							
			function fError(oEvent)
			{  
				console.log("An error occured while reading Parents Data!")  
			}; 	
					
			this.prefillDataForSecondSentenceMainToolbar();
		},
				
		prefillDataForSecondSentenceMainToolbar : function()
		{
			sap.ui.getCore().byId('panelForSecondSentenceIDMainToolbar').removeAllContent();
			sap.ui.getCore().byId('panelForSecondSentenceIDMainToolbar').addContent(sap.ui.getCore().byId('secondLabelforPanelMainToolbar'));
			var oDataMOdel = new sap.ui.model.odata.ODataModel(m_xsodata);	
			oDataMOdel.read("/CV_NODE_PARENTSParameters(P_NODEID=\'"+varPath+"\')/Results/?$orderby=LEVEL",null, null, true, fSuccess, fError);
			
			function fSuccess(oEvent)
			{  
				var parents = [];
				parents = oEvent.results; 
						
				for (var i in parents)
				{		
					if(i!=0)
						sap.ui.getCore().byId("panelForSecondSentenceIDMainToolbar").addContent(new sap.m.Text({text : ">"}).addStyleClass("textForArrowInDialog"));
					var oLink = new sap.m.Link({
						text :parents[i].NAME,
						tooltip :parents[i].NAME,
						enabled : false
					}).addStyleClass("breadcrumbsBtn");
							
					oLink.nodeid = parents[i].RESULT_NODE;
							
					sap.ui.getCore().byId("panelForSecondSentenceIDMainToolbar").addContent(oLink);							
				}
			};  
					
			function fError(oEvent)
			{  
				console.log("An error occured while reading Parents Data!")  
			}; 	
			this.prefillDataForThirdSentenceMainToolbar();						
		},
				
		prefillDataForThirdSentenceMainToolbar : function()
		{
			sap.ui.getCore().byId('otb3MainToolbar').addContent(sap.ui.getCore().byId('fourthLabelforPanelIDMainToolbar'));
		},
				
		// ---- end for copy of main toolbar new enhancements					
		// --- for move of main toolbar new enhancements
				
		prefillDataForPanelCopy2MainToolbarMove : function()
		{ 
			sap.ui.getCore().byId('panelForFirstSentenceIDMainToolbarMove').removeAllContent();
			sap.ui.getCore().byId('panelForFirstSentenceIDMainToolbarMove').addContent(sap.ui.getCore().byId('firstLabelforPanelMainToolbarMove'));
			
			var oDataMOdel = new sap.ui.model.odata.ODataModel(m_xsodata);	
			oDataMOdel.read("/CV_NODE_PARENTSParameters(P_NODEID=\'"+varPath+"\')/Results/?$orderby=LEVEL",null, null, true, fSuccess, fError);
			
			function fSuccess(oEvent)
			{  
				var parents = [];
				parents = oEvent.results; 
				var oLink = new sap.m.Link({
					text :parents[parents.length-1].NAME,
					tooltip :parents[parents.length-1].NAME,
					enabled : false
				}).addStyleClass("breadcrumbsBtn");
				
				oLink.nodeid = parents[parents.length-1].RESULT_NODE;
				sap.ui.getCore().byId("panelForFirstSentenceIDMainToolbarMove").addContent(oLink);	

			};  
							
			function fError(oEvent)
			{  
				console.log("An error occured while reading Parents Data!")  
			}; 	
					
			this.prefillDataForSecondSentenceMainToolbarMove();
		},
				
		prefillDataForSecondSentenceMainToolbarMove : function()
		{
			sap.ui.getCore().byId('panelForSecondSentenceIDMainToolbarMove').removeAllContent();
			sap.ui.getCore().byId('panelForSecondSentenceIDMainToolbarMove').addContent(sap.ui.getCore().byId('secondLabelforPanelMainToolbarMove'));
			var oDataMOdel = new sap.ui.model.odata.ODataModel(m_xsodata);	
			oDataMOdel.read("/CV_NODE_PARENTSParameters(P_NODEID=\'"+varPath+"\')/Results/?$orderby=LEVEL",null, null, true, fSuccess, fError);
			function fSuccess(oEvent)
			{  
				var parents = [];
				parents = oEvent.results; 
						
				for (var i in parents)
				{		
					if(i!=0)
						sap.ui.getCore().byId("panelForSecondSentenceIDMainToolbarMove").addContent(new sap.m.Text({text : ">"}).addStyleClass("textForArrowInDialog"));
					var oLink = new sap.m.Link({
						text :parents[i].NAME,
						tooltip :parents[i].NAME,
						enabled : false
					}).addStyleClass("breadcrumbsBtn");
							
					oLink.nodeid = parents[i].RESULT_NODE;
							
					sap.ui.getCore().byId("panelForSecondSentenceIDMainToolbarMove").addContent(oLink);							
				}
			};  
					
			function fError(oEvent)
			{  
				console.log("An error occured while reading Parents Data!")  
			}; 	
			this.prefillDataForThirdSentenceMainToolbarMove();
					
		},
				
		prefillDataForThirdSentenceMainToolbarMove : function()
		{
			sap.ui.getCore().byId('otb3MainToolbarMove').addContent(sap.ui.getCore().byId('fourthLabelforPanelIDMainToolbarMove'));
		},
									
		// ---- end for move of main toolbar new enhancements
		//the method editPackageForCopy2 is called when the user wants to copy a package or more to another package.
		// in this method are loaded the data for Product, Globalization and CUP Defined and also are initialized the breadcrumbs
		editPackageForCopy2 : function()
		{ 
			sKey = sap.ui.getCore().byId("iconTabHierForCopyid").getSelectedKey();
			var that = this;
					
			var CustomListItemCopy = new sap.m.CustomListItem({
				type : "{= ${packages>NO_MO_NOTNULL} === null ? 'Inactive' : 'Active'}",
					
				customData: [ 	new sap.ui.core.CustomData({
									key: "RESULT_NODE",
									value:"{packages>RESULT_NODE}"
								}),
								new sap.ui.core.CustomData({
									key: "NAME",
									value:"{packages>NAME}"
								})
							],
				content: 	[	new sap.m.HBox({
									items: 	[	new sap.ui.core.Icon({
													size: "2rem",
													color: "#107DAB",
													src: "{= ${packages>TYPE} === 'feature' ? 'sap-icon://lightbulb' : ( ${packages>TYPE} === 'product' ? 'sap-icon://add-product': ( ${packages>TYPE} === 'cup' ? 'leads' : ( ${packages>TYPE} === 'solution' ? 'sap-icon://puzzle' : ( ${packages>TYPE} === 'innovation' ? 'sap-icon://lightbulb' : 'sap-icon://globe'))))}",
												}).addStyleClass("sapUiSmallMarginEnd"),
											
												new sap.m.VBox({
													width:'100%',
													items:		[
																new sap.m.HBox(
																{
																	justifyContent: "SpaceBetween",
																	items:	[	
																				new sap.m.Text({
																						text: "{packages>NAME}",																						 
																					}).addStyleClass("sapMObjLTitle"),
																					
																					new sap.m.Text({
																						text: "{= ${packages>NO_MO_NOTNULL} === null ? 'No MOs Assigned' : ${packages>NO_MO_NOTNULL} + ' MOs assigned'}",
																					}).addStyleClass("sapMObjLTitle"),																						
																			]
																}),
																
																new sap.m.HBox({
																	justifyContent: "SpaceBetween",
																	items: 	[
																				new sap.m.Text({
																						
																						text: "{packages>TECHNICAL_NAME}",
																				}),
																				new sap.m.Text({
																						text: "{packages>current}",																						  
																				})
																			]
																})																						
															]
												})
											]
								}).addStyleClass("sapUiSmallMarginBegin sapUiSmallMarginEnd sapUiSmallMarginTopBottom")
							]
			});
					
			var sorterCopy = new sap.ui.model.Sorter("NO_MO_NOTNULL", true);

			this.initializeBreadcrumbsCopy2();
			sap.ui.getCore().byId("searchProdForCopyid").setValue(null);
			sap.ui.getCore().byId("searchSolForCopyid").setValue(null);
			sap.ui.getCore().byId("searchGlobForCopyid").setValue(null);
			sap.ui.getCore().byId("searchCupdForCopyid").setValue(null);
					
			var packModelProd = [];
			var listPackProd = []
			var typeList = [];
			typeList['product'] = 'listPackProdCopyid';
			typeList['solution'] = 'listPackSolCopyid';
			typeList['globalization'] = 'listPackGlobCopyid';
			typeList['cup'] = 'listPackCupdCopyid';
					
			var oDataModel = new sap.ui.model.odata.ODataModel(m_xsodata);
			oDataModel.read("/CV_PROD_PACKParameters(P_NODEID=\'*')/Results/?$filter=TYPE eq '"+'product'+"' & $orderby=LEVEL",null, null, true, fSuccess, fError);
			function fSuccess(oEvent)
			{  
				listPackProd['product'] = sap.ui.getCore().byId(typeList['product']);
				packModelProd['product'] = that.createHierarchyCopy2(oEvent);
				listPackProd['product'].setModel(packModelProd['product'],'packages');
				listPackProd['product'].bindItems({
					path: 'packages>/',
					template: CustomListItemCopy,
					sorter: sorterCopy
				});
			};  
					
			function fError(oEvent)
			{  
				console.log("An error occured while reading Package Data!")  
			}; 	
			var oDataModelSol = new sap.ui.model.odata.ODataModel(m_xsodata);
			oDataModelSol.read("/CV_PROD_PACKParameters(P_NODEID=\'*')/Results/?$filter=TYPE eq '"+'solution'+"' & $orderby=LEVEL",null, null, true, fSuccessSol, fErrorSol);
			function fSuccessSol(oEvent)
			{  
				listPackProd['solution'] = sap.ui.getCore().byId(typeList['solution']);
				packModelProd['solution'] = that.createHierarchyCopy2(oEvent);
				listPackProd['solution'].setModel(packModelProd['solution'],'packages');
				listPackProd['solution'].bindItems({
					path: 'packages>/',
					template: CustomListItemCopy,
					sorter: sorterCopy
				});
			};  
			function fErrorSol(oEvent)
			{  
				console.log("An error occured while reading Package Data!")  
			}; 	
			var oDataModelGlob = new sap.ui.model.odata.ODataModel(m_xsodata);
			oDataModelGlob.read("/CV_PROD_PACKParameters(P_NODEID=\'*')/Results/?$filter=TYPE eq '"+'globalization'+"' & $orderby=LEVEL",null, null, true, fSuccessGlob, fErrorGlob);
			function fSuccessGlob(oEvent)
			{  
				listPackProd['globalization'] = sap.ui.getCore().byId(typeList['globalization']);
				packModelProd['globalization'] = that.createHierarchyCopy2(oEvent);
				listPackProd['globalization'].setModel(packModelProd['globalization'],'packages');
				listPackProd['globalization'].bindItems({
					path: 'packages>/',
					template: CustomListItemCopy,
					sorter: sorterCopy
				});
			};  
			function fErrorGlob(oEvent)
			{  
				console.log("An error occured while reading Package Data!")  
			}; 	
					
			var oDataModelCupd = new sap.ui.model.odata.ODataModel(m_xsodata);
			oDataModelCupd.read("/CV_PROD_PACKParameters(P_NODEID=\'*')/Results/?$filter=TYPE eq '"+'cup'+"' & $orderby=LEVEL",null, null, true, fSuccessCupd, fErrorCupd);
			function fSuccessCupd(oEvent)
			{  
				listPackProd['cup'] = sap.ui.getCore().byId(typeList['cup']);
				packModelProd['cup'] = that.createHierarchyCopy2(oEvent);
				listPackProd['cup'].setModel(packModelProd['cup'],'packages');
				listPackProd['cup'].bindItems({
					path: 'packages>/',
					template: CustomListItemCopy,
					sorter: sorterCopy
				});			 
			};  
			function fErrorCupd(oEvent)
			{  
				console.log("An error occured while reading Package Data!")  
			}; 		
		},
				
		handleListSelect : function(evt)
		{
			var sPath = 'packages>' + evt.getParameter("listItem").getBindingContextPath() +"/children/";
			var listPack = sap.ui.getCore().byId(evt.getSource().getId());
			var that = this;	
					
			var that = this;
			var panelBreadcrumbs;
			var sKey = sap.ui.getCore().byId("iconTabHier").getSelectedKey();
			if (sKey === 'Product')
				panelBreadcrumbs = 'panelBCIDProd';
			if (sKey === 'Solution')
				panelBreadcrumbs = 'panelBCIDSol';
			if (sKey === 'Globalization')
				panelBreadcrumbs = 'panelBCIDGlob';
			if (sKey === 'cup')
				panelBreadcrumbs = 'panelBCIDCupd';
			var breadcrumb = sap.ui.getCore().byId(panelBreadcrumbs).addContent(new sap.m.Text({
				text : ">"
			}).addStyleClass("textForArrow"));
			var contentToolBar = sap.ui.getCore().byId(panelBreadcrumbs).getContent();
			for(i in contentToolBar)
			{
				contentToolBar[i].removeStyleClass('lastBreadcrumb');
			}
				
			var oLink = new sap.m.Button({
				type: sap.m.ButtonType.Transparent,
				color: '#666666',
				layoutData: new sap.m.ToolbarLayoutData({
					shrinkable: true
				}),
				press : function(evt) 
				{
					that.pressItemFromBreadcrumb(oLink);
				},
				text : evt.getParameter("listItem").getCustomData()[1].getValue('NAME'),
			}).addStyleClass('lastBreadcrumb');
			oLink.sPath = sPath;
			oLink.id = evt.getParameter("listItem").getCustomData()[0].getValue('RESULT_NODE');
			var breadcrumb = sap.ui.getCore().byId(panelBreadcrumbs).addContent(oLink);
			var breadcrumbs = sap.ui.getCore().byId(panelBreadcrumbs).getContent();
					
			var CustomListItemCopy = new sap.m.CustomListItem({
				type : "{= ${packages>NO_MO_NOTNULL} === null ? 'Inactive' : 'Active'}",
					
				customData: [ 	new sap.ui.core.CustomData({
									key: "RESULT_NODE",
									value:"{packages>RESULT_NODE}"
								}),
								new sap.ui.core.CustomData({
									key: "NAME",
									value:"{packages>NAME}"})
							],
				content: 	[	new sap.m.HBox({
									items: 	[	new sap.ui.core.Icon({
													size: "2rem",
													color: "#107DAB",
													src: "{= ${packages>TYPE} === 'feature' ? 'sap-icon://lightbulb' : ( ${packages>TYPE} === 'product' ? 'sap-icon://add-product': ( ${packages>TYPE} === 'cup' ? 'leads' : ( ${packages>TYPE} === 'solution' ? 'sap-icon://puzzle' : ( ${packages>TYPE} === 'innovation' ? 'sap-icon://lightbulb' : 'sap-icon://globe'))))}",
												}).addStyleClass("sapUiSmallMarginEnd"),
											
												new sap.m.VBox({
													width:'100%',
													items:		[
																new sap.m.HBox(
																{
																	justifyContent: "SpaceBetween",
																	items:	[	
																				new sap.m.Text({
																						text: "{packages>NAME}",																						 
																					}).addStyleClass("sapMObjLTitle"),
																					
																					new sap.m.Text({
																						text: "{= ${packages>NO_MO_NOTNULL} === null ? 'No MOs Assigned' : ${packages>NO_MO_NOTNULL} + ' MOs assigned'}",
																					}).addStyleClass("sapMObjLTitle"),																						
																			]
																}),
																
																new sap.m.HBox({
																	justifyContent: "SpaceBetween",
																	items: 	[
																				new sap.m.Text({
																						
																						text: "{packages>TECHNICAL_NAME}",
																				}),
																				new sap.m.Text({
																						text: "{packages>current}",																						  
																				})
																			]
																})																						
															]
												})
											]
								}).addStyleClass("sapUiSmallMarginBegin sapUiSmallMarginEnd sapUiSmallMarginTopBottom")
							]
			});
					
			var sorterCopy = new sap.ui.model.Sorter("NO_MO_NOTNULL", true);
			listPack.bindItems({
				path: sPath,
				template: CustomListItemCopy,
				sorter: sorterCopy
			});

		},
				
		pressItemFromBreadcrumb : function(oLink) 
		{
			var that = this;
			var index = null;
			var sKey = sap.ui.getCore().byId("iconTabHier").getSelectedKey();
			if (sKey === 'Product')
			{
				panelBreadcrumbs = 'panelBCIDProd';
				listId = 'listPackProd';
			}
						
			if (sKey === 'Solution')
			{
				panelBreadcrumbs = 'panelBCIDSol';
				listId = 'listPackSol';
			}
						
			if (sKey === 'Globalization')
			{
				panelBreadcrumbs = 'panelBCIDGlob';
				listId = 'listPackGlob';
			}
			
			if (sKey === 'cup')
			{
				panelBreadcrumbs = 'panelBCIDCupd';
				listId = 'listPackCupd';
			}							
			$.each(sap.ui.getCore().byId(panelBreadcrumbs).getContent(), function(ind, value) {
				if (value.sPath == oLink.sPath) 
				{
					index = ind;
				}
			});
			var contentToolBar = sap.ui.getCore().byId(panelBreadcrumbs).getContent();
			sap.ui.getCore().byId(panelBreadcrumbs).removeAllContent();
			var i = 0;
			contentToolBar[index].addStyleClass('lastBreadcrumb');
			while (i <= index) 
			{
				sap.ui.getCore().byId(panelBreadcrumbs).addContent(contentToolBar[i]);
				i++;
			}
			var listPack = sap.ui.getCore().byId(listId);
			var CustomListItemCopy = new sap.m.CustomListItem({
				type : "{= ${packages>NO_MO_NOTNULL} === null ? 'Inactive' : 'Active'}",
					
				customData: [ 	new sap.ui.core.CustomData({
									key: "RESULT_NODE",
									value:"{packages>RESULT_NODE}"
								}),
								new sap.ui.core.CustomData({
									key: "NAME",
									value:"{packages>NAME}"
								})
							],
				content: 	[	new sap.m.HBox({
									items: 	[	new sap.ui.core.Icon({
													size: "2rem",
													color: "#107DAB",
													src: "{= ${packages>TYPE} === 'feature' ? 'sap-icon://lightbulb' : ( ${packages>TYPE} === 'product' ? 'sap-icon://add-product': ( ${packages>TYPE} === 'cup' ? 'leads' : ( ${packages>TYPE} === 'solution' ? 'sap-icon://puzzle' : ( ${packages>TYPE} === 'innovation' ? 'sap-icon://lightbulb' : 'sap-icon://globe'))))}",
												}).addStyleClass("sapUiSmallMarginEnd"),
											
												new sap.m.VBox({
													width:'100%',
													items:		[
																new sap.m.HBox(
																{
																	justifyContent: "SpaceBetween",
																	items:	[	
																				new sap.m.Text({
																						text: "{packages>NAME}",																						 
																					}).addStyleClass("sapMObjLTitle"),
																					
																					new sap.m.Text({
																						text: "{= ${packages>NO_MO_NOTNULL} === null ? 'No MOs Assigned' : ${packages>NO_MO_NOTNULL} + ' MOs assigned'}",
																					}).addStyleClass("sapMObjLTitle"),																						
																			]
																}),
																
																new sap.m.HBox({
																	justifyContent: "SpaceBetween",
																	items: 	[
																				new sap.m.Text({
																						
																						text: "{packages>TECHNICAL_NAME}",
																				}),
																				new sap.m.Text({
																						text: "{packages>current}",																						  
																				})
																			]
																})																						
															]
												})
											]
								}).addStyleClass("sapUiSmallMarginBegin sapUiSmallMarginEnd sapUiSmallMarginTopBottom")
							]
			});
			var sorterCopy = new sap.ui.model.Sorter("NO_MO_NOTNULL", true);
			listPack.bindItems({
				path: oLink.sPath,
				template: CustomListItemCopy,
				sorter: sorterCopy
			});

		},
		
		movePack : function()
		{
			var sKey = sap.ui.getCore().byId("iconTabHier").getSelectedKey();
			if (sKey === 'Product')
				panelBreadcrumbs = 'panelBCIDProd';
			if (sKey === 'Solution')
				panelBreadcrumbs = 'panelBCIDSol';
			if (sKey === 'Globalization')
				panelBreadcrumbs = 'panelBCIDGlob';
			if (sKey === 'cup')
				panelBreadcrumbs = 'panelBCIDCupd';
					
			sap.ui.getCore().byId("parentPackageId").setText(sap.ui.getCore().byId(panelBreadcrumbs).getContent()[sap.ui.getCore().byId(panelBreadcrumbs).getContent().length-1].id);
			sap.ui.getCore().byId("productTextForPackageEditId").setText(sap.ui.getCore().byId(panelBreadcrumbs).getContent()[0].getText());
			sap.ui.getCore().byId("packageEditId").setText(sap.ui.getCore().byId(panelBreadcrumbs).getContent()[0].id);
					
			console.log(sap.ui.getCore().byId("parentPackageId").getText()); 
			console.log(sap.ui.getCore().byId("productTextForPackageEditId").getText());
			console.log(sap.ui.getCore().byId("packageEditId").getText());
		},
				
		handleSearchEditPack : function(evt)
		{
			var sKey = sap.ui.getCore().byId("iconTabHier").getSelectedKey();
			var listId = new String();
			if (sKey === 'Product')	
				listId = 'listPackProd';
			if (sKey === 'Solution')		
				listId = 'listPackSol';
			if (sKey === 'Globalization')
				listId = 'listPackGlob';
			if (sKey === 'cup')
				listId = 'listPackCupd';
			var filters = [];
			var query = evt.getParameter("newValue");
			if (query && query.length > 0) 
			{
				if (query && query.length > 0)
				{
					var filter = new sap.ui.model.Filter("NAME", sap.ui.model.FilterOperator.Contains, query);
					filters.push(filter);
				}
				var list = sap.ui.getCore().byId(listId);
				var binding = list.getBinding("items");
				var filarr = new sap.ui.model.Filter(filters);
				binding.filter(filarr);
			}
		},
				
		handleNavBack : function() 
		{
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			var config = {
				viewType: "JS",
				viewPath: "ui5_routing",
				targetControl:"splitApp",
				targetAggregation: "pages",
				clearTarget: false
			}
			router.fireRoutePatternMatched({
				name: "Detail",
				config: config,
				arguments: {contextPath: varPath}        
			});
		},
		movePackage : function(packId,parentId) 
		{
			var that = this;
			var moService = com.tutorial.service.measureobject.MeasurementObjectPackageTableFactory.getInstance();
			var moKey = packId;
			var moOb = {
				"KEY" : parentId, 
			};
			console.log(packId);
			console.log(parentId);
			moService.updateModel({
				updatedData : moOb,
				successFunc : function(notesData) 
				{
					var msg = 'Package successfully moved';
					sap.m.MessageToast.show(msg);
				},
				errorFunc : function() 
				{
					var msg = 'Package unsuccessfully moved';
					sap.m.MessageToast.show(msg);
				},
				moKey : moKey
			});
		},
				
		////the method exportCSV is called when the user wants to export the Measurement Objects table in a csv file
		exportCSV: function(oEvent) 
		{
			var oExport = new sap.ui.core.util.Export({
				exportType: new sap.ui.core.util.ExportTypeCSV({
					separatorChar: ','
				}),
				models: sap.ui.getCore().byId('tableMoForPackageId').oModels.undefined,
				rows: {path: "/moPakage"},
				columns: 	[
								{name: 'Name', template: {content: '{NAME}'}},
								{name: 'Technical Name', template: {content: '{TECHNICAL_NAME}'}},
								{name: 'Type', template: {content: '{MO_TYPE}'}},
								{name: 'UOM', template: {content: '{UNIT_OF_MEASURE}'}},
								{name: 'AGGR', template: {content: '{AGGREGATION}'}},
								{name: 'Description', template: {content: '{DESCRIPTION}'}}
							 ]
			});
			
			oExport.saveFile().always(function()
			{
				oExport.destroy();
			})
		},
				
		loadTabProducts : function() 
		{
			var titles = new sap.ui.model.json.JSONModel({
				titlePage : "Product Category"
			});
			var prodCat = new sap.ui.model.json.JSONModel();
			this.getView().setModel(prodCat, 'products');
			this.getView().setModel(titles, "titles");
			var oView = this.getView();
			sap.ui.getCore().byId("listMOPac").setVisible(false);
			sap.ui.getCore().byId("listProdMOAssign").setVisible(true);
			var oDataMOdel = new sap.ui.model.odata.ODataModel(m_xsodata);
			oDataMOdel.read("/CRP_D_PROD_SUPPORT.xml?$filter=TYPE eq 'product'", null, null, true, fSuccess, fError);
			sap.ui.getCore().byId("listProdMOAssign").setBusy(true)
			sap.ui.getCore().byId("listProdMOAssign").setBusyIndicatorDelay(0);
					
			function fSuccess(oEvent) 
			{
				var prodCat = new sap.ui.model.json.JSONModel(oEvent.results);
				sap.ui.getCore().byId("listProdMOAssign").setModel(prodCat, 'products');
				sap.ui.getCore().byId("listProdMOAssign").setBusy(false);
			};
			function fError(oEvent) 
			{
				sap.ui.getCore().byId("listProdMOAssign").setBusy(false);
				console.log("An error occured while reading Package Data!")
			};
		},

		loadTabSolutions : function() 
		{
			var that = this;
			sap.ui.getCore().byId("listMOPac").setVisible(false);
			sap.ui.getCore().byId("listProdMOAssign").setVisible(true);
			var oDataMOdel = new sap.ui.model.odata.ODataModel(m_xsodata);
			oDataMOdel.read("/CRP_D_PROD_SUPPORT.xml?$filter=TYPE eq 'solution'", null, null, true, fSuccess, fError);
			var oView = this.getView();
			sap.ui.getCore().byId("listProdMOAssign").setBusy(true).setBusyIndicatorDelay(0);
			
			function fSuccess(oEvent) 
			{
				var prodCat = new sap.ui.model.json.JSONModel(oEvent.results);
				sap.ui.getCore().byId("listProdMOAssign").setModel(prodCat, 'products');
				sap.ui.getCore().byId("listProdMOAssign").setBusy(false);
			};
			function fError(oEvent) 
			{
				sap.ui.getCore().byId("listProdMOAssign").setBusy(false);
				console.log("An error occured while reading Package Data!")
			};
		},
				
		loadTabFeatures : function() 
		{
			var that = this;
			sap.ui.getCore().byId("listMOPac").setVisible(false);
			sap.ui.getCore().byId("listProdMOAssign").setVisible(true);
			var oDataMOdel = new sap.ui.model.odata.ODataModel(m_xsodata);
			oDataMOdel.read("/CRP_D_PROD_SUPPORT.xml?$filter=TYPE eq 'innovation'", null, null, true, fSuccess, fError);
			var oView = this.getView();
			sap.ui.getCore().byId("listProdMOAssign").setBusy(true).setBusyIndicatorDelay(0);
			
			function fSuccess(oEvent) 
			{
				var prodCat = new sap.ui.model.json.JSONModel(oEvent.results);
				sap.ui.getCore().byId("listProdMOAssign").setModel(prodCat, 'products');
				sap.ui.getCore().byId("listProdMOAssign").setBusy(false);
			};
			function fError(oEvent) 
			{
				sap.ui.getCore().byId("listProdMOAssign").setBusy(false);
				console.log("An error occured while reading Package Data!")
			};
		},
				
		loadTabGlobalization : function() 
		{
			var that = this;
			sap.ui.getCore().byId("listMOPac").setVisible(false);
			sap.ui.getCore().byId("listProdMOAssign").setVisible(true);
			var oDataMOdel = new sap.ui.model.odata.ODataModel(m_xsodata);
			oDataMOdel.read("/CRP_D_PROD_SUPPORT.xml?$filter=TYPE eq 'globalization'", null, null, true, fSuccess, fError);
			var oView = this.getView();
			sap.ui.getCore().byId("listProdMOAssign").setBusy(true).setBusyIndicatorDelay(0);
			
			function fSuccess(oEvent) 
			{
				var prodCat = new sap.ui.model.json.JSONModel(oEvent.results);
				sap.ui.getCore().byId("listProdMOAssign").setModel(prodCat, 'products');
				sap.ui.getCore().byId("listProdMOAssign").setBusy(false);
			};
			function fError(oEvent) 
			{
				sap.ui.getCore().byId("listProdMOAssign").setBusy(false);
				console.log("An error occured while reading Package Data!")
			}
		},
				
		loadTabCUP : function() 
		{
			var that = this;
			sap.ui.getCore().byId("listMOPac").setVisible(false);
			sap.ui.getCore().byId("listProdMOAssign").setVisible(true);
			var oDataMOdel = new sap.ui.model.odata.ODataModel(m_xsodata);
			oDataMOdel.read("/CRP_D_PROD_SUPPORT.xml?$filter=TYPE eq 'cup'", null, null, true, fSuccess, fError);
			var oView = this.getView();
			sap.ui.getCore().byId("listProdMOAssign").setBusy(true).setBusyIndicatorDelay(0);
			
			function fSuccess(oEvent) 
			{
				var prodCat = new sap.ui.model.json.JSONModel(oEvent.results);
				sap.ui.getCore().byId("listProdMOAssign").setModel(prodCat, 'products');
				sap.ui.getCore().byId("listProdMOAssign").setBusy(false);
			};
			function fError(oEvent) 
			{
				sap.ui.getCore().byId("listProdMOAssign").setBusy(false);
				console.log("An error occured while reading Package Data!")
			};
		},
				
		loadTabUnassigned : function() 
		{
			sap.ui.getCore().byId("listMOPac").setVisible(true);
			sap.ui.getCore().byId("listProdMOAssign").setVisible(false);
			var that = this;
					
			var oDataMOdel = new sap.ui.model.odata.ODataModel(m_xsodata);
			sap.ui.getCore().byId("listMOPac").setBusy(true)
			sap.ui.getCore().byId("listMOPac").setBusyIndicatorDelay(0);
			oDataMOdel.read("/CA_PROD_MO_UNASSIGNED", null, null,true, fSuccess, fError);
			var oView = this.getView();
			function fSuccess(oEvent) 
			{
				var JSONModel = new sap.ui.model.json.JSONModel();
				JSONModel.setData(oEvent) ;
				sap.ui.getCore().byId("listMOPac").setModel(JSONModel);
				sap.ui.getCore().byId("listMOPac").setBusy(false);
			};
			function fError(oEvent) 
			{
				sap.ui.getCore().byId("listMOPac").setBusy(false);
				console.log("An error occured while reading Package Data!")
			};
		},
				
		handleIconTabBarSelect : function(oEvent)
		{
			sap.ui.getCore().byId("searchDialogAssignID").setValue(null);
			var selected = oEvent.getParameter("selectedKey");
			if (selected == 'Product') 
			{
				this.loadTabProducts();
				sap.ui.getCore().byId("assignButtonID").setEnabled(false);
			}

			if (selected == 'Solution') 
			{
				this.loadTabSolutions();
				sap.ui.getCore().byId("assignButtonID").setEnabled(false);
			}

			if (selected == 'Innovation') 
			{
				this.loadTabFeatures();
				sap.ui.getCore().byId("assignButtonID").setEnabled(false);
			}
					
			if (selected == 'Globalization') 
			{
				this.loadTabGlobalization();
				sap.ui.getCore().byId("assignButtonID").setEnabled(false);
			}
			
			if (selected == 'CUPDefined') 
			{
				this.loadTabCUP();
				sap.ui.getCore().byId("assignButtonID").setEnabled(false);
			}
					
			if (selected == 'Unassigned') 
			{
				this.loadTabUnassigned();
				sap.ui.getCore().byId("assignButtonID").setEnabled(false);
			}
		},

		//the method handleIconTabBarSelect2 is called when one of tabs (Product, Globalization or CUP Defined) is selected (from Copy Package dialog) 
		handleIconTabBarSelect2 : function(oEvent)
		{
			sap.ui.getCore().byId('otb3').removeAllContent();
			sap.ui.getCore().byId('otb3').addContent(sap.ui.getCore().byId('fourthLabelforPanelID'));
			var selected = oEvent.getParameter("selectedKey");
			if (selected == 'Product') 
			{
				this.editPackageForCopy2(oEvent)
				sap.ui.getCore().byId("buttonDialogChangeForCopyID").setEnabled(false);
				sap.ui.getCore().byId("panelBCIDProdCopyid").setVisible(true);
				sap.ui.getCore().byId("panelBCIDSolCopyid").setVisible(false);
				sap.ui.getCore().byId("panelBCIDGlobCopyid").setVisible(false);
				sap.ui.getCore().byId("panelBCIDCupdCopyid").setVisible(false);
			}

			if (selected == 'Solution') 
			{
				this.editPackageForCopy2(oEvent)
				sap.ui.getCore().byId("buttonDialogChangeForCopyID").setEnabled(false);
				sap.ui.getCore().byId("panelBCIDProdCopyid").setVisible(false);
				sap.ui.getCore().byId("panelBCIDSolCopyid").setVisible(true);
				sap.ui.getCore().byId("panelBCIDGlobCopyid").setVisible(false);
				sap.ui.getCore().byId("panelBCIDCupdCopyid").setVisible(false);
			}

			if (selected == 'Innovation') 
			{
				this.editPackageForCopy2(oEvent)
				sap.ui.getCore().byId("buttonDialogChangeForCopyID").setEnabled(false);
				sap.ui.getCore().byId("panelBCIDProdCopyid").setVisible(false);
				sap.ui.getCore().byId("panelBCIDSolCopyid").setVisible(false);
				sap.ui.getCore().byId("panelBCIDGlobCopyid").setVisible(false);
				sap.ui.getCore().byId("panelBCIDCupdCopyid").setVisible(false);
			}
					
			if (selected == 'Globalization') 
			{
				this.editPackageForCopy2(oEvent)
				sap.ui.getCore().byId("buttonDialogChangeForCopyID").setEnabled(false);
				sap.ui.getCore().byId("panelBCIDProdCopyid").setVisible(false);
				sap.ui.getCore().byId("panelBCIDSolCopyid").setVisible(false);
				sap.ui.getCore().byId("panelBCIDGlobCopyid").setVisible(true);
				sap.ui.getCore().byId("panelBCIDCupdCopyid").setVisible(false);
			}
					
			if (selected == 'cup') 
			{
				this.editPackageForCopy2(oEvent)
				sap.ui.getCore().byId("buttonDialogChangeForCopyID").setEnabled(false);
				sap.ui.getCore().byId("panelBCIDProdCopyid").setVisible(false);
				sap.ui.getCore().byId("panelBCIDSolCopyid").setVisible(false);
				sap.ui.getCore().byId("panelBCIDGlobCopyid").setVisible(false);
				sap.ui.getCore().byId("panelBCIDCupdCopyid").setVisible(true);
			}
			
			if (selected == 'Unassigned')
			{
				this.editPackageForCopy2(oEvent)
				sap.ui.getCore().byId("buttonDialogChangeForCopyID").setEnabled(false);
			}
		},
				
		//the method handleIconTabBarSelect3 is called when one of tabs (Product, Globalization or CUP Defined) is selected (from Move Package dialog) 
		handleIconTabBarSelect3 : function(oEvent)
		{
			sap.ui.getCore().byId('otb3Move').removeAllContent();
			sap.ui.getCore().byId('otb3Move').addContent(sap.ui.getCore().byId('fourthLabelforPanelIDMove'));
			var selected = oEvent.getParameter("selectedKey");
			if (selected == 'Product') 
			{
				this.editPackage2(oEvent)
				sap.ui.getCore().byId("buttonDialogChangeID").setEnabled(false);
			}

			if (selected == 'Solution') 
			{
				this.editPackage2(oEvent)
				sap.ui.getCore().byId("buttonDialogChangeID").setEnabled(false);
			}

			if (selected == 'Innovation')
			{
				this.editPackage2(oEvent)
				sap.ui.getCore().byId("buttonDialogChangeID").setEnabled(false);
			}
					
			if (selected == 'Globalization') 
			{
				this.editPackage2(oEvent)
				sap.ui.getCore().byId("buttonDialogChangeID").setEnabled(false);
			}
					
			if (selected == 'cup') 
			{
				this.editPackage2(oEvent)
				sap.ui.getCore().byId("buttonDialogChangeID").setEnabled(true);
			}
					
			if (selected == 'Unassigned') 
			{
				this.editPackage2(oEvent)
				sap.ui.getCore().byId("buttonDialogChangeID").setEnabled(false);
			}
		},
				
		//the method handleIconTabBarSelect4 is called when one of tabs (Product, Globalization or CUP Defined) is selected (from Copy Package dialog of the main toolbar) 
		handleIconTabBarSelect4 : function(oEvent)
		{
			sap.ui.getCore().byId('otb3MainToolbar').removeAllContent();
			sap.ui.getCore().byId('otb3MainToolbar').addContent(sap.ui.getCore().byId('fourthLabelforPanelIDMainToolbar'));
			var selected = oEvent.getParameter("selectedKey");
			if (selected == 'Product') 
			{
				this.editPackageForCopy2MainToolbar(oEvent)
				sap.ui.getCore().byId("buttonDialogChangeForCopyIDMainToolbar").setEnabled(false);
			}

			if (selected == 'Solution') 
			{
				this.editPackageForCopy2MainToolbar(oEvent)
				sap.ui.getCore().byId("buttonDialogChangeForCopyIDMainToolbar").setEnabled(false);
			}

			if (selected == 'Innovation') 
			{
				this.editPackageForCopy2MainToolbar(oEvent)
				sap.ui.getCore().byId("buttonDialogChangeForCopyIDMainToolbar").setEnabled(false);
			}
					
			if (selected == 'Globalization') 
			{
				this.editPackageForCopy2MainToolbar(oEvent)
				sap.ui.getCore().byId("buttonDialogChangeForCopyIDMainToolbar").setEnabled(false);
			}
					
			if (selected == 'cup') 
			{
				this.editPackageForCopy2MainToolbar(oEvent)
				sap.ui.getCore().byId("buttonDialogChangeForCopyIDMainToolbar").setEnabled(false);				
			}
					
			if (selected == 'Unassigned') 
			{
				this.editPackageForCopy2MainToolbar(oEvent)
				sap.ui.getCore().byId("buttonDialogChangeForCopyIDMainToolbar").setEnabled(false);
			}
		},
				
		//the method handleIconTabBarSelect5 is called when one of tabs (Product, Globalization or CUP Defined) is selected (from Move Package dialog of the main toolbar) 
		handleIconTabBarSelect5 : function(oEvent)
		{
			sap.ui.getCore().byId('otb3MainToolbarMove').removeAllContent();
			sap.ui.getCore().byId('otb3MainToolbarMove').addContent(sap.ui.getCore().byId('fourthLabelforPanelIDMainToolbarMove'));
			var selected = oEvent.getParameter("selectedKey");
			if (selected == 'Product') 
			{
				this.editPackage2MoveMainToolbar(oEvent)
				sap.ui.getCore().byId("buttonDialogChangeIDForMainToolbar").setEnabled(false);
			}

			if (selected == 'Solution') 
			{
				this.editPackage2MoveMainToolbar(oEvent)
				sap.ui.getCore().byId("buttonDialogChangeIDForMainToolbar").setEnabled(false);
			}

			if (selected == 'Innovation')
			{
				this.editPackage2MoveMainToolbar(oEvent)
				sap.ui.getCore().byId("buttonDialogChangeIDForMainToolbar").setEnabled(false);
			}
					
			if (selected == 'Globalization')
			{
				this.editPackage2MoveMainToolbar(oEvent)
				sap.ui.getCore().byId("buttonDialogChangeIDForMainToolbar").setEnabled(false);
			}
			
			if (selected == 'cup') 
			{
				this.editPackage2MoveMainToolbar(oEvent)
				sap.ui.getCore().byId("buttonDialogChangeIDForMainToolbar").setEnabled(true); 
			}
					
			if (selected == 'Unassigned') 
			{
				this.editPackage2MoveMainToolbar(oEvent)
				sap.ui.getCore().byId("buttonDialogChangeIDForMainToolbar").setEnabled(false);
			}
		},
				
		loadMOSingle : function() 
		{
			sap.ui.getCore().byId("listMOPacSingle").setVisible(true);
			sap.ui.getCore().byId("iconTabHierAssign").setVisible(false);
			var that = this;
			that.keyPackage = varPath;
			var monotinpackageService = com.tutorial.service.measureobject.MeasurementObjectMoNotInPackageFactory.getInstance();

			monotinpackageService.loadModel({
				endpointParam : that.keyPackage,
				successFunc : function(moData, response) 
				{
					var oModelMo = new sap.ui.model.json.JSONModel();
					oModelMo.setData(moData);
					sap.ui.getCore().byId('listMOPacSingle').setModel(oModelMo);
				},
				errorFunc : function() 
				{
				}
			});
		},
				
		handleListMOSelect : function(oEvent)
		{
			sap.ui.getCore().byId("listMOPac").setVisible(true);
			sap.ui.getCore().byId("listProdMOAssign").setVisible(false);
			var listId = oEvent.getSource().getCustomData()[0].getValue('KEY');
			var oDataMOdel = new sap.ui.model.odata.ODataModel(m_xsodata);
			sap.ui.getCore().byId("listMOPac").setBusy(true)
			sap.ui.getCore().byId("listMOPac").setBusyIndicatorDelay(0);
			oDataMOdel.read("/CA_PROD_MOParameters(P_NODEID = '" + listId + "')/Results", null, null,true, fSuccess, fError);
			var oView = this.getView();
			function fSuccess(oEvent) 
			{
				var JSONModel = new sap.ui.model.json.JSONModel();
				JSONModel.setData(oEvent) ;
				sap.ui.getCore().byId("listMOPac").setModel(JSONModel);
				sap.ui.getCore().byId("listMOPac").setBusy(false);	
			};						
			function fError(oEvent) 
			{
				sap.ui.getCore().byId("listMOPac").setBusy(false);
				console.log("An error occured while reading Package Data!")
			};
		},
				
		checkAll : function(oEvent)
		{
			var list = sap.ui.getCore().byId("listchilddata");
			list.setMode(sap.m.ListMode.MultiSelect);
		},
				
		//the method handleExpandPress is called when the expand button(...) from the toolbar is pressed. Inside this method is called the mainToolbarViewExpandedButtons method.
		handleExpandPress : function()
		{
			this.mainToolbarViewExpandedButtons();
		},
				
		handleInfoButtonSetPressed : function()
		{
			sap.ui.getCore().byId('buttonInfo').setPressed(false);
		},
				
		//the method mainToolbarViewGroupedButtons is the opposite of mainToolbarViewExpandedButtons method.
		// if the package type is CUP or custom and the user has edit authorization on the current package, then expand button and favorite button are visible
		// for other package types the copy button, share button and favorite button are visible					
		mainToolbarViewGroupedButtons : function()
		{							
			if(this.getView().getModel().getData().TYPE == 'custom' ||  this.getView().getModel().getData().TYPE == 'cup')
			{
				if(authorizationPack.EDIT == 'N')
				{
					sap.ui.getCore().byId('redoButtonelForMainToolbar').setVisible(false);
					sap.ui.getCore().byId('moveButtonIDForMainToolbar').setVisible(false);
					sap.ui.getCore().byId('copyButtonIDForMainToolbar').setVisible(false);
					sap.ui.getCore().byId('deleteItemsIdBt3ForMainToolbar').setVisible(false);
					//sap.ui.getCore().byId('editButtonFromAboveID').setVisible(false);
					sap.ui.getCore().byId('shareButtonIDForMainToolbar').setVisible(false);
					sap.ui.getCore().byId('favoriteButtonMainToolbarID').setVisible(true);
					//sap.ui.getCore().byId('expandID').setVisible(true);
				}
				else
				{
					sap.ui.getCore().byId('redoButtonelForMainToolbar').setVisible(false);
					sap.ui.getCore().byId('moveButtonIDForMainToolbar').setVisible(false);
					sap.ui.getCore().byId('copyButtonIDForMainToolbar').setVisible(false);
					sap.ui.getCore().byId('deleteItemsIdBt3ForMainToolbar').setVisible(false);
					//sap.ui.getCore().byId('editButtonFromAboveID').setVisible(false);
					sap.ui.getCore().byId('shareButtonIDForMainToolbar').setVisible(false);
					sap.ui.getCore().byId('favoriteButtonMainToolbarID').setVisible(true);
					//sap.ui.getCore().byId('expandID').setVisible(true);
				}							
			}
			else
			{
				if(authorizationPack.EDIT == 'N')
				{
					sap.ui.getCore().byId('redoButtonelForMainToolbar').setVisible(false);
					sap.ui.getCore().byId('moveButtonIDForMainToolbar').setVisible(false);
					sap.ui.getCore().byId('copyButtonIDForMainToolbar').setVisible(true);
					sap.ui.getCore().byId('deleteItemsIdBt3ForMainToolbar').setVisible(false);
					//sap.ui.getCore().byId('editButtonFromAboveID').setVisible(false);
					sap.ui.getCore().byId('shareButtonIDForMainToolbar').setVisible(true);
					sap.ui.getCore().byId('favoriteButtonMainToolbarID').setVisible(true);
					//sap.ui.getCore().byId('expandID').setVisible(false);
				}
				else
				{
					sap.ui.getCore().byId('redoButtonelForMainToolbar').setVisible(false);
					sap.ui.getCore().byId('moveButtonIDForMainToolbar').setVisible(false);
					sap.ui.getCore().byId('copyButtonIDForMainToolbar').setVisible(true);
					sap.ui.getCore().byId('deleteItemsIdBt3ForMainToolbar').setVisible(false);
					//sap.ui.getCore().byId('editButtonFromAboveID').setVisible(false);
					sap.ui.getCore().byId('shareButtonIDForMainToolbar').setVisible(true);
					sap.ui.getCore().byId('favoriteButtonMainToolbarID').setVisible(true);
					//sap.ui.getCore().byId('expandID').setVisible(false);
					sap.ui.getCore().byId('shareButtonIDForMainToolbar').setVisible(true);
				}
			}
		},

		// if the package type is CUP or custom and the user has edit authorization on the current package, then all the buttons are setted to be visible
		// if the package type is CUP or custom and the user does not have edit authorization on the current package, then move button, delete button and edit button are hidden and the others are visible
		// for other package types only the copy button, share button and favorite button are visible					
		mainToolbarViewExpandedButtons : function()
		{
			
			if(this.getView().getModel().getData().TYPE == 'custom' ||  this.getView().getModel().getData().TYPE == 'cup')
			{
				if(authorizationPack.EDIT == 'N')
				{
					//sap.ui.getCore().byId('redoButtonelForMainToolbar').setVisible(true);
					sap.ui.getCore().byId('moveButtonIDForMainToolbar').setVisible(false);
					sap.ui.getCore().byId('copyButtonIDForMainToolbar').setVisible(true);
					sap.ui.getCore().byId('deleteItemsIdBt3ForMainToolbar').setVisible(false);
					sap.ui.getCore().byId('editButtonFromAboveID').setVisible(false);
					sap.ui.getCore().byId('shareButtonIDForMainToolbar').setVisible(true);
					sap.ui.getCore().byId('favoriteButtonMainToolbarID').setVisible(true);
					//sap.ui.getCore().byId('expandID').setVisible(false);
				}
				else
				{
					//sap.ui.getCore().byId('redoButtonelForMainToolbar').setVisible(true);
					sap.ui.getCore().byId('moveButtonIDForMainToolbar').setVisible(true);
					sap.ui.getCore().byId('copyButtonIDForMainToolbar').setVisible(true);
					sap.ui.getCore().byId('deleteItemsIdBt3ForMainToolbar').setVisible(true);
					sap.ui.getCore().byId('editButtonFromAboveID').setVisible(true);
					sap.ui.getCore().byId('shareButtonIDForMainToolbar').setVisible(true);
					sap.ui.getCore().byId('favoriteButtonMainToolbarID').setVisible(true);
					//sap.ui.getCore().byId('expandID').setVisible(false);
				}
			}
			else
			{	
				if(authorizationPack.EDIT == 'N')
				{
					//sap.ui.getCore().byId('redoButtonelForMainToolbar').setVisible(false);
					sap.ui.getCore().byId('moveButtonIDForMainToolbar').setVisible(false);
					sap.ui.getCore().byId('copyButtonIDForMainToolbar').setVisible(true);
					sap.ui.getCore().byId('deleteItemsIdBt3ForMainToolbar').setVisible(false);
					sap.ui.getCore().byId('editButtonFromAboveID').setVisible(false);
					sap.ui.getCore().byId('shareButtonIDForMainToolbar').setVisible(true);
					sap.ui.getCore().byId('favoriteButtonMainToolbarID').setVisible(true);
					//sap.ui.getCore().byId('expandID').setVisible(false);
				}
				else
				{
					//sap.ui.getCore().byId('redoButtonelForMainToolbar').setVisible(false);
					sap.ui.getCore().byId('moveButtonIDForMainToolbar').setVisible(false);
					sap.ui.getCore().byId('copyButtonIDForMainToolbar').setVisible(true);
					sap.ui.getCore().byId('deleteItemsIdBt3ForMainToolbar').setVisible(false);
					sap.ui.getCore().byId('editButtonFromAboveID').setVisible(false);
					sap.ui.getCore().byId('shareButtonIDForMainToolbar').setVisible(true);
					sap.ui.getCore().byId('favoriteButtonMainToolbarID').setVisible(true);
					//sap.ui.getCore().byId('expandID').setVisible(false);
				}
			}
		},
				
		moToolbarViewButtons : function()
		{
			if(authorizationPack.EDIT == 'N')
			{
				sap.ui.getCore().byId('addAssignment').setVisible(false);
				sap.ui.getCore().byId('deleteItemsIdBt').setVisible(false);
			}
			else
			{
				sap.ui.getCore().byId('addAssignment').setVisible(true);
				sap.ui.getCore().byId('deleteItemsIdBt').setVisible(true);
					
			}
		},
				
		//the method shareButton is called when is pressed the button share from Share Package dialog
		shareButton : function()
		{
			var edit;
			var share;
			var user;
			var authObj;
			var oModel =  new sap.ui.model.odata.ODataModel(m_xsodata);
			if(authorizationPack.SHARE == 'Y')
			{
				if (sap.ui.getCore().byId('cbEditID').getSelected() == true)
					edit = 'Y'
				else 
					edit = 'N';
				if (sap.ui.getCore().byId('cbGrantID').getSelected() == true)
					share = 'Y'
				else 
					share = 'N';
						
				user =  sap.ui.getCore().byId('searchUserID').getValue()
				if (edit == 'Y')
				{
					authObj = {USER: user, ID_PACKAGE: varPath, SHARE_EDIT: share};
					console.log(authObj);
					oModel.create('/USERS_PACKAGES', authObj, null, function(){
						sap.m.MessageToast.show("Shared successful");
					},function(){
						sap.m.MessageToast.show("Share failed");
					});
				}
				else
				{
					console.log('sendEmail');
					sap.m.URLHelper.triggerEmail(user,'MO Repository Link',sap.ui.getCore().byId('textEmailID').getValue());
				}
			}
			else
			{
				sap.m.MessageToast.show("You are not allowed to edit the package");
			}
		},
		
		addButtonView: function(button,bool)
		{
			if(this.getView().getModel().getData().TYPE == 'innovation')
				sap.ui.getCore().byId(button).setVisible(false);
			else
			if(authorizationPack.EDIT == 'Y')
				sap.ui.getCore().byId(button).setVisible(bool);
			else
				sap.ui.getCore().byId(button).setVisible(false);
		},
				
		//the method searchUserID is called when is searched for an I user or a D user in the Share Package dialog
		searchUserID: function(oEvent)
		{
			var query = oEvent.getParameter("query");
			var url = "https://ifp.wdf.sap.corp/sap/bc/zxa/FIND_EMPLOYEE_JSON?query=" + query; 
			var userModel = new sap.ui.model.json.JSONModel(url).attachRequestCompleted(function(){
				sap.ui.getCore().byId('listSearch').setModel(userModel,'userModel');
				console.log('completed');
				var listSearchItem = new sap.m.StandardListItem({
					title: "{userModel>BNAME}",
					description: "{userModel>VORNA} {userModel>NACHN}"
				});
				sap.ui.getCore().byId('listSearch').bindItems({
					path:"userModel>/DATA",
					template: listSearchItem,
				});
			});
		},
				
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
						oModel.create('/USERS_PACKAGES', authObj, null, function(){
						},function(){
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

		//the method requestAccess is called when the user wants to request edit rights for the current package
		requestAccess: function()
		{
			var url = "/usag/morepository/MOREPOSITORY/WebContent/getUser.xsjs";
			var oModel =  new sap.ui.model.odata.ODataModel(m_xsodata);
			if(authorizationPack.EDIT == 'Y')
			{
				sap.m.MessageToast.show("You already have edit rights for this package");
			}
			else
			{
				jQuery.ajax({   
					url: url,   
					method: 'GET',   
					dataType: 'json',   
					success: function(user) 
					{
						username = user.USER;
						if (username != 'undefined')
						{
							authObj = {USER: username, ID_PACKAGE: varPath, SHARE_EDIT: 'N'};
							console.log(authObj);
							oModel.create('/USERS_PACKAGES', authObj, null, function(){
								sap.m.MessageToast.show("Edit request approved successful! Please refresh the page!");
							},function(){
								sap.m.MessageToast.show("Request failed");
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
			}
		}
	});