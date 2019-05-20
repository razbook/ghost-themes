/*!
 * FitText.js 1.2
 *
 * Copyright 2011, Dave Rupert http://daverupert.com
 * Released under the WTFPL license
 * http://sam.zoy.org/wtfpl/
 *
 * Date: Thu May 05 14:23:00 2011 -0600
 */
!(function(t) {
  t.fn.fitText = function(n, i) {
    var e = n || 1,
      o = t.extend(
        {
          minFontSize: Number.NEGATIVE_INFINITY,
          maxFontSize: Number.POSITIVE_INFINITY,
        },
        i,
      )
    return this.each(function() {
      var n = t(this),
        i = function() {
          n.css(
            'font-size',
            Math.max(
              Math.min(n.width() / (10 * e), parseFloat(o.maxFontSize)),
              parseFloat(o.minFontSize),
            ),
          )
        }
      i(), t(window).on('resize.fittext orientationchange.fittext', i)
    })
  }
})(jQuery)

/*!
 * FitVids 1.1
 *
 * Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
 * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
 * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
 *
 */
!(function(t) {
  'use strict'
  t.fn.fitVids = function(e) {
    var i = { customSelector: null, ignore: null }
    if (!document.getElementById('fit-vids-style')) {
      var r = document.head || document.getElementsByTagName('head')[0],
        a =
          '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}',
        d = document.createElement('div')
      ;(d.innerHTML = '<p>x</p><style id="fit-vids-style">' + a + '</style>'),
        r.appendChild(d.childNodes[1])
    }
    return (
      e && t.extend(i, e),
      this.each(function() {
        var e = [
          'iframe[src*="player.vimeo.com"]',
          'iframe[src*="player.youku.com"]',
          'iframe[src*="youku.com"]',
          'iframe[src*="youtube.com"]',
          'iframe[src*="youtube-nocookie.com"]',
          'iframe[src*="kickstarter.com"][src*="video.html"]',
          'object',
          'embed',
        ]
        i.customSelector && e.push(i.customSelector)
        var r = '.fitvidsignore'
        i.ignore && (r = r + ', ' + i.ignore)
        var a = t(this).find(e.join(','))
        ;(a = a.not('object object')),
          (a = a.not(r)),
          a.each(function(e) {
            var i = t(this)
            if (
              !(
                i.parents(r).length > 0 ||
                ('embed' === this.tagName.toLowerCase() &&
                  i.parent('object').length) ||
                i.parent('.fluid-width-video-wrapper').length
              )
            ) {
              i.css('height') ||
                i.css('width') ||
                (!isNaN(i.attr('height')) && !isNaN(i.attr('width'))) ||
                (i.attr('height', 9), i.attr('width', 16))
              var a =
                  'object' === this.tagName.toLowerCase() ||
                  (i.attr('height') && !isNaN(parseInt(i.attr('height'), 10)))
                    ? parseInt(i.attr('height'), 10)
                    : i.height(),
                d = isNaN(parseInt(i.attr('width'), 10))
                  ? i.width()
                  : parseInt(i.attr('width'), 10),
                o = a / d
              if (!i.attr('id')) {
                var h = 'fitvid' + e
                i.attr('id', h)
              }
              i
                .wrap('<div class="fluid-width-video-wrapper"></div>')
                .parent('.fluid-width-video-wrapper')
                .css('padding-top', 100 * o + '%'),
                i.removeAttr('height').removeAttr('width')
            }
          })
      })
    )
  }
})(window.jQuery || window.Zepto)

newFunction()

function newFunction() {
  /*!
   * Pharos 1.0.2
   */
  ;(function($) {
    'use strict'
    // $(".cover-headline").fitText(0.85);
    $('article').fitVids()
    $(document).ready(function() {
      $('.preload').addClass('fade')
    })
    $('.toggle-navigation').on('click', function() {
      $('body').toggleClass('open-navigation')
    })
    $('.toggle-comments').on('click', function(e) {
      isInChina(function(inChina) {
        if(inChina) {
          alert('请使用科学上网法进行评论 ^_^!')
          return false
        }
        $('body').toggleClass('open-comments')
      })
    })
    $('.cover, .content').on('click', function() {
      $('body').removeClass('open-navigation')
    })

    function isInChina(cb) {
      var url = '//graph.facebook.com/feed?callback=h'
      var xhr = new XMLHttpRequest()
      var called = false
      xhr.open('GET', url)
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          called = true
          cb(false)
        }
      }
      xhr.send()
      // timeout 1s, this facebook API is very fast.
      setTimeout(function() {
        if (!called) {
          xhr.abort()
          cb(true)
        }
      }, 1000)
    }
  })(jQuery)
}
