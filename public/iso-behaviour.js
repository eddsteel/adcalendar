// inspiration and all real work from
// http://jsfiddle.net/desandro/DJVX2/2/
// - thanks!

$(function(){
  
  var $container = $('#container');
  
  $container.isotope({
    itemSelector: '.item',
    masonry: {
      columnWidth: 60
    }
  })
  
  $('.item').click(function(){
    var $this = $(this),
        tileStyle = $this.hasClass('big') ? { width: 100, height: 100} : { width: 340, height: 220};
    $this.toggleClass('big');
    
    $this.find('.item-content').stop().animate( tileStyle );

    $container.isotope( 'reLayout' )
    
  });

});
