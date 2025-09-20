(function(){
  const STORAGE_KEY = "__mini_analytics__";

  function saveEvent(event) {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    data.push(event);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function trackPageview() {
    const siteId = window.SITE_ID || "default";
    saveEvent({
      type: "pageview",
      url: location.pathname,
      ref: document.referrer || "Direct",
      site: siteId,
      ts: Date.now()
    });
  }

  // Auto-track pageviews
  trackPageview();

  // Auto-track clicks on elements with data-event
  document.addEventListener("click", e => {
    const el = e.target.closest("[data-event]");
    if(el){
      const siteId = window.SITE_ID || "default";
      const name = el.getAttribute("data-event");
      saveEvent({ type: "event", name, url: location.pathname, site: siteId, ts: Date.now() });
    }
  });

  // Global API
  window.myAnalytics = {
    track: function(name){
      const siteId = window.SITE_ID || "default";
      saveEvent({ type:"event", name, url: location.pathname, site: siteId, ts: Date.now() });
    },
    getData: function(){ return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; },
    clearData: function(){ localStorage.removeItem(STORAGE_KEY); }
  };
})();
