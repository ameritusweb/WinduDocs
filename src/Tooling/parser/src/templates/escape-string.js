function escapeStringForJs(str) {
    // Implement the necessary escapes for a JavaScript string
    return str.replace(/\\/g, '\\\\')
              .replace(/"/g, '\\"')
              .replace(/\n/g, '\\n')
              .replace(/\r/g, '\\r')
              .replace(/\t/g, '\\t');
}

WD.escapeStringForJs = escapeStringForJs;