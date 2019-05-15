sap.ui
		.jsview(
				"ui5_routing.AddPackage",
				{

					/**
					 * Specifies the Controller belonging to this View. In the
					 * case that it is not implemented, or that "null" is
					 * returned, this View does not have a Controller.
					 * 
					 * @memberOf 00tsrhcp.Detail1
					 */
					getControllerName : function() {
						return "ui5_routing.AddPackage";
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

						var simpleForm = new sap.ui.layout.form.SimpleForm(
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
											new sap.m.Label("labelNamePackageID", {
												text : 'Name',
												required : true
											}),

											quickhelp(new sap.m.Input(this.createId("nameFieldId"), {
												placeholder : "Add Name",
												maxLength : 50,
												liveChange : function(oEvent) {
													if (oEvent.getParameter("value").length > 0)
														this.setValueState("None");
												}
											}), "Meaningful name for Package. Max. length 50 characters"),

											new sap.m.Label("labelTechnamePackageID", {
												text : 'Technical Name',
												required : true
											}),

											quickhelp(new sap.m.Input(this.createId("technicalNameFieldId"), {
												placeholder : "Add Technical Name",
												maxLength : 50,
												value : {
													path : "/txt",
													type : new sap.ui.model.type.String(null, {
														search : new RegExp("^[A-Za-z0-9_./ ]+$")
													})
												},
												valueStateText : "Only letters (upper or lowercase), numbers (0-9), space, underscore (_), dot and slash (/) are allowed.",
												liveChange : function(oEvent) {
													this.setValue(oEvent.getParameter("value").toUpperCase());
												}
											}),
													"Meaningful technical name for Package. Only letters (upper or lowercase), numbers (0-9), space, underscore (_), dot and slash (/) are allowed. Max. length 50 characters"),

											new sap.m.Label("descriptionPackageID", {
												text : 'Description',
											}),

											quickhelp(new sap.m.TextArea(this.createId("descriptionFieldId"), {
												placeholder : "Add Description",
												rows : 4,
												maxLength : 500
											}), "Meaningful description for Package. Max. length 500 characters"),
											new sap.m.Label("labelOwnerPackageID", {
												text : 'Owner',
											}).addStyleClass("alignLabels"),


											new sap.m.Text("ownerFieldId", {
															}),

											new sap.m.Label(
													{
														
														text : "{= ${/PARENT_TYPE} === 'feature' ? 'Feature name' : ( ${/PARENT_TYPE} === 'product' ? 'Product name' : ( ${/PARENT_TYPE} === 'solution' ? 'Solution name' :( ${/PARENT_TYPE} === 'innovation' ? 'Innovation name' : '')))}",
													}).addStyleClass("alignLabels"), 
											new sap.m.Text("productTextForPackageId", {
												visible: "{= ${/PARENT_TYPE} === 'feature' ? true : ( ${/PARENT_TYPE} === 'product' ? true : ( ${/PARENT_TYPE} === 'solution' ? true :( ${/PARENT_TYPE} === 'innovation' ? true : false)))}",
												})


									]
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

						var gridContainer = new sap.ui.layout.Grid({
							defaultSpan : "L12 M12 S12",
							vSpacing : 0,
							hSpacing : 0,
							width : "auto",
							content : [ ]
					
						});

						var iconTabBar = new sap.m.Panel(
								{
									expanded : "{device>/isNoPhone}",
									
									headerToolbar : new sap.m.Toolbar(
											"toolbarAddPackageID",
											{
												height : "3rem",
													content : [
														new sap.m.Label(
																"labelGlobalPackageMO",
																{
																	text : "{= ${/TYPE} === 'custom' ? 'This package will be added to ' + ${/NAME} + ' of type package' : 'This package will be added to ' + ${/NAME} + ' of type ' + ${/TYPE}}"
																}), new sap.m.ToolbarSpacer() ]
											}).addStyleClass("noborder"),
									content : [ simpleForm ]

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
					
						
						var listOverview = new sap.m.Page("listOverhkhgkjhbgkjhbview", {
							title : "Growing List with Scrolling",
							footer : new sap.m.Bar({
								contentMiddle : []
							})
						});
						
						
					
						
						return new sap.m.Page(this.createId("page"), {
								customHeader : new sap.m.Bar("PanelIdPakageNav", {
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