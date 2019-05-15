// OLD STUFF !!!!
function Ria()
{
	this.Version = '1.0';

	Ria.prototype.Constructor = Ria_Constructor;
}

function Ria_Constructor()
{
	with (this)
	{
		alert(Version);
	}
}




function Ria_LoadPage(url)
{
	Ria_Ajax(url, Ria_LoadPageAjaxCallback);
}

function Ria_LoadPageAjaxCallback(data)
{
	//$('body').append(data);
	//Ria_AddMouseEventsForDivs();
}





function Ria_Ajax(param_url, param_func)
{

	var ajax_url = 'LoadUrl.aspx?url=' + param_url;

	$.ajax({
		url: ajax_url,
		success: function(data)
		{
			var htm = data;
			htm = htm.replace(new RegExp(' src="(?!//|http)', 'gi'), ' src="' + param_url + '/')
			htm = htm.replace(new RegExp(' src=\'(?!//|http)', 'gi'), ' src=\'' + param_url + '/')
			$('body').prepend(htm);
			Ria_AddMouseEventsForDivs();
		}

	});
}

function Ria_IncludeJs(jsname, pos)
{
	var el = document.getElementsByTagName(pos)[0];
	var s = document.createElement('script');
	s.setAttribute('type', 'text/javascript');
	s.setAttribute('src', jsname);
	el.appendChild(s);
}





function Ria_Parse()
{
	var divs = $('[usedatasrouce]');
	divs.each(function()
	{
		var useds = $(this).attr('usedatasrouce');
		var datasrc = $('[datasourceid="' + useds + '"]').html();
		$(this).html(datasrc);

	});
}

function Ria_Reapeater(json)
{
	var ret = '';

	var ds = json.datasource;
	for (var r in ds.data)
	{
		var finalT = json.template;
		for (var c in ds.columns)
		{
			finalT = finalT.replace('$' + ds.columns[c] + '$', ds.data[r][c])
		}

		ret += finalT;
	}

	return ret;
}
