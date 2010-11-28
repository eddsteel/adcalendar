var clickedBox = null;
// TODO: 
//
// lightbox in correct order
// fix 0 in images.

(function(){

  /*
   * Open a JQuery'ed box
   */
  var click_open = function(ev, text) {
    clickedBox = ev.currentTarget;
    open(clickedBox, text);
  }

  function open(box, text) {
    if (text.length == 1)
    {
      text = '0' + text;
    }
    var current = box.className;
    $(box).attr('className', current.replace('closed', 'open'));
    box.href = 'images/' + text + '.jpg'
  }

  function get_day_of_month()
	{
  	var now = new Date();
  	var month = now.getMonth();
  	var today = 0;
  	if (month == 0)
		{
			today = 30;
		}
		else if (month == 11 || month == 10)
		{
			today = now.getDate();
		}

		return today;
	}

  function init_boxes() {
    var text;
    var today = get_day_of_month();
    var boxes = $('.closed');
    boxes.each(function(b){
      boxes[b].href = 'javascript:void';
      text = $(boxes[b]).text().trim();
      if (today > text)
      {
        open(boxes[b], text);
      }
			else if (today == text)
			{
				$(boxes[b]).click(click_open, text);
			}
    });
  }

  function square_boxes(){
    // get width of boxes
    var dim = $('.box').css('width');

    // apply height, line height and font-size to all boxes
    $('.box').css('height', dim);
    $('.box').css('line-height', dim);
    $('.box').css('font-size', dim / 3);
  }

  function light_boxes() {
    $('.open').lightBox();
  }

  var start = function() {
    init_boxes();
    square_boxes();
    light_boxes();
  }

  return {
    go: function() {
      $(document).ready(start);
    }
  }

})().go()

