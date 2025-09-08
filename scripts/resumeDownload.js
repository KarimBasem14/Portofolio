// Ensures clicking the Resume link downloads the file instead of navigating/opening inline
(function(){
  var link = document.getElementById('download-resume');
  if(!link) return;

  link.addEventListener('click', function(e){
    // If the browser respects download attribute, let it happen
    // Safari/iOS or some setups may ignore it for PDFs
    // We'll fetch and force a Blob download to guarantee saving
    var href = link.getAttribute('href');
    // If same-origin and modern browser, we can force download
    if (href && href.indexOf('http') !== 0) {
      e.preventDefault();
      fetch(href)
        .then(function(res){ return res.blob(); })
        .then(function(blob){
          var url = window.URL.createObjectURL(blob);
          var a = document.createElement('a');
          a.href = url;
          a.download = link.getAttribute('download') || 'resume.pdf';
          document.body.appendChild(a);
          a.click();
          a.remove();
          setTimeout(function(){ window.URL.revokeObjectURL(url); }, 1000);
        })
        .catch(function(){
          // Fallback: open in same tab as last resort
          window.location.href = href;
        });
    }
  }, false);
})();
