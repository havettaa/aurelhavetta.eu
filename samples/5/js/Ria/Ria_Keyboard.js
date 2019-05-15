var Ria_IsCtrl = false;

function Ria_KeyboardShortcuts()
{
	$(document)
		.keyup(
			function(e)
			{
				//if (e.which == 17)
				Ria_IsCtrl = false;
			})
		.keydown(
			function(e)
			{
				if (e.which == 17)
					Ria_IsCtrl = true;

				if (e.which != 17 && Ria_IsCtrl == true)
				{
					if (Ria_KeyboardShortcuts_Compute(e.which) == true)
					{
						Ria_IsCtrl = false;  // sometimes keyup is not called
						return false;
					}
				}
			}
		);

}

function Ria_KeyboardShortcuts_Compute(key)
{
	switch (key)
	{
		case 69: // E
			window.setTimeout("document.body.contentEditable='true';", 100);
			break;
		case 78: // N
			window.setTimeout("Ria_Menu_DialogNew_Click();", 100);
			break;
		case 79: // O
			var Ria_PromptRet = prompt("Open page from url,\nor cancel and pick from ria dialog:", "http://www.geoda.sk")
			if (Ria_PromptRet != null)
				LoadPage(Ria_PromptRet);
			else // cancel prompt
				window.setTimeout("Ria_Menu_DialogOpen_Click();", 100);
				
			break;
		case 83: // S
			alert("Ctrl + S");
			break;
		case 84: // T
			alert("Ctrl + T");
			break;
		default:
			alert(key);
			return false;
	}

	return true;
}