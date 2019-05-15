sap.ui.jsview("ui5_routing.Master",
{

	// Specifies the Controller belonging to this View. In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.  @memberOf 00tsrhcp.Detail1
	getControllerName : function()
	{
		return "ui5_routing.Master";
	},

	// Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. Since the Controller is given to this method, its event handlers can be attached right away. @memberOf 00tsrhcp.Detail1
	createContent : function(oController)
	{
		var searchProducts = new sap.m.SearchField(
		{
			id: "searchFieldID",
			width : "100%",
			placeholder : "Search",
			liveChange : function(oEvent)
			{	
				oController.handleSearch(oEvent);
			},
			search : function(oEvent)
			{
				oController.handleSearch(oEvent);
			},
			layoutData : new sap.ui.layout.GridData(
			{
				span : "L7 M12 S12"
			})
		});
				

		var iconTabBarMaster = new sap.m.IconTabBar("iconTabBar1", {
			select : function(oEvent) {
				//searchProducts.setValue(null);
				oController.handleSelect(oEvent);
				//oTabAll.setVisible(false);
			},
			selectedKey : "{view>/selectedTabKey}",
			expanded : true,
			class : "sapUiResponsiveContentPadding",
			backgroundDesign : "Transparent",
			applyContentPadding : false,
		});


		oTabAll = new sap.m.IconTabFilter("tabAll", {
			icon : 'sap-icon://grid',
			iconColor : 'Neutral',
			text : "All",
			visible: true
		});
		oTabAll.setTooltip("Display all items.");
		iconTabBarMaster.addItem(oTabAll);
		
		iconTabBarMaster.addItem(new sap.m.IconTabSeparator());

		oTab1 = new sap.m.IconTabFilter("product", {
			icon : 'sap-icon://add-product',
			iconColor : 'Neutral',
			text : "Product"
		});
		oTab1.setTooltip("Products");
		iconTabBarMaster.addItem(oTab1);

		oTab2 = new sap.m.IconTabFilter("innovation", {
			icon : 'sap-icon://lightbulb',
			iconColor : 'Neutral',
			text : "Innovation"
		});
		oTab2.setTooltip("Innovation");
		iconTabBarMaster.addItem(oTab2);

		oTab4 = new sap.m.IconTabFilter("globalization", {
			icon : 'sap-icon://globe',
			iconColor : 'Neutral',
			text : "Globalization"
		});
		oTab4.setTooltip("Globalization");
		iconTabBarMaster.addItem(oTab4);

		oTab5 = new sap.m.IconTabFilter("cup", {
			icon : 'sap-icon://leads',
			iconColor : 'Neutral',
			text : "User Defined"
		});
		oTab5.setTooltip("User Defined hierarchy");
		iconTabBarMaster.addItem(oTab5);
		
		iconTabBarMaster.addItem(new sap.m.IconTabSeparator());

		oTab6 = new sap.m.IconTabFilter("m.object", {
			icon : 'sap-icon://tag',
			iconColor : 'Neutral',
			text : "Measurement Objects"
		});
		oTab6.setTooltip("Display measurememnt objects for all packages.");
		iconTabBarMaster.addItem(oTab6);
		

		// create the data model for the products facet list
		var oProductsFFL = new sap.m.FacetFilterList("listCategory",
		{
			title : "Product Category",

			key : "Products",
			items : {
				path : "prodCat>/",
				template : new sap.m.FacetFilterItem({
					text : "{prodCat>QuantityPerUnit}",
					key : ""
				})
			},
			listClose : function(oEvent) {
				oController.handleListClose(oEvent);
			}
		}).attachSelectionChange(function(oEvent) {});
		
		
		var oPriceListStatus = new sap.m.FacetFilterList("PriceListStatus_list",
				{
					title : "Price List Status",

					key : "Products",
					items : {
						path : "priceListStatusCat>/",
						template : new sap.m.FacetFilterItem({
							text : "{priceListStatusCat>PRICE_LIST_STATUS}",
							key  : ""
						})
					},
					listClose : function(oEvent) {
						oController.handleListClose(oEvent);
					}
				}).attachSelectionChange(function(oEvent) {});
		

		var exportGlobalizationButton = new sap.m.Button("idGlobalizationExpButton",
		{
			type : sap.m.ButtonType.Transparent,
			icon : "sap-icon://download",
			press : [ function(oEvent) {
				oController.exportGlobalization(oEvent);
			}, oController ],
			visible : "{= ${view>/selectedTabKey} === 'globalization' ? true : false}",

			layoutData : new sap.ui.layout.GridData({ span : "L1 M1 S1" })
		});

	

		var addCUPDefinedButton = new sap.m.Button("idCUPDefinedButton",
		{
			type : sap.m.ButtonType.Transparent,
			icon : "sap-icon://add",
			press : [ function(oEvent) {
				oController.addCUP(oEvent);
			}, oController ],
			visible : "{= ${view>/selectedTabKey} === 'cup' ? true : false}",
			layoutData : new sap.ui.layout.GridData({ span : "L1 M1 S1" })
		});

		var deleteCUPDefinedButton = new sap.m.Button(this.createId("deleteCUPDefinedID"),
		{
			type : sap.m.ButtonType.Transparent,
			icon : "sap-icon://delete",
			visible : "{= ${view>/selectedTabKey} === 'cup' ? true : false}",
			press : function(oEvent) {
				oController.switchListDeteleModeCUP();
			},
			layoutData : new sap.ui.layout.GridData({ span : "L1 M1 S1" })
		});

		var redoCUPDefinedButton = new sap.m.Button(this.createId("returnCUPDefinedID"),
		{
			type : sap.m.ButtonType.Transparent,
			icon : "sap-icon://redo",
			visible : false,
			press : function(oEvent) {
				oController.switchListSelecteModeCUP();
			},
			layoutData : new sap.ui.layout.GridData({ span : "L1 M1 S2" })
		});
		
				
		var addMODefinedButton = new sap.m.Button("addMODefinedButton",
		{
			type : sap.m.ButtonType.Transparent,
			icon : "sap-icon://add",
			press : [ function(oEvent) {
				oController.addMO(oEvent);
			}, oController ],
			visible : "{= ${view>/selectedTabKey} === 'm.object' ? true : false}",
			layoutData : new sap.ui.layout.GridData({ span : "L1 M1 S1" })
		});
		
		
		var deleteMODefinedButton = new sap.m.Button(this.createId("deleteMODefinedID"),
		{
			type : sap.m.ButtonType.Transparent,
			icon : "sap-icon://delete",
			visible : "{= ${view>/selectedTabKey} === 'm.object' ? true : false}",
			press : function(oEvent) {
				oController.switchListDeteleModeMO();
			},
			layoutData : new sap.ui.layout.GridData({ span : "L1 M1 S1" })
		});
		
		
		var redoMODefinedButton = new sap.m.Button(this.createId("returnMODefinedID"),
		{
			type : sap.m.ButtonType.Transparent,
			icon : "sap-icon://redo",
			visible : false,
			press : function(oEvent) {
				oController.switchListSelecteModeMO();
			},
			layoutData : new sap.ui.layout.GridData({ span : "L1 M1 S2" })
		});


		
		var CustomListItem = new sap.m.CustomListItem("masterCustomListItemID",
		{
			type : "{= ${products>userId} === 2 ? 'Inactive' : 'Active'}",
			press : function(oEvent) {
				oController.handleListItemPress(oEvent);
			},
			customData : new sap.ui.core.CustomData({
				key : "KEY",
				value : "{products>id}"
			}),
			content :
			[
				new sap.m.HBox(
				{
					items : 
					[
						
						new sap.ui.core.Icon(
						{
							size : "2rem",
							width : "30px",
							color : "#107DAB",
							src : "{= ${products>userId} === 2 ? 'sap-icon://lightbulb' : ( ${products>id} === 2 ? 'sap-icon://add-product' : ( ${products>id} === '3' ? 'leads' : ( ${products>id} === 4 ? 'sap-icon://puzzle' : ( ${products>id} === 5 ? 'sap-icon://lightbulb' : 'sap-icon://globe'))))}",
						}).addStyleClass("sapUiSmallMarginEnd").setTooltip(new sap.ui.commons.RichTooltip("",{title: "Type:",text:"{products>TYPE}"})),

						new sap.m.VBox(
						{
							width : '100%',
							items :
							[

								new sap.m.HBox(
								{
									justifyContent : "SpaceBetween",
									alignItems : "End",
									items :
									[ 
										new sap.m.Text({
											text : "{products>title}",
										}).addStyleClass("sapMObjLTitle"),
										
										new sap.m.Text({
											text : "{= ${products>id} === null ? '' : ${products>id} + (${products>completed} === false ? ' Packages' : ' MOs') }",
										}).addStyleClass("sapMObjLTitle")
										
									]
								}),
								
								new sap.m.HBox(
								{
									justifyContent : "SpaceBetween",
									alignItems : "End",
									items :
									[ 
										new sap.m.VBox(
										{
											items :
											[
												new sap.ui.layout.HorizontalLayout("",
												{
													content:
													[
														new sap.m.Text({
															text : "{products>title}",
														})
													]
												}),
												
												new sap.ui.layout.HorizontalLayout("",
												{
													content:
													[
														new sap.m.Text
														({
															visible: "{= ${products>PATH} === null ? false : true }",
															text : "Assigned to:  ",
														}),
														
														new sap.ui.core.Icon(
														{
															size : "1rem",
															visible:"{=${products>PATH} === null ? false : (${products>FIRSTLEVELPARENTTYPE} === null ? false : true) }",
															width : "20px",
															color : "#107DAB",
															src : "{= ${products>completed} === true ? 'sap-icon://globe' : \
																	( ${products>FIRSTLEVELPARENTTYPE} === 'custom' ? 'sap-icon://open-folder' : \
																	( ${products>FIRSTLEVELPARENTTYPE} === 'product' ? 'sap-icon://add-product' : \
																	( ${products>FIRSTLEVELPARENTTYPE} === 'feature' ? 'sap-icon://energy-saving-lightbulb' : \
																	( ${products>FIRSTLEVELPARENTTYPE} === 'PPMS Product' ? 'sap-icon://product' : \
																	( ${products>FIRSTLEVELPARENTTYPE} === 'cup' ? 'leads' : \
																	( ${products>FIRSTLEVELPARENTTYPE} === 'solution' ? 'sap-icon://puzzle' : \
																	( ${products>FIRSTLEVELPARENTTYPE} === 'm.object' ? 'sap-icon://tag' : \
																	( ${products>FIRSTLEVELPARENTTYPE} === 'innovation' ? 'sap-icon://lightbulb' : \
																	( ${products>FIRSTLEVELPARENTTYPE} === 'multiple' ? 'sap-icon://drill-down' : \
																	'sap-icon://drill-down' \
																	) ) ) ) ) ) ) ) ) }",
														})
														.setTooltip(
															new sap.ui.commons.RichTooltip("",
															{
																title: "{= ${products>FIRSTLEVELPARENTTYPE} === 'multiple' ? 'Assigned to:' : 'Type:'}", 
																text:  "{= ${products>FIRSTLEVELPARENTTYPE} === 'multiple' ? ${products>MULTIPLEPATH} : ${products>FIRSTLEVELPARENTTYPE}}",
															})
														),
														
														
														
														new sap.m.Text
														({
															visible: "{= ${products>PATH} === null ? false : true }",
															text : "{products>completed}",
														})
														.setTooltip(
															new sap.ui.commons.RichTooltip("",
															{
																title: "Assigned to:",
																text:"{products>MULTIPLEPATH}",
																visible: "{= ${products>TYPE} === 'm.object' ? true : true}",
															})
															.addStyleClass("assignedToTooltip")
														),
								
													]
												})
														
											]
										}),
												
										new sap.m.VBox(
										{
											alignItems : "End",
											items :
											[
												new sap.m.Text(
												{
												    text : "{= ${products>TYPE} === 'm.object'     && ${products>MO_TYPE}            !== null ? 'Type: ' + ${products>MO_TYPE} : \
												    		(  ${products>TYPE} === 'PPMS Product' && ${products>PRODUCT_CATEGORY.xml}   !== null ? 'Product Category: ' + ${products>PRODUCT_CATEGORY.xml} : \
												    		(  ${products>TYPE} === 'product'      && ${products>PRODUCT_CATEGORY.xml}   !== null ? 'Product Category: ' + ${products>PRODUCT_CATEGORY.xml} : \
												    		(  ${products>TYPE} === 'innovation'   && ${products>PRODUCT_ASSOCIATED} !== null ? 'Product: ' + ${products>PRODUCT_ASSOCIATED} : \
												    		'Product' \
												    		) ) ) }",
												}),
		
												new sap.m.Text(
												{
													text : "{= ${products>idUser} === 1 ? 'Product Line: ' + ${products>completed} : ''}",
												})
												
											
											]
										})
									]
								})
							]
						})
					]
				}).addStyleClass("sapUiSmallMarginBegin sapUiSmallMarginEnd sapUiSmallMarginTopBottom")
			]
		});

		
		
		
		var list = new sap.m.List("prodList", {
			growing : true,
			growingThreshold : 20,
			growingScrollToLoad : true,
			
			growingTriggerText : "More",
			enableBusyIndicator : true,
			inset : false,
			mode : sap.m.ListMode.SingleSelectMaster,
			showNoData : false,
			
			select : function(oEvent) {
				if (sap.ui.getCore().byId('idFacetFilter').getShowReset() == true) {

					console.log("FacetFilter: Reset facet filter ");

					var aLists = sap.ui.getCore().byId('idFacetFilter').getLists();
					for (var i = 0; i < aLists.length; i++) {
						aLists[i].removeSelections(true);
					}
					;
					sap.ui.getCore().byId('idFacetFilter').setShowReset(false);
				}
				oController.handleListSelect(oEvent);
				//searchProducts.setValue('');
			}
		}).attachDelete(function(oEvent) {
			oController.deleteGlobalizationSelect(oEvent);
		});
		

		var oModel = new sap.ui.model.odata.ODataModel(m_xsodata);
		//var oModel = new sap.ui.model.json.JSONModel();
		//oModel.loadData(m_xsodata + "/Products.json");
		list.setModel(oModel, "products");

		





		var CustomListItem2 = new sap.m.CustomListItem(
			{
				type : "{= ${products>userId} === 2 ? 'Inactive' : 'Active'}",
				press : function(oEvent) {
					oController.handleListItemPress(oEvent);
				},
				customData : new sap.ui.core.CustomData({
					key : "KEY",
					value : "{products>id}"
				}),
				content : [

				new sap.m.HBox(
						{
							items : [
									new sap.ui.core.Icon(
											{
												size : "2rem",
												color : "#107DAB",
												src : "{= ${products>userId} === 2 ? 'sap-icon://lightbulb' : ( ${products>id} === 2 ? 'sap-icon://add-product' : ( ${products>id} === '3' ? 'leads' : ( ${products>id} === 4 ? 'sap-icon://puzzle' : ( ${products>id} === 5 ? 'sap-icon://lightbulb' : 'sap-icon://globe'))))}",
											})
											.addStyleClass("sapUiSmallMarginEnd"),

									new sap.m.VBox(
											{
												width : '100%',
												items : [
														new sap.m.HBox(
																{
																	justifyContent : "SpaceBetween",
																	items : [
																			new sap.m.Text(
																					{
																						text : "{products>title}",

																					})
																					.addStyleClass("sapMObjLTitle"),
																			new sap.m.Text(
																					{
																						text : "{= ${products>completed} === true ? 'No MOs Assigned' : ${products>id} + ' MOs assigned'}",
																					})
																					.addStyleClass("sapMObjLTitle"),

																	]
																}),
														new sap.m.HBox(
																{
																	justifyContent : "SpaceBetween",
																	items : [ new sap.m.Text(
																			{
																				text : "{products>title}",

																			}) ]
																})

												]
											}) ]
						})
						.addStyleClass("sapUiSmallMarginBegin sapUiSmallMarginEnd sapUiSmallMarginTopBottom")

				]

			});


		var prodList = new sap.m.List("listProdMOAssign", {
			select : function(oEvent) {
				oController.handleListMOSelect(oEvent);
				
			},
			growing : true,
			growingThreshold : 20,
			noDataText : ' ',
			enableBusyIndicator : true
		});
		
		var sorter = new sap.ui.model.Sorter("NO_MO_NOTNULL", true);
		
		prodList.bindItems({
			path : "products>/",
			template : CustomListItem,
			sorter : sorter
		});

		var oModel = new sap.ui.model.json.JSONModel();
		oModel.loadData("https://jsonplaceholder.typicode.com/todos");
		prodList.setModel(oModel, "products");




		



		var oComboBox = new sap.ui.commons.ComboBox();

		var oModel = new sap.ui.model.json.JSONModel();
		oModel.loadData(m_xsodata + "/Products.json");
		oComboBox.setModel(oModel, "combo");

		//oComboBox.bindItems("combo>/products", oItemTemplate);
		oComboBox.bindItems({
			path : "combo>/products", 
			sorter : new sap.ui.model.Sorter("combo>NAME"),
			template : new sap.ui.core.ListItem({text:"{combo>NAME}"})
		});

		





		// create the facet filter control
		var ProductCategoryFilter = new sap.m.FacetFilter("idFacetFilter", {
			
			// here is where u need to use new filter
			lists : [oProductsFFL,oPriceListStatus],
			type: 'Light',
			showReset : false,

			reset : function(oEvent) {
				oController.handleReset(oEvent)
				
			},
			visible : "{= ${view>/selectedTabKey} === 'product' ? true : false}",
			showPopoverOKButton : true,
			layoutData : new sap.ui.layout.GridData({
				span : "L5 M12 S12"
			})
		})
		
		var filterPanelInnovation = new sap.ui.layout.HorizontalLayout('fpInno', {
			content : [],
			layoutData : new sap.ui.layout.GridData({
				span : "L5 M12 S12"
			}),
			visible : "{= ${view>/selectedTabKey} === 'innovation' ? true : false}",
		});
		
		var filterPanelGlob = new sap.ui.layout.HorizontalLayout('fpGlob', {
			content : [ exportGlobalizationButton ],
			layoutData : new sap.ui.layout.GridData({
				span : "L5 M12 S12"
			}),
			visible : "{= ${view>/selectedTabKey} === 'globalization' ? true : false}",
		});
		
		var filterPanelCUPDefined = new sap.ui.layout.HorizontalLayout('fpCUP', {
			content : [ addCUPDefinedButton, deleteCUPDefinedButton, redoCUPDefinedButton ],
			layoutData : new sap.ui.layout.GridData({
				span : "L5 M12 S12"
			}),
			visible : "{= ${view>/selectedTabKey} === 'cup' ? true : false}",
		});
		
		var filterPanelMODefined = new sap.ui.layout.HorizontalLayout('fpMO', {
			content : [ addMODefinedButton, deleteMODefinedButton, redoMODefinedButton ],
			layoutData : new sap.ui.layout.GridData({
				span : "L5 M12 S12"
			}),
			visible : "{= ${view>/selectedTabKey} === 'm.object' ? true : false}",
		});
		
		
		
		var filterPanel = new sap.ui.commons.layout.HorizontalLayout({
			content : [ ProductCategoryFilter, filterPanelInnovation, filterPanelGlob, filterPanelCUPDefined, filterPanelMODefined ]
		}).addStyleClass('filterContainer');

		
		return new sap.m.Page(
		{
			height : '100%',
			width : '100%',
			enableScrolling : false,
			customHeader : new sap.m.Bar({
				design : sap.m.BarDesign.SubHeader,
				visible : false
			}),
			content :
			[
				new sap.m.Panel(
				{
					height : '100%',
					content :
					[
						searchProducts,
						iconTabBarMaster,
						filterPanel,
						list,
						oComboBox,
						prodList
					]
				})
			],
			footer : new sap.m.Bar('footerMaster', { contentRight : [] })
		});
	}
});