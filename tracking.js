(function(){
  function saveEvent(event) {
    const data = JSON.parse(localStorage.getItem("analytics")) || [];
    data.push(event);
    localStorage.setItem("analytics", JSON.stringify(data));
  }

  function trackPageview() {
    saveEvent({
      type: "pageview",
      url: location.pathname,       // save page path only
      ref: document.referrer || "Direct",
      ts: Date.now()
    });
  }

  // track automatically on load
  trackPageview();

  // expose API for custom events
  window.myAnalytics = {
    track: function(name) {
      saveEvent({
        type: "event",
        name: name,
        url: location.pathname,
        ts: Date.now()
      });
    }
  };
})();
