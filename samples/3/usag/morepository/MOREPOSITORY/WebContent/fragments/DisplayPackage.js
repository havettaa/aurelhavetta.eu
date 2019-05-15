sap.ui.jsfragment('ui5_routing.DisplayPackage',
{
	createContent : function(oController)
	{
		var ProductNameAndImage = new sap.m.HBox(
		{
			items:
			[		
				new sap.m.Text("technicalNameId",
				{
				  text : "{/TECHNICAL_NAME}"
				}),

				new sap.ui.commons.Image(
				{
					src: "images/openInNewWindow.jpg",
					visible: "{= ${/TYPE} === 'innovation' || ${/TYPE}==='PPMS Product' ||  ${/TYPE} === 'feature' ? true : false}",
					densityAware: false,
					alt: "Display in IFR",
					decorative: false,
					width: '19px',
					height: '15px',
					useMap: "https://{= ${/TYPE} === 'innovation' ? 'ifp.wdf.sap.corp/sap/bc/ui5_ui5/pct/im_appl/index.html?inno_id=' : ( ${/TYPE} === 'feature' ? 'ifp.wdf.sap.corp/sap/bc/ui5_ui5/pct/pfdb/index.html?pf_id=' : (${/TYPE} === 'PPMS Product' ? 'i7p.wdf.sap.corp/sap(bD1kZSZjPTAwMQ==)/internal/ppms/start/start_sap.htm?onr=' : ' ' ))}{/KEY}",
					press : function(e)
					{
						var link = this.getUseMap();
						var win = window.open(link, '_blank');
						win.focus();
					}
				})
				.addStyleClass("openInNewWindow")
				.setTooltip(new sap.ui.commons.RichTooltip(
				{
					text:"{= ${/TYPE} === 'innovation' ? 'See on innovation repository' : ( ${/TYPE} === 'feature' ? 'See on innovation repository' : (${/TYPE} === 'PPMS Product' ? 'Display the PPMS Product information in PPMS' : ' ' ))}"
				})),

			]
		});
		
		
		
		

		var OwnerInformations = new sap.m.HBox("",
		{
			items:
			[
				new sap.ui.commons.Link(
				{
					text :"{/OWNER}    (",		
					target : "_blank",
					href : "https://people.wdf.sap.corp/profiles/{/OWNER}"	
				}),
						
						
				new sap.m.Link(
				{
					text: "check package editors)",				
					press:function (oEvent) { oController.loadUsersWithShareRights(); }	
				}),
			]
		});
		
		
	
		var simpleDisplay = new sap.ui.layout.form.SimpleForm({
			
			layout: "ResponsiveGridLayout",
			backgroundDesign:"Transparent",
			labelSpanXL: 12,
			labelSpanL: 12,
			labelSpanM: 12,
			labelSpanS: 12,
			columnsXL:3,
			columnsL: 3,
			columnsM: 3,
			columnsS: 1,
			//maxContainerCols : 3,
			
			content : 
			[
				// =================================================
				
				
				new sap.ui.core.Title("ProductDetalID", {
					text: "{= ${/TYPE} ==='globalization' ? 'Globalization Details ' : (${/TYPE} === 'feature' ? 'Feature Details ' : ( ${/TYPE} === 'PPMS Product' ? 'PPMS Product Details '  : ( ${/TYPE} === 'product' ? 'Logical Product Details '  : ( ${/TYPE} === 'custom' ? 'Package Details '   : ( ${/TYPE} === 'solution' ? 'Solution Details '  : ( ${/TYPE} === 'innovation' ? 'Innovation Details '   : ( ${/TYPE} === 'cup' ? 'User Defined Details ' : 'Package Details ')))))))}"
				}),
				
				new sap.m.Label(
				{
					text : "{= ${/TYPE} === 'PPMS Product' ? 'PPMS Productd' : 'Technical Name'}"
					
				}),
				
				ProductNameAndImage,
				
				
				
				new sap.m.Label(
				{
					text : "{= ${/TYPE} === 'PPMS Product' ? 'PPMS name' : 'Name'}"
				}),	
				
				new sap.m.Text("nameId",
				{
					text : "{/NAME}"
				}),	
			
				


				// =================================================
				new sap.ui.core.Title({text: ""}),
				
				new sap.m.Label(
						{
							visible:"{= ${/TYPE} === 'PPMS Product'? true : (${/PARENT_TYPE} === 'PPMS Product' ? true : false )}",
							text : "{= ${/TYPE} === 'PPMS Product' ? 'Usage and Adoption Report' : 'Link to PPMS Product adoption report'}"
						}),	

				

				new sap.m.HBox("",{
					visible:"{= ${/TYPE} === 'PPMS Product'? true : (${/PARENT_TYPE} === 'PPMS Product' ? true : false )}",
				
					
					items:[
						
						new sap.ui.commons.Image(
								{
									src: "images/Bulb.png",
						
									densityAware: false,
									alt: "Display in IFR",
									decorative: false,
									width: '25px',
									height: '20px',//cup
									//visible: "{= ${/TYPE} === 'innovation' ? false : ( ${/TYPE} === 'globalization' ? false : ( ${/TYPE} === 'cup' ? false : true))}",
									visible:"{= ${/TYPE} === 'PPMS Product'? true : (${/PARENT_TYPE} === 'PPMS Product' ? true : false )}",
									useMap : "{= ${/TYPE} === 'innovation' ? ${/HYPERLINK} : ( ${/TYPE} === 'feature' ? ${/HYPERLINK} : (${/TYPE} === 'PPMS Product' ? 'https://iwahdb.wdf.sap.corp/USAG/PROD/FactSheets/WebContent/index.html#/swprodov/' + ${/PRODUCTID_ASSOCIATED} : (${/PARENT_TYPE} === 'PPMS Product' ? 'https://iwahdb.wdf.sap.corp/USAG/PROD/FactSheets/WebContent/index.html#/swprodov/' + ${/PRODUCTID_ASSOCIATED} : '')))}",
									press : function(e)
									{
										var link = this.getUseMap();
										var win = window.open(link, '_blank');
										win.focus();
									}
								}),

						

						new sap.ui.commons.Link(
						"UsaegeandAdpotionID",{
							text :"{= ${/TYPE} === 'feature' ? ${/HYPERLINK}  : ( ${/TYPE} === 'PPMS Product' ? ${/PRODUCT_NAME} : ( ${/PARENT_TYPE} === 'PPMS Product' ? ${/PRODUCT_NAME} : ( ${/TYPE} === 'innovation' ? ${/HYPERLINK}  : ${/HYPERLINK})))}",
							tooltip : "{= ${/TYPE} === 'feature' ? 'Innovation Link:'  : ( ${/TYPE} === 'PPMS Product' ? 'Product Link:' : ( ${/PARENT_TYPE} === 'PPMS Product' ? 'Product Link:' : ( ${/TYPE} === 'innovation' ? 'Innovation Link:'  : '')))}",
							target : "_blank",
							href : "{= ${/TYPE} === 'innovation' ? ${/HYPERLINK} : ( ${/TYPE} === 'feature' ? ${/HYPERLINK} : (${/TYPE} === 'PPMS Product' ? 'https://iwahdb.wdf.sap.corp/USAG/PROD/FactSheets/WebContent/index.html#/swprodov/' + ${/PRODUCTID_ASSOCIATED} : (${/PARENT_TYPE} === 'PPMS Product' ? 'https://iwahdb.wdf.sap.corp/USAG/PROD/FactSheets/WebContent/index.html#/swprodov/' + ${/PRODUCTID_ASSOCIATED} : '')))}"
						}),	
						

					
					],
				}),
				
				
			    new sap.m.Label(
				{
					visible : "{= ${/TYPE} === 'PPMS Product' ? true : (${/TYPE} === 'product' ? true : false)}",
					text:"Product Category"
					
				}),
							
				new sap.m.Text(
				{
					visible : "{= ${/TYPE} === 'PPMS Product' ? true : (${/TYPE} === 'product' ? true : false)}",
					text:"{/PRODUCT_CATEGORY.xml}"
				
				}),	
				new sap.m.Label(
				{
					visible : "{= ${/TYPE} === 'PPMS Product' ? true : false}",
					text:"Product Line"
					
				}),
									
				new sap.m.Text(
				{
					visible : "{= ${/TYPE} === 'PPMS Product' ? true : false}",
					text:"{/PRODUCT_LINE}"
				
				}),	
				
				new sap.m.Label(
				{
					visible : "{= ${/TYPE} === 'product' ? true : false}",
					text:"Deployment Mode"
				}),
								
								
				new sap.m.Text(
				{
					visible : '{= ${/TYPE} === "product" ? true : false}',
					text: "{/DEPLOYMENT_MODE}"
				}),	
				
				
				new sap.m.Label(
				{
					visible : "{= ${/TYPE} === 'product' ? true : false}",
					text:"Price list status"
				}),
															
				new sap.m.Text(
				{
					visible : '{= ${/TYPE} === "product" ? true : false}',
					text: "{/PRICE_LIST_STATUS}"
				}),	
				
			
						
				
				
				//]
				//}),
				
				
				
				// =================================================
				new sap.ui.core.Title({text: ""}),
				
				
				new sap.m.Label(
						{
							text : "Owner"
						}),
		
				OwnerInformations,
				
	
				new sap.m.Label(
				{
					text : "Changed by",
					visible: true
				}),
								
				new sap.m.Link(
				{
					text :"{/CHANGED_BY}",		
					//visible: "{= ${/CHANGED_BY} === null ? false : true}",
					target : "_blank",
					href : "https://people.wdf.sap.corp/profiles/{/CHANGED_BY}"
				}),
								
				new sap.m.Label(
				{
					text : 'Changed at',
					visible: true
				}),
								
				new sap.m.Text("changedDateId",
				{
					text:
					{

						path : "/CHANGED_DATE",
						type : new sap.ui.model.type.String(),
						
						formatter : function(oValue) {
							return (com.tutorial.util.Formatter.GetNewDate(oValue))
						}
					}
					//visible:"{= ${/CHANGED_DATE} === null ? false : true}"
				}), 			

				new sap.m.Text(
				{
					text : "{/KEY}",
					visible : false
				})
			]
		});
		
		
		var DescriptionDetail = new sap.ui.layout.form.SimpleForm(
		{
			layout: "ResponsiveGridLayout",
			backgroundDesign:"Transparent",
			labelSpanXL: 12,
			labelSpanL: 12,
			labelSpanM: 12,
			labelSpanS: 12,
			content:
			[
				new sap.m.Label(
				{
					text : "{= ${/TYPE} === 'PPMS Product' ? 'PPMS official name' : 'Description'}"
				}),	
											
				new sap.m.Text("descriptionId",
				{
					text : "{/DESCRIPTION}"
				}),
			]
		});
		
		var TitleAndContent = new sap.m.VBox(
		{
			width:"100%",
		
			items:
			[

				simpleDisplay,
				DescriptionDetail
			]
		});

		return TitleAndContent;
							
	}
});

