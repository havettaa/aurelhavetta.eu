sap.ui
		.jsfragment(
				'ui5_routing.ChangePackage',
				{
					createContent : function(oController) {
						var listItemPack = new sap.m.ObjectListItem("listItemid", {
							type : "{packages>visible}",
							title : "{packages>NAME}",
							number : "{packages>IS_LEAF}",
							intro : "{packages>ID}",
							attributes : new sap.m.ObjectAttribute({
								text : "{packages>PARENTS}",

							})
						});
						var listPackProd = new sap.m.List("listPackProd", {
							mode : sap.m.ListMode.SingleSelectMaster,
							showNoData : false
						}).addStyleClass("changeList").attachItemPress(function(oEvent) {
							oController.handleListSelect(oEvent)
						});
						var listPackSol = new sap.m.List("listPackSol", {
							mode : sap.m.ListMode.SingleSelectMaster,
							showNoData : false
						}).addStyleClass("changeList").attachItemPress(function(oEvent) {
							oController.handleListSelect(oEvent)
						});
						var listPackGlob = new sap.m.List("listPackGlob", {
							mode : sap.m.ListMode.SingleSelectMaster,
							showNoData : false
						}).addStyleClass("changeList").attachItemPress(function(oEvent) {
							oController.handleListSelect(oEvent)
						});
						var listPackCupd = new sap.m.List("listPackCupd", {
							mode : sap.m.ListMode.SingleSelectMaster,
							showNoData : false
						}).addStyleClass("changeList").attachItemPress(function(oEvent) {
							oController.handleListSelect(oEvent)
						});
						var panelBreadcrumbsProduct = new sap.m.Toolbar("panelBCIDProd", {
							design : sap.m.ToolbarDesign.SubHeader

						});
						var panelBreadcrumbsSolution = new sap.m.Toolbar("panelBCIDSol", {
							design : sap.m.ToolbarDesign.SubHeader

						});
						var panelBreadcrumbsGlobalization = new sap.m.Toolbar("panelBCIDGlob", {
							design : sap.m.ToolbarDesign.SubHeader
						});
						var panelBreadcrumbsCupd = new sap.m.Toolbar("panelBCIDCupd", {
							design : sap.m.ToolbarDesign.SubHeader
						});

						var icontabbar = new sap.m.IconTabBar('iconTabHier', {

							select : function(oEvent) {
								
							}
						});
						oTab1 = new sap.m.IconTabFilter({
							text : "Product",
							key : "Product",
							icon : 'sap-icon://product',
							iconColor : 'Neutral',
							content : [ panelBreadcrumbsProduct, new sap.m.SearchField('searchProd', {
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
							content : [ panelBreadcrumbsSolution, new sap.m.SearchField('searchSol', {
								width : "100%",
								liveChange : [ function(oEvent) {
									oController.handleSearchEditPack(oEvent);
								}, oController ]
							}), listPackSol ],
							visible : true
						});
						oTab3 = new sap.m.IconTabFilter({
							text : "Globalization",
							key : "Globalization",
							icon : 'sap-icon://globe',
							iconColor : 'Neutral',
							content : [ panelBreadcrumbsGlobalization, new sap.m.SearchField('searchGlob', {
								width : "100%",
								liveChange : [ function(oEvent) {
									oController.handleSearchEditPack(oEvent);
								}, oController ]
							}), listPackGlob ],
							visible : true
						});

						oTab4 = new sap.m.IconTabFilter({
							text : "User Defined",
							key : "cup",
							icon : 'sap-icon://leads',
							iconColor : 'Neutral',
							content : [ panelBreadcrumbsCupd, new sap.m.SearchField('searchCupd', {
								width : "100%",
								liveChange : [ function(oEvent) {
									oController.handleSearchEditPack(oEvent);
								}, oController ]
							}), listPackCupd ],
							visible : true
						});
						icontabbar.addItem(oTab1);
						icontabbar.addItem(oTab2);
						icontabbar.addItem(oTab3);
						icontabbar.addItem(oTab4);

						var dialogChange = new sap.m.Dialog("changepackDialogID", {
							title : "Change Package",
							contentWidth : "800px",
							contentHeight : "1000px",
							content : [ icontabbar ],
							beginButton : new sap.m.Button({
								text : "Move",
								type : sap.m.ButtonType.Accept,
								press : function() {
									oController.movePack();
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
						};
						var dateNew = com.tutorial.util.Formatter.GetUnformattedDate();
						var simpleForm = new sap.ui.layout.form.SimpleForm({
							
							editable: true,
							layout: "ResponsiveGridLayout",
							labelSpanXL: 3,
							labelSpanL: 3,
							labelSpanM: 3,
							labelSpanS: 3,
							adjustLabelSpan: false,
							//emptySpanXL: 0,
							//emptySpanL: 0,
							//emptySpanM: 0,
							//emptySpanS: 0,
							columnsXL: 3,
							columnsL: 3,
							columnsM: 3,
							singleContainerFullSize: false,
							
							//maxContainerCols : 3,
							content : 
							[									
								new sap.ui.core.Title({}),
								
	
								new sap.m.Label({
									text : 'Technical Name',
									required : true
								}),

								quickhelp(new sap.m.Text(this.createId("technicalNameFieldId"), {
									text : "{/TECHNICAL_NAME}",
									placeholder : "Add Technical Name",
									maxLength : 50,
									value : {
										path : "/txt",
										type : new sap.ui.model.type.String(null, {
											search : new RegExp("^[A-Za-z0-9_. ]+$")
										})
									},
									valueStateText : "Only letters (upper or lowercase), numbers (0-9) and underscore (_) are allowed.",
									liveChange : function(oEvent) {
										this.setValue(oEvent.getParameter("value").toUpperCase());
									}
								}), "Meaningful technical name for Package. Only letters (upper or lowercase), numbers (0-9) and underscore (_) are allowed. Max. length 50 characters"),
								
								new sap.m.Label({
									text : 'Name',
									//width : '30%',
									required : true
								}),

								quickhelp(new sap.m.Input(this.createId("nameFieldId"), {
									placeholder : "Add Name",
									maxLength : 50,
									value : "{/NAME}"
								}), "Meaningful name for Package. Max. length 50 characters"),
								
								
								new sap.ui.core.Title({}),
								
								
								new sap.m.Label({
									visible:false,
									text : 'Owner'
								}),
	
								new sap.m.Text("ownerFieldId2", {
									visible:false,
									text : "{/OWNER}"
								}),
								
																
								new sap.ui.core.Title({}),							
								
															
								new sap.m.Label({
									visible:false,
									text : 'Changed by'
								}),
	
								new sap.m.Text("changedByFieldId", {
									visible:false,
									text : "{/CHANGED_BY}"
								}),								
								
								new sap.m.Label("changedDateLabel", {
									visible:false,
									text : "Changed at"
								}), 
								
								new sap.m.Text(this.createId("changedDateID"), {
									visible:false,
									text: dateNew									
								}),
	
								new sap.m.Label("packageEditId", {
									visible : false,
									text : "{/PRODUCTID_ASSOCIATED}"
								}),
								
								new sap.m.Label("parentPackageId", {
									visible : false,
									text : "{/PARENTID}"
	
								}),
							]
						});
						
						var DescriptionDetailEdit = new sap.ui.layout.form.SimpleForm("",
						{
									
							editable: true,
							layout: "ResponsiveGridLayout",
							labelSpanXL: 1,
							labelSpanL: 1,
							labelSpanM: 1,
							labelSpanS: 1,
							adjustLabelSpan: false,
							//emptySpanXL: 0,
							//emptySpanL: 0,
							//emptySpanM: 0,
							//emptySpanS: 0,
							columnsXL: 1,
							columnsL: 1,
							columnsM: 1,
							singleContainerFullSize: false,
							
							content:
							[
								new sap.m.Label({
									text : 'Description',
									width : '100%'
								}), 
								
								quickhelp(new sap.m.TextArea(this.createId("descriptionFieldId"), {
									placeholder : "Add Description",
									value : "{/DESCRIPTION}",
									rows : 4,
									maxLength : 500
								}), "Meaningful description for Package. Max. length 500 characters"),
							]
						});
						
						
						var saveButton = new sap.m.Button({
							text : "SAVE",
							type : sap.m.ButtonType.Accept,
							style : sap.ui.commons.ButtonStyle.Accept,
							press : function(oEvent) {
								oController.saveMo(oEvent);
							},
						});

						var cancelButton = new sap.m.Button({
							text : "CANCEL",
							type : sap.m.ButtonType.Reject,
							style : sap.ui.commons.ButtonStyle.Reject,
							press : function(oEvent) {
								oController.refreshModel(oController.getView().getModel().getData().KEY);
							}
						});
						var oPage = new sap.m.VBox(
						{
							
							items:
							[
									new sap.m.Text(
									"ProductDetailID",
									{
										text: "{= ${/TYPE} ==='globalization' ? 'Globalization Details: ' : (${/TYPE} === 'feature' ? 'Feature Details: ' : ( ${/TYPE} === 'product' ? 'Product Details: '  : ( ${/TYPE} === 'custom' ? 'Package Details: '   :( ${/TYPE} === 'solution' ? 'Solution Details: '  : ( ${/TYPE} === 'innovation' ? 'Innovation Details: '   : ( ${/TYPE} === 'cup' ? 'CUP View Details: ' + ${/NAME}  : ''))))))}",									
									}),
			
									simpleForm,
									DescriptionDetailEdit,
									
									new sap.m.Bar({
									contentRight : [ saveButton, cancelButton ]})
							] 
						
							//title : "{= ${/TYPE} === 'feature' ? 'Feature Details: ' + ${/NAME} : ( ${/TYPE} === 'product' ? 'Product Details: ' + ${/NAME}  : ( ${/TYPE} === 'custom' ? 'Package Details: ' + ${/NAME}  :( ${/TYPE} === 'solution' ? 'Solution Details: ' + ${/NAME}  : '')))}",
							//content : [ new sap.m.Panel({
								//height : '300px',
								//content : [ simpleForm ]
							//}) ],
							//footer : new sap.m.Bar({
								//contentRight : [ saveButton, cancelButton ]
							//})
						});
						return oPage;
					}

				});