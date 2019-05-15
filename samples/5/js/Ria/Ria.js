$(document).ready(Ria_OnLoad);



function Ria_OnLoad()
{
	Ria_KeyboardShortcuts();

	Ria_Extend_ContentEditable();
	
	Ria_Menu_Create();
	Ria_DialogComponents_Create();
	Ria_DialogProperties_Create();

	Ria_AddMouseEventsForDivs();
	Ria_HoverToolbar_Create();
}

