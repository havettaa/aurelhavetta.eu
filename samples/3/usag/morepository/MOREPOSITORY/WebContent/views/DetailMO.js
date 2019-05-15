sap.ui.jsview("ui5_routing.DetailMO", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf 00tsrhcp.Detail1
	 */
	getControllerName : function() {
		return "ui5_routing.DetailMO";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf 00tsrhcp.Detail1
	 */
	createContent : function(oController) {
		var that = this;
		var listItemPack = new sap.m.ObjectListItem({
			type : "{packages>visible}",
			title : "{packages>NAME}",
			number : "{packages>IS_LEAF}",
			intro : "{packages>ID}",
			attributes : new sap.m.ObjectAttribute({
				text : "{packages>PARENTS}",

			})
		});
		var listPackProd = new sap.m.List("listPackProdMO", {
			mode : sap.m.ListMode.SingleSelectMaster,
			showNoData : false
		}).addStyleClass("changeList").attachItemPress(function(oEvent) {
			oController.handleListSelect(oEvent)
		});
		var listPackSol = new sap.m.List("listPackSolMO", {
			mode : sap.m.ListMode.SingleSelectMaster,
			showNoData : false
		}).addStyleClass("changeList").attachItemPress(function(oEvent) {
			oController.handleListSelect(oEvent)
		});
		var listPackInno = new sap.m.List("listPackInnoMO", {
			mode : sap.m.ListMode.SingleSelectMaster,
			showNoData : false
		}).addStyleClass("changeList").attachItemPress(function(oEvent) {
			oController.handleListSelect(oEvent)
		});
		var listPackGlob = new sap.m.List("listPackGlobMO", {
			mode : sap.m.ListMode.SingleSelectMaster,
			showNoData : false
		}).addStyleClass("changeList").attachItemPress(function(oEvent) {
			oController.handleListSelect(oEvent)
		});

		var listPackCupd = new sap.m.List("listPackCupdMO", {
			mode : sap.m.ListMode.SingleSelectMaster,
			showNoData : false
		}).addStyleClass("changeList").attachItemPress(function(oEvent) {
			oController.handleListSelect(oEvent)
		});
		var panelBreadcrumbsProduct = new sap.m.Toolbar("panelBCIDProdMO", {
			design : sap.m.ToolbarDesign.SubHeader

		});
		var panelBreadcrumbsSolution = new sap.m.Toolbar("panelBCIDSolMO", {
			design : sap.m.ToolbarDesign.SubHeader

		});
		var panelBreadcrumbsInnovation = new sap.m.Toolbar("panelBCIDInnoMO", {
			design : sap.m.ToolbarDesign.SubHeader
		});
		var panelBreadcrumbsGlobalization = new sap.m.Toolbar("panelBCIDGlobMO", {
			design : sap.m.ToolbarDesign.SubHeader
		});

		var panelBreadcrumbsCupd = new sap.m.Toolbar("panelBCIDCupdMO", {
			design : sap.m.ToolbarDesign.SubHeader
		});

		var icontabbar = new sap.m.IconTabBar('iconTabHierMO', {

			select : function(oEvent) {
				
			}
		});
		oTab1 = new sap.m.IconTabFilter({
			text : "Product",
			key : "Product",
			icon : 'sap-icon://add-product',
			iconColor : 'Neutral',
			content : [ panelBreadcrumbsProduct, new sap.m.SearchField('searchProdMO', {
				width : "100%",
				liveChange : [ function(oEvent) {
					oController.handleSearchEditPack(oEvent);
				}, oController ]
			}), listPackProd ],
			visible : true
		});
		oTab2 = new sap.m.IconTabFilter({
			text : "Solution",
			key : "Solution",
			icon : 'sap-icon://puzzle',
			iconColor : 'Neutral',
			content : [ panelBreadcrumbsSolution, new sap.m.SearchField('searchSolMO', {
				width : "100%",
				liveChange : [ function(oEvent) {
					oController.handleSearchEditPack(oEvent);
				}, oController ]
			}), listPackSol ],
			visible : true
		});
		oTab3 = new sap.m.IconTabFilter({
			text : "Innovation",
			key : "Innovation",
			icon : 'sap-icon://lightbulb',
			iconColor : 'Neutral',
			content : [ panelBreadcrumbsInnovation, new sap.m.SearchField('searchInnoMO', {
				width : "100%",
				liveChange : [ function(oEvent) {
					oController.handleSearchEditPack(oEvent);
				}, oController ]
			}), listPackInno ],
			visible : true
		});
		oTab4 = new sap.m.IconTabFilter({
			text : "Globalization",
			key : "Globalization",
			icon : 'sap-icon://globe',
			iconColor : 'Neutral',
			content : [ panelBreadcrumbsGlobalization, new sap.m.SearchField('searchGlobMO', {
				width : "100%",
				liveChange : [ function(oEvent) {
					oController.handleSearchEditPack(oEvent);
				}, oController ]
			}), listPackGlob ],
			visible : true
		});

		oTab5 = new sap.m.IconTabFilter({
			text : "User Defined",
			key : "cup",
			icon : 'sap-icon://leads',
			iconColor : 'Neutral',
			content : [ panelBreadcrumbsCupd, new sap.m.SearchField('searchCupdMO', {
				width : "100%",
				liveChange : [ function(oEvent) {
					oController.handleSearchEditPack(oEvent);
				}, oController ]
			}), listPackCupd ],
			visible : true
		});


		icontabbar.addItem(oTab1);
		icontabbar.addItem(oTab3);
		icontabbar.addItem(oTab4);
		icontabbar.addItem(oTab5);

		var dialogChange = new sap.m.Dialog("changepackDialogIDMO", {
			title : "Add assignment",
			contentWidth : "1200px",
			contentHeight : "1000px",
			content : [ icontabbar ],
			beginButton : new sap.m.Button({
				text : "Add",
				type : sap.m.ButtonType.Accept,
				press : function() {
					oController.saveAssignment();
					dialogChange.close();
				}
			}),
			endButton : new sap.m.Button({
				text : "Cancel",
				type : sap.m.ButtonType.Reject,
				press : function() {
					dialogChange.close();
				}
			})
		});
		var editButton = new sap.uxap.ObjectPageHeaderActionButton({
			type : sap.m.ButtonType.Transparent,
			icon : "sap-icon://edit",
			press : [ function(oEvent) {
				oController.editMo(oEvent);
			}, oController ]
		});

		var myModel = oController.getMyModel(2, 3, 14);
		if (myModel) {
			if (sap.ui.getCore().byId("R1Chart"))
				sap.ui.getCore().byId("R1Chart").destroy();
			var myChart = oController.createMyChart("R1Chart", "R1 Chart", myModel);

			var oModel = new sap.ui.model.json.JSONModel({
				'businessData' : [ {
					"Country" : "Austrilia",
					"Profit" : 149
				}, {
					"Country" : "Sweden",
					"Profit" : 149
				} ]
			});

			var oDataset = new sap.viz.ui5.data.FlattenedDataset({
				'dimensions' : [ {
					name : 'CALMONTH',
					value : "{CALMONTH}"
				} ],
				measures : [ {
					name : 'USAGE',
					value : '{USAGE}'
				} ],
				'data' : {
					'path' : "/"
				}
			});

			var oVizFrame = new sap.viz.ui5.controls.VizFrame("R1vizFrame", {
				'uiConfig' : {
					'applicationSet' : 'fiori'
				},
				'vizType' : 'line',

			}).addStyleClass('chartClass');

			oVizFrame.setVizProperties({
				plotArea : {
					colorPalette : [ 'sapUiChartPaletteSemanticNeutral' ],
					gap : {
						visible : true
					}
				},

				legend : {
					title : {
						visible : false
					}
				},

				title : {
					visible : true,
					text : ''
				}
			});

			oVizFrame.setDataset(oDataset);
			oVizFrame.setModel(oModel);

			var feedPrimaryValues = new sap.viz.ui5.controls.common.feeds.FeedItem({
				'uid' : "primaryValues",
				'type' : "Measure",
				'values' : [ "USAGE" ]
			}), feedAxisLabels = new sap.viz.ui5.controls.common.feeds.FeedItem({
				'uid' : "axisLabels",
				'type' : "Dimension",
				'values' : [ "CALMONTH" ]
			});

			oVizFrame.addFeed(feedPrimaryValues);
			oVizFrame.addFeed(feedAxisLabels);
		
			oVizFrame.attachSelectData(function(event) {
				var data = event.getParameter('data');
				for (var i = 0; i < data.length; i++) {
					//console.log(oDataset.findContext(data[i].data))
				}
			});

			var chartPopover = new sap.viz.ui5.controls.Popover({});
			chartPopover.connect(oVizFrame.getVizUid());

			var dlg = new sap.m.Dialog("diaChart", {
				title : 'Last 12 months usage report',
				width : "800px",
				height : "600px",
				stretch : sap.ui.Device.system.phone ? true : false,
				beginButton : new sap.m.Button({
					text : 'Close',
					press : function() {
						dlg.close();
					}
				}),
				content : [ oVizFrame ]
			})

			var openBtn = new sap.m.Button({
				text : 'Last months usage',
				press : function() {
					myChart.invalidate();
					oController.openDialog();

				}
			})

		} else {

			var msg = 'No usage data available';
			sap.m.MessageToast.show(msg);
		}

		var deleteButton = new sap.uxap.ObjectPageHeaderActionButton(this.createId("deleteBtnDetailMO"), {
			type : sap.m.ButtonType.Transparent,
			icon : "sap-icon://delete",
			press : function(oEvent) {
				oController.deleteMO(oEvent);
			}
		});

		var iconTabBar = new sap.m.Panel({
			expanded : "{device>/isNoPhone}",
			headerToolbar : new sap.m.Toolbar({
				height : "3rem",
				content : [ new sap.m.Label({
					text : "Measurement object details"
				}), new sap.m.ToolbarSpacer(), editButton, deleteButton, openBtn ]
			}).addStyleClass("noborder"),
			content : [ new sap.ui.layout.form.SimpleForm({
				minWidth : 1024,
				content : [ new sap.m.Label({
					text : "Name"
				}), new sap.m.Text({
					text : "{/NAME}"
				}), new sap.m.Label({
					text : "Technical Name"
				}), new sap.m.Text({
					text : "{/TECHNICAL_NAME}"
				}), new sap.m.Label({
					text : "Description"
				}), new sap.m.Text({
					text : "{/DESCRIPTION}"
				}), new sap.m.Label({
					text : "Measurement Object Logic"
				}), new sap.m.Text({
					text : "{/MO_LOGIC}"
				}), new sap.m.Label({
					text : "Created by"
				}), new sap.ui.commons.Link({
					text : "{/OWNER}",
					target : "_blank",
					href : "https://people.wdf.sap.corp/profiles/{/OWNER}"
				}).addStyleClass("alignleft"), 
				new sap.m.Label({
					text : "Changed By"
				}), 	new sap.ui.commons.Link({
					text : "{/CHANGED_BY}",
					target : "_blank",
					href : "https://people.wdf.sap.corp/profiles/{/CHANGED_BY}"
				}).addStyleClass("alignleft"),
				new sap.m.Label({
					text : "Measurement Frequency"
				}), new sap.m.Text({
					text : "{/MEASUREMENT_FREQUENCY}"
				}), new sap.m.Label({
					text : "Susage Status"
				}), new sap.m.Text({
					text : "{/MEASUREMENT_METHOD}"
				}), new sap.m.Label({
					text : "Measurement Object Type"
				}), new sap.m.Text({
					text : "{/MO_TYPE}"
				}), new sap.m.Label({
					text : "Primary Value Unit of Measure"
				}), new sap.m.Text({
					text : "{/UNIT_OF_MEASURE}"
				}),// text : "{S_KPITYPE}"
				new sap.m.Label({
					text : "Primary aggregation"
				}),// text : "Primary Conversion"
				new sap.m.Text({
					text : "{/AGGREGATION}"
				}), new sap.m.Label({
					text : "Source Type"
				}), new sap.m.Text({
					text : "{/TYPE}"
				}), new sap.m.Label({
					text : "Traffic"
				}), new sap.m.Text({
					text : "{/S_ACUPTRAF}"
				}), new sap.m.Label({
					text : "Date of entry"
				}), new sap.m.Text({
					text:
					{

						path : "/DATE_OF_ENTER",
						type : new sap.ui.model.type.String(),
						
						formatter : function(oValue) {
							return (com.tutorial.util.Formatter.GetNewDate(oValue))
						}
					}
				}), new sap.m.Label({
					text : "Date of change"
				}), new sap.m.Text({
					text : "{/DATE_OF_CHANGE}"
				})]
			}).addStyleClass("noborder") ]

		});
		var oLink = new sap.m.Link({
			text : "{PRODUCT_NAME}",
			press : function(evt) {
				var context = sap.ui.getCore().byId("list").getSelectedItem().getBindingContext();
				sap.ui.getCore().byId("headertoolbarPanelId").removeAllContent();
				oLink.Text = "{PRODUCT_NAME}";

				sap.ui.getCore().byId("headertoolbarPanelId").addContent(oLink);
				oController.nav.to("Detail", context);
			}
		})

		var moHeader = new sap.uxap.ObjectPageHeader('objectHeaderMO', {
			objectTitle : "{/NAME}",
			objectImageShape : "Circle",
			objectImageURI : "{= ${/MO_TYPE} === 'NEMO' ? 'sap-icon://activate' : " + "( ${/MO_TYPE} === 'BF' ? 'sap-icon://business-by-design': "
					+ "( ${/MO_TYPE} === 'WDCA' ? 'sap-icon://dishwasher' : " + "( ${/MO_TYPE} === 'WDYA' ? 'sap-icon://internet-browser' : 'sap-icon://hint') )  )}",
			objectImageAlt : "{/MO_TYPE}",
			objectSubtitle : "Technical Name: {/TECHNICAL_NAME}",
			actions : [ editButton, deleteButton ],
			isObjectIconAlwaysVisible : true

		});

		var firstColumn = new sap.m.Text({
			//text : "Description: {/DESCRIPTION}"
		});

		var moContent = [ firstColumn ];
		var sectionDetails = new sap.uxap.ObjectPageSection({
			title : 'Details',
			subSections : [
			new sap.uxap.ObjectPageSubSection(
			{
				blocks : [ 
				new sap.ui.layout.VerticalLayout(
				{
					content :
					[ 
						new sap.m.Label({
							text : "Type: "
						}).addStyleClass("labelsMO"),
						
						new sap.m.Text({
							text : "{/MO_TYPE}"
						}).addStyleClass("textsMO"),
	
						new sap.m.Label({
							text : "Aggregation:"
						}).addStyleClass("labelsMO"),
						
						new sap.m.Text({
							text : "{/AGGREGATION}"
						}).addStyleClass("textsMO"),
						
						new sap.m.Label({
							text : "Unit of Measure:"
						}).addStyleClass("labelsMO"),
						
						new sap.m.Text({
							text : "{/UNIT_OF_MEASURE}"
						}).addStyleClass("textsMO"),
						
						new sap.m.Label({
							text : "Description: "
						}).addStyleClass("labelsMO"),
						
						new sap.m.Text({
							text : " {/DESCRIPTION}"
						}).addStyleClass("textsMO"),

					]	
				
				}),
				
				new sap.ui.layout.VerticalLayout(
				{
					content :
					[ 
					
						new sap.m.Label(
						{
							text : "Frequency:"
								
						}).addStyleClass("labelsMO"),
						
						new sap.m.Text(
						{
							text : "{/MEASUREMENT_FREQUENCY}"
								
						}).addStyleClass("textsMO"),
						
						new sap.m.Label(
						{
							text : "Method:"
								
						}).addStyleClass("labelsMO"),
						
						new sap.m.Text(
						{
							text : "{/MEASUREMENT_METHOD}"
								
						}).addStyleClass("textsMO"),
						
						new sap.m.Label(
						{
							text : "Logic: "
								
						}).addStyleClass("labelsMO"),
						
						new sap.m.Text(
						{
							text : "{/MO_LOGIC}"
								
						}).addStyleClass("textsMO")
						
					]
				}),
				
				
				
				new sap.ui.layout.VerticalLayout({
					content : [
					new sap.m.Label({
						
						text : "Created by:"
							
					}).addStyleClass("labelsMO"),
					
					new sap.ui.commons.Link({
						
						text : "{/OWNER}",
						target : "_blank",
						href : "https://people.wdf.sap.corp/profiles/{/OWNER}"
							
					}).addStyleClass("alignleft"),
					
					new sap.m.Label({
						
						text : "Changed By:"
							
					}).addStyleClass("labelsMO"),
					
					new sap.ui.commons.Link({
						
						text : "{/CHANGED_BY}",
						target : "_blank",
						href : "https://people.wdf.sap.corp/profiles/{/CHANGED_BY}"
							
					}).addStyleClass("alignleft"),
					
					new sap.m.Label({
						
						text : "Date of entry:"
							
					}).addStyleClass("labelsMO"),
					
					new sap.m.Text({

						text:
						{

							path : "/DATE_OF_ENTER",
							type : new sap.ui.model.type.String(),
							
							formatter : function(oValue) {
								return (com.tutorial.util.Formatter.GetNewDate(oValue))
							}
						}
					}).addStyleClass("textsMO"),
					new sap.m.Label({
						
						text : "Date of change:"
							
					}).addStyleClass("labelsMO"),
					
					new sap.m.Text({
						
						text:
						{

							path : "/DATE_OF_CHANGE",
							type : new sap.ui.model.type.String(),
							
							formatter : function(oValue) {
								return (com.tutorial.util.Formatter.GetNewDate(oValue))
							}
						}
							
					}).addStyleClass("textsMO") ]
				})

				]
			}) ]
		});
		var listitem = new sap.m.CustomListItem("listitemIdWhereUsedSection", {
			content : [
					new sap.ui.core.Icon({
						src : "{= ${assignments>PARENT_TYPE} === 'custom' ? 'sap-icon://open-folder' : " + "( ${assignments>PARENT_TYPE} === 'globalization' ? 'sap-icon://globe': "
								+ "( ${assignments>PARENT_TYPE} === 'add' ? 'sap-icon://add': " + "( ${assignments>PARENT_TYPE} === 'product' ? 'sap-icon://add-product' : "
								+ "( ${assignments>PARENT_TYPE} === 'solution' ? 'sap-icon://puzzle' : " + "( ${assignments>PARENT_TYPE} === 'cup' ? 'sap-icon://leads' : "
								+ "( ${assignments>PARENT_TYPE} === 'innovation' ? 'sap-icon://lightbulb' : 'sap-icon://open-folder'))) ))) }",

						color : "#009de0"
					}), new sap.m.Title({
						text : "{assignments>RESULT_NODE}"
					}), new sap.m.Label({
						text : "{assignments>KEY}",
						visible : false
					}),
			],
			type : "Active",

			tooltip : "{assignments>NAME}",
			press : function(oEvent) {
				if (oEvent.getSource().getContent()[2].getText() === 'addAss') {
					sap.ui.core.BusyIndicator.show();
					oController.addAssignment();
					
					dialogChange.open();
				} else {
					oController._oRouter.navTo("Detail", {
						contextPath : oEvent.getSource().getContent()[2].getText()
					});
				}
			}
		}).addStyleClass('objItemsDetails objItemsPacks');
		var listAss = new sap.m.List('listAssignments', {

		});
		listAss.bindItems("assignments>/", listitem);

		var sectionWhereUsed = new sap.uxap.ObjectPageSection({
			title : 'Where-Used',
			subSections : [ new sap.uxap.ObjectPageSubSection({
				blocks : [listAss ]
			}) ]
		});
		var textUsage = new sap.m.Text('textUsage', {
			text : 'No usage data available in the last 12 months'
		});
		var sectionUsage = new sap.uxap.ObjectPageSection('sectionUsage', {
			title : 'Usage',
			subSections : [ new sap.uxap.ObjectPageSubSection({
				blocks : [ new sap.ui.layout.VerticalLayout({
					content : [ textUsage, oVizFrame ]
				}) ]
			}) ]
		});
		var objectPage = new sap.uxap.ObjectPageLayout({
			headerTitle : moHeader,
			headerContent : moContent,
			sections : [ sectionDetails, sectionUsage, sectionWhereUsed ]

		});

		return new sap.m.Page({
			title : "{/NAME}",
			customHeader : new sap.m.Bar("PanelIdNav", {
				contentRight : [],
				contentLeft : [ new sap.m.Button({
					icon : "sap-icon://nav-back",
					press : function(oEvent) {
						oController.handleNavBack(oEvent);
					}
				}) ],
				design : sap.m.BarDesign.SubHeader
			}),
			content : [ objectPage ],
			footer : new sap.m.Bar({
				contentRight : []
			})
		}).addStyleClass("sapUiFioriObjectPage");
	}

});