function Ria_Menu_Create()
{
	Ria_Menu_DialogNew_Create();
	Ria_Menu_DialogOpen_Create();

	// Main toolbar on top
	$(newDiv())
		.attr({ id: 'Ria_Menu' })
		.addClass('Ria_Menu')
		.css({ position: 'fixed', textAlign: 'left', zIndex: '999999999' })
		.css({ left: '300px', top: '30px' })
		.width(420)
		.height(60)
		.appendTo('body')
		;

	$(newDiv())
		.addClass('Ria_Menu_Icons')
		.css({ background: 'url(images/MenuIcons/Ria.png)', float: 'left', width: '53px', height: '53px' })
		.appendTo('#Ria_Menu')
		.click(function()
		{
			if ($('#Ria_Menu_Icons').is(':hidden'))
				$('#Ria_Menu_Icons').animate({ width: 'show' });
			else
				$('#Ria_Menu_Icons').animate({ width: 'hide' });
		})
		.mouseover(function()
		{
			$(this).css({ background: 'url(images/MenuIcons/Ria_hover.png)' });
		})
		.mouseout(function()
		{
			$(this).css({ background: 'url(images/MenuIcons/Ria.png)' });
		})
		;

	$(newDiv())
		.attr({ id: 'Ria_Menu_Icons' })
		.addClass('Ria_Menu_Icons')
		.css({ marginTop: '6px', border: 'solid 1px #5A96BD', background: '#185573 url(images/MenuIcons/BG_HeaderDialog.png) repeat-x' })
		.height(40)
		.appendTo('#Ria_Menu')
		;

	$(document.createElement('img'))
		.addClass('Ria_Menu_Icons')
		.css({ width: '40px', height: '40px' })
		.attr({ src: 'images/MenuIcons/new.png' }).appendTo('#Ria_Menu_Icons').click(Ria_Menu_DialogNew_Click).mouseover(Ria_Menu_Over).mouseout(Ria_Menu_Out)
		.clone().attr({ src: 'images/MenuIcons/open.png' }).appendTo('#Ria_Menu_Icons').click(Ria_Menu_DialogOpen_Click).mouseover(Ria_Menu_Over).mouseout(Ria_Menu_Out)
		.clone().attr({ src: 'images/MenuIcons/save.png' }).appendTo('#Ria_Menu_Icons').click(Ria_Menu_Save_Click).mouseover(Ria_Menu_Over).mouseout(Ria_Menu_Out)
		.clone().attr({ src: 'images/MenuIcons/planet.png' }).appendTo('#Ria_Menu_Icons').mouseover(Ria_Menu_Over).mouseout(Ria_Menu_Out)
		.clone().attr({ src: 'images/MenuIcons/settings.png' }).appendTo('#Ria_Menu_Icons').mouseover(Ria_Menu_Over).mouseout(Ria_Menu_Out)
		.clone().attr({ src: 'images/MenuIcons/settings2.png' }).appendTo('#Ria_Menu_Icons').mouseover(Ria_Menu_Over).mouseout(Ria_Menu_Out)
		.clone().attr({ src: 'images/MenuIcons/export.png' }).appendTo('#Ria_Menu_Icons').mouseover(Ria_Menu_Over).mouseout(Ria_Menu_Out)
		.clone().attr({ src: 'images/MenuIcons/source.png' }).appendTo('#Ria_Menu_Icons').mouseover(Ria_Menu_Over).mouseout(Ria_Menu_Out)
		.clone().attr({ src: 'images/MenuIcons/help.png' }).appendTo('#Ria_Menu_Icons').mouseover(Ria_Menu_Over).mouseout(Ria_Menu_Out)
		;

}


function Ria_Menu_Over()
{
	$(this).css({ background: 'url(images/MenuIcons/BG_MenuIcon.png)' });
}

function Ria_Menu_Out()
{
	$(this).css({ background: '' });
}


function Ria_Menu_DialogNew_Create()
{
	$(newDiv())
		.attr({ id: 'Ria_Menu_DialogNew', title: 'New page' })
		.append($('<div>')
			.addClass('Ria_DialogContent')
			.append('<p>New html page for editing:</p>')
			.append($('<input>').attr({ type: 'button' }).val('www.jquery.com'))
			.append('<hr />')
			.append('')
			.append('<p>Favorites:</p>')
			.append('<p>New html page for editing:</p>')
			.append($('<input>').attr({ type: 'text', id: 'LoadPageUrl' }).val('http://rmrstudio.sk/extjs/drop_div.htm'))
			.append($('<input>').attr({ type: 'button' }).click(function() { LoadPage($(LoadPageUrl).val()); }).val('Load')).append('<br />')
			.append($('<input>').attr({ type: 'button' }).click(function() { LoadPage('http://www.geoda.sk'); }).val('Geoda'))
			.append($('<input>').attr({ type: 'button' }).click(function() { LoadPage('http://www.jqueryui.com'); }).val('JQuery'))
			.append($('<input>').attr({ type: 'button' }).click(function() { LoadPage('http://www.webtoolkit.info/javascript-drag-and-drop.html'); }).val('WebTK')).append('<br />')
			.append($('<input>').attr({ type: 'button' }).click(function() { LoadPage('http://www.dunnbypaul.net/js_mouse'); }).val('Drag'))
			.append($('<input>').attr({ type: 'button' }).click(function() { LoadPage('http://www.ibm.com/sk/sk'); }).val('IBM'))
			.append($('<input>').attr({ type: 'button' }).click(function() { LoadPage('http://change-window-title.qarchive.org'); }).val('GArch')).append('<br />')
			.append($('<input>').attr({ type: 'button' }).click(function() { LoadPage('http://www.azet.sk'); }).val('Azet'))
			.append($('<input>').attr({ type: 'button' }).click(function() { LoadPage('http://www.mazeto.sk'); }).val('Mazeto'))
			.append($('<input>').attr({ type: 'button' }).click(function() { LoadPage('http://www.guru.sk'); }).val('Guru')).append('<br />')
			.append($('<input>').attr({ type: 'button' }).click(function() { LoadPage('http://www.lazyturtles.sk'); }).val('Lazy'))
			.append($('<input>').attr({ type: 'button' }).click(function() { LoadPage('http://www.elizabethcastro.com'); }).val('Castro'))
			.append($('<input>').attr({ type: 'button' }).click(function() { document.body.contentEditable = 'true'; }).val('Editable')).append('<br />')
			.append($('<input>').attr({ type: 'button' }).click(function() { anim(); }).val('Anim'))
			.append($('<input>').attr({ type: 'button' }).click(function() { openw(); }).val('Open'))
			.append($('<input>').attr({ type: 'button' }).click(function() { openModal(); }).val('Modal'))
			.append($('<input>').attr({ type: 'button' }).click(function() { openModeless(); }).val('Modeless')).append('<br />')
		)
		.css({ 'filter': 'alpha(opacity=90)', '-moz-opacity': '0.9', '-khtml-opacity': '0.9', 'opacity': '0.9' })
		.appendTo('body')
		.dialog(
		{
			autoOpen: false,
			width: 500,
			height: 400,
			buttons: {
				'Cancel': function()
				{
					$('#Ria_Menu_DialogNew').dialog('close');
				},
				'OK': function()
				{
					$('#Ria_Menu_DialogNew').dialog('close');
				}
			}
		})
		.children().each(function(i) { $(this).addClass('RiaDialog'); })
		;
}

function Ria_Menu_DialogNew_Click()
{
	$('#Ria_Menu_DialogNew').dialog('open');
}


function Ria_Menu_DialogOpen_Create()
{
	$(newDiv())
		.attr({ id: 'Ria_Menu_DialogOpen' })
		.css({ 'filter': 'alpha(opacity=90)', '-moz-opacity': '0.9', '-khtml-opacity': '0.9', 'opacity': '0.9' })
		.appendTo('body')
		.dialog({
			title: 'Open page',
			modal: true,
			autoOpen: false,
			height: 500,
			width: 400,
			buttons:
			{
				'Cancel': function()
				{
					$('#Ria_Menu_DialogOpen').dialog('close');
				},
				'OK': function()
				{
					$('#Ria_Menu_DialogOpen').dialog('close');
				}
			},
			open: function()
			{
				$('#Ria_Menu_DialogOpen').load('dialogs/Ria_Menu_DialogOpen.htm', Ria_Menu_DialogOpen_Reload);
			}
		})
		;
	//		.children().each(function(i) { $(this).addClass('RiaDialog'); })
}

function Ria_Menu_DialogOpen_Click()
{
	$('#Ria_Menu_DialogOpen').dialog('open');
}

function Ria_Menu_DialogOpen_Reload()
{
	var RiaPath = $(this).attr('title');

	if (RiaPath == '')
		RiaPath = '..';

	$.getJSON('server/GetDir.aspx?path=' + RiaPath, function(data)
	{
		$('#Ria_Menu_DialogOpen_DirList').html('');
		$.each(data, function(i, item)
		{
			$(newDiv())
				.html(item.file)
				.attr({ title: item.path })
				.appendTo('#Ria_Menu_DialogOpen_DirList')
				.click(Ria_Menu_DialogOpen_Reload)
				.dblclick(function()
				{
					var param_url = $(this).attr('title').replace('..', '');
					var ajax_url = 'server/LoadUrl.aspx?url=' + param_url;

					$.ajax({
						url: ajax_url,
						success: function(data)
						{
							var htm = data;
							htm = htm.replace(new RegExp(' src="(?!//|http)', 'gi'), ' src="' + param_url + '/')
							htm = htm.replace(new RegExp(' src=\'(?!//|http)', 'gi'), ' src=\'' + param_url + '/')
							$('#container').empty().prepend(htm);

							//Ria_AddMouseEventsForDivs();
							Ria_AddClickEventForDivs();
						}

					});
				});
		});
	});
}


function Ria_Menu_Save_Click()
{
	var Ria_Menu_Save_FileName = prompt("Enter file name:", "test.htm")
	if (Ria_Menu_Save_FileName == null)
	{
		alert('Enter valid file name and try again.');
		return;
	}

	//	Character Encoding 		
	//	'&' %26 	';' %3B		'#' %23 	'$' %24		'%' %25 	',' %2C 	'/' %2F 	':' %3A 
	//	'+' %2B  	'=' %3D 	'?' %3F 	'@' %40		'ú' %C3%BA				'á' %C3%A1
	var obj = $('body');
	var RiaData = $(newDiv()).text(obj.html()).html();
	RiaData = RiaData.replace('&#', '#');
	RiaData = RiaData.replace(/%/g, '%25');
	RiaData = RiaData.replace(/&/g, '%26');
	RiaData = RiaData.replace(/\+/g, '%2B');

	$.ajax(
	{
		type: 'POST',
		url: 'server/SaveFile.aspx?' + 'filename=' + Ria_Menu_Save_FileName,
		data: 'data=' + RiaData,
		success: function(data)
		{
			alert(data);
		}
	});
}
