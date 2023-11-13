chrome.devtools.panels.create(
    "\uD83D\uDC8E Editable Tree",                // Title of the panel
    "images/panel-icon.png",        // Path to the icon
    "panel.html",                   // HTML page for the body of the panel
    function(panel) {
        // Panel created
        panel.onShown.addListener(function(window) {
            // Code to execute when the panel is shown
            console.log("Custom panel was shown.");
        });
        panel.onHidden.addListener(function() {
            // Code to execute when the panel is hidden
            console.log("Custom panel was hidden.");
        });
    });
