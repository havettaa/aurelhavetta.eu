sap.ui.jsview("ui5_routing.EditPackage", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf 00tsrhcp.Detail1
	 */
	getControllerName : function() {
		return "ui5_routing.EditPackage";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf 00tsrhcp.Detail1
	 */
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
		var listPack = new sap.m.List("listPack", {
			mode : sap.m.ListMode.SingleSelectMaster,
			showNoData : false

		}).addStyleClass('objItemsDetails').attachItemPress(function(oEvent) {
			oController.handleListSelect(oEvent)
		});

		var listItemProd = new sap.m.ObjectListItem({
			type : "Active",
			title : "{products>NAME}",
			number : "{products>KEY}",
			attributes : new sap.m.ObjectAttribute({
				text : "{products>TECHNICAL_NAME}",
			})
		});
		var listProd = new sap.m.List("listProd", {
			mode : sap.m.ListMode.SingleSelectMaster,
			showNoData : false
		}).addStyleClass('objItemsDetails');
		var filter = new sap.ui.model.Filter("TYPE", sap.ui.model.FilterOperator.Contains, 'product');
		listProd.bindItems({
			path : 'products>/results/',
			template : listItemProd,
			filters : [ filter ]
		});
		var panelBreadcrumbs = new sap.m.Panel("panelBCID", {});
		var dialogChange = new sap.m.Dialog("changepackDialogID", {
			title : "Change Package",
			contentWidth : "800px",
			contentHeight : "400px",
			content : [ panelBreadcrumbs, new sap.m.SearchField({
				width : "100%",
				liveChange : [ function(oEvent) {
					oController.handleSearch(oEvent);
				}, oController ]
			}), listPack ],
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
		var dialogChangeProd = new sap.m.Dialog("changeprodDialogID", {
			title : "Change Product",
			contentWidth : "200px",
			contentHeight : "400px",
			content : [ listProd ],
			beginButton : new sap.m.Button({
				text : "Move",
				type : sap.m.ButtonType.Accept,
				press : function() {
					oController.moveProd();
					dialogChangeProd.close();
				}
			}),
			endButton : new sap.m.Button({
				text : "Cancel",
				type : sap.m.ButtonType.Reject,
				press : function() {
					dialogChangeProd.close();
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
		}
		;

		var simpleForm = new sap.ui.layout.form.SimpleForm({
			maxContainerCols : 1,
			content : [ new sap.m.Label({
				text : 'Name',
				width : '60%'
			}), quickhelp(new sap.m.Input(this.createId("nameFieldId"), {
				placeholder : "Add Name",
				maxLength : 50
			}), "Meaningful name for Package. Max. length 50 characters"),

			new sap.m.Label({
				text : 'Technical Name',
				width : '60%'
			}),

			quickhelp(new sap.m.Input(this.createId("technicalNameFieldId"), {
				placeholder : "Add Technical Name",
				maxLength : 50
			}), "Meaningful technical name for Package. Max. length 50 characters"),

			new sap.m.Label({
				text : 'Description',
				width : '60%'
			}),

			quickhelp(new sap.m.TextArea(this.createId("descriptionFieldId"), {
				placeholder : "Add Description",
				rows : 4,
				maxLength : 500
			}), "Meaningful description for Package. Max. length 500 characters"), new sap.m.Label({
				text : 'Owner',
				width : '60%'
			}),

			quickhelp(new sap.m.Input(this.createId("ownerFieldId"), {
				placeholder : "Add Owner",
				maxLength : 50
			}), "Please insert the package's owner. Max. length 50 characters"),

			new sap.m.Label({
				text : "Product",
			}).addStyleClass("alignLabels"), new sap.m.Text("productTextForPackageId", {}) ]
		});

		var saveButton = new sap.m.Button({
			text : "SAVE",
			type : sap.m.ButtonType.Accept,
			style : sap.ui.commons.ButtonStyle.Accept,
			press : function(oEvent) {
				oController.saveMo(oEvent);

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
		var oPanel = new sap.m.Panel({
			headerToolbar : new sap.m.Toolbar("PanelIdNavPack", {
				height : "3rem",
				headerText : "bla"
			}).addStyleClass("noborder"),
			height : "3rem",
			content : [ new sap.m.Label("idProdAssociated", {
				width : '60%',
				visible : false
			}) ]
		});
		return new sap.m.Page(this.createId("page"), {
			title : "Edit Usage View",
			showNavButton : true,
			navButtonPress : [ function(oEvent) {
				oController.handleNavBack(oEvent);
			}, oController ],
			content : [ oPanel, simpleForm ],
			footer : new sap.m.Bar({
				contentRight : [ saveButton, cancelButton ]
			})
		});
	}
});