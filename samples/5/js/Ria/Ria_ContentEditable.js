function Ria_Extend_ContentEditable()
{
	$.fn.contentEditable = function(opt)
	{
		if (this.length < 1)
			return;

		var oldPadding = "0px";
		var def = {
			editClass: null,
			saveText: "Save",
			saveHandler: null
		};
		$.extend(def, opt);

		return this.each(function()
		{
			var jContent = $(this);

			if (this.contentEditable == "true")
				return this; // already editing

			var jButton = $("<input type='button' value='" + def.saveText + "' style='display: block;'/>");

			var cleanupEditor = function()
			{
				if (def.editClass)
					jContent.removeClass(def.editClass);
				else
					jContent.css({ background: "transparent", padding: oldPadding });
				jContent.get(0).contentEditable = false;
				jButton.remove();
			};

			jButton.click(function(e)
			{
				if (def.saveHandler.call(jContent.get(0), e))
					cleanupEditor();
			});

			jContent.keypress(function(e)
			{
				if (e.keyCode == 27)
					cleanupEditor();
				//else if(e.keyCode == 9) 
			});

			jContent.after(jButton).css("margin", 2);

			this.contentEditable = true;

			if (def.editClass)
				jContent.addClass(def.editClass);
			else
			{
				oldPadding = jContent.css("padding");
				jContent.css({ background: "lavender", padding: 10 });
			}

			return this;
		});
	}
}
