var clickedBox = null;

(function(){

	/*
	 * Open a JQuery'ed box
	 */
  var open = function(box) {
    clickedBox = box;
		var current = box[0].className;
    box.attr('className', current.replace('closed', 'open'));
  }

  function preopen_closed() {
  	var today = 12; // TODO
		var text;
		var boxes = $('.closed');
		boxes.each(function(b){
			text = $(boxes[b]).text().trim();
			if (today > text)
			{
				open($(boxes[b]));
			}
		});
	}


  var start = function() {
		preopen_closed();
    $('.closed').click(open);
  }

  $(document).ready(start);

})()

