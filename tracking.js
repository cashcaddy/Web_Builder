(function() {
  const SITE_ID = window.SITE_ID || "default";
  const STORAGE_KEY = `analytics_${SITE_ID}`;

  function saveEvent(event) {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    data.push(event);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function trackPageview() {
    saveEvent({
      type: "pageview",
      url: location.pathname,
      ref: document.referrer || "Direct",
      ts: Date.now()
    });
  }

  // Track automatically on load
  window.addEventListener("load", trackPageview);

  // Expose API for custom events
  window.myAnalytics = {
    track: function(name) {
      saveEvent({
        type: "event",
        name: name,
        url: location.pathname,
        ts: Date.now()
      });
    },
    getData: function() {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    },
    clearData: function() {
      localStorage.removeItem(STORAGE_KEY);
    }
  };
})();
