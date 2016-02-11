$(function(){
	$(".check").each(function() {
		var $this = $(this), $input = $this.find(":checkbox").eq(0), $parent = $this.closest("label");
		
		if (!$input.length) return;		
		if ($input[0].disabled) $this.addClass('disabled');
	    
		$input.hide().insertAfter($parent.length ? $parent : $this);
		$input.data("_span", $this);
		
		function checkChecked(){
			$this[($input[0].checked ? "add" : "remove")+"Class"]("checked");
		}
		
		$this.mouseup(function(){
			if ($this.hasClass('disabled')) return;
			
			$input[0].checked = !$input[0].checked;
			
			checkChecked();
			
			$input.change();
		});

		checkChecked();
	});
});