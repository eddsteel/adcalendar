(function(){
  var cheat;

  /*
   * Open a JQuery'ed box
   */
  var click_open = function(ev) {
    var clickedBox = ev.currentTarget;
    open(clickedBox, $(clickedBox).text().trim());
    light_boxes();
    return false;
  }

  function open(box, text) {
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
			else if (today == text || cheat)
			{
				$(boxes[b]).click(click_open);
			}
    });
  }

  function square_boxes(){
    // get width of boxes
    var dim = $('.box').width();

    // apply height, line height and font-size to all boxes
    $('.box').height(dim);
    $('.box').css('line-height', dim + "px");
    $('.box').css('font-size', dim / 3 + "px");
  }

  function light_boxes() {
    $('.open').lightBox();
  }

  var start = function() {
    cheat = $('body.cheat').size() > 0;
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

