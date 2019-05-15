sap.ui
		.jsview(
				"ui5_routing.notFound",
				{


					createContent : function(oController) {
						
						var oTextView = new sap.ui.commons.TextView({
							text : 'The page you requested was not found . Please make sure you typed the correct address or that the product/package/MeasurementObject that you requested exists.',
							tooltip : 'Refresh the page with the correct parameter',
							wrapping : true,
							width : '500px',
							semanticColor : sap.ui.commons.TextViewColor.Positive,
							design : sap.ui.commons.TextViewDesign.H1
						});

						var thelink = new sap.m.Link({
							text : "Navigate to home page",
							target : "_self",
							href : "/usag/morepository/MOREPOSITORY/WebContent/index.html#/",
							press : function() {

							}

						})

						var text = 'The page you requested was not found . Please make sure you typed the correct address or that the product/package/MeasurementObject that you requested exists. \n\	\n\ \n\			If you reached this page via an external link,potentially the referred master data (e.g. Innovation/Feature)  is not yet replicated to the MOR. Please try again tomorrow. \n\ ';
						return new sap.m.MessagePage(
								{
									title : "404 Not Found",
									text : 'The page you requested was not found . Please make sure you typed the correct address or that the product/package/MeasurementObject that you requested exists. \n\	\n\ \n\			If you reached this page via an external link,potentially the referred master data (e.g. Innovation/Feature)  is not yet replicated to the MOR. Please try again tomorrow. \n\ ',
									customDescription : thelink
								});
					}

				});