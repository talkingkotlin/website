/**
 * @constructor
 * @param params
 * @param {Object} params
 * @param {String} params.id
 * @param {Banner.TYPE} params.type
 * @param {HTMLElement|jQuery|String} [params.mountNode] Banner will render at this node
 * @param {String} [params.url]
 * @param {String} [params.imageUrl]
 * @param {Number} [params.width]
 * @param {Number} [params.height]
 * @param {String} [params.template]
 * @param {String} [params.target] `_self` or `_blank`
 * @param {Object} [params.linkCss] CSS props hash for jQuery.css
 * @param {Object} [params.closeButtonCss] CSS props hash for jQuery.css
 * @param {Function} [params.onCreate] Called when banner is created
 * @param {Function} [params.onClick] Called when user clicks on banner
 */
function Banner(params) {
  if (!params.id || !params.type)
    throw new Error('Banner `id` and `type` sould be provided');

  if (!(params.type in Banner.TYPE))
    throw new Error('Unsupported banner type `' + params.type + '`');

  var mountNode = ('mountNode' in params) ? params.mountNode : Banner.defaults[params.type].mountNode;
  if (!mountNode) throw new Error('You must provide mount node for `' + params.id + '` banner');
  mountNode = (typeof mountNode === 'string') ? document.getElementById(mountNode) : mountNode;
  if (!mountNode) throw new Error('Mount node for `' + params.id + '` doesnt exist');
  this.mountNode = mountNode;

  this.id = params.id;
  this.type = params.type;
  this.url = 'url' in params ? params.url : null;
  this.imageUrl = 'imageUrl' in params ? params.imageUrl : null;
  this.width = 'width' in params ? params.width : Banner.defaults[params.type].width;
  this.height = 'height' in params ? params.height : Banner.defaults[params.type].height;
  this.template = 'template' in params ? params.template : null;
  this.target = 'target' in params ? params.target : '_self';
  this.linkCss = 'linkCss' in params ? params.linkCss : null;
  this.closeButtonCss = 'closeButtonCss' in params ? params.closeButtonCss : null;

  this.onCreate = ('onCreate' in params && typeof params.onCreate === 'function') ? params.onCreate : null;
  this.onClick = ('onClick' in params && typeof params.onClick === 'function') ? params.onClick : null;
}

/**
 * @const
 */
Banner.TYPE = {
  slideup: 'slideup',
  inplace: 'inplace'
};

/**
 * @const
 */
Banner.defaults = {
  slideup: {
    width: 622,
    height: 90,
    mountNode: $('body')
  },
  inplace: {
    width: 'auto',
    height: 'auto',
    mountNode: null
  }
};

/**
 * @static
 */
Banner.getCookieNameFor = function (id) {
  return 'banner_' + id;
};

/**
 * @type {Array<jQuery>}
 */
Banner.prototype.nodes = null;

/**
 * @return {Array<jQuery>}
 */
Banner.prototype._createNodes = function () {
  var banner = this,
    nodes;

  var nodesClasses = {
    container: [
      'jb-promotion',
      'jb-' + banner.type + '-promotion',
      'id_' + banner.id,
      banner.type === Banner.TYPE.slideup ? 'is_hidden' : ''
    ],
    body: [
      'jb-promotion__body',
      'jb-' + banner.type + '-promotion__body'
    ],
    closeButton: [
      'jb-promotion__close-button',
      'jb-' + banner.type + '-promotion__close-button'
    ],
    link: [
      'jb-promotion__link',
      'jb-' + banner.type + '-promotion__link'
    ]
  };

  nodes = {
    container: $('<div class="' + nodesClasses.container.join(' ') + '"></div>'),
    body: $('<div class="' + nodesClasses.body.join(' ') + '"></div>'),
    link: banner.url ? $('<a href="' + banner.url + '" class="' + nodesClasses.link.join(' ') + '" target="' + banner.target + '"></a>') : '',
    closeButton: $('<div class="' + nodesClasses.closeButton.join(' ') + '" title="Close"></div>')
  };

  nodes.body.css({
    width: banner.width,
    height: banner.height,
    backgroundImage: banner.imageUrl ? 'url("' + banner.imageUrl + '")' : 'none'
  });

  if (banner.url && banner.linkCss) nodes.link.css(banner.linkCss);
  if (banner.closeButtonCss) nodes.closeButton.css(banner.closeButtonCss);
  if (banner.template) nodes.body.html(banner.template);

  return nodes;
};

Banner.prototype.render = function () {
  var banner = this,
    mountNode = this.mountNode,
    nodes;

  nodes = this.nodes = this._createNodes();

  nodes.body
    .append(nodes.link)
    .append(nodes.closeButton);

  nodes.container
    .append(nodes.body)
    .appendTo(mountNode);

  nodes.closeButton.on('click', banner.closeHandler.bind(banner));
  if (banner.url) {
    nodes.link.on('click', function () {
      if (banner.onClick) banner.onClick.call(banner);
      banner.closeHandler.call(banner);
    });
  }

  if (banner.type === Banner.TYPE.slideup)
    setTimeout(banner.show.bind(banner), 300);

  if (banner.onCreate) banner.onCreate.call(banner);
};

Banner.prototype.closeHandler = function () {
  var cookieName = this.getCookieName();
  setCookie(cookieName, '0', 365, '/');
  this.hide();
};

Banner.prototype.show = function () {
  this.nodes.container.removeClass('is_hidden');
};

Banner.prototype.hide = function () {
  this.nodes.container.addClass('is_hidden');
};

Banner.prototype.getCookieName = function () {
  return Banner.getCookieNameFor(this.id);
};

Banner.prototype.destroy = function () {
  var banner = this,
    nodes = this.nodes;

  nodes.closeButton.off('click', banner.closeHandler);
  if (banner.url && banner.onClick) nodes.link.off('click', banner.onClick);
  nodes.container.remove();
};

function setCookie(name, value, lifespan, access_path) {
  var cookietext = name + "=" + escape(value);
  if (lifespan != null) {
    var today = new Date();
    var expiredate = new Date();
    expiredate.setTime(today.getTime() + 1000 * 60 * 60 * 24 * lifespan);
    cookietext += "; expires=" + expiredate.toGMTString();
  }
  if (access_path != null) {
    cookietext += "; PATH=" + access_path;
  }
  document.cookie = cookietext;
  return null;
}


function getCookie(Name) {
  var search = Name + "=";
  var CookieString = document.cookie;
  var result = null;
  if (CookieString.length > 0) {
    var offset = CookieString.indexOf(search);
    if (offset != -1) {
      offset += search.length;
      var end = CookieString.indexOf(";", offset);
      if (end == -1) {
        end = CookieString.length;
      }
      result = unescape(CookieString.substring(offset, end));
    }
  }
  return result;
}


var bannersRotator = {};

bannersRotator.instances = [];

bannersRotator.createBanner = function (params) {
  if (this.isBannerShouldBeShown(params.id)) {
    try {
      var banner = new Banner(params);
      banner.render();
      this.instances.push(banner);
    } catch (e) {
    }
  }
};

bannersRotator.isBannerShouldBeShown = function (id) {
  var cookieName = Banner.getCookieNameFor(id);
  var cookieValue = getCookie(cookieName);
  return cookieValue === null || cookieValue !== '0';
};


window.bannersRotator = bannersRotator;
window.bannersRotator.Banner = Banner;

$(document).ready(function () {
  var isWebkit = !!~navigator.userAgent.indexOf(' AppleWebKit/');

  $.fn.console = function (config) {
    ////////////////////////////////////////////////////////////////////////
    // Constants
    // Some are enums, data types, others just for optimisation
    var keyCodes = {
      // left
      37: moveBackward,
      // right
      39: moveForward,
      // up
      38: previousHistory,
      // down
      40: nextHistory,
      // backspace
      8: backDelete,
      // delete
      46: forwardDelete,
      // end
      35: moveToEnd,
      // start
      36: moveToStart,
      // return
      13: commandTrigger,
      // tab
      9: doComplete,
      // esc
      27: doClose
    };
    var ctrlCodes = {
      // C-a
      65: moveToStart,
      // C-e
      69: moveToEnd,
      // C-d
      68: forwardDelete,
      // C-n
      78: nextHistory,
      // C-p
      80: previousHistory,
      // C-b
      66: moveBackward,
      // C-f
      70: moveForward,
      // C-k
      75: deleteUntilEnd
    };
    if (config.ctrlCodes) {
      $.extend(ctrlCodes, config.ctrlCodes);
    }
    var altCodes = {
      // M-f
      70: moveToNextWord,
      // M-b
      66: moveToPreviousWord,
      // M-d
      68: deleteNextWord
    };
    var shiftCodes = {
      // return
      13: newLine
    };
    var cursor = '<span class="jquery-console-cursor">&nbsp;</span>';

    ////////////////////////////////////////////////////////////////////////
    // Globals
    var container = $(this);
    var inner = $('<div class="jquery-console-inner"></div>');
    var scrollArea = config.scrollArea || inner;
    // erjiang: changed this from a text input to a textarea so we
    // can get pasted newlines
    var typer = $('<textarea autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" class="jquery-console-typer"></textarea>');
    // Prompt
    var promptBox;
    var prompt;
    var continuedPromptLabel = config && config.continuedPromptLabel ?
      config.continuedPromptLabel : "> ";
    var column = 0;
    var promptText = '';
    var restoreText = '';
    var continuedText = '';
    var fadeOnReset = config.fadeOnReset !== undefined ? config.fadeOnReset : true;
    // Prompt history stack
    var history = [];
    var ringn = 0;
    // For reasons unknown to The Sword of Michael himself, Opera
    // triggers and sends a key character when you hit various
    // keys like PgUp, End, etc. So there is no way of knowing
    // when a user has typed '#' or End. My solution is in the
    // typer.keydown and typer.keypress functions; I use the
    // variable below to ignore the keypress event if the keydown
    // event succeeds.
    var cancelKeyPress = 0;
    // When this value is false, the prompt will not respond to input
    var acceptInput = true;

    // External exports object
    var extern = {};

    ////////////////////////////////////////////////////////////////////////
    // Main entry point
    (function () {
      extern.promptLabel = config && config.promptLabel ? config.promptLabel : "> ";
      container.append(inner);
      inner.append(typer);
      typer.css({position: 'absolute', top: 0, left: '-9999px'});
      if (config.welcomeMessage)
        message(config.welcomeMessage, 'jquery-console-welcome');
      newPromptBox();
      if (config.autofocus) {
        inner.addClass('jquery-console-focus');
        typer.focus();
        setTimeout(function () {
          inner.addClass('jquery-console-focus');
          typer.focus();
        }, 100);
      }
      extern.inner = inner;
      extern.typer = typer;
      extern.scrollToBottom = scrollToBottom;
      extern.report = report;
    })();

    ////////////////////////////////////////////////////////////////////////
    // Reset terminal
    extern.reset = function (callback) {
      var welcome = (typeof config.welcomeMessage != 'undefined');

      var removeElements = function () {
        inner.find('div').each(function () {
          if (!welcome) {
            $(this).remove();
          } else {
            welcome = false;
          }
        });
      };

      if (fadeOnReset) {
        inner.parent().fadeOut(function () {
          removeElements();
          newPromptBox();
          inner.parent().fadeIn(function () {
            focusConsole();

            if (typeof callback == 'function') {
              callback();
            }
          });
        });
      }
      else {
        removeElements();
        newPromptBox();
        focusConsole();
        if (typeof callback == 'function') {
          callback();
        }
      }
    };

    var focusConsole = function () {
      inner.addClass('jquery-console-focus');
      typer.focus();
    };

    extern.focus = function () {
      focusConsole();
    };

    ////////////////////////////////////////////////////////////////////////
    // Reset terminal
    extern.notice = function (msg, style) {
      var n = $('<div class="notice"></div>').append($('<div></div>').text(msg))
        .css({visibility: 'hidden'});
      container.append(n);
      var focused = true;
      if (style == 'fadeout')
        setTimeout(function () {
          n.fadeOut(function () {
            n.remove();
          });
        }, 4000);
      else if (style == 'prompt') {
        var a = $('<br/><div class="action"><a href="javascript:">OK</a><div class="clear"></div></div>');
        n.append(a);
        focused = false;
        a.on('click', function () {
          n.fadeOut(function () {
            n.remove();
            inner.css({opacity: 1})
          });
        });
      }
      var h = n.height();
      n.css({height: '0px', visibility: 'visible'})
        .animate({height: h + 'px'}, function () {
          if (!focused) inner.css({opacity: 0.5});
        });
      n.css('cursor', 'default');
      return n;
    };

    ////////////////////////////////////////////////////////////////////////
    // Make a new prompt box
    function newPromptBox() {
      column = 0;
      promptText = '';
      ringn = 0; // Reset the position of the history ring
      enableInput();
      promptBox = $('<div class="jquery-console-prompt-box"></div>');
      var label = $('<span class="jquery-console-prompt-label"></span>');
      var labelText = extern.continuedPrompt ? continuedPromptLabel : extern.promptLabel;
      promptBox.append(label.text(labelText).show());
      label.html(label.html().replace(' ', '&nbsp;'));
      prompt = $('<span class="jquery-console-prompt"></span>');
      promptBox.append(prompt);
      inner.append(promptBox);
      updatePromptDisplay();
    }

    ////////////////////////////////////////////////////////////////////////
    // Handle setting focus
    container.on('click', function (event) {
      var isLink = typeof event.target && event.target.href;

      if (!isLink) {
        // Don't mess with the focus if there is an active selection
        if (window.getSelection().toString()) {
          return false;
        }

        inner.addClass('jquery-console-focus');
        inner.removeClass('jquery-console-nofocus');
        if (isWebkit) {
          typer.focusWithoutScrolling();
        } else {
          typer.css('position', 'fixed').focus();
        }
        scrollToBottom();
        return false;
      }
    });

    ////////////////////////////////////////////////////////////////////////
    // Handle losing focus
    typer.on('blur', function () {
      inner.removeClass('jquery-console-focus');
      inner.addClass('jquery-console-nofocus');
    });

    ////////////////////////////////////////////////////////////////////////
    // Bind to the paste event of the input box so we know when we
    // get pasted data
    typer.on('paste', function (e) {
      // wipe typer input clean just in case
      typer.val("");
      // this timeout is required because the onpaste event is
      // fired *before* the text is actually pasted
      setTimeout(function () {
        typer.consoleInsert(typer.val());
        typer.val("");
      }, 0);
    });

    ////////////////////////////////////////////////////////////////////////
    // Handle key hit before translation
    // For picking up control characters like up/left/down/right

    typer.on('keydown', function (e) {
      cancelKeyPress = 0;
      var keyCode = e.keyCode;
      // C-c: cancel the execution
      if (e.ctrlKey && keyCode == 67) {
        cancelKeyPress = keyCode;
        cancelExecution();
        return false;
      }
      if (acceptInput) {
        if (e.shiftKey && keyCode in shiftCodes) {
          cancelKeyPress = keyCode;
          (shiftCodes[keyCode])();
          return false;
        } else if (e.altKey && keyCode in altCodes) {
          cancelKeyPress = keyCode;
          (altCodes[keyCode])();
          return false;
        } else if (e.ctrlKey && keyCode in ctrlCodes) {
          cancelKeyPress = keyCode;
          (ctrlCodes[keyCode])();
          return false;
        } else if (keyCode in keyCodes) {
          cancelKeyPress = keyCode;
          (keyCodes[keyCode])();
          return false;
        }
      }
    });

    ////////////////////////////////////////////////////////////////////////
    // Handle key press
    typer.on('keypress', function (e) {
      var keyCode = e.keyCode || e.which;
      if (isIgnorableKey(e)) {
        return false;
      }
      // C-v: don't insert on paste event
      if ((e.ctrlKey || e.metaKey) && String.fromCharCode(keyCode).toLowerCase() == 'v') {
        return true;
      }
      if (acceptInput && cancelKeyPress != keyCode && keyCode >= 32) {
        if (cancelKeyPress) return false;
        if (
          typeof config.charInsertTrigger == 'undefined' || (
            typeof config.charInsertTrigger == 'function' &&
            config.charInsertTrigger(keyCode, promptText)
          )
        ) {
          typer.consoleInsert(keyCode);
        }
      }
      if (isWebkit) return false;
    });

    function isIgnorableKey(e) {
      // for now just filter alt+tab that we receive on some platforms when
      // user switches windows (goes away from the browser)
      return ((e.keyCode == keyCodes.tab || e.keyCode == 192) && e.altKey);
    }

    ////////////////////////////////////////////////////////////////////////
    // Rotate through the command history
    function rotateHistory(n) {
      if (history.length == 0) return;
      ringn += n;
      if (ringn < 0) ringn = history.length;
      else if (ringn > history.length) ringn = 0;
      var prevText = promptText;
      if (ringn == 0) {
        promptText = restoreText;
      } else {
        promptText = history[ringn - 1];
      }
      if (config.historyPreserveColumn) {
        if (promptText.length < column + 1) {
          column = promptText.length;
        } else if (column == 0) {
          column = promptText.length;
        }
      } else {
        column = promptText.length;
      }
      updatePromptDisplay();
    }

    function previousHistory() {
      rotateHistory(-1);
    }

    function nextHistory() {
      rotateHistory(1);
    }

    // Add something to the history ring
    function addToHistory(line) {
      history.push(line);
      restoreText = '';
    }

    // Delete the character at the current position
    function deleteCharAtPos() {
      if (column < promptText.length) {
        promptText =
          promptText.substring(0, column) +
          promptText.substring(column + 1);
        restoreText = promptText;
        return true;
      } else return false;
    }

    function backDelete() {
      if (moveColumn(-1)) {
        deleteCharAtPos();
        updatePromptDisplay();
      }
    }

    function forwardDelete() {
      if (deleteCharAtPos()) {
        updatePromptDisplay();
      }
    }

    function deleteUntilEnd() {
      while (deleteCharAtPos()) {
        updatePromptDisplay();
      }
    }

    function deleteNextWord() {
      // A word is defined within this context as a series of alphanumeric
      // characters.
      // Delete up to the next alphanumeric character
      while (
      column < promptText.length && !isCharAlphanumeric(promptText[column])
        ) {
        deleteCharAtPos();
        updatePromptDisplay();
      }
      // Then, delete until the next non-alphanumeric character
      while (
      column < promptText.length &&
      isCharAlphanumeric(promptText[column])
        ) {
        deleteCharAtPos();
        updatePromptDisplay();
      }
    }

    function newLine() {
      var lines = promptText.split("\n");
      var last_line = lines.slice(-1)[0];
      var spaces = last_line.match(/^(\s*)/g)[0];
      var new_line = "\n" + spaces;
      promptText += new_line;
      moveColumn(new_line.length);
      updatePromptDisplay();
    }

    ////////////////////////////////////////////////////////////////////////
    // Validate command and trigger it if valid, or show a validation error
    function commandTrigger() {
      var line = promptText;
      if (typeof config.commandValidate == 'function') {
        var ret = config.commandValidate(line);
        if (ret == true || ret == false) {
          if (ret) {
            handleCommand();
          }
        } else {
          commandResult(ret, "jquery-console-message-error");
        }
      } else {
        handleCommand();
      }
    }

    // Scroll to the bottom of the view
    function scrollToBottom() {
      scrollArea.prop({scrollTop: scrollArea.prop("scrollHeight")});
    }

    function cancelExecution() {
      if (typeof config.cancelHandle == 'function') {
        config.cancelHandle();
      }
    }

    ////////////////////////////////////////////////////////////////////////
    // Handle a command
    function handleCommand() {
      if (typeof config.commandHandle == 'function') {
        disableInput();
        addToHistory(promptText);
        var text = promptText;
        if (extern.continuedPrompt) {
          if (continuedText)
            continuedText += '\n' + promptText;
          else continuedText = promptText;
        } else continuedText = undefined;
        if (continuedText) text = continuedText;
        var ret = config.commandHandle(text, function (msgs) {
          commandResult(msgs);
        });
        if (extern.continuedPrompt && !continuedText)
          continuedText = promptText;
        if (typeof ret == 'boolean') {
          if (ret) {
            // Command succeeded without a result.
            commandResult();
          } else {
            commandResult(
              'Command failed.',
              "jquery-console-message-error"
            );
          }
        } else if (typeof ret == "string") {
          commandResult(ret, "jquery-console-message-success");
        } else if (typeof ret == 'object' && ret.length) {
          commandResult(ret);
        } else if (extern.continuedPrompt) {
          commandResult();
        }
      }
    }

    ////////////////////////////////////////////////////////////////////////
    // Disable input
    function disableInput() {
      acceptInput = false;
    }

    // Enable input
    function enableInput() {
      acceptInput = true;
    }

    ////////////////////////////////////////////////////////////////////////
    // Reset the prompt in invalid command
    function commandResult(msg, className) {
      column = -1;
      updatePromptDisplay();
      if (typeof msg == 'string') {
        message(msg, className);
      } else if ($.isArray(msg)) {
        for (var x in msg) {
          var ret = msg[x];
          message(ret.msg, ret.className);
        }
      } else { // Assume it's a DOM node or jQuery object.
        inner.append(msg);
      }
      newPromptBox();
    }

    ////////////////////////////////////////////////////////////////////////
    // Report some message into the console
    function report(msg, className) {
      var text = promptText;
      promptBox.remove();
      commandResult(msg, className);
      extern.promptText(text);
    }

    ////////////////////////////////////////////////////////////////////////
    // Display a message
    function message(msg, className) {
      var mesg = $('<div class="jquery-console-message"></div>');
      if (className) mesg.addClass(className);
      mesg.filledText(msg).hide();
      inner.append(mesg);
      mesg.show();
    }

    ////////////////////////////////////////////////////////////////////////
    // Handle normal character insertion
    // data can either be a number, which will be interpreted as the
    // numeric value of a single character, or a string
    typer.consoleInsert = function (data) {
      // TODO: remove redundant indirection
      var text = (typeof data == 'number') ? String.fromCharCode(data) : data;
      var before = promptText.substring(0, column);
      var after = promptText.substring(column);
      promptText = before + text + after;
      moveColumn(text.length);
      restoreText = promptText;
      updatePromptDisplay();
    };

    ////////////////////////////////////////////////////////////////////////
    // Move to another column relative to this one
    // Negative means go back, positive means go forward.
    function moveColumn(n) {
      if (column + n >= 0 && column + n <= promptText.length) {
        column += n;
        return true;
      } else return false;
    }

    function moveForward() {
      if (moveColumn(1)) {
        updatePromptDisplay();
        return true;
      }
      return false;
    }

    function moveBackward() {
      if (moveColumn(-1)) {
        updatePromptDisplay();
        return true;
      }
      return false;
    }

    function moveToStart() {
      if (moveColumn(-column))
        updatePromptDisplay();
    }

    function moveToEnd() {
      if (moveColumn(promptText.length - column))
        updatePromptDisplay();
    }

    function moveToNextWord() {
      while (
      column < promptText.length && !isCharAlphanumeric(promptText[column]) &&
      moveForward()
        ) {
      }
      while (
      column < promptText.length &&
      isCharAlphanumeric(promptText[column]) &&
      moveForward()
        ) {
      }
    }

    function moveToPreviousWord() {
      // Move backward until we find the first alphanumeric
      while (
      column - 1 >= 0 && !isCharAlphanumeric(promptText[column - 1]) &&
      moveBackward()
        ) {
      }
      // Move until we find the first non-alphanumeric
      while (
      column - 1 >= 0 &&
      isCharAlphanumeric(promptText[column - 1]) &&
      moveBackward()
        ) {
      }
    }

    function isCharAlphanumeric(charToTest) {
      if (typeof charToTest == 'string') {
        var code = charToTest.charCodeAt();
        return (code >= 'A'.charCodeAt() && code <= 'Z'.charCodeAt()) ||
          (code >= 'a'.charCodeAt() && code <= 'z'.charCodeAt()) ||
          (code >= '0'.charCodeAt() && code <= '9'.charCodeAt());
      }
      return false;
    }

    function doComplete() {
      if (typeof config.completeHandle == 'function') {
        var completions = config.completeHandle(promptText);
        var len = completions.length;
        if (len === 1) {
          extern.promptText(promptText + completions[0]);
        } else if (len > 1 && config.cols) {
          var prompt = promptText;
          // Compute the number of rows that will fit in the width
          var max = 0;
          for (var i = 0; i < len; i++) {
            max = Math.max(max, completions[i].length);
          }
          max += 2;
          var n = Math.floor(config.cols / max);
          var buffer = "";
          var col = 0;
          for (i = 0; i < len; i++) {
            var completion = completions[i];
            buffer += completions[i];
            for (var j = completion.length; j < max; j++) {
              buffer += " ";
            }
            if (++col >= n) {
              buffer += "\n";
              col = 0;
            }
          }
          commandResult(buffer, "jquery-console-message-value");
          extern.promptText(prompt);
        }
      }
    }

    function doClose() {
      if (typeof config.onEsc == 'function')
        config.onEsc();
    }

    extern.promptText = function (text) {
      if (typeof text === 'string') {
        promptText = text;
        column = promptText.length;
        updatePromptDisplay();
      }
      return promptText;
    };

    ////////////////////////////////////////////////////////////////////////
    // Update the prompt display
    function updatePromptDisplay() {
      var line = promptText;
      var html = '';
      if (column > 0 && line == '') {
        // When we have an empty line just display a cursor.
        html = cursor;
      } else if (column == promptText.length) {
        // We're at the end of the line, so we need to display
        // the text *and* cursor.
        html = htmlEncode(line) + cursor;
      } else {
        // Grab the current character, if there is one, and
        // make it the current cursor.
        var before = line.substring(0, column);
        var current = line.substring(column, column + 1);
        if (current) {
          current =
            '<span class="jquery-console-cursor">' +
            htmlEncode(current) +
            '</span>';
        }
        var after = line.substring(column + 1);
        html = htmlEncode(before) + current + htmlEncode(after);
      }
      prompt.html(html);
      scrollToBottom();
    }

    // Simple HTML encoding
    // Simply replace '<', '>' and '&'
    // TODO: Use jQuery's .html() trick, or grab a proper, fast
    // HTML encoder.
    function htmlEncode(text) {
      return (
        text.replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/</g, '&lt;')
          .replace(/ /g, '&nbsp;')
          .replace(/\n/g, '<br />')
      );
    }

    return extern;
  };
  // Simple utility for printing messages
  $.fn.filledText = function (txt) {
    var linkRegexp = /<a(?=[^>]*<)/,
      breakRegexp = /\n/g,
      text = txt.replace(linkRegexp, '<a>$&</a>').replace(breakRegexp, '<br/>');

    $(this).html(text);
    return this;
  };

  // Alternative method for focus without scrolling
  $.fn.focusWithoutScrolling = function () {
    var x = window.scrollX, y = window.scrollY;
    $(this).focus();
    window.scrollTo(x, y);
  };


  function initializeCookieBanner() {
    var template = '<div class="cookies-notify" id="cookies-terminal">\n    <p class="cookies-notify__paragraph">Cookies help us improve our web content and deliver personalised content. By using this web site, you agree to our use of cookies.</p>\n    <p class="cookies-notify__paragraph">Type `man cookies\' to <a href="//www.jetbrains.com/company/privacy.html#using-website" class="cookies-notify__link">learn more</a> or `exit\' to close.</p>\n    <div class="cookies-notify__content"></div>\n</div>'

    bannersRotator.createBanner({
      id: 'cookies',
      type: bannersRotator.Banner.TYPE.slideup,
      width: 'auto',
      height: '100%',
      template: template
    });

    $(document).ready(function () {
      var commands = {
        help: 'help',
        clear: 'clear',
        exit: 'exit',
        man: 'man cookies'
      };
      var helpMessage = "Type `" + commands.man + "' to learn more.\nUse `" + commands.exit + "' to close.";
      var errorMessage = "Command not found. Type `" + commands.help + "' to see all commands.";
      var $terminal = $('#cookies-terminal');

      var controller = $terminal.console({
        autofocus: false,
        scrollArea: $terminal,
        promptHistory: true,
        promptLabel: '~ root$ ',

        onEsc: function () {
          bannersRotator.instances[0].closeHandler.call(bannersRotator.instances[0]);
        },

        commandValidate: function (line) {
          return line != "";
        },

        commandHandle: function (line) {
          switch (line) {
            case (commands.man):
              this.expandFrame();
              return '\nA cookie is a small piece of data sent by a website to your browser. It helps the website to remember information about your visit, like your country and other settings. That can make your next visit easier and the site more useful to you.\n\nWe use cookies on some (but not all) pages to deliver personalized content or to tailor our information offerings or responses according to the way you use the site, and/or your current context on the site. We do not use cookies to gather or transmit any personally identifiable information about you.\n\nRead our <a href="//www.jetbrains.com/company/privacy.html" class="cookies-notify__link">privacy policy</a> for a detailed explanation on how we protect your privacy in our use of cookies and other information.\n \n';

            case (commands.help):
              return helpMessage;

            case (commands.clear):
              $terminal.css('height', '110');
              controller.reset();
              return '';

            case (commands.exit):
              this.onEsc();
              return line;

            default:
              return errorMessage;
          }
        },

        charInsertTrigger: function (keycode, line) {
          return (keycode < 48 || keycode > 57);
        },

        completeHandle: function (prefix) {
          var complete = [];

          for (var command in commands) {
            if (commands.hasOwnProperty(command)) {

              var item = commands[command];

              if (item.lastIndexOf(prefix, 0) === 0) {
                complete.push(item.substring(prefix.length));
              }
            }
          }

          return complete;
        },

        expandFrame: function () {
          $terminal.css('height', '430px');
        }
      });
    });
  }

  initializeCookieBanner()
});

