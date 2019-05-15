sap.ui
		.jsview(
				"ui5_routing.EditMo2",
				{

					/**
					 * Specifies the Controller belonging to this View. In the
					 * case that it is not implemented, or that "null" is
					 * returned, this View does not have a Controller.
					 * 
					 * @memberOf 00tsrhcp.Detail1
					 */
					getControllerName : function() {
						return "ui5_routing.EditMo2";
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
						// for Frequency
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

						// For Susage status
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
							},
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

	

						var oFormSearch = new sap.ui.layout.form.SimpleForm( "oFormSearchId" , {
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
							}).addStyleClass("alignLabels"), new sap.m.Text("productTextForSearchViewEdit", {

							}), new sap.m.Label({
								text : "Feature",
							}).addStyleClass("alignLabels"), new sap.m.Bar({
								enableFlexBox : true,
								contentLeft : new sap.m.Input(this.createId("inputFieldEdit"), {
									placeholder : "Please assign a feature",
									valueHelpRequest : function(oControlEvent) {
										that.byId("inputFieldEdit").setValue("");
										oListFeature.setModel(sap.ui.getCore().getModel('pageModel'));
										oPopOverFeature.openBy(that.byId("inputFieldEdit"));
										oController.filterFeature();
									},
									liveChange : function() {
										oListFeature.setModel(sap.ui.getCore().getModel('pageModel'));
										oPopOverFeature.openBy(that.byId("inputFieldEdit"));
										oController.filterFeature();
									}
								}).attachBrowserEvent('click', function() {
									that.byId("inputFieldEdit").setValue(that.byId("inputFieldEdit").getValue());
									oListFeature.setModel(sap.ui.getCore().getModel('pageModel'));
									oController.filterFeature();
									oPopOverFeature.openBy(that.byId("inputFieldEdit"));
								}),
								contentMiddle : new sap.m.Button({
									visible : true,
									icon : "sap-icon://sys-cancel",
									press : function(oEvent) {
										that.byId("inputFieldEdit").setValue("");
										that.byId("listFeature").removeSelections(true);
										oListFeature.setModel(sap.ui.getCore().getModel('pageModel'));
										oController.filterFeature();
									}
								}).addStyleClass("delete")
							}).addStyleClass("productBar"), new sap.m.Label({
								text : "Solution",
							}).addStyleClass("alignLabels"), new sap.m.Bar({
								enableFlexBox : true,
								contentLeft : new sap.m.Input(this.createId("inputSolutionEdit"), {
									placeholder : "Please assign a solution",
									valueHelpRequest : function(oControlEvent) {
										that.byId("inputSolutionEdit").setValue("");
										oListSolution.setModel(sap.ui.getCore().getModel('pageModel'));
										oPopOverSolution.openBy(that.byId("inputSolutionEdit"));
										oController.filterSolution();
									},
									liveChange : function() {
										oListSolution.setModel(sap.ui.getCore().getModel('pageModel'));
										oPopOverSolution.openBy(that.byId("inputSolutionEdit"));
										oController.filterSolution();
									}
								}).attachBrowserEvent('click', function() {
									that.byId("inputSolutionEdit").setValue(that.byId("inputSolutionEdit").getValue());
									oListSolution.setModel(sap.ui.getCore().getModel('pageModel'));
									oController.filterSolution();
									oPopOverSolution.openBy(that.byId("inputSolutionEdit"));
								}),
								contentMiddle : new sap.m.Button({
									visible : true,
									icon : "sap-icon://sys-cancel",
									press : function(oEvent) {
										that.byId("inputSolutionEdit").setValue("");
										that.byId("listSolution").removeSelections(true);
										oListSolution.setModel(sap.ui.getCore().getModel('pageModel'));
										oController.filterSolution();
									}
								}).addStyleClass("delete")
							}).addStyleClass("productBar"), ]
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
								key : "/MoTypes",
								value : "{ID}"
							},
						});

						oListMOType.bindAggregation("items", "/MoTypes", oListTemplateMOType);

						var oPopOverMOType = new sap.m.Popover(this.createId("popoverMOType"), {
							showHeader : false,
							placement : sap.m.PlacementType.Top,
							content : [ oListMOType ],
							afterOpen : function() {
								that.byId("inputMOType").focus();
							},
						});

						// for UOM
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

						// for Aggregation

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
						var techregex = /^[A-Za-z0-9_./ ]*$/;

						var techNameVar = new sap.m.Input(this.createId("technicalNameFieldId"), {
							placeholder : "Add Technical Name",
							maxLength : 50,
							valueStateText : "Only letters (upper or lowercase), numbers (0-9), space, underscore (_), dot and slash (/) are allowed.",

							liveChange : function(oEvent) {
								this.setValue(oEvent.getParameter("value").toUpperCase());
								techNameVar.setValueState(techNameVar.getValue().match(techregex) ? sap.ui.core.ValueState.None : sap.ui.core.ValueState.Error

								);
							},
						});

						var simpleForm = new sap.ui.layout.form.SimpleForm(
								this.createId("oFormDetailsID"),
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
											new sap.m.Label("labelNameMOEditID", {
												text : 'Name',
											}),
											quickhelp(new sap.m.Input(this.createId("keyTextFieldId"), {
												placeholder : "Add Name",
												required : true,
												maxLength : 50
											}), "Meaningful name for Measurement Object. Max. length 50 characters")/*
											 * As
											 * this
											 * a
											 * mandatory
											 * information,
											 * you
											 * can
											 * not
											 * leave
											 * the
											 * field
											 * empty.
											 */
											,
											new sap.m.Label("labelTechnameMOEditID", {
												text : 'Technical Name',
											}),
											quickhelp(
													techNameVar,
													"Define Technical ID of the Measurement object. Please use [S4]_[Feature Name]_[001] to  [999] must be unique in a codeline. Only letters (upper or lowercase), numbers (0-9), space, underscore (_), dot and slash (/) are allowed. Can be equal cross to the codelines (used for Cross/Business Measurement Objects). Max. length 50 characters"),
											new sap.m.Label("descriptionMOEditID", {
												text : 'Description',
											}),
											quickhelp(
													new sap.m.TextArea(this.createId("descriptionFieldId"), {
														placeholder : "Add Description",
														rows : 4,
														required : true,
														maxLength : 2500
													}),
													"Place for a formalized long description. This helps other colleagues to fully understand what the MO does and what the business value is. Differences of version are also described here. Max. length 2500 characters"),
											new sap.m.Label("labelMOLogicEditID", {
												text : 'Measurement Object Logic',
											}),
											quickhelp(new sap.m.TextArea(this.createId("moLogicFieldId"), {
												rows : 3,
												required : true,
												maxLength : 1000
											}), "Place for program logic, SQL statement, select statement. Max. length 1000 characters "),

											// Frequency
											new sap.m.Label({
												text : "Measurement Frequency",
											}).addStyleClass("alignLabels"),
											new sap.m.Bar(this.createId("inputFrequencyBar"), {
												enableFlexBox : true,
												contentLeft : new sap.m.Input(this.createId("inputFrequency"), {
													enabled:false,
													valueHelpRequest : function(oControlEvent) {
														that.byId("inputFrequency").setValue("");
														oListFrequency.setModel(sap.ui.getCore().getModel('model'));
														oPopOverFrequency.openBy(that.byId("inputFrequency"));
														oController.filterFrequency();
														sap.ui.getCore().byId("butonelSysEdit").setIcon("sap-icon://sys-cancel");
													},
													liveChange : function() {
														oListFrequency.setModel(sap.ui.getCore().getModel('Frequencies'));

														oPopOverFrequency.openBy(that.byId("inputFrequency"));
														oController.filterFrequency();
														sap.ui.getCore().byId("butonelSysEdit").setIcon("sap-icon://sys-cancel");
													}
												}).attachBrowserEvent('click', function() {
													that.byId("inputFrequency").setValue(that.byId("inputFrequency").getValue());
													oListFrequency.setModel(sap.ui.getCore().getModel('model'));
													oController.filterFrequency();

													if (that.byId('inputMOType').getValue() == 'NEMO') {
														oPopOverFrequency.openBy(that.byId("inputFrequency"));
													}

												}),
												contentMiddle : new sap.m.Button("butonelSysEdit", {
													visible : true,
													icon : "sap-icon://arrow-down",
													press : function(oEvent) {

														if (sap.ui.getCore().byId("butonelSysEdit").getIcon() == "sap-icon://arrow-down") {
															that.byId("inputFrequency").setValue("");
															that.byId("listFrequency").removeSelections(true);
															oListFrequency.setModel(sap.ui.getCore().getModel('model'));
															oController.filterFrequency();
															oPopOverFrequency.openBy(that.byId("inputFrequency"));
															sap.ui.getCore().byId("butonelSysEdit").setIcon("sap-icon://arrow-down");
														} else {
															that.byId("inputFrequency").setValue("");
															that.byId("listFrequency").removeSelections(true);
															oListFrequency.setModel(sap.ui.getCore().getModel('model'));
															oController.filterFrequency();
															sap.ui.getCore().byId("butonelSysEdit").setIcon("sap-icon://arrow-down");

														}
													}
												}).addStyleClass("delete")
											}).addStyleClass("productBar"),

											// For Susage status
											new sap.m.Label({
												text : "Measurement method",
											}).addStyleClass("alignLabels"),
											new sap.m.Bar(this.createId("inputStatusBar"), {
												enableFlexBox : true,
												contentLeft : new sap.m.Input(this.createId("inputStatus"), {
													enabled:false,
													valueHelpRequest : function(oControlEvent) {
														that.byId("inputStatus").setValue("");
														oListStatus.setModel(sap.ui.getCore().getModel('model'));
														oPopOverStatus.openBy(that.byId("inputStatus"));
														oController.filterStatus();
														sap.ui.getCore().byId("butonelSysSusageEdit").setIcon("sap-icon://sys-cancel");
													},
													liveChange : function() {
														oListStatus.setModel(sap.ui.getCore().getModel('SusageStatuses'));
														oPopOverStatus.openBy(that.byId("inputStatus"));

														oController.filterStatus();
														sap.ui.getCore().byId("butonelSysSusageEdit").setIcon("sap-icon://sys-cancel");
													}
												}).attachBrowserEvent('click', function() {
													that.byId("inputStatus").setValue(that.byId("inputStatus").getValue());
													oListStatus.setModel(sap.ui.getCore().getModel('model'));
													oController.filterStatus();

													if (that.byId('inputMOType').getValue() == 'NEMO') {
														oPopOverStatus.openBy(that.byId("inputStatus"));
													}

												}),
												contentMiddle : new sap.m.Button("butonelSysSusageEdit", {
													visible : true,
													icon : "sap-icon://arrow-down",
													press : function(oEvent) {
														if (sap.ui.getCore().byId("butonelSysSusageEdit").getIcon() == "sap-icon://arrow-down") {
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
															sap.ui.getCore().byId("butonelSysSusageEdit").setIcon("sap-icon://arrow-down");
														}
													}
												}).addStyleClass("delete")
											}).addStyleClass("productBar"),

											// MO Type
											new sap.m.Label({
												text : "Measurement Object Type",
											}).addStyleClass("alignLabels"),
											new sap.m.Bar(
													this.createId("inputMOTypeBar"),
													{
														enableFlexBox : true,
														contentLeft : quickhelp(new sap.m.Input(this.createId("inputMOType"), {
															valueHelpRequest : function(oControlEvent) {
																that.byId("inputMOType").setValue("");
																oListMOType.setModel(sap.ui.getCore().getModel('model'));
																oPopOverMOType.openBy(that.byId("inputMOType"));
																oController.filterMotype();
																sap.ui.getCore().byId("butonelSysTypeEdit").setIcon("sap-icon://sys-cancel");
															},
															liveChange : function() {
																oListMOType.setModel(sap.ui.getCore().getModel('MoTypes'));
																oPopOverMOType.openBy(that.byId("inputMOType"));
																oController.filterMotype();
																sap.ui.getCore().byId("butonelSysTypeEdit").setIcon("sap-icon://sys-cancel");
															}
														}).attachBrowserEvent('click', function() {
															that.byId("inputMOType").setValue(that.byId("inputMOType").getValue());
															oListMOType.setModel(sap.ui.getCore().getModel('model'));
															oController.filterMotype();

															if (that.byId('inputMOType').getValue() == 'NEMO') {
																oPopOverMOType.openBy(that.byId("inputMOType"));
															}

														}),
																"New measurements you define is type NEMO. As we collect Business Function usage as default, you can design existing BF here to include the BF usage as part of PF usage."),
														contentMiddle : new sap.m.Button("butonelSysTypeEdit", {
															visible : true,
															icon : "sap-icon://arrow-down",
															press : function(oEvent) {
																that.byId("inputMOType").setValue("");
																that.byId("listMOType").removeSelections(true);
																oListMOType.setModel(sap.ui.getCore().getModel('model'));
																oController.filterMotype();
																sap.ui.getCore().byId("butonelSysTypeEdit").setIcon("sap-icon://arrow-down");
															}
														}).addStyleClass("delete")
													}).addStyleClass("productBar"),
											// UOM
											new sap.m.Label({
												text : "Unit of Measure",
											}).addStyleClass("alignLabels"), new sap.m.Bar(this.createId("inputUOMBar"), {
												enableFlexBox : true,
												contentLeft : quickhelp(new sap.m.Input(this.createId("inputUOM"), {
													enabled:false,
													valueHelpRequest : function(oControlEvent) {
														that.byId("inputUOM").setValue("");
														oListUOM.setModel(sap.ui.getCore().getModel('model'));
														oPopOverUOM.openBy(that.byId("inputUOM"));
														oController.filterUOM();
														sap.ui.getCore().byId("butonelSysUOMEdit").setIcon("sap-icon://sys-cancel");
													},
													liveChange : function() {
														oListUOM.setModel(sap.ui.getCore().getModel('model'));
														oPopOverUOM.openBy(that.byId("inputUOM"));
														oController.filterUOM();
														sap.ui.getCore().byId("butonelSysUOMEdit").setIcon("sap-icon://sys-cancel");
													}
												}).attachBrowserEvent('click', function() {
													that.byId("inputUOM").setValue(that.byId("inputUOM").getValue());
													oListUOM.setModel(sap.ui.getCore().getModel('model'));
													oController.filterUOM();
													if (that.byId('inputMOType').getValue() == 'NEMO') {
														oPopOverUOM.openBy(that.byId("inputUOM"));
													}
												}), "Keyfigure Unit from SAP Unit catalog. Is being displayed in report. Is used to exchange units of measures and for calculations."),
												contentMiddle : new sap.m.Button("butonelSysUOMEdit", {
													visible : true,
													icon : "sap-icon://arrow-down",
													press : function(oEvent) {
														if (sap.ui.getCore().byId("butonelSysUOMEdit").getIcon() == "sap-icon://arrow-down") {
															that.byId("inputUOM").setValue("");
															that.byId("listUOM").removeSelections(true);
															oListUOM.setModel(sap.ui.getCore().getModel('model'));
															oController.filterUOM();
															oPopOverUOM.openBy(that.byId("inputUOM"));
															sap.ui.getCore().byId("butonelSysUOMEdit").setIcon("sap-icon://arrow-down");
														} else {
															that.byId("inputUOM").setValue("");
															that.byId("listUOM").removeSelections(true);
															oListUOM.setModel(sap.ui.getCore().getModel('model'));
															oController.filterUOM();
															sap.ui.getCore().byId("butonelSysUOMEdit").setIcon("sap-icon://arrow-down");
														}
													}
												}).addStyleClass("delete")
											}).addStyleClass("productBar"),
											// Aggregation
											new sap.m.Label({
												text : "Aggregation",
											}).addStyleClass("alignLabels"), new sap.m.Bar(this.createId("inputAGGREGATIONBar"), {
												enableFlexBox : true,
												contentLeft : quickhelp(new sap.m.Input(this.createId("inputAGGREGATION"), {
													enabled:false,
													valueHelpRequest : function(oControlEvent) {
														that.byId("inputAGGREGATION").setValue("");
														olistAGGREGATION.setModel(sap.ui.getCore().getModel('model'));
														oPopOverAGGREGATION.openBy(that.byId("inputAGGREGATION"));
														oController.filterAGGREGATION();
														sap.ui.getCore().byId("butonelSysAggregationEdit").setIcon("sap-icon://sys-cancel");
													},
													liveChange : function() {
														olistAGGREGATION.setModel(sap.ui.getCore().getModel('model'));
														oPopOverUOM.openBy(that.byId("inputUOM"));
														oController.filterAGGREGATION();
														sap.ui.getCore().byId("butonelSysAggregationEdit").setIcon("sap-icon://sys-cancel");
													}
												}).attachBrowserEvent('click', function() {
													that.byId("inputAGGREGATION").setValue(that.byId("inputAGGREGATION").getValue());
													olistAGGREGATION.setModel(sap.ui.getCore().getModel('model'));
													if (that.byId('inputMOType').getValue() == 'NEMO') {
														oPopOverUOM.openBy(that.byId("inputUOM"));
													}
													oController.filterAGGREGATION();
												}), "The standard aggregation of measured values in collection and transport of the MO and standard for using in Reporting."),
												contentMiddle : new sap.m.Button("butonelSysAggregationEdit", {
													visible : true,
													icon : "sap-icon://arrow-down",
													press : function(oEvent) {
														if (sap.ui.getCore().byId("butonelSysAggregationEdit").getIcon() == "sap-icon://arrow-down") {
															that.byId("inputAGGREGATION").setValue("");
															that.byId("listAGGREGATION").removeSelections(true);
															olistAGGREGATION.setModel(sap.ui.getCore().getModel('model'));
															oController.filterAGGREGATION();
															oPopOverAGGREGATION.openBy(that.byId("inputAGGREGATION"));
															sap.ui.getCore().byId("butonelSysAggregationEdit").setIcon("sap-icon://arrow-down");
														} else {
															that.byId("inputAGGREGATION").setValue("");
															that.byId("listAGGREGATION").removeSelections(true);
															olistAGGREGATION.setModel(sap.ui.getCore().getModel('model'));
															oController.filterAGGREGATION();
															sap.ui.getCore().byId("butonelSysAggregationEdit").setIcon("sap-icon://arrow-down");
														}
													}
												}).addStyleClass("delete")
											}).addStyleClass("productBar"), new sap.m.Label("dateOfEnterLabel", {
												text : 'Date of entry',
											}), new sap.m.DateTimeInput(this.createId("dateFieldID"), {
												valueFormat : "dd/MM/yyyy",
												enabled : false,
												dateValue : new Date()
											}), new sap.m.Label("dateOfChangeLabel", {
												text : "Date of change"
											}), new sap.m.DateTimeInput(this.createId("dateFieldChangeID"), {
												valueFormat : "dd/MM/yyyy",
												enabled : false,
												dateValue : new Date()
											}), ]
								});

						var saveButton = new sap.m.Button({
							text : "SAVE",
							type : sap.m.ButtonType.Accept,
							press : function(oEvent) {
								oController.saveMo(oEvent);
							}
						});

						var cancelButton = new sap.m.Button({
							text : "CANCEL",
							type : sap.m.ButtonType.Reject,
							press : function(oEvent) {
								oController.handleNavBack(oEvent);
							}
						});

						var oPanel = new sap.m.Panel({
							expanded : "{device>/isNoPhone}",
							height : '100%',
							headerToolbar : new sap.m.Toolbar("toolbarEditMOID", {
								height : "3rem",
								content : [ new sap.m.Label("labelGlobalEditMO"), , new sap.m.ToolbarSpacer() ]
							}).addStyleClass("noborder"),
							content : [ simpleForm ]
						});

						return new sap.m.Page(this.createId("page"), {
							height : '100%',
							customHeader : new sap.m.Bar("PanelIdNavMO", {
								contentLeft : [ new sap.m.Button({
									icon : "sap-icon://nav-back",
									press : function(oEvent) {
										oController.handleNavBack(oEvent);
									}
								}) ],
								design : sap.m.BarDesign.SubHeader
							}),

							content : [ oPanel ],
							footer : new sap.m.Bar({
								contentRight : [ saveButton, cancelButton ]
							})
						});
					}
				});