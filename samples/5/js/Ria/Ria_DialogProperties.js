function Ria_DialogProperties_Create()
{
	// Dialog
	$(newDiv())
		.addClass('Ria_Properties')
		.attr({ id: 'Ria_Properties', title: 'External Include\'s' })
		.html('<p>Dialog :</p>')
		.css({ 'filter': 'alpha(opacity=80)', '-moz-opacity': '0.8', '-khtml-opacity': '0.8', 'opacity': '0.8' })
		.appendTo('body')
		.dialog({
			autoOpen: true,
			closeOnEscape: false,

			position: ['right', 'top'],
			width: 200
		})
		.children().each(function(i) { $(this).addClass('RiaDialog'); })
		;

	// Create external bar buttons
	$(newDiv())
		.addClass('Ria_PropertiesDiv')
		.css({
			width: '160px',
			height: '18px',
			cursor: 'move',
			textAlign: 'center',
			fontFamily: 'Arial',
			fontSize: '12px',
			padding: '2px',
			paddingTop: '4px',
			margin: '1px',
			backgroundColor: RiaWindowItemBG,
			color: RiaWindowItemColor,
			border: RiaWindowItemBorder
		})
		.attr({ id: 'Ria_Properties_ItemTemplate' })
		.html('Menu').appendTo('#Ria_Properties')
		.clone().html('Header').appendTo('#Ria_Properties')
		.clone().html('SideBar').appendTo('#Ria_Properties')
		.clone().html('Login').appendTo('#Ria_Properties')
		.clone().html('Footer').appendTo('#Ria_Properties')
		;

	//$('#Ria_DialogProperties').dialog('open');

}
