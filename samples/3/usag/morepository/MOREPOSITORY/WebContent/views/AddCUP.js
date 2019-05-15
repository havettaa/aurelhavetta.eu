sap.ui.jsview("ui5_routing.AddCUP", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf 00tsrhcp.Detail1
	 */
	getControllerName : function() {
		return "ui5_routing.AddCUP";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf 00tsrhcp.Detail1
	 */
	createContent : function(oController) {
		
		function quickhelp(oControl, sText, bCustomize) {
			// create the RichTooltip control
			var oRichTooltip = new sap.ui.commons.RichTooltip({
				text : sText,
				title: "Quick Help",
				imageSrc : "images/Tip.gif"
			});
			//Change position and durations if required
			if (bCustomize) {
				oRichTooltip.setMyPosition("begin top");
				oRichTooltip.setAtPosition("end top");
				oRichTooltip.setOpenDuration(300);
				oRichTooltip.setCloseDuration(300);
			}
			// add it to the control
			oControl.setTooltip(oRichTooltip);
			// return the control itself (makes this function a decorator function)
			return oControl;
		};
		
		var oCore = sap.ui.getCore();
		
		var simpleForm = new sap.ui.layout.form.SimpleForm({
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
			new sap.m.Label("labelNamePackageCUPID",{
				text : 'Name',
				required : true
			}),

			quickhelp(new sap.m.Input(this.createId("nameFieldCUPId"), {
				placeholder : "Add Name",
				maxLength: 50,
				liveChange : function(oEvent){
					this.setValue(oEvent.getParameter("value").toUpperCase());
					  }
			}),"Meaningful name for Package. Max. length 50 characters"),

			new sap.m.Label("labelTechnamePackageCUPID",{
				text : 'Technical Name',
				required : true
			}),

			quickhelp(new sap.m.Input(this.createId("technicalNameFieldCUPId"), {
				placeholder : "Add Technical Name",
				maxLength: 50,
				value: {
					path: "/txt",
					type: new sap.ui.model.type.String(
						null,
						{
							search: new RegExp("^[A-Za-z0-9_ ]+$")  
						}
					)
				},
				valueStateText: "Only letters (upper or lowercase), numbers (0-9) and underscore (_) are allowed.",
				liveChange : function(oEvent){
					this.setValue(oEvent.getParameter("value").toUpperCase());
					  }
			}),"Meaningful technical name for Package. Only letters (upper or lowercase), numbers (0-9) and underscore (_) are allowed. Max. length 50 characters"),

			new sap.m.Label("descriptionPackageCUPID",{
				text : 'Description'
			}),

			quickhelp(new sap.m.TextArea(this.createId("descriptionFieldCUPId"), {
				placeholder : "Add Description",
				rows : 4,
				maxLength: 500
			}),"Meaningful description for Package. Max. length 500 characters"),
			new sap.m.Label("labelOwnerPackageCUPID",{
				text : 'Owner'
				
			}),

			new sap.m.Text(this.createId("ownerFieldCUPId"), {
				
			}),
			
			new sap.m.Label({
				text : "{= ${/TYPE} === 'feature' ? 'Feature' : ( ${/TYPE} === 'product' ? 'Product' : ( ${/TYPE} === 'solution' ? 'Solution' :( ${/TYPE} === 'innovation' ? 'Innovation' : '')))}",
			}).addStyleClass("alignLabels"),
			new sap.m.Text({
			})
			]
		});
		
		oCore.setModel(new sap.ui.model.json.JSONModel({txt: ""}));
		oCore.attachValidationError(function (oEvent) {
			oEvent.getParameter("element").setValueState(sap.ui.core.ValueState.Error);
		});
		oCore.attachValidationSuccess(function (oEvent) {
			oEvent.getParameter("element").setValueState(sap.ui.core.ValueState.None);
		});
		
		var gridContainer = new sap.ui.layout.Grid({
			defaultSpan : "L12 M12 S12",
			vSpacing : 0,
			hSpacing : 0,
			width : "auto",
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
				bindListData();
				oController.handleNavBack(oEvent);
			}
		});
		
		
		
		


		var oList = new sap.m.List({
			growing : true,
			growingThreshold : 20,
			growingScrollToLoad : true,
			growingTriggerText : "Load More Data",
			enableBusyIndicator : true,
			//headerText : "Scroll Down to Load",
			inset : false,
			//footerText : "List Footer",
			mode : sap.m.ListMode.SingleSelectMaster,
			showNoData : false
		});
		
		function deleteItem(oEvent) {
			var model = oEvent.mParameters.listItem.getModel();
			var data = model.remove(oEvent.mParameters.listItem.oBindingContext.sPath);
			model.updateBindings();
		}
		
		var CustomListItem = new sap.m.CustomListItem("AddCUPListItemID",
		{
			type : "{listItemType}",
			press : function(oEvent) {},
			customData : new sap.ui.core.CustomData({
				key : "KEY",
				value : "{products>KEY}"
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
						
							color : "#107DAB",
							src : "{= ${products>TYPE} === 'feature' ? 'sap-icon://energy-saving-lightbulb' : ( ${products>TYPE} === 'product' ? 'sap-icon://product': ( ${products>TYPE} === 'cup' ? 'leads' : ( ${products>TYPE} === 'solution' ? 'sap-icon://puzzle' : ( ${products>TYPE} === 'innovation' ? 'sap-icon://lightbulb' : 'sap-icon://globe'))))}",
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
											text : "{products>TECHNICAL_NAME}",
										}).addStyleClass("sapMObjLTitle"),
										
										new sap.m.Text({
											text : "{= ${products>NUMBEROFMO} === null ? '' : ${products>NUMBEROFMO} + ' MOs'}",
										}).addStyleClass("sapMObjLTitle"),
										
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
														new sap.m.Label({
															text : "Name: "
														}),
														new sap.m.Text({
															text : "{products>NAME}",
														})
													]
												}),
												
												new sap.ui.layout.HorizontalLayout("",
												{
													content:
													[
														new sap.m.Label({
															text : "Product description: "
														}),
														new sap.m.Text({
															text : "{products>DESCRIPTION}",
														})
													]
												}),
														
											]
										}),
												
										new sap.m.VBox(
										{
											alignItems : "End",
											items :
											[
												new sap.m.Text(
												{
													text : "{= ${products>TYPE} === 'feature' ? 'Innovation: ' : ( ${products>TYPE} === 'product' ? 'Product Category: ' + ${products>PRODUCT_CATEGORY.xml} : ( ${products>TYPE} === 'custom' ? 'Package ID' : ( ${products>TYPE} === 'solution' ? 'Line of Business: ' : ( ${products>TYPE} === 'innovation' ? 'Product Version: ' + ${products>PRODUCT_ASSOCIATED} : ''))))}",
												}),
		
												new sap.m.Text(
												{
													text : "{= ${products>TYPE} === 'product' ? 'Product Line: ' + ${products>PRODUCT_LINE} : 'Product Associated: ' + ${products>PRODUCT_NAME} }",
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

		function bindListData()
		{
			var oModel = new sap.ui.model.odata.ODataModel(m_xsodata);
			oList.setModel(oModel, "products");;
			oList.bindAggregation("items", "products>/CL_PACKAGE_LIST", CustomListItem);
			
			// manual sorting
			var oSorter = new sap.ui.model.Sorter( { path: 'NUMBEROFMO', descending: true } );
			oList.getBinding("items").sort(oSorter);

			// manual filtering
			var oFilter = new sap.ui.model.Filter(
			{
				filters:
				[
					new sap.ui.model.Filter("NAME", sap.ui.model.FilterOperator.Contains , "a")
				],
				and: true
			});
			oList.getBinding("items").filter(oFilter);
		}


		
		bindListData();
		
		return new sap.m.Page(this.createId("page"), {
			title : "Add user defined package",
			showNavButton : true,
			navButtonPress : [ function(oEvent) {
			   oController.handleNavBack(oEvent);
			}, oController ],
			content : [ gridContainer, oList ],
			footer : new sap.m.Bar({
				contentRight : [ saveButton, cancelButton ]
			})
		});
	}
});