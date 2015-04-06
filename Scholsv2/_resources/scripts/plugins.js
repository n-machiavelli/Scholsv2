// usage: log('inside coolFunc', this, arguments);
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console) {
      arguments.callee = arguments.callee.caller;
      console.log( Array.prototype.slice.call(arguments) );
  }
};
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();)b[a]=b[a]||c})(window.console=window.console||{});

//jQuery Plugins
(function( $ ){
  
  //randomImage
  var rndImgConfig = {
    path:'//iguides.illinoisstate.edu/footer/',
    images:[{img:'footerReggieGrey.png',alt:'Grey Reggie'}]
  };
  $.fn.rndImg = function( options ) {
      return this.each(function(){
        var opts =  $.extend(rndImgConfig,options);
        $this = $(this);

        var path=opts.path;
        var images=opts.images;
        
        var rnd = Math.floor(Math.random()*images.length);
        var alt=(images[rnd].alt) ? images[rnd].alt : images[rnd].img;
        if($this[0].tagName=='IMG') {
          $this.attr( {
                  src: path+images[rnd].img,
                  alt: alt
          });
        }
        else {
          $this.css('background-image','url('+path+images[rnd].img+')').text(alt);
        }
      });
  };
  
  //random Quote
  $.fn.rndQuote = function (options) {
      var defaults = {
        elem:'p',
        shuffle:false,
        interval:10000
      }
      var opts = $.extend(defaults,options);
      return this.each(function(){
        var items = $(this).find(opts.elem);
        items.sort(function() { return (Math.round(Math.random())-0.5); });
        $(items).hide();
        $(items[0]).show();
        if (opts.shuffle) {
          setInterval(function(){$.fn.rndQuote.shuffle(items)},opts.interval)
        }
      });
  };
  $.fn.rndQuote.shuffle = function (items) {
    $(items).parent().css('position','relative');
    $(items).each(function(key) {
      if($(this).is(':visible')){
        var adjKey = key+1 < items.length ? key+1 : 0;
        $(this).fadeOut(400, function() {
          $(items[adjKey]).fadeIn();
        });
        return false;
      }
      return true;
    });
  };
  
  //Search Box
  $.fn.searchBox = function (options) {
    var t, field, bg, btn, defaults, opts;
    t = document.createElement('textarea');
    t = (t.placeholder !== undefined);
    
    defaults = {
      placeholder: t,
      fieldID : '#searchboxtext',
      bgID : '#searchbackground',
      btnID : '#searchbutton',
      textClass : 'searchboxtext_text',
      textActiveClass : 'searchboxtext_active',
      textInactiveClass : 'searchboxtext_inactive',
      bgActiveClass : 'searchbackground_active',
      bgInactiveClass : 'searchbackground_inactive',
      btnImg : '/structure/search/button_search.png',
      btnImgHover : '/structure/search/button_search_hover.png'
    }
    opts = $.extend(defaults,options);
    
    field = this.find(opts.fieldID);
    bg = this.find(opts.bgID);
    btn = this.find(opts.btnID);
    
    opts.placeholderText = $(field).attr('placeholder');
    
    return this.each(function(){
      var ph, phText;
      ph = opts.placeholder;
      phText = opts.placeholderText;
      if (ph===false) {
	$(field).val(phText);
      }
      $(field).focus(
	function () {
	  $(bg).removeClass().addClass(opts.bgActiveClass);
	  var $this = $(this);
	  var val = $this.val();
	  if(val=='' || val===phText ) {
	    $this.removeClass().addClass(opts.textActiveClass);
	    if(ph===false) {
	      $(this).val('');
	    }
	  };
	  
	}
      ).blur(
	function () {
	  $(bg).removeClass().addClass(opts.bgInactiveClass);
	  var $this = $(this);
	  if($this.val()=='') {
	    $this.removeClass().addClass(opts.textInactiveClass);
	    if(ph===false) {
	      $this.val(phText);
	    }
	  }
	  else {
	    $this.removeClass().addClass(opts.textClass);
	  }
	}
      )
      $(this).submit(function () {
	var val = $(field).val();
	return(val!==phText && val!=='');
      });
    });
  };
})( jQuery );

/*global jQuery */
/*jshint browser:true */
/*!
* FitVids 1.1
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
*/

(function( $ ){

  "use strict";

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null,
      ignore: null
    };

    if(!document.getElementById('fit-vids-style')) {
      // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
      var head = document.head || document.getElementsByTagName('head')[0];
      var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
      var div = document.createElement('div');
      div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
      head.appendChild(div.childNodes[1]);
    }

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        "iframe[src*='player.vimeo.com']",
        "iframe[src*='youtube.com']",
        "iframe[src*='youtube-nocookie.com']",
        "iframe[src*='kickstarter.com'][src*='video.html']",
        "object",
        "embed"
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var ignoreList = '.fitvidsignore';

      if(settings.ignore) {
        ignoreList = ignoreList + ', ' + settings.ignore;
      }

      var $allVideos = $(this).find(selectors.join(','));
      $allVideos = $allVideos.not("object object"); // SwfObj conflict patch
      $allVideos = $allVideos.not(ignoreList); // Disable FitVids on this video.

      $allVideos.each(function(){
        var $this = $(this);
        if($this.parents(ignoreList).length > 0) {
          return; // Disable FitVids on this video.
        }
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        if ((!$this.css('height') && !$this.css('width')) && (isNaN($this.attr('height')) || isNaN($this.attr('width'))))
        {
          $this.attr('height', 9);
          $this.attr('width', 16);
        }
        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('id')){
          var videoID = 'fitvid' + Math.floor(Math.random()*999999);
          $this.attr('id', videoID);
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };
// Works with either jQuery or Zepto
})( window.jQuery || window.Zepto );
