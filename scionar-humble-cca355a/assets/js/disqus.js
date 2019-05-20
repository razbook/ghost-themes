(function() {
  if (USE_DISQUS) {
    var d = document, s = d.createElement('script');
    s.src = 'https://' + DISQUS_SHORTNAME + '.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
  } else {
    // Remove Disqus HTML block.
    var disqusBlock =  document.getElementById('disqus-block');
    if (disqusBlock !== null) disqusBlock.parentNode.removeChild(disqusBlock);
  }
})();
