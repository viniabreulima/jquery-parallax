function parallaxUpdate(evt, obj){
    var vw = $(window).width();
    var vh = $(window).height();
    var st = $(window).scrollTop();
    var sl = $(window).scrollLeft();
    var pos = $(obj).offset();
    var ot = pos.top;
    var ol = pos.left;
    var ow = $(obj).innerWidth();
    var oh = $(obj).innerHeight();

    // Check if element is in viewport
    if(st + vh < ot) return;
    if(st > ot + oh) return;

    var parallax_ratio = parseFloat($(obj).attr('data-parallax-ratio'));
    var iw = parseInt($(obj).attr('data-parallax-img-width'));
    var ih = parseInt($(obj).attr('data-parallax-img-height'));

    // Calculate image size
    var img_wh = (iw / ih > 0);
    var ratio = (img_wh) ? (iw / ow) : (ih / oh);
    var fw = iw / ratio;
    var fh = ih / ratio;
    var fsize = fw + 'px ' + fh + 'px';

    // Calculate scroll delta
    var t = Math.abs((ot - vh - st));
    var m = vh + oh;
    var d = t / m;

    // Calculate image position
    var px = 0; // Vertical position only
    var py = 0;
    py = ((fh - oh) * d) * -1;
    var fpos = px + 'px ' + py + 'px';

    // Settings properties
    $(obj).css({
        'background-size': fsize,
        'background-position': fpos
    });
}
function parallaxUpdateAll(evt, cls){
    $(cls).each(function(idx, obj){
        parallaxUpdate(null, obj);
    });
}
function parallaxInit(cls){
    $(cls).each(function(idx, obj){
        var url = $(obj).attr('data-parallax-img');
        $(obj).css({
            'background-image': 'url(' + url + ')',
            'background-repeat': 'repeat'
        });
        parallaxUpdate(null, obj);
    });
    $(cls).on('resize', parallaxUpdate);
    $(window).on('scroll', function(evt){ parallaxUpdateAll(evt, cls); });
    $(window).on('resize', function(evt){ parallaxUpdateAll(evt, cls); });
}
