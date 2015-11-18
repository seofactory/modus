$(function(){
	$('[placeholder]').each(function(){
		var placeholderValue = this.getAttribute("placeholder");
		if (!placeholderValue) return;
		this.value = placeholderValue;	
		var $this = $(this)
		.addClass("placeholder");
    if($this.hasClass("password")) {
       $this.prop("type", "text");
    }	
		$this.focus(function(){
			$this.removeClass("placeholder");
			if ($this.val() === placeholderValue) $this.val("");
      if($this.hasClass("password")) {
         $this.prop("type", "password");
      }
		})
		.blur(function(){
			if ($this.val() === "") {
				$this.addClass("placeholder").val(placeholderValue);
        if($this.hasClass("password")) {
           $this.prop("type", "text");
        }
			}
		});
	});
});
