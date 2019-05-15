function Ria_DialogComponents_Create()
{
	/*// Component bar window
	RiaWindow_Create('Ria_DialogComponents', '', { color: '#000044' });

	// Set component window position
	$('#Ria_DialogComponents')
		.css({ left: '30px', top: '60px' })
		.width(168)
		.height(400)
		;

	// Create component buttons
	$(newDiv())
		.addClass('RiaDialogDiv')
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
			border: 'solid 1px #4A6D85',
			color: '#CCCCCC',
			backgroundColor: '#0F1A28'
		})
		.attr({ id: '.' }).html('Banner').appendTo('#Ria_DialogComponents')
		.clone().html('Image').appendTo('#Ria_DialogComponents')
		.clone().html('Content Repeat').appendTo('#Ria_DialogComponents')
		.clone().html('DataGrid').appendTo('#Ria_DialogComponents')
		.clone().html('TreeView').appendTo('#Ria_DialogComponents')
		;

	$('#Ria_DialogComponents').contents().mousedown(RiaDragDrop_MouseMove);
*/
}


function RiaDragDrop_MouseMove(e)
{
	dragObject = this;
	mouseOffset = getMouseOffset(this, e);
	return false;
}




document.onmousemove = mouseMove;
document.onmouseup = mouseUp;

var dragObject = null;
var mouseOffset = null;

function mouseCoords(e)
{
	if (e.pageX || e.pageY)
	{
		return { x: e.pageX, y: e.pageY };
	}
	return {
		x: e.clientX + document.body.scrollLeft - document.body.clientLeft,
		y: e.clientY + document.body.scrollTop - document.body.clientTop
	};
}

function getMouseOffset(target, e)
{
	e = e || window.event;

	var docPos = getPosition(target);
	var mousePos = mouseCoords(e);
	return { x: mousePos.x - docPos.x, y: mousePos.y - docPos.y };
}

function getPosition(target)
{
	var left = 0;
	var top = 0;

	while (target.offsetParent)
	{
		left += target.offsetLeft;
		top += target.offsetTop;
		target = target.offsetParent;
	}

	left += target.offsetLeft;
	top += target.offsetTop;

	return { x: left, y: top };
}

function mouseMove(e)
{
	e = e || window.event;
	if (dragObject)
	{
		var mousePos = mouseCoords(e);

		dragObject.style.position = 'absolute';
		dragObject.style.top = mousePos.y - mouseOffset.y;
		dragObject.style.left = mousePos.x - mouseOffset.x;
		$(dragObject).appendTo('body');

		return false;
	}
}

function mouseUp()
{
	dragObject = null;
}