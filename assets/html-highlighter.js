// Minimal HTML syntax highlighter for <code class="language-html"> blocks
(function() {
  function escapeHtml(html) {
    return html.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;');
  }

  function highlightHtml(code) {
    // Highlight tags
    code = code.replace(/(&lt;\/?)([a-zA-Z0-9-]+)(.*?)(\/?&gt;)/g, function(match, open, tag, attrs, close) {
      return '<span class="hl-tag">' + open + '</span>' +
             '<span class="hl-tagname">' + tag + '</span>' +
             highlightAttrs(attrs) +
             '<span class="hl-tag">' + close + '</span>';
    });
    return code;
  }

  function highlightAttrs(attrs) {
    // Highlight attributes and values
    return attrs.replace(/([a-zA-Z-:]+)(\s*=\s*)?("[^"]*"|'[^']*')?/g, function(match, name, eq, value) {
      let out = '';
      if (name) out += '<span class="hl-attr">' + name + '</span>';
      if (eq) out += '<span class="hl-eq">=</span>';
      if (value) out += '<span class="hl-value">' + value + '</span>';
      return out;
    });
  }

  function applyHighlighting() {
    document.querySelectorAll('code.language-html').forEach(function(block) {
      let html = escapeHtml(block.textContent);
      html = highlightHtml(html);
      block.innerHTML = html;
    });
  }

  // Add styles
  var style = document.createElement('style');
  style.innerHTML = `
    /* Light theme (default) */
    body:not(.theme-dark) .hl-tag { color: #d73a49; }
    body:not(.theme-dark) .hl-tagname { color: #22863a; font-weight: bold; }
    body:not(.theme-dark) .hl-attr { color: #6f42c1; }
    body:not(.theme-dark) .hl-eq { color: #333; }
    body:not(.theme-dark) .hl-value { color: #032f62; }
    /* Dark theme */
    body.theme-dark .hl-tag { color: #ff7b72; }
    body.theme-dark .hl-tagname { color: #79c0ff; font-weight: bold; }
    body.theme-dark .hl-attr { color: #d2a8ff; }
    body.theme-dark .hl-eq { color: #c9d1d9; }
    body.theme-dark .hl-value { color: #a5d6ff; }
  `;
  document.head.appendChild(style);

  // Run after DOM is loaded
  if (document.readyState !== 'loading') applyHighlighting();
  else document.addEventListener('DOMContentLoaded', applyHighlighting);
})();
