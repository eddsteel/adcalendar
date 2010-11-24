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

  function square_boxes(){
    // get width of boxes
    var dim = $('.box').css('width');

    // apply height, line height and font-size to all boxes
    $('.box').css('height', dim);
    $('.box').css('line-height', dim);
    $('.box').css('font-size', dim / 3);
  }

  var start = function() {
    preopen_closed();
    square_boxes();
    $('.closed').click(click_open);
  }

  return {
    go: function() {
      $(document).ready(start);
    }
  }

})().go()

