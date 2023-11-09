function createCustomAlert(rule) {

    var path = `createElement("path", { 
        "stroke-linecap": "round", 
        "stroke-linejoin": "round", 
        "stroke-width": "2", 
        d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
      })`;
    
      var svg = `createElement("svg", { 
        xmlns: "http://www.w3.org/2000/svg", 
        fill: "none", 
        viewBox: "0 0 24 24", 
        className: "stroke-info shrink-0 w-6 h-6" 
      }, ${path})`;
    
      var span = `createElement("span", {}, "${escapeStringForJs(rule.TITLE)}")`;
    
    return `createElement("div", { class: "alert" }, ${svg}, ${span})`;
}

WD.createCustomAlert = createCustomAlert;