var RiaWindowBG = '#215573'; //'#052E47'
var RiaWindowColor = '#CCCCCC'; //'#052E47'
var RiaWindowBorder = 'solid 1px #4A657B';
var RiaWindowItemBG = '#394552';
var RiaWindowItemColor = '#99CCCC';
var RiaWindowItemBorder = 'solid 1px #4A6D85';

function newDiv()
{
	return document.createElement('div');
}

function RiaWindow_Create(param_id, param_content, param_style)
{
	return $(newDiv())
		.addClass('RiaDialog')
		.attr({ id: param_id })
		.css({ position: 'fixed', textAlign: 'left', zIndex: '999999999' })
		.css({ 'filter': 'alpha(opacity=80)', '-moz-opacity': '0.8', '-khtml-opacity': '0.8', 'opacity': '0.8' })
		.appendTo('body')
		.css({ backgroundColor: RiaWindowBG, border: RiaWindowBorder })
		.css(param_style)
		.html(param_content)
		;
	//border-bottom-color: Aqua; border-left-color: Fuchsia; border-right-color: Green; border-top-color: Purple;
}


/*
scriptLoader.load([
'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js',
'http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/jquery-ui.min.js'
'your-script.js'
]);
*/
var scriptLoader = {
	_loadScript: function(url, callback)
	{
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = url;
		if (callback)
		{
			script.onreadystatechange = function()
			{
				if (this.readyState == 'loaded') callback();
			}
			script.onload = callback;
		}
		head.appendChild(script);
	},

	load: function(items, iteration)
	{
		if (!iteration) iteration = 0;
		if (items[iteration])
		{
			scriptLoader._loadScript(
				items[iteration],
				function()
				{
					scriptLoader.load(items, iteration + 1);
				}
			)
		}
	}
}
