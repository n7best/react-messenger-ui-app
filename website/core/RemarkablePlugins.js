'use strict';

const hljs = require('highlight.js');
const escapeHtml = require('remarkable').utils.escapeHtml;

// Remove leading "SnackPlayer", "ReactNativeWebPlayer"
function cleanParams(params) {
  if (params && params.split(' ').length > 0) {
    return params.split(' ')[1];
  }

  return null;
}

function parseParams(paramString) {
  var params = {};

  if (paramString) {
    var pairs = paramString.split('&');
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split('=');
      params[pair[0]] = pair[1];
    }
  }

  return params;
}

function htmlForCodeBlock(code) {
  return (
    '<pre><code class="hljs css javascript">' +
    hljs.highlight('javascript', code).value +
    '</code></pre>'
  );
}


function BotWebPlayer(md) {
  md.renderer.rules.fence_custom.BotWebPlayer = function(
    tokens,
    idx,
    options,
    env,
    self
  ) {
    const WEB_PLAYER_VERSION = '0.0.1';

    let sampleCode = tokens[idx].content;
    let hash = `#code=${encodeURIComponent(sampleCode)}`;

    let paramsString = cleanParams(tokens[idx].params);
    if (paramsString) {
      hash += `&${paramsString}`;
    }
    let params = parseParams(paramsString);

    return (
      '<div class="web-player">' +
      htmlForCodeBlock(sampleCode) +
      `<iframe style="margin-top: 4" width="880" height="${
        parseParams(paramsString).platform === 'android' ? '625' : '620'
      }" src="/webplayer.html${hash}" frame-border="0"></iframe>` +
      `</div>` +
      '\n\n'
    );
  };
}

module.exports = { BotWebPlayer };