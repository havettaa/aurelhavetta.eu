
$(document).ready(win_onload);

function win_onload()
{
	$('#menu1').emenu();
	Ria_AddClickEventForDivs();
}

function anim()
{

	if ($("div:first").is(":hidden"))
	{
		$("div").slideDown("slow");
	}
	else
	{
		$("div").fadeOut("slow");
	}

}

function LoadPage(param_url)
{

	var ajax_url = 'server/LoadUrl.aspx?url=' + param_url;

	$.ajax({
		url: ajax_url,
		success: function(data)
		{
			var htm = data;
			htm = htm.replace(new RegExp(' src="(?!//|http)', 'gi'), ' src="' + param_url + '/')
			htm = htm.replace(new RegExp(' src=\'(?!//|http)', 'gi'), ' src=\'' + param_url + '/')
			$('#container').empty().prepend(htm);

			Ria_AddMouseEventsForDivs();
			Ria_AddClickEventForDivs();
		}

	});
}

function load()
{
	var filename = prompt("Enter file name to load:", "test.htm")
	if (filename == null)
	{
		alert('Enter valid file name and try again.');
		return;
	}

	var url = filename + '?' + (new Date()).getTime();
	$.ajax({
		url: url,
		success: function(data)
		{
			$('#container').empty().prepend(data);
		}

	});
}

function Ria_AddClickEventForDivs()
{
	$("div:not([class*=Ria][unselectable][class*=ui-dialog]),a,button").click(function()
	{
		//$(this).effect("highlight", {}, 500);
		//$(this).addClass("select");
		return false;
	});
}

function ZatvorSa()
{
	window.open("close.htm", "_self");
}


function openw()
{
	window.open('addimage.htm', 'NewWin', 'width=1000,height=700,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no');
	//window.open('addimage.htm', 'NewWindik', 'width=600, height=600, top=10, left=10, channelmode = no, directories = no, fullscreen = no, location = no, menubar = no, resizable = yes, scrollbars = yes, status = yes, titlebar = no, toolbar = no', false);
}

function openModeless()
{
	window.showModelessDialog("addimage.htm", "NewWin", "dialogWidth:255px;dialogHeight:250px");
}

function openModal()
{
	if (window.showModalDialog)
	{
		window.showModalDialog("addimage.htm", "NewWin", "dialogWidth:255px;dialogHeight:250px");
	}
	else
	{
		window.open('addimage.htm', 'NewWin', 'height=255,width=250,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,modal=yes');
	}
}
