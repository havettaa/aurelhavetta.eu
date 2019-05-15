jQuery.sap.require("sap.m.MessageToast");
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.ui.core.util.Export");
jQuery.sap.require("sap.ui.core.util.ExportTypeCSV");

jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectNumberMOFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectGetChildFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectAssignmentsPackageFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectPackageTableFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectLegFactory' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectFactory' + m_urlVersion);

var _aValidTabKeys = [ "tabAll", "product", "innovation", "globalization", "cup", "m.object" ];


sap.ui.controller("ui5_routing.Master", {
	
	filterCategorySelectedItems : [],
	filterCategorySelectedItems2 : [],
	initFilter : false,

	onInit : function() {
		
		this._searchTimeOutID = null;
		this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		
		console.log("Hi in masters--" + this._oRouter);

		this.getView().setModel(new sap.ui.model.json.JSONModel(), "view");

		var oDataModel = new sap.ui.model.odata.v2.ODataModel({
			serviceUrl : m_xsodata,
			operationMode : "Client"
		});
		
		this.getView().setModel(oDataModel, "model");

		this._oRouter.attachRoutePatternMatched(this._handleRouteMatched, this);
		
		this.filterCategorySelectedItems.push( new sap.ui.model.Filter("PRICE_LIST_STATUS", sap.ui.model.FilterOperator.EQ, 'Future') );
		this.filterCategorySelectedItems.push( new sap.ui.model.Filter("PRICE_LIST_STATUS", sap.ui.model.FilterOperator.EQ, 'On PL') );
		

	},
	
	

	
	//the method _handleRouteMatched is triggered after navigation to this page (this is necessary for routing)
	//_handleRouteMatched is a hook method for the router and will be called automatically by the framework, after the view is rendered
	// in this method are binded the necessary models on the Master view
	_handleRouteMatched : function(oEvent)
	{	
		if ("main" !== oEvent.getParameter("name"))
			return;

		oArgs = oEvent.getParameter("arguments");
		oView = this.getView();
		oQuery = oArgs["?query"];
		
		this.switchListSelecteModeCUP();
		if (oQuery && _aValidTabKeys.indexOf(oQuery.tab) > -1)
		{
			oView.getModel("view").setProperty("/selectedTabKey", oQuery.tab);

			this.loadSelectedTab(oQuery.tab);
		}
		else
		{
			this._oRouter.navTo("main", {
				query : {
					tab : _aValidTabKeys[0]
				}
			}, true );
			
		}
		

	},
	
	
	selectItemFromFilter : function()
	{
		for (var j=0;j<this.filterCategorySelectedItems.length;j++){
			for (i in sap.ui.getCore().byId("PriceListStatus_list").getItems())
			{
				if(this.filterCategorySelectedItems[j].oValue1===sap.ui.getCore().byId("PriceListStatus_list").getItems()[i].getText())
					sap.ui.getCore().byId("PriceListStatus_list").getItems()[i].setSelected(true);
			}
			
		}
		
		for (var j=0;j<this.filterCategorySelectedItems2.length;j++){
			for (i in sap.ui.getCore().byId("listCategory").getItems())
			{
				if(this.filterCategorySelectedItems2[j].oValue1===sap.ui.getCore().byId("listCategory").getItems()[i].getText())
					sap.ui.getCore().byId("listCategory").getItems()[i].setSelected(true);
			}
			
		}
		
	

	},


	
	//the method loadSelectedTab is called when some tab is selected
	loadSelectedTab : function(selectedTabId)
	{	
		this.initFilter=false;
		var oDataMOdel = new sap.ui.model.odata.ODataModel(m_xsodata);
		var that = this;
		
		var titles = new sap.ui.model.json.JSONModel({
			titlePage : ""
		});
		
		if (selectedTabId == 'product') 
		{
			titles.titlePage = "Products";
			
			
			
			var priceListStatusCat = new sap.ui.model.json.JSONModel();
			priceListStatusCat.loadData(m_xsodata + "/Products.json");
			that.getView().setModel(priceListStatusCat, 'priceListStatusCat');
			that.selectItemFromFilter();

			var oDataModel2 = new sap.ui.model.odata.ODataModel(m_xsodata);
			oDataModel2.read("/FILTER_PRICE_LIST_STATUS.json", null, null, true, fSuccessCat2, fErrorCat2);
			function fSuccessCat2(oEvent) {
				return;
				var priceListStatusCat = new sap.ui.model.json.JSONModel(oEvent.results);
				that.getView().setModel(priceListStatusCat, 'priceListStatusCat');
				that.selectItemFromFilter();
				console.log("All done");
			};
			function fErrorCat2(oEvent) {
				console.log("An error occured while reading Package Data!")
			};
			
			var prodCat = new sap.ui.model.json.JSONModel();
			prodCat.loadData(m_xsodata + "/Products.json");
			that.getView().setModel(prodCat, 'prodCat');
			function fSuccessCat(oEvent) {
				return;
				var prodCat = new sap.ui.model.json.JSONModel(oEvent.results);
				that.getView().setModel(prodCat, 'prodCat');
				console.log("All done")
			};
			function fErrorCat(oEvent) {
				console.log("An error occured while reading Package Data!")
			};

		}

		if (selectedTabId == 'innovation') 
			titles.titlePage = "Innovations";

		if (selectedTabId == 'globalization') 
			titles.titlePage =  "Globalizations";
		
		if (selectedTabId == 'cup') 
			titles.titlePage =  "User Defined";
		
		if (selectedTabId == 'm.object') 
			titles.titlePage =  "Measurement Objects";
		this.getView().setModel(titles, "titles");

		this.BindList();
		
	},
	
	
	
	//the method bindListData populates prodList with packages
	BindList : function(packageType)
	{
		var selectedTabId = this.getView().getModel("view").getProperty("/selectedTabKey");
		var packageType = selectedTabId;
	
		var searchString = sap.ui.getCore().byId("searchFieldID").getProperty("value");
	
		var list = sap.ui.getCore().byId("prodList");
		var FiltersArray = [];
		var FiltersArray2 = [];
		var filtersObject = [];
		
		if(packageType != "tabAll")
		{	
			// Category filter
			
			if(packageType == "product")
			{
				var FiltersCateogoryArray = [];
				for (i in sap.ui.getCore().byId("listCategory").getSelectedItems())
				{	console.log(i);
					var selectedCategoryKey = sap.ui.getCore().byId("listCategory").getSelectedItems()[i].getProperty("text");
					FiltersCateogoryArray.push( new sap.ui.model.Filter("PRODUCT_CATEGORY.xml", sap.ui.model.FilterOperator.EQ, selectedCategoryKey) );
				}
				
				//..
				
				if(this.initFilter===false)
				{
					if (this.filterCategorySelectedItems2.length > 0){ // check if something was selected in Product Category filter.
						FiltersArray2.push( new sap.ui.model.Filter({filters: this.filterCategorySelectedItems2, and: false}) );
						//this.filterCategorySelectedItems=[];
					}

					
				}
				else
				{		if (FiltersCateogoryArray.length > 0){
						FiltersArray2.push( new sap.ui.model.Filter({filters: FiltersCateogoryArray, and: false}) );
						this.filterCategorySelectedItems2=[];
						}
						for(var i=0; i<FiltersCateogoryArray.length;i++)
							this.filterCategorySelectedItems2.push(FiltersCateogoryArray[i])
						//this.filterCategorySelectedItems=FiltersCateogoryArray;
				}
				
				if (FiltersArray2.length != 0)
					FiltersArray.push( new sap.ui.model.Filter({filters: FiltersArray2, and: true}));
				
				
				//..	
				
				
			}
			
			// Price List Status filter 
			
			if(packageType == "product")
			{
				
				var FiltersCateogoryArray = [];
				for (i in sap.ui.getCore().byId("PriceListStatus_list").getSelectedItems())
				{	console.log(i);
					var selectedCategoryKey = sap.ui.getCore().byId("PriceListStatus_list").getSelectedItems()[i].getProperty("text");
					FiltersCateogoryArray.push( new sap.ui.model.Filter("PRICE_LIST_STATUS", sap.ui.model.FilterOperator.EQ, selectedCategoryKey) );
				}	
				

				if(this.initFilter===false)
				{
					if (this.filterCategorySelectedItems.length > 0){ // check if something was selected in Product Category filter.
						FiltersArray.push( new sap.ui.model.Filter({filters: this.filterCategorySelectedItems, and: false}) );
						//this.filterCategorySelectedItems=[];
					}
						this.initFilter=true;

					
				}
				else
				{		if (FiltersCateogoryArray.length > 0){
						FiltersArray.push( new sap.ui.model.Filter({filters: FiltersCateogoryArray, and: false}) );
						this.filterCategorySelectedItems=[];
						}
						for(var i=0; i<FiltersCateogoryArray.length;i++)
							this.filterCategorySelectedItems.push(FiltersCateogoryArray[i])
						//this.filterCategorySelectedItems=FiltersCateogoryArray;
				}	
					
			}
			
			// Type filter
			FiltersArray.push( new sap.ui.model.Filter("TYPE", sap.ui.model.FilterOperator.EQ, packageType) );
		
			filtersObject = new sap.ui.model.Filter({filters: FiltersArray, and: true});
		}

		var oSorter_MOs = new sap.ui.model.Sorter( { path: 'NUMBEROFMO', descending: true } );
		var oSorter_Name = new sap.ui.model.Sorter( { path: 'NAME'} );

		
		var bindingParam = {
			path: "products>/Products.json",
			template: sap.ui.getCore().byId("masterCustomListItemID"),
			//filters: filtersObject,
			//sorter: [oSorter_MOs, oSorter_Name]
		};
		
		list.bindAggregation("items", bindingParam);
	},
	


	//the method switchListDeteleModeCUP is called when the delete button from CUP defined tab is selected 
	switchListDeteleModeCUP : function(evt)
	{
		var list = sap.ui.getCore().byId("prodList");
		var deleteButton = this.getView().byId("deleteCUPDefinedID");
		var returnDeleteButton = this.getView().byId("returnCUPDefinedID");

		deleteButton.setVisible(false);
		returnDeleteButton.setVisible(true);
		list.setModel(sap.m.ListMode.Delete);
	},
	
	//the method switchListSelecteModeCUP is called when the CUP defined tab is selected to make the delete button and return button of CUP defined visible on UI
	//also the method is called when the redo button is pressed to make the delete button visible and hide the redo button 
	switchListSelecteModeCUP : function(evt)
	{
		var list = sap.ui.getCore().byId("prodList");
		var deleteButton = this.getView().byId("deleteCUPDefinedID");
		var returnDeleteButton = this.getView().byId("returnCUPDefinedID");

		deleteButton.setVisible(true);
		returnDeleteButton.setVisible(false);
		list.setModel(sap.m.ListMode.SingleSelectMaster);
	},
	
	// the method switchListDeteleMode is called when the add button is pressed. 
	// Then the router navigates to the AddMo2 view
	switchListDeteleModeMO : function(evt) {
		
		var list = sap.ui.getCore().byId("prodList");
		var deleteButton = this.getView().byId("deleteMODefinedID");
		var returnDeleteButton = this.getView().byId("returnMODefinedID");

		deleteButton.setVisible(false);
		returnDeleteButton.setVisible(true);
		list.setModel(sap.m.ListMode.Delete);

	},
	
	switchListSelecteModeMO : function(evt)
	{
		var list = sap.ui.getCore().byId("prodList");
		var deleteButton = this.getView().byId("deleteMODefinedID");
		var returnDeleteButton = this.getView().byId("returnMODefinedID");

		deleteButton.setVisible(true);
		returnDeleteButton.setVisible(false);
		list.setModel(sap.m.ListMode.SingleSelectMaster);
	},
	
	//the method deleteGlobalizationSelect is called when a globalization package is selected to be deleted from the list of globalization packages
	deleteGlobalizationSelect : function(evt)
	{
		var selectedTabId = this.getView().getModel("view").getProperty("/selectedTabKey");
		
		var selectedItem = evt.getParameter("listItem").getBindingContext("products").getObject();
		
		if (selectedTabId == 'm.object')
		{
			var moService = com.tutorial.service.measureobject.MeasurementObjectFactory.getInstance();
			var oList = evt.getSource();
			var oItem = evt.getParameter("listItem");
			var oItemKey = oItem.getCustomData()[0].mProperties.value;
			var oItemMOType = oItem.getBindingContext("products").getObject().MO_TYPE;
			
			if (oItemMOType != "NEMO") return sap.m.MessageToast.show('You are only allowed to delete NEMO MO type.')

			var modelData = {
				moKey : oItemKey,
				successFunc : function(oData, response) {
					oList.removeItem(oItem);
					var msg = 'Measurement Object successfully removed';
					sap.m.MessageToast.show(msg);
				},
				errorFunc : function() {
					var msg = 'Measurement Object unsuccessfully removed';
					sap.m.MessageToast.show(msg);
				}
			};
			sap.m.MessageBox.confirm("Are you sure you would like to delete this item?\n \nPlease be aware that only NEMO Objects can be deleted. You should only delete Objects that have not yet provided Usage Information.", {
				onClose : function(sResult) {
					if (sResult == sap.m.MessageBox.Action.OK) {
						moService.removeModel(modelData);
					}

				}
			});
		}
		
		else
		{
			var string;
			if (selectedTabId === 'globalization')
				string = 'Globalization';
			if (selectedTabId === 'cup')
				string = 'User Defined';
			
			var moService = com.tutorial.service.measureobject.MeasurementObjectPackageTableFactory.getInstance();
			var oList = evt.getSource();
			var oItem = evt.getParameter("listItem");		
			var modelData = {
				moKey : oItem.getCustomData()[0].mProperties.value,
				successFunc : function(oData, response) {
					var msg = string + ' Package successfully removed';
					sap.m.MessageToast.show(msg);
				},
				errorFunc : function() {
					var msg = string + ' Package unsuccessfully removed';
					sap.m.MessageToast.show(msg);
				}
			};

			sap.m.MessageBox.confirm("Are you sure to delete this record?", {
				onClose : function(sResult) {
					if (sResult == sap.m.MessageBox.Action.OK) {
						oList.removeItem(oItem);
						moService.removeModel(modelData);

					}

				}
			});
		}
	},


	handleListItemPress : function(evt)
	{
		var context = evt.getSource().getBindingContext();
		console.log("handleListItemPress was pressed.");
		//oTabAll.setVisible(false);
		var selectedKey = evt.getParameter("id");
		selectedKey = encodeURIComponent(selectedKey);
		this._oRouter.navTo("DetailMO",
		{
			lineItemId : selectedKey
		})
	},
	
	//the method handleSelect is called when a new tab is selected. The router navigates to the selected tab
	handleSelect : function(oEvent)
	{
		var oIndexTab = oEvent.getParameter("index"); 
		
		this._oRouter.navTo("main", {
			query : {
				tab : oEvent.getParameter("selectedKey")
			}
		}, true );

	},

	
	handleSearch : function(evt)
	{
		var that = this;
		clearTimeout(this._searchTimeOutID);
		this._searchTimeOutID = setTimeout(function(){that.BindList.call(that);}, 500);
	},
	
	//the method handleListSelect is called when an item from the product/innovation/globalization/CUP defined list is selected. The router navigates to the Detail page of the selected package 
	handleListSelect : function(evt)
	{
		this.initFilter=false;
		var selectedItem = evt.getSource().getSelectedItem().getBindingContext("products").getObject();
		console.log(selectedItem);
		
		var selectedKey = evt.getParameter("listItem").getCustomData()[0].getValue('KEY');
		selectedKey = encodeURIComponent(selectedKey);
		
		if (selectedItem.TYPE == 'm.object')
		{
			this._oRouter.navTo("DetailMO",
			{
				lineItemId : selectedKey
			})
		}
		else
		{
			this._oRouter.navTo("Detail",
			{
				contextPath : selectedKey
			});
		}
	},
	
	
	//the method selectCat is called after the OK button of Product category list is pressed
	//then the product list is filtered by the selected product categories
	
	
	selectCat : function(oEvent)
	{
		// here maybe
		if(sap.ui.getCore().byId("listCategory").getSelectedItems().length===0)
			 this.filterCategorySelectedItems2=[];
		
		if(sap.ui.getCore().byId("PriceListStatus_list").getSelectedItems().length===0)
			 this.filterCategorySelectedItems=[];
				
		this.BindList();
	},
	

	// after the product list is filtered by the selected product categories, the reset button appears.
	// the method handleReset is called when the reset button is pressed. Then the product list is reloaded (the method loadTabProducts is called )
	handleReset : function(oEvent)
	{
		var ProductCategoryFilter = oEvent.getSource();
		var aLists = ProductCategoryFilter.getLists();
		for (var i = 0; i < aLists.length; i++)
		{
			aLists[i].removeSelections(true);
		}
		
		sap.ui.getCore().byId('idFacetFilter').setShowReset(false);
	},
	
	//the method handleListClose is called when OK button of Product Category list is selected.
	//from this method is called selectCat method
	handleListClose : function(oEvent) {

		var oList = oEvent.getSource();
		var bAllSelected = oEvent.getParameter("allSelected");
		this.selectCat(bAllSelected);
		
		if (bAllSelected) {
			sap.ui.getCore().byId('idFacetFilter').setShowReset(false);
		} else {
			sap.ui.getCore().byId('idFacetFilter').setShowReset(true);
		}
	},
	
	//the method addCUP is called when the add button from CUP defined tab is selected. Then the router navigates to the AddCUP page 
	addCUP : function(evt) {
		this._oRouter.navTo("AddCUP");
	},
	
	// the method addMo is called when the add button is pressed. Then the router navigates to AddMo2 view
	addMO : function(evt) {
		this._oRouter.navTo("AddMo2");
	},
	
	//the method exportGlobalization is called when the download button from Globalization tab is selected.
	//the list of globalization packages are exported to a csv file
	exportGlobalization : function(oEvent)
	{
		var oDataMOdel = new sap.ui.model.odata.ODataModel(m_xsodata);
		
		var oExport = new sap.ui.core.util.Export(
		{
			exportType : new sap.ui.core.util.ExportTypeCSV( { separatorChar : ',' } ),
			models : oDataMOdel,
			rows : {
				path : "/CL_DOWNLOAD_GLOBALIZATION"
			},
			columns :
			[
				{
					name : 'KEY',
					template : {
						content : '{KEY}'
					}
				},
				{
					name : 'NAME',
					template : {
						content : '{NAME}'
					}
				},
				{
					name : 'OWNER',
					template : {
						content : '{OWNER}'
					}
				},
				{
					name : '#MOs',
					template : {
						content : '{NO_MO_NOTNULL}'
					}
				}
			]
		});
		
		oExport.saveFile().always(function() { oExport.destroy(); } )
	}

});