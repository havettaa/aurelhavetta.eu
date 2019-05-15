jQuery.sap.require("sap.m.MessageToast");
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectPMOFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectNumberMOFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectPackageFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectGetChildFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectLegFactory' + m_urlVersion);

sap.ui
		.jsview(
				"ui5_routing.Detail",
				{

					getControllerName : function() {
						return "ui5_routing.Detail";
					},
					createContent : function(oController) {
						var that = this;
						this.keyPackage = '';

						var editButton = new sap.m.Button(
						{
							type : sap.m.ButtonType.Transparent,
							icon : "sap-icon://edit",
							press : [ function(oEvent) {
								oController.editMo(oEvent);
							}, oController ],
							visible : "{= ${/TYPE} === 'custom' ? true : ( ${/TYPE} === 'globalization' ? true : false )}"
						});

						var buttonDel = new sap.m.Button({
							icon : "sap-icon://sys-cancel",
							type : "Transparent",
							visible : false,
							press : function(oEvent) {

								oController.deletePackageSelect(oEvent
										.getSource().getParent());

							}
						}).addStyleClass("listPackButton buttonDelete").setTooltip("Remove assignment");

						var buttonCheck = new sap.m.CheckBox("checkOnGridID", {
							text : "{Description}",

							visible : false,
							select : function(oEvent) {

								var array = [];
								var listitems = sap.ui.getCore().byId(
										'gridPack').getContent();
								var j = 0;
								var i;
								for (i in listitems) {
									if (listitems[i].getContent()[0]
											.getSelected() == true) {
										array[j] = listitems[i]
										j++;
									}
								}

								if (array.length > 0) {
									sap.ui.getCore().byId('copyButtonIDNew')
											.setEnabled(true);
									sap.ui.getCore().byId('moveButtonIDNew')
											.setEnabled(true);
									sap.ui.getCore()
											.byId('deselectButtonIDNew')
											.setEnabled(true);
									sap.ui.getCore()
											.byId('deleteItemsIdBt3New')
											.setEnabled(true);

									sap.ui.getCore().byId('copyButtonID')
											.setEnabled(true);
									sap.ui.getCore().byId('moveButtonID')
											.setEnabled(true);
									sap.ui.getCore().byId('deselectButtonID')
											.setEnabled(true);
									sap.ui.getCore().byId('deleteItemsIdBt3')
											.setEnabled(true);
									sap.ui.getCore()
											.byId('multiSelectIdBt3New')
											.setEnabled(true);
								} else {
									sap.ui.getCore().byId('copyButtonIDNew')
											.setEnabled(false);
									sap.ui.getCore().byId('moveButtonIDNew')
											.setEnabled(false);
									sap.ui.getCore()
											.byId('deselectButtonIDNew')
											.setEnabled(false);
									sap.ui.getCore()
											.byId('deleteItemsIdBt3New')
											.setEnabled(false);

									sap.ui.getCore().byId('copyButtonID')
											.setEnabled(false);
									sap.ui.getCore().byId('moveButtonID')
											.setEnabled(false);
									sap.ui.getCore().byId('deselectButtonID')
											.setEnabled(false);
									sap.ui.getCore().byId('deleteItemsIdBt3')
											.setEnabled(false);
									sap.ui.getCore()
											.byId('multiSelectIdBt3New')
											.setEnabled(true);
								}

							}
						}).addStyleClass("listPackButtonCheck buttonCheck");

						var buttonNav = new sap.m.Button(
								{
									icon : "sap-icon://navigation-right-arrow",
									type : "Transparent",
									press : function(oEvent) {
										oController.tileSelected(oEvent
												.getSource().getParent()
												.getContent()[2].getText());
									}
								}).addStyleClass("listPackButton buttonNav");

						var listitem = new sap.m.CustomListItem(
								this.createId("listitemId"),
								{
									content : [
											buttonCheck,
											new sap.ui.core.Icon({
												//src : "sap-icon://open-folder",
												src : "{= ${childModel>TYPE} === 'PPMS Product' ? 'sap-icon://product' : ( ${childModel>TYPE} === 'feature' ? 'sap-icon://energy-saving-lightbulb' : 'sap-icon://open-folder')}",
												color : "#009de0"
											}),
											new sap.m.Title(
													{
														text : "{childModel>NAME} ({childModel>NO_MO_NOTNULL}) "
													}), new sap.m.Label({
												text : "{childModel>KEY}",
												visible : false
											}), buttonDel ],
									type : "Active",
									tooltip : "{childModel>NAME}",
									press : function(oEvent) {
										oController.switchListSelecteMode();
										oController.tileSelected(oEvent
												.getSource().getContent()[3]
												.getText());

									}
								})
								.addStyleClass('objItemsDetails objItemsPacks');

						var gridList = new sap.ui.layout.Grid("gridPack", {
							defaultSpan : 'L4 M6 S12'
						});

						gridList.bindAggregation('content',
								"childModel>/childData", listitem);

						var addButton = new sap.m.Button(
								"addButtonID",
								{
									type : sap.m.ButtonType.Transparent,
									icon : "sap-icon://add",
									tooltip : "Add",
									press : [ function(oEvent) {
										oController.addMo(oEvent);
									}, oController ],
									visible : "{= ${/TYPE} === 'innovation' ? true : false}"
								});

						var listchild = new sap.m.List("listchilddata", {
							mode : sap.m.ListMode.SingleSelectMaster,

						}).attachSelectionChange(function(oEvent) {
							oController.displayDetailsOfListChild(oEvent);
							listchild.removeSelections(true);
						}).attachDelete(function(oEvent) {
							
						});
						listchild.bindItems("childModel>/childData", listitem);
						var search = new sap.m.SearchField(
								'searchDialogAssignID', {
									liveChange : [ function(oEvent) {
										oController.handleSearch(oEvent);
									}, oController ]
								})
						var CustomListItem = new sap.m.CustomListItem(
								{
									type : "{= ${products>NO_MO} === null ? 'Inactive' : 'Active'}",
									press : function(oEvent) {
										oController.handleListMOSelect(oEvent);
									},
									customData : new sap.ui.core.CustomData({
										key : "KEY",
										value : "{products>KEY}"
									}),
									content : [

									new sap.m.HBox(
											{
												items : [
														new sap.ui.core.Icon(
																{
																	size : "2rem",
																	color : "#107DAB",
																	src : "{= ${products>TYPE} === 'feature' ? 'sap-icon://lightbulb' : ( ${products>TYPE} === 'product' ? 'sap-icon://add-product' : ( ${products>TYPE} === 'cup' ? 'leads' : ( ${products>TYPE} === 'solution' ? 'sap-icon://puzzle' : ( ${products>TYPE} === 'innovation' ? 'sap-icon://lightbulb' : 'sap-icon://globe'))))}",
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
																											text : "{products>TECHNICAL_NAME}",

																										})
																										.addStyleClass("sapMObjLTitle"),
																								new sap.m.Text(
																										{
																											text : "{= ${products>NO_MO} === null ? 'No MOs Assigned' : ${products>NO_MO} + ' MOs assigned'}",
																										})
																										.addStyleClass("sapMObjLTitle"),

																						]
																					}),
																			new sap.m.HBox(
																					{
																						justifyContent : "SpaceBetween",
																						items : [ new sap.m.Text(
																								{
																									text : "{products>NAME}",

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

						var sorter = new sap.ui.model.Sorter("NO_MO_NOTNULL",
								true);
						var filterT = new sap.ui.model.Filter("TYPE",
								sap.ui.model.FilterOperator.EQ, 'product');
						prodList.bindItems({
							path : "products>/",
							template : CustomListItem,
							sorter : sorter
						});

						var oList2 = new sap.m.List("listMOPac", {
							mode : sap.m.ListMode.MultiSelect,
							visible : false,
							growing : true,
							growingThreshold : 20,
							select : function() {
								var list;
								if (sap.ui.getCore().byId("listMOPacSingle")
										.getVisible() == true)
									list = sap.ui.getCore().byId(
											"listMOPacSingle");
								else
									list = sap.ui.getCore().byId("listMOPac");
								var moSelectedItems = list.getSelectedItems();
								if (moSelectedItems.length > 0) {
									sap.ui.getCore().byId("assignButtonID")
											.setEnabled(true);
								} else
									sap.ui.getCore().byId("assignButtonID")
											.setEnabled(false);
							}

						}).addStyleClass('MODetails');
						var oListSingle = new sap.m.List("listMOPacSingle", {
							mode : sap.m.ListMode.MultiSelect,
							layoutData : new sap.ui.layout.GridData({
								span : "L12 M12 S12"
							}),
							growing : true,
							growingThreshold : 20,
							select : function() {
								var list;
								if (sap.ui.getCore().byId("listMOPacSingle")
										.getVisible() == true)
									list = sap.ui.getCore().byId(
											"listMOPacSingle");
								else
									list = sap.ui.getCore().byId("listMOPac");
								var moSelectedItems = list.getSelectedItems();
								if (moSelectedItems.length > 0) {
									sap.ui.getCore().byId("assignButtonID")
											.setEnabled(true);
								} else
									sap.ui.getCore().byId("assignButtonID")
											.setEnabled(false);
							}

						}).addStyleClass('MODetails');

						var dialogBar = new sap.m.Bar("dialogBarId", {

							contentLeft : [search ],
							design : sap.m.BarDesign.SubHeader
						});

						var icontabbar = new sap.m.IconTabBar(
								'iconTabHierAssign',
								{
									content : [/* search */dialogBar,
											prodList, oList2 ],
									expandable : false,
									select : function(oEvent) {
										oController
												.handleIconTabBarSelect(oEvent);
									}
								});
						oTab1 = new sap.m.IconTabFilter({
							text : "Product",
							key : "Product",
							icon : 'sap-icon://add-product',
							iconColor : 'Neutral',
							visible : true
						});
						oTab2 = new sap.m.IconTabFilter({
							text : "Solution",
							key : "Solution",
							icon : 'sap-icon://puzzle',
							iconColor : 'Neutral',
							visible : true
						});
						oTab3 = new sap.m.IconTabFilter({
							text : "Innovation",
							key : "Innovation",
							icon : 'sap-icon://lightbulb',
							iconColor : 'Neutral',
							visible : true
						});
						oTab4 = new sap.m.IconTabFilter({
							text : "Globalization",
							key : "Globalization",
							icon : 'sap-icon://globe',
							iconColor : 'Neutral',
							visible : true
						});

						oTab5 = new sap.m.IconTabFilter({
							text : "User Defined",
							key : "cup",
							icon : 'sap-icon://leads',
							iconColor : 'Neutral',
							visible : true
						});
						oTab6 = new sap.m.IconTabFilter({
							text : "Unassigned",
							key : "Unassigned",
							icon : 'sap-icon://question-mark',
							iconColor : 'Neutral',
							visible : true
						});
				
						icontabbar.addItem(oTab1);
						icontabbar.addItem(oTab3);
						icontabbar.addItem(oTab4);
						icontabbar.addItem(oTab5);
						icontabbar.addItem(oTab6);

						var templateCustomList = new sap.m.CustomListItem(
								"bla",
								{
									visible : true,
									customData : [ {
										Type : "sap.ui.core.CustomData",
										key : "/results",
										value : "{ACTIVE}"
									}, {
										Type : "sap.ui.core.CustomData",
										key : "/results",
										value : "{DESCRIPTION}"
									}, {
										Type : "sap.ui.core.CustomData",
										key : "/results",
										value : "{AGGREGATION}"
									},

									{
										Type : "sap.ui.core.CustomData",
										key : "/results",
										value : "{MO_TYPE}"
									},

									{
										Type : "sap.ui.core.CustomData",
										key : "/results",
										value : "{UNIT_OF_MEASURE}"
									},

									{
										Type : "sap.ui.core.CustomData",
										key : "/results",
										value : "{NO_CUST_MO}"
									},

									{
										Type : "sap.ui.core.CustomData",
										key : "/results",
										value : "{S_ACUPTRAF}"
									}, {
										Type : "sap.ui.core.CustomData",
										key : "/results",
										value : "{TECHNICAL_NAME}"
									},

									{
										Type : "sap.ui.core.CustomData",
										key : "/results",
										value : "{DATE_OF_CHANGE}"
									},

									{
										Type : "sap.ui.core.CustomData",
										key : "/results",
										value : "{FEATURE}"
									}, {
										Type : "sap.ui.core.CustomData",
										key : "/results",
										value : "{PRODUCT}"
									}, {
										Type : "sap.ui.core.CustomData",
										key : "/results",
										value : "{SOLUTION}"
									}, {
										Type : "sap.ui.core.CustomData",
										key : "/results",
										value : "{NAME}"
									},

									],
									content : [ new sap.m.Panel(
											{

												headerToolbar : new sap.m.Toolbar(
														{
															content : [

															new sap.m.VBox(
																	{

																		items : [
																				new sap.m.Label(
																						{
																							text : "{TECHNICAL_NAME} - {NAME}"
																						}),
																				new sap.m.HBox(
																						{
																							items : [
																									new sap.ui.core.Icon(
																											{
																												src : "{= ${PARENT_TYPE} === 'custom' ? 'sap-icon://open-folder' : "
																														+ "( ${PARENT_TYPE} === 'globalization' ? 'sap-icon://globe': "
																														+ "( ${PARENT_TYPE} === 'product' ? 'sap-icon://add-product' : "
																														+ "( ${PARENT_TYPE} === 'cup' ? 'sap-icon://leads' : "
																														+ "( ${PARENT_TYPE} === 'innovation' ? 'sap-icon://lightbulb' : '') ))) }",

																												color : "#009de0"
																											}),
																									new sap.m.Text(
																											{
																												text : "{WHEREUSED}"
																											}) ]
																						}) ]
																	}) ]

														}),
												expandable : true,
												expanded : false,

												content : [
														new sap.m.Label({
															text : "{KEY}",
															visible : false
														}),
													
														new sap.ui.layout.form.SimpleForm(
																this
																		.createId("SupplierForm"),
																{
																	minWidth : 1024,
																	content : [
																			new sap.m.Label(
																					{
																						text : "Measurement Object Type"
																					}),
																			new sap.m.Text(
																					{
																						text : "{MO_TYPE}"
																					}),
																			new sap.m.Label(
																					{
																						text : "Primary Value Unit of Measure"
																					}),
																			new sap.m.Text(
																					{
																						text : "{UNIT_OF_MEASURE}"
																					}),
																			new sap.m.Label(
																					{
																						text : "Primary aggregation"
																					}),
																			new sap.m.Text(
																					{
																						text : "{AGGREGATION}"
																					}),
																			new sap.m.Label(
																					{
																						text : "Where-used"
																					}),
																			new sap.m.Text(
																					{
																						text : "{WHEREUSED}"
																					}) ]
																})
																.addStyleClass("noborder")

												]
											})
								
									]
								});

					
						var ObjectListItemMO = new sap.m.ObjectListItem({
							type : "{listItemType}",
							title : "{NAME}",
							number : "{KEY}",
							attributes : new sap.m.ObjectAttribute({
								text : "{TECHNICAL_NAME}",

							}),
							customData : [ {
								Type : "sap.ui.core.CustomData",
								key : "/results",
								value : "{ACTIVE}"
							}, {
								Type : "sap.ui.core.CustomData",
								key : "/results",
								value : "{DESCRIPTION}"
							}, {
								Type : "sap.ui.core.CustomData",
								key : "/results",
								value : "{AGGREGATION}"
							},

							{
								Type : "sap.ui.core.CustomData",
								key : "/results",
								value : "{MO_TYPE}"
							},

							{
								Type : "sap.ui.core.CustomData",
								key : "/results",
								value : "{UNIT_OF_MEASURE}"
							},

							{
								Type : "sap.ui.core.CustomData",
								key : "/results",
								value : "{NO_CUST_MO}"
							},

							{
								Type : "sap.ui.core.CustomData",
								key : "/results",
								value : "{S_ACUPTRAF}"
							}, {
								Type : "sap.ui.core.CustomData",
								key : "/results",
								value : "{TECHNICAL_NAME}"
							},

							{
								Type : "sap.ui.core.CustomData",
								key : "/results",
								value : "{DATE_OF_CHANGE}"
							},

							{
								Type : "sap.ui.core.CustomData",
								key : "/results",
								value : "{FEATURE}"
							}, {
								Type : "sap.ui.core.CustomData",
								key : "/results",
								value : "{PRODUCT}"
							}, {
								Type : "sap.ui.core.CustomData",
								key : "/results",
								value : "{SOLUTION}"
							},

							]
						}).addStyleClass('objItemsDetailsMO');

						var oSorter = new sap.ui.model.Sorter({
							path : 'WHEREUSED',

						});
						;
						oList2.bindItems("/results", templateCustomList);
						oListSingle.bindItems({
							path : "/results",
							sorter : oSorter,
							template : templateCustomList
						});

						var search = new sap.m.SearchField({
							width : "100%",
							liveChange : [ function(oEvent) {
								oController.handleSearch(oEvent);
							}, oController ]
						})

						var createNewMO = new sap.m.Button('buttonCreateID', {
							text : "Create New MO",
							icon : "sap-icon://add",
							unread : true,
							type : "Transparent",
							press : [ function(oEvent) {
								sap.ui.getCore().byId('oListDialogID').close();
								oController.addMo2(oEvent);
							}, oController

							]
						}).addStyleClass("createMO");

						var createNewMOButton = new sap.m.Button({
							text : "Create New MO",
							press : [ function(oEvent) {
								sap.ui.getCore().byId('oListDialogID').close();
								oController.addMo2(oEvent);
							}, oController

							]
						});
						var compactSizeButton = new sap.m.Button(
								'toggleCompactModeButton', {
									text : 'Toggle Compact mode',
									press : function() {
										jQuery('body').toggleClass(
												'sapUiSizeCompact');
									}
								});

						var searchMOSingle = new sap.m.SearchField({
							search : [
									function(oEvent) {
										oController.searchMOAll(oEvent,
												selectType.getSelectedKey(),
												inputType.getValue(),
												checkProduct.getSelected(),
												checkInno.getSelected(),
												checkCUP.getSelected(),
												checkGlob.getSelected(),
												panelAssigned.getExpanded());
									}, oController ],
							layoutData : new sap.ui.layout.GridData({
								span : "L7 M7 S12"
							}),
							placeholder : "Search for MO"

						});

						var itemSelect = new sap.ui.core.Item({
							key : "{select>ID}",
							text : "{select>NAME}"
						});
						var selectType = new sap.m.Select('selectType', {
							forceSelection : false,
							placeholder : "Filter by MO type",
							layoutData : new sap.ui.layout.GridData({
								span : "L4 M4 S11"
							})

						});
						selectType.bindItems("select>/OBJTYPES", itemSelect);
						var buttonClearSelect = new sap.m.Button({
							icon : "sap-icon://sys-cancel",
							type : "Transparent",
							layoutData : new sap.ui.layout.GridData({
								span : "L1 M1 S1"
							}),
							press : function(oEvent) {

								selectType.setSelectedItemId('');
							}
						});
						var inputType = new sap.m.Input({
							layoutData : new sap.ui.layout.GridData({
								span : "L12 M12 S12"
							}),
							placeholder : "Assigned to"
						});
					
						var checkProduct = new sap.m.CheckBox({
							text : "Products",
							layoutData : new sap.ui.layout.GridData({
								span : "L3 M3 S6"
							}),
							selected : true
						});
						var checkInno = new sap.m.CheckBox({
							text : "Innovation",
							layoutData : new sap.ui.layout.GridData({
								span : "L3 M3 S6"
							}),
							selected : true
						});
						var checkCUP = new sap.m.CheckBox({
							text : "User Defined",
							layoutData : new sap.ui.layout.GridData({
								span : "L3 M3 S6"
							}),
							selected : true
						});
						var checkGlob = new sap.m.CheckBox({
							text : "Globalization",
							layoutData : new sap.ui.layout.GridData({
								span : "L3 M3 S6"
							}),
							selected : true
						});
						var panelAssigned = new sap.m.Panel(
								'panelAssignments',
								{
									content : [ inputType, checkProduct,
											checkInno, checkCUP, checkGlob ],
									headerToolbar : new sap.m.Toolbar(
											{
												content : [
														new sap.m.CheckBox(
																{
																	select : function() {
																		panelAssigned
																				.setExpanded(this
																						.getSelected());
																	}
																}),
														new sap.m.Label(
																{
																	text : "Search in assignments"
																}) ]
											}),
									expandable : true,
									expanded : false,
									layoutData : new sap.ui.layout.GridData({
										span : "L12 M12 S12"
									})

								});

						var searchLayout = new sap.ui.layout.Grid({
							content : [ searchMOSingle, selectType,
									buttonClearSelect, panelAssigned,
									oListSingle ]
						});
						var oListDialog = new sap.m.Dialog(
								"oListDialogID",
								{
									title : "Assign Measurement Objects to {/NAME}",
									contentWidth : "800px",
									contentHeight : "1000px",
									content : [ searchLayout ],
									customHeader : new sap.m.Bar(
											{
												barDesign : "Header",
												contentMiddle : [ new sap.m.Title(
														{
															text : "Assign Measurement Objects to {/NAME}"
														}) ],
												contentRight : [ createNewMO ]
											}),
									beforeOpen : function() {
										 sap.ui.getCore().byId('listMOPacSingle').setModel();
										
										searchMOSingle.setValue('');
										selectType.setSelectedItemId('');
									},
									beginButton : new sap.m.Button(
											'assignButtonID',
											{
												enabled : false,
												text : "Assign",
												type : sap.m.ButtonType.Accept,
												press : function(oEvent) {
													oController
															.handleAssignMoSelected(oEvent);
												}
											}),
									endButton : new sap.m.Button({
										text : "Cancel",
										type : sap.m.ButtonType.Reject,
										press : function() {
											oListDialog.close();
											 sap.ui.getCore().byId('listMOPacSingle').getModel().refresh(true);
												
											
										}
									})
								});

						var delButton = new sap.m.Button("deleteItemsIdBt", {
							type : sap.m.ButtonType.Transparent,
							tooltip : "Unassign Measurement Objects",
							icon : "sap-icon://less",
							press : function(oEvent) {
								oController.switchListDeteleMode();
							}
						});

						var redo = new sap.m.Button(this
								.createId("returnDeleteItemsIdBt"), {
							type : sap.m.ButtonType.Transparent,
							tooltip : "Cancel",
							icon : "sap-icon://decline",
							visible : false,
							press : function(oEvent) {
								oController.switchListSelecteMode();
							}
						});
						
						/*
						var title = new sap.m.Text(
								"TitleForMeasurementObjectsAssignedID",{
									text : ("{= ${/TYPE} === 'feature' ? 'Measurement Objects assigned to this Product Feature(' +  ${moNumber>/number}  + ')' : 'Measurement Objects assigned to this Package (' + ${moNumber>/number}  + ')' }"),
								});
						*/
						
						var title = new sap.m.Text(
								"TitleForMeasurementObjectsAssignedID",{
									text : ("{= ${/TYPE} === 'feature' ? 'Measurement Objects assigned to this Product Feature' : 'Measurement Objects assigned to this Package' }"),
								});

						var oSwipe = new sap.m.Button({
							text : "Swipe Button",
							type : "Accept",
							press : function(e) {
								oTable.swipeOut();
							}
						});

						var assignButton = new sap.m.Button('addAssignment', {
							type : sap.m.ButtonType.Transparent,
							tooltip : "Assign Measurement Objects",
							icon : "sap-icon://add",
							press : function(oEvent) {
								oController.assignNewMO();
							}
						});

						var sortButton = new sap.m.Button(this
								.createId("sortButtonID"), {
							type : sap.m.ButtonType.Transparent,
							tooltip : "Sort",
							icon : "sap-icon://sort",
							press : function(oEvent) {
								vsd4.open();
							}
						});

						var downloadButton = new sap.m.Button(this
								.createId("downloadButtonID"), {
							type : sap.m.ButtonType.Transparent,
							tooltip : "Download",
							icon : "sap-icon://download",
							press : [ oController.exportCSV, oController ]
						});

						var oSorter = new sap.ui.model.Sorter({
							path : 'DATE_OF_ASSIGNMENT',
							descending : true,
						});

						var table = new sap.m.Table("tableMoForPackageId",
								{
									mode : sap.m.ListMode.SingleSelectMaster,
									sorter : oSorter,
									growing:true,
									growingThreshold: 1000,
									
									swipeContent : oSwipe,

									selectionChange : function(e) {
										sap.m.MessageToast
												.show("selection is changed");
									},

									itemPress : function(e) {
										sap.m.MessageToast
												.show("item is pressed");
									},
									columns : [
									
									new sap.m.Column({
										width : '17%',
										header : new sap.m.Label({
											text : "Name",

										}),
										demandPopin : true,
										minScreenWidth : "Tablet"
									}), new sap.m.Column({
										width : '17%',
										header : new sap.m.Label({
											text : "Technical Name",

										}),
										demandPopin : true,
										minScreenWidth : "Tablet"
									}), new sap.m.Column({
										width : '10%',
										header : new sap.m.Label({
											text : "Type",

										}),
										demandPopin : true,
										minScreenWidth : "Tablet"
									}), new sap.m.Column({
										width : '11%',
										header : new sap.m.Label({
											text : "UOM",

										}),
										demandPopin : true,
										minScreenWidth : "Tablet"
									})

									, new sap.m.Column({
										width : "11%",
										header : new sap.m.Label({
											text : "AGGR",
										}),
										demandPopin : true,
										minScreenWidth : "Tablet"
									}), new sap.m.Column({
										width : "24%",
										header : new sap.m.Label({
											text : "Description",
										}),
										demandPopin : true,
										minScreenWidth : "Tablet"
									}), new sap.m.Column({
										width : "12%",
										header : new sap.m.Label({
											text : "Assignment date",
										}),
										demandPopin : true,
										minScreenWidth : "Tablet"
									}) ]
								}).attachDelete(function(oEvent) {
							oController.deleteListSelect(oEvent);
						}).addStyleClass("objItems").attachSelectionChange(
								function(oEvent) {
									oController.handleLineItemPress(oEvent);
									table.removeSelections(true);
								});

						var oTemplate = new sap.m.ColumnListItem(
								{
									cells : [
											new sap.m.Text({
												text : "{NAME}"
											}),
											new sap.m.Text({
												text : "{TECHNICAL_NAME}"
											}),
											new sap.m.Text({
												text : "{MO_TYPE}"
											}),
											new sap.m.Text({
												text : "{UNIT_OF_MEASURE}"
											}),
											new sap.m.Text({
												text : "{AGGREGATION}"
											}),
											new sap.m.Text({
												text : "{DESCRIPTION}"
											}),
											new sap.m.Text({
													
												text:{
														path : "DATE_OF_ASSIGNMENT",
														type : new sap.ui.model.type.String(),
	
														formatter : function(oValue)
														{
																	return (com.tutorial.util.Formatter.GetNewDate(oValue))
														}
													 }
													})],
									press : function(oEvent) {
										oController.handleLineItemPress(oEvent);
									}
								});
						table.bindItems("/moPakage", oTemplate);

						var vsd4 = new sap.m.ViewSettingsDialog(
								"vsd4",
								{
									confirm : function(oEvent) {
										var p = oEvent.getParameters(), oSorter = null;

										if (p.sortItem) {
											oSorter = p.sortItem
													.getCustomData()[0]
													.getValue();
											if (oSorter) {
												oSorter.bDescending = p.sortDescending;

												table.getBinding("items").sort(
														oSorter);
											}
										}
									}
								});

						vsd4.addSortItem(new sap.m.ViewSettingsItem({
							key : "myTechNameSorter",
							text : "Technical Name",
							customData : new sap.ui.core.CustomData({
								key : "sorter",
								value : new sap.ui.model.Sorter(
										"TECHNICAL_NAME", false)
							})
						}));
						vsd4.addSortItem(new sap.m.ViewSettingsItem({
							key : "myTypeSorter",
							text : "Measurement Object Type",
							customData : new sap.ui.core.CustomData({
								key : "sorter",
								value : new sap.ui.model.Sorter("MO_TYPE",
										false)
							})
						}));
						vsd4.addSortItem(new sap.m.ViewSettingsItem({
							key : "myDOE",
							text : "Date of assignment",
							selected : true,
							customData : new sap.ui.core.CustomData({
								key : "sorterDOE",
								value : new sap.ui.model.Sorter(
										"DATE_OF_ASSIGNMENT", false)
							})
						}));

						vsd4.addSortItem(new sap.m.ViewSettingsItem({
							key : "myPerson",
							text : "Person",

						}));

						var editButton2 = new sap.m.Button({
							type : sap.m.ButtonType.Transparent,
							icon : "sap-icon://edit",
							press : [ function(oEvent) {
								oController.editMo2(oEvent);
							}, oController ]
						});

						var addButton2 = new sap.m.Button({
							type : sap.m.ButtonType.Transparent,
							icon : "sap-icon://add",
							press : [ function(oEvent) {
								oController.addMo2(oEvent);
							}, oController ]
						});
						var listItemPack = new sap.m.ObjectListItem(
								"listItemToolbarid", {
									type : "{packages>visible}",
									title : "{packages>NAME}",
									number : "{packages>IS_LEAF}",
									intro : "{packages>ID}",
									attributes : new sap.m.ObjectAttribute({
										text : "{packages>PARENTS}",

									})
								});
						var listPackProdCopy = new sap.m.List(
								"listPackProdCopyid", {
									mode : sap.m.ListMode.SingleSelectMaster,
									showNoData : false
								}).addStyleClass("changeList").attachItemPress(
								function(oEvent) {
									oController.handleListSelectCopy2(oEvent)
								});
						var listPackSolCopy = new sap.m.List(
								"listPackSolCopyid", {
									mode : sap.m.ListMode.SingleSelectMaster,
									showNoData : false
								}).addStyleClass("changeList").attachItemPress(
								function(oEvent) {
									oController.handleListSelectCopy2(oEvent)
								});
						var listPackGlobCopy = new sap.m.List(
								"listPackGlobCopyid", {
									mode : sap.m.ListMode.SingleSelectMaster,
									showNoData : false
								}).addStyleClass("changeList").attachItemPress(
								function(oEvent) {
									oController.handleListSelectCopy2(oEvent)
								});

						var listPackCupdCopy = new sap.m.List(
								"listPackCupdCopyid", {
									mode : sap.m.ListMode.SingleSelectMaster,
									showNoData : false
								}).addStyleClass("changeList").attachItemPress(
								function(oEvent) {
									oController.handleListSelectCopy2(oEvent)
								});
						var panelBreadcrumbsProductCopy = new sap.m.OverflowToolbar(
								"panelBCIDProdCopyid", {
									width : 'auto',
								}).addStyleClass("noborder");
						var panelBreadcrumbsSolutionCopy = new sap.m.OverflowToolbar(
								"panelBCIDSolCopyid", {
									width : 'auto',
								}).addStyleClass("noborder");
						var panelBreadcrumbsGlobalizationCopy = new sap.m.OverflowToolbar(
								"panelBCIDGlobCopyid", {
									width : 'auto',
								}).addStyleClass("noborder");
						var panelBreadcrumbsCupdCopy = new sap.m.OverflowToolbar(
								"panelBCIDCupdCopyid", {
									width : 'auto',
								}).addStyleClass("noborder");
						var labelForAnd = new sap.m.Label({
							text : "and"
						});

						var firstLabelforPanel = new sap.m.Label(
								'firstLabelforPanel', {
									text : "This will copy package  "
								});
						var secondLabelforPanel = new sap.m.Label(
								'secondLabelforPanel', {
									text : "from"
								});
						var thirdLabelforPanel = new sap.m.Label({
							text : "....."
						});
						var fourthLabelforPanel = new sap.m.Label(
								'fourthLabelforPanelID', {
									text : "to",
									layoutData : new sap.m.ToolbarLayoutData({
										shrinkable : true
									}),
								});
						var additioonalText = new sap.m.Label("labelForPack3",
								{
									text : "and"
								});

						var additioonalText2 = new sap.m.Label("labelForPack4",
								{
									text : "more"
								});

						var panelForFirstSentence = new sap.m.Panel(
								'panelForFirstSentenceID', {})
								.addStyleClass("noborder");

						var panelForSecondSentence = new sap.m.Panel(
								'panelForSecondSentenceID', {})
								.addStyleClass("noborder");

						var varOverflowToolbar = new sap.m.OverflowToolbar(
								"otb3", {
									width : 'auto',
								});

						var icontabbarToolbarForCopy = new sap.m.IconTabBar(
								'iconTabHierForCopyid',
								{
									expandable : false,
									select : function(oEvent) {
										oController
												.handleIconTabBarSelect2(oEvent);
									}
								});
						var scrollContainerForCopyofSelectProd = new sap.m.ScrollContainer(
								'listPackProdCopyidScroll', {
									horizontal : false,
									vertical : true,
									height : '550px',
									focusable : true,
									content : [ listPackProdCopy ]
								});
						var scrollContainerForCopyofSelectSol = new sap.m.ScrollContainer(
								'listPackSolCopyidScroll', {
									horizontal : false,
									vertical : true,
									height : '550px',
									focusable : true,
									content : [ listPackSolCopy ]
								});
						var scrollContainerForCopyofSelectGlob = new sap.m.ScrollContainer(
								'listPackGlobCopyidScroll', {
									horizontal : false,
									vertical : true,
									height : '550px',
									focusable : true,
									content : [ listPackGlobCopy ]
								});
						var scrollContainerForCopyofSelectCupd = new sap.m.ScrollContainer(
								'listPackCupdCopyidScroll', {
									horizontal : false,
									vertical : true,
									height : '550px',
									focusable : true,
									content : [ listPackCupdCopy ]
								});

						oTabToolbarForCopy1 = new sap.m.IconTabFilter(
								{
									text : "Product",
									key : "Product",
									icon : 'sap-icon://add-product',
									iconColor : 'Neutral',
									content : [
											new sap.m.SearchField(
													'searchProdForCopyid',
													{
														width : "100%",
														liveChange : [
																function(oEvent) {
																	oController
																			.handleSearchEditPackCopy2(oEvent);
																}, oController ]
													}),
											scrollContainerForCopyofSelectProd ],
									visible : true
								});

						oTabToolbarForCopy2 = new sap.m.IconTabFilter(
								{
									text : "Solution",
									key : "Solution",
									icon : 'sap-icon://puzzle',
									iconColor : 'Neutral',
									content : [
											new sap.m.SearchField(
													'searchSolForCopyid',
													{
														width : "100%",
														liveChange : [
																function(oEvent) {
																	oController
																			.handleSearchEditPackCopy2(oEvent);
																}, oController ]
													}),
											scrollContainerForCopyofSelectSol ],
									visible : true
								});
						oTabToolbarForCopy3 = new sap.m.IconTabFilter(
								{
									text : "Globalization",
									key : "Globalization",
									icon : 'sap-icon://globe',
									iconColor : 'Neutral',
									content : [
											new sap.m.SearchField(
													'searchGlobForCopyid',
													{
														width : "100%",
														liveChange : [
																function(oEvent) {
																	oController
																			.handleSearchEditPackCopy2(oEvent);
																}, oController ]
													}),
											scrollContainerForCopyofSelectGlob ],
									visible : true
								});

						oTabToolbarForCopy4 = new sap.m.IconTabFilter(
								{
									text : "User Defined",
									key : "cup",
									icon : 'sap-icon://leads',
									iconColor : 'Neutral',
									content : [
											new sap.m.SearchField(
													'searchCupdForCopyid',
													{
														width : "100%",
														liveChange : [
																function(oEvent) {
																	oController
																			.handleSearchEditPackCopy2(oEvent);
																}, oController ]
													}),
											scrollContainerForCopyofSelectCupd ],
									visible : true
								});

						icontabbarToolbarForCopy.addItem(oTabToolbarForCopy1);
						icontabbarToolbarForCopy.addItem(oTabToolbarForCopy3);
						icontabbarToolbarForCopy.addItem(oTabToolbarForCopy4);

						var dialogChangeForCopy = new sap.m.Dialog(
								"otherDialogIDForCopy",
								{
									title : "Copy Package",
									contentWidth : "800px",
									contentHeight : "1000px",
									verticalScrolling : false,
									content : [ panelForFirstSentence,
											panelForSecondSentence,
											varOverflowToolbar,
											icontabbarToolbarForCopy ],
									beginButton : new sap.m.Button(
											'buttonDialogChangeForCopyID',
											{
												text : "Copy",
												enabled : false,
												type : sap.m.ButtonType.Accept,
												press : function() {
													oController.copyAuthCheck();

													dialogChangeForCopy.close();
												}
											}),
									endButton : new sap.m.Button(
											{
												text : "Cancel",
												type : sap.m.ButtonType.Reject,
												press : function() {
													sap.ui
															.getCore()
															.byId(
																	"buttonDialogChangeForCopyID")
															.setEnabled(false);
													sap.ui.getCore().byId(
															'otb3')
															.removeAllContent();
													dialogChangeForCopy.close();
												}
											})
								});

						var listPackProdCopyMainToolbar = new sap.m.List(
								"listPackProdCopyidMainToolbar", {
									mode : sap.m.ListMode.SingleSelectMaster,
									showNoData : false
								})
								.addStyleClass("changeList")
								.attachItemPress(
										function(oEvent) {
											oController
													.handleListSelectCopy2MainToolbar(oEvent)
										});
						var listPackSolCopyMainToolbar = new sap.m.List(
								"listPackSolCopyidMainToolbar", {
									mode : sap.m.ListMode.SingleSelectMaster,
									showNoData : false
								})
								.addStyleClass("changeList")
								.attachItemPress(
										function(oEvent) {
											oController
													.handleListSelectCopy2MainToolbar(oEvent)
										});
						var listPackGlobCopyMainToolbar = new sap.m.List(
								"listPackGlobCopyidMainToolbar", {
									mode : sap.m.ListMode.SingleSelectMaster,
									showNoData : false
								})
								.addStyleClass("changeList")
								.attachItemPress(
										function(oEvent) {
											oController
													.handleListSelectCopy2MainToolbar(oEvent)
										});

						var listPackCupdCopyMainToolbar = new sap.m.List(
								"listPackCupdCopyidMainToolbar", {
									mode : sap.m.ListMode.SingleSelectMaster,
									showNoData : false
								})
								.addStyleClass("changeList")
								.attachItemPress(
										function(oEvent) {
											oController
													.handleListSelectCopy2MainToolbar(oEvent)
										});
					
						var panelBreadcrumbsProductCopyMainToolbar = new sap.m.OverflowToolbar(
								"panelBCIDProdCopyidMainToolbar", {
									width : 'auto',
								});
						var panelBreadcrumbsSolutionCopyMainToolbar = new sap.m.OverflowToolbar(
								"panelBCIDSolCopyidMainToolbar", {
									width : 'auto',
								
								});
						var panelBreadcrumbsGlobalizationCopyMainToolbar = new sap.m.OverflowToolbar(
								"panelBCIDGlobCopyidMainToolbar", {
									width : 'auto',
								
								});
						var panelBreadcrumbsCupdCopyMainToolbar = new sap.m.OverflowToolbar(
								"panelBCIDCupdCopyidMainToolbar", {
									width : 'auto',
								
								});

						var firstLabelforPanelMainToolbar = new sap.m.Label(
								'firstLabelforPanelMainToolbar', {
									text : "This will copy package  "
								});
						var secondLabelforPanelMainToolbar = new sap.m.Label(
								'secondLabelforPanelMainToolbar', {
									text : "from"
								});
						var fourthLabelforPanelMainToolbar = new sap.m.Label(
								'fourthLabelforPanelIDMainToolbar', {
									text : "to",
									layoutData : new sap.m.ToolbarLayoutData({
										shrinkable : true
									}),
								});
						var additioonalTextMainToolbar = new sap.m.Label(
								"labelForPack3MainToolbar", {
									text : "and"
								});

						var additioonalText2MainToolbar = new sap.m.Label(
								"labelForPack4MainToolbar", {
									text : "more"
								});

						var panelForFirstSentenceMainToolbar = new sap.m.Panel(
								'panelForFirstSentenceIDMainToolbar', {})
								.addStyleClass("noborder");

						var panelForSecondSentenceMainToolbar = new sap.m.Panel(
								'panelForSecondSentenceIDMainToolbar', {})
								.addStyleClass("noborder");

						var varOverflowToolbarMainToolbar = new sap.m.OverflowToolbar(
								"otb3MainToolbar", {
									width : 'auto',
								});

						var scrollContainerForCopyofSelectProdMainToolbar = new sap.m.ScrollContainer(
								'listPackProdCopyidScrollMainToolbar', {
									horizontal : false,
									vertical : true,
									height : '550px',
									focusable : true,
									content : [ listPackProdCopyMainToolbar ]
								});
						var scrollContainerForCopyofSelectSolMainToolbar = new sap.m.ScrollContainer(
								'listPackSolCopyidScrollMainToolbar', {
									horizontal : false,
									vertical : true,
									height : '550px',
									focusable : true,
									content : [ listPackSolCopyMainToolbar ]
								});
						var scrollContainerForCopyofSelectGlobMainToolbar = new sap.m.ScrollContainer(
								'listPackGlobCopyidScrollMainToolbar', {
									horizontal : false,
									vertical : true,
									height : '550px',
									focusable : true,
									content : [ listPackGlobCopyMainToolbar ]
								});
						var scrollContainerForCopyofSelectCupdMainToolbar = new sap.m.ScrollContainer(
								'listPackCupdCopyidScrollMainToolbar', {
									horizontal : false,
									vertical : true,
									height : '550px',
									focusable : true,
									content : [ listPackCupdCopyMainToolbar ]
								});

						var icontabbarToolbarForCopyMainToolbar = new sap.m.IconTabBar(
								'iconTabHierForCopyidMainToolbar',
								{
									expandable : false,
									select : function(oEvent) {
										oController
												.handleIconTabBarSelect4(oEvent);
									}

								});
						oTabToolbarForCopy1MainToolbar = new sap.m.IconTabFilter(
								{
									text : "Product",
									key : "Product",
									icon : 'sap-icon://add-product',
									iconColor : 'Neutral',
									content : [
											new sap.m.SearchField(
													'searchProdForCopyidMainToolbar',
													{
														width : "100%",
														liveChange : oController.handleSearchEditPackCopy2MainToolbar
													
													}),
											scrollContainerForCopyofSelectProdMainToolbar ],
									visible : true
								});
						oTabToolbarForCopy2MainToolbar = new sap.m.IconTabFilter(
								{
									text : "Solution",
									key : "Solution",
									icon : 'sap-icon://puzzle',
									iconColor : 'Neutral',
									content : [
											new sap.m.SearchField(
													'searchSolForCopyidMainToolbar',
													{
														width : "100%",
														liveChange : [
																function(oEvent) {
																	oController
																			.handleSearchEditPackCopy2MainToolbar(oEvent);
																}, oController ]
													}),
											scrollContainerForCopyofSelectSolMainToolbar ],
									visible : true
								});
						oTabToolbarForCopy3MainToolbar = new sap.m.IconTabFilter(
								{
									text : "Globalization",
									key : "Globalization",
									icon : 'sap-icon://globe',
									iconColor : 'Neutral',
									content : [
											new sap.m.SearchField(
													'searchGlobForCopyidMainToolbar',
													{
														width : "100%",
														liveChange : [
																function(oEvent) {
																	oController
																			.handleSearchEditPackCopy2MainToolbar(oEvent);
																}, oController ]
													}),
											scrollContainerForCopyofSelectGlobMainToolbar ],
									visible : true
								});

						oTabToolbarForCopy4MainToolbar = new sap.m.IconTabFilter(
								{
									text : "User Defined",
									key : "cup",
									icon : 'sap-icon://leads',
									iconColor : 'Neutral',
									content : [
											new sap.m.SearchField(
													'searchCupdForCopyidMainToolbar',
													{
														width : "100%",
														liveChange : [
																function(oEvent) {
																	oController
																			.handleSearchEditPackCopy2MainToolbar(oEvent);
																}, oController ]
													}),
											scrollContainerForCopyofSelectCupdMainToolbar ],
									visible : true
								});

						icontabbarToolbarForCopyMainToolbar
								.addItem(oTabToolbarForCopy1MainToolbar);
						icontabbarToolbarForCopyMainToolbar
								.addItem(oTabToolbarForCopy3MainToolbar);
						icontabbarToolbarForCopyMainToolbar
								.addItem(oTabToolbarForCopy4MainToolbar);

						var dialogChangeForCopyMainToolbar = new sap.m.Dialog(
								"otherDialogIDForCopyMainToolbar",
								{
									title : "Copy Package",
									contentWidth : "800px",
									contentHeight : "1000px",
									verticalScrolling : false,
									content : [
											panelForFirstSentenceMainToolbar,
											panelForSecondSentenceMainToolbar,
											varOverflowToolbarMainToolbar,
											icontabbarToolbarForCopyMainToolbar ],
									beginButton : new sap.m.Button(
											'buttonDialogChangeForCopyIDMainToolbar',
											{
												text : "Copy",
												enabled : false,
												type : sap.m.ButtonType.Accept,
												press : function() {
													oController
															.copyAuthCheckMain();
													dialogChangeForCopyMainToolbar
															.close();
												}
											}),
									endButton : new sap.m.Button(
											{
												text : "Cancel",
												type : sap.m.ButtonType.Reject,
												press : function() {
													sap.ui
															.getCore()
															.byId(
																	"buttonDialogChangeForCopyIDMainToolbar")
															.setEnabled(false);
													sap.ui.getCore().byId(
															'otb3MainToolbar')
															.removeAllContent();
													dialogChangeForCopyMainToolbar
															.close();
												}
											})
								});
						var copyButton = new sap.m.Button("copyButtonID", {
							type : sap.m.ButtonType.Transparent,
							icon : "sap-icon://duplicate",
							tooltip : "Copy",
							enabled : true,
							visible : false,
							press : function(oEvent) {
								oController.prefillDataForPanelCopy2(oEvent);
								oController.editPackageForCopy2(oEvent);
								dialogChangeForCopy.open();

							}
						});
				
						var listPackProd = new sap.m.List("listPackProdid", {
							mode : sap.m.ListMode.SingleSelectMaster,
							showNoData : false,
						}).addStyleClass("changeList").attachItemPress(
								function(oEvent) {
									oController.handleListSelect2(oEvent)
								});
						var listPackSol = new sap.m.List("listPackSolid", {
							mode : sap.m.ListMode.SingleSelectMaster,
							showNoData : false
						}).addStyleClass("changeList").attachItemPress(
								function(oEvent) {
									oController.handleListSelect2(oEvent)
								});
						var listPackGlob = new sap.m.List("listPackGlobid", {
							mode : sap.m.ListMode.SingleSelectMaster,
							showNoData : false
						}).addStyleClass("changeList").attachItemPress(
								function(oEvent) {
									oController.handleListSelect2(oEvent)
								});

						var listPackCupd = new sap.m.List("listPackCupdid", {
							mode : sap.m.ListMode.SingleSelectMaster,
							showNoData : false
						}).addStyleClass("changeList").attachItemPress(
								function(oEvent) {
									oController.handleListSelect2(oEvent)
								});
						var panelBreadcrumbsProduct = new sap.m.Toolbar(
								"panelBCIDProdid", {
									design : sap.m.ToolbarDesign.SubHeader

								});
						var panelBreadcrumbsSolution = new sap.m.Toolbar(
								"panelBCIDSolid", {
									design : sap.m.ToolbarDesign.SubHeader

								});
						var panelBreadcrumbsGlobalization = new sap.m.Toolbar(
								"panelBCIDGlobid", {
									design : sap.m.ToolbarDesign.SubHeader
								});
						var panelBreadcrumbsCupd = new sap.m.Toolbar(
								"panelBCIDCupdid", {
									design : sap.m.ToolbarDesign.SubHeader
								});

						var icontabbarToolbar = new sap.m.IconTabBar(
								'iconTabHierid',
								{
									expandable : false,
									select : function(oEvent) {
										oController
												.handleIconTabBarSelect3(oEvent);
									}
								});
						var firstLabelforPanelMove = new sap.m.Label(
								'firstLabelforPanelMove', {
									text : "This will move package  "
								});
						var secondLabelforPanelMove = new sap.m.Label(
								'secondLabelforPanelMove', {
									text : "from"
								});

						var fourthLabelforPanelMove = new sap.m.Label(
								'fourthLabelforPanelIDMove', {
									text : "to",
									layoutData : new sap.m.ToolbarLayoutData({
										shrinkable : true
									}),
								});
						var additioonalTextMove = new sap.m.Label(
								"labelForPack3Move", {
									text : "and"
								});

						var additioonalText2Move = new sap.m.Label(
								"labelForPack4Move", {
									text : "more"
								});

						var panelForFirstSentenceMove = new sap.m.Panel(
								'panelForFirstSentenceIDMove', {})
								.addStyleClass("noborder");

						var panelForSecondSentenceMove = new sap.m.Panel(
								'panelForSecondSentenceIDMove', {})
								.addStyleClass("noborder");

						var varOverflowToolbarMove = new sap.m.OverflowToolbar(
								"otb3Move", {
									width : 'auto',
								});

						var scrollContainerForCopyofSelectProdMove = new sap.m.ScrollContainer(
								'listPackProdCopyidScrollMove', {
									horizontal : false,
									vertical : true,
									height : '550px',
									focusable : true,
									content : [ listPackProd ]
								});
						var scrollContainerForCopyofSelectSolMove = new sap.m.ScrollContainer(
								'listPackSolCopyidScrollMove', {
									horizontal : false,
									vertical : true,
									height : '550px',
									focusable : true,
									content : [ listPackSol ]
								});
						var scrollContainerForCopyofSelectGlobMove = new sap.m.ScrollContainer(
								'listPackGlobCopyidScrollMove', {
									horizontal : false,
									vertical : true,
									height : '550px',
									focusable : true,
									content : [ listPackGlob ]
								});
						var scrollContainerForCopyofSelectCupdMove = new sap.m.ScrollContainer(
								'listPackCupdCopyidScrollMove', {
									horizontal : false,
									vertical : true,
									height : '550px',
									focusable : true,
									content : [ listPackCupd ]
								});

						oTabToolbar1 = new sap.m.IconTabFilter({
							text : "Product",
							key : "Product",
							icon : 'sap-icon://add-product',
							iconColor : 'Neutral',
							content : [new sap.m.SearchField('searchProdid', {
								width : "100%",
								liveChange : [ function(oEvent) {
									oController.handleSearchEditPack2(oEvent);
								}, oController ]
							}), scrollContainerForCopyofSelectProdMove ],
							visible : true
						});
						oTabToolbar2 = new sap.m.IconTabFilter({
							text : "Solution",
							key : "Solution",
							icon : 'sap-icon://puzzle',
							iconColor : 'Neutral',
							content : [ new sap.m.SearchField('searchSolid', {
								width : "100%",
								liveChange : [ function(oEvent) {
									oController.handleSearchEditPack2(oEvent);
								}, oController ]
							}), scrollContainerForCopyofSelectSolMove ],
							visible : true
						});
						oTabToolbar3 = new sap.m.IconTabFilter({
							text : "Globalization",
							key : "Globalization",
							icon : 'sap-icon://globe',
							iconColor : 'Neutral',
							content : [ new sap.m.SearchField('searchGlobid', {
								width : "100%",
								liveChange : [ function(oEvent) {
									oController.handleSearchEditPack2(oEvent);
								}, oController ]
							}), scrollContainerForCopyofSelectGlobMove ],
							visible : true
						});

						oTabToolbar4 = new sap.m.IconTabFilter({
							text : "User Defined",
							key : "cup",
							icon : 'sap-icon://leads',
							iconColor : 'Neutral',
							content : [ new sap.m.SearchField('searchCupdid', {
								width : "100%",
								liveChange : [ function(oEvent) {
									oController.handleSearchEditPack2(oEvent);
								}, oController ]
							}), scrollContainerForCopyofSelectCupdMove ],
							visible : true
						});

						icontabbarToolbar.addItem(oTabToolbar1);
						icontabbarToolbar.addItem(oTabToolbar3);
						icontabbarToolbar.addItem(oTabToolbar4);

						var dialogChange = new sap.m.Dialog(
								"otherDialogID",
								{
									title : "Move Package",
									contentWidth : "800px",
									contentHeight : "1000px",
									verticalScrolling : false,
									content : [ panelForFirstSentenceMove,
											panelForSecondSentenceMove,
											varOverflowToolbarMove,
											icontabbarToolbar ],
									beginButton : new sap.m.Button(
											'buttonDialogChangeID',
											{
												text : "Move",
												enabled : false,
												type : sap.m.ButtonType.Accept,
												press : function() {
													oController.moveAuthCheck();
													dialogChange.close();
												}
											}),
									endButton : new sap.m.Button({
										text : "Cancel",
										type : sap.m.ButtonType.Reject,
										press : function() {
											sap.ui.getCore().byId('otb3Move')
													.removeAllContent();
											dialogChange.close();
										}
									})
								});

						var listPackProdMoveMainToolbar = new sap.m.List(
								"listPackProdidMoveMainToolbar", {
									mode : sap.m.ListMode.SingleSelectMaster,
									growing : true,
									growingThreshold : 20,
									noDataText : ' ',
									enableBusyIndicator : true
								})
								.addStyleClass("changeList")
								.attachItemPress(
										function(oEvent) {
											oController
													.handleListSelect2MoveMainToolbar(oEvent)
										});

						

						var listPackSolMoveMainToolbar = new sap.m.List(
								"listPackSolidMoveMainToolbar", {
									mode : sap.m.ListMode.SingleSelectMaster,
									showNoData : false
								})
								.addStyleClass("changeList")
								.attachItemPress(
										function(oEvent) {
											oController
													.handleListSelect2MoveMainToolbar(oEvent)
										});
						var listPackGlobMoveMainToolbar = new sap.m.List(
								"listPackGlobidMoveMainToolbar", {
									mode : sap.m.ListMode.SingleSelectMaster,
									showNoData : false
								})
								.addStyleClass("changeList")
								.attachItemPress(
										function(oEvent) {
											oController
													.handleListSelect2MoveMainToolbar(oEvent)
										});

						var listPackCupdMoveMainToolbar = new sap.m.List(
								"listPackCupdidMoveMainToolbar", {
									mode : sap.m.ListMode.SingleSelectMaster,
									showNoData : false
								})
								.addStyleClass("changeList")
								.attachItemPress(
										function(oEvent) {
											oController
													.handleListSelect2MoveMainToolbar(oEvent)
										});
				
						var panelBreadcrumbsProductMoveMainToolbar = new sap.m.Toolbar(
								"panelBCIDProdidMoveMainToolbar", {
									design : sap.m.ToolbarDesign.SubHeader

								});
						var panelBreadcrumbsSolutionMoveMainToolbar = new sap.m.Toolbar(
								"panelBCIDSolidMoveMainToolbar", {
									design : sap.m.ToolbarDesign.SubHeader

								});
						var panelBreadcrumbsGlobalizationMoveMainToolbar = new sap.m.Toolbar(
								"panelBCIDGlobidMoveMainToolbar", {
									design : sap.m.ToolbarDesign.SubHeader
								});
						var panelBreadcrumbsCupdMoveMainToolbar = new sap.m.Toolbar(
								"panelBCIDCupdidMoveMainToolbar", {
									design : sap.m.ToolbarDesign.SubHeader
								});

						var firstLabelforPanelMainToolbarMove = new sap.m.Label(
								'firstLabelforPanelMainToolbarMove', {
									text : "This will move package  "
								});
						var secondLabelforPanelMainToolbarMove = new sap.m.Label(
								'secondLabelforPanelMainToolbarMove', {
									text : "from"
								});
						var fourthLabelforPanelMainToolbarMove = new sap.m.Label(
								'fourthLabelforPanelIDMainToolbarMove', {
									text : "to",
									layoutData : new sap.m.ToolbarLayoutData({
										shrinkable : true
									}),
								});
						var additioonalTextMainToolbarMove = new sap.m.Label(
								"labelForPack3MainToolbarMove", {
									text : "and"
								});

						var additioonalText2MainToolbarMove = new sap.m.Label(
								"labelForPack4MainToolbarMove", {
									text : "more"
								});

						var panelForFirstSentenceMainToolbarMove = new sap.m.Panel(
								'panelForFirstSentenceIDMainToolbarMove', {})
								.addStyleClass("noborder");

						var panelForSecondSentenceMainToolbarMove = new sap.m.Panel(
								'panelForSecondSentenceIDMainToolbarMove', {})
								.addStyleClass("noborder");

						var varOverflowToolbarMainToolbarMove = new sap.m.OverflowToolbar(
								"otb3MainToolbarMove", {
									width : 'auto',
								});

						var scrollContainerForCopyofSelectProdMainToolbarMove = new sap.m.ScrollContainer(
								'listPackProdCopyidScrollMainToolbarMove', {
									horizontal : false,
									vertical : true,
									height : '550px',
									focusable : true,
									content : [ listPackProdMoveMainToolbar ]
								});
						var scrollContainerForCopyofSelectSolMainToolbarMove = new sap.m.ScrollContainer(
								'listPackSolCopyidScrollMainToolbarMove', {
									horizontal : false,
									vertical : true,
									height : '550px',
									focusable : true,
									content : [ listPackSolMoveMainToolbar ]
								});
						var scrollContainerForCopyofSelectGlobMainToolbarMove = new sap.m.ScrollContainer(
								'listPackGlobCopyidScrollMainToolbarMove', {
									horizontal : false,
									vertical : true,
									height : '550px',
									focusable : true,
									content : [ listPackGlobMoveMainToolbar ]
								});
						var scrollContainerForCopyofSelectCupdMainToolbarMove = new sap.m.ScrollContainer(
								'listPackCupdCopyidScrollMainToolbarMove', {
									horizontal : false,
									vertical : true,
									height : '550px',
									focusable : true,
									content : [ listPackCupdMoveMainToolbar ]
								});
						var icontabbarToolbarMoveMainToolbar = new sap.m.IconTabBar(
								'iconTabHieridMoveMainToolbar',
								{
									expandable : false,
									select : function(oEvent) {
										oController
												.handleIconTabBarSelect5(oEvent);
									}
								});
						oTabToolbar1MoveMainToolbar = new sap.m.IconTabFilter(
								{
									text : "Product",
									key : "Product",
									icon : 'sap-icon://add-product',
									iconColor : 'Neutral',
									content : [
											new sap.m.SearchField(
													'searchProdidMoveMainToolbar',
													{
														width : "100%",
														liveChange : [
																function(oEvent) {
																	oController
																			.handleSearchEditPack2MoveMainToolbar(oEvent);
																}, oController ]
													}),
											scrollContainerForCopyofSelectProdMainToolbarMove ],
									visible : true
								});
						oTabToolbar2MoveMainToolbar = new sap.m.IconTabFilter(
								{
									text : "Solution",
									key : "Solution",
									icon : 'sap-icon://puzzle',
									iconColor : 'Neutral',
									content : [
											new sap.m.SearchField(
													'searchSolidMoveMainToolbar',
													{
														width : "100%",
														liveChange : [
																function(oEvent) {
																	oController
																			.handleSearchEditPack2MoveMainToolbar(oEvent);
																}, oController ]
													}),
											scrollContainerForCopyofSelectSolMainToolbarMove ],
									visible : true
								});
						oTabToolbar3MoveMainToolbar = new sap.m.IconTabFilter(
								{
									text : "Globalization",
									key : "Globalization",
									icon : 'sap-icon://globe',
									iconColor : 'Neutral',
									content : [
											new sap.m.SearchField(
													'searchGlobidMoveMainToolbar',
													{
														width : "100%",
														liveChange : [
																function(oEvent) {
																	oController
																			.handleSearchEditPack2MoveMainToolbar(oEvent);
																}, oController ]
													}),
											scrollContainerForCopyofSelectGlobMainToolbarMove ],
									visible : true
								});

						oTabToolbar4MoveMainToolbar = new sap.m.IconTabFilter(
								{
									text : "User Defined",
									key : "cup",
									icon : 'sap-icon://leads',
									iconColor : 'Neutral',
									content : [
											new sap.m.SearchField(
													'searchCupdidMoveMainToolbar',
													{
														width : "100%",
														liveChange : [
																function(oEvent) {
																	oController
																			.handleSearchEditPack2MoveMainToolbar(oEvent);
																}, oController ]
													}),
											scrollContainerForCopyofSelectCupdMainToolbarMove ],
									visible : true
								});

						icontabbarToolbarMoveMainToolbar
								.addItem(oTabToolbar1MoveMainToolbar);
						icontabbarToolbarMoveMainToolbar
								.addItem(oTabToolbar3MoveMainToolbar);
						icontabbarToolbarMoveMainToolbar
								.addItem(oTabToolbar4MoveMainToolbar);

						var dialogChangeForMainToolbar = new sap.m.Dialog(
								'otherDialogIDForCopyMainToolbarMove',
								{
									title : "Move Package",
									contentWidth : "800px",
									contentHeight : "1000px",
									verticalScrolling : false,
									content : [
											panelForFirstSentenceMainToolbarMove,
											panelForSecondSentenceMainToolbarMove,
											varOverflowToolbarMainToolbarMove,
											icontabbarToolbarMoveMainToolbar ],
									beginButton : new sap.m.Button(
											'buttonDialogChangeIDForMainToolbar',
											{
												text : "Move",
												enabled : false,
												type : sap.m.ButtonType.Accept,
												press : function() {
													oController
															.moveAuthCheckMain();
													dialogChangeForMainToolbar
															.close();
												}
											}),
									endButton : new sap.m.Button(
											{
												text : "Cancel",
												type : sap.m.ButtonType.Reject,
												press : function() {
													sap.ui
															.getCore()
															.byId(
																	"buttonDialogChangeIDForMainToolbar")
															.setEnabled(false);
													sap.ui
															.getCore()
															.byId(
																	'otb3MainToolbarMove')
															.removeAllContent();
													dialogChangeForMainToolbar
															.close();
												}
											})
								});

						var moveButton = new sap.m.Button("moveButtonID", {
							type : sap.m.ButtonType.Transparent,
							icon : "sap-icon://enter-more",
							tooltip : "Move",
							enabled : true,
							visible : false,
							press : function(oEvent) {
								oController
										.prefillDataForPanelCopy2Move(oEvent);
								oController.editPackage2(oEvent);
								dialogChange.open();
							}
						});

						var favoriteButton = new sap.m.Button(
								"favoriteButtonID", {
									type : sap.m.ButtonType.Transparent,
									icon : "sap-icon://favorite",
									tooltip : "Favorite",
									enabled : false,
									visible : false
								});

						var shareButton = new sap.m.Button("shareButtonID", {
							type : sap.m.ButtonType.Transparent,
							icon : "sap-icon://share-2",
							tooltip : "Share",
							enabled : false,
							visible : false
						});
						var selectButton = new sap.m.Button("selectButtonId", {
							type : sap.m.ButtonType.Transparent,
							icon : "sap-icon://multi-select",
							tooltip : "Select",
							enabled : true,
							press : function(oEvent) {
								var listitems = sap.ui.getCore().byId(
										'gridPack').getContent();
								for (i in listitems) {
									listitems[i].setType('Inactive');
									listitems[i].getContent()[0]
											.setVisible(true);
								}

								sap.ui.getCore().byId('toolbarPackageId2')
										.setVisible(true);

								sap.ui.getCore().byId('toolbarPackageId1')
										.setVisible(false);

								sap.ui.getCore().byId('deselectButtonIDNew')
										.setVisible(true);

								sap.ui.getCore().byId(
										'redoButtonelForSelectNew').setVisible(
										true);

								sap.ui.getCore().byId('selectButtonIdNew')
										.setVisible(false);

								oController.addButtonView('addButtonIDNew',
										false);
								sap.ui.getCore().byId('copyButtonIDNew')
										.setVisible(true);

								oController.addButtonView('moveButtonIDNew',
										true);
								sap.ui.getCore().byId('favoriteButtonIDNew')
										.setVisible(true);

								sap.ui.getCore().byId('shareButtonIDNew')
										.setVisible(true);

								oController.addButtonView(
										'deleteItemsIdBt3New', true);
		
								sap.ui.getCore().byId('downloadButtonelIDNew')
										.setVisible(false);

								sap.ui.getCore().byId('multiSelectIdBt3New')
										.setVisible(true);

							}
						});

						var multiSelectButton = new sap.m.Button(
								"multiSelectIdBt3", {
									type : sap.m.ButtonType.Transparent,
									icon : "sap-icon://multiselect-all",
									tooltip : "Select all",
									visible : true,
									press :
									function(oEvent) {
										
										var listitems = sap.ui.getCore().byId(
												'gridPack').getContent();
										for (i in listitems) {
											listitems[i].setType('Inactive');
											listitems[i].getContent()[0]
													.setVisible(true);
											listitems[i].getContent()[0]
													.setSelected(true);

										}
										sap.ui.getCore().byId('selectButtonId')
												.setVisible(false);

										sap.ui.getCore().byId(
												'deselectButtonID').setVisible(
												true);

										sap.ui.getCore().byId(
												'redoButtonelForSelectAll')
												.setVisible(true);

										sap.ui.getCore().byId(
												'multiSelectIdBt3').setVisible(
												false);

										oController.addButtonView(
												'addButtonID', false);
										sap.ui.getCore().byId('copyButtonID')
												.setVisible(true);

										oController.addButtonView(
												'moveButtonID', true);
										sap.ui.getCore().byId(
												'favoriteButtonID').setVisible(
												true);

										sap.ui.getCore().byId('shareButtonID')
												.setVisible(true);

										oController.addButtonView(
												'deleteItemsIdBt3', true);
										sap.ui.getCore().byId(
												'downloadButtonelID')
												.setVisible(false);

										sap.ui.getCore().byId(
												'multiSelectIdBt3ForPosition')
												.setVisible(true);

									}
								});

						var multiSelectButtonForPosition = new sap.m.Button(
								"multiSelectIdBt3ForPosition", {
									type : sap.m.ButtonType.Transparent,
									icon : "sap-icon://multiselect-all", 
									tooltip : "Select all",
									enabled : false,
									visible : false,
									press :
									function(oEvent) {
										
										var listitems = sap.ui.getCore().byId(
												'gridPack').getContent();
										for (i in listitems) {
											listitems[i].setType('Inactive');
											listitems[i].getContent()[0]
													.setVisible(true);
											listitems[i].getContent()[0]
													.setSelected(true);

										}
										sap.ui.getCore().byId('selectButtonId')
												.setVisible(false);
										sap.ui.getCore().byId(
												'deselectButtonID').setVisible(
												true);
										sap.ui.getCore().byId(
												'redoButtonelForSelectAll')
												.setVisible(true);
										sap.ui.getCore().byId(
												'multiSelectIdBt3').setVisible(
												false);
										oController.addButtonView(
												'addButtonID', false);
										sap.ui.getCore().byId('copyButtonID')
												.setVisible(true);
										oController.addButtonView(
												'moveButtonID', true);
										sap.ui.getCore().byId(
												'favoriteButtonID').setVisible(
												true);
										sap.ui.getCore().byId('shareButtonID')
												.setVisible(true);
										oController.addButtonView(
												'deleteItemsIdBt3', true);
										sap.ui.getCore().byId(
												'downloadButtonelID')
												.setVisible(false);

										sap.ui.getCore().byId(
												'multiSelectIdBt3ForPosition')
												.setEnabled(false);

										sap.ui.getCore().byId(
												'deselectButtonID').setEnabled(
												true);

										sap.ui.getCore().byId('copyButtonID')
												.setEnabled(true);
										sap.ui.getCore().byId('moveButtonID')
												.setEnabled(true);
										sap.ui.getCore().byId(
												'deselectButtonID').setEnabled(
												true);
										sap.ui.getCore().byId(
												'deleteItemsIdBt3').setEnabled(
												true);

									}
								});
						var downlodButtonel = new sap.m.Button(
								"downloadButtonelID",
								{
									type : sap.m.ButtonType.Transparent,
									icon : "sap-icon://download",
									tooltip : "Download",
									visible : "{= ${/TYPE} === 'custom' ? false : true}",
									press : function(oEvent) {
										oController.downloadExcel(oEvent);
									}
								});

						var deselectButton = new sap.m.Button(
								"deselectButtonID", {
									type : sap.m.ButtonType.Transparent,
									icon : "sap-icon://multi-select",
									tooltip : "Deselect all",
									visible : false,
									press : function(oEvent) {
										var listitems = sap.ui.getCore().byId(
												'gridPack').getContent();
										for (i in listitems) {
											listitems[i].setType('Inactive');
											listitems[i].getContent()[0]
													.setSelected(false);
										}
										sap.ui.getCore().byId('copyButtonID')
												.setEnabled(false);
										sap.ui.getCore().byId('moveButtonID')
												.setEnabled(false);
										sap.ui.getCore().byId(
												'deselectButtonID').setEnabled(
												false);
										sap.ui.getCore().byId(
												'deleteItemsIdBt3').setEnabled(
												false);
										sap.ui.getCore().byId(
												'multiSelectIdBt3ForPosition')
												.setEnabled(true);
										sap.ui.getCore().byId(
												'deselectButtonID').setEnabled(
												false);

									}
								});

						var redoForSelect = new sap.m.Button(
								"redoButtonelForSelect", {
									type : sap.m.ButtonType.Transparent,
									tooltip : "Cancel",
									icon : "sap-icon://redo",
									visible : false,
									enabled : true,
									press : function(oEvent) {
										var listitems = sap.ui.getCore().byId(
												'gridPack').getContent();
										for (i in listitems) {
											listitems[i].setType('Active');
											listitems[i].getContent()[0]
													.setVisible(false);
											listitems[i].getContent()[0]
													.setSelected(false);
										}
										sap.ui.getCore().byId(
												'redoButtonelForSelect')
												.setVisible(false);
										sap.ui.getCore().byId('selectButtonId')
												.setVisible(true);
										sap.ui.getCore().byId(
												'deselectButtonID').setVisible(
												false);
										sap.ui.getCore().byId('copyButtonID')
												.setVisible(false);
										oController.addButtonView(
												'moveButtonID', false);
										sap.ui.getCore().byId(
												'favoriteButtonID').setVisible(
												false);
										sap.ui.getCore().byId('shareButtonID')
												.setVisible(false);
										oController.addButtonView(
												'addButtonID', true);
										oController.addButtonView(
												'deleteItemsIdBt3', false);
										sap.ui.getCore().byId(
												'multiSelectIdBt3').setVisible(
												true);

										sap.ui.getCore().byId(
												'downloadButtonelID')
												.setVisible(true);
										sap.ui.getCore().byId('copyButtonID')
												.setEnabled(false);
										sap.ui.getCore().byId('moveButtonID')
												.setEnabled(false);
										sap.ui.getCore().byId(
												'deselectButtonID').setEnabled(
												true);
										sap.ui.getCore().byId(
												'deleteItemsIdBt3').setEnabled(
												false);

									}
								});

						var redoForSelectAll = new sap.m.Button(
								"redoButtonelForSelectAll", {
									type : sap.m.ButtonType.Transparent,
									tooltip : "Cancel",
									icon : "sap-icon://decline",
									visible : false,
									enabled : true,
									press : function(oEvent) {
										var listitems = sap.ui.getCore().byId(
												'gridPack').getContent();
										for (i in listitems) {
											listitems[i].setType('Active');
											listitems[i].getContent()[0]
													.setVisible(false);
											listitems[i].getContent()[0]
													.setSelected(false);
										}
										sap.ui.getCore().byId(
												'redoButtonelForSelectAll')
												.setVisible(false);
										sap.ui.getCore().byId(
												'multiSelectIdBt3').setVisible(
												true);
										sap.ui.getCore().byId(
												'deselectButtonID').setVisible(
												false);
										sap.ui.getCore().byId('copyButtonID')
												.setVisible(false);
										oController.addButtonView(
												'moveButtonID', false);
										sap.ui.getCore().byId(
												'favoriteButtonID').setVisible(
												false);
										sap.ui.getCore().byId('shareButtonID')
												.setVisible(false);
										oController.addButtonView(
												'addButtonID', true);
										oController.addButtonView(
												'deleteItemsIdBt3', false);
										sap.ui.getCore().byId('selectButtonId')
												.setVisible(true);
										sap.ui.getCore().byId(
												'downloadButtonelID')
												.setVisible(true);
										sap.ui.getCore()
												.byId('copyButtonIDNew')
												.setEnabled(false);
										sap.ui.getCore()
												.byId('moveButtonIDNew')
												.setEnabled(false);
										sap.ui.getCore().byId(
												'deselectButtonIDNew')
												.setEnabled(false);
										sap.ui.getCore().byId(
												'deleteItemsIdBt3New')
												.setEnabled(false);
										sap.ui.getCore().byId(
												'multiSelectIdBt3ForPosition')
												.setVisible(false);

									}
								});
						var packTool = new sap.m.Toolbar(
								"toolbarPackageId1",
								{
									visible : "{= ${/TYPE} === 'feature' ? false : true}",
									height : "3rem",
									content : [
											new sap.m.Text(
													{
														text : "{= ${/TYPE} === 'innovation' ? 'Product Features' : 'Packages'}"
													}),
											new sap.m.ToolbarSpacer(),
											selectButton,
											redoForSelect,
											multiSelectButton,
											redoForSelectAll,
											deselectButton,
											multiSelectButtonForPosition,
											downlodButtonel,
											copyButton,
											moveButton,
											favoriteButton,
											shareButton,
											addButton,
											new sap.m.Button(
													"deleteItemsIdBt3",
													{
														type : sap.m.ButtonType.Transparent,
														enabled : false,
														visible : false,
														icon : "sap-icon://delete",
														press : function(oEvent) {
															oController
																	.deletePackageSelect2(oEvent
																			.getSource()
																			.getParent());
														}
													}), 

									]
								}).addStyleClass("noborder toolbarPacks");
						var addButtonNew = new sap.m.Button(
								"addButtonIDNew",
								{
									type : sap.m.ButtonType.Transparent,
									icon : "sap-icon://add",
									tooltip : "Add",
									press : [ function(oEvent) {
										oController.addMo(oEvent);
									}, oController ],
									visible : "{= ${/TYPE} === 'innovation' ? false : true}"
								});

						var copyButtonNew = new sap.m.Button(
								"copyButtonIDNew",
								{
									type : sap.m.ButtonType.Transparent,
									icon : "sap-icon://duplicate",
									tooltip : "Copy",
									enabled : false,
									visible : false,
									press : function(oEvent) {
										oController
												.prefillDataForPanelCopy2(oEvent);
										oController.editPackageForCopy2(oEvent);
										dialogChangeForCopy.open();

									}
								});

						var moveButtonNew = new sap.m.Button(
								"moveButtonIDNew",
								{
									type : sap.m.ButtonType.Transparent,
									icon : "sap-icon://enter-more",
									tooltip : "Move",
									enabled : false,
									visible : false,
									press : function(oEvent) {
										oController
												.prefillDataForPanelCopy2Move(oEvent);
										oController.editPackage2(oEvent);
										dialogChange.open();
									}
								});

						var favoriteButtonNew = new sap.m.Button(
								"favoriteButtonIDNew", {
									type : sap.m.ButtonType.Transparent,
									icon : "sap-icon://favorite",
									tooltip : "Favorite",
									enabled : false,
									visible : false
								});

						var shareButtonNew = new sap.m.Button(
								"shareButtonIDNew", {
									type : sap.m.ButtonType.Transparent,
									icon : "sap-icon://share-2",
									tooltip : "Share",
									enabled : false,
									visible : false
								});
						var selectButtonNew = new sap.m.Button(
								"selectButtonIdNew", {
									type : sap.m.ButtonType.Transparent,
									icon : "sap-icon://multi-select",
									tooltip : "Select",
									enabled : true,
									press : function(oEvent) {
										var listitems = sap.ui.getCore().byId(
												'gridPack').getContent();
										for (i in listitems) {
											listitems[i].setType('Inactive');
											listitems[i].getContent()[0]
													.setVisible(true);
										}

										sap.ui.getCore().byId(
												'deselectButtonIDNew')
												.setVisible(true);

										sap.ui.getCore().byId(
												'redoButtonelForSelectNew')
												.setVisible(true);

										sap.ui.getCore().byId(
												'selectButtonIdNew')
												.setVisible(false);
										oController.addButtonView(
												'addButtonIDNew', false);

										sap.ui.getCore()
												.byId('copyButtonIDNew')
												.setVisible(true);
										oController.addButtonView(
												'moveButtonIDNew', true);
										sap.ui.getCore().byId(
												'favoriteButtonIDNew')
												.setVisible(true);

										sap.ui.getCore().byId(
												'shareButtonIDNew').setVisible(
												true);

										oController.addButtonView(
												'deleteItemsIdBt3New', true);
										sap.ui.getCore().byId(
												'multiSelectIdBt3New')
												.setVisible(false);

										sap.ui.getCore().byId(
												'downloadButtonelIDNew')
												.setVisible(false);

										sap.ui.getCore().byId(
												'multiSelectIdBt3New')
												.setVisible(true);
									}
								});

						var multiSelectButtonNew = new sap.m.Button(
								"multiSelectIdBt3New", {
									type : sap.m.ButtonType.Transparent,
									icon : "sap-icon://multiselect-all", 
									tooltip : "Select all",
									visible : true,
									press :
									function(oEvent) {
										var listitems = sap.ui.getCore().byId(
												'gridPack').getContent();
										for (i in listitems) {
											listitems[i].setType('Inactive');
											listitems[i].getContent()[0]
													.setVisible(true);
											listitems[i].getContent()[0]
													.setSelected(true);

										}
										sap.ui.getCore().byId(
												'selectButtonIdNew')
												.setVisible(false);

										sap.ui.getCore().byId(
												'deselectButtonIDNew')
												.setVisible(true);
										oController.addButtonView(
												'addButtonIDNew', false);
										sap.ui.getCore()
												.byId('copyButtonIDNew')
												.setVisible(true);
										oController.addButtonView(
												'moveButtonIDNew', true);
										sap.ui.getCore().byId(
												'favoriteButtonIDNew')
												.setVisible(true);

										sap.ui.getCore().byId(
												'shareButtonIDNew').setVisible(
												true);

										oController.addButtonView(
												'deleteItemsIdBt3New', true);
										sap.ui.getCore().byId(
												'downloadButtonelIDNew')
												.setVisible(false);

										sap.ui.getCore()
												.byId('copyButtonIDNew')
												.setEnabled(true);
										sap.ui.getCore()
												.byId('moveButtonIDNew')
												.setEnabled(true);
										sap.ui.getCore().byId(
												'deselectButtonIDNew')
												.setEnabled(true);
										sap.ui.getCore().byId(
												'deleteItemsIdBt3New')
												.setEnabled(true);
										sap.ui.getCore().byId(
												'multiSelectIdBt3New')
												.setEnabled(false);

									}
								});

						var downlodButtonelNew = new sap.m.Button(
								"downloadButtonelIDNew",
								{
									type : sap.m.ButtonType.Transparent,
									icon : "sap-icon://download",
									tooltip : "Download",
									visible : "{= ${/TYPE} === 'custom' ? false : true}",
									press : function(oEvent) {
										oController.downloadExcel(oEvent);
									}
								});

						var deselectButtonNew = new sap.m.Button(
								"deselectButtonIDNew", {
									type : sap.m.ButtonType.Transparent,
									icon : "sap-icon://multi-select",
									tooltip : "Deselect all",
									enabled : false,
									visible : false,
									press : function(oEvent) {
										var listitems = sap.ui.getCore().byId(
												'gridPack').getContent();
										for (i in listitems) {
											listitems[i].setType('Inactive');
											listitems[i].getContent()[0]
													.setSelected(false);
										}
										sap.ui.getCore()
												.byId('copyButtonIDNew')
												.setEnabled(false);
										sap.ui.getCore()
												.byId('moveButtonIDNew')
												.setEnabled(false);
										sap.ui.getCore().byId(
												'deselectButtonIDNew')
												.setEnabled(false);
										sap.ui.getCore().byId(
												'deleteItemsIdBt3New')
												.setEnabled(false);
										sap.ui.getCore().byId(
												'multiSelectIdBt3New')
												.setEnabled(true);
									}
								});

						var redoForSelectNew = new sap.m.Button(
								"redoButtonelForSelectNew", {
									type : sap.m.ButtonType.Transparent,
									tooltip : "Cancel",
									icon : "sap-icon://decline",
									visible : false,
									enabled : true,
									press : function(oEvent) {
										var listitems = sap.ui.getCore().byId(
												'gridPack').getContent();
										for (i in listitems) {
											listitems[i].setType('Active');
											listitems[i].getContent()[0]
													.setVisible(false);
											listitems[i].getContent()[0]
													.setSelected(false);
										}
										sap.ui.getCore().byId(
												'redoButtonelForSelectNew')
												.setVisible(false);
										sap.ui.getCore().byId(
												'selectButtonIdNew')
												.setVisible(true);
										sap.ui.getCore().byId(
												'deselectButtonIDNew')
												.setVisible(false);

										sap.ui.getCore()
												.byId('copyButtonIDNew')
												.setVisible(false);

										oController.addButtonView(
												'moveButtonIDNew', false);
										sap.ui.getCore().byId(
												'favoriteButtonIDNew')
												.setVisible(false);

										sap.ui.getCore().byId(
												'shareButtonIDNew').setVisible(
												false);

										oController.addButtonView(
												'addButtonIDNew', true);
								
										oController.addButtonView(
												'deleteItemsIdBt3New', false);
										sap.ui.getCore().byId(
												'multiSelectIdBt3New')
												.setVisible(true);

										sap.ui.getCore().byId(
												'downloadButtonelIDNew')
												.setVisible(true);

										sap.ui.getCore().byId(
												'toolbarPackageId2')
												.setVisible(false);

										sap.ui.getCore().byId(
												'toolbarPackageId1')
												.setVisible(true);

										sap.ui.getCore()
												.byId('copyButtonIDNew')
												.setEnabled(false);
										sap.ui.getCore()
												.byId('moveButtonIDNew')
												.setEnabled(false);
										sap.ui.getCore().byId(
												'deselectButtonIDNew')
												.setEnabled(false);
										sap.ui.getCore().byId(
												'deleteItemsIdBt3New')
												.setEnabled(false);

									}
								});

						var redoForSelectAllNew = new sap.m.Button(
								"redoButtonelForSelectAllNew", {
									type : sap.m.ButtonType.Transparent,
									tooltip : "Cancel",
									icon : "sap-icon://redo",
									visible : false,
									enabled : true,
									press : function(oEvent) {
										var listitems = sap.ui.getCore().byId(
												'gridPack').getContent();
										for (i in listitems) {
											listitems[i].setType('Active');
											listitems[i].getContent()[0]
													.setVisible(false);
											listitems[i].getContent()[0]
													.setSelected(false);
										}
										sap.ui.getCore().byId(
												'redoButtonelForSelectAllNew')
												.setVisible(false);
										sap.ui.getCore().byId(
												'multiSelectIdBt3New')
												.setVisible(true);
										sap.ui.getCore().byId(
												'deselectButtonIDNew')
												.setVisible(false);
										sap.ui.getCore()
												.byId('copyButtonIDNew')
												.setVisible(false);

										oController.addButtonView(
												'moveButtonIDNew', false);
										sap.ui.getCore().byId(
												'favoriteButtonIDNew')
												.setVisible(false);

										sap.ui.getCore().byId(
												'shareButtonIDNew').setVisible(
												false);
										oController.addButtonView(
												'addButtonIDNew', true);
						
										oController.addButtonView(
												'deleteItemsIdBt3New', false);
										sap.ui.getCore().byId(
												'selectButtonIdNew')
												.setVisible(true);

										sap.ui.getCore().byId(
												'downloadButtonelIDNew')
												.setVisible(true);

									}
								});

						var packTool2 = new sap.m.Toolbar(
								"toolbarPackageId2",
								{
									visible : false,
									height : "3rem",
									content : [
											new sap.m.Text(
													{
														text : "{= ${/TYPE} === 'innovation' ? 'Product Features' : 'Packages'}"
													}),
											new sap.m.ToolbarSpacer(),
											selectButtonNew,
											redoForSelectNew,
											deselectButtonNew,
											multiSelectButtonNew,
											redoForSelectAllNew,
											downlodButtonelNew,
											copyButtonNew,
											moveButtonNew,
											favoriteButtonNew,
											shareButtonNew,
											addButtonNew,
											new sap.m.Button(
													"deleteItemsIdBt3New",
													{
														type : sap.m.ButtonType.Transparent,
														enabled : false,
														visible : false,
														icon : "sap-icon://delete",
														press : function(oEvent) {
															oController
																	.deletePackageSelect2(oEvent
																			.getSource()
																			.getParent());
														}
													}), ]
								}).addStyleClass("noborder toolbarPacks");

						var oDivider = new sap.ui.commons.HorizontalDivider("divider2",
						{
							width : "100%",
							type : "Page",
							height : "Small"
						});
						
						
						var assignedMOsTable = new sap.m.Panel(
						{
							expanded : "{device>/isNoPhone}",
							expanded : true,
							visible : "{= ${/TYPE} === 'innovation' ? false : true}",
							content : [ table ],
							headerToolbar : new sap.m.Toolbar(
									"tabletoolbar",
									{
										content : [
												title,
												new sap.m.ToolbarSpacer(),
												sortButton,
												downloadButton,
												assignButton,
												delButton,
												redo ]
									}).addStyleClass("noborder"),
						}).addStyleClass("noborder");
						
						
						var packageDetails = new sap.m.Panel("PackageDetailsID",
						{//height: "900px",
						});
						
						var listtest = new sap.m.List();
						listtest.bindItems('childModel>/childData', listitem)
						var panelPrincipal = new sap.m.Panel(
								"PrincipalID",{
									height : "100%",
									lite : true,
									content : [
											packageDetails,
											packTool,
											packTool2,
											gridList,
											oDivider,
											assignedMOsTable
											]

								}).addStyleClass("noborder");
						/*
						var oContainerSplit = new sap.ui.unified.SplitContainer(
								"oContainerSplitID", {
									content : [ 
									]
									,
									placeAt : "right",
									secondaryContent : [ panelPrincipal ],
									width : '50%',
									secondaryContentSize : '50%',
									showSecondaryContent : true,
								});
							*/
						var oTF = new sap.ui.commons.TextField(
								"tfSidePaneWidth", {
									value : "1000px",
								});
/*
						var oButtonToggle = new sap.ui.commons.Button(
								{
									text : "Toggle Side Pane",
									press : function() {
										oContainerSplit
												.setSecondaryContentSize(sap.ui
														.getCore()
														.byId("tfSidePaneWidth")
														.getValue());
										oContainerSplit
												.setShowSecondaryContent(!oContainerSplit
														.getShowSecondaryContent());
									}
								});
*/
						var sideContent = new sap.ui.unified.SplitContainer(
								"sideContentId", {
								});
						var redoForMainToolbar = new sap.m.Button(
								"redoButtonelForMainToolbar",
								{
									type : sap.m.ButtonType.Transparent,
									tooltip : "Cancel",
									icon : "sap-icon://redo",
									visible : false,
									enabled : true,
									press : function(oEvent) {
										oController
												.mainToolbarViewGroupedButtons();
									}
								});
						var redoForMainToolbar2 = new sap.m.Button(
								"redoButtonelForMainToolbar2",
								{
									type : sap.m.ButtonType.Transparent,
									tooltip : "Cancel",
									icon : "sap-icon://redo",
									visible : false,
									enabled : true,
									press : function(oEvent) {
										oController
												.mainToolbarViewGroupedButtons();
										sap.ui.getCore().byId('buttonInfo')
												.setPressed(false);
									}
								});
						var moveButtonForMainToolbar = new sap.m.Button(
								"moveButtonIDForMainToolbar",
								{
									type : sap.m.ButtonType.Transparent,
									icon : "sap-icon://enter-more",
									tooltip : "Move",
									enabled : true,
									visible : false,
									press : function(oEvent) {
										oController
												.prefillDataForPanelCopy2MainToolbarMove(oEvent);
										oController
												.editPackage2MoveMainToolbar(oEvent);
										dialogChangeForMainToolbar.open();
									}
								});
						var listSearch = new sap.m.List('listSearch',
								{
									mode : "SingleSelectMaster",
									select : function(oControlEvent) {
										var userId = oControlEvent
												.getParameters().listItem
												.getTitle();
										searchUser.setValue(userId);
										popover.close();

									}
								});

						var popover = new sap.m.Popover({
							showHeader : false,
							placement : sap.m.PlacementType.Bottom,
							afterOpen : function() {
								search.focus();
							},
							content : [ listSearch ]
						});
						var searchUser = new sap.m.SearchField('searchUserID',
								{
									search : function(oEvent) {
										oController.searchUserID(oEvent);

										popover.openBy(searchUser);
									}
								});
						var ListItem4UPackages = new sap.m.CustomListItem(
								"customlister",
								{
									visible : true,
									content : [

									new sap.ui.commons.Link(
											{
												text : "{userswithrights>USER}",
												target : "_blank",
												href : "https://people.wdf.sap.corp/profiles/{userswithrights>USER}"
											}).addStyleClass("alignleft")
											.addStyleClass("packeditorslist") ]

								});

						var oListUsers = new sap.m.List("listUsersShareRights",
								{
									mode : sap.m.ListMode.None,
									visible : true,
									growing : true,
									growingThreshold : 20,

								}).addStyleClass('MODetails');

						oListUsers.bindItems({
							path : "userswithrights>/",
							template : ListItem4UPackages,
							sorter : false
						}, ListItem4UPackages);

						var oListUsersShareRights = new sap.m.Dialog(
								"oListDialogShareID", {
									title : "Package Editors",
									contentWidth : "400px",
									contentHeight : "400px",
									content : [ oListUsers ],
									beforeOpen : function() {
										oController.loadUsersWithShareRights();
									},
									endButton : new sap.m.Button({
										text : "Close",
										type : sap.m.ButtonType.Reject,
										press : function() {
											oListUsersShareRights.close();
										}
									})
								});
						var dialogShareMain = new sap.m.Dialog(
								"dialogShareMain",
								{
									title : "Share Package {/NAME}",
									contentWidth : "200px",
									contentHeight : "400px",
									verticalScrolling : false,
									content : [
											new sap.m.VBox(
													{
														items : [
																new sap.m.Text(
																		{
																			text : "Share with "
																		}),
																searchUser,
																new sap.m.Text(
																		{
																			text : "This user will be able to:  "
																		}),
																new sap.m.HBox(
																		{
																			items : [
																					new sap.m.CheckBox(
																							'cbEditID',
																							{
																								text : "Edit"
																							}),
																					new sap.m.CheckBox(
																							'cbGrantID',
																							{
																								text : "Grant Edit rights"
																							}) ]
																		}),
																new sap.m.Text(
																		{
																			text : "Include message: "
																		}),
																new sap.m.TextArea(
																		'textEmailID',
																		{
																			rows : 5,
																			cols : 50,
																			value : "Hi, Please check this package in MO Repository application"
																		}) ]
													}),

									],
									beginButton : new sap.m.Button({
										text : "Share",
										enabled : true,
										type : sap.m.ButtonType.Accept,
										press : function() {
											oController.shareButton();
											dialogShareMain.close();
										}
									}),
									endButton : new sap.m.Button({
										text : "Cancel",
										type : sap.m.ButtonType.Reject,
										press : function() {

											dialogShareMain.close();
										}
									})
								});
						var shareButtonForMainToolbar = new sap.m.Button(
								"shareButtonIDForMainToolbar", {
									type : sap.m.ButtonType.Transparent,
									icon : "sap-icon://share-2",
									tooltip : "Share",
									enabled : true,
									visible : false,
									press : function(oEvent) {
										dialogShareMain.open();
									}
								});
						var requestButtonForMainToolbar = new sap.m.Button(
								"requestButtonIDForMainToolbar",
								{
									type : sap.m.ButtonType.Transparent,
									icon : "sap-icon://role",
									tooltip : "Request edit rights",
									enabled : true,
									press : function(oEvent) {
										sap.m.MessageBox.confirm(
														"Do you want to request edit rights for this package?",
														{
															icon : sap.m.MessageBox.Icon.WARNING,
															title : "Warning",
															onClose : function(
																	sResult) {
																if (sResult == sap.m.MessageBox.Action.OK) {

																	oController
																			.requestAccess();

																}

															}
														});
									}
								});
						var copyButtonForMainToolbar = new sap.m.Button(
								"copyButtonIDForMainToolbar",
								{
									type : sap.m.ButtonType.Transparent,
									icon : "sap-icon://duplicate",
									tooltip : "Copy",
									enabled : true,
									visible : true,
									press : function(oEvent) {
										oController
												.prefillDataForPanelCopy2MainToolbar(oEvent);
										oController
												.editPackageForCopy2MainToolbar(oEvent);
										dialogChangeForCopyMainToolbar.open();

									}
								});

						var deleteButtonForMainToolbar = new sap.m.Button(
								"deleteItemsIdBt3ForMainToolbar",
								{
									type : sap.m.ButtonType.Transparent,
									enabled : "{= ${/TYPE} === 'innovation' ? false : true}",
									visible : false,
									icon : "sap-icon://delete",
									press : function(oEvent) {
										oController
												.deletePackageSelect2ForMainToolbar(oEvent
														.getSource()
														.getParent());
									}
								});
					
						var editButtonFromAbove = new sap.m.ToggleButton(
								'editButtonFromAboveID',
								{
									type : sap.m.ButtonType.Transparent,
									icon : "sap-icon://edit",
									pressed : false,
									press : function(oEvent) {

										oController
												._showFormFragment('ChangePackage');

									},

									visible : false,
									enabled : "{= ${/TYPE} === 'custom' ? true : ( ${/TYPE} === 'globalization' ? true : ( ${/TYPE} === 'cup' ? true : false ) )}"
								});

						return new sap.m.Page(
								'detail',
								{
									showNavButton : true,
									navButtonPress : function(oEvent) {
										oController.switchListSelecteMode();
										oController.switchListSelecteMode3();
										oController.handleNavButtonPress();
									},
									//onInit: oController.mainToolbarViewExpandedButtons(),
									customHeader : new sap.m.Bar(
											"headertoolbarPanelId",
											{
												contentLeft : [ new sap.m.Button(
														"buttonHomeID",
														{
															icon : "sap-icon://nav-back",
															press : function() {
																
																if (sap.ui.getCore().byId("editButtonFromAboveID").mProperties.pressed)
																	return;
																
																
																oController.switchListSelecteMode();
																var listitems = sap.ui
																		.getCore()
																		.byId('gridPack')
																		.getContent();
																for (i in listitems) 
																{
																	listitems[i].setType('Active');
																	listitems[i].getContent()[0].setVisible(false);
																	listitems[i].getContent()[0].setSelected(false);
																}
																sap.ui
																		.getCore()
																		.byId('redoButtonelForSelectAll')
																		.setVisible(false);
																sap.ui
																		.getCore()
																		.byId('multiSelectIdBt3')
																		.setVisible(true);
																sap.ui
																		.getCore()
																		.byId('deselectButtonID')
																		.setVisible(false);
																sap.ui
																		.getCore()
																		.byId('copyButtonID')
																		.setVisible(false);
																oController
																		.addButtonView('moveButtonID',false);
																sap.ui
																		.getCore()
																		.byId('favoriteButtonID')
																		.setVisible(false);

																sap.ui
																		.getCore()
																		.byId('shareButtonID')
																		.setVisible(false);
																oController
																		.addButtonView('addButtonID',true);
																sap.ui
																		.getCore()
																		.byId('redoButtonelForSelect')
																		.setVisible(false);
																sap.ui
																		.getCore()
																		.byId('redoButtonelForSelectNew')
																		.firePress();
																sap.ui
																		.getCore()
																		.byId('selectButtonId')
																		.setVisible(true);
																oController
																.handleNavButtonPress();
															}
														}) ],
												contentMiddle : [],
												contentRight : [
														redoForMainToolbar,
														redoForMainToolbar2,
														copyButtonForMainToolbar,
														moveButtonForMainToolbar,
														deleteButtonForMainToolbar,
														editButtonFromAbove,
														shareButtonForMainToolbar,
														/*
														new sap.m.Button(
																"expandID",
																{
																	type : sap.m.ButtonType.Transparent,
																	icon : "sap-icon://overflow",
																	tooltip : "Expand",
																	enabled : true,
																	visible : false,
																	press : function() {
																		oController
																				.handleExpandPress();
																	}
																}),
														*/		
														requestButtonForMainToolbar,
														new sap.m.Button(
																"favoriteButtonMainToolbarID",
																{
																	type : sap.m.ButtonType.Transparent,
																	icon : "sap-icon://favorite",
																	tooltip : "Favorite",
																	enabled : false,
																}),
													 ],
												design : sap.m.BarDesign.SubHeader
											}),
									content : [ panelPrincipal ],

								}).addStyleClass("sapUiFioriObjectPage");						
					}
				});