// blocksEditScript.js v1.0
// 
// keep the wrapping function to use $ reference for jQuery
// as it has been removed/disabled within blocks
//===============================================================
(function($){
// Start blocks javascript
//===============================================================




	$('body').delegate('.choose_extras_option', 'change', function(){
		var _this = $(this);
		var myVal = _this.find(':selected').val();
		if ( myVal === 'option_1' ) {
			_this.parent().find('.extra.pop').show();
			_this.parent().find('.extra.link').hide();
		}
		if ( myVal === 'option_2' ) {
			_this.parent().find('.extra.pop').hide();
			_this.parent().find('.extra.link').show();
		}
		if ( myVal === 'option_3' ) {
			_this.parent().find('.extra').hide();
		}
	});




// End blocks javascript
//===============================================================
}(jQuery));
//===============================================================