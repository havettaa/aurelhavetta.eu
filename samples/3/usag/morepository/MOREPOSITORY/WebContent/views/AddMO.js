jQuery.sap.require("sap.m.MessageToast");

jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectPMOFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectNumberMOFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectPackageFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectGetChildFactory' + m_urlVersion);

sap.ui
		.jsview(
				"ui5_routing.AddMo2",
				{

					/**
					 * Specifies the Controller belonging to this View. In the
					 * case that it is not implemented, or that "null" is
					 * returned, this View does not have a Controller.
					 * 
					 * @memberOf 00tsrhcp.Detail1
					 */
					getControllerName : function() {
						return "ui5_routing.AddMo2";
					},

					/**
					 * Is initially called once after the Controller has been
					 * instantiated. It is the place where the UI is
					 * constructed. Since the Controller is given to this
					 * method, its event handlers can be attached right away.
					 * 
					 * @memberOf 00tsrhcp.Detail1
					 */
					createContent : function(oController) {
						
						var that = this;

						var oFormSearch = new sap.ui.layout.form.SimpleForm(/*"oFormSearchId" ,*/{
							layout : sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
							title : "Measurement Object Assignments",
							columnsL : 1,
							columnsM : 1,
							columnsS : 1,
							labelSpanL : 3,
							emptySpanL : 3,
							labelSpanM : 3,
							emptySpanM : 3,
							minWidth : 1024,
							content : [ new sap.ui.core.Title({
								text : ""
							}), new sap.m.Label({
								text : "Product",
							}).addStyleClass("alignLabels"), 
							new sap.m.Text("productTextForSearchView",{
								//text : "{PRODUCT}"//sap.ui.getCore().byId('objHeaderPackageId').getTitle()
							})
							]
						});
						var oListFrequency = new sap.m.List(this.createId("listFrequency"), {
							mode : sap.m.ListMode.SingleSelectMaster,
							showValueHelp : true,
							width : "30rem",
							select : [ oController.handleFrequencySelected, oController ],
							growing : true,
							growingScrollToLoad : true,
							growingThreshold : 20,
						});

						var oListTemplateFrequency = new sap.m.ObjectListItem({
							title : {
								path : 'NAME',
								formatter : function(name) {
									if (name)
										return name;
								}
							},
							customData : {
								Type : "sap.ui.core.CustomData",
								key : "/Frequencies",
								value : "{ID}"
							},
						});

						oListFrequency.bindAggregation("items", "/Frequencies", oListTemplateFrequency);

						var oPopOverFrequency = new sap.m.Popover(this.createId("popoverFrequency"), {
							showHeader : false,
							placement : sap.m.PlacementType.Top,
							content : [ oListFrequency ],
							afterOpen : function() {
								that.byId("inputFrequency").focus();
							},
						});

						var oListStatus = new sap.m.List(this.createId("listStatus"), {
							mode : sap.m.ListMode.SingleSelectMaster,
							showValueHelp : true,
							width : "30rem",
							select : [ oController.handleStatusSelected, oController ],
							growing : true,
							growingScrollToLoad : true,
							growingThreshold : 20,
						});

						var oListTemplateStatus = new sap.m.ObjectListItem({
							title : {
								path : 'NAME',
								formatter : function(name) {
									if (name)
										return name;
								}
							},// "{NAME}",
							customData : {
								Type : "sap.ui.core.CustomData",
								key : "/SusageStatuses",
								value : "{ID}"
							},
						});

						oListStatus.bindAggregation("items", "/SusageStatuses", oListTemplateStatus);

						var oPopOverStatus = new sap.m.Popover(this.createId("popoverStatus"), {
							showHeader : false,
							placement : sap.m.PlacementType.Top,
							content : [ oListStatus ],
							afterOpen : function() {
								that.byId("inputStatus").focus();
							},
						});

						var oListMOType = new sap.m.List(this.createId("listMOType"), {
							mode : sap.m.ListMode.SingleSelectMaster,
							showValueHelp : true,
							width : "30rem",
							select : [ oController.handleMotypeSelected, oController ],
							growing : true,
							growingScrollToLoad : true,
							growingThreshold : 20,
						});

						var oListTemplateMOType = new sap.m.ObjectListItem({
							title : {
								path : 'NAME',
								formatter : function(name) {
									if (name)
										return name;
								}
							},
							customData : {
								Type : "sap.ui.core.CustomData",
								key : "ID",
								value : "{ID}"
							},
						});

						oListMOType.bindAggregation("items", "/MoTypes", oListTemplateMOType);

						var oPopOverMOType = new sap.m.Popover(this.createId("popoverMOType"), {
							showHeader : false,
							placement : sap.m.PlacementType.Bottom,
							content : [ oListMOType ],
							afterOpen : function() {
								sap.ui.getCore().byId('inputMOType').focus();
							},
						});

						var oListUOM = new sap.m.List(this.createId("listUOM"), {
							mode : sap.m.ListMode.SingleSelectMaster,
							showValueHelp : true,
							width : "30rem",
							select : [ oController.handleUOMSelected, oController ],
							growing : true,
							growingScrollToLoad : true,
							growingThreshold : 20,
						});

						var oListTemplateUOM = new sap.m.ObjectListItem({
							title : {
								path : 'NAME',
								formatter : function(name) {
									if (name)
										return name;
								}
							},
							customData : {
								Type : "sap.ui.core.CustomData",
								key : "/Uoms",
								value : "{ID}"
							},
						});

						oListUOM.bindAggregation("items", "/Uoms", oListTemplateUOM);

						var oPopOverUOM = new sap.m.Popover(this.createId("popoverUOM"), {
							showHeader : false,
							placement : sap.m.PlacementType.Top,
							content : [ oListUOM ],
							afterOpen : function() {
								that.byId("inputUOM").focus();
							},
						});


						var olistAGGREGATION = new sap.m.List(this.createId("listAGGREGATION"), {
							mode : sap.m.ListMode.SingleSelectMaster,
							showValueHelp : true,
							width : "30rem",
							select : [ oController.handleAGGREGATIONSelected, oController ],
							growing : true,
							growingScrollToLoad : true,
							growingThreshold : 20,
						});

						var oListTemplateAGGREGATION = new sap.m.ObjectListItem({
							title : {
								path : 'NAME',
								formatter : function(name) {
									if (name)
										return name;
								}
							},
							customData : {
								Type : "sap.ui.core.CustomData",
								key : "/Aggregations",
								value : "{ID}"
							},
						});

						olistAGGREGATION.bindAggregation("items", "/Aggregations", oListTemplateAGGREGATION);

						var oPopOverAGGREGATION = new sap.m.Popover(this.createId("popoverAGGREGATION"), {
							showHeader : false,
							placement : sap.m.PlacementType.Top,
							content : [ olistAGGREGATION ],
							afterOpen : function() {
								that.byId("inputAGGREGATION").focus();
							},
						});

					
						function quickhelp(oControl, sText, bCustomize) {
							// create the RichTooltip control
							var oRichTooltip = new sap.ui.commons.RichTooltip({
								text : sText,
								title : "Quick Help",
								imageSrc : "images/Tip.gif"
							});
							// Change position and durations if required
							if (bCustomize) {
								oRichTooltip.setMyPosition("begin top");
								oRichTooltip.setAtPosition("end top");
								oRichTooltip.setOpenDuration(300);
								oRichTooltip.setCloseDuration(300);
							}
							// add it to the control
							oControl.setTooltip(oRichTooltip);
							// return the control itself (makes this function a
							// decorator function)
							return oControl;
						}
						;

						var oCore = sap.ui.getCore();
						var inputAgg = new sap.m.Input(this.createId("inputAGGREGATION"), {
							enabled : false,
							value : "{typeMO>/AGG}",
							placeholder : "Add Aggregation",
							valueHelpRequest : function(oControlEvent) {
								that.byId("inputAGGREGATION").setValue("");
								olistAGGREGATION.setModel(sap.ui.getCore().getModel('model'));
								oPopOverAGGREGATION.openBy(that.byId("inputAGGREGATION"));
								oController.filterAGGREGATION();
								sap.ui.getCore().byId("butonelSysAggregation").setIcon("sap-icon://sys-cancel");
							},
							liveChange : function() {
								olistAGGREGATION.setModel(sap.ui.getCore().getModel('model'));
								oPopOverAGGREGATION.openBy(that.byId("inputAGGREGATION"));
								oController.filterAGGREGATION();
								sap.ui.getCore().byId("butonelSysAggregation").setIcon("sap-icon://sys-cancel");
							}

						}).attachBrowserEvent('click', function() {
							that.byId("inputAGGREGATION").setValue(that.byId("inputAGGREGATION").getValue());
							olistAGGREGATION.setModel(sap.ui.getCore().getModel('model'));
							if (sap.ui.getCore().byId('inputMOType').getValue() == 'NEMO') {
								oPopOverAGGREGATION.openBy(that.byId("inputAGGREGATION"));
							}
							oController.filterAGGREGATION();
						});
						var inputType = new sap.m.Input("inputMOType", {
							editable: false,
							enabled : false,
							placeholder : "Please assign a MO Type",
							valueHelpRequest : function(oControlEvent) {
								sap.ui.getCore().byId('inputMOType').setValue("");
								oListMOType.setModel(sap.ui.getCore().getModel('model'));
								oPopOverMOType.openBy(sap.ui.getCore().byId('inputMOType'));
								oController.filterMotype();
								sap.ui.getCore().byId("butonelSysType").setIcon("sap-icon://sys-cancel");
							}
						});
						var inputUOM = new sap.m.Input(this.createId("inputUOM"), {
							enabled : false,
							value : "{typeMO>/UOM}",
							placeholder : "Add Unit of Measure",
							valueHelpRequest : function(oControlEvent) {
								that.byId("inputUOM").setValue("");
								oListUOM.setModel(sap.ui.getCore().getModel('model'));
								oPopOverUOM.openBy(that.byId("inputUOM"));
								oController.filterUOM();
								sap.ui.getCore().byId("butonelSysUOM").setIcon("sap-icon://sys-cancel");
							},
							liveChange : function() {
								oListUOM.setModel(sap.ui.getCore().getModel('model'));
								oPopOverUOM.openBy(that.byId("inputUOM"));
								oController.filterUOM();
								sap.ui.getCore().byId("butonelSysUOM").setIcon("sap-icon://sys-cancel");
							}
						}).attachBrowserEvent('click', function() {
							that.byId("inputUOM").setValue(that.byId("inputUOM").getValue());
							oListUOM.setModel(sap.ui.getCore().getModel('model'));
							oController.filterUOM();
							if (sap.ui.getCore().byId('inputMOType').getValue() == 'NEMO')
								oPopOverUOM.openBy(that.byId("inputUOM"));
						});
						var inputFrequency = new sap.m.Input(this.createId("inputFrequency"), {
							enabled : false,
							value : "{typeMO>/FREQ}",
							placeholder : "Please assign a Measurement Frequency",
							valueHelpRequest : function(oControlEvent) {
								that.byId("inputFrequency").setValue("");
								oListFrequency.setModel(sap.ui.getCore().getModel('model'));
								oPopOverFrequency.openBy(that.byId("inputFrequency"));
								oController.filterFrequency();
								sap.ui.getCore().byId("butonelSys").setIcon("sap-icon://sys-cancel");
							},
							liveChange : function() {
								oListFrequency.setModel(sap.ui.getCore().getModel('Frequencies'));
								oPopOverFrequency.openBy(that.byId("inputFrequency"));
								oController.filterFrequency();

								sap.ui.getCore().byId("butonelSys").setIcon("sap-icon://sys-cancel");
							}
						}).attachBrowserEvent('click', function() {
							that.byId("inputFrequency").setValue(that.byId("inputFrequency").getValue());
							oListFrequency.setModel(sap.ui.getCore().getModel('model'));
							oController.filterFrequency();
							if (sap.ui.getCore().byId('inputMOType').getValue() == 'NEMO')
								oPopOverFrequency.openBy(that.byId("inputFrequency"));

						});
						inputName = new sap.m.Input("keyTextFieldId", {
							placeholder : "Add Name",
							required : true,
							enabled : "{typeMO>/enabledName}",
							ontap : function(oEvent) {
								console.log(oEvent);
							},
							maxLength : 50,
						});
						var oFormDetails = new sap.ui.layout.form.SimpleForm(
								"oFormDetailsID",
								{
									layout : sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
									columnsL : 1,
									columnsM : 1,
									columnsS : 1,
									labelSpanL : 3,
									emptySpanL : 3,
									labelSpanM : 3,
									emptySpanM : 3,
									minWidth : 1024,
									content : [
											
											new sap.m.Label({
												text : "Measurement Object Type",
												required : true
											}).addStyleClass("alignLabels"),
											new sap.m.Bar(
													{
														
														
														enableFlexBox : false,
														contentLeft : quickhelp(inputType,
																"This field is mandatory. New measurements you define is type NEMO. As we collect Business Function usage as default, you can design existing BF here to include the BF usage as part of PF usage."),
														contentMiddle : new sap.m.Button("butonelSysType", {											
															visible : true,
															enable : false,
															icon : "sap-icon://arrow-down",
															press : function(oEvent) {
																if (sap.ui.getCore().byId("butonelSysType").getIcon() == "sap-icon://arrow-down") {
																	sap.ui.getCore().byId('inputMOType').setValue("");
																	that.byId("listMOType").removeSelections(true);
																	sap.ui.getCore().byId('inputMOType').setValue(sap.ui.getCore().byId('inputMOType').getValue());
																	oListMOType.setModel(sap.ui.getCore().getModel('model'));
																	oController.filterMotype();
																	oPopOverMOType.openBy(sap.ui.getCore().byId('inputMOType'));

																	// //////////////////////
																	sap.ui.getCore().byId('butonelSys').setVisible(false);
																	sap.ui.getCore().byId('butonelSysSusage').setVisible(false);
																	sap.ui.getCore().byId('butonelSysUOM').setVisible(false);
																	sap.ui.getCore().byId('butonelSysAggregation').setVisible(false);

																} else {
																	sap.ui.getCore().byId("butonelSysType").setIcon("sap-icon://arrow-down");
																	sap.ui.getCore().byId('inputMOType').setValue("");
																	that.byId("listMOType").removeSelections(true);
																	oListMOType.setModel(sap.ui.getCore().getModel('model'));
																	oController.filterMotype();
																}
															}
														}).addStyleClass("delete")
													}).addStyleClass("productBar"),

								

											new sap.m.Label("labelTechnameMOID", {
												text : 'Technical Name',
												required : true
											}),
											quickhelp(
													new sap.m.Input("technicalNameFieldIdMO", {
														placeholder : "Add Technical Name",
														maxLength : 50,
														enabled : "{typeMO>/enabledTech}",
														value : {
															path : "/txt",
															type : new sap.ui.model.type.String(null, {
																search : new RegExp("^[A-Za-z0-9_./ ]+$")
															})
														},
														valueStateText : "Only letters (upper or lowercase), numbers (0-9), space, underscore (_), dot and slash (/) are allowed.",
														showValueHelp : true,
														valueHelpRequest : function(oEvent) {

															
															var that = this;

															handleClose = function(oEvent) {
																var oSelectedItem = oEvent.getParameter("selectedItem");
																if (oSelectedItem) {
																	sap.ui.getCore().byId("technicalNameFieldIdMO").setValue(oSelectedItem.getTitle());
																	
																	inputName.setValue(oSelectedItem.getInfo());

																}
																
															};
															
															if (!this._valueHelpSelectDialog) {
																this._valueHelpSelectDialog = new sap.m.SelectDialog("valueHelpSelectDialog", {
																	title : "Technical Name",
																	items : {
																		path : "/ATV_TRAN_TEXTS",
																		template : new sap.m.StandardListItem({
																			title : "{TECHNICAL_NAME}",
																			info : "{TRAN_NAME}",
																			active : true
																		})
																	},
																	growingThreshold : 20,
																	growing : true,
																	search : function(oEvent) {
																		var sValue = oEvent.getParameter("value");
																		var oFilter = new sap.ui.model.Filter("TECHNICAL_NAME", sap.ui.model.FilterOperator.Contains, sValue);
																		oEvent.getSource().getBinding("items").filter([ oFilter ]);
																	},
																	confirm : handleClose,
																	cancel : handleClose
																});

																this._valueHelpSelectDialog.setModel(this.getModel('techs'));

															} else {
																this._valueHelpSelectDialog.setModel(this.getModel('techs'));
															}
															this._valueHelpSelectDialog.open(that.getValue());
															var sValue = that.getValue();
															var oFilterSEARCH = new sap.ui.model.Filter("TECHNICAL_NAME", sap.ui.model.FilterOperator.Contains, sValue);
															var typeValue = oListMOType.getSelectedItem().getCustomData()[0].getValue();
															var oFilterTYPE = new sap.ui.model.Filter("TYPE", sap.ui.model.FilterOperator.Contains, typeValue);
															var oFilter = new sap.ui.model.Filter({
																filters : [ oFilterSEARCH, oFilterTYPE ],
																bAnd : true
															});
															this._valueHelpSelectDialog.getBinding("items").filter(oFilter);

														},

														liveChange : function(oEvent) {
															this.setValue(oEvent.getParameter("value").toUpperCase());
														},
													}),
													"Define Technical ID of the Measurement object. This field is mandatory. Please use [S4]_[Feature Name]_[001] to  [999] must be unique in a codeline. Only letters (upper or lowercase), numbers (0-9), space, underscore (_), dot and slash (/) are allowed. Can be equal cross to the codelines (used for Cross/Business Measurement Objects). Max. length 50 characters"),
											new sap.m.Label("labelNameMOID", {
												text : 'Name',
												required : true,
										
											}),
											quickhelp(inputName, "Define meaningful name for Measurement Object. This field is mandatory. Max. length 50 characters"),

											new sap.m.Label("descriptionMOID", {
												text : 'Description',
											}),
											quickhelp(
													new sap.m.TextArea(this.createId("descriptionFieldId"), {
														placeholder : "Add Description",
														rows : 4,
														maxLength : 2500,
														enabled : "{typeMO>/enabledDescription}"
													}),
													"Place for a formalized long description. This helps other colleagues to fully understand what the MO does and what the business value is. Differences of version are also described here. Max. length 2500 characters"),
											new sap.m.Label("labelMOLogicID", {
												text : 'Measurement Object Logic',
											}),
											quickhelp(new sap.m.TextArea(this.createId("moLogicFieldId"), {
												placeholder : "Add Measurement Object Logic",
												rows : 3,
												maxLength : 1000,
												enabled : "{typeMO>/enabledLogic}"
											}), "Place for program logic, SQL statement, select statement. Max. length 1000 characters "),

											
											new sap.m.Label({
												text : "Measurement Frequency",
											}).addStyleClass("alignLabels"),
											new sap.m.Bar({
												enableFlexBox : true,
												contentLeft : inputFrequency,
												contentMiddle : new sap.m.Button("butonelSys", {
													visible : false,
													icon : "sap-icon://arrow-down",
													press : function(oEvent) {
														if (sap.ui.getCore().byId("butonelSys").getIcon() == "sap-icon://arrow-down") {
															that.byId("inputFrequency").setValue("");
															that.byId("listFrequency").removeSelections(true);
															oListFrequency.setModel(sap.ui.getCore().getModel('model'));
															oController.filterFrequency();
															oPopOverFrequency.openBy(that.byId("inputFrequency"));
															sap.ui.getCore().byId("butonelSys").setIcon("sap-icon://arrow-down");
														} else {
															that.byId("inputFrequency").setValue("");
															that.byId("listFrequency").removeSelections(true);
															oListFrequency.setModel(sap.ui.getCore().getModel('model'));
															oController.filterFrequency();
															sap.ui.getCore().byId("butonelSys").setIcon("sap-icon://arrow-down");

														}

													}
												}).addStyleClass("delete")
											}).addStyleClass("productBar"),

										
											new sap.m.Label({
												text : "Measurement method",
											}).addStyleClass("alignLabels"),
											new sap.m.Bar({
												enableFlexBox : true,
												contentLeft : new sap.m.Input(this.createId("inputStatus"), {
													enabled : false,
													placeholder : "Please assign a measurement method",
													valueHelpRequest : function(oControlEvent) {
														that.byId("inputStatus").setValue("");
														oListStatus.setModel(sap.ui.getCore().getModel('model'));
														oPopOverStatus.openBy(that.byId("inputStatus"));
														oController.filterStatus();
														sap.ui.getCore().byId("butonelSysSusage").setIcon("sap-icon://cancel");
													},
													liveChange : function() {
														oListStatus.setModel(sap.ui.getCore().getModel('SusageStatuses'));
														oPopOverStatus.openBy(that.byId("inputStatus"));
														oController.filterStatus();
														sap.ui.getCore().byId("butonelSysSusage").setIcon("sap-icon://cancel");
													}
												}).attachBrowserEvent('click', function() {

													that.byId("inputStatus").setValue(that.byId("inputStatus").getValue());
													oListStatus.setModel(sap.ui.getCore().getModel('model'));
													oController.filterStatus();
													if (sap.ui.getCore().byId('inputMOType').getValue() == 'NEMO')
														oPopOverStatus.openBy(that.byId("inputStatus"));
												}),
												contentMiddle : new sap.m.Button("butonelSysSusage", {
													visible : false,
													icon : "sap-icon://arrow-down",
													press : function(oEvent) {
														if (sap.ui.getCore().byId("butonelSysSusage").getIcon() == "sap-icon://arrow-down") {
															that.byId("inputStatus").setValue("");
															that.byId("listStatus").removeSelections(true);
															oListStatus.setModel(sap.ui.getCore().getModel('model'));
															that.byId("inputStatus").setValue(that.byId("inputStatus").getValue());
															oController.filterStatus();
															oPopOverStatus.openBy(that.byId("inputStatus"));
														} else {
															that.byId("inputStatus").setValue("");
															that.byId("listStatus").removeSelections(true);
															oListStatus.setModel(sap.ui.getCore().getModel('model'));
															oController.filterStatus();
															sap.ui.getCore().byId("butonelSysSusage").setIcon("sap-icon://arrow-down");
														}
													},
												}).addStyleClass("delete")
											}).addStyleClass("productBar"),

											new sap.m.Label({
												text : "Unit of Measure",
											}).addStyleClass("alignLabels"),
											new sap.m.Bar({
												enableFlexBox : true,
												contentLeft : quickhelp(inputUOM,
														"Keyfigure Unit from SAP Unit catalog. Is being displayed in report. Is used to exchange units of measures and for calculations."),
												contentMiddle : new sap.m.Button("butonelSysUOM", {
													visible : false,
													icon : "sap-icon://arrow-down",
													press : function(oEvent) {
														if (sap.ui.getCore().byId("butonelSysUOM").getIcon() == "sap-icon://arrow-down") {
															that.byId("inputUOM").setValue("");
															that.byId("listUOM").removeSelections(true);
															oListUOM.setModel(sap.ui.getCore().getModel('model'));
															oController.filterUOM();
															oPopOverUOM.openBy(that.byId("inputUOM"));
															sap.ui.getCore().byId("butonelSysUOM").setIcon("sap-icon://arrow-down");
														} else {
															that.byId("inputUOM").setValue("");
															that.byId("listUOM").removeSelections(true);
															oListUOM.setModel(sap.ui.getCore().getModel('model'));
															oController.filterUOM();
															sap.ui.getCore().byId("butonelSysUOM").setIcon("sap-icon://arrow-down");
														}
													}
												}).addStyleClass("delete")
											}).addStyleClass("productBar"),
											// Aggregation
											new sap.m.Label({
												text : "Aggregation",
											}).addStyleClass("alignLabels"),
											new sap.m.Bar({
												enableFlexBox : true,
												contentLeft : quickhelp(inputAgg,
														"The standard aggregation of measured values in collection and transport of the MO and standard for using in Reporting."),
												contentMiddle : new sap.m.Button("butonelSysAggregation", {
													visible : false,
													icon : "sap-icon://arrow-down",
													press : function(oEvent) {
														if (sap.ui.getCore().byId("butonelSysAggregation").getIcon() == "sap-icon://arrow-down") {
															that.byId("inputAGGREGATION").setValue("");
															that.byId("listAGGREGATION").removeSelections(true);
															olistAGGREGATION.setModel(sap.ui.getCore().getModel('model'));
															oController.filterAGGREGATION();
															oPopOverAGGREGATION.openBy(that.byId("inputAGGREGATION"));
															sap.ui.getCore().byId("butonelSysAggregation").setIcon("sap-icon://arrow-down");
														} else {
															that.byId("inputAGGREGATION").setValue("");
															that.byId("listAGGREGATION").removeSelections(true);
															olistAGGREGATION.setModel(sap.ui.getCore().getModel('model'));
															oController.filterAGGREGATION();
															sap.ui.getCore().byId("butonelSysAggregation").setIcon("sap-icon://arrow-down");
														}
													}
												}).addStyleClass("delete")
											}).addStyleClass("productBar"),

											new sap.m.Label("labeldateEntryID", {
												text : 'Date of entry',
											}), new sap.m.DateTimeInput(this.createId("dateFieldID"), {
												valueFormat : "yyyyMMdd",
												enabled : false,
												dateValue : new Date()
											}) 
									]
								});

						var list = new sap.m.List({
							growing : true,
							growingThreshold : 20
						});
						var tempList = new sap.m.ObjectListItem({
							title : "{techs>TECHNICAL_NAME}",

						});
						list.bindItems("techs>/ATV_TRAN_TEXTS", tempList);

						var iconTabBar = new sap.m.Panel({
							expanded : "{device>/isNoPhone}",
							height : '100%',	
							headerToolbar : new sap.m.Toolbar("toolbarAddmoID", {
								height : "3rem",
								content : [ new sap.m.Label("labelGlobalMO"), new sap.m.ToolbarSpacer() ]
							}).addStyleClass("noborder"),
							content : [ oFormDetails ]

						});

						oCore.setModel(new sap.ui.model.json.JSONModel({
							txt : ""
						}));
						oCore.attachValidationError(function(oEvent) {
							oEvent.getParameter("element").setValueState(sap.ui.core.ValueState.Error);
						});
						oCore.attachValidationSuccess(function(oEvent) {
							oEvent.getParameter("element").setValueState(sap.ui.core.ValueState.None);
						});


						var saveButton = new sap.m.Button({
							text : "ADD",
							type : sap.m.ButtonType.Accept,
							style : sap.ui.commons.ButtonStyle.Accept,
							press : function(oEvent) {
								oController.addMo(oEvent);
							}
						});

						var cancelButton = new sap.m.Button({
							text : "CANCEL",
							type : sap.m.ButtonType.Reject,
							style : sap.ui.commons.ButtonStyle.Reject,
							press : function(oEvent) {
								oController.handleNavBack(oEvent);
							}
						});

						var gridContainer = new sap.ui.layout.Grid({
							defaultSpan : "L12 M12 S12",
							vSpacing : 0,
							hSpacing : 0,
							width : "auto",
							content : [ ]
						});

						var oPanel = new sap.m.Panel({
							headerToolbar : new sap.m.Toolbar("PanelIdNavMOCreation", {
								height : "3rem",
								headerText : "bla"
							}).addStyleClass("noborder"),
							height : "3rem"
						});
						return new sap.m.Page(this.createId("page"), {
							title : "Create Measurement Object",
							height : '100%',
							customHeader : new sap.m.Bar("PanelIdNavAdd", {
								contentRight : [],
								contentLeft : [ new sap.m.Button({
									icon : "sap-icon://nav-back",
									press : function(oEvent) {
										oController.handleNavBack(oEvent);
									}
								}) ],
								design : sap.m.BarDesign.SubHeader
							}),
						
							content : [ iconTabBar ],
							footer : new sap.m.Bar({
								contentRight : [ saveButton, cancelButton ]
							})
						});
					}
				});