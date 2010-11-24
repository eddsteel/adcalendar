var clickedBox = null;

(function(){

	/*
	 * Open a JQuery'ed box
	 */
	var click_open = function(ev) {
    clickedBox = ev.currentTarget;
		open(clickedBox);
	}

  function open(box) {
		var current = box.className;
    $(box).attr('className', current.replace('closed', 'open'));
  }

  function preopen_closed() {
  	var today = 12; // TODO
		var text;
		var boxes = $('.closed');
		boxes.each(function(b){
			text = $(boxes[b]).text().trim();
			if (today > text)
			{
				open(boxes[b]);
			}
		});
	}


  var start = function() {
		preopen_closed();
		resize_boxes();
		$('.closed').click(click_open);
	}

  $(document).ready(start);

})()

