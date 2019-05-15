var m_DivMouseOver = null;

function Ria_HoverToolbar_Create()
{
	// Corner dot: TopRight, BottomRight, BottomLeft
	$(newDiv())
		.css({
			position: 'absolute',
			width: '5px',
			height: '5px',
			cursor: 'crosshair',
			border: 'solid 1px #10496B',
			backgroundColor: '#7BAACE',
			zIndex: '999999999'
		})
		.addClass('RiaSelector')
		.attr('id', 'RiaSelectorTopRight').appendTo('body')
		.clone().attr('id', 'RiaSelectorBottomRight').appendTo('body')
		.clone().attr('id', 'RiaSelectorBottomLeft').appendTo('body')
		;

	// Corner dot: TopLeft  (image icons inside)
	$(newDiv())
		.css({
			position: 'absolute',
			width: '42px',
			height: '18px',
			border: 'solid 1px #5A96BD',
			backgroundColor: '#7BAACE',
			zIndex: '999999999'
		})
		.addClass('RiaSelector')
		.attr('id', 'RiaSelectorTopLeft')
		.appendTo('body')
		;

	// Corner dot: TopLeft  (image icons inside)
	/*	$('<div class="ui-state-default ui-corner-all" title=".ui-icon-grip-solid-vertical"><span class="ui-icon ui-icon-grip-solid-vertical"></span></div>')
	.click(function(e) { Ria_DivMakeEditable(e); })
	.addClass('RiaSelector')
	.appendTo('#RiaSelectorTopLeft')
	;

	$('<div class="ui-state-default ui-corner-all" title=".ui-icon-grip-solid-horizontal"><span class="ui-icon ui-icon-grip-solid-horizontal"></span></div>')
	.click(function(e) { Ria_DivMakeEditable(e); })
	.addClass('RiaSelector')
	.appendTo('#RiaSelectorTopLeft')
	;

	$('<div class="ui-state-default ui-corner-all" title=".ui-icon-pencil"><span class="ui-icon ui-icon-pencil"></span></div>')
	.click(function(e) { Ria_DivMakeEditable(e); })
	.addClass('RiaSelector')
	.appendTo('#RiaSelectorTopLeft')
	;
	*/
	$('<div class="ui-state-default ui-corner-all" title=".ui-icon-script"><span class="ui-icon ui-icon-script" style="float:left"></span><span style="font-size: 10px; font-family: Arial">Edit</span></div>')
		.attr({ title: 'Edit this element.' })
		.click(function(e) { Ria_DivMakeEditable(e); })
		.addClass('RiaSelector')
		.appendTo('#RiaSelectorTopLeft')
		;
	/*
	// Image icons
	$(document.createElement('img'))
	.css({
	width: '10px',
	height: '10px',
	border: '1px solid #606060',
	margin: '1px',
	backgroundColor: '#081829',
	zIndex: '999999999'
	})
	.addClass('RiaSelector')
	.attr({ src: 'images/arrowdown.png', alt: 'Edit this element.' })
	.click(function(e) { Ria_AddDiv(e); })
	.appendTo('#RiaSelectorTopLeft')

	.clone()
	.attr({ src: 'images/addhorizontal.png', alt: 'Edit this element.' })
	.click(function(e) { Ria_DivMakeEditable(e); })
	.appendTo('#RiaSelectorTopLeft')

	.clone()
	.attr({ src: 'images/addvertical.png', alt: 'Edit this element.' })
	.click(function(e) { Ria_SelectParents(e); })
	.appendTo('#RiaSelectorTopLeft')
	;
	*/

	// Parent selector
	$(newDiv())
		.css({
			position: 'absolute',
			width: '0px',
			zIndex: '999999999'
		})
		.css({ 'filter': 'alpha(opacity=80)', '-moz-opacity': '0.8', '-khtml-opacity': '0.8', 'opacity': '0.8' })
		.addClass('RiaSelector')
		.attr('id', 'RiaPar10').appendTo('body')
		.clone().attr('id', 'RiaPar9').appendTo('body')
		.clone().attr('id', 'RiaPar8').appendTo('body')
		.clone().attr('id', 'RiaPar7').appendTo('body')
		.clone().attr('id', 'RiaPar6').appendTo('body')
		.clone().attr('id', 'RiaPar5').appendTo('body')
		.clone().attr('id', 'RiaPar4').appendTo('body')
		.clone().attr('id', 'RiaPar3').appendTo('body')
		.clone().attr('id', 'RiaPar2').appendTo('body')
		.clone().attr('id', 'RiaPar1').appendTo('body')
		.clone().attr('id', 'RiaPar0').appendTo('body')
		;

}


function Ria_AddMouseEventsForDivs()
{
	var ele = $('div:not([class*=Ria][unselectable][class*=ui-dialog]), td, tr, table');

	ele.mouseover(Ria_DivMouseOver);

	for (var i = 0; i < ele.length; i++)
	{
		if (ele[i] != null)
		{
			/*
			new Ext.dd.DropTarget(ele[i], {
			ddGroup: 'group'
			, notifyDrop: function(source, e, node)
			{
			var id = '#' + this.el.id;
			var msg = '<div><b>Data:</b>&nbsp;';
			msg += node.node.text + '&nbsp;' + id + '</div>';
			//msg += '<tr><td>id:</td><td><b>' + node.node.id + '</b></td></tr>'
			//msg += '<tr><td>text:</td><td><b>' + node.node.text + '</b></td></tr>';
			//msg += '<tr><td>leaf:</td><td><b>' + node.node.leaf + '</b></td></tr>';
			//msg += '<tr><td>data:</td><td><b>' + node.node.attributes.data + '</b></td></tr>';
			//msg += '</table>'
			//$(id).html(msg);
			$(m_DivMouseOver).append(msg);
			}
			});
			*/
		}
	}

	/*var ele = $('.drop_zone');
	for (var i = 0; i < ele.length; i++)
	{
	document.title = Math.floor(Math.random() * 1000).toString();
	if (ele[i].id == null || ele[i].id == '')
	$(ele[i]).attr('id', Math.floor(Math.random() * 1000).toString());
		 
	if (ele[i].id != null && ele[i].id != '')
	{
	new Ext.dd.DropTarget(ele[i].id,
	{
	ddGroup: 'group',
	notifyDrop: function(source, e, node)
	{
	var msg = '<b>Data:</b><br><table style="font-size: 11px;">';
	msg += '<tr><td>id:</td><td><b>' + node.node.id + '</b></td></tr>'
	msg += '<tr><td>text:</td><td><b>' + node.node.text + '</b></td></tr>';
	msg += '<tr><td>leaf:</td><td><b>' + node.node.leaf + '</b></td></tr>';
	msg += '<tr><td>data:</td><td><b>' + node.node.attributes.data + '</b></td></tr>';
	msg += '</table>'
	var id = '#' + this.el.id;
	$(id).html(msg);
	}
	})
	}
	}*/
}

function Ria_DivMouseOver(e)
{
	if ($(this) == null)
		return;

	m_DivMouseOver = this;

	var offset = $(this).offset();
	var width = $(this).width();
	var height = $(this).height();

	var pos_left = offset.left;
	var pos_top = offset.top;
	var pos_right = pos_left + width - 7;
	var pos_bottom = pos_top + height - 7;


	e.stopPropagation();

	$('#RiaSelectorTopLeft').offset({ left: pos_left, top: pos_top });
	$('#RiaSelectorTopRight').offset({ left: pos_right, top: pos_top });
	$('#RiaSelectorBottomLeft').offset({ left: pos_left, top: pos_bottom });
	$('#RiaSelectorBottomRight').offset({ left: pos_right, top: pos_bottom });

	//document.title = $('#RiaSelectorTopLeft').offset().left;

	//if ($(this).attr('id') != '')
	//	window.setTimeout('$("#' + $(this).attr('id') + '").addClass('drop_zone');', 1000);

	Ria_MoveSelectors(this, 0);
	$(this).parents().each(function(i)
	{
		Ria_MoveSelectors(this, i + 1)
	});
}

function Ria_MoveSelectors(selector, parent_index)
{
	var jqSelector = $(selector);
	var i = parent_index;

	var par_offset = jqSelector.offset();
	var par_left = par_offset.left - 1;
	var par_top = par_offset.top - 4 - i * 3;

	var par_width = jqSelector.width() + i * 3;

	$('#RiaPar' + i).css({ width: par_width }).offset({ left: par_left, top: par_top });
}



function Ria_DivMakeEditable(e)
{
	var obj = $(m_DivMouseOver);

	obj.contentEditable({
		editClass: 'contenteditable',
		saveHandler: function(e)
		{
			//	Character Encoding 		
			//	'&' %26 	';' %3B		'#' %23 	'$' %24		'%' %25 	',' %2C 	'/' %2F 	':' %3A 
			//	'+' %2B  	'=' %3D 	'?' %3F 	'@' %40		'ú' %C3%BA				'á' %C3%A1
			var RiaData = $(newDiv()).text(obj.html()).html();
			RiaData = RiaData.replace('&#', '#');
			RiaData = RiaData.replace(/%/g, '%25');
			RiaData = RiaData.replace(/&/g, '%26');
			RiaData = RiaData.replace(/\+/g, '%2B');

			$.ajax({
				type: 'POST',
				url: 'server/SaveFile.aspx',
				data: 'data=' + RiaData,
				success: function(data)
				{
					alert(data);
				}
			});

			return true;
		}
	});
}

function Ria_SelectParents(r)
{
	$(m_DivMouseOver).parents().each(function(index)
	{
		$(this).css({ border: '3px solid red' });
	});
}