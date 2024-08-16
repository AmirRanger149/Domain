// dist/worker.js
var __webpack_modules__ = {
  583: (module, __unused_webpack_exports, __webpack_require__2) => {
    var objectAssign = __webpack_require__2(418);
    function compare(a, b) {
      if (a === b) {
        return 0;
      }
      var x = a.length;
      var y = b.length;
      for (var i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
      }
      if (x < y) {
        return -1;
      }
      if (y < x) {
        return 1;
      }
      return 0;
    }
    function isBuffer(b) {
      if (__webpack_require__2.g.Buffer && typeof __webpack_require__2.g.Buffer.isBuffer === "function") {
        return __webpack_require__2.g.Buffer.isBuffer(b);
      }
      return !!(b != null && b._isBuffer);
    }
    var util2 = __webpack_require__2(69);
    var hasOwn = Object.prototype.hasOwnProperty;
    var pSlice = Array.prototype.slice;
    var functionsHaveNames = function() {
      return function foo() {
      }.name === "foo";
    }();
    function pToString(obj) {
      return Object.prototype.toString.call(obj);
    }
    function isView(arrbuf) {
      if (isBuffer(arrbuf)) {
        return false;
      }
      if (typeof __webpack_require__2.g.ArrayBuffer !== "function") {
        return false;
      }
      if (typeof ArrayBuffer.isView === "function") {
        return ArrayBuffer.isView(arrbuf);
      }
      if (!arrbuf) {
        return false;
      }
      if (arrbuf instanceof DataView) {
        return true;
      }
      if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
        return true;
      }
      return false;
    }
    var assert = module.exports = ok;
    var regex = /\s*function\s+([^\(\s]*)\s*/;
    function getName(func) {
      if (!util2.isFunction(func)) {
        return;
      }
      if (functionsHaveNames) {
        return func.name;
      }
      var str = func.toString();
      var match = str.match(regex);
      return match && match[1];
    }
    assert.AssertionError = function AssertionError(options) {
      this.name = "AssertionError";
      this.actual = options.actual;
      this.expected = options.expected;
      this.operator = options.operator;
      if (options.message) {
        this.message = options.message;
        this.generatedMessage = false;
      } else {
        this.message = getMessage(this);
        this.generatedMessage = true;
      }
      var stackStartFunction = options.stackStartFunction || fail;
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, stackStartFunction);
      } else {
        var err = new Error();
        if (err.stack) {
          var out2 = err.stack;
          var fn_name = getName(stackStartFunction);
          var idx = out2.indexOf("\n" + fn_name);
          if (idx >= 0) {
            var next_line = out2.indexOf("\n", idx + 1);
            out2 = out2.substring(next_line + 1);
          }
          this.stack = out2;
        }
      }
    };
    util2.inherits(assert.AssertionError, Error);
    function truncate(s, n) {
      if (typeof s === "string") {
        return s.length < n ? s : s.slice(0, n);
      } else {
        return s;
      }
    }
    function inspect(something) {
      if (functionsHaveNames || !util2.isFunction(something)) {
        return util2.inspect(something);
      }
      var rawname = getName(something);
      var name = rawname ? ": " + rawname : "";
      return "[Function" + name + "]";
    }
    function getMessage(self) {
      return truncate(inspect(self.actual), 128) + " " + self.operator + " " + truncate(inspect(self.expected), 128);
    }
    function fail(actual, expected, message, operator, stackStartFunction) {
      throw new assert.AssertionError({
        message,
        actual,
        expected,
        operator,
        stackStartFunction
      });
    }
    assert.fail = fail;
    function ok(value, message) {
      if (!value)
        fail(value, true, message, "==", assert.ok);
    }
    assert.ok = ok;
    assert.equal = function equal(actual, expected, message) {
      if (actual != expected)
        fail(actual, expected, message, "==", assert.equal);
    };
    assert.notEqual = function notEqual(actual, expected, message) {
      if (actual == expected) {
        fail(actual, expected, message, "!=", assert.notEqual);
      }
    };
    assert.deepEqual = function deepEqual(actual, expected, message) {
      if (!_deepEqual(actual, expected, false)) {
        fail(actual, expected, message, "deepEqual", assert.deepEqual);
      }
    };
    assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
      if (!_deepEqual(actual, expected, true)) {
        fail(actual, expected, message, "deepStrictEqual", assert.deepStrictEqual);
      }
    };
    function _deepEqual(actual, expected, strict2, memos) {
      if (actual === expected) {
        return true;
      } else if (isBuffer(actual) && isBuffer(expected)) {
        return compare(actual, expected) === 0;
      } else if (util2.isDate(actual) && util2.isDate(expected)) {
        return actual.getTime() === expected.getTime();
      } else if (util2.isRegExp(actual) && util2.isRegExp(expected)) {
        return actual.source === expected.source && actual.global === expected.global && actual.multiline === expected.multiline && actual.lastIndex === expected.lastIndex && actual.ignoreCase === expected.ignoreCase;
      } else if ((actual === null || typeof actual !== "object") && (expected === null || typeof expected !== "object")) {
        return strict2 ? actual === expected : actual == expected;
      } else if (isView(actual) && isView(expected) && pToString(actual) === pToString(expected) && !(actual instanceof Float32Array || actual instanceof Float64Array)) {
        return compare(
          new Uint8Array(actual.buffer),
          new Uint8Array(expected.buffer)
        ) === 0;
      } else if (isBuffer(actual) !== isBuffer(expected)) {
        return false;
      } else {
        memos = memos || { actual: [], expected: [] };
        var actualIndex = memos.actual.indexOf(actual);
        if (actualIndex !== -1) {
          if (actualIndex === memos.expected.indexOf(expected)) {
            return true;
          }
        }
        memos.actual.push(actual);
        memos.expected.push(expected);
        return objEquiv(actual, expected, strict2, memos);
      }
    }
    function isArguments(object) {
      return Object.prototype.toString.call(object) == "[object Arguments]";
    }
    function objEquiv(a, b, strict2, actualVisitedObjects) {
      if (a === null || a === void 0 || b === null || b === void 0)
        return false;
      if (util2.isPrimitive(a) || util2.isPrimitive(b))
        return a === b;
      if (strict2 && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
        return false;
      var aIsArgs = isArguments(a);
      var bIsArgs = isArguments(b);
      if (aIsArgs && !bIsArgs || !aIsArgs && bIsArgs)
        return false;
      if (aIsArgs) {
        a = pSlice.call(a);
        b = pSlice.call(b);
        return _deepEqual(a, b, strict2);
      }
      var ka = objectKeys(a);
      var kb = objectKeys(b);
      var key, i;
      if (ka.length !== kb.length)
        return false;
      ka.sort();
      kb.sort();
      for (i = ka.length - 1; i >= 0; i--) {
        if (ka[i] !== kb[i])
          return false;
      }
      for (i = ka.length - 1; i >= 0; i--) {
        key = ka[i];
        if (!_deepEqual(a[key], b[key], strict2, actualVisitedObjects))
          return false;
      }
      return true;
    }
    assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
      if (_deepEqual(actual, expected, false)) {
        fail(actual, expected, message, "notDeepEqual", assert.notDeepEqual);
      }
    };
    assert.notDeepStrictEqual = notDeepStrictEqual;
    function notDeepStrictEqual(actual, expected, message) {
      if (_deepEqual(actual, expected, true)) {
        fail(actual, expected, message, "notDeepStrictEqual", notDeepStrictEqual);
      }
    }
    assert.strictEqual = function strictEqual(actual, expected, message) {
      if (actual !== expected) {
        fail(actual, expected, message, "===", assert.strictEqual);
      }
    };
    assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
      if (actual === expected) {
        fail(actual, expected, message, "!==", assert.notStrictEqual);
      }
    };
    function expectedException(actual, expected) {
      if (!actual || !expected) {
        return false;
      }
      if (Object.prototype.toString.call(expected) == "[object RegExp]") {
        return expected.test(actual);
      }
      try {
        if (actual instanceof expected) {
          return true;
        }
      } catch (e) {
      }
      if (Error.isPrototypeOf(expected)) {
        return false;
      }
      return expected.call({}, actual) === true;
    }
    function _tryBlock(block) {
      var error;
      try {
        block();
      } catch (e) {
        error = e;
      }
      return error;
    }
    function _throws(shouldThrow, block, expected, message) {
      var actual;
      if (typeof block !== "function") {
        throw new TypeError('"block" argument must be a function');
      }
      if (typeof expected === "string") {
        message = expected;
        expected = null;
      }
      actual = _tryBlock(block);
      message = (expected && expected.name ? " (" + expected.name + ")." : ".") + (message ? " " + message : ".");
      if (shouldThrow && !actual) {
        fail(actual, expected, "Missing expected exception" + message);
      }
      var userProvidedMessage = typeof message === "string";
      var isUnwantedException = !shouldThrow && util2.isError(actual);
      var isUnexpectedException = !shouldThrow && actual && !expected;
      if (isUnwantedException && userProvidedMessage && expectedException(actual, expected) || isUnexpectedException) {
        fail(actual, expected, "Got unwanted exception" + message);
      }
      if (shouldThrow && actual && expected && !expectedException(actual, expected) || !shouldThrow && actual) {
        throw actual;
      }
    }
    assert.throws = function(block, error, message) {
      _throws(true, block, error, message);
    };
    assert.doesNotThrow = function(block, error, message) {
      _throws(false, block, error, message);
    };
    assert.ifError = function(err) {
      if (err)
        throw err;
    };
    function strict(value, message) {
      if (!value)
        fail(value, true, message, "==", strict);
    }
    assert.strict = objectAssign(strict, assert, {
      equal: assert.strictEqual,
      deepEqual: assert.deepStrictEqual,
      notEqual: assert.notStrictEqual,
      notDeepEqual: assert.notDeepStrictEqual
    });
    assert.strict.strict = assert.strict;
    var objectKeys = Object.keys || function(obj) {
      var keys = [];
      for (var key in obj) {
        if (hasOwn.call(obj, key))
          keys.push(key);
      }
      return keys;
    };
  },
  76: (module) => {
    if (typeof Object.create === "function") {
      module.exports = function inherits(ctor, superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
      };
    } else {
      module.exports = function inherits(ctor, superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {
        };
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      };
    }
  },
  14: (module) => {
    module.exports = function isBuffer(arg) {
      return arg && typeof arg === "object" && typeof arg.copy === "function" && typeof arg.fill === "function" && typeof arg.readUInt8 === "function";
    };
  },
  69: (__unused_webpack_module, exports, __webpack_require__2) => {
    var process2 = __webpack_require__2(155);
    var console = __webpack_require__2(108);
    var formatRegExp = /%[sdj%]/g;
    exports.format = function(f) {
      if (!isString(f)) {
        var objects = [];
        for (var i = 0; i < arguments.length; i++) {
          objects.push(inspect(arguments[i]));
        }
        return objects.join(" ");
      }
      var i = 1;
      var args = arguments;
      var len = args.length;
      var str = String(f).replace(formatRegExp, function(x2) {
        if (x2 === "%%")
          return "%";
        if (i >= len)
          return x2;
        switch (x2) {
          case "%s":
            return String(args[i++]);
          case "%d":
            return Number(args[i++]);
          case "%j":
            try {
              return JSON.stringify(args[i++]);
            } catch (_) {
              return "[Circular]";
            }
          default:
            return x2;
        }
      });
      for (var x = args[i]; i < len; x = args[++i]) {
        if (isNull(x) || !isObject(x)) {
          str += " " + x;
        } else {
          str += " " + inspect(x);
        }
      }
      return str;
    };
    exports.deprecate = function(fn, msg) {
      if (isUndefined(__webpack_require__2.g.process)) {
        return function() {
          return exports.deprecate(fn, msg).apply(this, arguments);
        };
      }
      if (process2.noDeprecation === true) {
        return fn;
      }
      var warned = false;
      function deprecated() {
        if (!warned) {
          if (process2.throwDeprecation) {
            throw new Error(msg);
          } else if (process2.traceDeprecation) {
            console.trace(msg);
          } else {
            console.error(msg);
          }
          warned = true;
        }
        return fn.apply(this, arguments);
      }
      return deprecated;
    };
    var debugs = {};
    var debugEnviron;
    exports.debuglog = function(set) {
      if (isUndefined(debugEnviron))
        debugEnviron = process2.env.NODE_DEBUG || "";
      set = set.toUpperCase();
      if (!debugs[set]) {
        if (new RegExp("\\b" + set + "\\b", "i").test(debugEnviron)) {
          var pid = process2.pid;
          debugs[set] = function() {
            var msg = exports.format.apply(exports, arguments);
            console.error("%s %d: %s", set, pid, msg);
          };
        } else {
          debugs[set] = function() {
          };
        }
      }
      return debugs[set];
    };
    function inspect(obj, opts) {
      var ctx = {
        seen: [],
        stylize: stylizeNoColor
      };
      if (arguments.length >= 3)
        ctx.depth = arguments[2];
      if (arguments.length >= 4)
        ctx.colors = arguments[3];
      if (isBoolean(opts)) {
        ctx.showHidden = opts;
      } else if (opts) {
        exports._extend(ctx, opts);
      }
      if (isUndefined(ctx.showHidden))
        ctx.showHidden = false;
      if (isUndefined(ctx.depth))
        ctx.depth = 2;
      if (isUndefined(ctx.colors))
        ctx.colors = false;
      if (isUndefined(ctx.customInspect))
        ctx.customInspect = true;
      if (ctx.colors)
        ctx.stylize = stylizeWithColor;
      return formatValue(ctx, obj, ctx.depth);
    }
    exports.inspect = inspect;
    inspect.colors = {
      "bold": [1, 22],
      "italic": [3, 23],
      "underline": [4, 24],
      "inverse": [7, 27],
      "white": [37, 39],
      "grey": [90, 39],
      "black": [30, 39],
      "blue": [34, 39],
      "cyan": [36, 39],
      "green": [32, 39],
      "magenta": [35, 39],
      "red": [31, 39],
      "yellow": [33, 39]
    };
    inspect.styles = {
      "special": "cyan",
      "number": "yellow",
      "boolean": "yellow",
      "undefined": "grey",
      "null": "bold",
      "string": "green",
      "date": "magenta",
      "regexp": "red"
    };
    function stylizeWithColor(str, styleType) {
      var style = inspect.styles[styleType];
      if (style) {
        return "\x1B[" + inspect.colors[style][0] + "m" + str + "\x1B[" + inspect.colors[style][1] + "m";
      } else {
        return str;
      }
    }
    function stylizeNoColor(str, styleType) {
      return str;
    }
    function arrayToHash(array) {
      var hash = {};
      array.forEach(function(val, idx) {
        hash[val] = true;
      });
      return hash;
    }
    function formatValue(ctx, value, recurseTimes) {
      if (ctx.customInspect && value && isFunction(value.inspect) && value.inspect !== exports.inspect && !(value.constructor && value.constructor.prototype === value)) {
        var ret = value.inspect(recurseTimes, ctx);
        if (!isString(ret)) {
          ret = formatValue(ctx, ret, recurseTimes);
        }
        return ret;
      }
      var primitive = formatPrimitive(ctx, value);
      if (primitive) {
        return primitive;
      }
      var keys = Object.keys(value);
      var visibleKeys = arrayToHash(keys);
      if (ctx.showHidden) {
        keys = Object.getOwnPropertyNames(value);
      }
      if (isError(value) && (keys.indexOf("message") >= 0 || keys.indexOf("description") >= 0)) {
        return formatError(value);
      }
      if (keys.length === 0) {
        if (isFunction(value)) {
          var name = value.name ? ": " + value.name : "";
          return ctx.stylize("[Function" + name + "]", "special");
        }
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
        }
        if (isDate(value)) {
          return ctx.stylize(Date.prototype.toString.call(value), "date");
        }
        if (isError(value)) {
          return formatError(value);
        }
      }
      var base = "", array = false, braces = ["{", "}"];
      if (isArray(value)) {
        array = true;
        braces = ["[", "]"];
      }
      if (isFunction(value)) {
        var n = value.name ? ": " + value.name : "";
        base = " [Function" + n + "]";
      }
      if (isRegExp(value)) {
        base = " " + RegExp.prototype.toString.call(value);
      }
      if (isDate(value)) {
        base = " " + Date.prototype.toUTCString.call(value);
      }
      if (isError(value)) {
        base = " " + formatError(value);
      }
      if (keys.length === 0 && (!array || value.length == 0)) {
        return braces[0] + base + braces[1];
      }
      if (recurseTimes < 0) {
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
        } else {
          return ctx.stylize("[Object]", "special");
        }
      }
      ctx.seen.push(value);
      var output;
      if (array) {
        output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
      } else {
        output = keys.map(function(key) {
          return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
        });
      }
      ctx.seen.pop();
      return reduceToSingleString(output, base, braces);
    }
    function formatPrimitive(ctx, value) {
      if (isUndefined(value))
        return ctx.stylize("undefined", "undefined");
      if (isString(value)) {
        var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
        return ctx.stylize(simple, "string");
      }
      if (isNumber(value))
        return ctx.stylize("" + value, "number");
      if (isBoolean(value))
        return ctx.stylize("" + value, "boolean");
      if (isNull(value))
        return ctx.stylize("null", "null");
    }
    function formatError(value) {
      return "[" + Error.prototype.toString.call(value) + "]";
    }
    function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
      var output = [];
      for (var i = 0, l = value.length; i < l; ++i) {
        if (hasOwnProperty(value, String(i))) {
          output.push(formatProperty(
            ctx,
            value,
            recurseTimes,
            visibleKeys,
            String(i),
            true
          ));
        } else {
          output.push("");
        }
      }
      keys.forEach(function(key) {
        if (!key.match(/^\d+$/)) {
          output.push(formatProperty(
            ctx,
            value,
            recurseTimes,
            visibleKeys,
            key,
            true
          ));
        }
      });
      return output;
    }
    function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
      var name, str, desc;
      desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
      if (desc.get) {
        if (desc.set) {
          str = ctx.stylize("[Getter/Setter]", "special");
        } else {
          str = ctx.stylize("[Getter]", "special");
        }
      } else {
        if (desc.set) {
          str = ctx.stylize("[Setter]", "special");
        }
      }
      if (!hasOwnProperty(visibleKeys, key)) {
        name = "[" + key + "]";
      }
      if (!str) {
        if (ctx.seen.indexOf(desc.value) < 0) {
          if (isNull(recurseTimes)) {
            str = formatValue(ctx, desc.value, null);
          } else {
            str = formatValue(ctx, desc.value, recurseTimes - 1);
          }
          if (str.indexOf("\n") > -1) {
            if (array) {
              str = str.split("\n").map(function(line) {
                return "  " + line;
              }).join("\n").substr(2);
            } else {
              str = "\n" + str.split("\n").map(function(line) {
                return "   " + line;
              }).join("\n");
            }
          }
        } else {
          str = ctx.stylize("[Circular]", "special");
        }
      }
      if (isUndefined(name)) {
        if (array && key.match(/^\d+$/)) {
          return str;
        }
        name = JSON.stringify("" + key);
        if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
          name = name.substr(1, name.length - 2);
          name = ctx.stylize(name, "name");
        } else {
          name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
          name = ctx.stylize(name, "string");
        }
      }
      return name + ": " + str;
    }
    function reduceToSingleString(output, base, braces) {
      var numLinesEst = 0;
      var length = output.reduce(function(prev, cur) {
        numLinesEst++;
        if (cur.indexOf("\n") >= 0)
          numLinesEst++;
        return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
      }, 0);
      if (length > 60) {
        return braces[0] + (base === "" ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
      }
      return braces[0] + base + " " + output.join(", ") + " " + braces[1];
    }
    function isArray(ar) {
      return Array.isArray(ar);
    }
    exports.isArray = isArray;
    function isBoolean(arg) {
      return typeof arg === "boolean";
    }
    exports.isBoolean = isBoolean;
    function isNull(arg) {
      return arg === null;
    }
    exports.isNull = isNull;
    function isNullOrUndefined(arg) {
      return arg == null;
    }
    exports.isNullOrUndefined = isNullOrUndefined;
    function isNumber(arg) {
      return typeof arg === "number";
    }
    exports.isNumber = isNumber;
    function isString(arg) {
      return typeof arg === "string";
    }
    exports.isString = isString;
    function isSymbol(arg) {
      return typeof arg === "symbol";
    }
    exports.isSymbol = isSymbol;
    function isUndefined(arg) {
      return arg === void 0;
    }
    exports.isUndefined = isUndefined;
    function isRegExp(re) {
      return isObject(re) && objectToString(re) === "[object RegExp]";
    }
    exports.isRegExp = isRegExp;
    function isObject(arg) {
      return typeof arg === "object" && arg !== null;
    }
    exports.isObject = isObject;
    function isDate(d) {
      return isObject(d) && objectToString(d) === "[object Date]";
    }
    exports.isDate = isDate;
    function isError(e) {
      return isObject(e) && (objectToString(e) === "[object Error]" || e instanceof Error);
    }
    exports.isError = isError;
    function isFunction(arg) {
      return typeof arg === "function";
    }
    exports.isFunction = isFunction;
    function isPrimitive(arg) {
      return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || typeof arg === "undefined";
    }
    exports.isPrimitive = isPrimitive;
    exports.isBuffer = __webpack_require__2(14);
    function objectToString(o) {
      return Object.prototype.toString.call(o);
    }
    function pad(n) {
      return n < 10 ? "0" + n.toString(10) : n.toString(10);
    }
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    function timestamp() {
      var d = new Date();
      var time = [
        pad(d.getHours()),
        pad(d.getMinutes()),
        pad(d.getSeconds())
      ].join(":");
      return [d.getDate(), months[d.getMonth()], time].join(" ");
    }
    exports.log = function() {
      console.log("%s - %s", timestamp(), exports.format.apply(exports, arguments));
    };
    exports.inherits = __webpack_require__2(76);
    exports._extend = function(origin, add) {
      if (!add || !isObject(add))
        return origin;
      var keys = Object.keys(add);
      var i = keys.length;
      while (i--) {
        origin[keys[i]] = add[keys[i]];
      }
      return origin;
    };
    function hasOwnProperty(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }
  },
  742: (__unused_webpack_module, exports) => {
    exports.byteLength = byteLength;
    exports.toByteArray = toByteArray;
    exports.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (var i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1)
        validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i2;
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
        );
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
        );
      }
      return parts.join("");
    }
  },
  764: (__unused_webpack_module, exports, __webpack_require__2) => {
    var __webpack_unused_export__;
    var console = __webpack_require__2(108);
    const base64 = __webpack_require__2(742);
    const ieee754 = __webpack_require__2(645);
    const customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports.lW = Buffer2;
    __webpack_unused_export__ = SlowBuffer;
    exports.h2 = 50;
    const K_MAX_LENGTH = 2147483647;
    __webpack_unused_export__ = K_MAX_LENGTH;
    Buffer2.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer2.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
      );
    }
    function typedArraySupport() {
      try {
        const arr = new Uint8Array(1);
        const proto = { foo: function() {
          return 42;
        } };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
      } catch (e) {
        return false;
      }
    }
    Object.defineProperty(Buffer2.prototype, "parent", {
      enumerable: true,
      get: function() {
        if (!Buffer2.isBuffer(this))
          return void 0;
        return this.buffer;
      }
    });
    Object.defineProperty(Buffer2.prototype, "offset", {
      enumerable: true,
      get: function() {
        if (!Buffer2.isBuffer(this))
          return void 0;
        return this.byteOffset;
      }
    });
    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
      }
      const buf = new Uint8Array(length);
      Object.setPrototypeOf(buf, Buffer2.prototype);
      return buf;
    }
    function Buffer2(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        }
        return allocUnsafe(arg);
      }
      return from(arg, encodingOrOffset, length);
    }
    Buffer2.poolSize = 8192;
    function from(value, encodingOrOffset, length) {
      if (typeof value === "string") {
        return fromString(value, encodingOrOffset);
      }
      if (ArrayBuffer.isView(value)) {
        return fromArrayView(value);
      }
      if (value == null) {
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof value === "number") {
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      }
      const valueOf = value.valueOf && value.valueOf();
      if (valueOf != null && valueOf !== value) {
        return Buffer2.from(valueOf, encodingOrOffset, length);
      }
      const b = fromObject(value);
      if (b)
        return b;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
        return Buffer2.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
      }
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
      );
    }
    Buffer2.from = function(value, encodingOrOffset, length) {
      return from(value, encodingOrOffset, length);
    };
    Object.setPrototypeOf(Buffer2.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(Buffer2, Uint8Array);
    function assertSize(size) {
      if (typeof size !== "number") {
        throw new TypeError('"size" argument must be of type number');
      } else if (size < 0) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"');
      }
    }
    function alloc(size, fill, encoding) {
      assertSize(size);
      if (size <= 0) {
        return createBuffer(size);
      }
      if (fill !== void 0) {
        return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
      }
      return createBuffer(size);
    }
    Buffer2.alloc = function(size, fill, encoding) {
      return alloc(size, fill, encoding);
    };
    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    Buffer2.allocUnsafe = function(size) {
      return allocUnsafe(size);
    };
    Buffer2.allocUnsafeSlow = function(size) {
      return allocUnsafe(size);
    };
    function fromString(string, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer2.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      const length = byteLength(string, encoding) | 0;
      let buf = createBuffer(length);
      const actual = buf.write(string, encoding);
      if (actual !== length) {
        buf = buf.slice(0, actual);
      }
      return buf;
    }
    function fromArrayLike(array) {
      const length = array.length < 0 ? 0 : checked(array.length) | 0;
      const buf = createBuffer(length);
      for (let i = 0; i < length; i += 1) {
        buf[i] = array[i] & 255;
      }
      return buf;
    }
    function fromArrayView(arrayView) {
      if (isInstance(arrayView, Uint8Array)) {
        const copy = new Uint8Array(arrayView);
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
      }
      return fromArrayLike(arrayView);
    }
    function fromArrayBuffer(array, byteOffset, length) {
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
      }
      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
      }
      let buf;
      if (byteOffset === void 0 && length === void 0) {
        buf = new Uint8Array(array);
      } else if (length === void 0) {
        buf = new Uint8Array(array, byteOffset);
      } else {
        buf = new Uint8Array(array, byteOffset, length);
      }
      Object.setPrototypeOf(buf, Buffer2.prototype);
      return buf;
    }
    function fromObject(obj) {
      if (Buffer2.isBuffer(obj)) {
        const len = checked(obj.length) | 0;
        const buf = createBuffer(len);
        if (buf.length === 0) {
          return buf;
        }
        obj.copy(buf, 0, 0, len);
        return buf;
      }
      if (obj.length !== void 0) {
        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
          return createBuffer(0);
        }
        return fromArrayLike(obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
      }
    }
    function checked(length) {
      if (length >= K_MAX_LENGTH) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
      }
      return length | 0;
    }
    function SlowBuffer(length) {
      if (+length != length) {
        length = 0;
      }
      return Buffer2.alloc(+length);
    }
    Buffer2.isBuffer = function isBuffer(b) {
      return b != null && b._isBuffer === true && b !== Buffer2.prototype;
    };
    Buffer2.compare = function compare(a, b) {
      if (isInstance(a, Uint8Array))
        a = Buffer2.from(a, a.offset, a.byteLength);
      if (isInstance(b, Uint8Array))
        b = Buffer2.from(b, b.offset, b.byteLength);
      if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b)) {
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      }
      if (a === b)
        return 0;
      let x = a.length;
      let y = b.length;
      for (let i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    };
    Buffer2.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    Buffer2.concat = function concat(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer2.alloc(0);
      }
      let i;
      if (length === void 0) {
        length = 0;
        for (i = 0; i < list.length; ++i) {
          length += list[i].length;
        }
      }
      const buffer = Buffer2.allocUnsafe(length);
      let pos = 0;
      for (i = 0; i < list.length; ++i) {
        let buf = list[i];
        if (isInstance(buf, Uint8Array)) {
          if (pos + buf.length > buffer.length) {
            if (!Buffer2.isBuffer(buf))
              buf = Buffer2.from(buf);
            buf.copy(buffer, pos);
          } else {
            Uint8Array.prototype.set.call(
              buffer,
              buf,
              pos
            );
          }
        } else if (!Buffer2.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
          buf.copy(buffer, pos);
        }
        pos += buf.length;
      }
      return buffer;
    };
    function byteLength(string, encoding) {
      if (Buffer2.isBuffer(string)) {
        return string.length;
      }
      if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
        return string.byteLength;
      }
      if (typeof string !== "string") {
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
        );
      }
      const len = string.length;
      const mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len === 0)
        return 0;
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len;
          case "utf8":
          case "utf-8":
            return utf8ToBytes(string).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len * 2;
          case "hex":
            return len >>> 1;
          case "base64":
            return base64ToBytes(string).length;
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes(string).length;
            }
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer2.byteLength = byteLength;
    function slowToString(encoding, start, end) {
      let loweredCase = false;
      if (start === void 0 || start < 0) {
        start = 0;
      }
      if (start > this.length) {
        return "";
      }
      if (end === void 0 || end > this.length) {
        end = this.length;
      }
      if (end <= 0) {
        return "";
      }
      end >>>= 0;
      start >>>= 0;
      if (end <= start) {
        return "";
      }
      if (!encoding)
        encoding = "utf8";
      while (true) {
        switch (encoding) {
          case "hex":
            return hexSlice(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "latin1":
          case "binary":
            return latin1Slice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16leSlice(this, start, end);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer2.prototype._isBuffer = true;
    function swap(b, n, m) {
      const i = b[n];
      b[n] = b[m];
      b[m] = i;
    }
    Buffer2.prototype.swap16 = function swap16() {
      const len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (let i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this;
    };
    Buffer2.prototype.swap32 = function swap32() {
      const len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (let i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }
      return this;
    };
    Buffer2.prototype.swap64 = function swap64() {
      const len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (let i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }
      return this;
    };
    Buffer2.prototype.toString = function toString() {
      const length = this.length;
      if (length === 0)
        return "";
      if (arguments.length === 0)
        return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer2.prototype.toLocaleString = Buffer2.prototype.toString;
    Buffer2.prototype.equals = function equals(b) {
      if (!Buffer2.isBuffer(b))
        throw new TypeError("Argument must be a Buffer");
      if (this === b)
        return true;
      return Buffer2.compare(this, b) === 0;
    };
    Buffer2.prototype.inspect = function inspect() {
      let str = "";
      const max = exports.h2;
      str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max)
        str += " ... ";
      return "<Buffer " + str + ">";
    };
    if (customInspectSymbol) {
      Buffer2.prototype[customInspectSymbol] = Buffer2.prototype.inspect;
    }
    Buffer2.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, Uint8Array)) {
        target = Buffer2.from(target, target.offset, target.byteLength);
      }
      if (!Buffer2.isBuffer(target)) {
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
        );
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target)
        return 0;
      let x = thisEnd - thisStart;
      let y = end - start;
      const len = Math.min(x, y);
      const thisCopy = this.slice(thisStart, thisEnd);
      const targetCopy = target.slice(start, end);
      for (let i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    };
    function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
      if (buffer.length === 0)
        return -1;
      if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
      }
      byteOffset = +byteOffset;
      if (numberIsNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer.length - 1;
      }
      if (byteOffset < 0)
        byteOffset = buffer.length + byteOffset;
      if (byteOffset >= buffer.length) {
        if (dir)
          return -1;
        else
          byteOffset = buffer.length - 1;
      } else if (byteOffset < 0) {
        if (dir)
          byteOffset = 0;
        else
          return -1;
      }
      if (typeof val === "string") {
        val = Buffer2.from(val, encoding);
      }
      if (Buffer2.isBuffer(val)) {
        if (val.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
      } else if (typeof val === "number") {
        val = val & 255;
        if (typeof Uint8Array.prototype.indexOf === "function") {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
          }
        }
        return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      let indexSize = 1;
      let arrLength = arr.length;
      let valLength = val.length;
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
      function read(buf, i2) {
        if (indexSize === 1) {
          return buf[i2];
        } else {
          return buf.readUInt16BE(i2 * indexSize);
        }
      }
      let i;
      if (dir) {
        let foundIndex = -1;
        for (i = byteOffset; i < arrLength; i++) {
          if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1)
              foundIndex = i;
            if (i - foundIndex + 1 === valLength)
              return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1)
              i -= i - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength)
          byteOffset = arrLength - valLength;
        for (i = byteOffset; i >= 0; i--) {
          let found = true;
          for (let j = 0; j < valLength; j++) {
            if (read(arr, i + j) !== read(val, j)) {
              found = false;
              break;
            }
          }
          if (found)
            return i;
        }
      }
      return -1;
    }
    Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    function hexWrite(buf, string, offset, length) {
      offset = Number(offset) || 0;
      const remaining = buf.length - offset;
      if (!length) {
        length = remaining;
      } else {
        length = Number(length);
        if (length > remaining) {
          length = remaining;
        }
      }
      const strLen = string.length;
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      let i;
      for (i = 0; i < length; ++i) {
        const parsed = parseInt(string.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed))
          return i;
        buf[offset + i] = parsed;
      }
      return i;
    }
    function utf8Write(buf, string, offset, length) {
      return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
    }
    function asciiWrite(buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length);
    }
    function base64Write(buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length);
    }
    function ucs2Write(buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
    }
    Buffer2.prototype.write = function write(string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
          length = length >>> 0;
          if (encoding === void 0)
            encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      }
      const remaining = this.length - offset;
      if (length === void 0 || length > remaining)
        length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding)
        encoding = "utf8";
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
          case "latin1":
          case "binary":
            return asciiWrite(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer2.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf);
      } else {
        return base64.fromByteArray(buf.slice(start, end));
      }
    }
    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end);
      const res = [];
      let i = start;
      while (i < end) {
        const firstByte = buf[i];
        let codePoint = null;
        let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i + bytesPerSequence <= end) {
          let secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          res.push(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i += bytesPerSequence;
      }
      return decodeCodePointsArray(res);
    }
    const MAX_ARGUMENTS_LENGTH = 4096;
    function decodeCodePointsArray(codePoints) {
      const len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
      }
      let res = "";
      let i = 0;
      while (i < len) {
        res += String.fromCharCode.apply(
          String,
          codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
        );
      }
      return res;
    }
    function asciiSlice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 127);
      }
      return ret;
    }
    function latin1Slice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i]);
      }
      return ret;
    }
    function hexSlice(buf, start, end) {
      const len = buf.length;
      if (!start || start < 0)
        start = 0;
      if (!end || end < 0 || end > len)
        end = len;
      let out2 = "";
      for (let i = start; i < end; ++i) {
        out2 += hexSliceLookupTable[buf[i]];
      }
      return out2;
    }
    function utf16leSlice(buf, start, end) {
      const bytes = buf.slice(start, end);
      let res = "";
      for (let i = 0; i < bytes.length - 1; i += 2) {
        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
      }
      return res;
    }
    Buffer2.prototype.slice = function slice(start, end) {
      const len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0)
          start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0)
          end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start)
        end = start;
      const newBuf = this.subarray(start, end);
      Object.setPrototypeOf(newBuf, Buffer2.prototype);
      return newBuf;
    };
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0)
        throw new RangeError("offset is not uint");
      if (offset + ext > length)
        throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer2.prototype.readUintLE = Buffer2.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUintBE = Buffer2.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        checkOffset(offset, byteLength2, this.length);
      }
      let val = this[offset + --byteLength2];
      let mul = 1;
      while (byteLength2 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength2] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUint8 = Buffer2.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer2.prototype.readUint16LE = Buffer2.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer2.prototype.readUint16BE = Buffer2.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer2.prototype.readUint32LE = Buffer2.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer2.prototype.readUint32BE = Buffer2.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer2.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
      const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
      return BigInt(lo) + (BigInt(hi) << BigInt(32));
    });
    Buffer2.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
      return (BigInt(hi) << BigInt(32)) + BigInt(lo);
    });
    Buffer2.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer2.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let i = byteLength2;
      let mul = 1;
      let val = this[offset + --i];
      while (i > 0 && (mul *= 256)) {
        val += this[offset + --i] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer2.prototype.readInt8 = function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128))
        return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer2.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      const val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      const val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer2.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer2.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
      return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
    });
    Buffer2.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = (first << 24) + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
    });
    Buffer2.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, true, 23, 4);
    };
    Buffer2.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, false, 23, 4);
    };
    Buffer2.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, true, 52, 8);
    };
    Buffer2.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, false, 52, 8);
    };
    function checkInt(buf, value, offset, ext, max, min) {
      if (!Buffer2.isBuffer(buf))
        throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max || value < min)
        throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length)
        throw new RangeError("Index out of range");
    }
    Buffer2.prototype.writeUintLE = Buffer2.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let mul = 1;
      let i = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeUintBE = Buffer2.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeUint8 = Buffer2.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 255, 0);
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer2.prototype.writeUint16LE = Buffer2.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer2.prototype.writeUint16BE = Buffer2.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer2.prototype.writeUint32LE = Buffer2.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset + 3] = value >>> 24;
      this[offset + 2] = value >>> 16;
      this[offset + 1] = value >>> 8;
      this[offset] = value & 255;
      return offset + 4;
    };
    Buffer2.prototype.writeUint32BE = Buffer2.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    function wrtBigUInt64LE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      return offset;
    }
    function wrtBigUInt64BE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset + 7] = lo;
      lo = lo >> 8;
      buf[offset + 6] = lo;
      lo = lo >> 8;
      buf[offset + 5] = lo;
      lo = lo >> 8;
      buf[offset + 4] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset + 3] = hi;
      hi = hi >> 8;
      buf[offset + 2] = hi;
      hi = hi >> 8;
      buf[offset + 1] = hi;
      hi = hi >> 8;
      buf[offset] = hi;
      return offset + 8;
    }
    Buffer2.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer2.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer2.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = 0;
      let mul = 1;
      let sub = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      let sub = 0;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 127, -128);
      if (value < 0)
        value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer2.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer2.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer2.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      this[offset + 2] = value >>> 16;
      this[offset + 3] = value >>> 24;
      return offset + 4;
    };
    Buffer2.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0)
        value = 4294967295 + value + 1;
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    Buffer2.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    Buffer2.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function checkIEEE754(buf, value, offset, ext, max, min) {
      if (offset + ext > buf.length)
        throw new RangeError("Index out of range");
      if (offset < 0)
        throw new RangeError("Index out of range");
    }
    function writeFloat(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
      }
      ieee754.write(buf, value, offset, littleEndian, 23, 4);
      return offset + 4;
    }
    Buffer2.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };
    Buffer2.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };
    function writeDouble(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
      }
      ieee754.write(buf, value, offset, littleEndian, 52, 8);
      return offset + 8;
    }
    Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };
    Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    };
    Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
      if (!Buffer2.isBuffer(target))
        throw new TypeError("argument should be a Buffer");
      if (!start)
        start = 0;
      if (!end && end !== 0)
        end = this.length;
      if (targetStart >= target.length)
        targetStart = target.length;
      if (!targetStart)
        targetStart = 0;
      if (end > 0 && end < start)
        end = start;
      if (end === start)
        return 0;
      if (target.length === 0 || this.length === 0)
        return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length)
        throw new RangeError("Index out of range");
      if (end < 0)
        throw new RangeError("sourceEnd out of bounds");
      if (end > this.length)
        end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      const len = end - start;
      if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
        this.copyWithin(targetStart, start, end);
      } else {
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, end),
          targetStart
        );
      }
      return len;
    };
    Buffer2.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        if (val.length === 1) {
          const code = val.charCodeAt(0);
          if (encoding === "utf8" && code < 128 || encoding === "latin1") {
            val = code;
          }
        }
      } else if (typeof val === "number") {
        val = val & 255;
      } else if (typeof val === "boolean") {
        val = Number(val);
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val)
        val = 0;
      let i;
      if (typeof val === "number") {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        const bytes = Buffer2.isBuffer(val) ? val : Buffer2.from(val, encoding);
        const len = bytes.length;
        if (len === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len];
        }
      }
      return this;
    };
    const errors = {};
    function E(sym, getMessage, Base) {
      errors[sym] = class NodeError extends Base {
        constructor() {
          super();
          Object.defineProperty(this, "message", {
            value: getMessage.apply(this, arguments),
            writable: true,
            configurable: true
          });
          this.name = `${this.name} [${sym}]`;
          this.stack;
          delete this.name;
        }
        get code() {
          return sym;
        }
        set code(value) {
          Object.defineProperty(this, "code", {
            configurable: true,
            enumerable: true,
            value,
            writable: true
          });
        }
        toString() {
          return `${this.name} [${sym}]: ${this.message}`;
        }
      };
    }
    E(
      "ERR_BUFFER_OUT_OF_BOUNDS",
      function(name) {
        if (name) {
          return `${name} is outside of buffer bounds`;
        }
        return "Attempt to access memory outside buffer bounds";
      },
      RangeError
    );
    E(
      "ERR_INVALID_ARG_TYPE",
      function(name, actual) {
        return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
      },
      TypeError
    );
    E(
      "ERR_OUT_OF_RANGE",
      function(str, range, input) {
        let msg = `The value of "${str}" is out of range.`;
        let received = input;
        if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
          received = addNumericalSeparator(String(input));
        } else if (typeof input === "bigint") {
          received = String(input);
          if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
            received = addNumericalSeparator(received);
          }
          received += "n";
        }
        msg += ` It must be ${range}. Received ${received}`;
        return msg;
      },
      RangeError
    );
    function addNumericalSeparator(val) {
      let res = "";
      let i = val.length;
      const start = val[0] === "-" ? 1 : 0;
      for (; i >= start + 4; i -= 3) {
        res = `_${val.slice(i - 3, i)}${res}`;
      }
      return `${val.slice(0, i)}${res}`;
    }
    function checkBounds(buf, offset, byteLength2) {
      validateNumber(offset, "offset");
      if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
        boundsError(offset, buf.length - (byteLength2 + 1));
      }
    }
    function checkIntBI(value, min, max, buf, offset, byteLength2) {
      if (value > max || value < min) {
        const n = typeof min === "bigint" ? "n" : "";
        let range;
        if (byteLength2 > 3) {
          if (min === 0 || min === BigInt(0)) {
            range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
          } else {
            range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
          }
        } else {
          range = `>= ${min}${n} and <= ${max}${n}`;
        }
        throw new errors.ERR_OUT_OF_RANGE("value", range, value);
      }
      checkBounds(buf, offset, byteLength2);
    }
    function validateNumber(value, name) {
      if (typeof value !== "number") {
        throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
      }
    }
    function boundsError(value, length, type) {
      if (Math.floor(value) !== value) {
        validateNumber(value, type);
        throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
      }
      if (length < 0) {
        throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
      }
      throw new errors.ERR_OUT_OF_RANGE(
        type || "offset",
        `>= ${type ? 1 : 0} and <= ${length}`,
        value
      );
    }
    const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
    function base64clean(str) {
      str = str.split("=")[0];
      str = str.trim().replace(INVALID_BASE64_RE, "");
      if (str.length < 2)
        return "";
      while (str.length % 4 !== 0) {
        str = str + "=";
      }
      return str;
    }
    function utf8ToBytes(string, units) {
      units = units || Infinity;
      let codePoint;
      const length = string.length;
      let leadSurrogate = null;
      const bytes = [];
      for (let i = 0; i < length; ++i) {
        codePoint = string.charCodeAt(i);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              continue;
            } else if (i + 1 === length) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0)
            break;
          bytes.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0)
            break;
          bytes.push(
            codePoint >> 6 | 192,
            codePoint & 63 | 128
          );
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0)
            break;
          bytes.push(
            codePoint >> 12 | 224,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0)
            break;
          bytes.push(
            codePoint >> 18 | 240,
            codePoint >> 12 & 63 | 128,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes;
    }
    function asciiToBytes(str) {
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        byteArray.push(str.charCodeAt(i) & 255);
      }
      return byteArray;
    }
    function utf16leToBytes(str, units) {
      let c, hi, lo;
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0)
          break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }
      return byteArray;
    }
    function base64ToBytes(str) {
      return base64.toByteArray(base64clean(str));
    }
    function blitBuffer(src, dst, offset, length) {
      let i;
      for (i = 0; i < length; ++i) {
        if (i + offset >= dst.length || i >= src.length)
          break;
        dst[i + offset] = src[i];
      }
      return i;
    }
    function isInstance(obj, type) {
      return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
    }
    function numberIsNaN(obj) {
      return obj !== obj;
    }
    const hexSliceLookupTable = function() {
      const alphabet = "0123456789abcdef";
      const table = new Array(256);
      for (let i = 0; i < 16; ++i) {
        const i16 = i * 16;
        for (let j = 0; j < 16; ++j) {
          table[i16 + j] = alphabet[i] + alphabet[j];
        }
      }
      return table;
    }();
    function defineBigIntMethod(fn) {
      return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
    }
    function BufferBigIntNotDefined() {
      throw new Error("BigInt not supported");
    }
  },
  924: (module, __unused_webpack_exports, __webpack_require__2) => {
    var GetIntrinsic = __webpack_require__2(210);
    var callBind = __webpack_require__2(559);
    var $indexOf = callBind(GetIntrinsic("String.prototype.indexOf"));
    module.exports = function callBoundIntrinsic(name, allowMissing) {
      var intrinsic = GetIntrinsic(name, !!allowMissing);
      if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
        return callBind(intrinsic);
      }
      return intrinsic;
    };
  },
  559: (module, __unused_webpack_exports, __webpack_require__2) => {
    var bind = __webpack_require__2(612);
    var GetIntrinsic = __webpack_require__2(210);
    var $apply = GetIntrinsic("%Function.prototype.apply%");
    var $call = GetIntrinsic("%Function.prototype.call%");
    var $reflectApply = GetIntrinsic("%Reflect.apply%", true) || bind.call($call, $apply);
    var $gOPD = GetIntrinsic("%Object.getOwnPropertyDescriptor%", true);
    var $defineProperty = GetIntrinsic("%Object.defineProperty%", true);
    var $max = GetIntrinsic("%Math.max%");
    if ($defineProperty) {
      try {
        $defineProperty({}, "a", { value: 1 });
      } catch (e) {
        $defineProperty = null;
      }
    }
    module.exports = function callBind(originalFunction) {
      var func = $reflectApply(bind, $call, arguments);
      if ($gOPD && $defineProperty) {
        var desc = $gOPD(func, "length");
        if (desc.configurable) {
          $defineProperty(
            func,
            "length",
            { value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
          );
        }
      }
      return func;
    };
    var applyBind = function applyBind2() {
      return $reflectApply(bind, $apply, arguments);
    };
    if ($defineProperty) {
      $defineProperty(module.exports, "apply", { value: applyBind });
    } else {
      module.exports.apply = applyBind;
    }
  },
  108: (module, __unused_webpack_exports, __webpack_require__2) => {
    var util2 = __webpack_require__2(539);
    var assert = __webpack_require__2(583);
    function now() {
      return new Date().getTime();
    }
    var slice = Array.prototype.slice;
    var console;
    var times = {};
    if (typeof __webpack_require__2.g !== "undefined" && __webpack_require__2.g.console) {
      console = __webpack_require__2.g.console;
    } else if (typeof window !== "undefined" && window.console) {
      console = window.console;
    } else {
      console = {};
    }
    var functions = [
      [log2, "log"],
      [info, "info"],
      [warn, "warn"],
      [error, "error"],
      [time, "time"],
      [timeEnd, "timeEnd"],
      [trace, "trace"],
      [dir, "dir"],
      [consoleAssert, "assert"]
    ];
    for (var i = 0; i < functions.length; i++) {
      var tuple = functions[i];
      var f = tuple[0];
      var name = tuple[1];
      if (!console[name]) {
        console[name] = f;
      }
    }
    module.exports = console;
    function log2() {
    }
    function info() {
      console.log.apply(console, arguments);
    }
    function warn() {
      console.log.apply(console, arguments);
    }
    function error() {
      console.warn.apply(console, arguments);
    }
    function time(label) {
      times[label] = now();
    }
    function timeEnd(label) {
      var time2 = times[label];
      if (!time2) {
        throw new Error("No such label: " + label);
      }
      delete times[label];
      var duration = now() - time2;
      console.log(label + ": " + duration + "ms");
    }
    function trace() {
      var err = new Error();
      err.name = "Trace";
      err.message = util2.format.apply(null, arguments);
      console.error(err.stack);
    }
    function dir(object) {
      console.log(util2.inspect(object) + "\n");
    }
    function consoleAssert(expression) {
      if (!expression) {
        var arr = slice.call(arguments, 1);
        assert.ok(false, util2.format.apply(null, arr));
      }
    }
  },
  29: (module, __unused_webpack_exports, __webpack_require__2) => {
    var isCallable = __webpack_require__2(320);
    var toStr = Object.prototype.toString;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var forEachArray = function forEachArray2(array, iterator, receiver) {
      for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
          if (receiver == null) {
            iterator(array[i], i, array);
          } else {
            iterator.call(receiver, array[i], i, array);
          }
        }
      }
    };
    var forEachString = function forEachString2(string, iterator, receiver) {
      for (var i = 0, len = string.length; i < len; i++) {
        if (receiver == null) {
          iterator(string.charAt(i), i, string);
        } else {
          iterator.call(receiver, string.charAt(i), i, string);
        }
      }
    };
    var forEachObject = function forEachObject2(object, iterator, receiver) {
      for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
          if (receiver == null) {
            iterator(object[k], k, object);
          } else {
            iterator.call(receiver, object[k], k, object);
          }
        }
      }
    };
    var forEach = function forEach2(list, iterator, thisArg) {
      if (!isCallable(iterator)) {
        throw new TypeError("iterator must be a function");
      }
      var receiver;
      if (arguments.length >= 3) {
        receiver = thisArg;
      }
      if (toStr.call(list) === "[object Array]") {
        forEachArray(list, iterator, receiver);
      } else if (typeof list === "string") {
        forEachString(list, iterator, receiver);
      } else {
        forEachObject(list, iterator, receiver);
      }
    };
    module.exports = forEach;
  },
  648: (module) => {
    var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
    var slice = Array.prototype.slice;
    var toStr = Object.prototype.toString;
    var funcType = "[object Function]";
    module.exports = function bind(that) {
      var target = this;
      if (typeof target !== "function" || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
      }
      var args = slice.call(arguments, 1);
      var bound;
      var binder = function() {
        if (this instanceof bound) {
          var result = target.apply(
            this,
            args.concat(slice.call(arguments))
          );
          if (Object(result) === result) {
            return result;
          }
          return this;
        } else {
          return target.apply(
            that,
            args.concat(slice.call(arguments))
          );
        }
      };
      var boundLength = Math.max(0, target.length - args.length);
      var boundArgs = [];
      for (var i = 0; i < boundLength; i++) {
        boundArgs.push("$" + i);
      }
      bound = Function("binder", "return function (" + boundArgs.join(",") + "){ return binder.apply(this,arguments); }")(binder);
      if (target.prototype) {
        var Empty = function Empty2() {
        };
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }
      return bound;
    };
  },
  612: (module, __unused_webpack_exports, __webpack_require__2) => {
    var implementation = __webpack_require__2(648);
    module.exports = Function.prototype.bind || implementation;
  },
  210: (module, __unused_webpack_exports, __webpack_require__2) => {
    var undefined2;
    var $SyntaxError = SyntaxError;
    var $Function = Function;
    var $TypeError = TypeError;
    var getEvalledConstructor = function(expressionSyntax) {
      try {
        return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
      } catch (e) {
      }
    };
    var $gOPD = Object.getOwnPropertyDescriptor;
    if ($gOPD) {
      try {
        $gOPD({}, "");
      } catch (e) {
        $gOPD = null;
      }
    }
    var throwTypeError = function() {
      throw new $TypeError();
    };
    var ThrowTypeError = $gOPD ? function() {
      try {
        arguments.callee;
        return throwTypeError;
      } catch (calleeThrows) {
        try {
          return $gOPD(arguments, "callee").get;
        } catch (gOPDthrows) {
          return throwTypeError;
        }
      }
    }() : throwTypeError;
    var hasSymbols = __webpack_require__2(405)();
    var hasProto = __webpack_require__2(185)();
    var getProto = Object.getPrototypeOf || (hasProto ? function(x) {
      return x.__proto__;
    } : null);
    var needsEval = {};
    var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined2 : getProto(Uint8Array);
    var INTRINSICS = {
      "%AggregateError%": typeof AggregateError === "undefined" ? undefined2 : AggregateError,
      "%Array%": Array,
      "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
      "%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined2,
      "%AsyncFromSyncIteratorPrototype%": undefined2,
      "%AsyncFunction%": needsEval,
      "%AsyncGenerator%": needsEval,
      "%AsyncGeneratorFunction%": needsEval,
      "%AsyncIteratorPrototype%": needsEval,
      "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
      "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
      "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined2 : BigInt64Array,
      "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined2 : BigUint64Array,
      "%Boolean%": Boolean,
      "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
      "%Date%": Date,
      "%decodeURI%": decodeURI,
      "%decodeURIComponent%": decodeURIComponent,
      "%encodeURI%": encodeURI,
      "%encodeURIComponent%": encodeURIComponent,
      "%Error%": Error,
      "%eval%": eval,
      "%EvalError%": EvalError,
      "%Float32Array%": typeof Float32Array === "undefined" ? undefined2 : Float32Array,
      "%Float64Array%": typeof Float64Array === "undefined" ? undefined2 : Float64Array,
      "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined2 : FinalizationRegistry,
      "%Function%": $Function,
      "%GeneratorFunction%": needsEval,
      "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
      "%Int16Array%": typeof Int16Array === "undefined" ? undefined2 : Int16Array,
      "%Int32Array%": typeof Int32Array === "undefined" ? undefined2 : Int32Array,
      "%isFinite%": isFinite,
      "%isNaN%": isNaN,
      "%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined2,
      "%JSON%": typeof JSON === "object" ? JSON : undefined2,
      "%Map%": typeof Map === "undefined" ? undefined2 : Map,
      "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
      "%Math%": Math,
      "%Number%": Number,
      "%Object%": Object,
      "%parseFloat%": parseFloat,
      "%parseInt%": parseInt,
      "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
      "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
      "%RangeError%": RangeError,
      "%ReferenceError%": ReferenceError,
      "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
      "%RegExp%": RegExp,
      "%Set%": typeof Set === "undefined" ? undefined2 : Set,
      "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
      "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
      "%String%": String,
      "%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined2,
      "%Symbol%": hasSymbols ? Symbol : undefined2,
      "%SyntaxError%": $SyntaxError,
      "%ThrowTypeError%": ThrowTypeError,
      "%TypedArray%": TypedArray,
      "%TypeError%": $TypeError,
      "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
      "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray,
      "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
      "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
      "%URIError%": URIError,
      "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
      "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
      "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet
    };
    if (getProto) {
      try {
        null.error;
      } catch (e) {
        var errorProto = getProto(getProto(e));
        INTRINSICS["%Error.prototype%"] = errorProto;
      }
    }
    var doEval = function doEval2(name) {
      var value;
      if (name === "%AsyncFunction%") {
        value = getEvalledConstructor("async function () {}");
      } else if (name === "%GeneratorFunction%") {
        value = getEvalledConstructor("function* () {}");
      } else if (name === "%AsyncGeneratorFunction%") {
        value = getEvalledConstructor("async function* () {}");
      } else if (name === "%AsyncGenerator%") {
        var fn = doEval2("%AsyncGeneratorFunction%");
        if (fn) {
          value = fn.prototype;
        }
      } else if (name === "%AsyncIteratorPrototype%") {
        var gen = doEval2("%AsyncGenerator%");
        if (gen && getProto) {
          value = getProto(gen.prototype);
        }
      }
      INTRINSICS[name] = value;
      return value;
    };
    var LEGACY_ALIASES = {
      "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
      "%ArrayPrototype%": ["Array", "prototype"],
      "%ArrayProto_entries%": ["Array", "prototype", "entries"],
      "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
      "%ArrayProto_keys%": ["Array", "prototype", "keys"],
      "%ArrayProto_values%": ["Array", "prototype", "values"],
      "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
      "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
      "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
      "%BooleanPrototype%": ["Boolean", "prototype"],
      "%DataViewPrototype%": ["DataView", "prototype"],
      "%DatePrototype%": ["Date", "prototype"],
      "%ErrorPrototype%": ["Error", "prototype"],
      "%EvalErrorPrototype%": ["EvalError", "prototype"],
      "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
      "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
      "%FunctionPrototype%": ["Function", "prototype"],
      "%Generator%": ["GeneratorFunction", "prototype"],
      "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
      "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
      "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
      "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
      "%JSONParse%": ["JSON", "parse"],
      "%JSONStringify%": ["JSON", "stringify"],
      "%MapPrototype%": ["Map", "prototype"],
      "%NumberPrototype%": ["Number", "prototype"],
      "%ObjectPrototype%": ["Object", "prototype"],
      "%ObjProto_toString%": ["Object", "prototype", "toString"],
      "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
      "%PromisePrototype%": ["Promise", "prototype"],
      "%PromiseProto_then%": ["Promise", "prototype", "then"],
      "%Promise_all%": ["Promise", "all"],
      "%Promise_reject%": ["Promise", "reject"],
      "%Promise_resolve%": ["Promise", "resolve"],
      "%RangeErrorPrototype%": ["RangeError", "prototype"],
      "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
      "%RegExpPrototype%": ["RegExp", "prototype"],
      "%SetPrototype%": ["Set", "prototype"],
      "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
      "%StringPrototype%": ["String", "prototype"],
      "%SymbolPrototype%": ["Symbol", "prototype"],
      "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
      "%TypedArrayPrototype%": ["TypedArray", "prototype"],
      "%TypeErrorPrototype%": ["TypeError", "prototype"],
      "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
      "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
      "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
      "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
      "%URIErrorPrototype%": ["URIError", "prototype"],
      "%WeakMapPrototype%": ["WeakMap", "prototype"],
      "%WeakSetPrototype%": ["WeakSet", "prototype"]
    };
    var bind = __webpack_require__2(612);
    var hasOwn = __webpack_require__2(642);
    var $concat = bind.call(Function.call, Array.prototype.concat);
    var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
    var $replace = bind.call(Function.call, String.prototype.replace);
    var $strSlice = bind.call(Function.call, String.prototype.slice);
    var $exec = bind.call(Function.call, RegExp.prototype.exec);
    var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = function stringToPath2(string) {
      var first = $strSlice(string, 0, 1);
      var last = $strSlice(string, -1);
      if (first === "%" && last !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
      } else if (last === "%" && first !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
      }
      var result = [];
      $replace(string, rePropName, function(match, number, quote, subString) {
        result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
      });
      return result;
    };
    var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
      var intrinsicName = name;
      var alias;
      if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
        alias = LEGACY_ALIASES[intrinsicName];
        intrinsicName = "%" + alias[0] + "%";
      }
      if (hasOwn(INTRINSICS, intrinsicName)) {
        var value = INTRINSICS[intrinsicName];
        if (value === needsEval) {
          value = doEval(intrinsicName);
        }
        if (typeof value === "undefined" && !allowMissing) {
          throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
        }
        return {
          alias,
          name: intrinsicName,
          value
        };
      }
      throw new $SyntaxError("intrinsic " + name + " does not exist!");
    };
    module.exports = function GetIntrinsic(name, allowMissing) {
      if (typeof name !== "string" || name.length === 0) {
        throw new $TypeError("intrinsic name must be a non-empty string");
      }
      if (arguments.length > 1 && typeof allowMissing !== "boolean") {
        throw new $TypeError('"allowMissing" argument must be a boolean');
      }
      if ($exec(/^%?[^%]*%?$/, name) === null) {
        throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
      }
      var parts = stringToPath(name);
      var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
      var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
      var intrinsicRealName = intrinsic.name;
      var value = intrinsic.value;
      var skipFurtherCaching = false;
      var alias = intrinsic.alias;
      if (alias) {
        intrinsicBaseName = alias[0];
        $spliceApply(parts, $concat([0, 1], alias));
      }
      for (var i = 1, isOwn = true; i < parts.length; i += 1) {
        var part = parts[i];
        var first = $strSlice(part, 0, 1);
        var last = $strSlice(part, -1);
        if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
          throw new $SyntaxError("property names with quotes must have matching quotes");
        }
        if (part === "constructor" || !isOwn) {
          skipFurtherCaching = true;
        }
        intrinsicBaseName += "." + part;
        intrinsicRealName = "%" + intrinsicBaseName + "%";
        if (hasOwn(INTRINSICS, intrinsicRealName)) {
          value = INTRINSICS[intrinsicRealName];
        } else if (value != null) {
          if (!(part in value)) {
            if (!allowMissing) {
              throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
            }
            return void 0;
          }
          if ($gOPD && i + 1 >= parts.length) {
            var desc = $gOPD(value, part);
            isOwn = !!desc;
            if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
              value = desc.get;
            } else {
              value = value[part];
            }
          } else {
            isOwn = hasOwn(value, part);
            value = value[part];
          }
          if (isOwn && !skipFurtherCaching) {
            INTRINSICS[intrinsicRealName] = value;
          }
        }
      }
      return value;
    };
  },
  296: (module, __unused_webpack_exports, __webpack_require__2) => {
    var GetIntrinsic = __webpack_require__2(210);
    var $gOPD = GetIntrinsic("%Object.getOwnPropertyDescriptor%", true);
    if ($gOPD) {
      try {
        $gOPD([], "length");
      } catch (e) {
        $gOPD = null;
      }
    }
    module.exports = $gOPD;
  },
  185: (module) => {
    var test = {
      foo: {}
    };
    var $Object = Object;
    module.exports = function hasProto() {
      return { __proto__: test }.foo === test.foo && !({ __proto__: null } instanceof $Object);
    };
  },
  405: (module, __unused_webpack_exports, __webpack_require__2) => {
    var origSymbol = typeof Symbol !== "undefined" && Symbol;
    var hasSymbolSham = __webpack_require__2(419);
    module.exports = function hasNativeSymbols() {
      if (typeof origSymbol !== "function") {
        return false;
      }
      if (typeof Symbol !== "function") {
        return false;
      }
      if (typeof origSymbol("foo") !== "symbol") {
        return false;
      }
      if (typeof Symbol("bar") !== "symbol") {
        return false;
      }
      return hasSymbolSham();
    };
  },
  419: (module) => {
    module.exports = function hasSymbols() {
      if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
        return false;
      }
      if (typeof Symbol.iterator === "symbol") {
        return true;
      }
      var obj = {};
      var sym = Symbol("test");
      var symObj = Object(sym);
      if (typeof sym === "string") {
        return false;
      }
      if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
        return false;
      }
      if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
        return false;
      }
      var symVal = 42;
      obj[sym] = symVal;
      for (sym in obj) {
        return false;
      }
      if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
        return false;
      }
      if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
        return false;
      }
      var syms = Object.getOwnPropertySymbols(obj);
      if (syms.length !== 1 || syms[0] !== sym) {
        return false;
      }
      if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
        return false;
      }
      if (typeof Object.getOwnPropertyDescriptor === "function") {
        var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
        if (descriptor.value !== symVal || descriptor.enumerable !== true) {
          return false;
        }
      }
      return true;
    };
  },
  410: (module, __unused_webpack_exports, __webpack_require__2) => {
    var hasSymbols = __webpack_require__2(419);
    module.exports = function hasToStringTagShams() {
      return hasSymbols() && !!Symbol.toStringTag;
    };
  },
  642: (module, __unused_webpack_exports, __webpack_require__2) => {
    var bind = __webpack_require__2(612);
    module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);
  },
  645: (__unused_webpack_module, exports) => {
    exports.read = function(buffer, offset, isLE, mLen, nBytes) {
      var e, m;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE ? nBytes - 1 : 0;
      var d = isLE ? -1 : 1;
      var s = buffer[offset + i];
      i += d;
      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
      } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    };
    exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
      var e, m, c;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE ? 0 : nBytes - 1;
      var d = isLE ? 1 : -1;
      var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }
      for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
      }
      e = e << mLen | m;
      eLen += mLen;
      for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
      }
      buffer[offset + i - d] |= s * 128;
    };
  },
  717: (module) => {
    if (typeof Object.create === "function") {
      module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      };
    } else {
      module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function() {
          };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }
  },
  584: (module, __unused_webpack_exports, __webpack_require__2) => {
    var hasToStringTag = __webpack_require__2(410)();
    var callBound = __webpack_require__2(924);
    var $toString = callBound("Object.prototype.toString");
    var isStandardArguments = function isArguments(value) {
      if (hasToStringTag && value && typeof value === "object" && Symbol.toStringTag in value) {
        return false;
      }
      return $toString(value) === "[object Arguments]";
    };
    var isLegacyArguments = function isArguments(value) {
      if (isStandardArguments(value)) {
        return true;
      }
      return value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && $toString(value) !== "[object Array]" && $toString(value.callee) === "[object Function]";
    };
    var supportsStandardArguments = function() {
      return isStandardArguments(arguments);
    }();
    isStandardArguments.isLegacyArguments = isLegacyArguments;
    module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;
  },
  320: (module) => {
    var fnToStr = Function.prototype.toString;
    var reflectApply = typeof Reflect === "object" && Reflect !== null && Reflect.apply;
    var badArrayLike;
    var isCallableMarker;
    if (typeof reflectApply === "function" && typeof Object.defineProperty === "function") {
      try {
        badArrayLike = Object.defineProperty({}, "length", {
          get: function() {
            throw isCallableMarker;
          }
        });
        isCallableMarker = {};
        reflectApply(function() {
          throw 42;
        }, null, badArrayLike);
      } catch (_) {
        if (_ !== isCallableMarker) {
          reflectApply = null;
        }
      }
    } else {
      reflectApply = null;
    }
    var constructorRegex = /^\s*class\b/;
    var isES6ClassFn = function isES6ClassFunction(value) {
      try {
        var fnStr = fnToStr.call(value);
        return constructorRegex.test(fnStr);
      } catch (e) {
        return false;
      }
    };
    var tryFunctionObject = function tryFunctionToStr(value) {
      try {
        if (isES6ClassFn(value)) {
          return false;
        }
        fnToStr.call(value);
        return true;
      } catch (e) {
        return false;
      }
    };
    var toStr = Object.prototype.toString;
    var objectClass = "[object Object]";
    var fnClass = "[object Function]";
    var genClass = "[object GeneratorFunction]";
    var ddaClass = "[object HTMLAllCollection]";
    var ddaClass2 = "[object HTML document.all class]";
    var ddaClass3 = "[object HTMLCollection]";
    var hasToStringTag = typeof Symbol === "function" && !!Symbol.toStringTag;
    var isIE68 = !(0 in [,]);
    var isDDA = function isDocumentDotAll() {
      return false;
    };
    if (typeof document === "object") {
      var all = document.all;
      if (toStr.call(all) === toStr.call(document.all)) {
        isDDA = function isDocumentDotAll(value) {
          if ((isIE68 || !value) && (typeof value === "undefined" || typeof value === "object")) {
            try {
              var str = toStr.call(value);
              return (str === ddaClass || str === ddaClass2 || str === ddaClass3 || str === objectClass) && value("") == null;
            } catch (e) {
            }
          }
          return false;
        };
      }
    }
    module.exports = reflectApply ? function isCallable(value) {
      if (isDDA(value)) {
        return true;
      }
      if (!value) {
        return false;
      }
      if (typeof value !== "function" && typeof value !== "object") {
        return false;
      }
      try {
        reflectApply(value, null, badArrayLike);
      } catch (e) {
        if (e !== isCallableMarker) {
          return false;
        }
      }
      return !isES6ClassFn(value) && tryFunctionObject(value);
    } : function isCallable(value) {
      if (isDDA(value)) {
        return true;
      }
      if (!value) {
        return false;
      }
      if (typeof value !== "function" && typeof value !== "object") {
        return false;
      }
      if (hasToStringTag) {
        return tryFunctionObject(value);
      }
      if (isES6ClassFn(value)) {
        return false;
      }
      var strClass = toStr.call(value);
      if (strClass !== fnClass && strClass !== genClass && !/^\[object HTML/.test(strClass)) {
        return false;
      }
      return tryFunctionObject(value);
    };
  },
  662: (module, __unused_webpack_exports, __webpack_require__2) => {
    var toStr = Object.prototype.toString;
    var fnToStr = Function.prototype.toString;
    var isFnRegex = /^\s*(?:function)?\*/;
    var hasToStringTag = __webpack_require__2(410)();
    var getProto = Object.getPrototypeOf;
    var getGeneratorFunc = function() {
      if (!hasToStringTag) {
        return false;
      }
      try {
        return Function("return function*() {}")();
      } catch (e) {
      }
    };
    var GeneratorFunction;
    module.exports = function isGeneratorFunction(fn) {
      if (typeof fn !== "function") {
        return false;
      }
      if (isFnRegex.test(fnToStr.call(fn))) {
        return true;
      }
      if (!hasToStringTag) {
        var str = toStr.call(fn);
        return str === "[object GeneratorFunction]";
      }
      if (!getProto) {
        return false;
      }
      if (typeof GeneratorFunction === "undefined") {
        var generatorFunc = getGeneratorFunc();
        GeneratorFunction = generatorFunc ? getProto(generatorFunc) : false;
      }
      return getProto(fn) === GeneratorFunction;
    };
  },
  692: (module, __unused_webpack_exports, __webpack_require__2) => {
    var whichTypedArray = __webpack_require__2(430);
    module.exports = function isTypedArray(value) {
      return !!whichTypedArray(value);
    };
  },
  418: (module) => {
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(val) {
      if (val === null || val === void 0) {
        throw new TypeError("Object.assign cannot be called with null or undefined");
      }
      return Object(val);
    }
    function shouldUseNative() {
      try {
        if (!Object.assign) {
          return false;
        }
        var test1 = new String("abc");
        test1[5] = "de";
        if (Object.getOwnPropertyNames(test1)[0] === "5") {
          return false;
        }
        var test2 = {};
        for (var i = 0; i < 10; i++) {
          test2["_" + String.fromCharCode(i)] = i;
        }
        var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
          return test2[n];
        });
        if (order2.join("") !== "0123456789") {
          return false;
        }
        var test3 = {};
        "abcdefghijklmnopqrst".split("").forEach(function(letter) {
          test3[letter] = letter;
        });
        if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    }
    module.exports = shouldUseNative() ? Object.assign : function(target, source) {
      var from;
      var to = toObject(target);
      var symbols;
      for (var s = 1; s < arguments.length; s++) {
        from = Object(arguments[s]);
        for (var key in from) {
          if (hasOwnProperty.call(from, key)) {
            to[key] = from[key];
          }
        }
        if (getOwnPropertySymbols) {
          symbols = getOwnPropertySymbols(from);
          for (var i = 0; i < symbols.length; i++) {
            if (propIsEnumerable.call(from, symbols[i])) {
              to[symbols[i]] = from[symbols[i]];
            }
          }
        }
      }
      return to;
    };
  },
  435: (__unused_webpack_module, exports) => {
    var __webpack_unused_export__;
    __webpack_unused_export__ = function() {
      return "LE";
    };
    __webpack_unused_export__ = function() {
      if (typeof location !== "undefined") {
        return location.hostname;
      } else
        return "";
    };
    __webpack_unused_export__ = function() {
      return [];
    };
    __webpack_unused_export__ = function() {
      return 0;
    };
    __webpack_unused_export__ = function() {
      return Number.MAX_VALUE;
    };
    __webpack_unused_export__ = function() {
      return Number.MAX_VALUE;
    };
    __webpack_unused_export__ = function() {
      return [];
    };
    __webpack_unused_export__ = function() {
      return "Browser";
    };
    __webpack_unused_export__ = function() {
      if (typeof navigator !== "undefined") {
        return navigator.appVersion;
      }
      return "";
    };
    __webpack_unused_export__ = __webpack_unused_export__ = function() {
      return {};
    };
    __webpack_unused_export__ = function() {
      return "javascript";
    };
    __webpack_unused_export__ = function() {
      return "browser";
    };
    __webpack_unused_export__ = __webpack_unused_export__ = function() {
      return "/tmp";
    };
    __webpack_unused_export__ = "\n";
    __webpack_unused_export__ = function() {
      return "/";
    };
  },
  155: (module) => {
    var process2 = module.exports = {};
    var cachedSetTimeout;
    var cachedClearTimeout;
    function defaultSetTimout() {
      throw new Error("setTimeout has not been defined");
    }
    function defaultClearTimeout() {
      throw new Error("clearTimeout has not been defined");
    }
    (function() {
      try {
        if (typeof setTimeout === "function") {
          cachedSetTimeout = setTimeout;
        } else {
          cachedSetTimeout = defaultSetTimout;
        }
      } catch (e) {
        cachedSetTimeout = defaultSetTimout;
      }
      try {
        if (typeof clearTimeout === "function") {
          cachedClearTimeout = clearTimeout;
        } else {
          cachedClearTimeout = defaultClearTimeout;
        }
      } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
      }
    })();
    function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) {
        return setTimeout(fun, 0);
      }
      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
      }
      try {
        return cachedSetTimeout(fun, 0);
      } catch (e) {
        try {
          return cachedSetTimeout.call(null, fun, 0);
        } catch (e2) {
          return cachedSetTimeout.call(this, fun, 0);
        }
      }
    }
    function runClearTimeout(marker) {
      if (cachedClearTimeout === clearTimeout) {
        return clearTimeout(marker);
      }
      if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
      }
      try {
        return cachedClearTimeout(marker);
      } catch (e) {
        try {
          return cachedClearTimeout.call(null, marker);
        } catch (e2) {
          return cachedClearTimeout.call(this, marker);
        }
      }
    }
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;
    function cleanUpNextTick() {
      if (!draining || !currentQueue) {
        return;
      }
      draining = false;
      if (currentQueue.length) {
        queue = currentQueue.concat(queue);
      } else {
        queueIndex = -1;
      }
      if (queue.length) {
        drainQueue();
      }
    }
    function drainQueue() {
      if (draining) {
        return;
      }
      var timeout = runTimeout(cleanUpNextTick);
      draining = true;
      var len = queue.length;
      while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
          if (currentQueue) {
            currentQueue[queueIndex].run();
          }
        }
        queueIndex = -1;
        len = queue.length;
      }
      currentQueue = null;
      draining = false;
      runClearTimeout(timeout);
    }
    process2.nextTick = function(fun) {
      var args = new Array(arguments.length - 1);
      if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
          args[i - 1] = arguments[i];
        }
      }
      queue.push(new Item(fun, args));
      if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
      }
    };
    function Item(fun, array) {
      this.fun = fun;
      this.array = array;
    }
    Item.prototype.run = function() {
      this.fun.apply(null, this.array);
    };
    process2.title = "browser";
    process2.browser = true;
    process2.env = {};
    process2.argv = [];
    process2.version = "";
    process2.versions = {};
    function noop() {
    }
    process2.on = noop;
    process2.addListener = noop;
    process2.once = noop;
    process2.off = noop;
    process2.removeListener = noop;
    process2.removeAllListeners = noop;
    process2.emit = noop;
    process2.prependListener = noop;
    process2.prependOnceListener = noop;
    process2.listeners = function(name) {
      return [];
    };
    process2.binding = function(name) {
      throw new Error("process.binding is not supported");
    };
    process2.cwd = function() {
      return "/";
    };
    process2.chdir = function(dir) {
      throw new Error("process.chdir is not supported");
    };
    process2.umask = function() {
      return 0;
    };
  },
  384: (module) => {
    module.exports = function isBuffer(arg) {
      return arg && typeof arg === "object" && typeof arg.copy === "function" && typeof arg.fill === "function" && typeof arg.readUInt8 === "function";
    };
  },
  955: (__unused_webpack_module, exports, __webpack_require__2) => {
    var isArgumentsObject = __webpack_require__2(584);
    var isGeneratorFunction = __webpack_require__2(662);
    var whichTypedArray = __webpack_require__2(430);
    var isTypedArray = __webpack_require__2(692);
    function uncurryThis(f) {
      return f.call.bind(f);
    }
    var BigIntSupported = typeof BigInt !== "undefined";
    var SymbolSupported = typeof Symbol !== "undefined";
    var ObjectToString = uncurryThis(Object.prototype.toString);
    var numberValue = uncurryThis(Number.prototype.valueOf);
    var stringValue = uncurryThis(String.prototype.valueOf);
    var booleanValue = uncurryThis(Boolean.prototype.valueOf);
    if (BigIntSupported) {
      var bigIntValue = uncurryThis(BigInt.prototype.valueOf);
    }
    if (SymbolSupported) {
      var symbolValue = uncurryThis(Symbol.prototype.valueOf);
    }
    function checkBoxedPrimitive(value, prototypeValueOf) {
      if (typeof value !== "object") {
        return false;
      }
      try {
        prototypeValueOf(value);
        return true;
      } catch (e) {
        return false;
      }
    }
    exports.isArgumentsObject = isArgumentsObject;
    exports.isGeneratorFunction = isGeneratorFunction;
    exports.isTypedArray = isTypedArray;
    function isPromise(input) {
      return typeof Promise !== "undefined" && input instanceof Promise || input !== null && typeof input === "object" && typeof input.then === "function" && typeof input.catch === "function";
    }
    exports.isPromise = isPromise;
    function isArrayBufferView(value) {
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        return ArrayBuffer.isView(value);
      }
      return isTypedArray(value) || isDataView(value);
    }
    exports.isArrayBufferView = isArrayBufferView;
    function isUint8Array(value) {
      return whichTypedArray(value) === "Uint8Array";
    }
    exports.isUint8Array = isUint8Array;
    function isUint8ClampedArray(value) {
      return whichTypedArray(value) === "Uint8ClampedArray";
    }
    exports.isUint8ClampedArray = isUint8ClampedArray;
    function isUint16Array(value) {
      return whichTypedArray(value) === "Uint16Array";
    }
    exports.isUint16Array = isUint16Array;
    function isUint32Array(value) {
      return whichTypedArray(value) === "Uint32Array";
    }
    exports.isUint32Array = isUint32Array;
    function isInt8Array(value) {
      return whichTypedArray(value) === "Int8Array";
    }
    exports.isInt8Array = isInt8Array;
    function isInt16Array(value) {
      return whichTypedArray(value) === "Int16Array";
    }
    exports.isInt16Array = isInt16Array;
    function isInt32Array(value) {
      return whichTypedArray(value) === "Int32Array";
    }
    exports.isInt32Array = isInt32Array;
    function isFloat32Array(value) {
      return whichTypedArray(value) === "Float32Array";
    }
    exports.isFloat32Array = isFloat32Array;
    function isFloat64Array(value) {
      return whichTypedArray(value) === "Float64Array";
    }
    exports.isFloat64Array = isFloat64Array;
    function isBigInt64Array(value) {
      return whichTypedArray(value) === "BigInt64Array";
    }
    exports.isBigInt64Array = isBigInt64Array;
    function isBigUint64Array(value) {
      return whichTypedArray(value) === "BigUint64Array";
    }
    exports.isBigUint64Array = isBigUint64Array;
    function isMapToString(value) {
      return ObjectToString(value) === "[object Map]";
    }
    isMapToString.working = typeof Map !== "undefined" && isMapToString(/* @__PURE__ */ new Map());
    function isMap(value) {
      if (typeof Map === "undefined") {
        return false;
      }
      return isMapToString.working ? isMapToString(value) : value instanceof Map;
    }
    exports.isMap = isMap;
    function isSetToString(value) {
      return ObjectToString(value) === "[object Set]";
    }
    isSetToString.working = typeof Set !== "undefined" && isSetToString(/* @__PURE__ */ new Set());
    function isSet(value) {
      if (typeof Set === "undefined") {
        return false;
      }
      return isSetToString.working ? isSetToString(value) : value instanceof Set;
    }
    exports.isSet = isSet;
    function isWeakMapToString(value) {
      return ObjectToString(value) === "[object WeakMap]";
    }
    isWeakMapToString.working = typeof WeakMap !== "undefined" && isWeakMapToString(/* @__PURE__ */ new WeakMap());
    function isWeakMap(value) {
      if (typeof WeakMap === "undefined") {
        return false;
      }
      return isWeakMapToString.working ? isWeakMapToString(value) : value instanceof WeakMap;
    }
    exports.isWeakMap = isWeakMap;
    function isWeakSetToString(value) {
      return ObjectToString(value) === "[object WeakSet]";
    }
    isWeakSetToString.working = typeof WeakSet !== "undefined" && isWeakSetToString(/* @__PURE__ */ new WeakSet());
    function isWeakSet(value) {
      return isWeakSetToString(value);
    }
    exports.isWeakSet = isWeakSet;
    function isArrayBufferToString(value) {
      return ObjectToString(value) === "[object ArrayBuffer]";
    }
    isArrayBufferToString.working = typeof ArrayBuffer !== "undefined" && isArrayBufferToString(new ArrayBuffer());
    function isArrayBuffer(value) {
      if (typeof ArrayBuffer === "undefined") {
        return false;
      }
      return isArrayBufferToString.working ? isArrayBufferToString(value) : value instanceof ArrayBuffer;
    }
    exports.isArrayBuffer = isArrayBuffer;
    function isDataViewToString(value) {
      return ObjectToString(value) === "[object DataView]";
    }
    isDataViewToString.working = typeof ArrayBuffer !== "undefined" && typeof DataView !== "undefined" && isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1));
    function isDataView(value) {
      if (typeof DataView === "undefined") {
        return false;
      }
      return isDataViewToString.working ? isDataViewToString(value) : value instanceof DataView;
    }
    exports.isDataView = isDataView;
    var SharedArrayBufferCopy = typeof SharedArrayBuffer !== "undefined" ? SharedArrayBuffer : void 0;
    function isSharedArrayBufferToString(value) {
      return ObjectToString(value) === "[object SharedArrayBuffer]";
    }
    function isSharedArrayBuffer(value) {
      if (typeof SharedArrayBufferCopy === "undefined") {
        return false;
      }
      if (typeof isSharedArrayBufferToString.working === "undefined") {
        isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
      }
      return isSharedArrayBufferToString.working ? isSharedArrayBufferToString(value) : value instanceof SharedArrayBufferCopy;
    }
    exports.isSharedArrayBuffer = isSharedArrayBuffer;
    function isAsyncFunction(value) {
      return ObjectToString(value) === "[object AsyncFunction]";
    }
    exports.isAsyncFunction = isAsyncFunction;
    function isMapIterator(value) {
      return ObjectToString(value) === "[object Map Iterator]";
    }
    exports.isMapIterator = isMapIterator;
    function isSetIterator(value) {
      return ObjectToString(value) === "[object Set Iterator]";
    }
    exports.isSetIterator = isSetIterator;
    function isGeneratorObject(value) {
      return ObjectToString(value) === "[object Generator]";
    }
    exports.isGeneratorObject = isGeneratorObject;
    function isWebAssemblyCompiledModule(value) {
      return ObjectToString(value) === "[object WebAssembly.Module]";
    }
    exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;
    function isNumberObject(value) {
      return checkBoxedPrimitive(value, numberValue);
    }
    exports.isNumberObject = isNumberObject;
    function isStringObject(value) {
      return checkBoxedPrimitive(value, stringValue);
    }
    exports.isStringObject = isStringObject;
    function isBooleanObject(value) {
      return checkBoxedPrimitive(value, booleanValue);
    }
    exports.isBooleanObject = isBooleanObject;
    function isBigIntObject(value) {
      return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
    }
    exports.isBigIntObject = isBigIntObject;
    function isSymbolObject(value) {
      return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
    }
    exports.isSymbolObject = isSymbolObject;
    function isBoxedPrimitive(value) {
      return isNumberObject(value) || isStringObject(value) || isBooleanObject(value) || isBigIntObject(value) || isSymbolObject(value);
    }
    exports.isBoxedPrimitive = isBoxedPrimitive;
    function isAnyArrayBuffer(value) {
      return typeof Uint8Array !== "undefined" && (isArrayBuffer(value) || isSharedArrayBuffer(value));
    }
    exports.isAnyArrayBuffer = isAnyArrayBuffer;
    ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(function(method) {
      Object.defineProperty(exports, method, {
        enumerable: false,
        value: function() {
          throw new Error(method + " is not supported in userland");
        }
      });
    });
  },
  539: (__unused_webpack_module, exports, __webpack_require__2) => {
    var process2 = __webpack_require__2(155);
    var console = __webpack_require__2(108);
    var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors2(obj) {
      var keys = Object.keys(obj);
      var descriptors = {};
      for (var i = 0; i < keys.length; i++) {
        descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
      }
      return descriptors;
    };
    var formatRegExp = /%[sdj%]/g;
    exports.format = function(f) {
      if (!isString(f)) {
        var objects = [];
        for (var i = 0; i < arguments.length; i++) {
          objects.push(inspect(arguments[i]));
        }
        return objects.join(" ");
      }
      var i = 1;
      var args = arguments;
      var len = args.length;
      var str = String(f).replace(formatRegExp, function(x2) {
        if (x2 === "%%")
          return "%";
        if (i >= len)
          return x2;
        switch (x2) {
          case "%s":
            return String(args[i++]);
          case "%d":
            return Number(args[i++]);
          case "%j":
            try {
              return JSON.stringify(args[i++]);
            } catch (_) {
              return "[Circular]";
            }
          default:
            return x2;
        }
      });
      for (var x = args[i]; i < len; x = args[++i]) {
        if (isNull(x) || !isObject(x)) {
          str += " " + x;
        } else {
          str += " " + inspect(x);
        }
      }
      return str;
    };
    exports.deprecate = function(fn, msg) {
      if (typeof process2 !== "undefined" && process2.noDeprecation === true) {
        return fn;
      }
      if (typeof process2 === "undefined") {
        return function() {
          return exports.deprecate(fn, msg).apply(this, arguments);
        };
      }
      var warned = false;
      function deprecated() {
        if (!warned) {
          if (process2.throwDeprecation) {
            throw new Error(msg);
          } else if (process2.traceDeprecation) {
            console.trace(msg);
          } else {
            console.error(msg);
          }
          warned = true;
        }
        return fn.apply(this, arguments);
      }
      return deprecated;
    };
    var debugs = {};
    var debugEnvRegex = /^$/;
    if (process2.env.NODE_DEBUG) {
      var debugEnv = process2.env.NODE_DEBUG;
      debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase();
      debugEnvRegex = new RegExp("^" + debugEnv + "$", "i");
    }
    exports.debuglog = function(set) {
      set = set.toUpperCase();
      if (!debugs[set]) {
        if (debugEnvRegex.test(set)) {
          var pid = process2.pid;
          debugs[set] = function() {
            var msg = exports.format.apply(exports, arguments);
            console.error("%s %d: %s", set, pid, msg);
          };
        } else {
          debugs[set] = function() {
          };
        }
      }
      return debugs[set];
    };
    function inspect(obj, opts) {
      var ctx = {
        seen: [],
        stylize: stylizeNoColor
      };
      if (arguments.length >= 3)
        ctx.depth = arguments[2];
      if (arguments.length >= 4)
        ctx.colors = arguments[3];
      if (isBoolean(opts)) {
        ctx.showHidden = opts;
      } else if (opts) {
        exports._extend(ctx, opts);
      }
      if (isUndefined(ctx.showHidden))
        ctx.showHidden = false;
      if (isUndefined(ctx.depth))
        ctx.depth = 2;
      if (isUndefined(ctx.colors))
        ctx.colors = false;
      if (isUndefined(ctx.customInspect))
        ctx.customInspect = true;
      if (ctx.colors)
        ctx.stylize = stylizeWithColor;
      return formatValue(ctx, obj, ctx.depth);
    }
    exports.inspect = inspect;
    inspect.colors = {
      "bold": [1, 22],
      "italic": [3, 23],
      "underline": [4, 24],
      "inverse": [7, 27],
      "white": [37, 39],
      "grey": [90, 39],
      "black": [30, 39],
      "blue": [34, 39],
      "cyan": [36, 39],
      "green": [32, 39],
      "magenta": [35, 39],
      "red": [31, 39],
      "yellow": [33, 39]
    };
    inspect.styles = {
      "special": "cyan",
      "number": "yellow",
      "boolean": "yellow",
      "undefined": "grey",
      "null": "bold",
      "string": "green",
      "date": "magenta",
      "regexp": "red"
    };
    function stylizeWithColor(str, styleType) {
      var style = inspect.styles[styleType];
      if (style) {
        return "\x1B[" + inspect.colors[style][0] + "m" + str + "\x1B[" + inspect.colors[style][1] + "m";
      } else {
        return str;
      }
    }
    function stylizeNoColor(str, styleType) {
      return str;
    }
    function arrayToHash(array) {
      var hash = {};
      array.forEach(function(val, idx) {
        hash[val] = true;
      });
      return hash;
    }
    function formatValue(ctx, value, recurseTimes) {
      if (ctx.customInspect && value && isFunction(value.inspect) && value.inspect !== exports.inspect && !(value.constructor && value.constructor.prototype === value)) {
        var ret = value.inspect(recurseTimes, ctx);
        if (!isString(ret)) {
          ret = formatValue(ctx, ret, recurseTimes);
        }
        return ret;
      }
      var primitive = formatPrimitive(ctx, value);
      if (primitive) {
        return primitive;
      }
      var keys = Object.keys(value);
      var visibleKeys = arrayToHash(keys);
      if (ctx.showHidden) {
        keys = Object.getOwnPropertyNames(value);
      }
      if (isError(value) && (keys.indexOf("message") >= 0 || keys.indexOf("description") >= 0)) {
        return formatError(value);
      }
      if (keys.length === 0) {
        if (isFunction(value)) {
          var name = value.name ? ": " + value.name : "";
          return ctx.stylize("[Function" + name + "]", "special");
        }
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
        }
        if (isDate(value)) {
          return ctx.stylize(Date.prototype.toString.call(value), "date");
        }
        if (isError(value)) {
          return formatError(value);
        }
      }
      var base = "", array = false, braces = ["{", "}"];
      if (isArray(value)) {
        array = true;
        braces = ["[", "]"];
      }
      if (isFunction(value)) {
        var n = value.name ? ": " + value.name : "";
        base = " [Function" + n + "]";
      }
      if (isRegExp(value)) {
        base = " " + RegExp.prototype.toString.call(value);
      }
      if (isDate(value)) {
        base = " " + Date.prototype.toUTCString.call(value);
      }
      if (isError(value)) {
        base = " " + formatError(value);
      }
      if (keys.length === 0 && (!array || value.length == 0)) {
        return braces[0] + base + braces[1];
      }
      if (recurseTimes < 0) {
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
        } else {
          return ctx.stylize("[Object]", "special");
        }
      }
      ctx.seen.push(value);
      var output;
      if (array) {
        output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
      } else {
        output = keys.map(function(key) {
          return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
        });
      }
      ctx.seen.pop();
      return reduceToSingleString(output, base, braces);
    }
    function formatPrimitive(ctx, value) {
      if (isUndefined(value))
        return ctx.stylize("undefined", "undefined");
      if (isString(value)) {
        var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
        return ctx.stylize(simple, "string");
      }
      if (isNumber(value))
        return ctx.stylize("" + value, "number");
      if (isBoolean(value))
        return ctx.stylize("" + value, "boolean");
      if (isNull(value))
        return ctx.stylize("null", "null");
    }
    function formatError(value) {
      return "[" + Error.prototype.toString.call(value) + "]";
    }
    function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
      var output = [];
      for (var i = 0, l = value.length; i < l; ++i) {
        if (hasOwnProperty(value, String(i))) {
          output.push(formatProperty(
            ctx,
            value,
            recurseTimes,
            visibleKeys,
            String(i),
            true
          ));
        } else {
          output.push("");
        }
      }
      keys.forEach(function(key) {
        if (!key.match(/^\d+$/)) {
          output.push(formatProperty(
            ctx,
            value,
            recurseTimes,
            visibleKeys,
            key,
            true
          ));
        }
      });
      return output;
    }
    function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
      var name, str, desc;
      desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
      if (desc.get) {
        if (desc.set) {
          str = ctx.stylize("[Getter/Setter]", "special");
        } else {
          str = ctx.stylize("[Getter]", "special");
        }
      } else {
        if (desc.set) {
          str = ctx.stylize("[Setter]", "special");
        }
      }
      if (!hasOwnProperty(visibleKeys, key)) {
        name = "[" + key + "]";
      }
      if (!str) {
        if (ctx.seen.indexOf(desc.value) < 0) {
          if (isNull(recurseTimes)) {
            str = formatValue(ctx, desc.value, null);
          } else {
            str = formatValue(ctx, desc.value, recurseTimes - 1);
          }
          if (str.indexOf("\n") > -1) {
            if (array) {
              str = str.split("\n").map(function(line) {
                return "  " + line;
              }).join("\n").slice(2);
            } else {
              str = "\n" + str.split("\n").map(function(line) {
                return "   " + line;
              }).join("\n");
            }
          }
        } else {
          str = ctx.stylize("[Circular]", "special");
        }
      }
      if (isUndefined(name)) {
        if (array && key.match(/^\d+$/)) {
          return str;
        }
        name = JSON.stringify("" + key);
        if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
          name = name.slice(1, -1);
          name = ctx.stylize(name, "name");
        } else {
          name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
          name = ctx.stylize(name, "string");
        }
      }
      return name + ": " + str;
    }
    function reduceToSingleString(output, base, braces) {
      var numLinesEst = 0;
      var length = output.reduce(function(prev, cur) {
        numLinesEst++;
        if (cur.indexOf("\n") >= 0)
          numLinesEst++;
        return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
      }, 0);
      if (length > 60) {
        return braces[0] + (base === "" ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
      }
      return braces[0] + base + " " + output.join(", ") + " " + braces[1];
    }
    exports.types = __webpack_require__2(955);
    function isArray(ar) {
      return Array.isArray(ar);
    }
    exports.isArray = isArray;
    function isBoolean(arg) {
      return typeof arg === "boolean";
    }
    exports.isBoolean = isBoolean;
    function isNull(arg) {
      return arg === null;
    }
    exports.isNull = isNull;
    function isNullOrUndefined(arg) {
      return arg == null;
    }
    exports.isNullOrUndefined = isNullOrUndefined;
    function isNumber(arg) {
      return typeof arg === "number";
    }
    exports.isNumber = isNumber;
    function isString(arg) {
      return typeof arg === "string";
    }
    exports.isString = isString;
    function isSymbol(arg) {
      return typeof arg === "symbol";
    }
    exports.isSymbol = isSymbol;
    function isUndefined(arg) {
      return arg === void 0;
    }
    exports.isUndefined = isUndefined;
    function isRegExp(re) {
      return isObject(re) && objectToString(re) === "[object RegExp]";
    }
    exports.isRegExp = isRegExp;
    exports.types.isRegExp = isRegExp;
    function isObject(arg) {
      return typeof arg === "object" && arg !== null;
    }
    exports.isObject = isObject;
    function isDate(d) {
      return isObject(d) && objectToString(d) === "[object Date]";
    }
    exports.isDate = isDate;
    exports.types.isDate = isDate;
    function isError(e) {
      return isObject(e) && (objectToString(e) === "[object Error]" || e instanceof Error);
    }
    exports.isError = isError;
    exports.types.isNativeError = isError;
    function isFunction(arg) {
      return typeof arg === "function";
    }
    exports.isFunction = isFunction;
    function isPrimitive(arg) {
      return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || typeof arg === "undefined";
    }
    exports.isPrimitive = isPrimitive;
    exports.isBuffer = __webpack_require__2(384);
    function objectToString(o) {
      return Object.prototype.toString.call(o);
    }
    function pad(n) {
      return n < 10 ? "0" + n.toString(10) : n.toString(10);
    }
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    function timestamp() {
      var d = new Date();
      var time = [
        pad(d.getHours()),
        pad(d.getMinutes()),
        pad(d.getSeconds())
      ].join(":");
      return [d.getDate(), months[d.getMonth()], time].join(" ");
    }
    exports.log = function() {
      console.log("%s - %s", timestamp(), exports.format.apply(exports, arguments));
    };
    exports.inherits = __webpack_require__2(717);
    exports._extend = function(origin, add) {
      if (!add || !isObject(add))
        return origin;
      var keys = Object.keys(add);
      var i = keys.length;
      while (i--) {
        origin[keys[i]] = add[keys[i]];
      }
      return origin;
    };
    function hasOwnProperty(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }
    var kCustomPromisifiedSymbol = typeof Symbol !== "undefined" ? Symbol("util.promisify.custom") : void 0;
    exports.promisify = function promisify(original) {
      if (typeof original !== "function")
        throw new TypeError('The "original" argument must be of type Function');
      if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
        var fn = original[kCustomPromisifiedSymbol];
        if (typeof fn !== "function") {
          throw new TypeError('The "util.promisify.custom" argument must be of type Function');
        }
        Object.defineProperty(fn, kCustomPromisifiedSymbol, {
          value: fn,
          enumerable: false,
          writable: false,
          configurable: true
        });
        return fn;
      }
      function fn() {
        var promiseResolve, promiseReject;
        var promise = new Promise(function(resolve, reject) {
          promiseResolve = resolve;
          promiseReject = reject;
        });
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
          args.push(arguments[i]);
        }
        args.push(function(err, value) {
          if (err) {
            promiseReject(err);
          } else {
            promiseResolve(value);
          }
        });
        try {
          original.apply(this, args);
        } catch (err) {
          promiseReject(err);
        }
        return promise;
      }
      Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
      if (kCustomPromisifiedSymbol)
        Object.defineProperty(fn, kCustomPromisifiedSymbol, {
          value: fn,
          enumerable: false,
          writable: false,
          configurable: true
        });
      return Object.defineProperties(
        fn,
        getOwnPropertyDescriptors(original)
      );
    };
    exports.promisify.custom = kCustomPromisifiedSymbol;
    function callbackifyOnRejected(reason, cb) {
      if (!reason) {
        var newReason = new Error("Promise was rejected with a falsy value");
        newReason.reason = reason;
        reason = newReason;
      }
      return cb(reason);
    }
    function callbackify(original) {
      if (typeof original !== "function") {
        throw new TypeError('The "original" argument must be of type Function');
      }
      function callbackified() {
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
          args.push(arguments[i]);
        }
        var maybeCb = args.pop();
        if (typeof maybeCb !== "function") {
          throw new TypeError("The last argument must be of type Function");
        }
        var self = this;
        var cb = function() {
          return maybeCb.apply(self, arguments);
        };
        original.apply(this, args).then(
          function(ret) {
            process2.nextTick(cb.bind(null, null, ret));
          },
          function(rej) {
            process2.nextTick(callbackifyOnRejected.bind(null, rej, cb));
          }
        );
      }
      Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
      Object.defineProperties(
        callbackified,
        getOwnPropertyDescriptors(original)
      );
      return callbackified;
    }
    exports.callbackify = callbackify;
  },
  430: (module, __unused_webpack_exports, __webpack_require__2) => {
    var forEach = __webpack_require__2(29);
    var availableTypedArrays = __webpack_require__2(83);
    var callBind = __webpack_require__2(559);
    var callBound = __webpack_require__2(924);
    var gOPD = __webpack_require__2(296);
    var $toString = callBound("Object.prototype.toString");
    var hasToStringTag = __webpack_require__2(410)();
    var g = typeof globalThis === "undefined" ? __webpack_require__2.g : globalThis;
    var typedArrays = availableTypedArrays();
    var $slice = callBound("String.prototype.slice");
    var getPrototypeOf = Object.getPrototypeOf;
    var $indexOf = callBound("Array.prototype.indexOf", true) || function indexOf(array, value) {
      for (var i = 0; i < array.length; i += 1) {
        if (array[i] === value) {
          return i;
        }
      }
      return -1;
    };
    var cache = { __proto__: null };
    if (hasToStringTag && gOPD && getPrototypeOf) {
      forEach(typedArrays, function(typedArray) {
        var arr = new g[typedArray]();
        if (Symbol.toStringTag in arr) {
          var proto = getPrototypeOf(arr);
          var descriptor = gOPD(proto, Symbol.toStringTag);
          if (!descriptor) {
            var superProto = getPrototypeOf(proto);
            descriptor = gOPD(superProto, Symbol.toStringTag);
          }
          cache["$" + typedArray] = callBind(descriptor.get);
        }
      });
    } else {
      forEach(typedArrays, function(typedArray) {
        var arr = new g[typedArray]();
        cache["$" + typedArray] = callBind(arr.slice);
      });
    }
    var tryTypedArrays = function tryAllTypedArrays(value) {
      var found = false;
      forEach(cache, function(getter, typedArray) {
        if (!found) {
          try {
            if ("$" + getter(value) === typedArray) {
              found = $slice(typedArray, 1);
            }
          } catch (e) {
          }
        }
      });
      return found;
    };
    var trySlices = function tryAllSlices(value) {
      var found = false;
      forEach(cache, function(getter, name) {
        if (!found) {
          try {
            getter(value);
            found = $slice(name, 1);
          } catch (e) {
          }
        }
      });
      return found;
    };
    module.exports = function whichTypedArray(value) {
      if (!value || typeof value !== "object") {
        return false;
      }
      if (!hasToStringTag) {
        var tag = $slice($toString(value), 8, -1);
        if ($indexOf(typedArrays, tag) > -1) {
          return tag;
        }
        if (tag !== "Object") {
          return false;
        }
        return trySlices(value);
      }
      if (!gOPD) {
        return null;
      }
      return tryTypedArrays(value);
    };
  },
  83: (module, __unused_webpack_exports, __webpack_require__2) => {
    var possibleNames = [
      "BigInt64Array",
      "BigUint64Array",
      "Float32Array",
      "Float64Array",
      "Int16Array",
      "Int32Array",
      "Int8Array",
      "Uint16Array",
      "Uint32Array",
      "Uint8Array",
      "Uint8ClampedArray"
    ];
    var g = typeof globalThis === "undefined" ? __webpack_require__2.g : globalThis;
    module.exports = function availableTypedArrays() {
      var out2 = [];
      for (var i = 0; i < possibleNames.length; i++) {
        if (typeof g[possibleNames[i]] === "function") {
          out2[out2.length] = possibleNames[i];
        }
      }
      return out2;
    };
  }
};
var __webpack_module_cache__ = {};
function __webpack_require__(moduleId) {
  var cachedModule = __webpack_module_cache__[moduleId];
  if (cachedModule !== void 0) {
    return cachedModule.exports;
  }
  var module = __webpack_module_cache__[moduleId] = {
    exports: {}
  };
  __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
  return module.exports;
}
(() => {
  __webpack_require__.d = (exports, definition) => {
    for (var key in definition) {
      if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
        Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
      }
    }
  };
})();
(() => {
  __webpack_require__.g = function() {
    if (typeof globalThis === "object")
      return globalThis;
    try {
      return this || new Function("return this")();
    } catch (e) {
      if (typeof window === "object")
        return window;
    }
  }();
})();
(() => {
  __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
})();
var __webpack_exports__ = {};
(() => {
  __webpack_require__.d(__webpack_exports__, {
    Z: () => server_workers
  });
  ;
  var env_process = __webpack_require__(155);
  var console = __webpack_require__(108);
  const defaults = new Map(
    Object.entries({
      WORKER_ENV: {
        type: "string",
        default: "development"
      },
      DENO_ENV: {
        type: "string",
        default: "development"
      },
      FASTLY_ENV: {
        type: "string",
        default: "development"
      },
      NODE_ENV: {
        type: "string",
        default: "development"
      },
      CLOUD_PLATFORM: {
        type: "string",
        default: "local"
      },
      BLOCKLIST_DOWNLOAD_ONLY: {
        type: "boolean",
        default: false
      },
      TLS_KEY_PATH: {
        type: "string",
        default: "test/data/tls/dns.rethinkdns.localhost.key"
      },
      TLS_CRT_PATH: {
        type: "string",
        default: "test/data/tls/dns.rethinkdns.localhost.crt"
      },
      TLS_OFFLOAD: {
        type: "boolean",
        default: false
      },
      LOG_LEVEL: {
        type: "string",
        default: "debug"
      },
      CF_ACCOUNT_ID: {
        type: "string",
        default: ""
      },
      CF_API_TOKEN: {
        type: "string",
        default: ""
      },
      CF_LOGPUSH_R2_ACCESS_KEY: {
        type: "string",
        default: ""
      },
      CF_LOGPUSH_R2_SECRET_KEY: {
        type: "string",
        default: ""
      },
      CF_LOGPUSH_R2_PATH: {
        type: "string",
        default: ""
      },
      CF_BLOCKLIST_URL: {
        type: "string",
        default: "https://cfstore.rethinkdns.com/blocklists/"
      },
      CF_DNS_RESOLVER_URL: {
        type: "string",
        default: "https://cloudflare-dns.com/dns-query"
      },
      CF_DNS_RESOLVER_URL_2: {
        type: "string",
        default: "https://dns.google/dns-query"
      },
      MAX_DNS_RESOLVER_URL: {
        type: "string",
        default: "https://max.rethinkdns.com/"
      },
      WORKER_TIMEOUT: {
        type: "number",
        default: "10000"
      },
      CF_BLOCKLIST_DOWNLOAD_TIMEOUT: {
        type: "number",
        default: "7500"
      },
      CACHE_TTL: {
        type: "number",
        default: "1800"
      },
      DISABLE_BLOCKLISTS: {
        type: "boolean",
        default: false
      },
      GEOIP_URL: {
        type: "string",
        default: "https://cfstore.rethinkdns.com/geoip/2022/1667349639157/"
      },
      BLOCK_SUBDOMAINS: {
        type: "boolean",
        default: true
      },
      PROFILE_DNS_RESOLVES: {
        type: "boolean",
        default: false
      },
      ACCESS_KEYS: {
        type: "csv",
        default: ""
      },
      NODE_AVOID_FETCH: {
        type: "boolean",
        default: false
      },
      NODE_DOH_ONLY: {
        type: "boolean",
        default: false
      },
      LOGPUSH_ENABLED: {
        type: "boolean",
        default: false
      },
      LOGPUSH_HOSTNAME_AS_LOGID: {
        type: "boolean",
        default: false
      },
      LOGPUSH_SRC: {
        type: "csv",
        default: ""
      },
      GW_IP4: {
        type: "string",
        default: ""
      },
      GW_IP6: {
        type: "string",
        default: ""
      }
    })
  );
  function caststr(x, typ) {
    if (typeof x === typ)
      return x;
    if (typ === "boolean") {
      return x === "true";
    } else if (typ === "number") {
      return Number(x);
    } else if (typ === "string") {
      return x && x + "" || "";
    } else if (typ === "csv" && x instanceof Set) {
      return x;
    } else if (typ === "csv" && typeof x === "string") {
      if (!x)
        return /* @__PURE__ */ new Set();
      return new Set(x.split(",").map((x2) => x2.trim()));
    } else {
      throw new Error(`unsupported type: ${typ}`);
    }
  }
  function _determineRuntime() {
    if (typeof fastly !== "undefined") {
      return "fastly";
    }
    if (typeof Deno !== "undefined") {
      return "deno";
    }
    if (globalThis.wenv)
      return "worker";
    if (typeof env_process !== "undefined") {
      if (env_process.env)
        return env_process.env.RUNTIME || "node";
    }
    return null;
  }
  class EnvManager {
    constructor() {
      this.runtime = _determineRuntime();
      this.envMap = /* @__PURE__ */ new Map();
      this.load();
    }
    load() {
      this.envMap = this.defaultEnv();
    }
    determineEnvStage() {
      if (this.runtime === "node")
        return this.get("NODE_ENV");
      if (this.runtime === "worker")
        return this.get("WORKER_ENV");
      if (this.runtime === "deno")
        return this.get("DENO_ENV");
      if (this.runtime === "fastly")
        return this.get("FASTLY_ENV");
      return null;
    }
    mostLikelyCloudPlatform() {
      const isDev = this.determineEnvStage() === "development";
      const hasFlyAllocId = this.get("FLY_ALLOC_ID") != null;
      const hasDenoDeployId = this.get("DENO_DEPLOYMENT_ID") != null;
      const hasWorkersUa = typeof navigator !== "undefined" && navigator.userAgent === "Cloudflare-Workers";
      if (hasFlyAllocId)
        return "fly";
      if (hasDenoDeployId)
        return "deno-deploy";
      if (hasWorkersUa)
        return "cloudflare";
      if (isDev)
        return "local";
      if (this.runtime === "node")
        return "fly";
      if (this.runtime === "deno")
        return "deno-deploy";
      if (this.runtime === "worker")
        return "cloudflare";
      if (this.runtime === "fastly")
        return "fastly";
      return null;
    }
    defaultEnv() {
      const env = /* @__PURE__ */ new Map();
      for (const [key, mappedKey] of defaults) {
        if (typeof mappedKey !== "object")
          continue;
        const type = mappedKey.type;
        const val = mappedKey.default;
        if (!type || val == null) {
          console.debug(key, "incomplete env val:", mappedKey);
          continue;
        }
        env.set(key, caststr(val, type));
      }
      env.set("CLOUD_PLATFORM", this.mostLikelyCloudPlatform());
      return env;
    }
    r() {
      return this.runtime;
    }
    get(k) {
      let v = null;
      if (this.runtime === "node") {
        v = env_process.env[k];
      } else if (this.runtime === "deno") {
        v = Deno.env.get(k);
      } else if (this.runtime === "fastly") {
        v = fastlyEnv.get(k);
      } else if (this.runtime === "worker") {
        v = globalThis.wenv[k];
      }
      if (v == null) {
        v = this.envMap.get(k);
      }
      const m = defaults.get(k);
      if (m && v == null)
        v = m.default;
      if (m && v != null)
        v = caststr(v, m.type);
      return v;
    }
    set(k, v, typ) {
      typ = typ || "string";
      this.envMap.set(k, caststr(v, typ));
    }
  }
  ;
  function fromBrowser(ua) {
    return ua && ua.startsWith("Mozilla/5.0");
  }
  function jsonHeaders() {
    return {
      "Content-Type": "application/json"
    };
  }
  function dnsHeaders() {
    return {
      "Accept": "application/dns-message",
      "Content-Type": "application/dns-message"
    };
  }
  function corsHeaders() {
    return {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
    };
  }
  function corsHeadersIfNeeded(ua) {
    return fromBrowser(ua) ? corsHeaders() : {};
  }
  function browserHeaders() {
    return Object.assign(jsonHeaders(), corsHeaders());
  }
  function dohHeaders(ua = "Mozilla/5.0") {
    return Object.assign(dnsHeaders(), corsHeadersIfNeeded(ua));
  }
  function contentLengthHeader(b) {
    const len2 = !b || !b.byteLength ? "0" : b.byteLength.toString();
    return { "Content-Length": len2 };
  }
  function concatHeaders(...args) {
    return concatObj(...args);
  }
  function rxidHeader(id) {
    return { "x-rethinkdns-rxid": id };
  }
  function rxidFromHeader(h) {
    if (!h || !h.get)
      return null;
    return h.get("x-rethinkdns-rxid");
  }
  function regionFromCf(req) {
    if (!req || !req.cf)
      return "";
    return req.cf.colo || "";
  }
  function copyHeaders(request) {
    const headers = {};
    if (!request || !request.headers)
      return headers;
    request.headers.forEach((val, name) => {
      headers[name] = val;
    });
    return headers;
  }
  function sleep(ms) {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(resolve, ms);
      } catch (e) {
        reject(e);
      }
    });
  }
  function objOf(map) {
    return map.entries ? Object.fromEntries(map) : {};
  }
  function timedOp(op, ms, cleanup = () => {
  }) {
    return new Promise((resolve, reject) => {
      let timedout = false;
      const tid = util_timeout(ms, () => {
        timedout = true;
        reject(new Error("timeout"));
      });
      try {
        op((out2, ex) => {
          if (timedout) {
            cleanup(out2);
            return;
          }
          clearTimeout(tid);
          if (ex) {
            cleanup(out2);
            reject(ex);
          } else {
            resolve(out2);
          }
        });
      } catch (e) {
        if (!timedout)
          reject(e);
      }
    });
  }
  function timedSafeAsyncOp(promisedOp, ms, defaultOp) {
    return new Promise((resolve, reject) => {
      let timedout = false;
      const deferredOp = () => {
        defaultOp().then((v) => {
          resolve(v);
        }).catch((e) => {
          reject(e);
        });
      };
      const tid = util_timeout(ms, () => {
        timedout = true;
        deferredOp();
      });
      promisedOp().then((out2) => {
        if (!timedout) {
          clearTimeout(tid);
          resolve(out2);
        }
      }).catch((ignored) => {
        if (!timedout)
          deferredOp();
      });
    });
  }
  function util_timeout(ms, fn) {
    if (typeof fn !== "function")
      return -1;
    const timer = setTimeout(fn, ms);
    if (typeof timer.unref === "function")
      timer.unref();
    return timer;
  }
  function repeat(ms, fn) {
    if (typeof fn !== "function")
      return -1;
    setImmediate(fn);
    const timer = setInterval(fn, ms);
    if (typeof timer.unref === "function")
      timer.unref();
    return timer;
  }
  function rand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  function rolldice(sides = 6) {
    return rand(1, sides + 1);
  }
  function uid(prefix = "") {
    return prefix + (Math.random() + 1).toString(36).slice(1);
  }
  function xid() {
    const hi = vmid();
    const lo = uid();
    return hi + lo;
  }
  function uidFromXidOrRxid(id) {
    if (emptyString(id))
      return "";
    const uidStartChar = id.lastIndexOf(".");
    const rxidEndChar = id.lastIndexOf("]");
    const p = uidStartChar;
    const q = rxidEndChar < 0 ? id.length : rxidEndChar;
    if (p < 0 || p >= id.length - 1 || q <= p)
      return "";
    return id.slice(p + 1, q);
  }
  let _vmid = "0";
  function vmid() {
    if (_vmid === "0")
      _vmid = uid().slice(1);
    return _vmid;
  }
  function isDohGetRequest(queryString) {
    return queryString && queryString.has("dns");
  }
  function util_isDnsMsg(req) {
    return req.headers.get("Accept") === "application/dns-message" || req.headers.get("Content-Type") === "application/dns-message";
  }
  function mapOf(obj) {
    return new Map(Object.entries(obj));
  }
  function isAlphaNumeric(str) {
    return /^[a-z0-9]+$/i.test(str);
  }
  function isDNSName(str) {
    return /^[a-z0-9\.-]+$/i.test(str);
  }
  function strstr(str, start = 0, end = str.length) {
    if (emptyString(str))
      return str;
    if (start >= str.length)
      return "";
    if (end <= start)
      return "";
    start = start < 0 ? 0 : start;
    end = end > str.length ? str.length : end;
    return str.slice(start, end);
  }
  function emptySet(s) {
    if (!s)
      return true;
    if (s instanceof Set)
      return s.size <= 0;
    return true;
  }
  function emptyString(str) {
    if (!str)
      return true;
    if (typeof str !== "string")
      return false;
    return str.trim().length === 0;
  }
  function emptyArray(a) {
    if (!a)
      return true;
    if (typeof a !== "object")
      return false;
    if (!a.hasOwnProperty("length"))
      return false;
    return a.length <= 0;
  }
  function concatObj(...args) {
    return Object.assign(...args);
  }
  function emptyObj(x) {
    if (!x)
      return true;
    return Object.keys(x).length === 0 && Object.getPrototypeOf(x) === Object.prototype;
  }
  function emptyMap(m) {
    if (!m)
      return true;
    return m.size === 0;
  }
  function isIterable(obj) {
    if (obj == null)
      return false;
    return typeof obj[Symbol.iterator] === "function";
  }
  function respond204() {
    return new Response(null, {
      status: 204,
      headers: corsHeaders()
    });
  }
  function respond400() {
    return new Response(null, {
      status: 400,
      statusText: "Bad Request",
      headers: dohHeaders()
    });
  }
  function respond401() {
    return new Response(null, {
      status: 401,
      statusText: "Authorization Required",
      headers: dohHeaders()
    });
  }
  function respond405() {
    return new Response(null, {
      status: 405,
      statusText: "Method Not Allowed",
      headers: dohHeaders()
    });
  }
  function respond408() {
    return new Response(null, {
      status: 408,
      headers: dohHeaders()
    });
  }
  function respond503() {
    return new Response(null, {
      status: 503,
      headers: dohHeaders()
    });
  }
  function logger(...tags) {
    if (!log)
      return null;
    return log.withTags(...tags);
  }
  function isPostRequest(req) {
    return req && !emptyString(req.method) && req.method.toUpperCase() === "POST";
  }
  function isGetRequest(req) {
    return req && !emptyString(req.method) && req.method.toUpperCase() === "GET";
  }
  function fromPath(strurl, re) {
    const empty = "";
    if (emptyString(strurl))
      return empty;
    if (!(re instanceof RegExp)) {
      throw new Error(`invalid arg: ${re} must be RegExp`);
    }
    const u = new URL(strurl);
    const p = u.pathname.split("/");
    for (const x of p) {
      const m = x.match(re);
      if (m != null && m.length > 0) {
        return strstr(x, m[0].length);
      }
    }
    return empty;
  }
  function isGatewayRequest(req) {
    if (!req || emptyString(req.url))
      return false;
    const u = new URL(req.url);
    const paths = u.pathname.split("/");
    for (const p of paths) {
      if (isGatewayQuery(p))
        return true;
    }
    return false;
  }
  function isDnsQuery(p) {
    return p === "dns-query";
  }
  function isGatewayQuery(p) {
    return p === "gateway";
  }
  function isNumeric4(str) {
    return /^[0-9.]+$/.test(str);
  }
  function isHex6(str) {
    return /^[a-f0-9:.]+$/i.test(str);
  }
  function maybeIP6(str) {
    return !emptyString(str) && str.split(":").length > 3 && isHex6(str);
  }
  function maybeIP4(str) {
    return !emptyString(str) && str.split(".").length === 4 && isNumeric4(str);
  }
  function maybeIP(str) {
    return maybeIP4(str) || maybeIP6(str);
  }
  function* domains(urlOrHost) {
    if (emptyString(urlOrHost))
      return "";
    let hostname = urlOrHost;
    if (urlOrHost.indexOf(":") > -1 || urlOrHost.indexOf("/") > -1) {
      const u = new URL(urlOrHost);
      hostname = u.hostname;
    }
    const d2 = hostname.split(".");
    for (let i2 = 0; i2 < d2.length; i2++) {
      yield d2.slice(i2).join(".");
    }
  }
  function tld(urlstr, upto = 2, d2 = ".") {
    if (emptyString(urlstr))
      return "";
    if (!urlstr.includes("://"))
      urlstr = "http://" + urlstr;
    const u = new URL(urlstr);
    return u.hostname.split(".").slice(-upto).join(d2);
  }
  function bounds(n, min, max) {
    if (min > max) {
      const t2 = max;
      max = min;
      min = t2;
    }
    if (n < min)
      return min;
    if (n > max)
      return max;
    return n;
  }
  function mkFetchEvent(r, ...fns) {
    if (emptyObj(r))
      throw new Error("missing request");
    for (const f of fns) {
      if (f != null && typeof f !== "function")
        throw new Error("args mismatch");
    }
    return {
      type: "fetch",
      request: r,
      respondWith: fns[0] || stub("event.respondWith"),
      waitUntil: fns[1] || stub("event.waitUntil"),
      passThroughOnException: fns[2] || stub("event.passThroughOnException")
    };
  }
  function stub(...args) {
    return (...args2) => {
    };
  }
  function stubAsync(...args) {
    return async (...args2) => {
    };
  }
  ;
  const stickyEvents = /* @__PURE__ */ new Set([
    "prepare",
    "ready",
    "steady",
    "go"
  ]);
  const events = /* @__PURE__ */ new Set([
    "stop"
  ]);
  const listeners = /* @__PURE__ */ new Map();
  const waitGroup = /* @__PURE__ */ new Map();
  (() => {
    for (const e of events) {
      listeners.set(e, /* @__PURE__ */ new Set());
      waitGroup.set(e, /* @__PURE__ */ new Set());
    }
    for (const se of stickyEvents) {
      listeners.set(se, /* @__PURE__ */ new Set());
      waitGroup.set(se, /* @__PURE__ */ new Set());
    }
  })();
  function pub(event, parcel = void 0) {
    awaiters(event, parcel);
    callbacks(event, parcel);
  }
  function sub(event, cb) {
    const eventCallbacks = listeners.get(event);
    if (!eventCallbacks) {
      if (stickyEvents.has(event)) {
        microtaskBox(cb);
        return true;
      }
      return false;
    }
    eventCallbacks.add(cb);
    return true;
  }
  function when(event, timeout = 0) {
    const wg = waitGroup.get(event);
    if (!wg) {
      if (stickyEvents.has(event)) {
        return Promise.resolve(event);
      }
      return Promise.reject(new Error(event + " missing"));
    }
    return new Promise((accept, reject) => {
      const tid = timeout > 0 ? util_timeout(timeout, () => {
        reject(new Error(event + " elapsed " + timeout));
      }) : -2;
      const fulfiller = function(parcel) {
        if (tid >= 0)
          clearTimeout(tid);
        accept(parcel, event);
      };
      wg.add(fulfiller);
    });
  }
  function awaiters(event, parcel) {
    const g = waitGroup.get(event);
    if (!g)
      return;
    if (stickyEvents.has(event)) {
      waitGroup.delete(event);
    }
    safeBox(g, parcel);
  }
  function callbacks(event, parcel) {
    const cbs = listeners.get(event);
    if (!cbs)
      return;
    if (stickyEvents.has(event)) {
      listeners.delete(event);
    }
    microtaskBox(cbs, parcel);
  }
  function taskBox(fn) {
    util.timeout(0, () => safeBox(fn));
  }
  const taskboxPromise = { p: Promise.resolve() };
  function microtaskBox(fns, arg) {
    let enqueue = null;
    if (typeof queueMicrotask === "function") {
      enqueue = queueMicrotask;
    } else {
      enqueue = taskboxPromise.p.then.bind(taskboxPromise.p);
    }
    enqueue(() => safeBox(fns, arg));
  }
  function safeBox(fns, arg) {
    if (typeof fns === "function") {
      fns = [fns];
    }
    const r = [];
    if (!isIterable(fns)) {
      return r;
    }
    for (const f of fns) {
      if (typeof f !== "function") {
        r.push(null);
        continue;
      }
      try {
        r.push(f(arg));
      } catch (ignore) {
        r.push(null);
      }
    }
    return r;
  }
  ;
  var log_console = __webpack_require__(108);
  const LEVELS = /* @__PURE__ */ new Set(["error", "logpush", "warn", "info", "timer", "debug"]);
  function _setConsoleLevel(level) {
    switch (level) {
      case "error":
      case "logpush":
        globalThis.console.warn = stub();
      case "warn":
        globalThis.console.info = stub();
      case "info":
        globalThis.console.time = stub();
        globalThis.console.timeEnd = stub();
        globalThis.console.timeLog = stub();
      case "timer":
        globalThis.console.debug = stub();
      case "debug":
        break;
      default:
        log_console.error("Unknown console level: ", level);
        level = null;
    }
    if (level) {
      globalThis.console.level = level;
    }
    return level;
  }
  class Log {
    constructor({ level = "debug", levelize = false, withTimestamps = false }) {
      level = level.toLowerCase();
      if (!LEVELS.has(level))
        level = "debug";
      if (level === "logpush")
        levelize = true;
      if (levelize && !log_console.level)
        _setConsoleLevel(level);
      this.l = log_console.log;
      this.log = log_console.log;
      this.logTimestamps = withTimestamps;
      this.setLevel(level);
    }
    _resetLevel() {
      this.d = stub();
      this.debug = stub();
      this.lapTime = stub();
      this.startTime = stub();
      this.endTime = stub();
      this.i = stub();
      this.info = stub();
      this.w = stub();
      this.warn = stub();
      this.e = stub();
      this.error = stub();
    }
    withTags(...tags) {
      const that = this;
      return {
        lapTime: (n, ...r) => {
          return that.lapTime(n, ...tags, ...r);
        },
        startTime: (n, ...r) => {
          const tid = that.startTime(n);
          that.d(that.now() + " T", ...tags, "create", tid, ...r);
          return tid;
        },
        endTime: (n, ...r) => {
          that.d(that.now() + " T", ...tags, "end", n, ...r);
          return that.endTime(n);
        },
        d: (...args) => {
          that.d(that.now() + " D", ...tags, ...args);
        },
        i: (...args) => {
          that.i(that.now() + " I", ...tags, ...args);
        },
        w: (...args) => {
          that.w(that.now() + " W", ...tags, ...args);
        },
        e: (...args) => {
          that.e(that.now() + " E", ...tags, ...args);
        },
        q: (...args) => {
          that.l(that.now() + " Q", ...tags, ...args);
        },
        qStart: (...args) => {
          that.l(that.now() + " Q", ...tags, that.border());
          that.l(that.now() + " Q", ...tags, ...args);
        },
        qEnd: (...args) => {
          that.l(that.now() + " Q", ...tags, ...args);
          that.l(that.now() + " Q", ...tags, that.border());
        },
        tag: (t2) => {
          tags.push(t2);
        }
      };
    }
    now() {
      if (this.logTimestamps)
        return new Date().toISOString();
      else
        return "";
    }
    border() {
      return "-------------------------------";
    }
    setLevel(level) {
      level = level.toLowerCase();
      if (!LEVELS.has(level))
        throw new Error(`Unknown log level: ${level}`);
      this._resetLevel();
      switch (level) {
        default:
        case "debug":
          this.d = log_console.debug;
          this.debug = log_console.debug;
        case "timer":
          this.lapTime = log_console.timeLog || stub();
          this.startTime = function(name) {
            name = uid(name);
            if (log_console.time)
              log_console.time(name);
            return name;
          };
          this.endTime = log_console.timeEnd || stub();
        case "info":
          this.i = log_console.info;
          this.info = log_console.info;
        case "warn":
          this.w = log_console.warn;
          this.warn = log_console.warn;
        case "error":
        case "logpush":
          this.e = log_console.error;
          this.error = log_console.error;
      }
      log_console.debug("Log level set: ", level);
      this.level = level;
    }
  }
  ;
  const encNative = new TextEncoder();
  const decNative = new TextDecoder();
  const b8 = 8;
  const b6 = 6;
  const delim = "#";
  const underscore = "_";
  const period = ".";
  const numerals = "01234567890";
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const hyphen = "-";
  const asterix = "*";
  const validchars6 = delim + asterix + hyphen + period + numerals + alphabet + underscore;
  const memstat = { encode: 0, decode: 0, encode16: 0, decode16: 0 };
  const memencode = /* @__PURE__ */ new Map();
  const memencode16 = /* @__PURE__ */ new Map();
  const memdecode = /* @__PURE__ */ new Map();
  const memdecode16 = /* @__PURE__ */ new Map();
  const { map: ord6, rev: chr6 } = index6(validchars6);
  const { map: ord16, rev: chr16 } = index16();
  function index16() {
    return {
      map: { get: (c) => c.charCodeAt(0) },
      rev: { get: (n) => String.fromCharCode(n) }
    };
  }
  function index6(str) {
    const m = /* @__PURE__ */ new Map();
    const r = /* @__PURE__ */ new Map();
    let i2 = 0;
    for (const c of str) {
      m.set(c, i2);
      r.set(i2, c);
      i2 += 1;
    }
    return { map: m, rev: r };
  }
  class Codec {
    constructor(typ = 8) {
      this.typ = typ;
    }
    encode(str6or8, pool = false) {
      if (pool) {
        const u6or82 = memencode.get(str6or8);
        if (u6or82 != null) {
          memstat.encode += 1;
          return u6or82;
        }
      }
      const u6or8 = this.encodeinner(str6or8);
      if (pool)
        memencode.set(str6or8, u6or8);
      return u6or8;
    }
    decode(u6or8, pool = true) {
      let k = null;
      if (pool) {
        k = u6or8.join(",");
        const str6or82 = memdecode.get(k);
        if (str6or82 != null) {
          memstat.decode += 1;
          return str6or82;
        }
      }
      const str6or8 = this.decodeinner(u6or8);
      if (pool && k)
        memdecode.set(k, str6or8);
      return str6or8;
    }
    encodeinner(str6or8) {
      if (this.typ === b8) {
        const str8 = str6or8;
        return encNative.encode(str8);
      }
      const str6 = str6or8.toLowerCase();
      const u6 = new Uint8Array(str6.length);
      let i2 = 0;
      for (const c of str6) {
        const n = ord6.get(c);
        if (n != null) {
          u6[i2++] = n;
        } else {
          throw new Error(
            "encode: undef num: " + n + ", for: " + c + ", in: " + str6 + ", res: " + u6
          );
        }
      }
      return u6;
    }
    decodeinner(u6or8) {
      if (this.typ === b8) {
        const u8 = u6or8;
        return decNative.decode(u8);
      }
      const u6 = u6or8;
      let str6 = "";
      for (const i2 of u6) {
        const c = chr6.get(i2);
        if (c != null) {
          str6 += c;
        } else {
          throw new Error(
            "decode: undef char: " + c + ", for: " + i2 + ", in: " + u6 + ", res: " + str6
          );
        }
      }
      return str6;
    }
    encode16(str16, pool = true) {
      if (pool) {
        const u6or82 = memencode16.get(str16);
        if (u6or82 != null) {
          memstat.encode16 += 1;
          return u6or82;
        }
      }
      const u6or8 = this.encode16inner(str16);
      if (pool)
        memencode16.set(str16, u6or8);
      return u6or8;
    }
    decode16(u6or8, pool = true) {
      let k = null;
      if (pool) {
        k = u6or8.join(",");
        const str162 = memdecode16.get(k);
        if (str162 != null) {
          memstat.decode16 += 1;
          return str162;
        }
      }
      const str16 = this.decode16inner(u6or8);
      if (pool && k)
        memdecode16.set(k, str16);
      return str16;
    }
    encode16inner(str16) {
      if (this.typ === b8) {
        return this.encode(str16);
      }
      const W2 = 16;
      const n = 6;
      const mask = 2 ** n - 1;
      const len16 = str16.length;
      const len6 = Math.ceil(len16 * W2 / n);
      const u6 = new Uint8Array(len6);
      let bits = 0;
      let acc = 0;
      let j = 0;
      for (let i2 = 0; i2 < len16; i2 += 1) {
        acc = acc << W2 | ord16.get(str16[i2]);
        bits += W2;
        while (bits >= n) {
          u6[j++] = acc >>> bits - n & mask;
          bits -= n;
        }
      }
      if (bits > 0) {
        u6[j++] = acc << n - bits & mask;
      }
      return u6;
    }
    decode16inner(u6or8) {
      if (this.typ === b8) {
        return this.decode(u6or8);
      }
      const u6 = u6or8;
      const W2 = 6;
      const n = 16;
      const mask = 2 ** n - 1;
      const len6 = u6.length;
      let bits = 0;
      let acc = 0;
      let str16 = "";
      for (let i2 = 0; i2 < len6; i2 += 1) {
        acc = acc << W2 | u6[i2];
        bits += W2;
        if (bits >= n) {
          str16 += chr16.get(acc >>> bits - n & mask);
          bits -= n;
        }
      }
      if (bits > 0) {
        const rem = acc << n - bits & mask;
        if (rem !== 0)
          str16 += chr16.get(rem);
        bits -= bits;
      }
      return str16;
    }
    decode16raw(u6or8) {
      const str16 = this.decode16(u6or8);
      return str2buf(str16);
    }
    decode8(u6or8) {
      if (this.typ === b8) {
        return u6or8;
      }
      const W2 = 6;
      const n = 8;
      const mask = 2 ** n - 1;
      const u6 = u6or8;
      const len6 = u6.length;
      const len8 = Math.ceil(len6 * W2 / n);
      const u8 = new Uint8Array(len8);
      let bits = 0;
      let acc = 0;
      let j = 0;
      for (let i2 = 0; i2 < len6; i2 += 1) {
        acc = acc << W2 | u6[i2];
        bits += W2;
        if (bits >= n) {
          u8[j++] = acc >>> bits - n & mask;
          bits -= n;
        }
      }
      return u8.slice(0, j);
    }
    encode8(u6or8) {
      if (this.typ === b8) {
        return u6or8;
      }
      const W2 = 8;
      const n = 6;
      const u8 = u6or8;
      const mask = 2 ** n - 1;
      const len8 = u8.length;
      const len6 = Math.ceil(len8 * W2 / n);
      const u6 = new Uint8Array(len6);
      let bits = 0;
      let acc = 0;
      let j = 0;
      for (let i2 = 0; i2 < len8; i2 += 1) {
        acc = acc << W2 | u8[i2];
        bits += W2;
        if (bits >= n) {
          u6[j++] = acc >>> bits - n & mask;
          bits -= n;
        }
      }
      if (bits > 0) {
        const rem = acc << n - bits;
        u6[j++] = rem & mask;
        bits -= bits;
      }
      return u6;
    }
    delimEncoded() {
      return this.encode(delim);
    }
    periodEncoded() {
      return this.encode(period);
    }
    stats() {
      return memstat;
    }
  }
  function str2buf(str16) {
    const u16 = new Uint16Array(str16.length);
    let i2 = 0;
    for (const c of str16) {
      u16[i2++] = ord16.get(c);
    }
    return u16;
  }
  ;
  const bitsSetTable256 = [];
  initialize();
  function initialize() {
    bitsSetTable256[0] = 0;
    for (let i2 = 0; i2 < 256; i2++) {
      bitsSetTable256[i2] = (i2 & 1) + bitsSetTable256[Math.floor(i2 / 2)];
    }
  }
  function countSetBits(n) {
    return bitsSetTable256[n & 255] + bitsSetTable256[n >>> 8 & 255] + bitsSetTable256[n >>> 16 & 255] + bitsSetTable256[n >>> 24];
  }
  ;
  const W = 16;
  const bufferView = { 15: Uint16Array, 16: Uint16Array, 6: Uint8Array };
  const config_L1 = 32 * 32;
  const config_L2 = 32;
  const config = {
    inspect: false,
    debug: false,
    selectsearch: true,
    useCodec6: true,
    optflags: true,
    tdpartsmaxmb: 0
  };
  function withDefaults(cfg) {
    const base = Object.assign({}, config);
    const r = Object.assign(base, cfg);
    if (!r.useCodec6) {
      r.optflags = cfg.optflags || false;
    }
    return r;
  }
  ;
  const BASE64 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_";
  function b64_chr16(ord) {
    return chrm(ord, false);
  }
  function chrm(ord, b64) {
    return b64 ? BASE64[ord] : String.fromCharCode(ord);
  }
  const ORD = {};
  for (let i2 = 0; i2 < BASE64.length; i2++) {
    ORD[BASE64[i2]] = i2;
  }
  function dec(chr, w2) {
    return decm(chr, w2 === 6);
  }
  function dec16(chr) {
    return decm(chr, false);
  }
  function decm(chr, b64) {
    return b64 ? ORD[chr] : chr.charCodeAt(0);
  }
  ;
  var bufreader_console = __webpack_require__(108);
  const debug = false;
  function bufreader_BitString(str) {
    this.init(str);
  }
  const MaskTop = {
    16: [
      65535,
      32767,
      16383,
      8191,
      4095,
      2047,
      1023,
      511,
      255,
      127,
      63,
      31,
      15,
      7,
      3,
      1,
      0
    ]
  };
  const MaskBottom = {
    16: [
      65535,
      65534,
      65532,
      65528,
      65520,
      65504,
      65472,
      65408,
      65280,
      65024,
      64512,
      63488,
      61440,
      57344,
      49152,
      32768,
      0
    ]
  };
  const ecache = /* @__PURE__ */ new Map();
  function encodew(str, n) {
    const key = str + ":" + n;
    if (!ecache.has(key)) {
      const bs = new bufreader_BitString(str);
      const out2 = bs.encode(n);
      ecache.set(key, out2);
      return out2;
    }
    return ecache.get(key);
  }
  bufreader_BitString.prototype = {
    init: function(str) {
      this.bytes = str;
      this.length = this.bytes.length * W;
      this.binaryString = typeof str === "string";
    },
    getData: function() {
      return this.bytes;
    },
    encode: function(n) {
      const e = [];
      for (let i2 = 0; i2 < this.length; i2 += n) {
        if (!this.binaryString) {
          e.push(this.get(i2, Math.min(this.length, n)));
        } else {
          e.push(this.get2(i2, Math.min(this.length, n)));
        }
      }
      return e;
    },
    get: function(p, n) {
      if (p % W + n <= W) {
        return (this.bytes[p / W | 0] & MaskTop[W][p % W]) >> W - p % W - n;
      } else {
        let result = this.bytes[p / W | 0] & MaskTop[W][p % W];
        const l = W - p % W;
        p += l;
        n -= l;
        while (n >= W) {
          result = result << W | this.bytes[p / W | 0];
          p += W;
          n -= W;
        }
        if (n > 0) {
          result = result << n | this.bytes[p / W | 0] >> W - n;
        }
        return result;
      }
    },
    get2: function(p, n) {
      if (p % W + n <= W) {
        return (dec(this.bytes[p / W | 0], W) & MaskTop[W][p % W]) >> W - p % W - n;
      } else {
        let result = dec(this.bytes[p / W | 0], W) & MaskTop[W][p % W];
        const l = W - p % W;
        p += l;
        n -= l;
        while (n >= W) {
          result = result << W | dec(this.bytes[p / W | 0], W);
          p += W;
          n -= W;
        }
        if (n > 0) {
          result = result << n | dec(this.bytes[p / W | 0], W) >> W - n;
        }
        return result;
      }
    },
    count: function(p, n) {
      let count = 0;
      while (n >= 16) {
        count += bitsSetTable256[this.get(p, 16)];
        p += 16;
        n -= 16;
      }
      return count + bitsSetTable256[this.get(p, n)];
    },
    pos0: function(i2, n) {
      if (n < 0)
        return 0;
      if (n === 0)
        return i2;
      let step = 16;
      let index = i2;
      const maxiter = this.length / 10;
      let iter = 0;
      while (n > 0) {
        if (i2 > this.length) {
          throw new Error("pos0: out of bounds: " + i2 + " len: " + this.length);
        }
        if (iter > maxiter) {
          throw new Error("pos0: out of iter: " + iter + " i: " + i2);
        }
        const d2 = this.get(i2, step);
        const bits0 = step - countSetBits(d2);
        if (debug) {
          bufreader_console.log(i2, ":i|step:", step, "get:", this.get(i2, step), "n:", n);
        }
        if (n - bits0 < 0) {
          step = Math.max(n, step / 2 | 0);
          continue;
        }
        n -= bits0;
        i2 += step;
        iter += step;
        const diff = n === 0 ? bit0(d2, 1, step) : 1;
        index = i2 - diff;
      }
      return index;
    },
    rank: function(x) {
      let rank = 0;
      for (let i2 = 0; i2 <= x; i2++) {
        if (this.get(i2, 1)) {
          rank++;
        }
      }
      return rank;
    }
  };
  function bit0(n, p, pad) {
    const r = bit0p(n, p);
    if (r.scanned <= 0)
      return r.scanned;
    if (r.index > 0)
      return r.scanned;
    if (pad > r.scanned)
      return r.scanned + 1;
    else
      return 0;
  }
  function bit0p(n, p) {
    const m = n;
    if (p === 0)
      return { index: 0, scanned: 0 };
    if (n === 0 && p === 1)
      return { index: 1, scanned: 1 };
    let c = 0;
    let i2 = 0;
    while (n > 0 && p > c) {
      c = c + (n < (n ^ 1)) ? 1 : 0;
      i2 += 1;
      n = n >>> 1;
    }
    if (debug) {
      bufreader_console.log(String.fromCharCode(m).charCodeAt(0).toString(2), m, i2, p, c);
    }
    return { index: p === c ? i2 : 0, scanned: i2 };
  }
  ;
  var stamp_console = __webpack_require__(108);
  const stamp_debug = false;
  function flagsToTags(flags, throwonerr = false) {
    const header2 = flags[0];
    const tagIndices = [];
    const values = [];
    for (let i2 = 0, mask = 32768; i2 < 16; i2++) {
      if (header2 << i2 === 0)
        break;
      if ((header2 & mask) === mask) {
        tagIndices.push(i2);
      }
      mask = mask >>> 1;
    }
    if (tagIndices.length !== flags.length - 1) {
      const e = [tagIndices, flags, "flags/header mismatch (upsert bug?)"];
      if (throwonerr)
        throw new Error(e);
      else
        stamp_console.log(...e);
      return values;
    }
    for (let i2 = 0; i2 < flags.length; i2++) {
      const flag = flags[i2 + 1];
      const index = tagIndices[i2];
      for (let j = 0, mask = 32768; j < 16; j++) {
        if (flag << j === 0)
          break;
        if ((flag & mask) === mask) {
          const pos = index * 16 + j;
          if (stamp_debug) {
            stamp_console.log("pos", pos, "i/ti", index, tagIndices, "j/i", j, i2);
          }
          values.push(pos);
        }
        mask = mask >>> 1;
      }
    }
    return values;
  }
  function tagsToFlags(tags) {
    let res = b64_chr16(0);
    for (const tag of tags) {
      const val = parseInt(tag);
      const header2 = 0;
      const index = val / 16 | 0;
      const pos = val % 16;
      if (stamp_debug)
        log.d("val:", val, " tag:", tag);
      let h = dec16(res[header2]);
      if (stamp_debug) {
        log.d(
          "mask:",
          MaskBottom[16][16 - index].toString(16).padStart(4, 0),
          "h start:",
          h.toString(16).padStart(4, 0),
          " countbit:",
          countSetBits(h & MaskBottom[16][16 - index])
        );
      }
      const dataIndex = countSetBits(h & MaskBottom[16][16 - index]) + 1;
      let n = (h >>> 15 - index & 1) !== 1 ? 0 : dec16(res[dataIndex]);
      const upsertData = n !== 0;
      h |= 1 << 15 - index;
      n |= 1 << 15 - pos;
      res = b64_chr16(h) + res.slice(1, dataIndex) + b64_chr16(n) + res.slice(upsertData ? dataIndex + 1 : dataIndex);
      if (stamp_debug) {
        let hexres = "";
        for (const r of res) {
          hexres += dec16(r).toString(16).padStart(4, 0) + " ";
        }
        log.d(
          "h:",
          h.toString(16).padStart(4, 0),
          "r: ",
          hexres,
          " n:",
          n.toString(16).padStart(4, 0),
          " dataIndex:",
          dataIndex,
          " index:",
          index,
          " pos:",
          pos
        );
      }
    }
    if (stamp_debug)
      log.d(res);
    return res;
  }
  ;
  function bufwriter_BitWriter() {
    this.init();
  }
  bufwriter_BitWriter.prototype = {
    init: function() {
      this.bits = [];
      this.bytes = [];
      this.bits16 = [];
      this.top = 0;
    },
    write16(data, numBits) {
      if (numBits > 16) {
        log.e("writes upto 16 lsb bits; out of range: " + numBits);
        return;
      }
      const n = data;
      const brim = 16 - this.top % 16;
      const cur = this.top / 16 | 0;
      const e = this.bits16[cur] | 0;
      let remainingBits = 0;
      let b = n & MaskTop[16][16 - numBits];
      if (brim >= numBits) {
        b = b << brim - numBits;
      } else {
        remainingBits = numBits - brim;
        b = b >>> remainingBits;
      }
      b = e | b;
      this.bits16[cur] = b;
      if (remainingBits > 0) {
        b = n & MaskTop[16][16 - remainingBits];
        b = b << 16 - remainingBits;
        this.bits16[cur + 1] = b;
      }
      this.top += numBits;
    },
    write: function(data, numBits) {
      while (numBits > 0) {
        const i2 = (numBits - 1) / 16 | 0;
        const b = data >>> i2 * 16;
        const l = numBits % 16 === 0 ? 16 : numBits % 16;
        this.write16(b, l);
        numBits -= l;
      }
      return;
    },
    getData: function() {
      return this.bitsToBytes();
    },
    bitsToBytes: function() {
      return bufferView[W].from(this.bits16);
    }
  };
  ;
  var rank_console = __webpack_require__(108);
  function RankDirectory(rdv, tdv, config2) {
    this.init(rdv, tdv, config2);
  }
  function createRankDirectory(data, config2) {
    const bits = new BitString(data);
    const nodeCount = config2.nodecount;
    const l1Size = L1;
    const l2Size = L2;
    let p = 0;
    let i2 = 0;
    let count1 = 0;
    let count2 = 0;
    const numBits = nodeCount * 2 + 1;
    const l1bits = Math.ceil(Math.log2(numBits));
    const l2bits = Math.ceil(Math.log2(l1Size));
    const directory = new BitWriter();
    if (config2.selectsearch === false) {
      while (p + l2Size <= numBits) {
        count2 += bits.count(p, l2Size);
        i2 += l2Size;
        p += l2Size;
        if (i2 === l1Size) {
          count1 += count2;
          directory.write(count1, l1bits);
          count2 = 0;
          i2 = 0;
        } else {
          directory.write(count2, l2bits);
        }
      }
    } else {
      let i3 = 0;
      while (i3 + l2Size <= numBits) {
        const sel = bits.pos0(i3, l2Size);
        directory.write(sel, l1bits);
        i3 = sel + 1;
      }
    }
    return new RankDirectory(directory.getData(), data, config2);
  }
  RankDirectory.prototype = {
    init: function(rdv, tdv, cfg) {
      this.directory = new bufreader_BitString(rdv);
      this.data = new bufreader_BitString(tdv);
      const nc = cfg.nodecount;
      this.l1Size = config_L1;
      this.l2Size = config_L2;
      this.numBits = nc * 2 + 1;
      this.l1Bits = Math.ceil(Math.log2(this.numBits));
      this.l2Bits = Math.ceil(Math.log2(this.l1Size));
      this.sectionBits = (this.l1Size / this.l2Size - 1) * this.l2Bits + this.l1Bits;
      this.config = cfg;
    },
    getData: function() {
      return this.directory.getData();
    },
    rank: function(which, x) {
      if (this.config.selectsearch) {
        let rank2 = -1;
        let sectionPos2 = 0;
        if (x >= this.l2Size) {
          sectionPos2 = (x / this.l2Size | 0) * this.l1Bits;
          rank2 = this.directory.get(sectionPos2 - this.l1Bits, this.l1Bits);
          x = x % this.l2Size;
        }
        const ans = x > 0 ? this.data.pos0(rank2 + 1, x) : rank2;
        if (this.config.debug) {
          rank_console.log("ans:", ans, rank2, ":r, x:", x, "s:", sectionPos2);
        }
        return ans;
      }
      if (which === 0) {
        return x - this.rank(1, x) + 1;
      }
      let rank = 0;
      let o = x;
      let sectionPos = 0;
      if (o >= this.l1Size) {
        sectionPos = (o / this.l1Size | 0) * this.sectionBits;
        rank = this.directory.get(sectionPos - this.l1Bits, this.l1Bits);
        if (this.config.debug) {
          rank_console.log("o: " + rank + " sec: " + sectionPos);
        }
        o = o % this.l1Size;
      }
      if (o >= this.l2Size) {
        sectionPos += (o / this.l2Size | 0) * this.l2Bits;
        rank += this.directory.get(sectionPos - this.l2Bits, this.l2Bits);
        if (this.config.debug) {
          rank_console.log("o2: " + rank + " sec: " + sectionPos);
        }
      }
      rank += this.data.count(x - x % this.l2Size, x % this.l2Size + 1);
      if (this.config.debug) {
        rank_console.log("ans:", rank, "x:", o, "s:", sectionPos, "o:", x);
      }
      return rank;
    },
    select: function(which, y) {
      let high = this.numBits;
      let low = -1;
      let val = -1;
      if (this.config.selectsearch) {
        return this.rank(0, y);
      }
      while (high - low > 1) {
        const probe = (high + low) / 2 | 0;
        const r = this.rank(which, probe);
        if (r === y) {
          val = probe;
          high = probe;
        } else if (r < y) {
          low = probe;
        } else {
          high = probe;
        }
      }
      return val;
    }
  };
  ;
  var range_list_console = __webpack_require__(108);
  class range_list_RangeList {
    constructor(maxlevel = 16) {
      this.maxlevel = Math.round(maxlevel);
      this.maxiters = this.maxlevel ** 2;
      this.init();
      this.maxflips = Math.pow(2, this.maxlevel - 1);
      this.bitmask = Math.pow(2, this.maxlevel - 2);
      this.level = 0;
      this.len = 0;
      logd("lvl", this.maxlevel, "h/t", this.head.range, this.tail.range);
    }
    init() {
      this.head = this.mkhead();
      this.tail = this.mktail();
      this.head.next[0] = this.tail;
      this.head.prev[0] = this.tail;
      this.tail.next[0] = this.head;
      this.tail.prev[0] = this.head;
      this.level = 0;
      this.len = 0;
      this.levelhisto = new Array(this.maxlevel);
      this.levelhisto.fill(0);
      this.iterhisto = [0];
      this.avgGetIter = 0;
    }
    set(range, aux, selfcorrect = false) {
      const node = new Node(range, aux);
      const lr = this.randomLevel(selfcorrect);
      let cur = this.head;
      const slots = [];
      for (let i2 = this.level, j = 0; i2 >= 0; i2--, j++) {
        while (cur.next[i2].isLessThan(node))
          cur = cur.next[i2];
        slots[j] = cur;
      }
      logd("set lr/node/slots:", lr, node, slots);
      for (let i2 = slots.length - 1, j = 0; i2 >= 0; i2--, j++) {
        if (i2 > lr)
          continue;
        const predecessor = slots[j];
        const successor = slots[j].next[i2];
        node.next[i2] = successor;
        node.prev[i2] = predecessor;
        predecessor.next[i2] = node;
        successor.prev[i2] = node;
        this.levelhisto[i2] += 1;
      }
      for (let i2 = slots.length; i2 <= lr; i2++) {
        node.prev[i2] = this.head;
        node.next[i2] = this.tail;
        this.head.next[i2] = node;
        this.tail.prev[i2] = node;
        this.level += 1;
        this.levelhisto[i2] += 1;
      }
      this.len += 1;
      return this;
    }
    get(range) {
      const d2 = this.xget(range.lo, this.head);
      if (d2[0] == null)
        return null;
      return d2[0].value;
    }
    search(range, cursornode) {
      const [node, cursor] = this.xget(range.lo, this.lca(cursornode, range.lo));
      if (node == null)
        return [null, cursor];
      else
        return [node.value, cursor];
    }
    xget(n, node) {
      let c = 0;
      let i2 = node.next.length - 1;
      while (i2 >= 0 && node !== this.tail) {
        if (c > this.maxiters) {
          throw new Error(`get fail: maxiters exceeded ${c}`);
        }
        c += 1;
        const cur = node.next[i2];
        const eq = cur.contains(n);
        const lt = cur.lesser(n);
        const gt = cur.greater(n);
        logd("get node i/n/cur/<w>/lt/gt", node, i2, n, cur, eq, lt, gt);
        if (eq) {
          this.avgGetIter = this.avgGetIter > 0 ? Math.round((this.avgGetIter + c) / 2) : c;
          this.iterhisto[c] = (this.iterhisto[c] | 0) + 1;
          return cur === this.tail ? [null, node] : [cur, node];
        } else if (lt) {
          node = cur;
        } else if (gt) {
          i2 -= 1;
        } else {
          throw new Error(`get fail: is n a number? ${n}`);
        }
      }
      return [null, node];
    }
    delete(range) {
      const res = this.xget(range.lo, this.head);
      const node = res[0];
      if (node == null)
        return false;
      for (let i2 = 0; i2 < node.next.length; i2++) {
        const predecessor = node.prev[i2];
        const successor = node.next[i2];
        predecessor.next[i2] = successor;
        successor.prev[i2] = predecessor;
      }
      this.len -= 1;
      return true;
    }
    lca(node, n) {
      let c = 0;
      do {
        if (node == null || c > this.maxiters)
          return this.head;
        if (node.lesser(n))
          break;
        node = node.prev[node.prev.length - 1];
        c += 1;
      } while (node !== this.head);
      return node;
    }
    entries() {
      const kv = [];
      let x = this.head.next[0];
      while (x !== this.tail) {
        kv.push(x);
        x = x.next[0];
      }
      return kv;
    }
    size() {
      return this.len;
    }
    clear() {
      this.init();
    }
    stats() {
      return `length: ${this.len},
      level: ${this.level},
      maxflips: ${this.maxflips},
      maxiters: ${this.maxiters},
      avgGetIter: ${this.avgGetIter},
      iterhisto: ${this.iterhisto},
      levelhisto: ${this.levelhisto}`;
    }
    mkhead() {
      const minr = range_list_mkrange(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER + 1);
      return new Node(minr, "__head__");
    }
    mktail() {
      const maxr = range_list_mkrange(Number.MAX_SAFE_INTEGER - 1, Number.MAX_SAFE_INTEGER);
      return new Node(maxr, "__tail__");
    }
    randomLevel(selfcorrect = false) {
      const cal = selfcorrect ? this.levelup() : -1;
      if (cal >= 0)
        return cal;
      let coinflips = Math.random() * this.maxflips | 0;
      let level = 0;
      do {
        const msbset = (coinflips & this.bitmask) === this.bitmask;
        if (!msbset)
          break;
        level += 1;
        coinflips = coinflips & this.bitmask - 1;
        coinflips *= 2;
      } while (coinflips > 0);
      return level;
    }
    levelup() {
      let maxdiff = 0;
      let maxi = -1;
      let sum = 0;
      for (let i2 = this.levelhisto.length; i2 > 0; i2--) {
        const n = this.levelhisto[i2 - 1] - sum;
        const exl = Math.round(2 ** -i2 * this.len);
        const diff = exl - n;
        if (diff > maxdiff) {
          maxdiff = diff;
          maxi = i2 - 1;
        }
        sum += n;
      }
      return maxi;
    }
  }
  class Node {
    constructor(range, data) {
      this.range = range;
      this.value = data;
      this.next = [];
      this.prev = [];
    }
    isLessThan(other) {
      return this.range.hi < other.range.lo;
    }
    contains(n) {
      return n <= this.range.hi && n >= this.range.lo;
    }
    greater(n) {
      return this.range.hi > n;
    }
    lesser(n) {
      return this.range.hi < n;
    }
  }
  class Range {
    constructor(lo, hi) {
      this.lo = lo;
      this.hi = hi;
    }
  }
  function range_list_mkrange(lo, hi) {
    return new Range(lo, hi);
  }
  function balancedCopy(other) {
    const s = new range_list_RangeList(Math.log2(other.len));
    let it = other.head.next[0];
    while (it !== other.tail) {
      s.set(it.range, it.value, true);
      it = it.next[0];
    }
    return s;
  }
  function logd(...rest) {
    const debug2 = false;
    if (debug2)
      range_list_console.debug("RangeList", ...rest);
  }
  ;
  class map_HashMap {
    constructor() {
      this.m = /* @__PURE__ */ new Map();
    }
    get(k) {
      return this.m.get(k);
    }
    set(k, v) {
      return this.m.set(k, v);
    }
    delete(k) {
      return this.m.delete(k);
    }
    search(k, _) {
      return [this.m.get(k), _];
    }
    clear() {
      this.m.clear();
    }
    stats() {
      return "no stats";
    }
    entries() {
      return this.m.entries();
    }
    size() {
      return this.m.size;
    }
  }
  ;
  var clock_console = __webpack_require__(108);
  const minlives = null;
  const maxlives = null;
  const mincap = null;
  const maxcap = null;
  const minslots = null;
  const maxslots = null;
  const minhands = null;
  class clock_Clock {
    constructor(cap, slotsperhand = 256, maxlife = 16, store) {
      if (store == null)
        throw new Error("missing underlying store");
      cap = this.bound(cap, mincap, maxcap);
      slotsperhand = this.bound(slotsperhand, minslots, maxslots);
      this.maxcount = this.bound(maxlife, minlives, maxlives);
      this.totalhands = Math.max(minhands, Math.round(cap / slotsperhand));
      this.slotsperhand = Math.round(cap / this.totalhands);
      this.capacity = this.slotsperhand * this.totalhands;
      this.rb = new Array(this.capacity);
      this.store = store;
      this.hands = new Array(this.totalhands);
      this.hands.fill(0);
      clock_logd("sz", this.capacity, "hd", this.totalhands, "sl", this.slotsperhand);
    }
    next(n) {
      const base = n * this.slotsperhand;
      return base + (this.hands[n] + 1) % this.slotsperhand;
    }
    cur(n) {
      const base = n * this.slotsperhand;
      return base + this.hands[n] % this.slotsperhand;
    }
    prev(n) {
      const b = n * this.slotsperhand;
      return b + (this.slotsperhand + this.hands[n] - 1) % this.slotsperhand;
    }
    bound(i2, min, max) {
      i2 = i2 <= min ? min : i2;
      i2 = i2 >= max ? max - 1 : i2;
      return i2;
    }
    head(n) {
      n = this.bound(n, 0, this.totalhands);
      return this.cur(n);
    }
    incrHead(n) {
      n = this.bound(n, 0, this.totalhands);
      this.hands[n] = this.next(n);
      return this.hands[n];
    }
    decrHead(n) {
      n = this.bound(n, 0, this.totalhands);
      this.hands[n] = this.prev(n);
      return this.hands[n];
    }
    size() {
      return this.store.size();
    }
    evict(n, c) {
      clock_logd("evict start, head/num/size", this.head(n), n, this.size());
      const start = this.head(n);
      let h = start;
      do {
        const entry = this.rb[h];
        if (entry == null)
          return true;
        entry.count -= c;
        if (entry.count <= 0) {
          clock_logd("evict", h, entry);
          this.store.delete(entry.key);
          this.rb[h] = null;
          return true;
        }
        h = this.incrHead(n);
      } while (h !== start);
      return false;
    }
    put(k, v, c = 1) {
      if (k == null || v == null)
        return false;
      const cached = this.store.get(k);
      if (cached != null) {
        cached.value = v;
        this.boost(cached.pos, c);
        return true;
      }
      const num = this.rolldice;
      this.evict(num, c);
      const h = this.head(num);
      const hasSlot = this.rb[h] == null;
      if (!hasSlot)
        return false;
      this.rb[h] = this.mkfreq(k, c);
      this.store.set(k, this.mkvalue(v, h));
      this.incrHead(num);
      return true;
    }
    val(k, c = 1) {
      const r = this.store.get(k);
      if (r == null)
        return null;
      clock_logd("hit:", r.pos, "val:", r.value);
      this.boost(r.pos, c);
      return r.value;
    }
    search(k, _, c = 1) {
      const v = this.val(k, c);
      return [_, v];
    }
    entries() {
      const kv = [];
      for (const e of this.store.entries()) {
        kv.push(e);
      }
      return kv;
    }
    boost(pos, amp = 0) {
      const me = this.rb[pos];
      me.count = Math.min(me.count + amp, this.maxcount);
    }
    get rolldice() {
      const max = this.totalhands;
      const min = 0;
      return Math.floor(Math.random() * (max - min)) + min;
    }
    mkfreq(k, c) {
      return { key: k, count: Math.min(c, this.maxcount) };
    }
    mkvalue(v, p) {
      return { value: v, pos: p };
    }
  }
  function clock_logd(...rest) {
    const debug2 = false;
    if (debug2)
      clock_console.debug("Clock", ...rest);
  }
  ;
  var multi_clock_console = __webpack_require__(108);
  function multi_clock_defaults() {
    return {
      cap: 64,
      maxlife: 32,
      maxsweep: 256,
      store: null
    };
  }
  class multi_clock_MultiClock {
    constructor(overrides) {
      const opts = Object.assign(multi_clock_defaults(), overrides);
      if (opts.store == null)
        throw new Error("missing underlying store");
      this.totalclocks = Math.round(Math.log10(opts.cap));
      opts.cap = multipleofn(opts.cap, this.totalclocks);
      const ccap = multipleofn(opts.cap / this.totalclocks, 2);
      const maxsweep = ccap > opts.maxsweep ? opts.maxsweep : ccap / 2;
      this.clockcap = multipleofn(ccap, maxsweep);
      this.totalcap = this.totalclocks * this.clockcap;
      this.handsperclock = Math.max(2, this.clockcap / maxsweep);
      this.maxlife = opts.maxlife;
      this.clocks = [];
      this.idx = [];
      this.store = opts.store;
      this.expand();
      multi_clock_logd("sz", this.totalcap, "n", this.totalclocks, "cc", this.clockcap);
    }
    expandable() {
      return this.length < this.totalclocks;
    }
    expand() {
      if (!this.expandable()) {
        multi_clock_logd("cannot expand further, size:", this.length);
        return null;
      }
      const x = this.mkclock();
      this.clocks.push(x);
      this.idx.push(this.length - 1);
      return x;
    }
    mkclock() {
      const sklevel = log2(this.clockcap);
      return new Clock(
        this.clockcap,
        this.slotsperhand,
        this.maxlife,
        this.store(sklevel)
      );
    }
    get length() {
      return this.clocks.length;
    }
    val(k, c = 1) {
      const [v, _] = this.xval(k, c);
      return v;
    }
    xval(k, c = 1) {
      let v = null;
      let clockidx = -1;
      if (k == null)
        return [v, clockidx];
      this.shuffle();
      for (const i2 of this.idx) {
        const x = this.clocks[i2];
        v = x.val(k, c);
        if (v != null) {
          clockidx = i2;
          break;
        }
      }
      return [v, clockidx];
    }
    search(k, _, c = 1) {
      const v = this.val(k, c);
      return [_, v];
    }
    put(k, v, c = 1) {
      if (k == null || v == null)
        return false;
      const [_, clockidx] = this.xval(k, 0);
      if (clockidx >= 0) {
        const x2 = this.clocks[clockidx];
        return x2.put(k, v, c);
      }
      const down = this.expandable() ? 0 : c;
      for (const i2 of this.idx) {
        const x2 = this.clocks[i2];
        const ok = x2.put(k, v, down);
        if (ok) {
          if (c !== down)
            x2.val(k, c);
          return true;
        }
      }
      const x = this.expand();
      if (x != null) {
        return x.put(k, v, c);
      }
      return false;
    }
    size() {
      let s = 0;
      for (const c of this.clocks) {
        s += c.size();
      }
      return s;
    }
    entries() {
      let kv = [];
      for (const c of this.clocks) {
        kv = kv.concat(c.entries());
      }
      return kv;
    }
    shuffle(odds = 5) {
      if (!this.yes(odds))
        return;
      for (let i2 = this.idx.length - 1; i2 > 0; i2--) {
        const j = Math.floor(Math.random() * (i2 + 1));
        const swap = this.idx[i2];
        this.idx[i2] = this.idx[j];
        this.idx[j] = swap;
      }
    }
    yes(when2) {
      const y = true;
      const n = false;
      const len2 = when2;
      const max = len2 + 1;
      const min = 1;
      const rand2 = Math.floor(Math.random() * (max - min)) + min;
      return rand2 % len2 === 0 ? y : n;
    }
  }
  function multipleofn(i2, n) {
    return i2 + (n - i2 % n);
  }
  function log2(n) {
    return Math.round(Math.log2(n));
  }
  function multi_clock_logd(...rest) {
    const debug2 = false;
    if (debug2)
      multi_clock_console.debug("MultiClock", ...rest);
  }
  ;
  var o1_console = __webpack_require__(108);
  const minfreq = 1 << 2;
  const maxfreq = 1 << 7;
  const o1_mincap = 1 << 5;
  const o1_maxcap = 1 << 30;
  function o1_defaults() {
    return {
      cap: o1_mincap,
      freq: minfreq,
      store: null
    };
  }
  class O1 {
    constructor(overrides) {
      const opts = Object.assign(o1_defaults(), overrides);
      if (opts.store == null)
        throw new Error("missing store");
      this.capacity = this.bound(opts.cap, o1_mincap, o1_maxcap);
      this.maxfrequency = this.bound(opts.freq, minfreq, maxfreq);
      const sklevel = o1_log2(this.capacity);
      this.store = opts.store(sklevel);
      this.freqslots = this.mkfreqslots();
      o1_logd("created with cap", this.capacity, "freq", this.maxfrequency);
    }
    put(k, v, f = 1) {
      const cached = this.store.get(k);
      if (cached) {
        o1_logd("put; cached-entry", k, "freq", cached.freq);
        cached.freq += f;
        cached.value = v;
        this.move(cached.freq, cached.node);
        return true;
      }
      if (this.store.size() >= this.capacity) {
        for (let i2 = 2; i2 < this.maxfrequency; i2++) {
          const demote = this.pop(i2);
          if (demote)
            this.push(i2 - f, demote);
        }
        const youngest = this.pop(0);
        o1_logd("at capacity, evict", youngest);
        if (youngest == null)
          return false;
        this.store.delete(youngest.key);
      }
      o1_logd("put; new-entry", k, "freq", f);
      const node = this.push(f, new LL(k));
      const entry = new Entry(node, v, f);
      this.store.set(k, entry);
      return true;
    }
    val(k, f = 1) {
      const entry = this.store.get(k);
      if (entry) {
        o1_logd("cache-hit; cached-entry:", k, "freq:", entry.freq);
        entry.freq += f;
        this.move(entry.freq, entry.node);
        return entry.value;
      }
      o1_logd("cache-miss", k);
      return null;
    }
    search(k, it, f = 1) {
      const cursor = it != null ? it.cursor : null;
      const res = this.store.search(k, cursor);
      const ans = res[0];
      const cur = res[1];
      if (ans) {
        const entry = ans;
        o1_logd("search-hit; key:", k, "freq:", entry.freq);
        entry.freq += f;
        this.move(entry.freq, entry.node);
        return [cur, entry.value];
      }
      o1_logd("search-miss", k);
      return [cur, null];
    }
    size() {
      return this.store.size();
    }
    move(f, node) {
      if (this.delink(node)) {
        const c = this.bound(f - 1, 0, this.maxfrequency);
        const q = this.freqslots[c];
        return this.link(q, node) != null;
      }
      return false;
    }
    push(f, node) {
      const c = this.bound(f - 1, 0, this.maxfrequency);
      const q = this.freqslots[c];
      return this.link(q, node);
    }
    pop(f) {
      const c = this.bound(f - 1, 0, this.maxfrequency);
      const q = this.freqslots[c];
      const lastnode = q.tail.prev;
      if (q.boundary(lastnode))
        return null;
      return this.delink(lastnode);
    }
    delink(node) {
      if (node.immovable())
        return null;
      if (node.orphaned())
        return null;
      node.next.prev = node.prev;
      node.prev.next = node.next;
      node.next = null;
      node.prev = null;
      return node;
    }
    link(q, node) {
      if (node.immovable())
        return null;
      if (!node.orphaned())
        return null;
      const second = q.head.next;
      node.prev = q.head;
      node.next = second;
      q.head.next = node;
      second.prev = node;
      return node;
    }
    mkfreqslots() {
      const slots = new Array(this.maxfrequency);
      for (let i2 = 0; i2 < this.maxfrequency; i2++) {
        slots[i2] = new QLL();
      }
      return slots;
    }
    bound(n, min, max) {
      if (n < min)
        return min;
      if (n >= max)
        return max - 1;
      return n;
    }
  }
  class QLL {
    constructor() {
      const h = new LL("__head__");
      const t2 = new LL("__tail__");
      h.prev = t2;
      h.next = t2;
      t2.prev = h;
      t2.next = h;
      this.head = h;
      this.tail = t2;
    }
    boundary(node) {
      return node === this.head || node === this.tail;
    }
  }
  class LL {
    constructor(k) {
      this.key = k;
      this.next = null;
      this.prev = null;
    }
    immovable() {
      return this.key === "__head__" || this.key === "__tail__";
    }
    orphaned() {
      return this.next === null && this.prev === null;
    }
  }
  class Entry {
    constructor(n, v, f) {
      this.node = n;
      this.value = v;
      this.freq = f;
    }
  }
  function o1_log2(n) {
    return Math.round(Math.log2(n));
  }
  function o1_logd(...rest) {
    const debug2 = false;
    if (debug2)
      o1_console.debug("O1", ...rest);
  }
  ;
  class LfuCache {
    constructor(id, capacity) {
      this.id = id;
      this.cache = new O1({
        cap: capacity,
        freq: 16,
        store: () => new map_HashMap()
      });
    }
    get(key, freq = 1) {
      return this.cache.val(key, freq) || false;
    }
    put(key, val, freq = 1) {
      return this.cache.put(key, val, freq);
    }
    find(k, cursor, freq = 1) {
      const [c, v] = this.cache.search(k, cursor, freq);
      return new Result(c, v);
    }
  }
  class ClockLfu {
    constructor(id, capacity) {
      this.id = id;
      this.cache = new MultiClock({
        cap: capacity,
        store: () => new HashMap()
      });
    }
    get(key, freq = 1) {
      return this.cache.val(key, freq) || false;
    }
    put(key, val, freq = 1) {
      return this.cache.put(key, val, freq);
    }
    find(k, cursor, freq = 1) {
      const [c, v] = this.cache.search(k, cursor, freq);
      return new Result(c, v);
    }
  }
  class RangeLfu {
    constructor(id, capacity) {
      this.id = id;
      this.cache = new O1({
        cap: capacity,
        freq: 16,
        store: (lvl) => new range_list_RangeList(lvl)
      });
    }
    get(n, freq = 1) {
      return this.cache.val(range_list_mkrange(n, n), freq) || false;
    }
    put(lo, hi, val, freq = 1) {
      return this.cache.put(range_list_mkrange(lo, hi), val, freq);
    }
    find(k, cursor, freq = 1) {
      const [c, v] = this.cache.search(range_list_mkrange(k, k), cursor, freq);
      return new Result(c, v);
    }
  }
  class RangeClockLfu {
    constructor(id, capacity) {
      this.id = id;
      this.cache = new MultiClock({
        cap: capacity,
        store: (lvl) => new RangeList(lvl)
      });
    }
    get(n, freq = 1) {
      return this.cache.val(mkrange(n, n), freq) || false;
    }
    put(lo, hi, val, freq = 1) {
      return this.cache.put(mkrange(lo, hi), val, freq);
    }
    find(k, cursor, freq = 1) {
      const [c, v] = this.cache.search(mkrange(k, k), cursor, freq);
      return new Result(c, v);
    }
  }
  class LfuBase {
    constructor(id, capacity) {
      this.id = id;
      this.capacity = capacity;
      this.cache = null;
      throw new Error("absract");
    }
    get(k, freq) {
    }
    put(k, v, freq) {
    }
    find(k, cursor, freq) {
    }
  }
  class Result {
    constructor(c, v) {
      this.cursor = c;
      this.value = v;
    }
  }
  var browser = __webpack_require__(435);
  var process_browser = __webpack_require__(155);
  ;
  var src_log_console = __webpack_require__(108);
  const E = "E/";
  const log_W = "W/";
  const I = "I/";
  const D = "D/";
  function d(...args) {
    src_log_console.debug(t(), D, ...args);
  }
  function i(...args) {
    src_log_console.info(t(), I, ...args);
  }
  function w(...args) {
    src_log_console.warn(t(), log_W, ...args);
  }
  function log_e(...args) {
    src_log_console.error(t(), E, ...args);
  }
  function t() {
    return new Date().toISOString();
  }
  function sys(extra = false) {
    const btomb = 1e3 * 1e3;
    const kbtomb = 1e3;
    const utosec = 1e3 * 1e3;
    if (extra) {
      const loadavg = os.loadavg().map((avg) => avg / btomb);
      const freemem = os.freemem() / btomb;
      const totalmem = os.totalmem() / btomb;
      i(
        "<osinfo>",
        "| cpu-avg",
        loadavg,
        "| mem-free",
        freemem,
        "| mem-use",
        totalmem
      );
    }
    if (typeof Deno !== "undefined")
      return;
    const meminfo = process.memoryUsage();
    const rss = meminfo.rss / btomb;
    const totalheap = meminfo.heapTotal / btomb;
    const usedheap = meminfo.heapUsed / btomb;
    i(
      "<meminfo>",
      "| rss",
      rss,
      "| heap-total",
      totalheap,
      "| heap-used",
      usedheap
    );
    if (extra) {
      const procinfo = process.resourceUsage();
      const userslice = procinfo.userCPUTime / utosec;
      const systemslice = procinfo.systemCPUTime / utosec;
      const maxrss = procinfo.maxRSS / kbtomb;
      const minorpf = procinfo.minorPageFault;
      const majorpf = procinfo.majorPageFault;
      i(
        "<procinfo>",
        "| user",
        userslice,
        "| system",
        systemslice,
        "| maxrss",
        maxrss,
        "| minor",
        minorpf,
        "| major",
        majorpf
      );
    }
  }
  ;
  class FrozenTrieCache {
    constructor(size2) {
      const name = "FrozenTrieCache";
      this.cache = new RangeLfu(name, size2);
      i("ftcache setup with size:", size2);
    }
    get(n) {
      try {
        return this.cache.get(n);
      } catch (e) {
        log_e("get", n, e.stack);
      }
      return false;
    }
    put(lo, hi, val) {
      if (hi < lo || val == null) {
        w(val, "put not allowed hi < lo:", hi, "<", lo);
        return;
      }
      try {
        const frequency = Math.log2((hi - lo) ** 2) | 0;
        this.cache.put(lo, hi, val, frequency);
      } catch (e) {
        log_e("put", lo, hi, val, e.stack);
      }
    }
    find(n, cursor = null) {
      try {
        return this.cache.find(n, cursor);
      } catch (e) {
        log_e("find", n, cursor, e.stack);
      }
      return false;
    }
  }
  ;
  var ftrie_console = __webpack_require__(108);
  function FrozenTrieNode(trie, index) {
    let finCached;
    let whCached;
    let comCached;
    let fcCached;
    let chCached;
    let valCached;
    let flagCached;
    let wordCached;
    let ccursorCached;
    this.trie = trie;
    this.index = index;
    this.proto = trie.proto;
    this.debug = trie.config.debug;
    this.config = trie.config;
    this.final = () => {
      if (typeof finCached === "undefined") {
        const extrabits = 1;
        const bitsize = 1;
        finCached = this.trie.data.get(
          this.trie.letterStart + this.index * this.trie.bitslen + extrabits,
          bitsize
        ) === 1;
      }
      return finCached;
    };
    this.where = () => {
      if (typeof whCached === "undefined") {
        const extrabits = this.trie.extraBit;
        const bitsize = this.trie.bitslen - extrabits;
        whCached = this.trie.data.get(
          this.trie.letterStart + this.index * this.trie.bitslen + extrabits,
          bitsize
        );
      }
      return whCached;
    };
    this.compressed = () => {
      const extrabits = 0;
      const bitsize = 1;
      if (typeof comCached === "undefined") {
        comCached = this.trie.data.get(
          this.trie.letterStart + this.index * this.trie.bitslen + extrabits,
          bitsize
        ) === 1;
      }
      return comCached;
    };
    this.flag = () => {
      if (typeof flagCached === "undefined") {
        flagCached = this.compressed() && this.final();
      }
      return flagCached;
    };
    this.letter = () => this.where();
    this.radix = (parent, cachecursor = null) => {
      const maxwordlen = 1 << 12;
      if (typeof wordCached !== "undefined")
        return [wordCached, ccursorCached];
      const loc = this.index - parent.firstChild();
      const prev = loc > 0 ? parent.getChild(loc - 1) : null;
      const isPrevNodeCompressed = prev && prev.compressed() && !prev.flag();
      const isThisNodeCompressed = this.compressed() && !this.flag();
      if (isThisNodeCompressed || isPrevNodeCompressed) {
        let cc = null;
        if (this.trie.nodecache != null) {
          cc = this.trie.nodecache.find(this.index, cachecursor);
        }
        if (cc != null && cc.value != null) {
          wordCached = cc.value;
          ccursorCached = cc.cursor;
          if (this.debug)
            ftrie_console.log("			node-c-hit", this.index);
          return [wordCached, ccursorCached];
        }
        if (this.debug)
          ftrie_console.log("			node-c-miss, add:", this.index);
        const startchild = [];
        const endchild = [];
        let start = 0;
        let end = 0;
        startchild.push(this);
        start += 1;
        do {
          const temp = parent.getChild(loc - start);
          if (!temp.compressed())
            break;
          if (temp.flag())
            break;
          startchild.push(temp);
          start += 1;
          if (start + end > maxwordlen)
            return [wordCached, ccursorCached];
        } while (true);
        if (isThisNodeCompressed) {
          do {
            end += 1;
            const temp = parent.getChild(loc + end);
            endchild.push(temp);
            if (!temp.compressed())
              break;
            if (start + end > maxwordlen)
              return [wordCached, ccursorCached];
          } while (true);
        }
        const nodes = startchild.reverse().concat(endchild);
        const w2 = nodes.map((n) => n.letter());
        const lo = this.index - start + 1;
        const hi = this.index + end;
        wordCached = {
          word: w2,
          loc: lo - parent.firstChild(),
          branch: nodes[nodes.length - 1]
        };
        if (this.trie.nodecache != null) {
          this.trie.nodecache.put(lo, hi, wordCached);
        }
      } else {
        wordCached = {
          word: [this.letter()],
          loc,
          branch: this
        };
      }
      return [wordCached, ccursorCached || null];
    };
    this.str = () => {
      let s = this.index + " :i, fc: " + this.firstChild();
      s += " tl: " + this.letter() + " c: " + this.compressed();
      s += " f: " + this.final() + " wh: " + this.where();
      s += " flag: " + this.flag();
      return s;
    };
    this.firstChild = () => {
      if (!fcCached) {
        fcCached = this.trie.directory.select(0, this.index + 1) - this.index;
      }
      return fcCached;
    };
    this.childOfNextNode = () => {
      if (!chCached) {
        chCached = this.trie.directory.select(0, this.index + 2) - this.index - 1;
      }
      return chCached;
    };
    this.childCount = () => this.childOfNextNode() - this.firstChild();
    this.value = () => {
      if (typeof valCached === "undefined") {
        const childcount = this.childCount();
        const value = [];
        const optvalue = [];
        let i2 = 0;
        let j = 0;
        if (this.debug) {
          ftrie_console.log("cur:i/l/c", this.index, this.letter(), childcount);
        }
        while (i2 < childcount) {
          const valueChain = this.getChild(i2);
          const letter = valueChain.letter();
          if (this.debug) {
            ftrie_console.log("vc no-flag end i/l", i2, letter);
            ftrie_console.log("f/idx/v", valueChain.flag(), valueChain.index, value);
          }
          if (!valueChain.flag()) {
            break;
          }
          if (this.config.useCodec6) {
            optvalue.push(letter);
            j += 1;
          } else {
            if (i2 % 2 === 0) {
              value.push(letter << 8);
            } else {
              value[j] = value[j] | letter;
              j += 1;
            }
          }
          i2 += 1;
        }
        if (this.config.optflags && (this.config.useCodec6 && optvalue.length <= 4 || optvalue.length <= 3)) {
          const u8 = this.config.useCodec6 ? this.proto.decode8(optvalue) : optvalue;
          const tt = tagsToFlags(u8);
          valCached = str2buf(tt);
          if (this.debug)
            log.d("buf", valCached, "tag", tt);
          if (this.debug)
            log.d("flag dec u8", u8, "enc u6", optvalue);
        } else {
          valCached = this.config.useCodec6 ? this.proto.decode16raw(optvalue) : value;
        }
      }
      return valCached;
    };
    if (this.debug) {
      ftrie_console.log(this.str());
    }
  }
  FrozenTrieNode.prototype = {
    getChildCount: function() {
      return this.childCount();
    },
    getChild: function(index) {
      return this.trie.getNodeByIndex(this.firstChild() + index);
    },
    lastFlagChild: function() {
      const childcount = this.getChildCount();
      let i2 = 0;
      while (i2 < childcount) {
        const c = this.getChild(i2);
        if (!c.flag())
          return i2 - 1;
        i2 += 1;
      }
      return i2;
    }
  };
  function FrozenTrie(data, rdir, ftconfig, cache = null) {
    this.init(data, rdir, ftconfig, cache);
  }
  function makeCache(sz) {
    return new FrozenTrieCache(sz);
  }
  FrozenTrie.prototype = {
    init: function(trieData, rdir, ftconfig, cache = null) {
      const codecType = ftconfig.useCodec6 ? b6 : b8;
      const nodeCount = ftconfig.nodecount;
      this.config = ftconfig;
      this.proto = new Codec(codecType);
      this.data = new bufreader_BitString(trieData);
      this.directory = rdir;
      this.extraBit = 2;
      this.bitslen = this.proto.typ + this.extraBit;
      this.letterStart = nodeCount * 2 + 1;
      const cacheSize2 = Math.floor(nodeCount * 0.07);
      this.nodecache = cache == null ? makeCache(cacheSize2) : cache;
      this.encodedDelim = this.proto.delimEncoded();
      this.encodedPeriod = this.proto.periodEncoded();
    },
    transform(str) {
      return this.proto.encode(str).reverse();
    },
    getNodeByIndex: function(index) {
      return new FrozenTrieNode(this, index);
    },
    getRoot: function() {
      return this.getNodeByIndex(0);
    },
    lookup: function(word) {
      const debug2 = this.debug;
      const index = word.lastIndexOf(this.encodedDelim[0]);
      if (index > 0)
        word = word.slice(0, index);
      let cachecursor = null;
      let returnValue = false;
      let node = this.getRoot();
      let i2 = 0;
      while (i2 < word.length) {
        if (node == null) {
          if (debug2)
            ftrie_console.log("...no more nodes, lookup complete");
          return returnValue;
        }
        if (this.encodedPeriod[0] === word[i2] && node.final()) {
          if (!returnValue)
            returnValue = /* @__PURE__ */ new Map();
          const partial = this.proto.decode(word.slice(0, i2).reverse());
          returnValue.set(partial, node.value());
        }
        const lastFlagNodeIndex = node.lastFlagChild();
        if (debug2) {
          ftrie_console.log("count/i/w:", node.getChildCount(), i2, word[i2]);
          ftrie_console.log("node-w:", node.letter(), "flag-at:", lastFlagNodeIndex);
        }
        if (lastFlagNodeIndex >= node.getChildCount() - 1) {
          if (debug2)
            ftrie_console.log("...no more children, rem:", word.slice(i2));
          return returnValue;
        }
        let high = node.getChildCount();
        let low = lastFlagNodeIndex;
        let next = null;
        while (high - low > 1) {
          const probe = (high + low) / 2 | 0;
          const child = node.getChild(probe);
          const [r, cc] = child.radix(node, cachecursor);
          if (r == null || r.word == null) {
            throw new Error("lookup: no such radix; i: " + i2 + " word: " + word);
          }
          const comp = r.word;
          const w2 = word.slice(i2, i2 + comp.length);
          if (debug2) {
            ftrie_console.log("		l/h:", low, high, "p:", probe, "s:", comp, "w:", w2);
            const pr = cachecursor && cachecursor.range;
            const nr = cc && cc.range;
            if (cc)
              ftrie_console.log("index", child.index, "now:cc", nr, "p:cc", pr);
          }
          cachecursor = cc != null ? cc : cachecursor;
          if (comp[0] > w2[0]) {
            high = r.loc;
            if (debug2)
              ftrie_console.log("		new h", high, comp[0], ">", w2[0]);
            continue;
          } else if (comp[0] < w2[0]) {
            low = r.loc + comp.length - 1;
            if (debug2)
              ftrie_console.log("		new l", low, comp[0], "<", w2[0]);
            continue;
          }
          if (w2.length < comp.length)
            return returnValue;
          for (let u = 0; u < comp.length; u++) {
            if (w2[u] !== comp[u])
              return returnValue;
          }
          if (debug2)
            ftrie_console.log("		it:", probe, "r", r.loc, "break");
          next = r.branch;
          i2 += w2.length;
          break;
        }
        if (debug2)
          ftrie_console.log("	next:", next && next.letter());
        node = next;
      }
      if (node.final()) {
        if (!returnValue)
          returnValue = /* @__PURE__ */ new Map();
        returnValue.set(this.proto.decode(word.reverse()), node.value());
      }
      if (debug2)
        ftrie_console.log("...lookup complete:", returnValue);
      return returnValue;
    }
  };
  function createTrie(tdbuf, rdbuf, ftconfig, triecache = null) {
    if (tdbuf.buffer != null || typeof tdbuf.byteLength === "undefined") {
      throw new Error("trie-data must be ArrayBuffer; len:" + tdbuf.byteLength);
    }
    const tdv = new bufferView[W](tdbuf);
    const rdv = new bufferView[W](rdbuf);
    ftconfig = withDefaults(ftconfig);
    const rdir = new RankDirectory(rdv, tdv, ftconfig);
    return new FrozenTrie(tdv, rdir, ftconfig, triecache);
  }
  ;
  function types_toString(type) {
    switch (type) {
      case 1:
        return "A";
      case 10:
        return "NULL";
      case 28:
        return "AAAA";
      case 18:
        return "AFSDB";
      case 42:
        return "APL";
      case 257:
        return "CAA";
      case 60:
        return "CDNSKEY";
      case 59:
        return "CDS";
      case 37:
        return "CERT";
      case 5:
        return "CNAME";
      case 49:
        return "DHCID";
      case 32769:
        return "DLV";
      case 39:
        return "DNAME";
      case 48:
        return "DNSKEY";
      case 43:
        return "DS";
      case 55:
        return "HIP";
      case 13:
        return "HINFO";
      case 45:
        return "IPSECKEY";
      case 25:
        return "KEY";
      case 36:
        return "KX";
      case 29:
        return "LOC";
      case 15:
        return "MX";
      case 35:
        return "NAPTR";
      case 2:
        return "NS";
      case 47:
        return "NSEC";
      case 50:
        return "NSEC3";
      case 51:
        return "NSEC3PARAM";
      case 12:
        return "PTR";
      case 46:
        return "RRSIG";
      case 17:
        return "RP";
      case 24:
        return "SIG";
      case 6:
        return "SOA";
      case 99:
        return "SPF";
      case 33:
        return "SRV";
      case 44:
        return "SSHFP";
      case 32768:
        return "TA";
      case 249:
        return "TKEY";
      case 52:
        return "TLSA";
      case 250:
        return "TSIG";
      case 16:
        return "TXT";
      case 252:
        return "AXFR";
      case 251:
        return "IXFR";
      case 41:
        return "OPT";
      case 255:
        return "ANY";
      case 64:
        return "SVCB";
      case 65:
        return "HTTPS";
    }
    return "UNKNOWN_" + type;
  }
  function toType(name) {
    switch (name.toUpperCase()) {
      case "A":
        return 1;
      case "NULL":
        return 10;
      case "AAAA":
        return 28;
      case "AFSDB":
        return 18;
      case "APL":
        return 42;
      case "CAA":
        return 257;
      case "CDNSKEY":
        return 60;
      case "CDS":
        return 59;
      case "CERT":
        return 37;
      case "CNAME":
        return 5;
      case "DHCID":
        return 49;
      case "DLV":
        return 32769;
      case "DNAME":
        return 39;
      case "DNSKEY":
        return 48;
      case "DS":
        return 43;
      case "HIP":
        return 55;
      case "HINFO":
        return 13;
      case "IPSECKEY":
        return 45;
      case "KEY":
        return 25;
      case "KX":
        return 36;
      case "LOC":
        return 29;
      case "MX":
        return 15;
      case "NAPTR":
        return 35;
      case "NS":
        return 2;
      case "NSEC":
        return 47;
      case "NSEC3":
        return 50;
      case "NSEC3PARAM":
        return 51;
      case "PTR":
        return 12;
      case "RRSIG":
        return 46;
      case "RP":
        return 17;
      case "SIG":
        return 24;
      case "SOA":
        return 6;
      case "SPF":
        return 99;
      case "SRV":
        return 33;
      case "SSHFP":
        return 44;
      case "TA":
        return 32768;
      case "TKEY":
        return 249;
      case "TLSA":
        return 52;
      case "TSIG":
        return 250;
      case "TXT":
        return 16;
      case "AXFR":
        return 252;
      case "IXFR":
        return 251;
      case "OPT":
        return 41;
      case "ANY":
        return 255;
      case "*":
        return 255;
      case "SVCB":
        return 64;
      case "HTTPS":
        return 65;
    }
    if (name.toUpperCase().startsWith("UNKNOWN_"))
      return parseInt(name.slice(8));
    return 0;
  }
  ;
  function rcodes_toString(rcode) {
    switch (rcode) {
      case 0:
        return "NOERROR";
      case 1:
        return "FORMERR";
      case 2:
        return "SERVFAIL";
      case 3:
        return "NXDOMAIN";
      case 4:
        return "NOTIMP";
      case 5:
        return "REFUSED";
      case 6:
        return "YXDOMAIN";
      case 7:
        return "YXRRSET";
      case 8:
        return "NXRRSET";
      case 9:
        return "NOTAUTH";
      case 10:
        return "NOTZONE";
      case 11:
        return "RCODE_11";
      case 12:
        return "RCODE_12";
      case 13:
        return "RCODE_13";
      case 14:
        return "RCODE_14";
      case 15:
        return "RCODE_15";
    }
    return "RCODE_" + rcode;
  }
  function toRcode(code) {
    switch (code.toUpperCase()) {
      case "NOERROR":
        return 0;
      case "FORMERR":
        return 1;
      case "SERVFAIL":
        return 2;
      case "NXDOMAIN":
        return 3;
      case "NOTIMP":
        return 4;
      case "REFUSED":
        return 5;
      case "YXDOMAIN":
        return 6;
      case "YXRRSET":
        return 7;
      case "NXRRSET":
        return 8;
      case "NOTAUTH":
        return 9;
      case "NOTZONE":
        return 10;
      case "RCODE_11":
        return 11;
      case "RCODE_12":
        return 12;
      case "RCODE_13":
        return 13;
      case "RCODE_14":
        return 14;
      case "RCODE_15":
        return 15;
    }
    return 0;
  }
  ;
  function opcodes_toString(opcode) {
    switch (opcode) {
      case 0:
        return "QUERY";
      case 1:
        return "IQUERY";
      case 2:
        return "STATUS";
      case 3:
        return "OPCODE_3";
      case 4:
        return "NOTIFY";
      case 5:
        return "UPDATE";
      case 6:
        return "OPCODE_6";
      case 7:
        return "OPCODE_7";
      case 8:
        return "OPCODE_8";
      case 9:
        return "OPCODE_9";
      case 10:
        return "OPCODE_10";
      case 11:
        return "OPCODE_11";
      case 12:
        return "OPCODE_12";
      case 13:
        return "OPCODE_13";
      case 14:
        return "OPCODE_14";
      case 15:
        return "OPCODE_15";
    }
    return "OPCODE_" + opcode;
  }
  function toOpcode(code) {
    switch (code.toUpperCase()) {
      case "QUERY":
        return 0;
      case "IQUERY":
        return 1;
      case "STATUS":
        return 2;
      case "OPCODE_3":
        return 3;
      case "NOTIFY":
        return 4;
      case "UPDATE":
        return 5;
      case "OPCODE_6":
        return 6;
      case "OPCODE_7":
        return 7;
      case "OPCODE_8":
        return 8;
      case "OPCODE_9":
        return 9;
      case "OPCODE_10":
        return 10;
      case "OPCODE_11":
        return 11;
      case "OPCODE_12":
        return 12;
      case "OPCODE_13":
        return 13;
      case "OPCODE_14":
        return 14;
      case "OPCODE_15":
        return 15;
    }
    return 0;
  }
  ;
  function classes_toString(klass) {
    switch (klass) {
      case 1:
        return "IN";
      case 2:
        return "CS";
      case 3:
        return "CH";
      case 4:
        return "HS";
      case 255:
        return "ANY";
    }
    return "UNKNOWN_" + klass;
  }
  function toClass(name) {
    switch (name.toUpperCase()) {
      case "IN":
        return 1;
      case "CS":
        return 2;
      case "CH":
        return 3;
      case "HS":
        return 4;
      case "ANY":
        return 255;
    }
    return 0;
  }
  ;
  function optioncodes_toString(type) {
    switch (type) {
      case 1:
        return "LLQ";
      case 2:
        return "UL";
      case 3:
        return "NSID";
      case 5:
        return "DAU";
      case 6:
        return "DHU";
      case 7:
        return "N3U";
      case 8:
        return "CLIENT_SUBNET";
      case 9:
        return "EXPIRE";
      case 10:
        return "COOKIE";
      case 11:
        return "TCP_KEEPALIVE";
      case 12:
        return "PADDING";
      case 13:
        return "CHAIN";
      case 14:
        return "KEY_TAG";
      case 26946:
        return "DEVICEID";
    }
    if (type < 0) {
      return null;
    }
    return `OPTION_${type}`;
  }
  function toCode(name) {
    if (typeof name === "number") {
      return name;
    }
    if (!name) {
      return -1;
    }
    switch (name.toUpperCase()) {
      case "OPTION_0":
        return 0;
      case "LLQ":
        return 1;
      case "UL":
        return 2;
      case "NSID":
        return 3;
      case "OPTION_4":
        return 4;
      case "DAU":
        return 5;
      case "DHU":
        return 6;
      case "N3U":
        return 7;
      case "CLIENT_SUBNET":
        return 8;
      case "EXPIRE":
        return 9;
      case "COOKIE":
        return 10;
      case "TCP_KEEPALIVE":
        return 11;
      case "PADDING":
        return 12;
      case "CHAIN":
        return 13;
      case "KEY_TAG":
        return 14;
      case "DEVICEID":
        return 26946;
      case "OPTION_65535":
        return 65535;
    }
    const m = name.match(/_(\d+)$/);
    if (m) {
      return parseInt(m[1], 10);
    }
    return -1;
  }
  ;
  function svcparamkey_toString(type) {
    switch (type) {
      case 0:
        return "mandatory";
      case 1:
        return "alpn";
      case 2:
        return "no-default-alpn";
      case 3:
        return "port";
      case 4:
        return "ipv4hint";
      case 5:
        return "ech";
      case 6:
        return "ipv6hint";
    }
    return "key" + type;
  }
  function toKey(name) {
    switch (name.toLowerCase()) {
      case "mandatory":
        return 0;
      case "alpn":
        return 1;
      case "no-default-alpn":
        return 2;
      case "port":
        return 3;
      case "ipv4hint":
        return 4;
      case "ech":
        return 5;
      case "ipv6hint":
        return 6;
    }
    if (name.toLowerCase().startsWith("key"))
      return parseInt(name.slice(3));
    throw "Invalid svcparam key";
  }
  var buffer = __webpack_require__(764);
  ;
  const ip = {};
  ip.toBuffer = function(ip2, buff, offset) {
    offset = ~~offset;
    var result;
    if (this.isV4Format(ip2)) {
      result = buff || new buffer.lW(offset + 4);
      ip2.split(/\./g).map(function(byte) {
        result[offset++] = parseInt(byte, 10) & 255;
      });
    } else if (this.isV6Format(ip2)) {
      var sections = ip2.split(":", 8);
      var i2;
      for (i2 = 0; i2 < sections.length; i2++) {
        var isv4 = this.isV4Format(sections[i2]);
        var v4Buffer;
        if (isv4) {
          v4Buffer = this.toBuffer(sections[i2]);
          sections[i2] = v4Buffer.slice(0, 2).toString("hex");
        }
        if (v4Buffer && ++i2 < 8) {
          sections.splice(i2, 0, v4Buffer.slice(2, 4).toString("hex"));
        }
      }
      if (sections[0] === "") {
        while (sections.length < 8)
          sections.unshift("0");
      } else if (sections[sections.length - 1] === "") {
        while (sections.length < 8)
          sections.push("0");
      } else if (sections.length < 8) {
        for (i2 = 0; i2 < sections.length && sections[i2] !== ""; i2++)
          ;
        var argv = [i2, 1];
        for (i2 = 9 - sections.length; i2 > 0; i2--) {
          argv.push("0");
        }
        sections.splice.apply(sections, argv);
      }
      result = buff || new buffer.lW(offset + 16);
      for (i2 = 0; i2 < sections.length; i2++) {
        var word = parseInt(sections[i2], 16);
        result[offset++] = word >> 8 & 255;
        result[offset++] = word & 255;
      }
    }
    if (!result) {
      throw Error("Invalid ip address: " + ip2);
    }
    return result;
  };
  ip.toString = function(buff, offset, length) {
    offset = ~~offset;
    length = length || buff.length - offset;
    var result = [];
    if (length === 4) {
      for (var i2 = 0; i2 < length; i2++) {
        result.push(buff[offset + i2]);
      }
      result = result.join(".");
    } else if (length === 16) {
      for (var i2 = 0; i2 < length; i2 += 2) {
        result.push(buff.readUInt16BE(offset + i2).toString(16));
      }
      result = result.join(":");
      result = result.replace(/(^|:)0(:0)*:0(:|$)/, "$1::$3");
      result = result.replace(/:{3,4}/, "::");
    }
    return result;
  };
  var ipv4Regex = /^(\d{1,3}\.){3,3}\d{1,3}$/;
  var ipv6Regex = /^(::)?(((\d{1,3}\.){3}(\d{1,3}){1})?([0-9a-f]){0,4}:{0,2}){1,8}(::)?$/i;
  ip.isV4Format = function(ip2) {
    return ipv4Regex.test(ip2);
  };
  ip.isV6Format = function(ip2) {
    return ipv6Regex.test(ip2);
  };
  function _normalizeFamily(family) {
    return family ? family.toLowerCase() : "ipv4";
  }
  ip.fromPrefixLen = function(prefixlen, family) {
    if (prefixlen > 32) {
      family = "ipv6";
    } else {
      family = _normalizeFamily(family);
    }
    var len2 = 4;
    if (family === "ipv6") {
      len2 = 16;
    }
    var buff = new buffer.lW(len2);
    for (var i2 = 0, n = buff.length; i2 < n; ++i2) {
      var bits = 8;
      if (prefixlen < 8) {
        bits = prefixlen;
      }
      prefixlen -= bits;
      buff[i2] = ~(255 >> bits) & 255;
    }
    return ip.toString(buff);
  };
  ip.mask = function(addr, mask) {
    addr = ip.toBuffer(addr);
    mask = ip.toBuffer(mask);
    var result = new buffer.lW(Math.max(addr.length, mask.length));
    var i2 = 0;
    if (addr.length === mask.length) {
      for (i2 = 0; i2 < addr.length; i2++) {
        result[i2] = addr[i2] & mask[i2];
      }
    } else if (mask.length === 4) {
      for (i2 = 0; i2 < mask.length; i2++) {
        result[i2] = addr[addr.length - 4 + i2] & mask[i2];
      }
    } else {
      for (var i2 = 0; i2 < result.length - 6; i2++) {
        result[i2] = 0;
      }
      result[10] = 255;
      result[11] = 255;
      for (i2 = 0; i2 < addr.length; i2++) {
        result[i2 + 12] = addr[i2] & mask[i2 + 12];
      }
      i2 = i2 + 12;
    }
    for (; i2 < result.length; i2++) {
      result[i2] = 0;
    }
    return ip.toString(result);
  };
  ip.cidr = function(cidrString) {
    var cidrParts = cidrString.split("/");
    var addr = cidrParts[0];
    if (cidrParts.length !== 2) {
      throw new Error("invalid CIDR subnet: " + addr);
    }
    var mask = ip.fromPrefixLen(parseInt(cidrParts[1], 10));
    return ip.mask(addr, mask);
  };
  ip.subnet = function(addr, mask) {
    var networkAddress = ip.toLong(ip.mask(addr, mask));
    var maskBuffer = ip.toBuffer(mask);
    var maskLength = 0;
    for (var i2 = 0; i2 < maskBuffer.length; i2++) {
      if (maskBuffer[i2] === 255) {
        maskLength += 8;
      } else {
        var octet = maskBuffer[i2] & 255;
        while (octet) {
          octet = octet << 1 & 255;
          maskLength++;
        }
      }
    }
    var numberOfAddresses = Math.pow(2, 32 - maskLength);
    return {
      networkAddress: ip.fromLong(networkAddress),
      firstAddress: numberOfAddresses <= 2 ? ip.fromLong(networkAddress) : ip.fromLong(networkAddress + 1),
      lastAddress: numberOfAddresses <= 2 ? ip.fromLong(networkAddress + numberOfAddresses - 1) : ip.fromLong(networkAddress + numberOfAddresses - 2),
      broadcastAddress: ip.fromLong(networkAddress + numberOfAddresses - 1),
      subnetMask: mask,
      subnetMaskLength: maskLength,
      numHosts: numberOfAddresses <= 2 ? numberOfAddresses : numberOfAddresses - 2,
      length: numberOfAddresses,
      contains: function(other) {
        return networkAddress === ip.toLong(ip.mask(other, mask));
      }
    };
  };
  ip.cidrSubnet = function(cidrString) {
    var cidrParts = cidrString.split("/");
    var addr = cidrParts[0];
    if (cidrParts.length !== 2) {
      throw new Error("invalid CIDR subnet: " + addr);
    }
    var mask = ip.fromPrefixLen(parseInt(cidrParts[1], 10));
    return ip.subnet(addr, mask);
  };
  ip.not = function(addr) {
    var buff = ip.toBuffer(addr);
    for (var i2 = 0; i2 < buff.length; i2++) {
      buff[i2] = 255 ^ buff[i2];
    }
    return ip.toString(buff);
  };
  ip.or = function(a, b) {
    a = ip.toBuffer(a);
    b = ip.toBuffer(b);
    if (a.length === b.length) {
      for (var i2 = 0; i2 < a.length; ++i2) {
        a[i2] |= b[i2];
      }
      return ip.toString(a);
    } else {
      var buff = a;
      var other = b;
      if (b.length > a.length) {
        buff = b;
        other = a;
      }
      var offset = buff.length - other.length;
      for (var i2 = offset; i2 < buff.length; ++i2) {
        buff[i2] |= other[i2 - offset];
      }
      return ip.toString(buff);
    }
  };
  ip.isEqual = function(a, b) {
    a = ip.toBuffer(a);
    b = ip.toBuffer(b);
    if (a.length === b.length) {
      for (var i2 = 0; i2 < a.length; i2++) {
        if (a[i2] !== b[i2])
          return false;
      }
      return true;
    }
    if (b.length === 4) {
      var t2 = b;
      b = a;
      a = t2;
    }
    for (var i2 = 0; i2 < 10; i2++) {
      if (b[i2] !== 0)
        return false;
    }
    var word = b.readUInt16BE(10);
    if (word !== 0 && word !== 65535)
      return false;
    for (var i2 = 0; i2 < 4; i2++) {
      if (a[i2] !== b[i2 + 12])
        return false;
    }
    return true;
  };
  ip.isPrivate = function(addr) {
    return /^(::f{4}:)?10\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(addr) || /^(::f{4}:)?192\.168\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(addr) || /^(::f{4}:)?172\.(1[6-9]|2\d|30|31)\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(addr) || /^(::f{4}:)?127\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(addr) || /^(::f{4}:)?169\.254\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(addr) || /^f[cd][0-9a-f]{2}:/i.test(addr) || /^fe80:/i.test(addr) || /^::1$/.test(addr) || /^::$/.test(addr);
  };
  ip.isPublic = function(addr) {
    return !ip.isPrivate(addr);
  };
  ip.isLoopback = function(addr) {
    return /^(::f{4}:)?127\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})/.test(addr) || /^fe80::1$/.test(addr) || /^::1$/.test(addr) || /^::$/.test(addr);
  };
  ip.loopback = function(family) {
    family = _normalizeFamily(family);
    if (family !== "ipv4" && family !== "ipv6") {
      throw new Error("family must be ipv4 or ipv6");
    }
    return family === "ipv4" ? "127.0.0.1" : "fe80::1";
  };
  ip.toLong = function(ip2) {
    var ipl = 0;
    ip2.split(".").forEach(function(octet) {
      ipl <<= 8;
      ipl += parseInt(octet);
    });
    return ipl >>> 0;
  };
  ip.fromLong = function(ipl) {
    return (ipl >>> 24) + "." + (ipl >> 16 & 255) + "." + (ipl >> 8 & 255) + "." + (ipl & 255);
  };
  ;
  const QUERY_FLAG = 0;
  const RESPONSE_FLAG = 1 << 15;
  const FLUSH_MASK = 1 << 15;
  const NOT_FLUSH_MASK = ~FLUSH_MASK;
  const QU_MASK = 1 << 15;
  const NOT_QU_MASK = ~QU_MASK;
  const dns_parser_name = {};
  dns_parser_name.encode = function(str, buf, offset) {
    if (!buf)
      buf = buffer.lW.allocUnsafe(dns_parser_name.encodingLength(str));
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    const n = str.replace(/^\.|\.$/gm, "");
    if (n.length) {
      const list = n.split(".");
      for (let i2 = 0; i2 < list.length; i2++) {
        const len2 = buf.write(list[i2], offset + 1);
        buf[offset] = len2;
        offset += len2 + 1;
      }
    }
    buf[offset++] = 0;
    dns_parser_name.encode.bytes = offset - oldOffset;
    return buf;
  };
  dns_parser_name.encode.bytes = 0;
  dns_parser_name.decode = function(buf, offset) {
    if (!offset)
      offset = 0;
    const list = [];
    const oldOffset = offset;
    let len2 = buf[offset++];
    if (len2 === 0) {
      dns_parser_name.decode.bytes = 1;
      return ".";
    }
    if (len2 >= 192) {
      const res = dns_parser_name.decode(buf, buf.readUInt16BE(offset - 1) - 49152);
      dns_parser_name.decode.bytes = 2;
      return res;
    }
    while (len2) {
      if (len2 >= 192) {
        list.push(dns_parser_name.decode(buf, buf.readUInt16BE(offset - 1) - 49152));
        offset++;
        break;
      }
      list.push(buf.toString("utf-8", offset, offset + len2));
      offset += len2;
      len2 = buf[offset++];
    }
    dns_parser_name.decode.bytes = offset - oldOffset;
    return list.join(".");
  };
  dns_parser_name.decode.bytes = 0;
  dns_parser_name.encodingLength = function(n) {
    if (n === ".")
      return 1;
    return buffer.lW.byteLength(n) + 2;
  };
  const string = {};
  string.encode = function(s, buf, offset) {
    if (!buf)
      buf = buffer.lW.allocUnsafe(string.encodingLength(s));
    if (!offset)
      offset = 0;
    const len2 = buf.write(s, offset + 1);
    buf[offset] = len2;
    string.encode.bytes = len2 + 1;
    return buf;
  };
  string.encode.bytes = 0;
  string.decode = function(buf, offset) {
    if (!offset)
      offset = 0;
    const len2 = buf[offset];
    const s = buf.toString("utf-8", offset + 1, offset + 1 + len2);
    string.decode.bytes = len2 + 1;
    return s;
  };
  string.decode.bytes = 0;
  string.encodingLength = function(s) {
    return buffer.lW.byteLength(s) + 1;
  };
  const header = {};
  header.encode = function(h, buf, offset) {
    if (!buf)
      buf = header.encodingLength(h);
    if (!offset)
      offset = 0;
    const flags = (h.flags || 0) & 32767;
    const type = h.type === "response" ? RESPONSE_FLAG : QUERY_FLAG;
    buf.writeUInt16BE(h.id || 0, offset);
    buf.writeUInt16BE(flags | type, offset + 2);
    buf.writeUInt16BE(h.questions.length, offset + 4);
    buf.writeUInt16BE(h.answers.length, offset + 6);
    buf.writeUInt16BE(h.authorities.length, offset + 8);
    buf.writeUInt16BE(h.additionals.length, offset + 10);
    return buf;
  };
  header.encode.bytes = 12;
  header.decode = function(buf, offset) {
    if (!offset)
      offset = 0;
    if (buf.length < 12)
      throw new Error("Header must be 12 bytes");
    const flags = buf.readUInt16BE(offset + 2);
    return {
      id: buf.readUInt16BE(offset),
      type: flags & RESPONSE_FLAG ? "response" : "query",
      flags: flags & 32767,
      flag_qr: (flags >> 15 & 1) === 1,
      opcode: opcodes_toString(flags >> 11 & 15),
      flag_aa: (flags >> 10 & 1) === 1,
      flag_tc: (flags >> 9 & 1) === 1,
      flag_rd: (flags >> 8 & 1) === 1,
      flag_ra: (flags >> 7 & 1) === 1,
      flag_z: (flags >> 6 & 1) === 1,
      flag_ad: (flags >> 5 & 1) === 1,
      flag_cd: (flags >> 4 & 1) === 1,
      rcode: rcodes_toString(flags & 15),
      questions: new Array(buf.readUInt16BE(offset + 4)),
      answers: new Array(buf.readUInt16BE(offset + 6)),
      authorities: new Array(buf.readUInt16BE(offset + 8)),
      additionals: new Array(buf.readUInt16BE(offset + 10))
    };
  };
  header.decode.bytes = 12;
  header.encodingLength = function() {
    return 12;
  };
  const runknown = {};
  runknown.encode = function(data, buf, offset) {
    if (!buf)
      buf = buffer.lW.allocUnsafe(runknown.encodingLength(data));
    if (!offset)
      offset = 0;
    buf.writeUInt16BE(data.length, offset);
    data.copy(buf, offset + 2);
    runknown.encode.bytes = data.length + 2;
    return buf;
  };
  runknown.encode.bytes = 0;
  runknown.decode = function(buf, offset) {
    if (!offset)
      offset = 0;
    const len2 = buf.readUInt16BE(offset);
    const data = buf.slice(offset + 2, offset + 2 + len2);
    runknown.decode.bytes = len2 + 2;
    return data;
  };
  runknown.decode.bytes = 0;
  runknown.encodingLength = function(data) {
    return data.length + 2;
  };
  const rns = {};
  rns.encode = function(data, buf, offset) {
    if (!buf)
      buf = buffer.lW.allocUnsafe(rns.encodingLength(data));
    if (!offset)
      offset = 0;
    dns_parser_name.encode(data, buf, offset + 2);
    buf.writeUInt16BE(dns_parser_name.encode.bytes, offset);
    rns.encode.bytes = dns_parser_name.encode.bytes + 2;
    return buf;
  };
  rns.encode.bytes = 0;
  rns.decode = function(buf, offset) {
    if (!offset)
      offset = 0;
    const len2 = buf.readUInt16BE(offset);
    const dd = dns_parser_name.decode(buf, offset + 2);
    rns.decode.bytes = len2 + 2;
    return dd;
  };
  rns.decode.bytes = 0;
  rns.encodingLength = function(data) {
    return dns_parser_name.encodingLength(data) + 2;
  };
  const rsoa = {};
  rsoa.encode = function(data, buf, offset) {
    if (!buf)
      buf = buffer.lW.allocUnsafe(rsoa.encodingLength(data));
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    offset += 2;
    dns_parser_name.encode(data.mname, buf, offset);
    offset += dns_parser_name.encode.bytes;
    dns_parser_name.encode(data.rname, buf, offset);
    offset += dns_parser_name.encode.bytes;
    buf.writeUInt32BE(data.serial || 0, offset);
    offset += 4;
    buf.writeUInt32BE(data.refresh || 0, offset);
    offset += 4;
    buf.writeUInt32BE(data.retry || 0, offset);
    offset += 4;
    buf.writeUInt32BE(data.expire || 0, offset);
    offset += 4;
    buf.writeUInt32BE(data.minimum || 0, offset);
    offset += 4;
    buf.writeUInt16BE(offset - oldOffset - 2, oldOffset);
    rsoa.encode.bytes = offset - oldOffset;
    return buf;
  };
  rsoa.encode.bytes = 0;
  rsoa.decode = function(buf, offset) {
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    const data = {};
    offset += 2;
    data.mname = dns_parser_name.decode(buf, offset);
    offset += dns_parser_name.decode.bytes;
    data.rname = dns_parser_name.decode(buf, offset);
    offset += dns_parser_name.decode.bytes;
    data.serial = buf.readUInt32BE(offset);
    offset += 4;
    data.refresh = buf.readUInt32BE(offset);
    offset += 4;
    data.retry = buf.readUInt32BE(offset);
    offset += 4;
    data.expire = buf.readUInt32BE(offset);
    offset += 4;
    data.minimum = buf.readUInt32BE(offset);
    offset += 4;
    rsoa.decode.bytes = offset - oldOffset;
    return data;
  };
  rsoa.decode.bytes = 0;
  rsoa.encodingLength = function(data) {
    return 22 + dns_parser_name.encodingLength(data.mname) + dns_parser_name.encodingLength(data.rname);
  };
  const rtxt = {};
  rtxt.encode = function(data, buf, offset) {
    if (!Array.isArray(data))
      data = [data];
    for (let i2 = 0; i2 < data.length; i2++) {
      if (typeof data[i2] === "string") {
        data[i2] = buffer.lW.from(data[i2]);
      }
      if (!buffer.lW.isBuffer(data[i2])) {
        throw new Error("Must be a Buffer");
      }
    }
    if (!buf)
      buf = buffer.lW.allocUnsafe(rtxt.encodingLength(data));
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    offset += 2;
    data.forEach(function(d2) {
      buf[offset++] = d2.length;
      d2.copy(buf, offset, 0, d2.length);
      offset += d2.length;
    });
    buf.writeUInt16BE(offset - oldOffset - 2, oldOffset);
    rtxt.encode.bytes = offset - oldOffset;
    return buf;
  };
  rtxt.encode.bytes = 0;
  rtxt.decode = function(buf, offset) {
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    let remaining = buf.readUInt16BE(offset);
    offset += 2;
    let data = [];
    while (remaining > 0) {
      const len2 = buf[offset++];
      --remaining;
      if (remaining < len2) {
        throw new Error("Buffer overflow");
      }
      data.push(buf.slice(offset, offset + len2));
      offset += len2;
      remaining -= len2;
    }
    rtxt.decode.bytes = offset - oldOffset;
    return data;
  };
  rtxt.decode.bytes = 0;
  rtxt.encodingLength = function(data) {
    if (!Array.isArray(data))
      data = [data];
    let length = 2;
    data.forEach(function(buf) {
      if (typeof buf === "string") {
        length += buffer.lW.byteLength(buf) + 1;
      } else {
        length += buf.length + 1;
      }
    });
    return length;
  };
  const rnull = {};
  rnull.encode = function(data, buf, offset) {
    if (!buf)
      buf = buffer.lW.allocUnsafe(rnull.encodingLength(data));
    if (!offset)
      offset = 0;
    if (typeof data === "string")
      data = buffer.lW.from(data);
    if (!data)
      data = buffer.lW.allocUnsafe(0);
    const oldOffset = offset;
    offset += 2;
    const len2 = data.length;
    data.copy(buf, offset, 0, len2);
    offset += len2;
    buf.writeUInt16BE(offset - oldOffset - 2, oldOffset);
    rnull.encode.bytes = offset - oldOffset;
    return buf;
  };
  rnull.encode.bytes = 0;
  rnull.decode = function(buf, offset) {
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    const len2 = buf.readUInt16BE(offset);
    offset += 2;
    const data = buf.slice(offset, offset + len2);
    offset += len2;
    rnull.decode.bytes = offset - oldOffset;
    return data;
  };
  rnull.decode.bytes = 0;
  rnull.encodingLength = function(data) {
    if (!data)
      return 2;
    return (buffer.lW.isBuffer(data) ? data.length : buffer.lW.byteLength(data)) + 2;
  };
  const rhinfo = {};
  rhinfo.encode = function(data, buf, offset) {
    if (!buf)
      buf = buffer.lW.allocUnsafe(rhinfo.encodingLength(data));
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    offset += 2;
    string.encode(data.cpu, buf, offset);
    offset += string.encode.bytes;
    string.encode(data.os, buf, offset);
    offset += string.encode.bytes;
    buf.writeUInt16BE(offset - oldOffset - 2, oldOffset);
    rhinfo.encode.bytes = offset - oldOffset;
    return buf;
  };
  rhinfo.encode.bytes = 0;
  rhinfo.decode = function(buf, offset) {
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    const data = {};
    offset += 2;
    data.cpu = string.decode(buf, offset);
    offset += string.decode.bytes;
    data.os = string.decode(buf, offset);
    offset += string.decode.bytes;
    rhinfo.decode.bytes = offset - oldOffset;
    return data;
  };
  rhinfo.decode.bytes = 0;
  rhinfo.encodingLength = function(data) {
    return string.encodingLength(data.cpu) + string.encodingLength(data.os) + 2;
  };
  const rptr = {};
  const rcname = rptr;
  const rdname = rptr;
  rptr.encode = function(data, buf, offset) {
    if (!buf)
      buf = buffer.lW.allocUnsafe(rptr.encodingLength(data));
    if (!offset)
      offset = 0;
    dns_parser_name.encode(data, buf, offset + 2);
    buf.writeUInt16BE(dns_parser_name.encode.bytes, offset);
    rptr.encode.bytes = dns_parser_name.encode.bytes + 2;
    return buf;
  };
  rptr.encode.bytes = 0;
  rptr.decode = function(buf, offset) {
    if (!offset)
      offset = 0;
    const data = dns_parser_name.decode(buf, offset + 2);
    rptr.decode.bytes = dns_parser_name.decode.bytes + 2;
    return data;
  };
  rptr.decode.bytes = 0;
  rptr.encodingLength = function(data) {
    return dns_parser_name.encodingLength(data) + 2;
  };
  const rsrv = {};
  rsrv.encode = function(data, buf, offset) {
    if (!buf)
      buf = buffer.lW.allocUnsafe(rsrv.encodingLength(data));
    if (!offset)
      offset = 0;
    buf.writeUInt16BE(data.priority || 0, offset + 2);
    buf.writeUInt16BE(data.weight || 0, offset + 4);
    buf.writeUInt16BE(data.port || 0, offset + 6);
    dns_parser_name.encode(data.target, buf, offset + 8);
    const len2 = dns_parser_name.encode.bytes + 6;
    buf.writeUInt16BE(len2, offset);
    rsrv.encode.bytes = len2 + 2;
    return buf;
  };
  rsrv.encode.bytes = 0;
  rsrv.decode = function(buf, offset) {
    if (!offset)
      offset = 0;
    const len2 = buf.readUInt16BE(offset);
    const data = {};
    data.priority = buf.readUInt16BE(offset + 2);
    data.weight = buf.readUInt16BE(offset + 4);
    data.port = buf.readUInt16BE(offset + 6);
    data.target = dns_parser_name.decode(buf, offset + 8);
    rsrv.decode.bytes = len2 + 2;
    return data;
  };
  rsrv.decode.bytes = 0;
  rsrv.encodingLength = function(data) {
    return 8 + dns_parser_name.encodingLength(data.target);
  };
  const rcaa = {};
  rcaa.ISSUER_CRITICAL = 1 << 7;
  rcaa.encode = function(data, buf, offset) {
    const len2 = rcaa.encodingLength(data);
    if (!buf)
      buf = buffer.lW.allocUnsafe(rcaa.encodingLength(data));
    if (!offset)
      offset = 0;
    if (data.issuerCritical) {
      data.flags = rcaa.ISSUER_CRITICAL;
    }
    buf.writeUInt16BE(len2 - 2, offset);
    offset += 2;
    buf.writeUInt8(data.flags || 0, offset);
    offset += 1;
    string.encode(data.tag, buf, offset);
    offset += string.encode.bytes;
    buf.write(data.value, offset);
    offset += buffer.lW.byteLength(data.value);
    rcaa.encode.bytes = len2;
    return buf;
  };
  rcaa.encode.bytes = 0;
  rcaa.decode = function(buf, offset) {
    if (!offset)
      offset = 0;
    const len2 = buf.readUInt16BE(offset);
    offset += 2;
    const oldOffset = offset;
    const data = {};
    data.flags = buf.readUInt8(offset);
    offset += 1;
    data.tag = string.decode(buf, offset);
    offset += string.decode.bytes;
    data.value = buf.toString("utf-8", offset, oldOffset + len2);
    data.issuerCritical = !!(data.flags & rcaa.ISSUER_CRITICAL);
    rcaa.decode.bytes = len2 + 2;
    return data;
  };
  rcaa.decode.bytes = 0;
  rcaa.encodingLength = function(data) {
    return string.encodingLength(data.tag) + string.encodingLength(data.value) + 2;
  };
  const rmx = {};
  rmx.encode = function(data, buf, offset) {
    if (!buf)
      buf = buffer.lW.allocUnsafe(rmx.encodingLength(data));
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    offset += 2;
    buf.writeUInt16BE(data.preference || 0, offset);
    offset += 2;
    dns_parser_name.encode(data.exchange, buf, offset);
    offset += dns_parser_name.encode.bytes;
    buf.writeUInt16BE(offset - oldOffset - 2, oldOffset);
    rmx.encode.bytes = offset - oldOffset;
    return buf;
  };
  rmx.encode.bytes = 0;
  rmx.decode = function(buf, offset) {
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    const data = {};
    offset += 2;
    data.preference = buf.readUInt16BE(offset);
    offset += 2;
    data.exchange = dns_parser_name.decode(buf, offset);
    offset += dns_parser_name.decode.bytes;
    rmx.decode.bytes = offset - oldOffset;
    return data;
  };
  rmx.encodingLength = function(data) {
    return 4 + dns_parser_name.encodingLength(data.exchange);
  };
  const ra = {};
  ra.encode = function(host, buf, offset) {
    if (!buf)
      buf = buffer.lW.allocUnsafe(ra.encodingLength(host));
    if (!offset)
      offset = 0;
    buf.writeUInt16BE(4, offset);
    offset += 2;
    ip.toBuffer(host, buf, offset);
    ra.encode.bytes = 6;
    return buf;
  };
  ra.encode.bytes = 0;
  ra.decode = function(buf, offset) {
    if (!offset)
      offset = 0;
    offset += 2;
    const host = ip.toString(buf, offset, 4);
    ra.decode.bytes = 6;
    return host;
  };
  ra.decode.bytes = 0;
  ra.encodingLength = function() {
    return 6;
  };
  const raaaa = {};
  raaaa.encode = function(host, buf, offset) {
    if (!buf)
      buf = buffer.lW.allocUnsafe(raaaa.encodingLength(host));
    if (!offset)
      offset = 0;
    buf.writeUInt16BE(16, offset);
    offset += 2;
    ip.toBuffer(host, buf, offset);
    raaaa.encode.bytes = 18;
    return buf;
  };
  raaaa.encode.bytes = 0;
  raaaa.decode = function(buf, offset) {
    if (!offset)
      offset = 0;
    offset += 2;
    const host = ip.toString(buf, offset, 16);
    raaaa.decode.bytes = 18;
    return host;
  };
  raaaa.decode.bytes = 0;
  raaaa.encodingLength = function() {
    return 18;
  };
  const roption = {};
  roption.encode = function(option, buf, offset) {
    if (!buf)
      buf = buffer.lW.allocUnsafe(roption.encodingLength(option));
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    const code = toCode(option.code);
    buf.writeUInt16BE(code, offset);
    offset += 2;
    if (option.data) {
      buf.writeUInt16BE(option.data.length, offset);
      offset += 2;
      option.data.copy(buf, offset);
      offset += option.data.length;
    } else {
      switch (code) {
        case 8:
          const spl = option.sourcePrefixLength || 0;
          const fam = option.family || (ip.isV4Format(option.ip) ? 1 : 2);
          const ipBuf = ip.toBuffer(option.ip);
          const ipLen = Math.ceil(spl / 8);
          buf.writeUInt16BE(ipLen + 4, offset);
          offset += 2;
          buf.writeUInt16BE(fam, offset);
          offset += 2;
          buf.writeUInt8(spl, offset++);
          buf.writeUInt8(option.scopePrefixLength || 0, offset++);
          ipBuf.copy(buf, offset, 0, ipLen);
          offset += ipLen;
          break;
        case 11:
          if (option.timeout) {
            buf.writeUInt16BE(2, offset);
            offset += 2;
            buf.writeUInt16BE(option.timeout, offset);
            offset += 2;
          } else {
            buf.writeUInt16BE(0, offset);
            offset += 2;
          }
          break;
        case 12:
          const len2 = option.length || 0;
          buf.writeUInt16BE(len2, offset);
          offset += 2;
          buf.fill(0, offset, offset + len2);
          offset += len2;
          break;
        case 14:
          const tagsLen = option.tags.length * 2;
          buf.writeUInt16BE(tagsLen, offset);
          offset += 2;
          for (const tag of option.tags) {
            buf.writeUInt16BE(tag, offset);
            offset += 2;
          }
          break;
        default:
          throw new Error(`Unknown roption code: ${option.code}`);
      }
    }
    roption.encode.bytes = offset - oldOffset;
    return buf;
  };
  roption.encode.bytes = 0;
  roption.decode = function(buf, offset) {
    if (!offset)
      offset = 0;
    const option = {};
    option.code = buf.readUInt16BE(offset);
    option.type = optioncodes_toString(option.code);
    offset += 2;
    const len2 = buf.readUInt16BE(offset);
    offset += 2;
    option.data = buf.slice(offset, offset + len2);
    switch (option.code) {
      case 8:
        option.family = buf.readUInt16BE(offset);
        offset += 2;
        option.sourcePrefixLength = buf.readUInt8(offset++);
        option.scopePrefixLength = buf.readUInt8(offset++);
        const padded = buffer.lW.alloc(option.family === 1 ? 4 : 16);
        buf.copy(padded, 0, offset, offset + len2 - 4);
        option.ip = ip.toString(padded);
        break;
      case 11:
        if (len2 > 0) {
          option.timeout = buf.readUInt16BE(offset);
          offset += 2;
        }
        break;
      case 14:
        option.tags = [];
        for (let i2 = 0; i2 < len2; i2 += 2) {
          option.tags.push(buf.readUInt16BE(offset));
          offset += 2;
        }
    }
    roption.decode.bytes = len2 + 4;
    return option;
  };
  roption.decode.bytes = 0;
  roption.encodingLength = function(option) {
    if (option.data) {
      return option.data.length + 4;
    }
    const code = toCode(option.code);
    switch (code) {
      case 8:
        const spl = option.sourcePrefixLength || 0;
        return Math.ceil(spl / 8) + 8;
      case 11:
        return typeof option.timeout === "number" ? 6 : 4;
      case 12:
        return option.length + 4;
      case 14:
        return 4 + option.tags.length * 2;
    }
    throw new Error(`Unknown roption code: ${option.code}`);
  };
  const ropt = {};
  ropt.encode = function(options, buf, offset) {
    if (!buf)
      buf = buffer.lW.allocUnsafe(ropt.encodingLength(options));
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    const rdlen = encodingLengthList(options, roption);
    buf.writeUInt16BE(rdlen, offset);
    offset = encodeList(options, roption, buf, offset + 2);
    ropt.encode.bytes = offset - oldOffset;
    return buf;
  };
  ropt.encode.bytes = 0;
  ropt.decode = function(buf, offset) {
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    const options = [];
    let rdlen = buf.readUInt16BE(offset);
    offset += 2;
    let o = 0;
    while (rdlen > 0) {
      options[o++] = roption.decode(buf, offset);
      offset += roption.decode.bytes;
      rdlen -= roption.decode.bytes;
    }
    ropt.decode.bytes = offset - oldOffset;
    return options;
  };
  ropt.decode.bytes = 0;
  ropt.encodingLength = function(options) {
    return 2 + encodingLengthList(options || [], roption);
  };
  const rdnskey = {};
  rdnskey.PROTOCOL_DNSSEC = 3;
  rdnskey.ZONE_KEY = 128;
  rdnskey.SECURE_ENTRYPOINT = 32768;
  rdnskey.encode = function(key, buf, offset) {
    if (!buf)
      buf = buffer.lW.allocUnsafe(rdnskey.encodingLength(key));
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    const keydata = key.key;
    if (!buffer.lW.isBuffer(keydata)) {
      throw new Error("Key must be a Buffer");
    }
    offset += 2;
    buf.writeUInt16BE(key.flags, offset);
    offset += 2;
    buf.writeUInt8(rdnskey.PROTOCOL_DNSSEC, offset);
    offset += 1;
    buf.writeUInt8(key.algorithm, offset);
    offset += 1;
    keydata.copy(buf, offset, 0, keydata.length);
    offset += keydata.length;
    rdnskey.encode.bytes = offset - oldOffset;
    buf.writeUInt16BE(rdnskey.encode.bytes - 2, oldOffset);
    return buf;
  };
  rdnskey.encode.bytes = 0;
  rdnskey.decode = function(buf, offset) {
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    var key = {};
    var length = buf.readUInt16BE(offset);
    offset += 2;
    key.flags = buf.readUInt16BE(offset);
    offset += 2;
    if (buf.readUInt8(offset) !== rdnskey.PROTOCOL_DNSSEC) {
      throw new Error("Protocol must be 3");
    }
    offset += 1;
    key.algorithm = buf.readUInt8(offset);
    offset += 1;
    key.key = buf.slice(offset, oldOffset + length + 2);
    offset += key.key.length;
    rdnskey.decode.bytes = offset - oldOffset;
    return key;
  };
  rdnskey.decode.bytes = 0;
  rdnskey.encodingLength = function(key) {
    return 6 + buffer.lW.byteLength(key.key);
  };
  const rrrsig = {};
  rrrsig.encode = function(sig, buf, offset) {
    if (!buf)
      buf = buffer.lW.allocUnsafe(rrrsig.encodingLength(sig));
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    const signature = sig.signature;
    if (!buffer.lW.isBuffer(signature)) {
      throw new Error("Signature must be a Buffer");
    }
    offset += 2;
    buf.writeUInt16BE(toType(sig.typeCovered), offset);
    offset += 2;
    buf.writeUInt8(sig.algorithm, offset);
    offset += 1;
    buf.writeUInt8(sig.labels, offset);
    offset += 1;
    buf.writeUInt32BE(sig.originalTTL, offset);
    offset += 4;
    buf.writeUInt32BE(sig.expiration, offset);
    offset += 4;
    buf.writeUInt32BE(sig.inception, offset);
    offset += 4;
    buf.writeUInt16BE(sig.keyTag, offset);
    offset += 2;
    dns_parser_name.encode(sig.signersName, buf, offset);
    offset += dns_parser_name.encode.bytes;
    signature.copy(buf, offset, 0, signature.length);
    offset += signature.length;
    rrrsig.encode.bytes = offset - oldOffset;
    buf.writeUInt16BE(rrrsig.encode.bytes - 2, oldOffset);
    return buf;
  };
  rrrsig.encode.bytes = 0;
  rrrsig.decode = function(buf, offset) {
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    var sig = {};
    var length = buf.readUInt16BE(offset);
    offset += 2;
    sig.typeCovered = types_toString(buf.readUInt16BE(offset));
    offset += 2;
    sig.algorithm = buf.readUInt8(offset);
    offset += 1;
    sig.labels = buf.readUInt8(offset);
    offset += 1;
    sig.originalTTL = buf.readUInt32BE(offset);
    offset += 4;
    sig.expiration = buf.readUInt32BE(offset);
    offset += 4;
    sig.inception = buf.readUInt32BE(offset);
    offset += 4;
    sig.keyTag = buf.readUInt16BE(offset);
    offset += 2;
    sig.signersName = dns_parser_name.decode(buf, offset);
    offset += dns_parser_name.decode.bytes;
    sig.signature = buf.slice(offset, oldOffset + length + 2);
    offset += sig.signature.length;
    rrrsig.decode.bytes = offset - oldOffset;
    return sig;
  };
  rrrsig.decode.bytes = 0;
  rrrsig.encodingLength = function(sig) {
    return 20 + dns_parser_name.encodingLength(sig.signersName) + buffer.lW.byteLength(sig.signature);
  };
  const rrp = {};
  rrp.encode = function(data, buf, offset) {
    if (!buf)
      buf = buffer.lW.allocUnsafe(rrp.encodingLength(data));
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    offset += 2;
    dns_parser_name.encode(data.mbox || ".", buf, offset);
    offset += dns_parser_name.encode.bytes;
    dns_parser_name.encode(data.txt || ".", buf, offset);
    offset += dns_parser_name.encode.bytes;
    rrp.encode.bytes = offset - oldOffset;
    buf.writeUInt16BE(rrp.encode.bytes - 2, oldOffset);
    return buf;
  };
  rrp.encode.bytes = 0;
  rrp.decode = function(buf, offset) {
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    const data = {};
    offset += 2;
    data.mbox = dns_parser_name.decode(buf, offset) || ".";
    offset += dns_parser_name.decode.bytes;
    data.txt = dns_parser_name.decode(buf, offset) || ".";
    offset += dns_parser_name.decode.bytes;
    rrp.decode.bytes = offset - oldOffset;
    return data;
  };
  rrp.decode.bytes = 0;
  rrp.encodingLength = function(data) {
    return 2 + dns_parser_name.encodingLength(data.mbox || ".") + dns_parser_name.encodingLength(data.txt || ".");
  };
  const typebitmap = {};
  typebitmap.encode = function(typelist, buf, offset) {
    if (!buf)
      buf = buffer.lW.allocUnsafe(typebitmap.encodingLength(typelist));
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    var typesByWindow = [];
    for (var i2 = 0; i2 < typelist.length; i2++) {
      var typeid = toType(typelist[i2]);
      if (typesByWindow[typeid >> 8] === void 0) {
        typesByWindow[typeid >> 8] = [];
      }
      typesByWindow[typeid >> 8][typeid >> 3 & 31] |= 1 << 7 - (typeid & 7);
    }
    for (i2 = 0; i2 < typesByWindow.length; i2++) {
      if (typesByWindow[i2] !== void 0) {
        var windowBuf = buffer.lW.from(typesByWindow[i2]);
        buf.writeUInt8(i2, offset);
        offset += 1;
        buf.writeUInt8(windowBuf.length, offset);
        offset += 1;
        windowBuf.copy(buf, offset);
        offset += windowBuf.length;
      }
    }
    typebitmap.encode.bytes = offset - oldOffset;
    return buf;
  };
  typebitmap.encode.bytes = 0;
  typebitmap.decode = function(buf, offset, length) {
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    var typelist = [];
    while (offset - oldOffset < length) {
      var window2 = buf.readUInt8(offset);
      offset += 1;
      var windowLength = buf.readUInt8(offset);
      offset += 1;
      for (var i2 = 0; i2 < windowLength; i2++) {
        var b = buf.readUInt8(offset + i2);
        for (var j = 0; j < 8; j++) {
          if (b & 1 << 7 - j) {
            var typeid = types_toString(window2 << 8 | i2 << 3 | j);
            typelist.push(typeid);
          }
        }
      }
      offset += windowLength;
    }
    typebitmap.decode.bytes = offset - oldOffset;
    return typelist;
  };
  typebitmap.decode.bytes = 0;
  typebitmap.encodingLength = function(typelist) {
    var extents = [];
    for (var i2 = 0; i2 < typelist.length; i2++) {
      var typeid = toType(typelist[i2]);
      extents[typeid >> 8] = Math.max(extents[typeid >> 8] || 0, typeid & 255);
    }
    var len2 = 0;
    for (i2 = 0; i2 < extents.length; i2++) {
      if (extents[i2] !== void 0) {
        len2 += 2 + Math.ceil((extents[i2] + 1) / 8);
      }
    }
    return len2;
  };
  const rnsec = {};
  rnsec.encode = function(record, buf, offset) {
    if (!buf)
      buf = buffer.lW.allocUnsafe(rnsec.encodingLength(record));
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    offset += 2;
    dns_parser_name.encode(record.nextDomain, buf, offset);
    offset += dns_parser_name.encode.bytes;
    typebitmap.encode(record.rrtypes, buf, offset);
    offset += typebitmap.encode.bytes;
    rnsec.encode.bytes = offset - oldOffset;
    buf.writeUInt16BE(rnsec.encode.bytes - 2, oldOffset);
    return buf;
  };
  rnsec.encode.bytes = 0;
  rnsec.decode = function(buf, offset) {
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    var record = {};
    var length = buf.readUInt16BE(offset);
    offset += 2;
    record.nextDomain = dns_parser_name.decode(buf, offset);
    offset += dns_parser_name.decode.bytes;
    record.rrtypes = typebitmap.decode(
      buf,
      offset,
      length - (offset - oldOffset)
    );
    offset += typebitmap.decode.bytes;
    rnsec.decode.bytes = offset - oldOffset;
    return record;
  };
  rnsec.decode.bytes = 0;
  rnsec.encodingLength = function(record) {
    return 2 + dns_parser_name.encodingLength(record.nextDomain) + typebitmap.encodingLength(record.rrtypes);
  };
  const rnsec3 = {};
  rnsec3.encode = function(record, buf, offset) {
    if (!buf)
      buf = buffer.lW.allocUnsafe(rnsec3.encodingLength(record));
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    const salt = record.salt;
    if (!buffer.lW.isBuffer(salt)) {
      throw new Error("salt must be a Buffer");
    }
    const nextDomain = record.nextDomain;
    if (!buffer.lW.isBuffer(nextDomain)) {
      throw new Error("nextDomain must be a Buffer");
    }
    offset += 2;
    buf.writeUInt8(record.algorithm, offset);
    offset += 1;
    buf.writeUInt8(record.flags, offset);
    offset += 1;
    buf.writeUInt16BE(record.iterations, offset);
    offset += 2;
    buf.writeUInt8(salt.length, offset);
    offset += 1;
    salt.copy(buf, offset, 0, salt.length);
    offset += salt.length;
    buf.writeUInt8(nextDomain.length, offset);
    offset += 1;
    nextDomain.copy(buf, offset, 0, nextDomain.length);
    offset += nextDomain.length;
    typebitmap.encode(record.rrtypes, buf, offset);
    offset += typebitmap.encode.bytes;
    rnsec3.encode.bytes = offset - oldOffset;
    buf.writeUInt16BE(rnsec3.encode.bytes - 2, oldOffset);
    return buf;
  };
  rnsec3.encode.bytes = 0;
  rnsec3.decode = function(buf, offset) {
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    var record = {};
    var length = buf.readUInt16BE(offset);
    offset += 2;
    record.algorithm = buf.readUInt8(offset);
    offset += 1;
    record.flags = buf.readUInt8(offset);
    offset += 1;
    record.iterations = buf.readUInt16BE(offset);
    offset += 2;
    const saltLength = buf.readUInt8(offset);
    offset += 1;
    record.salt = buf.slice(offset, offset + saltLength);
    offset += saltLength;
    const hashLength = buf.readUInt8(offset);
    offset += 1;
    record.nextDomain = buf.slice(offset, offset + hashLength);
    offset += hashLength;
    record.rrtypes = typebitmap.decode(
      buf,
      offset,
      length - (offset - oldOffset)
    );
    offset += typebitmap.decode.bytes;
    rnsec3.decode.bytes = offset - oldOffset;
    return record;
  };
  rnsec3.decode.bytes = 0;
  rnsec3.encodingLength = function(record) {
    return 8 + record.salt.length + record.nextDomain.length + typebitmap.encodingLength(record.rrtypes);
  };
  const rds = {};
  rds.encode = function(digest, buf, offset) {
    if (!buf)
      buf = buffer.lW.allocUnsafe(rds.encodingLength(digest));
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    const digestdata = digest.digest;
    if (!buffer.lW.isBuffer(digestdata)) {
      throw new Error("Digest must be a Buffer");
    }
    offset += 2;
    buf.writeUInt16BE(digest.keyTag, offset);
    offset += 2;
    buf.writeUInt8(digest.algorithm, offset);
    offset += 1;
    buf.writeUInt8(digest.digestType, offset);
    offset += 1;
    digestdata.copy(buf, offset, 0, digestdata.length);
    offset += digestdata.length;
    rds.encode.bytes = offset - oldOffset;
    buf.writeUInt16BE(rds.encode.bytes - 2, oldOffset);
    return buf;
  };
  rds.encode.bytes = 0;
  rds.decode = function(buf, offset) {
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    var digest = {};
    var length = buf.readUInt16BE(offset);
    offset += 2;
    digest.keyTag = buf.readUInt16BE(offset);
    offset += 2;
    digest.algorithm = buf.readUInt8(offset);
    offset += 1;
    digest.digestType = buf.readUInt8(offset);
    offset += 1;
    digest.digest = buf.slice(offset, oldOffset + length + 2);
    offset += digest.digest.length;
    rds.decode.bytes = offset - oldOffset;
    return digest;
  };
  rds.decode.bytes = 0;
  rds.encodingLength = function(digest) {
    return 6 + buffer.lW.byteLength(digest.digest);
  };
  const rhttpsvcb = {};
  rhttpsvcb.decode = function(buf, offset) {
    if (!offset)
      offset = 0;
    let oldOffset = offset;
    const rLen = buf.readUInt16BE(offset) + 2;
    offset += 2;
    let data = {};
    data.svcPriority = buf.readUInt16BE(offset);
    offset += 2;
    data.targetName = dns_parser_name.decode(buf, offset);
    offset += dns_parser_name.decode.bytes;
    data.svcParams = {};
    let svcKeyDecode;
    let svcParamKey;
    let svcKeyStr;
    while (offset != oldOffset + rLen) {
      svcParamKey = buf.readUInt16BE(offset);
      svcKeyStr = svcparamkey_toString(svcParamKey);
      svcKeyDecode = svcbKeyObj(svcKeyStr);
      offset += 2;
      data.svcParams[svcKeyStr] = svcKeyDecode.decode(buf, offset);
      offset += svcKeyDecode.decode.bytes;
    }
    rhttpsvcb.decode.bytes = offset - oldOffset;
    return data;
  };
  rhttpsvcb.decode.bytes = 0;
  rhttpsvcb.encode = function(data, buf, offset) {
    if (!buf)
      buf = buffer.lW.allocUnsafe(rhttpsvcb.encodingLength(data));
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    offset += 2;
    buf.writeUInt16BE(data.svcPriority, offset);
    offset += 2;
    dns_parser_name.encode(data.targetName, buf, offset);
    offset += dns_parser_name.encode.bytes;
    let svcbObj;
    for (let key of Object.keys(data.svcParams)) {
      buf.writeUInt16BE(toKey(key), offset);
      offset += 2;
      svcbObj = svcbKeyObj(key);
      svcbObj.encode(data.svcParams[key], buf, offset);
      offset += svcbObj.encode.bytes;
    }
    buf.writeUInt16BE(offset - oldOffset - 2, oldOffset);
    rhttpsvcb.encode.bytes = offset - oldOffset;
    return buf;
  };
  rhttpsvcb.encode.bytes = 0;
  rhttpsvcb.encodingLength = function(data) {
    var encLen = 4 + dns_parser_name.encodingLength(data.targetName);
    let svcbObj;
    for (let key of Object.keys(data.svcParams)) {
      svcbObj = svcbKeyObj(key);
      encLen += 2 + svcbObj.encodingLength(data.svcParams[key]);
    }
    return encLen;
  };
  const svcAlpn = {};
  svcAlpn.decode = function(buf, offset) {
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    var data = [];
    var length = buf.readUInt16BE(offset);
    offset += 2;
    var valueLength = 0;
    while (length != 0) {
      valueLength = buf.readUInt8(offset);
      offset += 1;
      length -= 1;
      data.push(buf.toString("utf-8", offset, offset + valueLength));
      offset += valueLength;
      length -= valueLength;
    }
    svcAlpn.decode.bytes = offset - oldOffset;
    return data;
  };
  svcAlpn.decode.bytes = 0;
  svcAlpn.encode = function(data, buf, offset) {
    if (!buf)
      buf = buffer.lW.allocUnsafe(svcAlpn.encodingLength(data));
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    offset += 2;
    for (let value of data) {
      buf.writeUInt8(buffer.lW.byteLength(value), offset);
      offset += 1;
      offset += buf.write(value, offset);
    }
    buf.writeUInt16BE(offset - oldOffset - 2, oldOffset);
    svcAlpn.encode.bytes = offset - oldOffset;
    return buf;
  };
  svcAlpn.encode.bytes = 0;
  svcAlpn.encodingLength = function(data) {
    var encLen = 2;
    for (let value of data) {
      encLen += 1 + buffer.lW.byteLength(value);
    }
    return encLen;
  };
  const svcIpv6 = {};
  svcIpv6.decode = function(buf, offset) {
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    var data = [];
    var length = buf.readUInt16BE(offset);
    offset += 2;
    while (length != 0) {
      data.push(ip.toString(buf, offset, 16));
      offset += 16;
      length -= 16;
    }
    svcIpv6.decode.bytes = offset - oldOffset;
    return data;
  };
  svcIpv6.decode.bytes = 0;
  svcIpv6.encode = function(data, buf, offset) {
    if (!buf)
      buf = buffer.lW.allocUnsafe(svcIpv6.encodingLength(data));
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    buf.writeUInt16BE(data.length * 16, offset);
    offset += 2;
    for (let value of data) {
      ip.toBuffer(value, buf, offset);
      offset += 16;
    }
    svcIpv6.encode.bytes = offset - oldOffset;
    return buf;
  };
  svcIpv6.encode.bytes = 0;
  svcIpv6.encodingLength = function(data) {
    return 2 + data.length * 16;
  };
  const svcIpv4 = {};
  svcIpv4.decode = function(buf, offset) {
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    var data = [];
    var length = buf.readUInt16BE(offset);
    offset += 2;
    while (length != 0) {
      data.push(ip.toString(buf, offset, 4));
      offset += 4;
      length -= 4;
    }
    svcIpv4.decode.bytes = offset - oldOffset;
    return data;
  };
  svcIpv4.decode.bytes = 0;
  svcIpv4.encode = function(data, buf, offset) {
    if (!buf)
      buf = buffer.lW.allocUnsafe(svcIpv4.encodingLength(data));
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    buf.writeUInt16BE(data.length * 4, offset);
    offset += 2;
    for (let value of data) {
      ip.toBuffer(value, buf, offset);
      offset += 4;
    }
    svcIpv4.encode.bytes = offset - oldOffset;
    return buf;
  };
  svcIpv4.encode.bytes = 0;
  svcIpv4.encodingLength = function(data) {
    return 2 + data.length * 4;
  };
  const svcMandatory = {};
  svcMandatory.decode = function(buf, offset) {
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    var data = [];
    var length = buf.readUInt16BE(offset);
    offset += 2;
    while (length != 0) {
      data.push(svcparamkey_toString(buf.readUInt16BE(offset)));
      offset += 2;
      length -= 2;
    }
    svcMandatory.decode.bytes = offset - oldOffset;
    return data;
  };
  svcMandatory.decode.bytes = 0;
  svcMandatory.encode = function(data, buf, offset) {
    if (!buf)
      buf = buffer.lW.allocUnsafe(svcMandatory.encodingLength(data));
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    buf.writeUInt16BE(data.length * 2, offset);
    offset += 2;
    for (let value of data) {
      buf.writeUInt16BE(toKey(value), offset);
      offset += 2;
    }
    svcMandatory.encode.bytes = offset - oldOffset;
    return buf;
  };
  svcMandatory.encode.bytes = 0;
  svcMandatory.encodingLength = function(data) {
    return 2 + data.length * 2;
  };
  const svcPort = {};
  svcPort.decode = function(buf, offset) {
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    var data = [];
    var length = buf.readUInt16BE(offset);
    offset += 2;
    while (length != 0) {
      data.push(buf.readUInt16BE(offset));
      offset += 2;
      length -= 2;
    }
    svcPort.decode.bytes = offset - oldOffset;
    return data;
  };
  svcPort.decode.bytes = 0;
  svcPort.encode = function(data, buf, offset) {
    if (!buf)
      buf = buffer.lW.allocUnsafe(svcPort.encodingLength(data));
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    buf.writeUInt16BE(data.length * 2, offset);
    offset += 2;
    for (let value of data) {
      buf.writeUInt16BE(value, offset);
      offset += 2;
    }
    svcPort.encode.bytes = offset - oldOffset;
    return buf;
  };
  svcPort.encode.bytes = 0;
  svcPort.encodingLength = function(data) {
    return 2 + data.length * 2;
  };
  const svcEch = {};
  svcEch.decode = function(buf, offset) {
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    var data;
    var length = buf.readUInt16BE(offset);
    offset += 2;
    data = buf.toString("base64", offset, offset + length);
    offset += length;
    svcEch.decode.bytes = offset - oldOffset;
    return data;
  };
  svcEch.decode.bytes = 0;
  svcEch.encode = function(data, buf, offset) {
    if (!buf)
      buf = buffer.lW.allocUnsafe(svcEch.encodingLength(data));
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    offset += 2;
    offset += buf.write(data, offset, "base64");
    buf.writeUInt16BE(offset - oldOffset - 2, oldOffset);
    svcEch.encode.bytes = offset - oldOffset;
    return buf;
  };
  svcEch.encode.bytes = 0;
  svcEch.encodingLength = function(data) {
    return 2 + buffer.lW.from(data, "base64").byteLength;
  };
  const svcOther = {};
  svcOther.decode = function(buf, offset) {
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    var data;
    var length = buf.readUInt16BE(offset);
    offset += 2;
    data = buf.slice(offset, offset + length);
    offset += length;
    svcOther.decode.bytes = offset - oldOffset;
    return data;
  };
  svcOther.decode.bytes = 0;
  svcOther.encode = function(data, buf, offset) {
    if (!buf)
      buf = buffer.lW.allocUnsafe(svcOther.encodingLength(data));
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    buf.writeUInt16BE(data.byteLength, offset);
    offset += 2;
    offset += data.copy(buf, offset);
    svcOther.encode.bytes = offset - oldOffset;
    return buf;
  };
  svcOther.encode.bytes = 0;
  svcOther.encodingLength = function(data) {
    return 2 + data.byteLength;
  };
  const svcbKeyObj = function(type) {
    switch (type.toLowerCase()) {
      case "mandatory":
        return svcMandatory;
      case "alpn":
        return svcAlpn;
      case "no-default-alpn":
        return svcAlpn;
      case "port":
        return svcPort;
      case "ipv4hint":
        return svcIpv4;
      case "ech":
        return svcEch;
      case "ipv6hint":
        return svcIpv6;
      default:
        return svcOther;
    }
  };
  const renc = function(type) {
    switch (type.toUpperCase()) {
      case "A":
        return ra;
      case "PTR":
        return rptr;
      case "CNAME":
        return rcname;
      case "DNAME":
        return rdname;
      case "TXT":
        return rtxt;
      case "NULL":
        return rnull;
      case "AAAA":
        return raaaa;
      case "SRV":
        return rsrv;
      case "HINFO":
        return rhinfo;
      case "CAA":
        return rcaa;
      case "NS":
        return rns;
      case "SOA":
        return rsoa;
      case "MX":
        return rmx;
      case "OPT":
        return ropt;
      case "DNSKEY":
        return rdnskey;
      case "RRSIG":
        return rrrsig;
      case "RP":
        return rrp;
      case "NSEC":
        return rnsec;
      case "NSEC3":
        return rnsec3;
      case "DS":
        return rds;
      case "HTTPS":
        return rhttpsvcb;
      case "SVCB":
        return rhttpsvcb;
    }
    return runknown;
  };
  const answer = {};
  answer.encode = function(a, buf, offset) {
    if (!buf)
      buf = buffer.lW.allocUnsafe(answer.encodingLength(a));
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    dns_parser_name.encode(a.name, buf, offset);
    offset += dns_parser_name.encode.bytes;
    buf.writeUInt16BE(toType(a.type), offset);
    if (a.type.toUpperCase() === "OPT") {
      if (a.name !== ".") {
        throw new Error("OPT name must be root.");
      }
      buf.writeUInt16BE(a.udpPayloadSize || 4096, offset + 2);
      buf.writeUInt8(a.extendedRcode || 0, offset + 4);
      buf.writeUInt8(a.ednsVersion || 0, offset + 5);
      buf.writeUInt16BE(a.flags || 0, offset + 6);
      offset += 8;
      ropt.encode(a.options || [], buf, offset);
      offset += ropt.encode.bytes;
    } else {
      let klass = toClass(a.class === void 0 ? "IN" : a.class);
      if (a.flush)
        klass |= FLUSH_MASK;
      buf.writeUInt16BE(klass, offset + 2);
      buf.writeUInt32BE(a.ttl || 0, offset + 4);
      offset += 8;
      const enc = renc(a.type);
      enc.encode(a.data, buf, offset);
      offset += enc.encode.bytes;
    }
    answer.encode.bytes = offset - oldOffset;
    return buf;
  };
  answer.encode.bytes = 0;
  answer.decode = function(buf, offset) {
    if (!offset)
      offset = 0;
    const a = {};
    const oldOffset = offset;
    a.name = dns_parser_name.decode(buf, offset);
    offset += dns_parser_name.decode.bytes;
    a.type = types_toString(buf.readUInt16BE(offset));
    if (a.type === "OPT") {
      a.udpPayloadSize = buf.readUInt16BE(offset + 2);
      a.extendedRcode = buf.readUInt8(offset + 4);
      a.ednsVersion = buf.readUInt8(offset + 5);
      a.flags = buf.readUInt16BE(offset + 6);
      a.flag_do = (a.flags >> 15 & 1) === 1;
      a.options = ropt.decode(buf, offset + 8);
      offset += 8 + ropt.decode.bytes;
    } else {
      const klass = buf.readUInt16BE(offset + 2);
      a.ttl = buf.readUInt32BE(offset + 4);
      a.class = classes_toString(klass & NOT_FLUSH_MASK);
      a.flush = !!(klass & FLUSH_MASK);
      const enc = renc(a.type);
      a.data = enc.decode(buf, offset + 8);
      offset += 8 + enc.decode.bytes;
    }
    answer.decode.bytes = offset - oldOffset;
    return a;
  };
  answer.decode.bytes = 0;
  answer.encodingLength = function(a) {
    const data = a.data !== null && a.data !== void 0 ? a.data : a.options;
    return dns_parser_name.encodingLength(a.name) + 8 + renc(a.type).encodingLength(data);
  };
  const question = {};
  question.encode = function(q, buf, offset) {
    if (!buf)
      buf = buffer.lW.allocUnsafe(question.encodingLength(q));
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    dns_parser_name.encode(q.name, buf, offset);
    offset += dns_parser_name.encode.bytes;
    buf.writeUInt16BE(toType(q.type), offset);
    offset += 2;
    buf.writeUInt16BE(
      toClass(q.class === void 0 ? "IN" : q.class),
      offset
    );
    offset += 2;
    question.encode.bytes = offset - oldOffset;
    return q;
  };
  question.encode.bytes = 0;
  question.decode = function(buf, offset) {
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    const q = {};
    q.name = dns_parser_name.decode(buf, offset);
    offset += dns_parser_name.decode.bytes;
    q.type = types_toString(buf.readUInt16BE(offset));
    offset += 2;
    q.class = classes_toString(buf.readUInt16BE(offset));
    offset += 2;
    const qu = !!(q.class & QU_MASK);
    if (qu)
      q.class &= NOT_QU_MASK;
    question.decode.bytes = offset - oldOffset;
    return q;
  };
  question.decode.bytes = 0;
  question.encodingLength = function(q) {
    return dns_parser_name.encodingLength(q.name) + 4;
  };
  const AUTHORITATIVE_ANSWER = null;
  const TRUNCATED_RESPONSE = null;
  const RECURSION_DESIRED = null;
  const RECURSION_AVAILABLE = null;
  const AUTHENTIC_DATA = null;
  const CHECKING_DISABLED = null;
  const DNSSEC_OK = null;
  const encode = function(result, buf, offset) {
    if (!buf)
      buf = buffer.lW.allocUnsafe(encodingLength(result));
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    if (!result.questions)
      result.questions = [];
    if (!result.answers)
      result.answers = [];
    if (!result.authorities)
      result.authorities = [];
    if (!result.additionals)
      result.additionals = [];
    header.encode(result, buf, offset);
    offset += header.encode.bytes;
    offset = encodeList(result.questions, question, buf, offset);
    offset = encodeList(result.answers, answer, buf, offset);
    offset = encodeList(result.authorities, answer, buf, offset);
    offset = encodeList(result.additionals, answer, buf, offset);
    encode.bytes = offset - oldOffset;
    return buf;
  };
  encode.bytes = 0;
  const decode = function(buf, offset) {
    if (!offset)
      offset = 0;
    const oldOffset = offset;
    const result = header.decode(buf, offset);
    offset += header.decode.bytes;
    offset = decodeList(result.questions, question, buf, offset);
    offset = decodeList(result.answers, answer, buf, offset);
    offset = decodeList(result.authorities, answer, buf, offset);
    offset = decodeList(result.additionals, answer, buf, offset);
    decode.bytes = offset - oldOffset;
    return result;
  };
  decode.bytes = 0;
  const encodingLength = function(result) {
    return header.encodingLength(result) + encodingLengthList(result.questions || [], question) + encodingLengthList(result.answers || [], answer) + encodingLengthList(result.authorities || [], answer) + encodingLengthList(result.additionals || [], answer);
  };
  const streamEncode = function(result) {
    const buf = encode(result);
    const sbuf = buffer.lW.allocUnsafe(2);
    sbuf.writeUInt16BE(buf.byteLength);
    const combine = buffer.lW.concat([sbuf, buf]);
    streamEncode.bytes = combine.byteLength;
    return combine;
  };
  streamEncode.bytes = 0;
  const streamDecode = function(sbuf) {
    const len2 = sbuf.readUInt16BE(0);
    if (sbuf.byteLength < len2 + 2) {
      return null;
    }
    const result = decode(sbuf.slice(2));
    streamDecode.bytes = decode.bytes;
    return result;
  };
  streamDecode.bytes = 0;
  function encodingLengthList(list, enc) {
    let len2 = 0;
    for (let i2 = 0; i2 < list.length; i2++)
      len2 += enc.encodingLength(list[i2]);
    return len2;
  }
  function encodeList(list, enc, buf, offset) {
    for (let i2 = 0; i2 < list.length; i2++) {
      enc.encode(list[i2], buf, offset);
      offset += enc.encode.bytes;
    }
    return offset;
  }
  function decodeList(list, enc, buf, offset) {
    for (let i2 = 0; i2 < list.length; i2++) {
      list[i2] = enc.decode(buf, offset);
      offset += enc.decode.bytes;
    }
    return offset;
  }
  ;
  function onFly() {
    if (!envManager)
      return false;
    return envManager.get("CLOUD_PLATFORM") === "fly";
  }
  function onDenoDeploy() {
    if (!envManager)
      return false;
    return envManager.get("CLOUD_PLATFORM") === "deno-deploy";
  }
  function onFastly() {
    if (!envManager)
      return false;
    return envManager.get("CLOUD_PLATFORM") === "fastly";
  }
  function onCloudflare() {
    if (!envManager)
      return false;
    return envManager.get("CLOUD_PLATFORM") === "cloudflare";
  }
  function onLocal() {
    if (!envManager)
      return false;
    return !onFly() && !onDenoDeploy() && !onCloudflare() && !onFastly();
  }
  function hasDisk() {
    return onFly() || onLocal();
  }
  function hasDynamicImports() {
    if (onDenoDeploy() || onCloudflare() || onFastly())
      return false;
    return true;
  }
  function hasHttpCache() {
    return isWorkers();
  }
  function isWorkers() {
    if (!envManager)
      return false;
    return envManager.r() === "worker";
  }
  function isFastly() {
    if (!envManager)
      return false;
    return envManager.r() === "fastly";
  }
  function isNode() {
    if (!envManager)
      return false;
    return envManager.r() === "node";
  }
  function isDeno() {
    if (!envManager)
      return false;
    return envManager.r() === "deno";
  }
  function workersTimeout(missing = 0) {
    if (!envManager)
      return missing;
    return envManager.get("WORKER_TIMEOUT") || missing;
  }
  function downloadTimeout(missing = 0) {
    if (!envManager)
      return missing;
    return envManager.get("CF_BLOCKLIST_DOWNLOAD_TIMEOUT") || missing;
  }
  function bgDownloadBlocklistWrapper() {
    if (!envManager)
      return false;
    return onCloudflare();
  }
  function blocklistUrl() {
    if (!envManager)
      return null;
    return envManager.get("CF_BLOCKLIST_URL");
  }
  function primaryDohResolver() {
    if (!envManager)
      return null;
    return envManager.get("CF_DNS_RESOLVER_URL");
  }
  function secondaryDohResolver() {
    if (!envManager)
      return null;
    return envManager.get("CF_DNS_RESOLVER_URL_2");
  }
  function cfAccountId() {
    if (!envManager)
      return "";
    return envManager.get("CF_ACCOUNT_ID") || "";
  }
  function cfApiToken() {
    if (!envManager)
      return "";
    return envManager.get("CF_API_TOKEN") || "";
  }
  function maxDohUrl() {
    if (!envManager)
      return null;
    return envManager.get("MAX_DNS_RESOLVER_URL");
  }
  function dohResolvers() {
    if (!envManager)
      return null;
    if (isWorkers()) {
      return [primaryDohResolver(), secondaryDohResolver()];
    }
    return [primaryDohResolver()];
  }
  function geoipUrl() {
    if (!envManager)
      return null;
    return envManager.get("GEOIP_URL");
  }
  function tlsCrtPath() {
    if (!envManager)
      return "";
    return envManager.get("TLS_CRT_PATH") || "";
  }
  function tlsKeyPath() {
    if (!envManager)
      return "";
    return envManager.get("TLS_KEY_PATH") || "";
  }
  function tlsCrt() {
    if (!envManager)
      return null;
    return envManager.get("TLS_CRT") || null;
  }
  function tlsKey() {
    if (!envManager)
      return null;
    return envManager.get("TLS_KEY") || null;
  }
  function cacheTtl() {
    if (!envManager)
      return 0;
    return envManager.get("CACHE_TTL");
  }
  function isDotOverProxyProto() {
    if (!envManager)
      return false;
    return envManager.get("DOT_HAS_PROXY_PROTO") || false;
  }
  function isCleartext() {
    if (!envManager)
      return false;
    return envManager.get("TLS_OFFLOAD") || false;
  }
  function tcpBacklog() {
    if (!envManager)
      return 100;
    return envManager.get("TCP_BACKLOG") || 100;
  }
  function maxconns() {
    if (!envManager)
      return 1e3;
    return envManager.get("MAXCONNS") || 1e3;
  }
  function minconns() {
    if (!envManager)
      return 50;
    return envManager.get("MINCONNS") || 50;
  }
  function ioTimeoutMs(missing = 0) {
    if (!envManager)
      return missing;
    return envManager.get("WORKER_TIMEOUT") || missing;
  }
  function shutdownTimeoutMs() {
    if (!envManager)
      return 60 * 1e3;
    return envManager.get("SHUTDOWN_TIMEOUT_MS") || 60 * 1e3;
  }
  function measureHeap() {
    return false;
    if (!envManager)
      return false;
    const reg = region();
    if (reg === "maa" || reg === "sin" || reg === "fra" || reg === "ams" || reg === "lhr" || reg === "cdg" || reg === "iad" || reg === "mia") {
      return true;
    }
    return envManager.get("MEASURE_HEAP") || false;
  }
  function blocklistDownloadOnly() {
    if (!envManager)
      return false;
    return envManager.get("BLOCKLIST_DOWNLOAD_ONLY");
  }
  function dohBackendPort() {
    return 8080;
  }
  function dohCleartextBackendPort() {
    return isCleartext() ? 8055 : 0;
  }
  function dotBackendPort() {
    return isDotOverProxyProto() ? 10001 : 1e4;
  }
  function dotProxyProtoBackendPort() {
    return isDotOverProxyProto() ? 1e4 : 0;
  }
  function dotCleartextBackendPort() {
    return isCleartext() ? 10555 : 0;
  }
  function httpCheckPort() {
    return 8888;
  }
  function profileDnsResolves() {
    if (!envManager)
      return false;
    return envManager.get("PROFILE_DNS_RESOLVES") || false;
  }
  function imageRef() {
    if (!envManager)
      return "";
    if (!onFly())
      return "";
    return envManager.get("FLY_IMAGE_REF") || "";
  }
  function secretb64() {
    if (!envManager)
      return null;
    return envManager.get("TOP_SECRET_512_B64") || null;
  }
  function accessKeys() {
    if (!envManager)
      return "";
    return envManager.get("ACCESS_KEYS") || null;
  }
  function forceDoh() {
    if (!envManager)
      return true;
    if (!isNode())
      return true;
    return envManager.get("NODE_DOH_ONLY") || false;
  }
  function avoidFetch() {
    if (!envManager)
      return false;
    if (!isNode())
      return false;
    return envManager.get("NODE_AVOID_FETCH") || false;
  }
  function disableDnsCache() {
    return profileDnsResolves();
  }
  function disableBlocklists() {
    if (!envManager)
      return false;
    if (blocklistDownloadOnly())
      return false;
    return envManager.get("DISABLE_BLOCKLISTS") || false;
  }
  function envutil_blockSubdomains() {
    if (!envManager)
      return true;
    return envManager.get("BLOCK_SUBDOMAINS") || true;
  }
  function recursive() {
    return onFly();
  }
  function logpushEnabled() {
    if (!envManager)
      return false;
    return envManager.get("LOGPUSH_ENABLED") || false;
  }
  function logpushHostnameAsLogid() {
    if (!envManager)
      return false;
    return envManager.get("LOGPUSH_HOSTNAME_AS_LOGID") || false;
  }
  function logpushSources() {
    if (!envManager)
      return null;
    const csv = envManager.get("LOGPUSH_SRC") || null;
    if (onCloudflare() || onLocal())
      return csv;
    return null;
  }
  function logpushPath() {
    if (!envManager)
      return "";
    const path = envManager.get("CF_LOGPUSH_R2_PATH") || "";
    if (onCloudflare() || onLocal())
      return path;
    return "";
  }
  function logpushAccessKey() {
    if (!envManager)
      return "";
    const accesskey = envManager.get("CF_LOGPUSH_R2_ACCESS_KEY") || "";
    if (onCloudflare() || onLocal())
      return accesskey;
    return "";
  }
  function logpushSecretKey() {
    if (!envManager)
      return "";
    const secretkey = envManager.get("CF_LOGPUSH_R2_SECRET_KEY") || "";
    if (onCloudflare() || onLocal())
      return secretkey;
    return "";
  }
  function gwip4() {
    if (!envManager)
      return "";
    return envManager.get("GW_IP4") || "";
  }
  function gwip6() {
    if (!envManager)
      return "";
    return envManager.get("GW_IP6") || "";
  }
  function region() {
    if (!envManager)
      return "";
    return envManager.get("FLY_REGION") || "";
  }
  function metrics() {
    const nobinding = [null, null];
    if (!envManager)
      return nobinding;
    if (onCloudflare()) {
      return [
        envManager.get("METRICS") || null,
        envManager.get("BL_METRICS") || null
      ];
    }
    return nobinding;
  }
  ;
  const ZERO = new Uint8Array();
  const ZEROSTR = "";
  const ZEROAB = new ArrayBuffer();
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  function fromStr(s) {
    if (util.emptyString(s))
      return ZERO;
    return encoder.encode(s);
  }
  function toStr(b) {
    if (emptyBuf(b))
      return ZEROSTR;
    return decoder.decode(b);
  }
  function fromB64(b64std) {
    if (util.emptyString(b64std))
      return ZERO;
    return Buffer.from(b64std, "base64");
  }
  function toB64(buf) {
    if (emptyBuf(buf))
      return ZEROSTR;
    if (buf instanceof Buffer)
      return buf.toString("base64");
    const u8 = normalize8(buf);
    return Buffer.of(u8).toString("base64");
  }
  function bufutil_hex(b) {
    if (emptyBuf(b))
      return ZEROSTR;
    if (b instanceof buffer.lW)
      return b.toString("hex");
    const ab = normalize8(b);
    return Array.prototype.map.call(new Uint8Array(ab), (b2) => b2.toString(16).padStart(2, "0")).join("");
  }
  function len(b) {
    if (emptyBuf(b))
      return 0;
    return b.byteLength;
  }
  function bytesToBase64Url(b) {
    return btoa(String.fromCharCode(...new Uint8Array(b))).replace(/\//g, "_").replace(/\+/g, "-").replace(/=/g, "");
  }
  function binaryStringToBytes(bs) {
    const len2 = bs.length;
    const bytes = new Uint8Array(len2);
    for (let i2 = 0; i2 < len2; i2++) {
      bytes[i2] = bs.charCodeAt(i2);
    }
    return bytes;
  }
  function regularBase64(b64url) {
    if (emptyString(b64url))
      return b64url;
    return b64url.replace(/_/g, "/").replace(/-/g, "+");
  }
  function base64ToUint8(b64uri) {
    b64uri = normalizeb64(b64uri);
    const b64url = decodeURI(b64uri);
    const binaryStr = atob(regularBase64(b64url));
    return binaryStringToBytes(binaryStr);
  }
  function base64ToUint16(b64uri) {
    b64uri = normalizeb64(b64uri);
    const b64url = decodeURI(b64uri);
    const binaryStr = atob(regularBase64(b64url));
    return decodeFromBinary(binaryStr);
  }
  function base64ToBytes(b64uri) {
    return raw(base64ToUint8(b64uri));
  }
  function decodeFromBinary(b, u8) {
    if (u8)
      return new Uint16Array(raw(b));
    const bytes = binaryStringToBytes(b);
    return new Uint16Array(raw(bytes));
  }
  function decodeFromBinaryArray(b) {
    const u8 = true;
    return decodeFromBinary(b, u8);
  }
  function emptyBuf(b) {
    return !b || b.byteLength <= 0;
  }
  function raw(b) {
    if (!b || b.buffer == null)
      b = ZERO;
    return b.buffer;
  }
  function normalize8(b) {
    if (emptyBuf(b))
      return ZERO;
    let underlyingBuffer = null;
    if (b instanceof ArrayBuffer)
      underlyingBuffer = b;
    else if (b instanceof buffer.lW)
      underlyingBuffer = arrayBufferOf(b);
    else
      underlyingBuffer = raw(b);
    return new Uint8Array(underlyingBuffer);
  }
  function arrayBufferOf(buf) {
    if (emptyBuf(buf))
      return ZEROAB;
    const offset = buf.byteOffset;
    const len2 = buf.byteLength;
    return buf.buffer.slice(offset, offset + len2);
  }
  function bufferOf(arrayBuf) {
    if (emptyBuf(arrayBuf))
      return ZERO;
    if (arrayBuf instanceof Uint8Array)
      return arrayBuf;
    return buffer.lW.from(new Uint8Array(arrayBuf));
  }
  function recycleBuffer(b) {
    b.fill(0);
    return 0;
  }
  function createBuffer(size2) {
    return Buffer.allocUnsafe(size2);
  }
  function encodeUint8ArrayBE(n, len2) {
    const o = n;
    if (!n)
      return new Uint8Array(len2);
    const a = [];
    a.unshift(n & 255);
    while (n >= 256) {
      n = n >>> 8;
      a.unshift(n & 255);
    }
    if (a.length > len2) {
      throw new RangeError(`Cannot encode ${o} in ${len2} len Uint8Array`);
    }
    let fill = len2 - a.length;
    while (fill--)
      a.unshift(0);
    return new Uint8Array(a);
  }
  function concat(arraybuffers) {
    const sz = arraybuffers.reduce((sum, a) => sum + a.byteLength, 0);
    const buf = new ArrayBuffer(sz);
    const cat = new Uint8Array(buf);
    let offset = 0;
    for (const a of arraybuffers) {
      const v = new Uint8Array(a);
      cat.set(v, offset);
      offset += a.byteLength;
    }
    return buf;
  }
  function concatBuf(these) {
    return buffer.lW.concat(these);
  }
  function normalizeb64(s) {
    if (emptyString(s))
      return "";
    else
      return s;
  }
  ;
  const dnsHeaderSize = 2;
  const dnsPacketHeaderSize = 12;
  const minDNSPacketSize = dnsPacketHeaderSize + 5;
  const maxDNSPacketSize = 4096;
  const _dnsCloudflareSec4 = "1.1.1.2";
  const _dnsFly6 = "fdaa::3";
  const _dnsCacheSize = 3e4;
  const _minRequestTimeout = 4e3;
  const _maxRequestTimeout = 3e4;
  function dnsaddr() {
    if (recursive())
      return _dnsFly6;
    return _dnsCloudflareSec4;
  }
  function cacheSize() {
    return _dnsCacheSize;
  }
  function isAnswer(packet) {
    if (emptyObj(packet))
      return false;
    return packet.type === "response";
  }
  function mkQ(qid, qs) {
    if (emptyArray(qs))
      return null;
    return encode({
      id: qid || 0,
      type: "query",
      questions: qs
    });
  }
  function dnsutil_servfail(qid, qs) {
    if (qid == null || qid < 0 || emptyArray(qs))
      return ZEROAB;
    return dnsutil_encode({
      id: qid,
      type: "response",
      flags: 4098,
      questions: qs
    });
  }
  function servfailQ(q) {
    if (bufutil.emptyBuf(q))
      return bufutil.ZEROAB;
    try {
      const p = dnsutil_decode(q);
      return dnsutil_servfail(p.id, p.questions);
    } catch (e) {
      return bufutil.ZEROAB;
    }
  }
  function requestTimeout() {
    const t2 = workersTimeout();
    return t2 > _minRequestTimeout ? Math.min(t2, _maxRequestTimeout) : _minRequestTimeout;
  }
  function truncated(ans) {
    if (emptyBuf(ans))
      return false;
    if (ans.byteLength < dnsPacketHeaderSize)
      return false;
    const flags = ans.readUInt16BE(2);
    const tc = flags >> 9 & 1;
    return tc === 1;
  }
  function validResponseSize(r) {
    return r && validateSize(r.byteLength);
  }
  function validateSize(sz) {
    return sz >= minDNSPacketSize && sz <= maxDNSPacketSize;
  }
  function hasAnswers(packet) {
    return !emptyObj(packet) && !emptyArray(packet.answers);
  }
  function hasSingleQuestion(packet) {
    return !emptyObj(packet) && !emptyArray(packet.questions) && packet.questions.length === 1;
  }
  function rcodeNoError(packet) {
    if (emptyObj(packet))
      return false;
    return packet.rcode === "NOERROR";
  }
  function hasDnssecOk(packet) {
    if (emptyObj(packet))
      return false;
    if (emptyArray(packet.additionals))
      return false;
    for (const a of packet.additionals) {
      if (a.flag_do || (a.flags >> 15 & 1) === 1)
        return true;
    }
    return false;
  }
  function dropOPT(packet) {
    let rmv = false;
    if (emptyObj(packet))
      return [packet, rmv];
    if (emptyArray(packet.additionals))
      return [packet, rmv];
    const filtered = [];
    for (const a of packet.additionals) {
      if (optAnswer(a)) {
        rmv = true;
        continue;
      }
      filtered.push(a);
    }
    if (rmv) {
      packet.additionals = filtered;
    }
    return [packet, rmv];
  }
  function dropECS(packet) {
    let rmv = false;
    if (emptyObj(packet))
      return [packet, rmv];
    if (emptyArray(packet.additionals))
      return [packet, rmv];
    for (const a of packet.additionals) {
      if (!optAnswer(a))
        continue;
      const filtered = [];
      for (const opt of a.options) {
        if (opt.code === 8 || opt.type === "CLIENT_SUBNET") {
          rmv = true;
          continue;
        }
        filtered.push(opt);
      }
      a.options = filtered;
    }
    return [packet, rmv];
  }
  function optAnswer(a) {
    if (emptyObj(a) || emptyString(a.type))
      return false;
    return a.type.toUpperCase() === "OPT";
  }
  function dnsutil_decode(arrayBuffer) {
    if (!validResponseSize(arrayBuffer)) {
      throw new Error("failed decoding an invalid dns-packet");
    }
    const b = bufferOf(arrayBuffer);
    return decode(b);
  }
  function dnsutil_encode(obj) {
    if (emptyObj(obj)) {
      throw new Error("failed encoding an empty dns-obj");
    }
    const b = encode(obj);
    return arrayBufferOf(b);
  }
  function isQtypeA(qt) {
    return qt === "A";
  }
  function isQtypeAAAA(qt) {
    return qt === "AAAA";
  }
  function isQtypeCname(qt) {
    return qt === "CNAME";
  }
  function isQtypeHttps(qt) {
    return qt === "HTTPS" || qt === "SVCB";
  }
  function queryTypeMayResultInIP(t2) {
    return isQtypeA(t2) || isQtypeAAAA(t2) || isQtypeCname(t2) || isQtypeHttps(t2);
  }
  function queryMayResultInIP(q) {
    if (emptyObj(q))
      return false;
    if (emptyString(q.type))
      return false;
    return queryTypeMayResultInIP(q.type.toUpperCase());
  }
  function isQueryBlockable(packet) {
    if (!hasSingleQuestion(packet))
      return false;
    const q = packet.questions[0];
    return queryMayResultInIP(q);
  }
  function isAnswerBlockable(packet) {
    return isCname(packet) || isHttps(packet);
  }
  function isAnswerDS(ans) {
    return !emptyObj(ans) && ans.type === "DS";
  }
  function isAnswerRRSIG(ans) {
    return !emptyObj(ans) && ans.type === "RRSIG";
  }
  function isAnswerDNSKEY(ans) {
    return !emptyObj(ans) && ans.type === "DNSKEY";
  }
  function isAnswerRP(ans) {
    return !emptyObj(ans) && ans.type === "RP";
  }
  function isAnswerTXT(ans) {
    return !emptyObj(ans) && ans.type === "TXT";
  }
  function isAnswerNS(ans) {
    return !emptyObj(ans) && ans.type === "NS";
  }
  function isAnswerOPT(ans) {
    return !util.emptyObj(ans) && ans.type === "OPT";
  }
  function isAnswerMX(ans) {
    return !emptyObj(ans) && ans.type === "MX";
  }
  function isAnswerCAA(ans) {
    return !emptyObj(ans) && ans.type === "CAA";
  }
  function isAnswerSRV(ans) {
    return !emptyObj(ans) && ans.type === "SRV";
  }
  function isAnswerHINFO(ans) {
    return !emptyObj(ans) && ans.type === "HINFO";
  }
  function isAnswerSOA(ans) {
    return !emptyObj(ans) && ans.type === "SOA";
  }
  function isAnswerOPTION(ans) {
    return !emptyObj(ans) && ans.type === "OPTION";
  }
  function isAnswerA(ans) {
    return !emptyObj(ans) && ans.type === "A";
  }
  function isAnswerAAAA(ans) {
    return !emptyObj(ans) && ans.type === "AAAA";
  }
  function isCname(anspacket) {
    return hasAnswers(anspacket) && isAnswerCname(anspacket.answers[0]);
  }
  function isAnswerCname(ans) {
    return !emptyObj(ans) && ans.type === "CNAME";
  }
  function isHttps(anspacket) {
    return hasAnswers(anspacket) && isAnswerHttps(anspacket.answers[0]);
  }
  function isAnswerHttps(ans) {
    return !emptyObj(ans) && !emptyString(ans.type) && (ans.type === "HTTPS" || ans.type === "SVCB");
  }
  function isIPGrounded(ip2) {
    return ip2 === "0.0.0.0" || ip2 === "::";
  }
  function isAnswerBlocked(ans) {
    for (const a of ans) {
      if (isIPGrounded(a.data)) {
        return true;
      }
    }
    return false;
  }
  function isAnswerQuad0(packet) {
    if (!isQueryBlockable(packet))
      return false;
    if (!hasAnswers(packet))
      return false;
    return isAnswerBlocked(packet.answers);
  }
  function extractDomains(dnsPacket) {
    if (!hasSingleQuestion(dnsPacket))
      return [];
    const names = /* @__PURE__ */ new Set();
    const answers = dnsPacket.answers;
    const q = normalizeName(dnsPacket.questions[0].name);
    names.add(q);
    if (emptyArray(answers))
      return [...names];
    for (const a of answers) {
      if (a && !emptyString(a.name)) {
        const n = normalizeName(a.name);
        names.add(n);
      }
      if (isAnswerCname(a) && !emptyString(a.data)) {
        const n = normalizeName(a.data);
        names.add(n);
      } else if (isAnswerHttps(a) && a.data && !emptyString(a.data.targetName)) {
        const n = normalizeName(a.data.targetName);
        if (n !== ".")
          names.add(n);
      }
    }
    return [...names];
  }
  function getInterestingAnswerData(packet, maxlen = 80, delim2 = "|") {
    if (!hasAnswers(packet)) {
      return !emptyObj(packet) ? packet.rcode || "WTF" : "WTF";
    }
    let atleastoneip = false;
    let str = "";
    for (const a of packet.answers) {
      if (atleastoneip && str.length > maxlen)
        break;
      if (!atleastoneip && str.length > maxlen * 2)
        break;
      if (isAnswerA(a) || isAnswerAAAA(a)) {
        const dat = a.data || "";
        if (!emptyString(dat))
          str = dat + delim2 + str;
        atleastoneip = true;
      } else if (isAnswerOPTION(a) || isAnswerNS(a) || isAnswerTXT(a)) {
        const dat = a.data || "";
        if (!emptyString(dat))
          str += dat + delim2;
      } else if (isAnswerSOA(a)) {
        str += a.data.mname + delim2;
      } else if (isAnswerHINFO(a)) {
        str += a.data.os + delim2;
        break;
      } else if (isAnswerSRV(a)) {
        str += a.data.target + delim2;
      } else if (isAnswerCAA(a)) {
        str += a.data.value + delim2;
      } else if (isAnswerMX(a)) {
        str += a.data.exchange + delim2;
      } else if (isAnswerRP(a)) {
        str += a.data.mbox + delim2;
        break;
      } else if (isAnswerHttps(a)) {
        const t2 = a.data.targetName;
        const kv = a.data.svcParams;
        if (t2 === ".") {
          if (emptyObj(kv))
            continue;
          if (!emptyArray(kv.ipv4hint) && !emptyString(kv.ipv4hint[0])) {
            str = kv.ipv4hint[0] + delim2 + str;
            atleastoneip = true;
          }
          if (!emptyArray(kv.ipv6hint) && !emptyString(kv.ipv6hint[0])) {
            str = kv.ipv6hint[0] + delim2 + str;
            atleastoneip = true;
          }
        } else {
          str += t2 + delim2;
        }
      } else if (isAnswerDNSKEY(a)) {
        str += bytesToBase64Url(a.data.key) + delim2;
        break;
      } else if (isAnswerDS(a)) {
        str += bytesToBase64Url(a.data.digest) + delim2;
        break;
      } else if (isAnswerRRSIG(a)) {
        str += bytesToBase64Url(a.data.signature) + delim2;
        break;
      } else if (isAnswerCname(a)) {
        str += a.data + delim2;
      } else {
        break;
      }
    }
    const trunc = strstr(str, 0, maxlen);
    const idx = trunc.lastIndexOf(delim2);
    return idx >= 0 ? strstr(trunc, 0, idx) : trunc;
  }
  function dohStatusCode(b) {
    if (!b || !b.byteLength)
      return 412;
    if (b.byteLength > maxDNSPacketSize)
      return 413;
    if (b.byteLength < minDNSPacketSize)
      return 400;
    return 200;
  }
  function getQueryName(questions) {
    if (emptyArray(questions))
      return false;
    const qn = normalizeName(questions[0].name);
    return emptyString(qn) ? false : qn;
  }
  function getQueryType(packet) {
    if (!hasSingleQuestion(packet))
      return false;
    const qt = packet.questions[0].type;
    return emptyString(qt) ? false : qt;
  }
  function normalizeName(n) {
    if (emptyString(n))
      return n;
    return n.trim().toLowerCase();
  }
  ;
  class BlocklistFilter {
    constructor() {
      this.ftrie = null;
      this.filetag = null;
    }
    load(frozentrie, filetag2) {
      this.ftrie = frozentrie;
      this.filetag = filetag2;
    }
    blockstamp(domainName) {
      const n = normalizeName(domainName);
      return this.lookup(n);
    }
    lookup(n) {
      const t2 = this.ftrie;
      try {
        n = t2.transform(n);
        return t2.lookup(n);
      } catch (ignored) {
        log.d("blf lookup err:", ignored.message);
      }
      return null;
    }
    extract(ids) {
      const r = {};
      for (const id of ids)
        r[id] = this.filetag[id];
      return r;
    }
  }
  ;
  const trie_config_defaults = {
    inspect: false,
    debug: false,
    useCodec6: false,
    optflags: false
  };
  function trie_config_withDefaults(cfg) {
    const base = Object.assign({}, trie_config_defaults);
    return Object.assign(base, cfg);
  }
  ;
  class RResp {
    constructor(data = null, hasex = false, exfrom = "", exstack = "") {
      this.data = data || new RespData();
      this.isException = hasex;
      this.exceptionFrom = exfrom;
      this.exceptionStack = exstack;
    }
  }
  class RespData {
    constructor(blocked = false, flag, packet, raw2, stamps) {
      this.isBlocked = blocked;
      this.flag = flag || "";
      this.dnsPacket = packet || null;
      this.dnsBuffer = raw2 || null;
      this.stamps = stamps || {};
    }
  }
  function emptyResponse() {
    return new RResp();
  }
  function errResponse(id, err) {
    const data = null;
    const hasex = true;
    const st = emptyObj(err) || !err.stack ? "no-stacktrace" : err.stack;
    return new RResp(data, hasex, id, st);
  }
  function dnsResponse(packet = null, raw2 = null, stamps = null) {
    if (emptyObj(packet) || emptyBuf(raw2)) {
      throw new Error("empty packet for dns-res");
    }
    const flags = "";
    const blocked = false;
    return new RespData(blocked, flags, packet, raw2, stamps);
  }
  function rdnsBlockResponse(flag) {
    if (emptyString(flag)) {
      throw new Error("no flag set for block-res");
    }
    const blocked = true;
    return new RespData(blocked, flag);
  }
  function rdnsNoBlockResponse() {
    return new RespData(false);
  }
  function copyOnlyBlockProperties(to, from) {
    to.isBlocked = from.isBlocked;
    to.flag = from.flag;
    return to;
  }
  ;
  const u6_basicconfig_namespaceObject = JSON.parse('{"version":1,"nodecount":67283028,"inspect":false,"debug":false,"selectsearch":true,"useCodec6":true,"optflags":true,"tdpartsmaxmb":0,"timestamp":"2023/1692914162974","tdparts":-1,"tdmd5":"75ecf6d50e1ae759ee3c1b782533d17f","rdmd5":"39ea44bdab58b4e35ebf33b7ec8c65ff","ftmd5":"56815e176e71447091a83f1c213d59ea","ftlmd5":"623c7a4c0d5e49146f6be03a8fe3dfb7"}');
  ;
  const u6_filetag_namespaceObject = JSON.parse(`{"0":{"value":0,"uname":"0","vname":"Prevent bypass","group":"ParentalControl","subg":"BypassMethods","url":["https://raw.githubusercontent.com/hagezi/dns-blocklists/main/wildcard/doh-vpn-proxy-bypass.txt","https://raw.githubusercontent.com/cbuijs/accomplist/master/doh/deugniets.black.list"],"format":["wildcard","domains"],"pack":["vpn & proxies"],"level":[1],"entries":65292,"discards":733},"1":{"value":1,"uname":"1","vname":"Safe Search Only","group":"ParentalControl","subg":"SafeSearch","url":["https://raw.githubusercontent.com/nextdns/no-safesearch/main/domains"],"format":"domains","pack":[],"level":[],"entries":175,"discards":0},"2":{"value":2,"uname":"2","vname":"Dating (Olbat + ShadowWhisperer)","group":"ParentalControl","subg":"","url":["https://raw.githubusercontent.com/olbat/ut1-blacklists/master/blacklists/dating/domains","https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/master/Lists/Dating"],"format":["domains","domains"],"pack":["dating"],"level":[0],"entries":4856,"discards":632},"3":{"value":3,"uname":"3","vname":"Gambling (Olbat + hostsVN)","group":"ParentalControl","subg":"","url":["https://raw.githubusercontent.com/olbat/ut1-blacklists/master/blacklists/gambling/domains","https://raw.githubusercontent.com/bigdargon/hostsVN/master/extensions/gambling/hosts"],"format":["domains","hosts"],"pack":["gambling"],"level":[0],"entries":163017,"discards":2598},"4":{"value":4,"uname":"4","vname":"Gambling (Sinfonietta)","group":"ParentalControl","subg":"Sinfonietta","url":["https://raw.githubusercontent.com/Sinfonietta/hostfiles/master/gambling-hosts"],"format":"hosts","pack":["gambling"],"level":[2],"entries":2577,"discards":1159},"5":{"value":5,"uname":"5","vname":"Torrents (DHT nodes)","group":"ParentalControl","subg":"Piracy","url":["https://raw.githubusercontent.com/nextdns/piracy-blocklists/master/dht-bootstrap-nodes"],"format":"domains","pack":["torrents","file-hosts","piracy"],"level":[0,1,0],"entries":5,"discards":0},"6":{"value":6,"uname":"6","vname":"File hosting","group":"ParentalControl","subg":"Piracy","url":["https://raw.githubusercontent.com/nextdns/piracy-blocklists/master/file-hosting","https://raw.githubusercontent.com/nextdns/bin-domains/main/hostnames","https://raw.githubusercontent.com/nextdns/bin-domains/main/domains"],"format":["domains","domains","domains"],"pack":["file-hosts","piracy"],"level":[0,2],"entries":193,"discards":8},"7":{"value":7,"uname":"7","vname":"Proxies","group":"ParentalControl","subg":"RPiList","url":["https://raw.githubusercontent.com/nextdns/piracy-blocklists/master/proxies","https://raw.githubusercontent.com/RPiList/specials/master/Blocklisten/proxies"],"format":["domains","domains"],"pack":["vpn & proxies","piracy"],"level":[0,2],"entries":202307,"discards":93619},"8":{"value":8,"uname":"8","vname":"Streaming Audio","group":"ParentalControl","subg":"Piracy","url":["https://raw.githubusercontent.com/nextdns/piracy-blocklists/master/streaming-audio"],"format":"domains","pack":["streams","piracy"],"level":[0,2],"entries":65,"discards":0},"9":{"value":9,"uname":"9","vname":"Streaming Video","group":"ParentalControl","subg":"RPiList","url":["https://raw.githubusercontent.com/nextdns/piracy-blocklists/master/streaming-video","https://raw.githubusercontent.com/RPiList/specials/master/Blocklisten/Streaming","https://raw.githubusercontent.com/nickspaargaren/no-amazon/master/categories/amazonvideoparsed"],"format":["domains","domains","domains"],"pack":["streams","piracy"],"level":[0,2],"entries":1099,"discards":15},"10":{"value":10,"uname":"10","vname":"Torrent Clients","group":"ParentalControl","subg":"Piracy","url":["https://raw.githubusercontent.com/nextdns/piracy-blocklists/master/torrent-clients"],"format":"domains","pack":["torrents","piracy"],"level":[0,1],"entries":31,"discards":0},"11":{"value":11,"uname":"11","vname":"Torrent Trackers","group":"ParentalControl","subg":"Piracy","url":["https://raw.githubusercontent.com/nextdns/piracy-blocklists/master/torrent-trackers"],"format":"domains","pack":["torrents","piracy"],"level":[0,1],"entries":351,"discards":14},"12":{"value":12,"uname":"12","vname":"Torrent Websites","group":"ParentalControl","subg":"Piracy","url":["https://raw.githubusercontent.com/nextdns/piracy-blocklists/master/torrent-websites"],"format":"domains","pack":["torrents","piracy"],"level":[0,2],"entries":1266,"discards":12},"13":{"value":13,"uname":"13","vname":"Usenet","group":"ParentalControl","subg":"Piracy","url":["https://raw.githubusercontent.com/nextdns/piracy-blocklists/master/usenet"],"format":"domains","pack":["file-hosts","piracy"],"level":[2,1],"entries":12,"discards":0},"14":{"value":14,"uname":"14","vname":"Warez","group":"ParentalControl","subg":"Piracy","url":["https://raw.githubusercontent.com/nextdns/piracy-blocklists/master/warez"],"format":"domains","pack":["file-hosts","piracy"],"level":[2,2],"entries":133,"discards":0},"15":{"value":15,"uname":"15","vname":"Adult (Tiuxo)","group":"ParentalControl","subg":"Tiuxo","url":["https://raw.githubusercontent.com/tiuxo/hosts/master/porn"],"format":"hosts","pack":["adult"],"level":[0],"entries":369,"discards":2},"16":{"value":16,"uname":"16","vname":"Adult (StevenBlack)","group":"ParentalControl","subg":"StevenBlack","url":["https://raw.githubusercontent.com/StevenBlack/hosts/master/alternates/porn/hosts"],"format":"hosts","pack":["adult"],"level":[0],"entries":264754,"discards":121648},"17":{"value":17,"uname":"17","vname":"Adult (cbuijs)","group":"ParentalControl","subg":"","url":["https://raw.githubusercontent.com/cbuijs/accomplist/master/family-safe/plain.black.domain.list"],"format":"domains","pack":["adult"],"level":[1],"entries":1683332,"discards":11682},"18":{"value":18,"uname":"18","vname":"Adult (ShadowWhisperer)","group":"ParentalControl","subg":"","url":["https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/master/Lists/Adult"],"format":"domains","pack":["adult"],"level":[2],"entries":252722,"discards":66},"19":{"value":19,"uname":"19","vname":"Social networks (Olbat)","group":"ParentalControl","subg":"Olbat","url":["https://raw.githubusercontent.com/olbat/ut1-blacklists/master/blacklists/social_networks/domains"],"format":"domains","pack":["socialmedia"],"level":[0],"entries":700,"discards":0},"20":{"value":20,"uname":"20","vname":"9Gag","group":"ParentalControl","subg":"Services","url":["https://raw.githubusercontent.com/nextdns/services/main/services/9gag"],"format":"domains","pack":["vanity"],"level":[1],"entries":2,"discards":0},"21":{"value":21,"uname":"21","vname":"Amazon","group":"ParentalControl","subg":"Services","url":["https://raw.githubusercontent.com/nickspaargaren/no-amazon/master/amazon.txt","https://raw.githubusercontent.com/nextdns/services/main/services/amazon"],"format":["domains","domains"],"pack":["shopping","amazon"],"level":[0,0],"entries":3552,"discards":2461},"22":{"value":22,"uname":"22","vname":"Blizzard","group":"ParentalControl","subg":"Services","url":["https://raw.githubusercontent.com/nextdns/services/main/services/blizzard"],"format":"domains","pack":["gaming"],"level":[0],"entries":2,"discards":0},"23":{"value":23,"uname":"23","vname":"Daily Motion","group":"ParentalControl","subg":"Services","url":["https://raw.githubusercontent.com/nextdns/services/main/services/dailymotion"],"format":"domains","pack":["streams"],"level":[0],"entries":3,"discards":0},"24":{"value":24,"uname":"24","vname":"Discord","group":"ParentalControl","subg":"Services","url":["https://raw.githubusercontent.com/nextdns/services/main/services/discord"],"format":"domains","pack":["socialmedia"],"level":[1],"entries":5,"discards":0},"25":{"value":25,"uname":"25","vname":"Disney+","group":"ParentalControl","subg":"Services","url":["https://raw.githubusercontent.com/nextdns/services/main/services/disneyplus"],"format":"domains","pack":["streams"],"level":[1],"entries":6,"discards":0},"26":{"value":26,"uname":"26","vname":"EBay","group":"ParentalControl","subg":"Services","url":["https://raw.githubusercontent.com/nextdns/services/main/services/ebay"],"format":"domains","pack":["shopping"],"level":[0],"entries":27,"discards":0},"27":{"value":27,"uname":"27","vname":"Facebook","group":"ParentalControl","subg":"Services","url":["https://raw.githubusercontent.com/nextdns/services/main/services/facebook"],"format":"domains","pack":["socialmedia","facebook"],"level":[1,0],"entries":9,"discards":0},"28":{"value":28,"uname":"28","vname":"Fortnite","group":"ParentalControl","subg":"Services","url":["https://raw.githubusercontent.com/nextdns/services/main/services/fortnite"],"format":"domains","pack":["gaming"],"level":[0],"entries":1,"discards":0},"29":{"value":29,"uname":"29","vname":"Hulu","group":"ParentalControl","subg":"Services","url":["https://raw.githubusercontent.com/nextdns/services/main/services/hulu"],"format":"domains","pack":["streams"],"level":[0],"entries":1,"discards":0},"30":{"value":30,"uname":"30","vname":"Imgur","group":"ParentalControl","subg":"Services","url":["https://raw.githubusercontent.com/nextdns/services/main/services/imgur"],"format":"domains","pack":["vanity"],"level":[1],"entries":1,"discards":0},"31":{"value":31,"uname":"31","vname":"Instagram","group":"ParentalControl","subg":"Services","url":["https://raw.githubusercontent.com/nextdns/services/main/services/instagram"],"format":"domains","pack":["socialmedia","facebook"],"level":[1,0],"entries":2,"discards":0},"32":{"value":32,"uname":"32","vname":"League of Legends","group":"ParentalControl","subg":"Services","url":["https://raw.githubusercontent.com/nextdns/services/main/services/leagueoflegends"],"format":"domains","pack":["gaming"],"level":[0],"entries":2,"discards":0},"33":{"value":33,"uname":"33","vname":"Messenger","group":"ParentalControl","subg":"Services","url":["https://raw.githubusercontent.com/nextdns/services/main/services/messenger"],"format":"domains","pack":["socialmedia"],"level":[1],"entries":3,"discards":0},"34":{"value":34,"uname":"34","vname":"Minecraft","group":"ParentalControl","subg":"Services","url":["https://raw.githubusercontent.com/nextdns/services/main/services/minecraft"],"format":"domains","pack":["gaming"],"level":[0],"entries":3,"discards":0},"35":{"value":35,"uname":"35","vname":"Netflix","group":"ParentalControl","subg":"Services","url":["https://raw.githubusercontent.com/nextdns/services/main/services/netflix"],"format":"domains","pack":["streams"],"level":[2],"entries":6,"discards":0},"36":{"value":36,"uname":"36","vname":"Pinterest","group":"ParentalControl","subg":"Services","url":["https://raw.githubusercontent.com/nextdns/services/main/services/pinterest"],"format":"domains","pack":["socialmedia"],"level":[1],"entries":49,"discards":0},"37":{"value":37,"uname":"37","vname":"Reddit","group":"ParentalControl","subg":"Services","url":["https://raw.githubusercontent.com/nextdns/services/main/services/reddit"],"format":"domains","pack":["socialmedia","vanity"],"level":[0,0],"entries":5,"discards":0},"38":{"value":38,"uname":"38","vname":"Roblox","group":"ParentalControl","subg":"Services","url":["https://raw.githubusercontent.com/nextdns/services/main/services/roblox"],"format":"domains","pack":["gaming"],"level":[0],"entries":2,"discards":0},"39":{"value":39,"uname":"39","vname":"Skype","group":"ParentalControl","subg":"Services","url":["https://raw.githubusercontent.com/nextdns/services/main/services/skype"],"format":"domains","pack":["socialmedia"],"level":[1],"entries":5,"discards":0},"40":{"value":40,"uname":"40","vname":"Snapchat","group":"ParentalControl","subg":"Services","url":["https://raw.githubusercontent.com/nextdns/services/main/services/snapchat"],"format":"domains","pack":["socialmedia"],"level":[1],"entries":10,"discards":0},"41":{"value":41,"uname":"41","vname":"Spotify","group":"ParentalControl","subg":"Services","url":["https://raw.githubusercontent.com/nextdns/services/main/services/spotify"],"format":"domains","pack":["shopping"],"level":[2],"entries":10,"discards":0},"42":{"value":42,"uname":"42","vname":"Steam","group":"ParentalControl","subg":"Services","url":["https://raw.githubusercontent.com/nextdns/services/main/services/steam"],"format":"domains","pack":["gaming"],"level":[0],"entries":12,"discards":0},"43":{"value":43,"uname":"43","vname":"Telegram","group":"ParentalControl","subg":"Services","url":["https://raw.githubusercontent.com/nextdns/services/main/services/telegram"],"format":"domains","pack":["socialmedia"],"level":[1],"entries":4,"discards":0},"44":{"value":44,"uname":"44","vname":"Tiktok","group":"ParentalControl","subg":"Services","url":["https://raw.githubusercontent.com/nextdns/services/main/services/tiktok","https://blocklistproject.github.io/Lists/alt-version/tiktok-nl.txt"],"format":"domains","pack":["tiktok","socialmedia"],"level":[0,0],"entries":0},"45":{"value":45,"uname":"45","vname":"Tinder","group":"ParentalControl","subg":"Services","url":["https://raw.githubusercontent.com/nextdns/services/main/services/tinder"],"format":"domains","pack":["socialmedia","dating"],"level":[1,0],"entries":3,"discards":0},"46":{"value":46,"uname":"46","vname":"Tumblr","group":"ParentalControl","subg":"Services","url":["https://raw.githubusercontent.com/nextdns/services/main/services/tumblr"],"format":"domains","pack":["socialmedia"],"level":[1],"entries":1,"discards":0},"47":{"value":47,"uname":"47","vname":"Twitch","group":"ParentalControl","subg":"Services","url":["https://raw.githubusercontent.com/nextdns/services/main/services/twitch","https://raw.githubusercontent.com/nickspaargaren/no-amazon/master/categories/twitchparsed"],"format":["domains","domains"],"pack":["gaming","streams","amazon"],"level":[1,0,2],"entries":171,"discards":160},"48":{"value":48,"uname":"48","vname":"Twitter","group":"ParentalControl","subg":"Services","url":["https://raw.githubusercontent.com/nextdns/services/main/services/twitter"],"format":"domains","pack":["socialmedia"],"level":[0],"entries":5,"discards":0},"49":{"value":49,"uname":"49","vname":"Vimeo","group":"ParentalControl","subg":"Services","url":["https://raw.githubusercontent.com/nextdns/services/main/services/vimeo"],"format":"domains","pack":["streams"],"level":[1],"entries":4,"discards":0},"50":{"value":50,"uname":"50","vname":"VK","group":"ParentalControl","subg":"Services","url":["https://raw.githubusercontent.com/nextdns/services/main/services/vk"],"format":"domains","pack":["socialmedia"],"level":[1],"entries":8,"discards":0},"51":{"value":51,"uname":"51","vname":"WhatsApp","group":"ParentalControl","subg":"Services","url":["https://raw.githubusercontent.com/nextdns/services/main/services/whatsapp","https://blocklistproject.github.io/Lists/alt-version/whatsapp-nl.txt"],"format":["domains","domains"],"pack":["facebook","whatsapp"],"level":[2,0],"entries":228,"discards":153},"52":{"value":52,"uname":"52","vname":"YouTube","group":"ParentalControl","subg":"Services","url":["https://raw.githubusercontent.com/nextdns/services/main/services/youtube"],"format":"domains","pack":["streams","google","youtube"],"level":[1,2,0],"entries":18,"discards":0},"53":{"value":53,"uname":"53","vname":"Zoom","group":"ParentalControl","subg":"Services","url":["https://raw.githubusercontent.com/nextdns/services/main/services/zoom"],"format":"domains","pack":["zoom","socialmedia"],"level":[0,2],"entries":4,"discards":0},"54":{"value":54,"uname":"54","vname":"NoCoin (hoshsadiq + ShadowWhisperer)","group":"Security","subg":"Cryptojacking","url":["https://raw.githubusercontent.com/hoshsadiq/adblock-nocoin-list/master/hosts.txt","https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/master/Lists/Cryptocurrency"],"format":["hosts","domains"],"pack":["crypto"],"level":[0],"entries":1217,"discards":164},"55":{"value":55,"uname":"55","vname":"Coin Blocker (Zerodot1)","group":"Security","subg":"Cryptojacking","url":["https://gitlab.com/ZeroDot1/CoinBlockerLists/-/raw/master/list.txt","https://gitlab.com/ZeroDot1/CoinBlockerLists/-/raw/master/list_browser.txt","https://gitlab.com/ZeroDot1/CoinBlockerLists/-/raw/master/list_browser_AdBlock.txt","https://gitlab.com/ZeroDot1/CoinBlockerLists/-/raw/master/list_optional.txt"],"format":["domains","domains","domains","domains"],"pack":["crypto"],"level":[2],"entries":294058,"discards":287658},"56":{"value":56,"uname":"56","vname":"Dynamic DNS Providers","group":"Security","subg":"HaGeZi","url":["https://raw.githubusercontent.com/hagezi/dns-blocklists/main/wildcard/dyndns.txt"],"format":"wildcard","pack":["vpn & proxies"],"level":[1],"entries":1534,"discards":0},"57":{"value":57,"uname":"57","vname":"Malware (UrlHaus.Abuse.Ch)","group":"Security","subg":"ThreatIntelligence","url":["https://malware-filter.gitlab.io/malware-filter/urlhaus-filter-dnscrypt-blocked-names.txt"],"format":"domains","pack":["malware"],"level":[0],"entries":0},"58":{"value":58,"uname":"58","vname":"Security (StevenBlack)","group":"Security","subg":"StevenBlack","url":["https://raw.githubusercontent.com/StevenBlack/hosts/master/data/add.Risk/hosts"],"format":"hosts","pack":["malware"],"level":[0],"entries":2189,"discards":762},"59":{"value":59,"uname":"59","vname":"KADHosts (PolishFiltersTeam)","group":"Security","subg":"ThreatIntelligence","url":["https://raw.githubusercontent.com/FiltersHeroes/KADhosts/master/KADomains.txt"],"format":"domains","pack":["malware"],"level":[1],"entries":168391,"discards":85194},"60":{"value":60,"uname":"60","vname":"Inversion","group":"Security","subg":"ThreatIntelligence","url":["https://raw.githubusercontent.com/elliotwutingfeng/Inversion-DNSBL-Blocklists/main/Google_hostnames.txt"],"format":"domains","pack":["malware"],"level":[1],"entries":521018,"discards":19},"61":{"value":61,"uname":"61","vname":"NoTrack Annoyance","group":"Security","subg":"Quidsup","url":["https://gitlab.com/quidsup/notrack-annoyance-blocklist/-/raw/master/annoyance.list"],"format":"domains","pack":["spam"],"level":[0],"entries":508,"discards":0},"62":{"value":62,"uname":"62","vname":"Phishing.Army","group":"Security","subg":"ThreatIntelligence","url":["https://phishing.army/download/phishing_army_blocklist.txt"],"format":"domains","pack":["scams & phishing"],"level":[2],"entries":161410,"discards":35252},"63":{"value":63,"uname":"63","vname":"Spam404","group":"Security","subg":"ThreatIntelligence","url":["https://raw.githubusercontent.com/Spam404/lists/master/main-blacklist.txt"],"format":"domains","pack":["spam"],"level":[0],"entries":8147,"discards":537},"64":{"value":64,"uname":"64","vname":"NoTrack Malware","group":"Security","subg":"Quidsup","url":["https://gitlab.com/quidsup/notrack-blocklists/-/raw/master/malware.list"],"format":"domains","pack":["malware"],"level":[1],"entries":1147,"discards":0},"65":{"value":65,"uname":"65","vname":"Badd Boyz Hosts (Mitchell Krogza)","group":"Security","subg":"BaddBoyz","url":["https://raw.githubusercontent.com/Ultimate-Hosts-Blacklist/BaddBoyzHosts/master/clean.list"],"format":"domains","pack":["malware","adult"],"level":[1,1],"entries":1081,"discards":347},"66":{"value":66,"uname":"66","vname":"Malware (Mitchell Krogza)","group":"Security","subg":"BaddBoyz","url":["https://raw.githubusercontent.com/mitchellkrogza/The-Big-List-of-Hacked-Malware-Web-Sites/master/hosts"],"format":"hosts","pack":["scams & phishing"],"level":[1],"entries":13821,"discards":48},"67":{"value":67,"uname":"67","vname":"Threats (embreaj)","group":"Security","subg":"ThreatIntelligence","url":["https://dl.threat-list.com/2/domains.txt"],"format":"wildcard","pack":["malware"],"level":[2],"entries":666752,"discards":32399},"68":{"value":68,"uname":"68","vname":"Threat Intelligence Feeds (HaGeZi)","group":"Security","subg":"HaGeZi","url":["https://raw.githubusercontent.com/hagezi/dns-blocklists/main/wildcard/tif.txt"],"format":"wildcard","pack":["spam","malware","crypto","scams & phishing"],"level":[2,2,2,2],"entries":688802,"discards":0},"69":{"value":69,"uname":"69","vname":"Malware (RPi)","group":"Security","subg":"RPiList","url":["https://raw.githubusercontent.com/RPiList/specials/master/Blocklisten/malware"],"format":"domains","pack":["malware"],"level":[1],"entries":166670,"discards":66727},"70":{"value":70,"uname":"70","vname":"Child Protection (RPi)","group":"Security","subg":"RPiList","url":["https://raw.githubusercontent.com/RPiList/specials/master/Blocklisten/child-protection"],"format":"domains","pack":["vanity","adult"],"level":[2,2],"entries":0},"71":{"value":71,"uname":"71","vname":"Malware (Olbat)","group":"Security","subg":"","url":["https://raw.githubusercontent.com/olbat/ut1-blacklists/master/blacklists/malware/domains","https://raw.githubusercontent.com/scafroglia93/blocklists/master/blocklists-malware-traffic.txt"],"format":["domains","domains"],"pack":["malware"],"level":[0],"entries":44620,"discards":0},"72":{"value":72,"uname":"72","vname":"Phishing (Olbat)","group":"Security","subg":"","url":["https://raw.githubusercontent.com/olbat/ut1-blacklists/master/blacklists/phishing/domains"],"format":"domains","pack":["scams & phishing"],"level":[0],"entries":44576,"discards":0},"73":{"value":73,"uname":"73","vname":"Typosquatting Protection","group":"Security","subg":"ThreatIntelligence","url":["https://github.com/cbuijs/accomplist/raw/master/typosquat/plain.black.domain.list","https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/master/Lists/Typo"],"format":["domains","domains"],"pack":["scams & phishing"],"level":[1],"entries":150303,"discards":3553},"74":{"value":74,"uname":"74","vname":"Malware (DandelionSprout)","group":"Security","subg":"ThreatIntelligence","url":["https://raw.githubusercontent.com/DandelionSprout/adfilt/master/Alternate%20versions%20Anti-Malware%20List/AntiMalwareDomains.txt"],"format":"domains","pack":["malware"],"level":[1],"entries":21423,"discards":12},"75":{"value":75,"uname":"75","vname":"Free Website Hosting","group":"Security","subg":"HaGeZi","url":["https://raw.githubusercontent.com/hagezi/dns-blocklists/main/wildcard/hoster.txt"],"format":"wildcard","pack":["scams & phishing"],"level":[2],"entries":2025,"discards":0},"76":{"value":76,"uname":"76","vname":"Blackbook (Miroslav Stampar)","group":"Security","subg":"ThreatIntelligence","url":["https://raw.githubusercontent.com/stamparm/blackbook/master/blackbook.txt"],"format":"domains","pack":["malware"],"level":[0],"entries":17900,"discards":72},"77":{"value":77,"uname":"77","vname":"Bad Sites (phishing.mailscanner.info + MalwareFilter)","group":"Security","subg":"ThreatIntelligence","url":["http://phishing.mailscanner.info/phishing.bad.sites.conf","https://malware-filter.gitlab.io/malware-filter/phishing-filter-domains.txt"],"format":["domains","domains"],"pack":["scams & phishing"],"level":[2],"entries":149712,"discards":78021},"78":{"value":78,"uname":"78","vname":"Scams and Phishing (infinitytec + TBLP)","group":"Security","subg":"ThreatIntelligence","url":["https://raw.githubusercontent.com/infinitytec/blocklists/master/scams-and-phishing.txt","https://blocklistproject.github.io/Lists/alt-version/scam-nl.txt"],"format":["domains","domains"],"pack":["scams & phishing"],"level":[1],"entries":15613,"discards":11447},"79":{"value":79,"uname":"79","vname":"Red Flag Domains","group":"Security","subg":"ThreatIntelligence","url":["https://dl.red.flag.domains/red.flag.domains.txt"],"format":"domains","pack":["scams & phishing","spam","malware"],"level":[0,0,0],"entries":19081,"discards":0},"80":{"value":80,"uname":"80","vname":"Toxic (StopForumSpam + PupFilter)","group":"Security","subg":"ThreatIntelligence","url":["https://www.stopforumspam.com/downloads/toxic_domains_whole.txt","https://malware-filter.gitlab.io/malware-filter/pup-filter-domains.txt"],"format":["domains","domains"],"pack":["spam"],"level":[2],"entries":45905,"discards":618},"81":{"value":81,"uname":"81","vname":"Mailtrail Malware (Miroslav Stampar)","group":"Security","subg":"ThreatIntelligence","url":["https://raw.githubusercontent.com/stamparm/aux/master/maltrail-malware-domains.txt"],"format":"domains","pack":["malware"],"level":[1],"entries":304597,"discards":71057},"82":{"value":82,"uname":"82","vname":"Malware Rescure (rescure.me)","group":"Security","subg":"ThreatIntelligence","url":["https://rescure.me/rescure_domain_blacklist.txt"],"format":"domains","pack":["malware"],"level":[2],"entries":500,"discards":0},"83":{"value":83,"uname":"83","vname":"NSO + Others (Amnesty)","group":"Security","subg":"Amnesty","url":["https://raw.githubusercontent.com/AmnestyTech/investigations/master/2021-07-18_nso/domains.txt","https://raw.githubusercontent.com/AmnestyTech/investigations/master/2021-10-07_donot/domains.txt","https://raw.githubusercontent.com/AmnestyTech/investigations/master/2021-12-16_cytrox/domains.txt","https://raw.githubusercontent.com/cbuijs/accomplist/master/autodiscover/plain.black.domain.level-1.list","https://raw.githubusercontent.com/scafroglia93/blocklists/master/blocklists-kaspersky.txt","https://raw.githubusercontent.com/scafroglia93/blocklists/master/blocklists-zscaler.txt","https://raw.githubusercontent.com/scafroglia93/blocklists/master/blocklists-cyble.txt"],"format":["domains","domains","domains","hosts","domains","domains","domains"],"pack":["spyware","malware"],"level":[0,0],"entries":8526,"discards":72},"84":{"value":84,"uname":"84","vname":"Malicious domains (cbuijs)","group":"Security","subg":"ThreatIntelligence","url":["https://raw.githubusercontent.com/cbuijs/accomplist/master/malicious-dom/plain.black.domain.list"],"format":"domains","pack":["malware"],"level":[2],"entries":477940,"discards":188},"85":{"value":85,"uname":"85","vname":"Global Anti-Scam (Inversion)","group":"Security","subg":"ThreatIntelligence","url":["https://raw.githubusercontent.com/elliotwutingfeng/GlobalAntiScamOrg-blocklist/main/global-anti-scam-org-scam-urls-pihole.txt"],"format":"domains","pack":["scams & phishing"],"level":[1],"entries":37917,"discards":133},"86":{"value":86,"uname":"86","vname":"Threats and IoCs","group":"Security","subg":"ThreatIntelligence","url":["https://www.botvrij.eu/data/ioclist.domain.raw","https://www.botvrij.eu/data/ioclist.hostname.raw","https://threatfox.abuse.ch/downloads/hostfile","https://raw.githubusercontent.com/MetaMask/eth-phishing-detect/master/src/hosts.txt","https://securereload.tech/Phishing/Lists/Latest/","https://raw.githubusercontent.com/HexxiumCreations/threat-list/gh-pages/domainsonly","https://raw.githubusercontent.com/bigdargon/hostsVN/master/extensions/threat/hosts","https://cert-agid.gov.it/download/log4shell-iocs-raw-domain.txt","https://raw.githubusercontent.com/scafroglia93/blocklists/master/blocklists-certagid.txt","https://raw.githubusercontent.com/scafroglia93/blocklists/master/blocklists-csirt.txt","https://raw.githubusercontent.com/scafroglia93/blocklists/master/blocklists-orangecyber.txt","https://raw.githubusercontent.com/scafroglia93/blocklists/master/blocklists-sentinelone.txt","https://raw.githubusercontent.com/scafroglia93/blocklists/master/blocklists-unit42-silverterrier.txt","https://raw.githubusercontent.com/scafroglia93/blocklists/master/blocklists-unit42-playbook.txt","https://raw.githubusercontent.com/hpthreatresearch/iocs/main/CryptBot/domains.txt"],"format":["domains","domains","hosts","hosts","domains","domains","hosts","domains","domains","domains","domains","domains","domains","domains","domains"],"pack":["scams & phishing","vanity"],"level":[1,2],"entries":47229,"discards":1578},"87":{"value":87,"uname":"87","vname":"Malicious domains (Sophos Labs)","group":"Security","subg":"Sophos","url":["https://raw.githubusercontent.com/sophoslabs/covid-iocs/master/malicious_domains.txt"],"format":"domains","pack":["scams & phishing"],"level":[0],"entries":1959,"discards":753},"88":{"value":88,"uname":"88","vname":"Scamware","group":"Security","subg":"ShadowWhisperer","url":["https://raw.githubusercontent.com/sophoslabs/covid-iocs/master/malware_domains.txt","https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/master/Lists/Scam"],"format":["domains","domains"],"pack":["scams & phishing"],"level":[2],"entries":24330,"discards":15},"89":{"value":89,"uname":"89","vname":"Covid List (rescure and kriskintel)","group":"Security","subg":"ThreatIntelligence","url":["https://raw.githubusercontent.com/cbuijs/accomplist/master/covid/plain.black.domain.list"],"format":"domains","pack":["scams & phishing"],"level":[2],"entries":1735,"discards":0},"90":{"value":90,"uname":"90","vname":"Scamware (RPi)","group":"Security","subg":"RPiList","url":["https://raw.githubusercontent.com/RPiList/specials/master/Blocklisten/Corona-Blocklist","https://raw.githubusercontent.com/RPiList/specials/master/Blocklisten/Fake-Science"],"format":["domains","domains"],"pack":["scams & phishing"],"level":[2],"entries":0},"91":{"value":91,"uname":"91","vname":"hole.cert.pl","group":"Security","subg":"ThreatIntelligence","url":["https://hole.cert.pl/domains/domains.txt"],"format":"domains","pack":["malware"],"level":[1],"entries":135454,"discards":35713},"92":{"value":92,"uname":"92","vname":"Threats (osint.digitalside.it)","group":"Security","subg":"ThreatIntelligence","url":["https://osint.digitalside.it/Threat-Intel/lists/latestdomains.txt"],"format":"domains","pack":["malware"],"level":[1],"entries":52,"discards":1},"93":{"value":93,"uname":"93","vname":"Bloat (ShadowWhisperer)","group":"Privacy","subg":"ShadowWhisperer","url":["https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/master/Lists/Bloat"],"format":"domains","pack":["extremeprivacy"],"level":[2],"entries":871,"discards":66},"94":{"value":94,"uname":"94","vname":"1Hosts (Lite)","group":"Privacy","subg":"1Hosts","url":["https://raw.githubusercontent.com/badmojr/1Hosts/master/Lite/domains.wildcards"],"format":"domains","pack":["recommended","liteprivacy"],"level":[0,0],"entries":67842,"discards":0},"95":{"value":95,"uname":"95","vname":"1Hosts (mini)","group":"Privacy","subg":"1Hosts","url":["https://raw.githubusercontent.com/badmojr/1Hosts/master/mini/domains.wildcards"],"format":"domains","pack":["liteprivacy"],"level":[0],"entries":69964,"discards":0},"96":{"value":96,"uname":"96","vname":"1Hosts (Pro)","group":"Privacy","subg":"1Hosts","url":["https://raw.githubusercontent.com/badmojr/1Hosts/master/Pro/domains.wildcards"],"format":"domains","pack":["aggressiveprivacy"],"level":[1],"entries":139556,"discards":0},"97":{"value":97,"uname":"97","vname":"iVoid (intr0)","group":"Security","subg":"ThreatIntelligence","url":["https://gitlab.com/intr0/iVOID.GitLab.io/raw/master/iVOID.hosts"],"format":"hosts","pack":["scams & phishing"],"level":[1],"entries":27034,"discards":6400},"98":{"value":98,"uname":"98","vname":"ABPindo","group":"Privacy","subg":"","url":["https://raw.githubusercontent.com/ABPindo/indonesianadblockrules/master/subscriptions/domain.txt"],"format":"domains","pack":[],"level":[],"entries":287,"discards":0},"99":{"value":99,"uname":"99","vname":"ABPVN List","group":"Privacy","subg":"","url":["https://abpvn.com/android/abpvn.txt"],"format":"hosts","pack":["aggressiveprivacy"],"level":[1],"entries":20436,"discards":8973},"100":{"value":100,"uname":"100","vname":"Ad-Wars","group":"Privacy","subg":"","url":["https://raw.githubusercontent.com/jdlingyu/ad-wars/master/hosts"],"format":"hosts","pack":["aggressiveprivacy"],"level":[1],"entries":1647,"discards":237},"101":{"value":101,"uname":"101","vname":"AdGuard Tracking and Spyware","group":"Privacy","subg":"","url":["https://raw.githubusercontent.com/r-a-y/mobile-hosts/master/AdguardMobileSpyware.txt","https://raw.githubusercontent.com/r-a-y/mobile-hosts/master/AdguardMobileAds.txt"],"format":["hosts","hosts"],"pack":["aggressiveprivacy"],"level":[1],"entries":1567,"discards":22},"102":{"value":102,"uname":"102","vname":"Add.2o7Net","group":"Privacy","subg":"","url":["https://raw.githubusercontent.com/FadeMind/hosts.extras/master/add.2o7Net/hosts"],"format":"hosts","pack":[],"level":[],"entries":2030,"discards":1447},"103":{"value":103,"uname":"103","vname":"AdGuard SDNS Filter","group":"Privacy","subg":"","url":["https://raw.githubusercontent.com/r-a-y/mobile-hosts/master/AdguardDNS.txt"],"format":"hosts","pack":["liteprivacy"],"level":[0],"entries":54748,"discards":6},"104":{"value":104,"uname":"104","vname":"Anti Ad","group":"Privacy","subg":"","url":["https://raw.githubusercontent.com/privacy-protection-tools/anti-AD/master/anti-ad-domains.txt"],"format":"domains","pack":["aggressiveprivacy"],"level":[1],"entries":78175,"discards":5826},"105":{"value":105,"uname":"105","vname":"Anti Pop Ads 2 (Ador Khan)","group":"Privacy","subg":"","url":["https://raw.githubusercontent.com/AdroitAdorKhan/antipopads-re/master/formats/domains.txt"],"format":"domains","pack":[],"level":[],"entries":87253,"discards":11076},"106":{"value":106,"uname":"106","vname":"Anudeep's Blacklist","group":"Privacy","subg":"","url":["https://raw.githubusercontent.com/anudeepND/blacklist/master/adservers.txt"],"format":"hosts","pack":["liteprivacy"],"level":[0],"entries":42363,"discards":19455},"107":{"value":107,"uname":"107","vname":"Multi Pro (HaGeZi)","group":"Privacy","subg":"HaGeZi","url":["https://raw.githubusercontent.com/hagezi/dns-blocklists/main/wildcard/pro.txt"],"format":"wildcard","pack":["aggressiveprivacy"],"level":[1],"entries":335203,"discards":0},"108":{"value":108,"uname":"108","vname":"Multi Pro++ (HaGeZi)","group":"Privacy","subg":"HaGeZi","url":["https://raw.githubusercontent.com/hagezi/dns-blocklists/main/wildcard/pro.plus.txt"],"format":"wildcard","pack":["extremeprivacy"],"level":[2],"entries":349042,"discards":0},"109":{"value":109,"uname":"109","vname":"Bulgarian list (Adblock)","group":"Privacy","subg":"","url":["https://stanev.org/abp/adblock_bg.txt"],"format":"abp","pack":["extremeprivacy"],"level":[2],"entries":9,"discards":0},"110":{"value":110,"uname":"110","vname":"OISD (small)","group":"Privacy","subg":"OISD","url":["https://raw.githubusercontent.com/sjhgvr/oisd/main/domainswild_small.txt"],"format":"wildcard","pack":["liteprivacy"],"level":[0],"entries":40805,"discards":0},"111":{"value":111,"uname":"111","vname":"Polish filters (Certyficate.IT)","group":"Privacy","subg":"","url":["https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/master/polish-pihole-filters/hostfile.txt"],"format":"hosts","pack":[],"level":[],"entries":176,"discards":0},"112":{"value":112,"uname":"112","vname":"Ads (Disconnect)","group":"Privacy","subg":"Disconnect","url":["https://s3.amazonaws.com/lists.disconnect.me/simple_ad.txt"],"format":"domains","pack":["liteprivacy"],"level":[0],"entries":2701,"discards":35},"113":{"value":113,"uname":"113","vname":"Malvertising (Disconnect)","group":"Privacy","subg":"Disconnect","url":["https://s3.amazonaws.com/lists.disconnect.me/simple_malvertising.txt"],"format":"domains","pack":["malware"],"level":[0],"entries":2736,"discards":37},"114":{"value":114,"uname":"114","vname":"Tracking (Disconnect)","group":"Privacy","subg":"Disconnect","url":["https://s3.amazonaws.com/lists.disconnect.me/simple_tracking.txt"],"format":"domains","pack":["spyware"],"level":[0],"entries":34,"discards":0},"115":{"value":115,"uname":"115","vname":"EasyList China","group":"Privacy","subg":"EasyList","url":["https://easylist-downloads.adblockplus.org/easylistchina.txt"],"format":"abp","pack":["aggressiveprivacy"],"level":[1],"entries":6678,"discards":4},"116":{"value":116,"uname":"116","vname":"EasyList Czech and Slovak","group":"Privacy","subg":"EasyList","url":["https://raw.githubusercontent.com/tomasko126/easylistczechandslovak/master/filters.txt"],"format":"abp","pack":["extremeprivacy"],"level":[2],"entries":93,"discards":0},"117":{"value":117,"uname":"117","vname":"EasyList Dutch","group":"Privacy","subg":"EasyList","url":["https://raw.githubusercontent.com/cbuijs/accomplist/master/dutch/optimized.black.domain.list"],"format":"domains","pack":["extremeprivacy"],"level":[2],"entries":47,"discards":0},"118":{"value":118,"uname":"118","vname":"EasyList Germany","group":"Privacy","subg":"EasyList","url":["https://easylist-downloads.adblockplus.org/easylistgermany.txt"],"format":"abp","pack":["extremeprivacy"],"level":[2],"entries":413,"discards":1},"119":{"value":119,"uname":"119","vname":"EasyList Hebrew","group":"Privacy","subg":"EasyList","url":["https://raw.githubusercontent.com/easylist/EasyListHebrew/master/adguard_hosts.txt"],"format":"domains","pack":["extremeprivacy"],"level":[2],"entries":297,"discards":0},"120":{"value":120,"uname":"120","vname":"Italy Lists (EasyList + Marco Acorte)","group":"Privacy","subg":"EasyList","url":["https://easylist-downloads.adblockplus.org/easylistitaly.txt","https://raw.githubusercontent.com/marco-acorte/antispam-it/main/antispam-it.txt"],"format":["abp","domains"],"pack":["extremeprivacy","spam"],"level":[2,2],"entries":1172,"discards":4},"121":{"value":121,"uname":"121","vname":"EasyList Lithuania","group":"Privacy","subg":"EasyList","url":["https://raw.githubusercontent.com/EasyList-Lithuania/easylist_lithuania/master/easylistlithuania.txt"],"format":"abp","pack":["extremeprivacy"],"level":[2],"entries":30,"discards":0},"122":{"value":122,"uname":"122","vname":"EasyList Basic","group":"Privacy","subg":"EasyList","url":["https://raw.githubusercontent.com/cbuijs/accomplist/master/easylist/optimized.black.domain.list"],"format":"domains","pack":["liteprivacy"],"level":[0],"entries":64819,"discards":0},"123":{"value":123,"uname":"123","vname":"EasyPrivacy","group":"Privacy","subg":"EasyList","url":["https://easylist-downloads.adblockplus.org/easyprivacy.txt"],"format":"abp","pack":["aggressiveprivacy"],"level":[1],"entries":25313,"discards":107},"124":{"value":124,"uname":"124","vname":"Normal (HaGeZi)","group":"Privacy","subg":"HaGeZi","url":["https://raw.githubusercontent.com/hagezi/dns-blocklists/main/wildcard/multi.txt"],"format":"wildcard","pack":["liteprivacy"],"level":[0],"entries":234315,"discards":0},"125":{"value":125,"uname":"125","vname":"Light (HaGeZi)","group":"Privacy","subg":"HaGeZi","url":["https://raw.githubusercontent.com/hagezi/dns-blocklists/main/wildcard/light.txt"],"format":"wildcard","pack":["liteprivacy"],"level":[0],"entries":75074,"discards":0},"126":{"value":126,"uname":"126","vname":"Blocklist (hBlock)","group":"Privacy","subg":"","url":["https://hblock.molinero.dev/hosts_domains.txt"],"format":"domains","pack":["aggressiveprivacy"],"level":[1],"entries":516614,"discards":242129},"127":{"value":127,"uname":"127","vname":"Ad Set Hosts (rentianyu)","group":"Privacy","subg":"","url":["https://raw.githubusercontent.com/rentianyu/Ad-set-hosts/master/hosts","https://raw.githubusercontent.com/rentianyu/Ad-set-hosts/master/xiaobeita/hosts"],"format":["hosts","hosts"],"pack":["aggressiveprivacy"],"level":[1],"entries":335695,"discards":121365},"128":{"value":128,"uname":"128","vname":"Blocklist (ph00lt0)","group":"Privacy","subg":"Privacy","url":["https://raw.githubusercontent.com/ph00lt0/blocklists/master/pihole-blocklist.txt"],"format":"hosts","pack":["extremeprivacy"],"level":[2],"entries":18718,"discards":3446},"129":{"value":129,"uname":"129","vname":"Ultimate (HaGeZi)","group":"Privacy","subg":"HaGeZi","url":["https://raw.githubusercontent.com/hagezi/dns-blocklists/main/wildcard/ultimate.txt"],"format":"wildcard","pack":["extremeprivacy"],"level":[2],"entries":440381,"discards":0},"130":{"value":130,"uname":"130","vname":"The Quantum Blocklist (AI)","group":"Privacy","subg":"","url":["https://raw.githubusercontent.com/cbuijs/accomplist/master/quantum/plain.black.domain.list"],"format":"domains","pack":["ignore"],"level":[2],"entries":0},"131":{"value":131,"uname":"131","vname":"Fanboy's Annoyance List","group":"Privacy","subg":"Fanboy","url":["https://secure.fanboy.co.nz/fanboy-annoyance.txt"],"format":"abp","pack":["spam"],"level":[2],"entries":842,"discards":2},"132":{"value":132,"uname":"132","vname":"Fanboy's Enhanced Tracking List","group":"Privacy","subg":"Fanboy","url":["https://fanboy.co.nz/enhancedstats.txt"],"format":"abp","pack":[],"level":[],"entries":122,"discards":0},"133":{"value":133,"uname":"133","vname":"Ads (The Block List Project)","group":"Privacy","subg":"The Block List Project","url":["https://blocklistproject.github.io/Lists/alt-version/ads-nl.txt"],"format":"domains","pack":["extremeprivacy"],"level":[2],"entries":154558,"discards":84792},"134":{"value":134,"uname":"134","vname":"Frellwit's Swedish Hosts File","group":"Privacy","subg":"","url":["https://raw.githubusercontent.com/lassekongo83/Frellwits-filter-lists/master/Frellwits-Swedish-Hosts-File.txt"],"format":"hosts","pack":[],"level":[],"entries":1178,"discards":83},"135":{"value":135,"uname":"135","vname":"GoodbyeAds Hosts (jerryn70)","group":"Privacy","subg":"GoodbyeAds","url":["https://raw.githubusercontent.com/jerryn70/GoodbyeAds/master/Hosts/GoodbyeAds.txt"],"format":"hosts","pack":["aggressiveprivacy","recommended"],"level":[1,1],"entries":400675,"discards":258433},"136":{"value":136,"uname":"136","vname":"HostsVN","group":"Privacy","subg":"","url":["https://raw.githubusercontent.com/bigdargon/hostsVN/master/option/wildcard.txt"],"format":"wildcard","pack":["liteprivacy"],"level":[0],"entries":10349,"discards":68},"137":{"value":137,"uname":"137","vname":"Hu Filter","group":"Privacy","subg":"","url":["https://raw.githubusercontent.com/hufilter/hufilter/master/hufilter-dns.txt"],"format":"domains","pack":[],"level":[],"entries":68,"discards":0},"138":{"value":138,"uname":"138","vname":"Latvian List","group":"Privacy","subg":"","url":["https://notabug.org/latvian-list/adblock-latvian/raw/master/lists/latvian-list.txt"],"format":"abp","pack":[],"level":[],"entries":53,"discards":0},"139":{"value":139,"uname":"139","vname":"Ads & Tracking (Lighswitch05)","group":"Privacy","subg":"Lighswitch05","url":["https://www.github.developerdan.com/hosts/lists/ads-and-tracking-extended.txt"],"format":["hosts","domains"],"pack":["aggressiveprivacy"],"level":[1],"entries":431043,"discards":417624},"140":{"value":140,"uname":"140","vname":"Tracking Aggressive (Lightswitch05)","group":"Privacy","subg":"Lighswitch05","url":["https://www.github.developerdan.com/hosts/lists/tracking-aggressive-extended.txt"],"format":"hosts","pack":["extremeprivacy"],"level":[2],"entries":171688,"discards":171552},"141":{"value":141,"uname":"141","vname":"Liste AR","group":"Privacy","subg":"EasyList","url":["https://easylist-downloads.adblockplus.org/Liste_AR.txt"],"format":"abp","pack":[],"level":[],"entries":80,"discards":0},"142":{"value":142,"uname":"142","vname":"Liste FR","group":"Privacy","subg":"EasyList","url":["https://easylist-downloads.adblockplus.org/liste_fr.txt"],"format":"abp","pack":[],"level":[],"entries":9220,"discards":26},"143":{"value":143,"uname":"143","vname":"Ad Blocklist Japan (logroid)","group":"Privacy","subg":"","url":["https://raw.githubusercontent.com/logroid/adaway-hosts/master/hosts.txt"],"format":"hosts","pack":[],"level":[],"entries":15356,"discards":6477},"144":{"value":144,"uname":"144","vname":"Turkey Adlist (bkrucarci)","group":"Privacy","subg":"","url":["https://raw.githubusercontent.com/bkrucarci/turk-adlist/master/hosts"],"format":"hosts","pack":["extremeprivacy"],"level":[2],"entries":1216,"discards":87},"145":{"value":145,"uname":"145","vname":"StevenBlack","group":"Privacy","subg":"StevenBlack","url":["https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts"],"format":"hosts","pack":["aggressiveprivacy","recommended"],"level":[1,1],"entries":211634,"discards":102586},"146":{"value":146,"uname":"146","vname":"VeleSila (yhosts)","group":"Privacy","subg":"","url":["https://raw.githubusercontent.com/VeleSila/yhosts/master/hosts"],"format":"hosts","pack":["recommended","liteprivacy"],"level":[0,0],"entries":6422,"discards":666},"147":{"value":147,"uname":"147","vname":"Tiuxo (ads)","group":"Privacy","subg":"Tiuxo","url":["https://raw.githubusercontent.com/tiuxo/hosts/master/ads"],"format":"hosts","pack":["recommended","liteprivacy"],"level":[0,0],"entries":1730,"discards":384},"148":{"value":148,"uname":"148","vname":"No Facebook","group":"Privacy","subg":"","url":["https://raw.githubusercontent.com/jmdugan/blocklists/master/corporations/facebook/all"],"format":"hosts","pack":["facebook"],"level":[0],"entries":2098,"discards":1671},"149":{"value":149,"uname":"149","vname":"No Google","group":"Privacy","subg":"","url":["https://raw.githubusercontent.com/nickspaargaren/no-google/master/wildcards-domains","https://raw.githubusercontent.com/cbuijs/accomplist/master/chris/google-doms.list"],"format":["domains","domains"],"pack":["google"],"level":[0],"entries":616,"discards":280},"150":{"value":150,"uname":"150","vname":"NoTrack Blocklist","group":"Privacy","subg":"Quidsup","url":["https://gitlab.com/quidsup/notrack-blocklists/-/raw/master/trackers.list"],"format":"domains","pack":["aggressiveprivacy","spyware"],"level":[1,1],"entries":16633,"discards":16},"151":{"value":151,"uname":"151","vname":"Blocklists (NoTracking)","group":"Privacy","subg":"","url":["https://raw.githubusercontent.com/notracking/hosts-blocklists/master/hostnames.txt"],"format":"hosts","pack":["aggressiveprivacy","spyware"],"level":[1,1],"entries":250170,"discards":105438},"152":{"value":152,"uname":"152","vname":"Smart TV Blocklist (Perflyst)","group":"Privacy","subg":"","url":["https://raw.githubusercontent.com/Perflyst/PiHoleBlocklist/master/SmartTV.txt"],"format":"domains","pack":["extremeprivacy","smart-tv"],"level":[2,0],"entries":241,"discards":45},"153":{"value":153,"uname":"153","vname":"Peter Lowe","group":"Privacy","subg":"","url":["https://pgl.yoyo.org/as/serverlist.php?hostformat=domains&mimetype=plaintext"],"format":"domains","pack":["liteprivacy"],"level":[0],"entries":3726,"discards":4},"154":{"value":154,"uname":"154","vname":"RU AdList","group":"Privacy","subg":"EasyList","url":["https://easylist-downloads.adblockplus.org/advblock.txt"],"format":"abp","pack":["extremeprivacy"],"level":[2],"entries":8854,"discards":15},"155":{"value":155,"uname":"155","vname":"Combined Privacy Block Lists: Light (bongochong)","group":"Privacy","subg":"CPBL","url":["https://raw.githubusercontent.com/bongochong/CombinedPrivacyBlockLists/master/MiniLists/NoFormatting/mini-cpbl-wildcard-blacklist.txt"],"format":"wildcard","pack":["liteprivacy","recommended"],"level":[0,0],"entries":98280,"discards":0},"156":{"value":156,"uname":"156","vname":"AdRules China (Cats Team)","group":"Privacy","subg":"","url":["https://raw.githubusercontent.com/Cats-Team/AdRules/main/ad-domains.txt"],"format":"domains","pack":["extremeprivacy"],"level":[2],"entries":127517,"discards":27160},"157":{"value":157,"uname":"157","vname":"someonewhocares.org (Dan Pollock)","group":"Privacy","subg":"","url":["https://someonewhocares.org/hosts/zero/hosts"],"format":"hosts","pack":["liteprivacy"],"level":[0],"entries":11608,"discards":2246},"158":{"value":158,"uname":"158","vname":"Unified Blocklist (vdbhb59)","group":"Privacy","subg":"","url":["https://hosts.flossboxin.org.in/files/hosts"],"format":"hosts","pack":["aggressiveprivacy"],"level":[1],"entries":516791,"discards":242303},"159":{"value":159,"uname":"159","vname":"Personal Blocklist (WaLLy3K)","group":"Privacy","subg":"","url":["https://v.firebog.net/hosts/static/w3kbl.txt"],"format":"domains","pack":[],"level":[],"entries":351,"discards":21},"160":{"value":160,"uname":"160","vname":"Windows Telemetry","group":"Privacy","subg":"WindowsSpyBlocker","url":["https://raw.githubusercontent.com/crazy-max/WindowsSpyBlocker/master/data/dnscrypt/spy.txt","https://raw.githubusercontent.com/crazy-max/WindowsSpyBlocker/master/data/dnscrypt/extra.txt","https://raw.githubusercontent.com/RPiList/specials/master/Blocklisten/Win10Telemetry"],"format":["wildcard","wildcard","domains"],"pack":["windows"],"level":[0],"entries":73,"discards":27},"161":{"value":161,"uname":"161","vname":"YousList","group":"Privacy","subg":"","url":["https://raw.githubusercontent.com/yous/YousList/master/hosts.txt"],"format":"hosts","pack":[],"level":[],"entries":580,"discards":13},"162":{"value":162,"uname":"162","vname":"Alexa (Amazon)","group":"Privacy","subg":"NativeTracking","url":["https://raw.githubusercontent.com/nextdns/native-tracking-domains/main/domains/alexa"],"format":"domains","pack":["amazon"],"level":[1],"entries":3,"discards":0},"163":{"value":163,"uname":"163","vname":"Apple","group":"Privacy","subg":"HaGeZi","url":["https://raw.githubusercontent.com/hagezi/dns-blocklists/main/wildcard/native.apple.txt","https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/master/Lists/Apple"],"format":["wildcard","domains"],"pack":["apple"],"level":[1],"entries":48,"discards":11},"164":{"value":164,"uname":"164","vname":"Huawei","group":"Privacy","subg":"NativeTracking","url":["https://raw.githubusercontent.com/nextdns/native-tracking-domains/main/domains/huawei","https://raw.githubusercontent.com/hagezi/dns-blocklists/main/wildcard/native.huawei.txt"],"format":["domains","wildcard"],"pack":[],"level":[],"entries":98,"discards":36},"165":{"value":165,"uname":"165","vname":"Roku","group":"Privacy","subg":"NativeTracking","url":["https://raw.githubusercontent.com/nextdns/native-tracking-domains/main/domains/roku"],"format":"domains","pack":["streams"],"level":[1],"entries":1,"discards":0},"166":{"value":166,"uname":"166","vname":"Samsung","group":"Privacy","subg":"NativeTracking","url":["https://raw.githubusercontent.com/nextdns/native-tracking-domains/main/domains/samsung"],"format":"domains","pack":[],"level":[],"entries":4,"discards":0},"167":{"value":167,"uname":"167","vname":"Sonos","group":"Privacy","subg":"NativeTracking","url":["https://raw.githubusercontent.com/nextdns/native-tracking-domains/main/domains/sonos"],"format":"domains","pack":[],"level":[],"entries":2,"discards":0},"168":{"value":168,"uname":"168","vname":"Windows","group":"Privacy","subg":"NativeTracking","url":["https://raw.githubusercontent.com/nextdns/native-tracking-domains/main/domains/windows","https://raw.githubusercontent.com/hagezi/dns-blocklists/main/wildcard/native.winoffice.txt"],"format":["domains","wildcard"],"pack":["windows"],"level":[1],"entries":105,"discards":3},"169":{"value":169,"uname":"169","vname":"Xiaomi","group":"Privacy","subg":"NativeTracking","url":["https://raw.githubusercontent.com/nextdns/native-tracking-domains/main/domains/xiaomi","https://github.com/unknownFalleN/xiaomi-dns-blocklist/blob/master/xiaomi_dns_block.lst"],"format":["domains","domains"],"pack":[],"level":[],"entries":9,"discards":0},"170":{"value":170,"uname":"170","vname":"OISD (big)","group":"Privacy","subg":"OISD","url":["https://raw.githubusercontent.com/sjhgvr/oisd/main/domainswild_big.txt"],"format":"wildcard","pack":["recommended","liteprivacy"],"level":[0,0],"entries":248465,"discards":0},"171":{"value":171,"uname":"171","vname":"1Hosts (Xtra)","group":"Privacy","subg":"1Hosts","url":["https://raw.githubusercontent.com/badmojr/1Hosts/master/Xtra/domains.wildcards"],"format":"domains","pack":["extremeprivacy"],"level":[2],"entries":278784,"discards":0},"172":{"value":172,"uname":"172","vname":"Spotify Ads (GoodbyeAds)","group":"Privacy","subg":"GoodbyeAds","url":["https://raw.githubusercontent.com/jerryn70/GoodbyeAds/master/Extension/GoodbyeAds-Spotify-AdBlock.txt"],"format":"hosts","pack":[],"level":[],"entries":3781,"discards":1503},"173":{"value":173,"uname":"173","vname":"AVG + Avast (ftprivacy)","group":"ParentalControl","subg":"Services","url":["https://raw.githubusercontent.com/ftpmorph/ftprivacy/master/blocklists/avg-avast-data-mining-full-block.txt"],"format":"domains","pack":["vpn & proxies"],"level":[2],"entries":349,"discards":342},"174":{"value":174,"uname":"174","vname":"Hola VPN (ftprivacy)","group":"ParentalControl","subg":"Services","url":["https://raw.githubusercontent.com/ftpmorph/ftprivacy/master/blocklists/hola-luminati-full-block.txt"],"format":"domains","pack":["vpn & proxies"],"level":[2],"entries":117,"discards":115},"175":{"value":175,"uname":"175","vname":"Combined Privacy Block Lists: Full (bongochong)","group":"Privacy","subg":"CPBL","url":["https://raw.githubusercontent.com/bongochong/CombinedPrivacyBlockLists/master/NoFormatting/cpbl-wildcard-blacklist.txt"],"format":"wildcard","pack":["aggressiveprivacy"],"level":[1],"entries":150119,"discards":0},"176":{"value":176,"uname":"176","vname":"Torrent (The Block List Project)","group":"ParentalControl","subg":"The Block List Project","url":["https://blocklistproject.github.io/Lists/alt-version/torrent-nl.txt"],"format":"domains","pack":["torrents","piracy"],"level":[1,1],"entries":2617,"discards":279},"177":{"value":177,"uname":"177","vname":"Drugs (The Block List Project)","group":"ParentalControl","subg":"The Block List Project","url":["https://blocklistproject.github.io/Lists/alt-version/drugs-nl.txt"],"format":"domains","pack":["drugs"],"level":[2],"entries":26028,"discards":7014},"178":{"value":178,"uname":"178","vname":"Ransomware (The Block List Project)","group":"Security","subg":"The Block List Project","url":["https://blocklistproject.github.io/Lists/alt-version/ransomware-nl.txt"],"format":"domains","pack":["scams & phishing"],"level":[2],"entries":1904,"discards":1},"179":{"value":179,"uname":"179","vname":"NSFL (ShadowWhisperer)","group":"ParentalControl","subg":"ShadowWhisperer","url":["https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/master/Lists/Shock"],"format":"domains","pack":["adult"],"level":[1],"entries":98,"discards":0},"180":{"value":180,"uname":"180","vname":"Cryptojacking (The Block List Project)","group":"Security","subg":"The Block List Project","url":["https://blocklistproject.github.io/Lists/alt-version/crypto-nl.txt"],"format":"domains","pack":["crypto"],"level":[2],"entries":23761,"discards":13359},"181":{"value":181,"uname":"181","vname":"WhatsApp","group":"","subg":"","url":[""],"format":"domains","pack":["dead"],"level":[],"entries":0},"182":{"value":182,"uname":"182","vname":"Vaping (The Block List Project)","group":"ParentalControl","subg":"The Block List Project","url":["https://blocklistproject.github.io/Lists/alt-version/vaping-nl.txt","https://raw.githubusercontent.com/jaykepeters/Blocklists/master/Drugs/vaping.txt"],"format":["domains","domains"],"pack":["drugs"],"level":[1],"entries":414,"discards":102},"183":{"value":183,"uname":"183","vname":"Piracy (The Block List Project)","group":"ParentalControl","subg":"The Block List Project","url":["https://blocklistproject.github.io/Lists/alt-version/piracy-nl.txt"],"format":"domains","pack":["piracy","file-hosts"],"level":[2,2],"entries":2134,"discards":984},"184":{"value":184,"uname":"184","vname":"Facebook (The Block List Project)","group":"ParentalControl","subg":"The Block List Project","url":["https://blocklistproject.github.io/Lists/alt-version/facebook-nl.txt"],"format":"domains","pack":["facebook","socialmedia"],"level":[1,2],"entries":22459,"discards":22379},"185":{"value":185,"uname":"185","vname":"Gambling (The Block List Project)","group":"ParentalControl","subg":"The Block List Project","url":["https://blocklistproject.github.io/Lists/alt-version/gambling-nl.txt"],"format":"domains","pack":["gambling"],"level":[2],"entries":2499,"discards":1121},"186":{"value":186,"uname":"186","vname":"OISD NSFW (Adult)","group":"ParentalControl","subg":"OISD","url":["https://raw.githubusercontent.com/sjhgvr/oisd/main/domainswild_nsfw.txt"],"format":"wildcard","pack":["adult"],"level":[1],"entries":291703,"discards":1420},"187":{"value":187,"uname":"187","vname":"Blocklists (cbuijs)","group":"Privacy","subg":"","url":["https://github.com/cbuijs/accomplist/raw/master/deugniets/plain.black.domain.list"],"format":"domains","pack":["ignore"],"level":[2],"entries":0},"188":{"value":188,"uname":"188","vname":"Yet another small uBlock filter list","group":"Privacy","subg":"","url":["https://raw.githubusercontent.com/mtxadmin/ublock/master/hosts.txt"],"format":"hosts","pack":["extremeprivacy"],"level":[2],"entries":1020557,"discards":960692},"189":{"value":189,"uname":"189","vname":"URL Shorteners (PeterDaveHello + ShadowWhisperer)","group":"Security","subg":"TrackingDomains","url":["https://raw.githubusercontent.com/PeterDaveHello/url-shorteners/master/list","https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/master/Lists/UrlShortener"],"format":["domains","domains"],"pack":["url-shorteners"],"level":[1],"entries":3623,"discards":139},"190":{"value":190,"uname":"190","vname":"Persian Blocker","group":"Privacy","subg":"","url":["https://raw.githubusercontent.com/MasterKia/PersianBlocker/main/PersianBlockerHosts.txt"],"format":"domains","pack":["extremeprivacy"],"level":[2],"entries":235,"discards":6},"191":{"value":191,"uname":"191","vname":"1Hosts (kidSaf)","group":"ParentalControl","subg":"1Hosts","url":["https://raw.githubusercontent.com/badmojr/addons_1Hosts/main/kidSaf/domains.wildcards"],"format":"domains","pack":["adult"],"level":[2],"entries":1111467,"discards":0},"192":{"value":192,"uname":"192","vname":"Adult (The Block List Project)","group":"ParentalControl","subg":"The Block List Project","url":["https://blocklistproject.github.io/Lists/alt-version/porn-nl.txt"],"format":"domains","pack":["adult"],"level":[2],"entries":500245,"discards":1124},"193":{"value":193,"uname":"193","vname":"Tracking (The Block List Project)","group":"Privacy","subg":"The Block List Project","url":["https://blocklistproject.github.io/Lists/alt-version/tracking-nl.txt","https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/master/Lists/Tracking"],"format":["domains","domains"],"pack":["spyware"],"level":[1],"entries":83663,"discards":1393},"194":{"value":194,"uname":"194","vname":"Microsoft","group":"ParentalControl","subg":"Services","url":["https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/master/Lists/Microsoft"],"format":"domains","pack":["microsoft"],"level":[2],"entries":678,"discards":116},"195":{"value":195,"uname":"195","vname":"Vanity Top-Level Domains (cbuijs)","group":"Security","subg":"ThreatIntelligence","url":["https://github.com/cbuijs/accomplist/raw/master/tlds/plain.black.domain.list"],"format":"domains","pack":["spam"],"level":[2],"entries":1219,"discards":0},"196":{"value":196,"uname":"196","vname":"Tiny China Block List Replenish","group":"Privacy","subg":"","url":["https://raw.githubusercontent.com/tim-hub/tiny-cn-blocklist-replenish/master/common.txt","https://raw.githubusercontent.com/tim-hub/tiny-cn-blocklist-replenish/master/others.txt"],"format":["domains","domains"],"pack":["liteprivacy","gambling"],"level":[0,1],"entries":77,"discards":2}}`);
  ;
  function timestamp() {
    return u6_basicconfig_namespaceObject.timestamp;
  }
  function tdNodeCount() {
    return u6_basicconfig_namespaceObject.nodecount;
  }
  function tdParts() {
    return u6_basicconfig_namespaceObject.tdparts;
  }
  function tdCodec6() {
    return u6_basicconfig_namespaceObject.useCodec6;
  }
  function orig() {
    return u6_basicconfig_namespaceObject;
  }
  function filetag() {
    return u6_filetag_namespaceObject;
  }
  function tdmd5() {
    return u6cfg.tdmd5;
  }
  function rdmd5() {
    return u6cfg.rdmd5;
  }
  ;
  const ALPHA32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  const RALPHA32 = ALPHA32.split("").reduce((o, c, i2) => {
    o[c] = i2;
    return o;
  }, {});
  function toDataView(data) {
    if (data instanceof Int8Array || data instanceof Uint8Array || data instanceof Uint8ClampedArray) {
      return new DataView(data.buffer, data.byteOffset, data.byteLength);
    }
    if (data instanceof ArrayBuffer) {
      return new DataView(data);
    }
    return null;
  }
  function readChar(chr) {
    chr = chr.toUpperCase();
    const idx = RALPHA32[chr];
    if (idx == null) {
      throw new Error("invalid b32 character: " + chr);
    }
    return idx;
  }
  function base32(arrbuf, padding) {
    const view = toDataView(arrbuf);
    if (!view)
      throw new Error("cannot create data-view from given input");
    let bits = 0;
    let value = 0;
    let output = "";
    for (let i2 = 0; i2 < view.byteLength; i2++) {
      value = value << 8 | view.getUint8(i2);
      bits += 8;
      while (bits >= 5) {
        output += ALPHA32[value >>> bits - 5 & 31];
        bits -= 5;
      }
    }
    if (bits > 0) {
      output += ALPHA32[value << 5 - bits & 31];
    }
    if (padding) {
      while (output.length % 8 !== 0) {
        output += "=";
      }
    }
    return output;
  }
  function rbase32(input) {
    input = input.replace(/=+$/, "");
    const length = input.length;
    let bits = 0;
    let value = 0;
    let index = 0;
    const output = new Uint8Array(length * 5 / 8 | 0);
    for (let i2 = 0; i2 < length; i2++) {
      value = value << 5 | readChar(input[i2]);
      bits += 5;
      if (bits >= 8) {
        output[index++] = value >>> bits - 8 & 255;
        bits -= 8;
      }
    }
    return output;
  }
  ;
  const minTtlSec = 30;
  const maxTtlSec = 180;
  const cheader = "x-rdnscache-metadata";
  const _cacheurl = "https://caches.rethinkdns.com/";
  const _cacheHeaderKey = "x-rdns-cache";
  const _cacheHeaderHitValue = "hit";
  const _cacheHeaders = { [_cacheHeaderKey]: _cacheHeaderHitValue };
  function determineCacheExpiry(packet) {
    const expiresImmediately = 0;
    const someVeryHighTtl = 1 << 30;
    if (!isAnswer(packet))
      return expiresImmediately;
    let ttl = someVeryHighTtl;
    for (const a of packet.answers)
      ttl = Math.min(a.ttl || minTtlSec, ttl);
    if (ttl === someVeryHighTtl)
      ttl = minTtlSec;
    ttl += cacheTtl();
    const expiry = Date.now() + ttl * 1e3;
    return expiry;
  }
  function makeCacheMetadata(dnsPacket, stamps) {
    return new DnsCacheMetadata(determineCacheExpiry(dnsPacket), stamps);
  }
  class DnsCacheMetadata {
    constructor(expiry, stamps) {
      this.expiry = expiry;
      this.stamps = stamps;
    }
  }
  class DnsCacheData {
    constructor(packet, raw2, metadata) {
      this.dnsPacket = packet;
      this.dnsBuffer = raw2;
      this.metadata = metadata;
    }
  }
  function makeCacheValue(packet, raw2, metadata) {
    return new DnsCacheData(packet, raw2, metadata);
  }
  function cacheValueOf(rdnsResponse) {
    const stamps = rdnsResponse.stamps;
    const [packet, modified] = dropOPT(rdnsResponse.dnsPacket);
    const raw2 = modified ? dnsutil_encode(packet) : rdnsResponse.dnsBuffer;
    const metadata = makeCacheMetadata(packet, stamps);
    return makeCacheValue(packet, raw2, metadata);
  }
  function updateTtl(packet, end) {
    const now = Date.now();
    const actualttl = Math.floor((end - now) / 1e3) - cacheTtl();
    const outttl = actualttl < minTtlSec ? rand(minTtlSec, maxTtlSec) : actualttl;
    for (const a of packet.answers) {
      if (!optAnswer(a))
        a.ttl = outttl;
    }
  }
  function makeId(packet) {
    if (!hasSingleQuestion(packet))
      return null;
    const q = packet.questions[0];
    const addn = hasDnssecOk(packet) ? ":dnssec" : "";
    return normalizeName(q.name) + ":" + q.type + addn;
  }
  function makeLocalCacheValue(data) {
    const b = data.dnsBuffer;
    const metadata = data.metadata;
    return new DnsCacheData(null, b, metadata);
  }
  function makeHttpCacheValue(data) {
    const b = data.dnsBuffer;
    const metadata = data.metadata;
    const headers = {
      headers: concatHeaders(
        {
          [cheader]: embedMetadata(metadata),
          "Cache-Control": "max-age=604800"
        },
        contentLengthHeader(b)
      )
    };
    return new Response(b, headers);
  }
  function makeHttpCacheKey(packet) {
    const id = makeId(packet);
    if (emptyString(id))
      return null;
    return new URL(_cacheurl + timestamp() + "/" + id);
  }
  function extractMetadata(cres) {
    const j = JSON.parse(cres.headers.get(cheader));
    return new DnsCacheMetadata(j.expiry, j.stamps);
  }
  function embedMetadata(m) {
    return JSON.stringify(m);
  }
  function cacheHeaders() {
    return _cacheHeaders;
  }
  function hasCacheHeader(h) {
    if (!h)
      return false;
    return h.get(_cacheHeaderKey) === _cacheHeaderHitValue;
  }
  function updateQueryId(decodedDnsPacket, queryId) {
    if (queryId === decodedDnsPacket.id)
      return false;
    decodedDnsPacket.id = queryId;
    return true;
  }
  function isValueValid(v) {
    if (emptyObj(v))
      return false;
    return hasMetadata(v.metadata);
  }
  function hasMetadata(m) {
    return !emptyObj(m);
  }
  function hasAnswer(v) {
    if (!hasMetadata(v.metadata))
      return false;
    return isAnswerFresh(v.metadata, 6);
  }
  function isAnswerFresh(m, n = 0) {
    const now = Date.now();
    const ttl = cacheTtl() * 1e3;
    const r = n || rolldice(6);
    if (r % 6 === 0) {
      return m.expiry > 0 && now <= m.expiry - ttl;
    } else {
      return m.expiry > 0 && now <= m.expiry;
    }
  }
  function updatedAnswer(dnsPacket, qid, expiry) {
    updateQueryId(dnsPacket, qid);
    updateTtl(dnsPacket, expiry);
    return dnsPacket;
  }
  ;
  const _b64delim = ":";
  const _b32delim = "-";
  const logPrefix = new RegExp(`^l${_b64delim}|^l${_b32delim}`);
  const stampPrefix = new RegExp(`^\\d+${_b64delim}|^\\d+${_b32delim}`);
  const emptystr = "";
  const emptystamp = [emptystr, emptystr, emptystr, emptystr];
  const _wildcardUint16 = new Uint16Array([
    64544,
    18431,
    8191,
    65535,
    64640,
    1,
    128,
    16320
  ]);
  const recBlockstamps = /* @__PURE__ */ new Map();
  recBlockstamps.set("rec", "1:YAYBACABEDAgAA==");
  recBlockstamps.set("sec", "1:EBx5AqvtyDcAKA==");
  recBlockstamps.set("pec", "1:GMAB-ACgYVIAgA==");
  recBlockstamps.set("rs", "1:cB55AqvtyTcgARAwIAAAKA==");
  recBlockstamps.set("prs", "1:eN4B-ACgeQKr7ck3IAEQMCAAYXoAgA==");
  recBlockstamps.set("pr", "1:eMYB-ACgAQAgARAwIABhUgCA");
  recBlockstamps.set("ps", "1:GNwB-ACgeQKr7cg3YXoAgA==");
  function isBlocklistFilterSetup(blf) {
    return blf && !emptyObj(blf.ftrie);
  }
  function isStampQuery(p) {
    return stampPrefix.test(p);
  }
  function isLogQuery(p) {
    return logPrefix.test(p);
  }
  function doBlock(dn, userBlInfo, dnBlInfo) {
    const blockSubdomains = envutil_blockSubdomains();
    const version = userBlInfo.flagVersion;
    const noblock = rdnsNoBlockResponse();
    if (emptyString(dn) || emptyObj(dnBlInfo) || emptyObj(userBlInfo)) {
      return noblock;
    }
    if (blockSubdomains) {
      return applyWildcardBlocklists(
        userBlInfo.userBlocklistFlagUint,
        version,
        dnBlInfo,
        dn
      );
    }
    const dnUint = new Uint16Array(dnBlInfo[dn]);
    if (emptyArray(dnUint))
      return noblock;
    const r = applyBlocklists(userBlInfo.userBlocklistFlagUint, dnUint, version);
    if (r.isBlocked)
      return r;
    if (emptyArray(userBlInfo.userServiceListUint))
      return r;
    return applyWildcardBlocklists(
      userBlInfo.userServiceListUint,
      version,
      dnBlInfo,
      dn
    );
  }
  function blockstampFromCache(cr) {
    const p = cr.dnsPacket;
    const m = cr.metadata;
    if (emptyObj(p) || emptyObj(m))
      return false;
    return m.stamps;
  }
  function blockstampFromBlocklistFilter(dnsPacket, blocklistFilter) {
    if (emptyObj(dnsPacket))
      return false;
    if (!isBlocklistFilterSetup(blocklistFilter))
      return false;
    const domains2 = extractDomains(dnsPacket);
    if (emptyArray(domains2))
      return false;
    const m = /* @__PURE__ */ new Map();
    for (const n of domains2) {
      const stamp = blocklistFilter.blockstamp(n);
      if (emptyMap(stamp))
        continue;
      for (const [k, v] of stamp)
        m.set(k, v);
    }
    return emptyMap(m) ? false : objOf(m);
  }
  function applyWildcardBlocklists(uint1, flagVersion, dnBlInfo, dn) {
    const dnSplit = dn.split(".");
    do {
      if (emptyArray(dnSplit))
        break;
      const subdomain = dnSplit.join(".");
      const subdomainUint = dnBlInfo[subdomain];
      if (emptyArray(subdomainUint))
        continue;
      const response = applyBlocklists(uint1, subdomainUint, flagVersion);
      if (!emptyObj(response) && response.isBlocked) {
        return response;
      }
    } while (dnSplit.shift() != null);
    return rdnsNoBlockResponse();
  }
  function applyBlocklists(uint1, uint2, flagVersion) {
    const blockedUint = intersect(uint1, uint2);
    if (blockedUint) {
      return rdnsBlockResponse(getB64Flag(blockedUint, flagVersion));
    } else {
      return rdnsNoBlockResponse(getB64Flag(uint2, flagVersion));
    }
  }
  function intersect(flag1, flag2) {
    if (emptyArray(flag1) || emptyArray(flag2))
      return null;
    let header1 = flag1[0];
    let header2 = flag2[0];
    let commonHeader = header1 & header2;
    if (commonHeader === 0) {
      return null;
    }
    let i2 = flag1.length - 1;
    let j = flag2.length - 1;
    let h = commonHeader;
    let pos = 0;
    const commonBody = [];
    while (h !== 0) {
      if (i2 < 0 || j < 0)
        throw new Error("blockstamp header/body mismatch");
      if ((h & 1) === 1) {
        const commonFlags = flag1[i2] & flag2[j];
        if (commonFlags === 0) {
          commonHeader = clearbit(commonHeader, pos);
        } else {
          commonBody.push(commonFlags);
        }
      }
      if ((header1 & 1) === 1) {
        i2 -= 1;
      }
      if ((header2 & 1) === 1) {
        j -= 1;
      }
      header1 >>>= 1;
      header2 >>>= 1;
      h >>>= 1;
      pos += 1;
    }
    if (commonHeader === 0) {
      return null;
    }
    return Uint16Array.of(commonHeader, ...commonBody.reverse());
  }
  function clearbit(uint, pos) {
    return uint & ~(1 << pos);
  }
  function getB64Flag(uint16Arr, flagVersion) {
    if (emptyArray(uint16Arr))
      return "";
    const b64url = bytesToBase64Url(uint16Arr.buffer);
    if (flagVersion === "0") {
      return encodeURIComponent(b64url);
    } else if (flagVersion === "1") {
      const flag = encodeURI(b64url);
      return flagVersion + ":" + flag;
    } else {
      throw new Error("unsupported flag version" + flagVersion);
    }
  }
  function msgkeyFromUrl(u) {
    const ans = extractStamps(u);
    return ans[3] || "";
  }
  function blockstampFromUrl(u) {
    const ans = extractStamps(u);
    const delim2 = ans[0];
    const ver2 = ans[1] || "";
    const blockstamp = ans[2] || "";
    if (emptyString(ver2) || emptyString(blockstamp))
      return "";
    return ver2 + delim2 + blockstamp;
  }
  function recBlockstampFrom(url) {
    const isFreeBraveDns = url.hostname.includes("free.bravedns");
    if (isFreeBraveDns)
      return "rec";
    for (const [k, v] of recBlockstamps) {
      if (url.pathname.includes("/" + k + "/") || url.pathname.endsWith("/" + k)) {
        return v;
      }
      if (url.hostname.startsWith(k + "."))
        return v;
    }
    return "";
  }
  function extractStamps(u) {
    const url = new URL(u);
    const recStamp = recBlockstampFrom(url);
    const useRecStamp = !emptyString(recStamp);
    let s = emptystr;
    if (useRecStamp) {
      s = recStamp;
    }
    const paths = url.pathname.split("/");
    const domains2 = url.hostname.split(".");
    for (const d2 of domains2) {
      if (d2.length === 0)
        continue;
      if (isStampQuery(d2)) {
        s = d2;
        break;
      }
    }
    for (const p of paths) {
      if (p.length === 0)
        continue;
      if (isStampQuery(p)) {
        s = p;
        break;
      }
    }
    try {
      return splitBlockstamp(s);
    } catch (e) {
      log.d("Rdns:blockstampFromUrl", e);
    }
    return emptystamp;
  }
  function base64ToUintV0(b64Flag) {
    const f = decodeURIComponent(b64Flag);
    return base64ToUint16(f);
  }
  function base64ToUintV1(b64Flag) {
    return base64ToUint16(b64Flag);
  }
  function base32ToUintV1(flag) {
    const b32 = decodeURI(flag);
    return decodeFromBinaryArray(rbase32(b32));
  }
  function splitBlockstamp(s) {
    if (emptyString(s))
      return emptystamp;
    if (!isStampQuery(s))
      return emptystamp;
    if (isB32Stamp(s)) {
      return [_b32delim, ...s.split(_b32delim)];
    } else {
      return [_b64delim, ...s.split(_b64delim)];
    }
    return out;
  }
  function isB32Stamp(s) {
    const idx32 = s.indexOf(_b32delim);
    const idx64 = s.indexOf(_b64delim);
    if (idx32 === -1 && idx64 === -1)
      throw new Error("invalid stamp: " + s);
    else if (idx32 === -1)
      return false;
    else if (idx64 === -1)
      return true;
    else
      return idx32 < idx64;
  }
  function stampVersion(s) {
    if (!emptyArray(s))
      return s[0];
    else
      return "0";
  }
  function unstamp(flag) {
    const r = {
      userBlocklistFlagUint: null,
      flagVersion: "0",
      userServiceListUint: null
    };
    if (emptyString(flag))
      return r;
    flag = flag.trim();
    const isFlagB32 = isB32Stamp(flag);
    const s = flag.split(isFlagB32 ? _b32delim : _b64delim);
    let convertor = (x) => "";
    let f = "";
    const v = stampVersion(s);
    if (v === "0") {
      convertor = base64ToUintV0;
      f = s[0];
    } else if (v === "1") {
      convertor = isFlagB32 ? base32ToUintV1 : base64ToUintV1;
      f = s[1];
    } else {
      log.w("Rdns:unstamp", "unknown blocklist stamp version in " + s);
      return r;
    }
    r.flagVersion = v;
    r.userBlocklistFlagUint = convertor(f) || null;
    r.userServiceListUint = intersect(r.userBlocklistFlagUint, _wildcardUint16);
    return r;
  }
  function hasBlockstamp(blockInfo) {
    return !emptyObj(blockInfo) && !emptyArray(blockInfo.userBlocklistFlagUint);
  }
  function isValidFullTimestamp(tstamp) {
    if (typeof tstamp !== "string")
      return false;
    return tstamp.indexOf("/") === 4;
  }
  function bareTimestampFrom(tstamp) {
    if (isValidFullTimestamp(tstamp)) {
      tstamp = tstamp.split("/")[1];
    }
    const t2 = parseInt(tstamp);
    if (isNaN(t2)) {
      log.w("Rdns bareTstamp: NaN", tstamp);
      return 0;
    }
    return t2;
  }
  function blocklists(strflag) {
    const { userBlocklistFlagUint, flagVersion } = unstamp(strflag);
    const blocklists2 = [];
    if (flagVersion === "1") {
      return flagsToTags(userBlocklistFlagUint);
    } else {
      throw new Error("unknown blocklist version: " + flagVersion);
    }
    return blocklists2;
  }
  ;
  const maxrangefetches = 2;
  class BlocklistWrapper {
    constructor() {
      this.blocklistFilter = new BlocklistFilter();
      this.startTime = Date.now();
      this.isBlocklistUnderConstruction = false;
      this.exceptionFrom = "";
      this.exceptionStack = "";
      this.noop = disableBlocklists();
      this.nowait = bgDownloadBlocklistWrapper();
      this.log = log.withTags("BlocklistWrapper");
      if (this.noop)
        this.log.w("disabled?", this.noop);
    }
    async init(rxid, forceget = false) {
      if (this.isBlocklistFilterSetup() || this.disabled()) {
        const blres = emptyResponse();
        blres.data.blocklistFilter = this.blocklistFilter;
        return blres;
      }
      try {
        const now = Date.now();
        if (!this.isBlocklistUnderConstruction || now - this.startTime > downloadTimeout() * 2) {
          this.log.i(rxid, "download blocklists", now, this.startTime);
          const url = blocklistUrl() + timestamp() + "/";
          const nc = tdNodeCount();
          const parts = tdParts();
          const u6 = tdCodec6();
          return this.initBlocklistConstruction(rxid, now, url, nc, parts, u6);
        } else if (this.nowait && !forceget) {
          this.log.i(rxid, "nowait, but blocklist construction ongoing");
          return emptyResponse();
        } else {
          return this.waitUntilDone();
        }
      } catch (e) {
        this.log.e(rxid, "main", e.stack);
        return errResponse("blocklistWrapper", e);
      }
    }
    disabled() {
      return this.noop;
    }
    getBlocklistFilter() {
      return this.blocklistFilter;
    }
    isBlocklistFilterSetup() {
      return isBlocklistFilterSetup(this.blocklistFilter);
    }
    async waitUntilDone() {
      let totalWaitms = 0;
      const waitms2 = 25;
      const response = emptyResponse();
      while (totalWaitms < downloadTimeout()) {
        if (this.isBlocklistFilterSetup()) {
          response.data.blocklistFilter = this.blocklistFilter;
          return response;
        }
        await sleep(waitms2);
        totalWaitms += waitms2;
      }
      response.isException = true;
      response.exceptionStack = this.exceptionStack || "download timeout";
      response.exceptionFrom = this.exceptionFrom || "blocklistWrapper.js";
      return response;
    }
    buildBlocklistFilter(td, rd, ftags, bconfig) {
      this.isBlocklistUnderConstruction = true;
      this.startTime = Date.now();
      bconfig = trie_config_withDefaults(bconfig);
      const ftrie = this.makeTrie(td, rd, bconfig);
      this.blocklistFilter.load(ftrie, ftags);
      this.log.i("fs:trie w/ config", bconfig);
      this.isBlocklistUnderConstruction = false;
    }
    makeTrie(tdbuf, rdbuf, bconfig) {
      return createTrie(tdbuf, rdbuf, bconfig);
    }
    async initBlocklistConstruction(rxid, when2, url, tdNodecount, tdParts2, tdCodec62) {
      this.isBlocklistUnderConstruction = true;
      this.startTime = when2;
      let response = emptyResponse();
      try {
        await this.downloadAndBuildBlocklistFilter(
          rxid,
          url,
          tdNodecount,
          tdParts2,
          tdCodec62
        );
        this.log.i(rxid, "blocklist-filter setup; u6?", tdCodec62);
        if (false) {
        }
        response.data.blocklistFilter = this.blocklistFilter;
      } catch (e) {
        this.log.e(rxid, "initBlocklistConstruction", e);
        response = errResponse("initBlocklistConstruction", e);
        this.exceptionFrom = response.exceptionFrom;
        this.exceptionStack = response.exceptionStack;
      }
      this.isBlocklistUnderConstruction = false;
      return response;
    }
    async downloadAndBuildBlocklistFilter(rxid, url, tdNodecount, tdParts2, u6) {
      !tdNodecount && this.log.e(rxid, "tdNodecount zero or missing!");
      const bconfig = trie_config_withDefaults(orig());
      const ft = filetag();
      if (bconfig.useCodec6 !== u6 || bconfig.nodecount !== tdNodecount || bconfig.tdparts !== tdParts2) {
        throw new Error(bconfig + "<=cfg; in=>" + u6 + " " + tdNodecount);
      }
      url += bconfig.useCodec6 ? "u6/" : "u8/";
      this.log.d(rxid, url, tdNodecount, tdParts2);
      const buf0 = fileFetch(url + "rd.txt", "buffer");
      const buf1 = maxrangefetches > 0 ? rangeTd(url) : makeTd(url, tdParts2);
      const downloads = await Promise.all([buf0, buf1]);
      this.log.i(rxid, "d:trie w/ config", bconfig);
      const rd = downloads[0];
      const td = downloads[1];
      const ftrie = this.makeTrie(td, rd, bconfig);
      this.blocklistFilter.load(ftrie, ft);
      return;
    }
    triedata() {
      const blf = this.blocklistFilter;
      const ftrie = blf.ftrie;
      const rdir = ftrie.directory;
      const d2 = rdir.data;
      return raw(d2.bytes);
    }
    rankdata() {
      const blf = this.blocklistFilter;
      const ftrie = blf.ftrie;
      const rdir = ftrie.directory;
      const d2 = rdir.directory;
      return raw(d2.bytes);
    }
  }
  async function fileFetch(url, typ, h = {}) {
    if (typ !== "buffer" && typ !== "json") {
      log.i("fetch fail", typ, url);
      throw new Error("Unknown conversion type at fileFetch");
    }
    let res = { ok: false };
    try {
      log.i("downloading", url, typ, h);
      res = await fetch(url, {
        headers: h,
        cf: {
          cacheTtl: 2592e3,
          cacheEverything: true
        }
      });
    } catch (ex) {
      log.w("download failed", url, ex, ex.cause);
      throw ex;
    }
    if (!res.ok) {
      log.e("file-fetch err", url, res);
      throw new Error(JSON.stringify([url, res, "fileFetch fail"]));
    }
    if (typ === "buffer") {
      return await res.arrayBuffer();
    } else if (typ === "json") {
      return await res.json();
    }
  }
  async function rangeTd(baseurl) {
    log.i("rangeTd from chunks", maxrangefetches);
    const f = baseurl + "td.txt";
    const hreq = await fetch(f, { method: "HEAD" });
    const contentlength = hreq.headers.get("content-length");
    const n = parseInt(contentlength, 10);
    const chunksize = Math.ceil(n / maxrangefetches);
    const promisedchunks = [];
    let i2 = 0;
    do {
      const j = Math.min(n - 1, i2 + chunksize - 1);
      const rg = { range: `bytes=${i2}-${j}` };
      promisedchunks.push(fileFetch(f, "buffer", rg));
      i2 = j + 1;
    } while (i2 < n);
    const chunks = await Promise.all(promisedchunks);
    log.i("trie chunks downloaded");
    return concat(chunks);
  }
  async function makeTd(baseurl, n) {
    log.i("makeTd from tdParts", n);
    if (n <= -1) {
      return fileFetch(baseurl + "td.txt", "buffer");
    }
    const tdpromises = [];
    for (let i2 = 0; i2 <= n; i2++) {
      const f = baseurl + "td" + i2.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false
      }) + ".txt";
      tdpromises.push(fileFetch(f, "buffer"));
    }
    const tds = await Promise.all(tdpromises);
    log.i("tds downloaded");
    return concat(tds);
  }
  ;
  const info = "sdns-public-auth-info";
  class Outcome {
    constructor(s) {
      this.status = s;
      this.ok = s >= 0;
      this.no = s <= 0;
      this.yes = s === 1;
    }
    static none() {
      return new Outcome(0);
    }
    static pass() {
      return new Outcome(1);
    }
    static fail() {
      return new Outcome(-1);
    }
    static miss() {
      return new Outcome(-2);
    }
    static err() {
      return new Outcome(-3);
    }
  }
  const akdelim = "|";
  const msgkeydelim = "|";
  const auth_token_encoder = new TextEncoder();
  const mem = new LfuCache("AuthTokens", 100);
  async function auth(rxid, url) {
    const accesskeys = accessKeys();
    if (emptySet(accesskeys)) {
      return Outcome.none();
    }
    const msg = msgkeyFromUrl(url);
    if (emptyString(msg)) {
      log.w(rxid, "auth: stop! missing access-key in", url);
      return Outcome.miss();
    }
    let ok = false;
    let a6 = "";
    for (const dom of domains(url)) {
      if (emptyString(dom))
        continue;
      const [hex, hexcat] = await gen(msg, dom);
      log.d(rxid, msg, dom, "<= msg/h :auth: hex/k =>", hexcat, accesskeys);
      for (const ak of accesskeys) {
        ok = hexcat.startsWith(ak);
        if (ok) {
          return Outcome.pass();
        } else {
          const [d2, h] = ak.split(akdelim);
          a6 += d2 + akdelim + h.slice(0, 6) + " ";
        }
      }
      const h6 = dom + akdelim + hex.slice(0, 6);
      log.w(rxid, "auth: key mismatch want:", a6, "have:", h6);
    }
    log.w(rxid, "auth: stop! no matches");
    return Outcome.fail();
  }
  async function gen(msg, domain) {
    if (emptyString(msg) || emptyString(domain)) {
      throw new Error(`args empty [${msg} / ${domain}]`);
    }
    if (!isAlphaNumeric(msg) || !isDNSName(domain)) {
      throw new Error("args must be alphanumeric");
    }
    const m = msg.toLowerCase();
    const d2 = domain.toLowerCase();
    const cat = m + msgkeydelim + d2;
    const cached = mem.get(cat);
    if (cached)
      return cached;
    const k8 = auth_token_encoder.encode(cat);
    const m8 = auth_token_encoder.encode(info);
    const ab = await proof(k8, m8);
    const hex = bufutil_hex(ab);
    const hexcat = domain + akdelim + hex;
    const toks = [hex, hexcat];
    mem.put(cat, toks);
    return toks;
  }
  async function proof(key, val) {
    const hmac = "HMAC";
    const sha256 = "SHA-256";
    if (emptyBuf(key)) {
      throw new Error("key array-buffer empty");
    }
    if (emptyBuf(val)) {
      return await crypto.subtle.digest(sha256, key);
    }
    const hmackey = await crypto.subtle.importKey(
      "raw",
      key,
      {
        name: hmac,
        hash: { name: sha256 }
      },
      false,
      ["sign", "verify"]
    );
    return await crypto.subtle.sign(hmac, hmackey, val);
  }
  ;
  class LfTransformer {
    constructor(typ) {
      this.typ = typ;
      this.partial = this.typ.empty();
    }
    transform(chunk, controller) {
      const cat = this.typ.concat(this.partial, chunk);
      const lines = this.typ.split(cat);
      this.partial = lines.pop() || this.typ.empty();
      for (const l of lines) {
        if (this.typ.include(l)) {
          const incl = this.typ.concat(l, this.typ.separator);
          controller.enqueue(incl);
        }
      }
    }
    flush(controller) {
      const p = this.partial;
      if (this.typ.len(p) > 0)
        controller.enqueue(p);
    }
  }
  const bufstream = (strfilter) => new TransformStream(new LfTransformer(new ByteType(strfilter)));
  const strstream = (strfilter) => new TransformStream(new LfTransformer(new StrType(strfilter)));
  async function* streamiter(stream) {
    const reader = stream.getReader();
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done)
          return;
        yield value;
      }
    } finally {
      reader.releaseLock();
    }
  }
  class ByteType {
    constructor(strfilter, strsep = "\n") {
      const enc = new TextEncoder();
      this.separator = enc.encode(strsep);
      this.filter = enc.encode(strfilter);
    }
    name() {
      return "Byte";
    }
    empty() {
      return new Uint8Array(0);
    }
    concat(buf1, buf2) {
      const cat = new Uint8Array(buf1.length + buf2.length);
      cat.set(buf1, 0);
      cat.set(buf2, buf1.length);
      return cat;
    }
    split(buf) {
      const sep = this.separator[0];
      const w2 = [];
      w2.push(
        buf.reduce((acc, x) => {
          if (x === sep) {
            w2.push(acc);
            return [];
          } else {
            acc.push(x);
            return acc;
          }
        }, [])
      );
      for (let i2 = 0; i2 < w2.length; i2++) {
        if (w2[i2].length === 0)
          continue;
        w2[i2] = Uint8Array.from(w2[i2]);
      }
      return w2;
    }
    indexOf(buf, me, limit) {
      if (!me || me.length === 0)
        return -2;
      if (this.len(buf) === 0)
        return -3;
      const ml = me.length - 1;
      const bl = buf.length > limit ? limit : buf.length;
      if (bl < ml)
        return -4;
      for (let i2 = 0; i2 < bl - ml; i2++) {
        const start = buf[i2] === me[0];
        const end = buf[i2 + ml] === me[ml];
        if (!start || !end)
          continue;
        if (ml === 0 || ml === 1)
          return i2;
        for (let j = 1, k = i2 + 1; j < ml; j++, k++) {
          if (buf[k] !== me[j])
            break;
          if (j + 1 >= ml)
            return k - j;
        }
      }
      return -1;
    }
    include(buf, limit = 200) {
      return this.indexOf(buf, this.filter, limit) >= 0;
    }
    len(buf) {
      return buf.byteLength;
    }
  }
  class StrType {
    constructor(strfilter, strsep = "/[\r\n]+/") {
      this.separator = strsep;
      this.filter = strfilter;
    }
    name() {
      return "Str";
    }
    empty() {
      return "";
    }
    concat(s1, s2) {
      return s1 + s2;
    }
    split(s) {
      const sep = this.separator[0];
      return s.split(sep);
    }
    include(s) {
      return s && s.include(this.filter);
    }
    len(s) {
      return s.length;
    }
  }
  class StreamType {
    name() {
    }
    empty() {
    }
    concat(arg1, arg2) {
    }
    split(arg1) {
    }
    include(arg1) {
    }
    len(arg1) {
    }
  }
  ;
  const geoip_debug = false;
  const ip6sep = ":";
  const ip4sep = ".";
  const ip6size = 16;
  const ip4size = 4;
  const dbip4 = "dbip.v4";
  const dbip6 = "dbip.v6";
  const ccunknown = "ZZ";
  const ccsize = 2;
  const maxdepth = 32;
  const waitms = 50;
  const maxwaitms = 5e3;
  const size = 2e4;
  class GeoIP {
    constructor() {
      this.geo4 = null;
      this.geo6 = null;
      this.initializing = false;
      this.decoder = new TextDecoder();
      this.repo = geoipUrl();
      this.cache = new LfuCache("GeoIP", size);
      this.log = log.withTags("GeoIP");
    }
    initDone() {
      return !emptyBuf(this.geo4) && !emptyBuf(this.geo6);
    }
    async download(force = false) {
      if (!force && this.initDone()) {
        return Promise.all([this.geo4, this.geo6]);
      }
      this.log.d("downloading geoip dbs", this.repo);
      const [f1, f2] = await Promise.all([
        fetch(this.repo + dbip4),
        fetch(this.repo + dbip6)
      ]);
      if (!f1.ok || !f2.ok)
        throw new Error("geoip download failed");
      return Promise.all([f1.arrayBuffer(), f2.arrayBuffer()]);
    }
    async init(g4, g6) {
      if (this.initDone())
        return true;
      let totalsleep = 0;
      while (this.initializing && totalsleep < maxwaitms) {
        await sleep(waitms);
        totalsleep += waitms;
      }
      this.initializing = true;
      if (g4 == null || g6 == null) {
        [g4, g6] = await this.download();
        const sz4 = this.geo4 && this.geo4.byteLength;
        const sz6 = this.geo4 && this.geo6.byteLength;
        this.log.d("downloading geoip dbs done", sz4, sz6);
      }
      this.geo4 = normalize8(g4);
      this.geo6 = normalize8(g6);
      this.initializing = false;
      return this.initDone();
    }
    country(ipstr) {
      if (!this.initDone())
        return ccunknown;
      if (emptyString(ipstr))
        return ccunknown;
      const cached = this.cache.get(ipstr);
      if (!emptyObj(cached)) {
        return cached;
      }
      const ip2 = this.iptou8(ipstr);
      const recsize = ip2.length + ccsize;
      const g = ip2.length === 4 ? this.geo4 : this.geo6;
      let low = 0;
      let high = g.byteLength / recsize;
      let i2 = 0;
      while (high - 1 > low) {
        const mid = (high + low) / 2 | 0;
        const midpos = mid * recsize;
        if (geoip_debug)
          this.log.d(i2, "nexti", mid, "<mid, l/h>", low, high);
        if (this.lessthan(g, midpos, ip2))
          low = mid;
        else
          high = mid;
        if (i2++ > maxdepth)
          break;
      }
      const pos = low * recsize + ip2.length;
      const raw2 = g.subarray(pos, pos + ccsize);
      const cc = this.decoder.decode(raw2);
      this.cache.put(ipstr, cc);
      if (geoip_debug)
        this.log.d(low, high, "<l/h | pos>", pos, raw2, "cc", cc);
      return cc;
    }
    lessthan(g, w2, ip2) {
      for (let i2 = 0; i2 < ip2.length; i2++) {
        const gi = g[w2 + i2];
        const ii = ip2[i2];
        if (geoip_debug)
          this.log.d(i2, "<i | w>", w2, gi, "<bi | ii>", ii);
        if (gi > ii)
          return false;
        if (ii > gi)
          return true;
      }
      return true;
    }
    iptou8(ip2) {
      if (ip2.indexOf(ip6sep) > 0) {
        const ip6 = ip2.split(ip6sep);
        const ip6u8 = new Uint8Array(ip6size);
        for (let i2 = 0; i2 < ip6size; i2++) {
          ip6u8[i2] = parseInt(ip6[i2], 16) | 0;
        }
        return ip6u8;
      } else {
        const ip4 = ip2.split(ip4sep);
        const ip4u8 = new Uint8Array(ip4size);
        for (let i2 = 0; i2 < ip4size; i2++) {
          ip4u8[i2] = parseInt(ip4[i2]) | 0;
        }
        return ip4u8;
      }
    }
  }
  ;
  var log_pusher_console = __webpack_require__(108);
  const emptyarr = [];
  const emptystring = "";
  const ver = "1";
  const commalen = 1;
  const charlimit = 300;
  const maxdatapoints = 20;
  const maxansdatalen = 80;
  const ansdelim = "|";
  const logsep = ":";
  const logdelim = ",";
  const minmins = 1;
  const maxmins = 365 * 24 * 60;
  const minlimit = 1;
  const maxlimit = 100;
  const processLogsAsText = false;
  const ONE_WA_DATASET1 = "ONE_M0";
  const ONE_WA_DATASET2 = "ONE_BL0";
  class LogPusher {
    constructor() {
      this.geoip = new GeoIP();
      this.corelog = log.withTags("LogPusher");
      this.sources = logpushSources();
      this.cols1 = this.setupCols1();
      this.meturl = this.setupMetUrl();
      this.remotelogurl = this.setupLogpushUrl();
      this.apitoken = cfApiToken();
      this.stubmetrics = false;
      this.stubremotelog = false;
      this.remotelog = this.stubremotelog ? stub : log_pusher_console.log;
      this.corelog.d("stub met? rlog?", this.stubmetrics, this.stubremotelog);
    }
    async init(g4, g6) {
      return this.geoip.init(g4, g6);
    }
    initDone() {
      return this.geoip.initDone();
    }
    geo4() {
      return this.geoip.geo4;
    }
    geo6() {
      return this.geoip.geo6;
    }
    async exec(ctx) {
      let response = emptyResponse();
      if (this.noop(ctx)) {
        return response;
      }
      try {
        const request = ctx.request;
        const bg = ctx.dispatcher;
        const rxid = ctx.rxid;
        const lid = ctx.lid;
        const reg = ctx.region;
        const upstream = ctx.userDnsResolverUrl || emptystring;
        const query = ctx.requestDecodedDnsPacket || null;
        const ans = ctx.responseDecodedDnsPacket || null;
        const flag = ctx.blockflag || emptystring;
        this.logpush(rxid, bg, lid, reg, request, upstream, query, ans, flag);
      } catch (e) {
        response = errResponse("logpusher", e);
      }
      return response;
    }
    logpush(rxid, bg, lid, reg, req, upstream, q, a, flag) {
      const lk = this.key("k", lid);
      const version = this.key("v", this.getversion());
      const region2 = this.key("r", reg);
      const ip2 = this.key("i", this.getip(req));
      const up2 = this.key("u", this.getupstream(upstream));
      const qname = this.key("q", this.getqname(q));
      const qtype = this.key("t", this.getqtype(q));
      const ans = this.key("a", this.getans(a));
      const f = this.key("f", flag);
      const all = [version, ip2, region2, up2, qname, qtype, ans, f];
      const n = this.getlimit(lk.length);
      const lines = this.mklogs(all, n);
      for (const l of lines) {
        this.remotelog(lk + logdelim + l);
      }
      bg(this.rec(lid, all));
      this.corelog.d(`remotelog lines: ${lk} ${lines.length}`);
    }
    getlimit(lklen) {
      return charlimit - (lklen + commalen);
    }
    getversion() {
      return ver;
    }
    getip(req) {
      return req.headers.get("x-nile-client-ip") || req.headers.get("cf-connecting-ip") || emptystring;
    }
    getupstream(upstream) {
      if (emptyString(upstream))
        return emptystring;
      try {
        const u = new URL(upstream);
        return u.hostname;
      } catch (ignore) {
      }
      return emptystring;
    }
    getqname(q) {
      if (!q)
        return emptystring;
      if (emptyArray(q.questions))
        return emptystring;
      return getQueryName(q.questions) || emptystring;
    }
    getqtype(q) {
      if (!q)
        return emptystring;
      return getQueryType(q) || emptystring;
    }
    getans(a) {
      if (!a)
        return emptystring;
      return getInterestingAnswerData(a, maxansdatalen, ansdelim);
    }
    getipfromans(delimitedans) {
      if (emptyString(delimitedans))
        return emptystring;
      const v = this.valOf(delimitedans);
      for (const a of v.split(ansdelim)) {
        if (maybeIP(a))
          return a;
      }
      return emptystring;
    }
    metricsservice() {
      let m1 = null;
      let m2 = null;
      if (this.stubmetrics) {
        m1 = { writeDataPoint: stub };
        m2 = { writeDataPoint: stub };
      } else {
        [m1, m2] = metrics();
      }
      return [m1, m2];
    }
    async getcountry(ipstr) {
      if (emptyString(ipstr))
        return emptystring;
      await this.init();
      return this.geoip.country(ipstr);
    }
    noop(ctx) {
      const y = true;
      const n = false;
      if (!ctx.isDnsMsg)
        return y;
      if (emptyString(ctx.lid))
        return y;
      if (emptySet(this.sources))
        return n;
      const u = new URL(ctx.request.url);
      for (const s of this.sources) {
        if (u.hostname.indexOf(s) >= 0)
          return n;
      }
      return y;
    }
    key(k, v) {
      if (emptyString(v)) {
        return `${k}${logsep}`;
      }
      return `${k}${logsep}${v}`;
    }
    valOf(kv) {
      const kidx = kv.indexOf(logsep);
      if (kidx < 0)
        return emptystring;
      return strstr(kv, kidx + 1);
    }
    mklogs(all, limit = charlimit) {
      const lines = [];
      let csv = "";
      for (let item of all) {
        if (emptyString(item))
          continue;
        item = item.slice(0, limit);
        if (csv.length + item.length > limit) {
          const t2 = csv.slice(0, -1);
          lines.push(t2);
          csv = "";
        }
        csv = csv + item + ",";
      }
      if (!emptyString(csv)) {
        const t2 = csv.slice(0, -1);
        lines.push(t2);
      }
      return lines;
    }
    async rec(lid, all) {
      const [m1, m2] = this.metricsservice();
      if (m1 == null || m2 == null)
        return;
      const metrics1 = [];
      const metrics2 = [];
      const [version, ip2, region2, up2, qname, qtype, ans, f] = all;
      const isblocked = this.isansblocked(qtype, ans, f);
      const blists = this.getblocklists(f);
      const dom = this.getdomain(qname);
      const ansip = this.getipfromans(ans);
      const countrycode = await this.getcountry(ansip);
      const idx1 = this.idxmet(lid, "1");
      const idx2 = this.idxmet(lid, "2");
      metrics1.push(this.strmet(ip2));
      metrics1.push(this.strmet(qname));
      metrics1.push(this.strmet(region2));
      metrics1.push(this.strmet(qtype));
      metrics1.push(this.strmet(dom));
      metrics1.push(this.strmet(ansip));
      metrics1.push(this.strmet(countrycode));
      metrics1.push(this.nummet(1));
      metrics1.push(this.nummet(isblocked ? 1 : 0));
      if (isblocked) {
        for (const b of blists) {
          if (metrics2.length > maxdatapoints)
            break;
          const kb = this.key("l", b);
          metrics2.push(this.strmet(kb));
        }
        metrics2.push(this.nummet(blists.length));
      }
      const blobs1 = metrics1.filter((m) => m.blob != null);
      const blobs2 = metrics2.filter((m) => m.blob != null);
      const doubles1 = metrics1.filter((m) => m.double != null);
      const doubles2 = metrics2.filter((m) => m.double != null);
      m1.writeDataPoint({
        blobs: blobs1.map((m) => m.blob),
        doubles: doubles1.map((m) => m.double),
        indexes: [idx1]
      });
      if (metrics2.length > 0) {
        m2.writeDataPoint({
          blobs: blobs2.map((m) => m.blob),
          doubles: doubles2.map((m) => m.double),
          indexes: [idx2]
        });
      }
      this.corelog.d(`rec: ${lid} ${blobs1.length} ${doubles1.length}`);
    }
    getdomain(d2) {
      return tld(d2);
    }
    getblocklists(flag) {
      flag = this.valOf(flag);
      if (emptyString(flag))
        return emptyarr;
      return blocklists(flag);
    }
    isansblocked(qtype, ansips, flag) {
      qtype = this.valOf(qtype);
      ansips = this.valOf(ansips);
      flag = this.valOf(flag);
      if (!emptyString(flag)) {
        return emptyString(ansips);
      }
      if (!queryTypeMayResultInIP(qtype)) {
        return emptyString(ansips);
      }
      for (const ansip of ansips.split(ansdelim)) {
        if (isIPGrounded(ansip))
          return true;
      }
      return false;
    }
    idxmet(lk, n) {
      return `${lk}${n}`;
    }
    strmet(k = "none") {
      return {
        blob: k,
        double: null
      };
    }
    nummet(v = 0) {
      return {
        blob: null,
        double: v
      };
    }
    setupCols1() {
      const cols = /* @__PURE__ */ new Map();
      cols.set("ip", "blob1");
      cols.set("qname", "blob2");
      cols.set("region", "blob3");
      cols.set("qtype", "blob4");
      cols.set("dom", "blob5");
      cols.set("ansip", "blob6");
      cols.set("cc", "blob7");
      cols.set("req", "double1");
      cols.set("blocked", "double2");
      return cols;
    }
    setupMetUrl() {
      const accid = cfAccountId();
      if (emptyString(accid))
        return null;
      return new URL(
        `https://api.cloudflare.com/client/v4/accounts/${accid}/analytics_engine/sql`
      );
    }
    setupLogpushUrl() {
      const accid = cfAccountId();
      const logpath = logpushPath();
      const p = logpath.indexOf("/");
      if (emptyString(accid))
        return null;
      if (p < 0)
        return null;
      const date = "{DATE}";
      const now = new Date();
      const end = now.toISOString();
      now.setHours(now.getHours() - 3);
      const start = now.toISOString();
      const bucket = logpath.slice(0, p);
      let rest = logpath.slice(p + 1);
      if (!emptyString(rest)) {
        rest = rest.endsWith("/") ? rest : `${rest}/`;
      }
      const prefix = rest ? `${rest}${date}` : `${date}`;
      const u = new URL(
        `https://api.cloudflare.com/client/v4/accounts/${accid}/logs/retrieve`
      );
      u.searchParams.set("bucket", bucket);
      u.searchParams.set("prefix", prefix);
      u.searchParams.set("start", start);
      u.searchParams.set("end", end);
      return u;
    }
    async count1(lid, fields, mins = 30, dataset = ONE_WA_DATASET1, limit = 10) {
      const idx1 = this.idxmet(lid, "1");
      const f0 = fields[0];
      const col = this.cols1.get(f0);
      const vol = this.cols1.get("req");
      mins = bounds(mins || 30, minmins, maxmins);
      dataset = dataset || ONE_WA_DATASET1;
      limit = bounds(limit || 10, minlimit, maxlimit);
      const sql = `
      SELECT
        ${col} as ${f0},
        SUM(_sample_interval * ${vol}) as n
      FROM ${dataset}
      WHERE index1 = '${idx1}'
        AND timestamp > NOW() - INTERVAL '${mins}' MINUTE
      GROUP BY ${f0}
      ORDER BY n DESC
      LIMIT ${limit}
      `;
      return this.query(sql);
    }
    async query(sql) {
      if (this.meturl == null)
        return null;
      if (emptyString(this.apitoken))
        return null;
      if (emptyString(sql))
        return null;
      this.corelog.d(`querying: ${sql}`);
      return await fetch(this.meturl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apitoken}`
        },
        body: sql
      });
    }
    async remotelogs(lid, start, end) {
      const ak = logpushAccessKey();
      const sk = logpushSecretKey();
      if (this.remotelogurl == null)
        return null;
      if (emptyString(this.apitoken))
        return null;
      if (emptyString(ak))
        return null;
      if (emptyString(sk))
        return null;
      const u = new URL(this.remotelogurl);
      if (start && end) {
        start = new Date(start);
        end = new Date(end);
        if (start.getTime() > end.getTime()) {
          const t2 = start;
          start = end;
          end = t2;
        }
        u.searchParams.set("start", start.toISOString());
        u.searchParams.set("end", end.toISOString());
      }
      this.corelog.d(`remotelogs: ${u}`);
      const r = await fetch(u, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${this.apitoken}`,
          "R2-Access-Key-Id": ak,
          "R2-Secret-Access-Key": sk
        }
      });
      if (r.ok) {
        return this.filterlog(r.body, lid);
      }
      return r.body;
    }
    filterlog(body, filterstr) {
      if (body == null)
        return null;
      if (processLogsAsText) {
        return body.pipeThrough(new TextDecoderStream()).pipeThrough(strstream(filterstr)).pipeThrough(new TextEncoderStream());
      } else {
        return body.pipeThrough(bufstream(filterstr));
      }
    }
  }
  ;
  class DnsBlocker {
    constructor() {
      this.log = log.withTags("DnsBlocker");
    }
    blockQuestion(rxid, req, blockInfo) {
      const dnsPacket = req.dnsPacket;
      const stamps = req.stamps;
      if (!stamps) {
        this.log.d(rxid, "q: no stamp");
        return req;
      }
      if (!hasBlockstamp(blockInfo)) {
        this.log.d(rxid, "q: no user-set blockstamp");
        return req;
      }
      if (!isQueryBlockable(dnsPacket)) {
        this.log.d(rxid, "not a blockable dns-query");
        return req;
      }
      const domains2 = extractDomains(dnsPacket);
      const bres = this.block(domains2, blockInfo, stamps);
      return copyOnlyBlockProperties(req, bres);
    }
    blockAnswer(rxid, res, blockInfo) {
      const dnsPacket = res.dnsPacket;
      const stamps = res.stamps;
      if (!stamps || !hasAnswers(dnsPacket)) {
        this.log.d(rxid, "ans: no stamp / dns-packet");
        return res;
      }
      if (!hasBlockstamp(blockInfo)) {
        this.log.d(rxid, "ans: no user-set blockstamp");
        return res;
      }
      if (!isAnswerBlockable(dnsPacket)) {
        this.log.d(rxid, "ans not cloaked with cname/https/svcb");
        return res;
      }
      if (isAnswerQuad0(dnsPacket)) {
        this.log.d(rxid, "ans: already blocked");
        return res;
      }
      const domains2 = extractDomains(dnsPacket);
      const bres = this.block(domains2, blockInfo, stamps);
      return copyOnlyBlockProperties(res, bres);
    }
    block(names, blockInfo, blockstamps) {
      let r = rdnsNoBlockResponse();
      for (const n of names) {
        r = doBlock(n, blockInfo, blockstamps);
        if (r.isBlocked)
          break;
      }
      return r;
    }
  }
  ;
  class DNSResolver {
    constructor(blocklistWrapper, cache) {
      this.cache = cache;
      this.blocker = new DnsBlocker();
      this.bw = blocklistWrapper;
      this.http2 = null;
      this.nodeutil = null;
      this.transport = null;
      this.log = log.withTags("DnsResolver");
      this.measurements = [];
      this.profileResolve = profileDnsResolves();
      this.forceDoh = forceDoh();
      this.avoidFetch = avoidFetch();
      this.bgBwInit = bgDownloadBlocklistWrapper();
      this.maxDoh = maxDohUrl();
      if (this.profileResolve) {
        this.log.w("profiling", this.determineDohResolvers());
        this.log.w("doh?", this.forceDoh, "fetch?", this.avoidFetch);
      }
    }
    async lazyInit() {
      if (!hasDynamicImports())
        return;
      const isnode = isNode();
      const plainOldDnsIp = dnsaddr();
      if (isnode && !this.http2) {
        this.http2 = await Promise.resolve().then(function webpackMissingModule() {
          var e = new Error("Cannot find module 'http2'");
          e.code = "MODULE_NOT_FOUND";
          throw e;
        });
        this.log.i("imported custom http2 client");
      }
      if (isnode && !this.nodeutil) {
        this.nodeutil = await Promise.resolve().then(function webpackMissingModule() {
          var e = new Error("Cannot find module '../../core/node/util.js'");
          e.code = "MODULE_NOT_FOUND";
          throw e;
        });
        this.log.i("imported node-util");
      }
      if (isnode && !this.transport) {
        const dnst = await Promise.resolve().then(function webpackMissingModule() {
          var e = new Error("Cannot find module '../../core/node/dns-transport.js'");
          e.code = "MODULE_NOT_FOUND";
          throw e;
        });
        if (this.transport == null) {
          this.transport = dnst.makeTransport(plainOldDnsIp, 53);
          this.log.i("imported udp/tcp dns transport", plainOldDnsIp);
        }
      }
    }
    async close() {
      this.log.i("closing resolver (& transport?", this.transport != null, ")");
      if (this.transport)
        return await this.transport.teardown();
    }
    async exec(ctx) {
      await this.lazyInit();
      let response = emptyResponse();
      try {
        response.data = await this.resolveDns(ctx);
      } catch (e) {
        response = errResponse("dnsResolver", e);
        this.log.e(ctx.rxid, "main", e.stack);
      }
      return response;
    }
    determineDohResolvers(preferredDoh, forceDoh2 = this.forceDoh) {
      if (this.transport && !forceDoh2)
        return [];
      if (!emptyString(preferredDoh)) {
        return [preferredDoh];
      }
      if (!this.bw.disabled() && !this.bw.isBlocklistFilterSetup()) {
        return [primaryDohResolver()];
      }
      return dohResolvers();
    }
    logMeasurementsPeriodically(period2 = 100) {
      const len2 = this.measurements.length - 1;
      if ((len2 + 1) % period2 !== 0)
        return;
      this.measurements.sort((a, b) => a - b);
      const p10 = this.measurements[Math.floor(len2 * 0.1)];
      const p50 = this.measurements[Math.floor(len2 * 0.5)];
      const p75 = this.measurements[Math.floor(len2 * 0.75)];
      const p90 = this.measurements[Math.floor(len2 * 0.9)];
      const p95 = this.measurements[Math.floor(len2 * 0.95)];
      const p99 = this.measurements[Math.floor(len2 * 0.99)];
      const p999 = this.measurements[Math.floor(len2 * 0.999)];
      const p9999 = this.measurements[Math.floor(len2 * 0.9999)];
      const p100 = this.measurements[len2];
      this.log.qStart("runs:", len2 + 1);
      this.log.q("p10/50/75/90/95", p10, p50, p75, p90, p95);
      this.log.qEnd("p99/99.9/99.99/100", p99, p999, p9999, p100);
    }
    async resolveDns(ctx) {
      const rxid = ctx.rxid;
      const req = ctx.request;
      const blInfo = ctx.userBlocklistInfo;
      const rawpacket = ctx.requestBodyBuffer;
      const decodedpacket = ctx.requestDecodedDnsPacket;
      const userDns = ctx.userDnsResolverUrl;
      const dispatcher = ctx.dispatcher;
      const userBlockstamp = ctx.userBlockstamp;
      const stamps = ctx.domainBlockstamp;
      let blf = this.bw.getBlocklistFilter();
      const isBlfDisabled = this.bw.disabled();
      let isBlfSetup = isBlocklistFilterSetup(blf);
      const q = await this.makeRdnsResponse(rxid, rawpacket, blf, stamps);
      this.blocker.blockQuestion(rxid, q, blInfo);
      this.log.d(rxid, "q block?", q.isBlocked, "blf?", isBlfSetup);
      if (q.isBlocked) {
        this.primeCache(rxid, q, dispatcher);
        return q;
      }
      let resolveStart = 0;
      let resolveEnd = 0;
      if (this.profileResolve) {
        resolveStart = Date.now();
      }
      let fromMax = false;
      let promisedTasks = null;
      if (!isBlfSetup && this.bgBwInit) {
        const alt = this.ofMax(userBlockstamp);
        fromMax = true;
        this.log.d(rxid, "bg-bw-init; upstream to max", alt);
        dispatcher(this.bw.init(rxid));
        promisedTasks = await Promise.allSettled([
          Promise.resolve(),
          this.resolveDnsUpstream(
            rxid,
            req,
            this.determineDohResolvers(alt, true),
            rawpacket,
            decodedpacket
          )
        ]);
      } else {
        promisedTasks = await Promise.allSettled([
          this.bw.init(rxid),
          this.resolveDnsUpstream(
            rxid,
            req,
            this.determineDohResolvers(userDns),
            rawpacket,
            decodedpacket
          )
        ]);
      }
      for (const task of promisedTasks) {
        if (task.status === "rejected") {
          throw new Error(`task rejected ${task.reason}`);
        }
      }
      if (this.profileResolve) {
        resolveEnd = Date.now();
        this.measurements.push(resolveEnd - resolveStart);
        this.logMeasurementsPeriodically();
      }
      const res = promisedTasks[1].value;
      if (fromMax) {
        isBlfSetup = true;
      } else if (!isBlfSetup && !isBlfDisabled) {
        this.log.d(rxid, "blocklist-filter downloaded and setup");
        blf = this.bw.getBlocklistFilter();
        isBlfSetup = isBlocklistFilterSetup(blf);
      } else {
        isBlfSetup = true;
      }
      if (!isBlfSetup)
        throw new Error(rxid + " no blocklist-filter");
      if (!res)
        throw new Error(rxid + " no upstream result");
      if (!res.ok) {
        const txt = res.text && await res.text();
        this.log.d(rxid, "!OK", res.status, txt);
        throw new Error(txt + " http err: " + res);
      }
      const ans = await res.arrayBuffer();
      const r = await this.makeRdnsResponse(rxid, ans, blf, stamps);
      this.blocker.blockAnswer(rxid, r, blInfo);
      const fromCache = hasCacheHeader(res.headers);
      this.log.d(rxid, "ans block?", r.isBlocked, "from cache?", fromCache);
      if (!fromCache && !fromMax) {
        this.primeCache(rxid, r, dispatcher);
      }
      return r;
    }
    async makeRdnsResponse(rxid, raw2, blf, stamps = null) {
      if (!raw2)
        throw new Error(rxid + " mk-res no upstream result");
      const dnsPacket = dnsutil_decode(raw2);
      stamps = emptyObj(stamps) ? blockstampFromBlocklistFilter(dnsPacket, blf) : stamps;
      return dnsResponse(dnsPacket, raw2, stamps);
    }
    async primeCache(rxid, r, dispatcher) {
      const blocked = r.isBlocked;
      const k = makeHttpCacheKey(r.dnsPacket);
      this.log.d(rxid, "primeCache: block?", blocked, "k", k.href);
      if (!k) {
        this.log.d(rxid, "no cache-key, url/query missing?", k, r.stamps);
        return;
      }
      const v = cacheValueOf(r);
      this.cache.put(k, v, dispatcher);
    }
    ofMax(blockstamp) {
      if (emptyString(this.maxDoh))
        return "";
      if (emptyString(blockstamp))
        return this.maxDoh;
      else
        return this.maxDoh + blockstamp;
    }
  }
  DNSResolver.prototype.resolveDnsUpstream = async function(rxid, request, resolverUrls, query, packet) {
    const promisedPromises = [];
    if (emptyArray(resolverUrls)) {
      try {
        const q = bufferOf(query);
        let ans = await this.transport.udpquery(rxid, q);
        if (truncated(ans)) {
          this.log.w(rxid, "ans truncated, retrying over tcp");
          ans = await this.transport.tcpquery(rxid, q);
        }
        if (ans) {
          const r = new Response(arrayBufferOf(ans));
          promisedPromises.push(Promise.resolve(r));
        } else {
          promisedPromises.push(Promise.resolve(respond503()));
        }
      } catch (e) {
        this.log.e(rxid, "err when querying plain old dns", e.stack);
        promisedPromises.push(Promise.reject(e));
      }
      return Promise.any(promisedPromises);
    }
    try {
      this.log.d(rxid, "upstream cache");
      promisedPromises.push(this.resolveDnsFromCache(rxid, packet));
      for (const rurl of resolverUrls) {
        if (emptyString(rurl)) {
          this.log.w(rxid, "missing resolver url", rurl);
          continue;
        }
        const u = new URL(request.url);
        const upstream = new URL(rurl);
        u.hostname = upstream.hostname;
        u.pathname = upstream.pathname;
        u.port = upstream.port;
        u.protocol = upstream.protocol;
        let dnsreq = null;
        if (isGetRequest(request)) {
          u.search = "?dns=" + bytesToBase64Url(query);
          dnsreq = new Request(u.href, {
            method: "GET",
            headers: dnsHeaders()
          });
        } else if (isPostRequest(request)) {
          dnsreq = new Request(u.href, {
            method: "POST",
            headers: concatHeaders(
              contentLengthHeader(query),
              dnsHeaders()
            ),
            body: query
          });
        } else {
          throw new Error("get/post only");
        }
        this.log.d(rxid, "upstream doh2/fetch", u.href);
        promisedPromises.push(
          this.avoidFetch ? this.doh2(rxid, dnsreq) : fetch(dnsreq)
        );
      }
    } catch (e) {
      this.log.e(rxid, "err doh2/fetch upstream", e.stack);
      promisedPromises.push(Promise.reject(e));
    }
    return Promise.any(promisedPromises);
  };
  DNSResolver.prototype.resolveDnsFromCache = async function(rxid, packet) {
    const k = makeHttpCacheKey(packet);
    if (!k)
      throw new Error("resolver: no cache-key");
    const cr = await this.cache.get(k);
    const hasAns = cr && isAnswer(cr.dnsPacket);
    const freshAns = hasAns && isAnswerFresh(cr.metadata);
    this.log.d(rxid, "cache ans", k.href, "ans?", hasAns, "fresh?", freshAns);
    if (!hasAns || !freshAns) {
      return Promise.reject(new Error("resolver: cache miss"));
    }
    updatedAnswer(cr.dnsPacket, packet.id, cr.metadata.expiry);
    const b = dnsutil_encode(cr.dnsPacket);
    const r = new Response(b, { headers: cacheHeaders() });
    return Promise.resolve(r);
  };
  DNSResolver.prototype.doh2 = async function(rxid, request) {
    if (!this.http2 || !this.nodeutil) {
      throw new Error("h2 / node-util not setup, bailing");
    }
    this.log.d(rxid, "upstream with doh2");
    const http2 = this.http2;
    const u = new URL(request.url);
    const verb = request.method;
    const path = isGetRequest(request) ? u.pathname + u.search : u.pathname;
    const qab = await request.arrayBuffer();
    const upstreamQuery = bufferOf(qab);
    const headers = copyHeaders(request);
    return new Promise((resolve, reject) => {
      if (!isGetRequest(request) && !isPostRequest(request)) {
        reject(new Error("Only GET/POST requests allowed"));
      }
      const c = http2.connect(u.origin);
      c.on("error", (err) => {
        this.log.e(rxid, "conn fail", err.message);
        reject(err.message);
      });
      const req = c.request({
        [http2.constants.HTTP2_HEADER_METHOD]: verb,
        [http2.constants.HTTP2_HEADER_PATH]: path,
        ...headers
      });
      req.on("response", (headers2) => {
        const b = [];
        req.on("data", (chunk) => {
          b.push(chunk);
        });
        req.on("end", () => {
          const rb = concatBuf(b);
          const h = this.nodeutil.transformPseudoHeaders(headers2);
          c.close();
          resolve(new Response(rb, h));
        });
      });
      req.on("error", (err) => {
        this.log.e(rxid, "send/recv fail", err.message);
        reject(err.message);
      });
      req.end(upstreamQuery);
    });
  };
  ;
  const undelegated = /* @__PURE__ */ new Set([
    "0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.ip6.arpa",
    "0.in-addr.arpa",
    "1",
    "1.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.ip6.arpa",
    "10.in-addr.arpa",
    "100.100.in-addr.arpa",
    "100.51.198.in-addr.arpa",
    "101.100.in-addr.arpa",
    "102.100.in-addr.arpa",
    "103.100.in-addr.arpa",
    "104.100.in-addr.arpa",
    "105.100.in-addr.arpa",
    "106.100.in-addr.arpa",
    "107.100.in-addr.arpa",
    "108.100.in-addr.arpa",
    "109.100.in-addr.arpa",
    "110.100.in-addr.arpa",
    "111.100.in-addr.arpa",
    "112.100.in-addr.arpa",
    "113.0.203.in-addr.arpa",
    "113.100.in-addr.arpa",
    "114.100.in-addr.arpa",
    "115.100.in-addr.arpa",
    "116.100.in-addr.arpa",
    "117.100.in-addr.arpa",
    "118.100.in-addr.arpa",
    "119.100.in-addr.arpa",
    "120.100.in-addr.arpa",
    "121.100.in-addr.arpa",
    "122.100.in-addr.arpa",
    "123.100.in-addr.arpa",
    "124.100.in-addr.arpa",
    "125.100.in-addr.arpa",
    "126.100.in-addr.arpa",
    "127.100.in-addr.arpa",
    "127.in-addr.arpa",
    "16.172.in-addr.arpa",
    "168.192.in-addr.arpa",
    "17.172.in-addr.arpa",
    "18.172.in-addr.arpa",
    "19.172.in-addr.arpa",
    "2.0.192.in-addr.arpa",
    "20.172.in-addr.arpa",
    "21.172.in-addr.arpa",
    "22.172.in-addr.arpa",
    "23.172.in-addr.arpa",
    "24.172.in-addr.arpa",
    "25.172.in-addr.arpa",
    "254.169.in-addr.arpa",
    "255.255.255.255.in-addr.arpa",
    "26.172.in-addr.arpa",
    "27.172.in-addr.arpa",
    "28.172.in-addr.arpa",
    "29.172.in-addr.arpa",
    "30.172.in-addr.arpa",
    "31.172.in-addr.arpa",
    "64.100.in-addr.arpa",
    "65.100.in-addr.arpa",
    "66.100.in-addr.arpa",
    "67.100.in-addr.arpa",
    "68.100.in-addr.arpa",
    "69.100.in-addr.arpa",
    "70.100.in-addr.arpa",
    "71.100.in-addr.arpa",
    "72.100.in-addr.arpa",
    "73.100.in-addr.arpa",
    "74.100.in-addr.arpa",
    "75.100.in-addr.arpa",
    "76.100.in-addr.arpa",
    "77.100.in-addr.arpa",
    "78.100.in-addr.arpa",
    "79.100.in-addr.arpa",
    "8.b.d.0.1.0.0.2.ip6.arpa",
    "8.e.f.ip6.arpa",
    "80.100.in-addr.arpa",
    "81.100.in-addr.arpa",
    "82.100.in-addr.arpa",
    "83.100.in-addr.arpa",
    "84.100.in-addr.arpa",
    "85.100.in-addr.arpa",
    "86.100.in-addr.arpa",
    "87.100.in-addr.arpa",
    "88.100.in-addr.arpa",
    "89.100.in-addr.arpa",
    "9.e.f.ip6.arpa",
    "90.100.in-addr.arpa",
    "91.100.in-addr.arpa",
    "92.100.in-addr.arpa",
    "93.100.in-addr.arpa",
    "94.100.in-addr.arpa",
    "95.100.in-addr.arpa",
    "96.100.in-addr.arpa",
    "97.100.in-addr.arpa",
    "98.100.in-addr.arpa",
    "99.100.in-addr.arpa",
    "a.e.f.ip6.arpa",
    "airdream",
    "api",
    "b.e.f.ip6.arpa",
    "bbrouter",
    "belkin",
    "bind",
    "blinkap",
    "corp",
    "d.f.ip6.arpa",
    "davolink",
    "dearmyrouter",
    "dhcp",
    "dlink",
    "domain",
    "envoy",
    "example",
    "f.f.ip6.arpa",
    "grp",
    "gw==",
    "home",
    "hub",
    "internal",
    "intra",
    "intranet",
    "invalid",
    "ksyun",
    "lan",
    "loc",
    "local",
    "localdomain",
    "localhost",
    "localnet",
    "modem",
    "mynet",
    "myrouter",
    "novalocal",
    "onion",
    "openstacklocal",
    "priv",
    "private",
    "prv",
    "router",
    "telus",
    "test",
    "totolink",
    "wlan_ap",
    "workgroup",
    "zghjccbob3n0"
  ]);
  class DNSPrefilter {
    constructor() {
      this.log = log.withTags("DnsPrefilter");
    }
    async close() {
    }
    async exec(ctx) {
      let r = emptyResponse();
      try {
        r.data = await this.filterOut(ctx.requestDecodedDnsPacket);
      } catch (e) {
        r = errResponse("dnsPrefilter", e);
        this.log.e(ctx.rxid, "main", e);
      }
      return r;
    }
    async filterOut(dnsPacket) {
      const block = rdnsBlockResponse("prefilter");
      const allow = rdnsNoBlockResponse();
      const domains2 = extractDomains(dnsPacket);
      for (const d2 of domains2) {
        const subdomains = d2.split(".");
        do {
          if (emptyArray(subdomains))
            break;
          if (undelegated.has(subdomains.join("."))) {
            return block;
          }
        } while (subdomains.shift() != null);
      }
      return allow;
    }
  }
  ;
  class DNSCacheResponder {
    constructor(blocklistWrapper, cache) {
      this.blocker = new DnsBlocker();
      this.log = log.withTags("DnsCacheResponder");
      this.cache = cache;
      this.bw = blocklistWrapper;
    }
    async exec(ctx) {
      let response = emptyResponse();
      if (!ctx.isDnsMsg) {
        this.log.d(ctx.rxid, "not a dns-msg, nowt to resolve");
        return response;
      }
      try {
        response.data = await this.resolveFromCache(
          ctx.rxid,
          ctx.requestDecodedDnsPacket,
          ctx.userBlocklistInfo
        );
      } catch (e) {
        this.log.e(ctx.rxid, "main", e.stack);
        response = errResponse("DnsCacheHandler", e);
      }
      return response;
    }
    async resolveFromCache(rxid, packet, blockInfo) {
      const noAnswer = rdnsNoBlockResponse();
      const blf = this.bw.getBlocklistFilter();
      const onlyLocal = this.bw.disabled() || isBlocklistFilterSetup(blf);
      const k = makeHttpCacheKey(packet);
      if (!k)
        return noAnswer;
      const cr = await this.cache.get(k, onlyLocal);
      this.log.d(rxid, onlyLocal, "cache k/m", k.href, cr && cr.metadata);
      if (emptyObj(cr))
        return noAnswer;
      const stamps = blockstampFromCache(cr);
      const res = dnsResponse(cr.dnsPacket, cr.dnsBuffer, stamps);
      this.makeCacheResponse(rxid, res, blockInfo);
      if (res.isBlocked)
        return res;
      if (!isAnswerFresh(cr.metadata)) {
        this.log.d(rxid, "cache ans not fresh");
        return noAnswer;
      }
      updatedAnswer(
        res.dnsPacket,
        packet.id,
        cr.metadata.expiry
      );
      const reencoded = dnsutil_encode(res.dnsPacket);
      return dnsResponse(res.dnsPacket, reencoded, res.stamps);
    }
    makeCacheResponse(rxid, r, blockInfo) {
      this.blocker.blockQuestion(rxid, r, blockInfo);
      this.log.d(rxid, blockInfo, "question blocked?", r.isBlocked);
      if (r.isBlocked) {
        return r;
      }
      if (!hasAnswers(r.dnsPacket)) {
        return r;
      }
      this.blocker.blockAnswer(rxid, r, blockInfo);
      this.log.d(rxid, "answer block?", r.isBlocked);
      return r;
    }
  }
  ;
  class CacheApi {
    constructor() {
      this.noop = !hasHttpCache();
      if (this.noop) {
        log.w("no-op http-cache-api");
      }
    }
    async get(href) {
      if (this.noop)
        return false;
      if (!href)
        return false;
      return await caches.default.match(href);
    }
    put(href, response) {
      if (this.noop)
        return false;
      if (!href || !response)
        return false;
      return caches.default.put(href, response);
    }
  }
  ;
  class DnsCache {
    constructor(size2) {
      this.log = log.withTags("DnsCache");
      this.disabled = disableDnsCache();
      if (this.disabled) {
        this.log.w("DnsCache disabled");
        return;
      }
      this.localcache = new LfuCache("DnsCache", size2);
      this.httpcache = new CacheApi();
    }
    async get(url, localOnly = false) {
      if (this.disabled)
        return null;
      if (!url && emptyString(url.href)) {
        this.log.d("get: empty url", url);
        return null;
      }
      let data = this.fromLocalCache(url.href);
      if (data) {
        return data;
      }
      if (localOnly)
        return null;
      data = await this.fromHttpCache(url);
      if (data) {
        this.putLocalCache(url.href, data);
      }
      return data;
    }
    async put(url, data, dispatcher) {
      if (this.disabled)
        return;
      if (!url || emptyString(url.href) || emptyObj(data) || emptyObj(data.metadata) || emptyObj(data.dnsPacket) || emptyBuf(data.dnsBuffer)) {
        this.log.w("put: empty url/data", url, data);
        return;
      }
      try {
        this.log.d("put: data in cache", data.metadata);
        const c = this.fromLocalCache(url.href);
        const hasAns = !emptyObj(c) && isAnswer(c.dnsPacket);
        const incomingHasAns = isAnswer(data.dnsPacket);
        if (hasAns && !incomingHasAns) {
          this.log.w("put ignored: cache has answer, incoming does not");
          return;
        }
        this.putLocalCache(url.href, data);
        dispatcher(this.putHttpCache(url, data));
      } catch (e) {
        this.log.e("put", url.href, data, e.stack);
      }
    }
    putLocalCache(href, data) {
      const k = href.slice(href.lastIndexOf("/"));
      const v = makeLocalCacheValue(data);
      if (!k || !v)
        return;
      this.localcache.put(k, v);
    }
    fromLocalCache(href) {
      const key = href.slice(href.lastIndexOf("/"));
      if (!key)
        return false;
      const res = this.localcache.get(key);
      if (emptyObj(res))
        return null;
      const b = res.dnsBuffer;
      const p = dnsutil_decode(b);
      const m = res.metadata;
      const cr = makeCacheValue(p, b, m);
      return isValueValid(cr) ? cr : null;
    }
    async putHttpCache(url, data) {
      const k = url.href;
      const v = makeHttpCacheValue(data);
      if (!k || !v)
        return;
      return this.httpcache.put(k, v);
    }
    async fromHttpCache(url) {
      const k = url.href;
      const response = await this.httpcache.get(k);
      if (!response || !response.ok)
        return null;
      const metadata = extractMetadata(response);
      this.log.d("http-cache response metadata", metadata);
      const b = await response.arrayBuffer();
      const p = dnsutil_decode(b);
      const m = metadata;
      const cr = makeCacheValue(p, b, m);
      return isValueValid(cr) ? cr : null;
    }
  }
  ;
  ;
  class CommandControl {
    constructor(blocklistWrapper, resolver, logPusher) {
      this.latestTimestamp = bareTimestampFrom(timestamp());
      this.log = log.withTags("CommandControl");
      this.bw = blocklistWrapper;
      this.resolver = resolver;
      this.lp = logPusher;
      this.cmds = /* @__PURE__ */ new Set([
        "configure",
        "config",
        "search",
        "dntolist",
        "dntouint",
        "listtob64",
        "b64tolist",
        "genaccesskey",
        "analytics",
        "logs"
      ]);
    }
    async exec(ctx) {
      if (isGetRequest(ctx.request)) {
        return await this.commandOperation(
          ctx.rxid,
          ctx.request,
          ctx.isDnsMsg,
          ctx.userAuth,
          ctx.lid
        );
      }
      return emptyResponse();
    }
    isAnyCmd(s) {
      return this.cmds.has(s);
    }
    userCommands(url) {
      const p = url.pathname.split("/").filter((s) => !emptyString(s));
      if (!p || p.length <= 0)
        return [];
      return p;
    }
    userFlag(url, isDnsCmd = false) {
      if (isDnsCmd)
        return "";
      return blockstampFromUrl(url);
    }
    async commandOperation(rxid, req, isDnsCmd, auth2, lid) {
      const url = req.url;
      let response = emptyResponse();
      try {
        const reqUrl = new URL(url);
        const queryString = reqUrl.searchParams;
        if (isDnsCmd) {
          this.log.d(rxid, "cc no-op: dns-msg not cc-msg");
          response.data.stopProcessing = false;
          return response;
        } else {
          response.data.stopProcessing = true;
        }
        const cmds = this.userCommands(reqUrl, isDnsCmd);
        const b64UserFlag = this.userFlag(url, isDnsCmd);
        let command = cmds[0];
        for (const c of cmds) {
          if (this.isAnyCmd(c)) {
            command = c;
            break;
          }
        }
        this.log.d(rxid, url, "processing... cmd/flag", command, b64UserFlag);
        await this.resolver.lazyInit();
        await this.bw.init(rxid, true);
        const blf = this.bw.getBlocklistFilter();
        const isBlfSetup = isBlocklistFilterSetup(blf);
        if (!isBlfSetup)
          throw new Error("no blocklist-filter");
        if (command === "listtob64") {
          response.data.httpResponse = listToB64(queryString);
        } else if (command === "b64tolist") {
          response.data.httpResponse = b64ToList(queryString, blf);
        } else if (command === "dntolist") {
          response.data.httpResponse = await domainNameToList(
            rxid,
            this.resolver,
            req,
            queryString,
            blf,
            this.latestTimestamp
          );
        } else if (command === "dntouint") {
          response.data.httpResponse = domainNameToUint(
            this.resolver,
            queryString,
            blf
          );
        } else if (command === "search") {
          response.data.httpResponse = searchRedirect(b64UserFlag);
        } else if (command === "genaccesskey") {
          response.data.httpResponse = await generateAccessKey(
            queryString,
            reqUrl.hostname
          );
        } else if (command === "analytics") {
          response.data.httpResponse = await analytics(
            this.lp,
            reqUrl,
            auth2,
            lid
          );
        } else if (command === "logs") {
          response.data.httpResponse = await logs(this.lp, reqUrl, auth2, lid);
        } else if (command === "config" || command === "configure" || !isDnsCmd) {
          response.data.httpResponse = configRedirect(
            b64UserFlag,
            reqUrl.origin,
            this.latestTimestamp,
            !isDnsCmd
          );
        } else {
          this.log.w(rxid, "unknown command-control query");
          response.data.httpResponse = respond400();
        }
      } catch (e) {
        this.log.e(rxid, "err cc:op", e.stack);
        response = errResponse("cc:op", e);
        response.data.httpResponse = jsonResponse(e.stack);
      }
      return response;
    }
  }
  function isRethinkDns(hostname) {
    return hostname.indexOf("rethinkdns") >= 0;
  }
  function searchRedirect(b64userflag) {
    const u = "https://rethinkdns.com/search";
    const q = "?s=" + b64userflag;
    return Response.redirect(u + q, 302);
  }
  function configRedirect(userFlag, origin, timestamp2, highlight) {
    const u = "https://rethinkdns.com/configure";
    let q = "?tstamp=" + timestamp2;
    q += !isRethinkDns(origin) ? "&v=ext&u=" + origin : "";
    q += highlight ? "&s=added" : "";
    q += userFlag ? "#" + userFlag : "";
    return Response.redirect(u + q, 302);
  }
  async function generateAccessKey(queryString, hostname) {
    const msg = queryString.get("key");
    const dom = queryString.get("dom");
    if (!emptyString(dom)) {
      hostname = dom;
    }
    const toks = [];
    for (const d2 of domains(hostname)) {
      if (emptyString(d2))
        continue;
      const [_, hexcat] = await gen(msg, d2);
      toks.push(hexcat);
    }
    return jsonResponse({ accesskey: toks, context: info });
  }
  async function logs(lp, reqUrl, auth2, lid) {
    if (emptyString(lid) || auth2.no) {
      return respond401();
    }
    const p = reqUrl.searchParams;
    const s = p.get("start");
    const e = p.get("end");
    const b = await lp.remotelogs(lid, s, e);
    return plainResponse(b);
  }
  async function analytics(lp, reqUrl, auth2, lid) {
    if (emptyString(lid) || auth2.no) {
      return respond401();
    }
    const p = reqUrl.searchParams;
    const t2 = p.get("t");
    const f = p.getAll("f");
    const d2 = p.get("d");
    const l = p.get("l");
    const r = await lp.count1(lid, f, t2, d2, l);
    return plainResponse(r.body);
  }
  async function domainNameToList(rxid, resolver, req, queryString, blocklistFilter, latestTimestamp) {
    const domainName = queryString.get("dn") || "";
    const r = {
      domainName,
      version: latestTimestamp,
      list: {}
    };
    const qid = 0;
    const qs = [
      {
        type: "A",
        name: domainName
      }
    ];
    const forcedoh = true;
    const query = mkQ(qid, qs);
    const querypacket = dnsutil_decode(query);
    const rmax = resolver.determineDohResolvers(resolver.ofMax(), forcedoh);
    const res = await resolver.resolveDnsUpstream(
      rxid,
      req,
      rmax,
      query,
      querypacket
    );
    const ans = await res.arrayBuffer();
    const anspacket = dnsutil_decode(ans);
    const ansdomains = extractDomains(anspacket);
    for (const d2 of ansdomains) {
      const searchResult = blocklistFilter.lookup(d2);
      if (!searchResult)
        continue;
      for (const entry of searchResult) {
        const list = flagsToTags(entry[1]);
        const listDetail = blocklistFilter.extract(list);
        r.list[entry[0]] = listDetail;
      }
    }
    return jsonResponse(r);
  }
  function domainNameToUint(queryString, blocklistFilter) {
    const domainName = queryString.get("dn") || "";
    const r = {
      domainName,
      list: {}
    };
    const searchResult = blocklistFilter.lookup(domainName);
    if (!searchResult) {
      return jsonResponse(r);
    }
    for (const entry of searchResult) {
      r.list[entry[0]] = entry[1];
    }
    return jsonResponse(r);
  }
  function listToB64(queryString) {
    const list = queryString.get("list") || [];
    const flagVersion = queryString.get("flagversion") || "0";
    const tags = list.split(",");
    const stamp = getB64Flag(tagsToFlags(tags), flagVersion);
    const r = {
      command: "List To B64String",
      inputList: list,
      flagVersion,
      b64String: stamp
    };
    return jsonResponse(r);
  }
  function b64ToList(queryString, blocklistFilter) {
    const b64 = queryString.get("b64") || "";
    const r = {
      command: "Base64 To List",
      inputB64: b64,
      list: [],
      listDetail: {}
    };
    const stamp = unstamp(b64);
    if (!hasBlockstamp(stamp)) {
      return jsonResponse(r);
    }
    r.list = flagsToTags(stamp.userBlocklistFlagUint);
    r.listDetail = blocklistFilter.extract(r.list);
    return jsonResponse(r);
  }
  function jsonResponse(obj) {
    return new Response(JSON.stringify(obj), { headers: jsonHeaders() });
  }
  function plainResponse(body) {
    return new Response(body, { headers: corsHeaders() });
  }
  ;
  class UserCache {
    constructor(size2) {
      const name = "UserCache";
      this.cache = new LfuCache(name, size2);
      this.log = log.withTags(name);
    }
    get(key) {
      return this.cache.get(key);
    }
    put(key, val) {
      try {
        this.cache.put(key, val);
      } catch (e) {
        this.log.e("put", key, val, e.stack);
      }
    }
  }
  ;
  const user_op_cacheSize = 2e4;
  class UserOp {
    constructor() {
      this.userConfigCache = new UserCache(user_op_cacheSize);
      this.log = log.withTags("UserOp");
    }
    async exec(ctx) {
      let res = emptyResponse();
      try {
        const out2 = await auth(ctx.rxid, ctx.request.url);
        if (!out2.ok) {
          res = errResponse("UserOp:Auth", new Error("auth failed"));
        } else {
          res = this.loadUser(ctx);
        }
        res.data.userAuth = out2;
      } catch (ex) {
        res = errResponse("UserOp", ex);
      }
      return res;
    }
    loadUser(ctx) {
      let response = emptyResponse();
      if (!ctx.isDnsMsg) {
        this.log.w(ctx.rxid, "not a dns-msg, ignore");
        return response;
      }
      try {
        const blocklistFlag = blockstampFromUrl(ctx.request.url);
        if (emptyString(blocklistFlag)) {
          this.log.d(ctx.rxid, "empty blocklist-flag", ctx.request.url);
        }
        let r = this.userConfigCache.get(blocklistFlag);
        if (!emptyString(blocklistFlag) && emptyObj(r)) {
          r = unstamp(blocklistFlag);
          if (!emptyBuf(r.userBlocklistFlagUint)) {
            this.log.d(ctx.rxid, "new cfg cache kv", blocklistFlag, r);
            this.userConfigCache.put(blocklistFlag, r);
          }
        } else {
          this.log.d(ctx.rxid, "cfg cache hit?", r != null, blocklistFlag, r);
        }
        response.data.userBlocklistInfo = r;
        response.data.userBlocklistFlag = blocklistFlag;
        response.data.dnsResolverUrl = null;
      } catch (e) {
        this.log.e(ctx.rxid, "loadUser", e);
        response = errResponse("UserOp:loadUser", e);
      }
      return response;
    }
  }
  ;
  let readytime = 0;
  let endtimer = null;
  const services = {
    ready: false,
    blocklistWrapper: null,
    userOp: null,
    prefilter: null,
    commandControl: null,
    dnsCacheHandler: null,
    dnsResolver: null,
    logPusher: null
  };
  ((main) => {
    when("ready").then(systemReady);
    when("stop").then(systemStop);
  })();
  async function systemReady() {
    if (services.ready)
      return;
    log.i("svc", "systemReady");
    const bw = new BlocklistWrapper();
    const cache = new DnsCache(cacheSize());
    const lp = new LogPusher();
    services.blocklistWrapper = bw;
    services.logPusher = lp;
    services.userOp = new UserOp();
    services.prefilter = new DNSPrefilter();
    services.dnsCacheHandler = new DNSCacheResponder(bw, cache);
    services.dnsResolver = new DNSResolver(bw, cache);
    services.commandControl = new CommandControl(bw, services.dnsResolver, lp);
    services.ready = true;
    readytime = Date.now();
    pub("steady");
  }
  async function systemStop() {
    log.d("svc stop, signal close resolver");
    if (services.ready)
      await services.dnsResolver.close();
  }
  function stopProc() {
    log.i("stopping proc, times-up");
    system.pub("stop");
  }
  function uptime() {
    return Date.now() - readytime;
  }
  function stopAfter(ms = 0) {
    if (ms < 0) {
      log.w("invalid stopAfter", ms);
      return;
    } else {
      log.d("stopAfter", ms);
    }
    if (!util.emptyObj(endtimer))
      clearTimeout(endtimer);
    endtimer = util.timeout(ms, stopProc);
  }
  ;
  ((main) => {
    when("prepare").then(prep);
    when("steady").then(up);
  })();
  function prep(arg) {
    if (!arg)
      throw new Error("are we on workers?");
    if (!arg.env)
      throw new Error("workers cannot be setup with empty env");
    globalThis.wenv = arg.env;
    if (!globalThis.envManager) {
      globalThis.envManager = new EnvManager();
    }
    const isProd = wenv.WORKER_ENV === "production";
    if (!globalThis.log) {
      globalThis.log = new Log({
        level: envManager.get("LOG_LEVEL"),
        levelize: isProd,
        withTimestamps: false
      });
    }
    pub("ready", { env: arg.env });
  }
  function up() {
    if (!services.ready) {
      log.e("services not yet ready, and we've got a sig-up?!");
      return;
    }
    pub("go");
  }
  ;
  class IOState {
    constructor() {
      this.flag = "";
      this.decodedDnsPacket = this.emptyDecodedDnsPacket();
      this.httpResponse = void 0;
      this.isException = false;
      this.exceptionStack = void 0;
      this.exceptionFrom = "";
      this.isDnsBlock = false;
      this.alwaysGatewayAnswer = false;
      this.gwip4 = "";
      this.gwip6 = "";
      this.region = "";
      this.stopProcessing = false;
      this.log = log.withTags("IOState");
    }
    id(rxid, region2) {
      this.log.tag(rxid);
      this.region = region2;
    }
    input(packet) {
      this.decodedDnsPacket = packet;
    }
    gatewayAnswersOnly(ip4, ip6) {
      if (emptyString(ip4) || emptyString(ip6)) {
        this.alwaysGatewayAnswer = false;
        this.log.w("none of the gw ans can be empty:", ip4, ip6);
        return;
      }
      this.alwaysGatewayAnswer = true;
      this.gwip4 = ip4;
      this.gwip6 = ip6;
      this.log.d("gateway ips set to", ip4, ip6);
    }
    emptyDecodedDnsPacket() {
      return { id: null, questions: null };
    }
    initDecodedDnsPacketIfNeeded() {
      if (!this.decodedDnsPacket) {
        this.decodedDnsPacket = this.emptyDecodedDnsPacket();
      }
    }
    dnsExceptionResponse(res) {
      this.initDecodedDnsPacketIfNeeded();
      this.stopProcessing = true;
      this.isException = true;
      if (emptyObj(res)) {
        this.exceptionStack = "no-res";
        this.exceptionFrom = "no-res";
      } else {
        this.exceptionStack = res.exceptionStack || "no-stack";
        this.exceptionFrom = res.exceptionFrom || "no-origin";
      }
      const qid = this.decodedDnsPacket.id;
      const questions = this.decodedDnsPacket.questions;
      const servfail = dnsutil_servfail(qid, questions);
      const ex = {
        exceptionFrom: this.exceptionFrom,
        exceptionStack: this.exceptionStack
      };
      this.httpResponse = new Response(servfail, {
        headers: concatHeaders(
          this.headers(servfail),
          this.additionalHeader(JSON.stringify(ex))
        ),
        status: servfail ? 200 : 408
      });
    }
    hResponse(r) {
      if (emptyObj(r)) {
        this.log.w("no http-res to set, empty obj?", r);
        return;
      }
      this.httpResponse = r;
      this.stopProcessing = true;
    }
    dnsResponse(arrayBuffer, dnsPacket = null, blockflag = null) {
      if (emptyBuf(arrayBuffer)) {
        return;
      }
      this.stopProcessing = true;
      this.flag = blockflag || "";
      const isGwAns = this.assignGatewayResponseIfNeeded();
      if (isGwAns) {
        arrayBuffer = dnsutil_encode(this.decodedDnsPacket);
      } else {
        this.decodedDnsPacket = dnsPacket || dnsutil_decode(arrayBuffer);
      }
      this.httpResponse = new Response(arrayBuffer, {
        headers: this.headers(arrayBuffer)
      });
    }
    dnsBlockResponse(blockflag) {
      this.initDecodedDnsPacketIfNeeded();
      this.stopProcessing = true;
      this.isDnsBlock = true;
      this.flag = blockflag;
      try {
        this.assignBlockResponse();
        const b = dnsutil_encode(this.decodedDnsPacket);
        this.httpResponse = new Response(b, {
          headers: this.headers(b)
        });
      } catch (e) {
        this.log.e("dnsBlock", JSON.stringify(this.decodedDnsPacket), e.stack);
        this.isException = true;
        this.exceptionStack = e.stack;
        this.exceptionFrom = "IOState:dnsBlockResponse";
        this.httpResponse = new Response(null, {
          headers: concatHeaders(
            this.headers(),
            this.additionalHeader(JSON.stringify(this.exceptionStack))
          ),
          status: 503
        });
      }
    }
    dnsNxDomainResponse() {
      this.initDecodedDnsPacketIfNeeded();
      this.stopProcessing = true;
      this.isDnsBlock = true;
      try {
        this.assignNxDomainResponse();
        const b = dnsutil_encode(this.decodedDnsPacket);
        this.httpResponse = new Response(b, {
          headers: this.headers(b)
        });
      } catch (e) {
        this.log.e("nxdomain", JSON.stringify(this.decodedDnsPacket), e.stack);
        this.isException = true;
        this.exceptionStack = e.stack;
        this.exceptionFrom = "IOState:dnsNxDomainResponse";
        this.httpResponse = new Response(null, {
          headers: concatHeaders(
            this.headers(),
            this.additionalHeader(JSON.stringify(this.exceptionStack))
          ),
          status: 503
        });
      }
    }
    headers(b = null) {
      const xNileFlags = this.isDnsBlock ? { "x-nile-flags": this.flag } : null;
      const xNileFlagsOk = !xNileFlags ? { "x-nile-flags-dn": this.flag } : null;
      const xNileRegion = !emptyString(this.region) ? { "x-nile-region": this.region } : null;
      return concatHeaders(
        dnsHeaders(),
        contentLengthHeader(b),
        xNileRegion,
        xNileFlags,
        xNileFlagsOk
      );
    }
    additionalHeader(json) {
      if (!json)
        return null;
      return {
        "x-nile-add": json
      };
    }
    setCorsHeadersIfNeeded() {
      if (emptyObj(this.httpResponse) || !this.httpResponse.ok)
        return;
      for (const [k, v] of Object.entries(corsHeaders())) {
        this.httpResponse.headers.set(k, v);
      }
    }
    assignBlockResponse() {
      let done = this.initFlagsAndAnswers();
      done = done && this.addData();
      done = done && this.wipeAuthorities();
      if (!done)
        throw new Error("fail assign block-response");
    }
    assignGatewayResponseIfNeeded() {
      let done = false;
      if (!this.alwaysGatewayAnswer)
        return done;
      done = this.initFlagsAndAnswers(60);
      done = done && this.addData(this.gwip4, this.gwip6);
      done = done && this.wipeAuthorities();
      return done;
    }
    assignNxDomainResponse() {
      if (emptyObj(this.decodedDnsPacket.questions)) {
        this.log.e("decoded dns-packet missing question");
        return false;
      }
      this.decodedDnsPacket.type = "response";
      this.decodedDnsPacket.rcode = "NXDOMAIN";
      this.decodedDnsPacket.flags = 387;
      this.decodedDnsPacket.flag_qr = true;
      this.decodedDnsPacket.answers = [];
      this.decodedDnsPacket.authorities = [
        {
          name: ".",
          type: "SOA",
          ttl: 86400,
          class: "IN",
          flush: false,
          data: {
            mname: "a.root-servers.net",
            rname: "nstld.verisign-grs.com",
            serial: 2022111001,
            refresh: 1800,
            retry: 900,
            expire: 604800,
            minimum: 86400
          }
        }
      ];
    }
    initFlagsAndAnswers(ttlsec = 300) {
      if (emptyObj(this.decodedDnsPacket.questions)) {
        this.log.e("decoded dns-packet missing question");
        return false;
      }
      this.decodedDnsPacket.type = "response";
      this.decodedDnsPacket.rcode = "NOERROR";
      this.decodedDnsPacket.flags = 384;
      this.decodedDnsPacket.flag_qr = true;
      this.decodedDnsPacket.answers = [];
      this.decodedDnsPacket.answers[0] = {};
      this.decodedDnsPacket.answers[0].name = this.decodedDnsPacket.questions[0].name;
      this.decodedDnsPacket.answers[0].type = this.decodedDnsPacket.questions[0].type;
      this.decodedDnsPacket.answers[0].ttl = ttlsec;
      this.decodedDnsPacket.answers[0].class = "IN";
      this.decodedDnsPacket.answers[0].flush = false;
      return true;
    }
    addData(ip4 = "0.0.0.0", ip6 = "::") {
      if (emptyString(ip4) && emptyString(ip6)) {
        this.log.w("either ip4/ip6 to assign ans data", ip4, ip6);
        return false;
      }
      if (this.decodedDnsPacket.questions[0].type === "A") {
        this.decodedDnsPacket.answers[0].data = ip4;
      } else if (this.decodedDnsPacket.questions[0].type === "AAAA") {
        this.decodedDnsPacket.answers[0].data = ip6;
      } else if (this.decodedDnsPacket.questions[0].type === "HTTPS" || this.decodedDnsPacket.questions[0].type === "SVCB") {
        this.decodedDnsPacket.answers[0].data = {};
        this.decodedDnsPacket.answers[0].data.svcPriority = 0;
        this.decodedDnsPacket.answers[0].data.targetName = ".";
        this.decodedDnsPacket.answers[0].data.svcParams = {};
        this.decodedDnsPacket.answers[1] = {};
        this.decodedDnsPacket.answers[1].name = this.decodedDnsPacket.questions[0].name;
        this.decodedDnsPacket.answers[1].type = "A";
        this.decodedDnsPacket.answers[1].data = ip4;
      } else {
        this.log.i("bypass gw override: not a/aaaa/https/svcb question");
        return false;
      }
      return true;
    }
    wipeAuthorities() {
      this.decodedDnsPacket.authorities = [];
      return true;
    }
  }
  ;
  class RethinkPlugin {
    constructor(event) {
      if (!services.ready)
        throw new Error("services not ready");
      this.ctx = /* @__PURE__ */ new Map();
      const rxid = rxidFromHeader(event.request.headers) || xid();
      this.addCtx("rxid", "[rx." + rxid + "]");
      this.addCtx("lid", extractLid(event.request.url));
      this.addCtx("region", getRegion(event.request) || "");
      this.addCtx("request", event.request);
      this.addCtx("dispatcher", event.waitUntil.bind(event));
      this.log = log.withTags("RethinkPlugin");
      this.plugin = [];
      this.registerPlugin(
        "userOp",
        services.userOp,
        ["rxid", "request", "isDnsMsg"],
        this.userOpCallback
      );
      recursive() && this.registerPlugin(
        "prefilter",
        services.prefilter,
        ["rxid", "requestDecodedDnsPacket"],
        this.prefilterCallback
      );
      this.registerPlugin(
        "cacheOnlyResolver",
        services.dnsCacheHandler,
        ["rxid", "userBlocklistInfo", "requestDecodedDnsPacket", "isDnsMsg"],
        this.dnsCacheCallback
      );
      this.registerPlugin(
        "commandControl",
        services.commandControl,
        ["rxid", "userAuth", "lid", "request", "isDnsMsg"],
        this.commandControlCallback
      );
      this.registerPlugin(
        "dnsResolver",
        services.dnsResolver,
        [
          "rxid",
          "dispatcher",
          "request",
          "userDnsResolverUrl",
          "userBlocklistInfo",
          "userBlockstamp",
          "domainBlockstamp",
          "requestDecodedDnsPacket",
          "requestBodyBuffer"
        ],
        this.dnsResolverCallback
      );
      this.registerPlugin(
        "logpush",
        services.logPusher,
        [
          "rxid",
          "lid",
          "isDnsMsg",
          "dispatcher",
          "request",
          "userDnsResolverUrl",
          "requestDecodedDnsPacket",
          "responseDecodedDnsPacket",
          "blockflag",
          "region"
        ],
        stubAsync,
        true,
        true
      );
    }
    addCtx(k, v) {
      this.ctx.set(k, v);
    }
    registerPlugin(name, mod, pctx, cb, alwaysexec = false, bail = false) {
      this.plugin.push(new RPlugin(name, mod, pctx, cb, alwaysexec, bail));
    }
    async execute() {
      const io = this.io;
      const rxid = this.ctx.get("rxid");
      const t2 = this.log.startTime("exec-plugin-" + rxid);
      for (const p of this.plugin) {
        if (io.stopProcessing && !p.continueOnStopProcess) {
          continue;
        }
        if (io.isException && p.bailOnException) {
          continue;
        }
        this.log.lapTime(t2, rxid, p.name, "send-io");
        const res = await p.module.exec(makectx(this.ctx, p.pctx));
        this.log.lapTime(t2, rxid, p.name, "got-res");
        if (typeof p.callback === "function") {
          await p.callback.call(this, res, io);
        }
        this.log.lapTime(t2, rxid, p.name, "post-callback");
      }
      this.log.endTime(t2);
    }
    async commandControlCallback(response, io) {
      const rxid = this.ctx.get("rxid");
      const r = response.data;
      this.log.d(rxid, "command-control response");
      if (!emptyObj(r) && r.stopProcessing) {
        this.log.d(rxid, "command-control reply", r);
        io.hResponse(r.httpResponse);
      }
    }
    async userOpCallback(response, io) {
      const rxid = this.ctx.get("rxid");
      const r = response.data;
      this.log.d(rxid, "user-op response");
      if (response.isException) {
        this.log.w(rxid, "unexpected err userOp", r);
        this.loadException(rxid, response, io);
      } else if (!emptyObj(r)) {
        const a = r.userAuth;
        const bi = r.userBlocklistInfo;
        const rr = r.dnsResolverUrl;
        const bs = r.userBlocklistFlag;
        this.log.d(rxid, "set user:auth/blockInfo/resolver/stamp", a, bi, rr, bs);
        this.addCtx("userAuth", a);
        this.addCtx("userBlocklistInfo", bi);
        this.addCtx("userBlockstamp", bs);
        this.addCtx("userDnsResolverUrl", rr);
      } else {
        this.log.i(rxid, "user-op is a no-op, possibly a command-control req");
      }
    }
    prefilterCallback(response, io) {
      const rxid = this.ctx.get("rxid");
      const r = response.data;
      const deny = r.isBlocked;
      const err = response.isException;
      this.log.d(rxid, "prefilter deny?", deny, "err?", err);
      if (err) {
        this.log.w(rxid, "prefilter: error", r);
        this.loadException(rxid, response, io);
      } else if (deny) {
        io.dnsNxDomainResponse(r.flag);
      } else {
        this.log.d(rxid, "prefilter no-op");
      }
    }
    dnsCacheCallback(response, io) {
      const rxid = this.ctx.get("rxid");
      const r = response.data;
      const deny = r.isBlocked;
      const isAns = isAnswer(r.dnsPacket);
      const noErr = rcodeNoError(r.dnsPacket);
      this.log.d(rxid, "crr: block?", deny, "ans?", isAns, "noerr", noErr);
      if (response.isException) {
        this.loadException(rxid, response, io);
      } else if (deny) {
        this.addCtx("blockflag", r.flag);
        io.dnsBlockResponse(r.flag);
      } else if (isAns) {
        this.addCtx("responseBodyBuffer", r.dnsBuffer);
        this.addCtx("responseDecodedDnsPacket", r.dnsPacket);
        this.addCtx("blockflag", r.flag);
        io.dnsResponse(r.dnsBuffer, r.dnsPacket, r.flag);
      } else {
        this.addCtx("domainBlockstamp", r.stamps);
        this.log.d(rxid, "resolve query; no response from cache-handler");
      }
    }
    dnsResolverCallback(response, io) {
      const rxid = this.ctx.get("rxid");
      const r = response.data;
      const deny = r.isBlocked;
      const isAns = isAnswer(r.dnsPacket);
      const noErr = rcodeNoError(r.dnsPacket);
      this.log.d(rxid, "rr: block?", deny, "ans?", isAns, "noerr?", noErr);
      if (deny) {
        this.addCtx("blockflag", r.flag);
        io.dnsBlockResponse(r.flag);
      } else if (response.isException || !isAns) {
        this.loadException(rxid, response, io);
      } else {
        this.addCtx("responseBodyBuffer", r.dnsBuffer);
        this.addCtx("responseDecodedDnsPacket", r.dnsPacket);
        this.addCtx("blockflag", r.flag);
        io.dnsResponse(r.dnsBuffer, r.dnsPacket, r.flag);
      }
    }
    loadException(rxid, response, io) {
      this.log.e(rxid, "exception", JSON.stringify(response));
      io.dnsExceptionResponse(response);
    }
    async initIoState(io) {
      this.io = io;
      const request = this.ctx.get("request");
      const rxid = this.ctx.get("rxid");
      const region2 = this.ctx.get("region");
      const isDnsMsg = util_isDnsMsg(request);
      const isGwReq = isGatewayRequest(request);
      let question2 = null;
      io.id(rxid, region2);
      this.addCtx("isDnsMsg", isDnsMsg);
      if (!isDnsMsg) {
        if (!isGetRequest(request)) {
          this.log.i(rxid, "not a dns-msg, not a GET req either", request);
          io.hResponse(respond405());
          return;
        }
      }
      question2 = await extractDnsQuestion(request);
      if (emptyBuf(question2))
        return;
      if (isGwReq)
        io.gatewayAnswersOnly(gwip4(), gwip6());
      try {
        const [qpacket, ecsdropped] = dropECS(dnsutil_decode(question2));
        if (ecsdropped) {
          question2 = dnsutil_encode(qpacket);
        }
        io.input(qpacket);
        this.addCtx("isDnsMsg", true);
        this.log.d(rxid, "cur-ques", JSON.stringify(qpacket.questions));
        this.addCtx("requestDecodedDnsPacket", qpacket);
        this.addCtx("requestBodyBuffer", question2);
      } catch (e) {
        this.log.d(rxid, "cannot decode dns query; may be cc GET req?");
        return;
      }
    }
  }
  function makectx(context, ctxkeys) {
    const out2 = {};
    for (const key of ctxkeys) {
      out2[key] = context.get(key) || null;
    }
    return out2;
  }
  function extractLid(url) {
    let lid = fromPath(url, logPrefix);
    if (emptyString(lid) && logpushHostnameAsLogid()) {
      lid = tld(url, 0, "_");
    }
    return lid || "";
  }
  async function extractDnsQuestion(request) {
    if (isPostRequest(request)) {
      return await request.arrayBuffer();
    } else {
      const queryString = new URL(request.url).searchParams;
      const dnsQuery = queryString.get("dns");
      return base64ToBytes(dnsQuery);
    }
  }
  function getRegion(request) {
    if (onCloudflare()) {
      return regionFromCf(request);
    } else if (onFly()) {
      return region();
    } else if (onFastly()) {
    }
    return "";
  }
  class RPlugin {
    constructor(name, mod, pctx, cb, alwaysexec, bail) {
      this.name = name;
      this.module = mod;
      this.pctx = pctx;
      this.callback = cb;
      this.continueOnStopProcess = alwaysexec;
      this.bailOnException = bail;
    }
  }
  ;
  function handleRequest(event) {
    return proxyRequest(event);
  }
  async function proxyRequest(event) {
    if (optionsRequest(event.request))
      return respond204();
    const io = new IOState();
    const ua = event.request.headers.get("User-Agent");
    try {
      const plugin = new RethinkPlugin(event);
      await plugin.initIoState(io);
      if (io.httpResponse) {
        return withCors(io, ua);
      }
      await timedSafeAsyncOp(
        async () => plugin.execute(),
        requestTimeout(),
        async () => errorResponse(io)
      );
    } catch (err) {
      log.e("doh", "proxy-request error", err.stack);
      errorResponse(io, err);
    }
    return withCors(io, ua);
  }
  function optionsRequest(request) {
    return request.method === "OPTIONS";
  }
  function errorResponse(io, err = null) {
    const eres = errResponse("doh.js", err);
    io.dnsExceptionResponse(eres);
  }
  function withCors(io, ua) {
    if (fromBrowser(ua))
      io.setCorsHeadersIfNeeded();
    return io.httpResponse;
  }
  ;
  var server_workers_console = __webpack_require__(108);
  const server_workers = {
    async fetch(request, env, context) {
      return await serveDoh(request, env, context);
    }
  };
  function serveDoh(request, env, ctx) {
    pub("prepare", { env });
    const event = mkFetchEvent(
      request,
      null,
      ctx.waitUntil.bind(ctx),
      ctx.passThroughOnException.bind(ctx)
    );
    return new Promise((accept) => {
      when("go").then((v) => {
        return handleRequest(event);
      }).then((response) => {
        accept(response);
      }).catch((e) => {
        server_workers_console.error("server", "serveDoh err", e);
        accept(respond405());
      });
    });
  }
})();
var __webpack_exports__default = __webpack_exports__.Z;
export {
  __webpack_exports__default as default
};
//# sourceMappingURL=worker.js.map
