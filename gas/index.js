'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var freeGlobal = (typeof global === "undefined" ? "undefined" : _typeof(global)) == 'object' && global && global.Object === Object && global;
var freeSelf = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self && self.Object === Object && self;
var root = freeGlobal || freeSelf || Function('return this')();
var _Symbol = root.Symbol;
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
var nativeObjectToString = objectProto.toString;
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);

  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }

  return result;
}

var objectProto$1 = Object.prototype;
var nativeObjectToString$1 = objectProto$1.toString;

function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }

  return symToStringTag$1 && symToStringTag$1 in Object(value) ? getRawTag(value) : objectToString(value);
}

function isObjectLike(value) {
  return value != null && _typeof(value) == 'object';
}

var symbolTag = '[object Symbol]';

function isSymbol(value) {
  return _typeof(value) == 'symbol' || isObjectLike(value) && baseGetTag(value) == symbolTag;
}

var NAN = 0 / 0;

function baseToNumber(value) {
  if (typeof value == 'number') {
    return value;
  }

  if (isSymbol(value)) {
    return NAN;
  }

  return +value;
}

function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }

  return result;
}

var isArray = Array.isArray;
var INFINITY = 1 / 0;
var symbolProto = _Symbol ? _Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

function baseToString(value) {
  if (typeof value == 'string') {
    return value;
  }

  if (isArray(value)) {
    return arrayMap(value, baseToString) + '';
  }

  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }

  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}

function createMathOperation(operator, defaultValue) {
  return function (value, other) {
    var result;

    if (value === undefined && other === undefined) {
      return defaultValue;
    }

    if (value !== undefined) {
      result = value;
    }

    if (other !== undefined) {
      if (result === undefined) {
        return other;
      }

      if (typeof value == 'string' || typeof other == 'string') {
        value = baseToString(value);
        other = baseToString(other);
      } else {
        value = baseToNumber(value);
        other = baseToNumber(other);
      }

      result = operator(value, other);
    }

    return result;
  };
}

var add = createMathOperation(function (augend, addend) {
  return augend + addend;
}, 0);

function isObject(value) {
  var type = _typeof(value);

  return value != null && (type == 'object' || type == 'function');
}

var NAN$1 = 0 / 0;
var reTrim = /^\s+|\s+$/g;
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary = /^0b[01]+$/i;
var reIsOctal = /^0o[0-7]+$/i;
var freeParseInt = parseInt;

function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }

  if (isSymbol(value)) {
    return NAN$1;
  }

  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? other + '' : other;
  }

  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }

  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN$1 : +value;
}

var INFINITY$1 = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;

function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }

  value = toNumber(value);

  if (value === INFINITY$1 || value === -INFINITY$1) {
    var sign = value < 0 ? -1 : 1;
    return sign * MAX_INTEGER;
  }

  return value === value ? value : 0;
}

function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;
  return result === result ? remainder ? result - remainder : result : 0;
}

var FUNC_ERROR_TEXT = 'Expected a function';

function after(n, func) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }

  n = toInteger(n);
  return function () {
    if (--n < 1) {
      return func.apply(this, arguments);
    }
  };
}

function identity(value) {
  return value;
}

var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }

  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

var coreJsData = root['__core-js_shared__'];

var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();

function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}

var funcProto = Function.prototype;
var funcToString = funcProto.toString;

function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}

    try {
      return func + '';
    } catch (e) {}
  }

  return '';
}

var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto$1 = Function.prototype,
    objectProto$2 = Object.prototype;
var funcToString$1 = funcProto$1.toString;
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;
var reIsNative = RegExp('^' + funcToString$1.call(hasOwnProperty$1).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }

  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

function getValue(object, key) {
  return object == null ? undefined : object[key];
}

function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

var WeakMap = getNative(root, 'WeakMap');
var metaMap = WeakMap && new WeakMap();
var baseSetData = !metaMap ? identity : function (func, data) {
  metaMap.set(func, data);
  return func;
};
var objectCreate = Object.create;

var baseCreate = function () {
  function object() {}

  return function (proto) {
    if (!isObject(proto)) {
      return {};
    }

    if (objectCreate) {
      return objectCreate(proto);
    }

    object.prototype = proto;
    var result = new object();
    object.prototype = undefined;
    return result;
  };
}();

function createCtor(Ctor) {
  return function () {
    var args = arguments;

    switch (args.length) {
      case 0:
        return new Ctor();

      case 1:
        return new Ctor(args[0]);

      case 2:
        return new Ctor(args[0], args[1]);

      case 3:
        return new Ctor(args[0], args[1], args[2]);

      case 4:
        return new Ctor(args[0], args[1], args[2], args[3]);

      case 5:
        return new Ctor(args[0], args[1], args[2], args[3], args[4]);

      case 6:
        return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);

      case 7:
        return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
    }

    var thisBinding = baseCreate(Ctor.prototype),
        result = Ctor.apply(thisBinding, args);
    return isObject(result) ? result : thisBinding;
  };
}

var WRAP_BIND_FLAG = 1;

function createBind(func, bitmask, thisArg) {
  var isBind = bitmask & WRAP_BIND_FLAG,
      Ctor = createCtor(func);

  function wrapper() {
    var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
    return fn.apply(isBind ? thisArg : this, arguments);
  }

  return wrapper;
}

function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);

    case 1:
      return func.call(thisArg, args[0]);

    case 2:
      return func.call(thisArg, args[0], args[1]);

    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }

  return func.apply(thisArg, args);
}

var nativeMax = Math.max;

function composeArgs(args, partials, holders, isCurried) {
  var argsIndex = -1,
      argsLength = args.length,
      holdersLength = holders.length,
      leftIndex = -1,
      leftLength = partials.length,
      rangeLength = nativeMax(argsLength - holdersLength, 0),
      result = Array(leftLength + rangeLength),
      isUncurried = !isCurried;

  while (++leftIndex < leftLength) {
    result[leftIndex] = partials[leftIndex];
  }

  while (++argsIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result[holders[argsIndex]] = args[argsIndex];
    }
  }

  while (rangeLength--) {
    result[leftIndex++] = args[argsIndex++];
  }

  return result;
}

var nativeMax$1 = Math.max;

function composeArgsRight(args, partials, holders, isCurried) {
  var argsIndex = -1,
      argsLength = args.length,
      holdersIndex = -1,
      holdersLength = holders.length,
      rightIndex = -1,
      rightLength = partials.length,
      rangeLength = nativeMax$1(argsLength - holdersLength, 0),
      result = Array(rangeLength + rightLength),
      isUncurried = !isCurried;

  while (++argsIndex < rangeLength) {
    result[argsIndex] = args[argsIndex];
  }

  var offset = argsIndex;

  while (++rightIndex < rightLength) {
    result[offset + rightIndex] = partials[rightIndex];
  }

  while (++holdersIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result[offset + holders[holdersIndex]] = args[argsIndex++];
    }
  }

  return result;
}

function countHolders(array, placeholder) {
  var length = array.length,
      result = 0;

  while (length--) {
    if (array[length] === placeholder) {
      ++result;
    }
  }

  return result;
}

function baseLodash() {}

var MAX_ARRAY_LENGTH = 4294967295;

function LazyWrapper(value) {
  this.__wrapped__ = value;
  this.__actions__ = [];
  this.__dir__ = 1;
  this.__filtered__ = false;
  this.__iteratees__ = [];
  this.__takeCount__ = MAX_ARRAY_LENGTH;
  this.__views__ = [];
}

LazyWrapper.prototype = baseCreate(baseLodash.prototype);
LazyWrapper.prototype.constructor = LazyWrapper;

function noop() {}

var getData = !metaMap ? noop : function (func) {
  return metaMap.get(func);
};
var realNames = {};
var objectProto$3 = Object.prototype;
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

function getFuncName(func) {
  var result = func.name + '',
      array = realNames[result],
      length = hasOwnProperty$2.call(realNames, result) ? array.length : 0;

  while (length--) {
    var data = array[length],
        otherFunc = data.func;

    if (otherFunc == null || otherFunc == func) {
      return data.name;
    }
  }

  return result;
}

function LodashWrapper(value, chainAll) {
  this.__wrapped__ = value;
  this.__actions__ = [];
  this.__chain__ = !!chainAll;
  this.__index__ = 0;
  this.__values__ = undefined;
}

LodashWrapper.prototype = baseCreate(baseLodash.prototype);
LodashWrapper.prototype.constructor = LodashWrapper;

function copyArray(source, array) {
  var index = -1,
      length = source.length;
  array || (array = Array(length));

  while (++index < length) {
    array[index] = source[index];
  }

  return array;
}

function wrapperClone(wrapper) {
  if (wrapper instanceof LazyWrapper) {
    return wrapper.clone();
  }

  var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
  result.__actions__ = copyArray(wrapper.__actions__);
  result.__index__ = wrapper.__index__;
  result.__values__ = wrapper.__values__;
  return result;
}

var objectProto$4 = Object.prototype;
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

function lodash(value) {
  if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
    if (value instanceof LodashWrapper) {
      return value;
    }

    if (hasOwnProperty$3.call(value, '__wrapped__')) {
      return wrapperClone(value);
    }
  }

  return new LodashWrapper(value);
}

lodash.prototype = baseLodash.prototype;
lodash.prototype.constructor = lodash;

function isLaziable(func) {
  var funcName = getFuncName(func),
      other = lodash[funcName];

  if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
    return false;
  }

  if (func === other) {
    return true;
  }

  var data = getData(other);
  return !!data && func === data[0];
}

var HOT_COUNT = 800,
    HOT_SPAN = 16;
var nativeNow = Date.now;

function shortOut(func) {
  var count = 0,
      lastCalled = 0;
  return function () {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;

    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }

    return func.apply(undefined, arguments);
  };
}

var setData = shortOut(baseSetData);
var reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
    reSplitDetails = /,? & /;

function getWrapDetails(source) {
  var match = source.match(reWrapDetails);
  return match ? match[1].split(reSplitDetails) : [];
}

var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/;

function insertWrapDetails(source, details) {
  var length = details.length;

  if (!length) {
    return source;
  }

  var lastIndex = length - 1;
  details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
  details = details.join(length > 2 ? ', ' : ' ');
  return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
}

function constant(value) {
  return function () {
    return value;
  };
}

var defineProperty = function () {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}();

var baseSetToString = !defineProperty ? identity : function (func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};
var setToString = shortOut(baseSetToString);

function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }

  return array;
}

function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while (fromRight ? index-- : ++index < length) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }

  return -1;
}

function baseIsNaN(value) {
  return value !== value;
}

function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }

  return -1;
}

function baseIndexOf(array, value, fromIndex) {
  return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
}

function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

var WRAP_BIND_FLAG$1 = 1,
    WRAP_BIND_KEY_FLAG = 2,
    WRAP_CURRY_FLAG = 8,
    WRAP_CURRY_RIGHT_FLAG = 16,
    WRAP_PARTIAL_FLAG = 32,
    WRAP_PARTIAL_RIGHT_FLAG = 64,
    WRAP_ARY_FLAG = 128,
    WRAP_REARG_FLAG = 256,
    WRAP_FLIP_FLAG = 512;
var wrapFlags = [['ary', WRAP_ARY_FLAG], ['bind', WRAP_BIND_FLAG$1], ['bindKey', WRAP_BIND_KEY_FLAG], ['curry', WRAP_CURRY_FLAG], ['curryRight', WRAP_CURRY_RIGHT_FLAG], ['flip', WRAP_FLIP_FLAG], ['partial', WRAP_PARTIAL_FLAG], ['partialRight', WRAP_PARTIAL_RIGHT_FLAG], ['rearg', WRAP_REARG_FLAG]];

function updateWrapDetails(details, bitmask) {
  arrayEach(wrapFlags, function (pair) {
    var value = '_.' + pair[0];

    if (bitmask & pair[1] && !arrayIncludes(details, value)) {
      details.push(value);
    }
  });
  return details.sort();
}

function setWrapToString(wrapper, reference, bitmask) {
  var source = reference + '';
  return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
}

var WRAP_BIND_FLAG$2 = 1,
    WRAP_BIND_KEY_FLAG$1 = 2,
    WRAP_CURRY_BOUND_FLAG = 4,
    WRAP_CURRY_FLAG$1 = 8,
    WRAP_PARTIAL_FLAG$1 = 32,
    WRAP_PARTIAL_RIGHT_FLAG$1 = 64;

function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
  var isCurry = bitmask & WRAP_CURRY_FLAG$1,
      newHolders = isCurry ? holders : undefined,
      newHoldersRight = isCurry ? undefined : holders,
      newPartials = isCurry ? partials : undefined,
      newPartialsRight = isCurry ? undefined : partials;
  bitmask |= isCurry ? WRAP_PARTIAL_FLAG$1 : WRAP_PARTIAL_RIGHT_FLAG$1;
  bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG$1 : WRAP_PARTIAL_FLAG$1);

  if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
    bitmask &= ~(WRAP_BIND_FLAG$2 | WRAP_BIND_KEY_FLAG$1);
  }

  var newData = [func, bitmask, thisArg, newPartials, newHolders, newPartialsRight, newHoldersRight, argPos, ary, arity];
  var result = wrapFunc.apply(undefined, newData);

  if (isLaziable(func)) {
    setData(result, newData);
  }

  result.placeholder = placeholder;
  return setWrapToString(result, func, bitmask);
}

function getHolder(func) {
  var object = func;
  return object.placeholder;
}

var MAX_SAFE_INTEGER = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;

function isIndex(value, length) {
  var type = _typeof(value);

  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (type == 'number' || type != 'symbol' && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}

var nativeMin = Math.min;

function reorder(array, indexes) {
  var arrLength = array.length,
      length = nativeMin(indexes.length, arrLength),
      oldArray = copyArray(array);

  while (length--) {
    var index = indexes[length];
    array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
  }

  return array;
}

var PLACEHOLDER = '__lodash_placeholder__';

function replaceHolders(array, placeholder) {
  var index = -1,
      length = array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];

    if (value === placeholder || value === PLACEHOLDER) {
      array[index] = PLACEHOLDER;
      result[resIndex++] = index;
    }
  }

  return result;
}

var WRAP_BIND_FLAG$3 = 1,
    WRAP_BIND_KEY_FLAG$2 = 2,
    WRAP_CURRY_FLAG$2 = 8,
    WRAP_CURRY_RIGHT_FLAG$1 = 16,
    WRAP_ARY_FLAG$1 = 128,
    WRAP_FLIP_FLAG$1 = 512;

function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
  var isAry = bitmask & WRAP_ARY_FLAG$1,
      isBind = bitmask & WRAP_BIND_FLAG$3,
      isBindKey = bitmask & WRAP_BIND_KEY_FLAG$2,
      isCurried = bitmask & (WRAP_CURRY_FLAG$2 | WRAP_CURRY_RIGHT_FLAG$1),
      isFlip = bitmask & WRAP_FLIP_FLAG$1,
      Ctor = isBindKey ? undefined : createCtor(func);

  function wrapper() {
    var length = arguments.length,
        args = Array(length),
        index = length;

    while (index--) {
      args[index] = arguments[index];
    }

    if (isCurried) {
      var placeholder = getHolder(wrapper),
          holdersCount = countHolders(args, placeholder);
    }

    if (partials) {
      args = composeArgs(args, partials, holders, isCurried);
    }

    if (partialsRight) {
      args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
    }

    length -= holdersCount;

    if (isCurried && length < arity) {
      var newHolders = replaceHolders(args, placeholder);
      return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, thisArg, args, newHolders, argPos, ary, arity - length);
    }

    var thisBinding = isBind ? thisArg : this,
        fn = isBindKey ? thisBinding[func] : func;
    length = args.length;

    if (argPos) {
      args = reorder(args, argPos);
    } else if (isFlip && length > 1) {
      args.reverse();
    }

    if (isAry && ary < length) {
      args.length = ary;
    }

    if (this && this !== root && this instanceof wrapper) {
      fn = Ctor || createCtor(fn);
    }

    return fn.apply(thisBinding, args);
  }

  return wrapper;
}

function createCurry(func, bitmask, arity) {
  var Ctor = createCtor(func);

  function wrapper() {
    var length = arguments.length,
        args = Array(length),
        index = length,
        placeholder = getHolder(wrapper);

    while (index--) {
      args[index] = arguments[index];
    }

    var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
    length -= holders.length;

    if (length < arity) {
      return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, undefined, args, holders, undefined, undefined, arity - length);
    }

    var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
    return apply(fn, this, args);
  }

  return wrapper;
}

var WRAP_BIND_FLAG$4 = 1;

function createPartial(func, bitmask, thisArg, partials) {
  var isBind = bitmask & WRAP_BIND_FLAG$4,
      Ctor = createCtor(func);

  function wrapper() {
    var argsIndex = -1,
        argsLength = arguments.length,
        leftIndex = -1,
        leftLength = partials.length,
        args = Array(leftLength + argsLength),
        fn = this && this !== root && this instanceof wrapper ? Ctor : func;

    while (++leftIndex < leftLength) {
      args[leftIndex] = partials[leftIndex];
    }

    while (argsLength--) {
      args[leftIndex++] = arguments[++argsIndex];
    }

    return apply(fn, isBind ? thisArg : this, args);
  }

  return wrapper;
}

var PLACEHOLDER$1 = '__lodash_placeholder__';
var WRAP_BIND_FLAG$5 = 1,
    WRAP_BIND_KEY_FLAG$3 = 2,
    WRAP_CURRY_BOUND_FLAG$1 = 4,
    WRAP_CURRY_FLAG$3 = 8,
    WRAP_ARY_FLAG$2 = 128,
    WRAP_REARG_FLAG$1 = 256;
var nativeMin$1 = Math.min;

function mergeData(data, source) {
  var bitmask = data[1],
      srcBitmask = source[1],
      newBitmask = bitmask | srcBitmask,
      isCommon = newBitmask < (WRAP_BIND_FLAG$5 | WRAP_BIND_KEY_FLAG$3 | WRAP_ARY_FLAG$2);
  var isCombo = srcBitmask == WRAP_ARY_FLAG$2 && bitmask == WRAP_CURRY_FLAG$3 || srcBitmask == WRAP_ARY_FLAG$2 && bitmask == WRAP_REARG_FLAG$1 && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG$2 | WRAP_REARG_FLAG$1) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG$3;

  if (!(isCommon || isCombo)) {
    return data;
  }

  if (srcBitmask & WRAP_BIND_FLAG$5) {
    data[2] = source[2];
    newBitmask |= bitmask & WRAP_BIND_FLAG$5 ? 0 : WRAP_CURRY_BOUND_FLAG$1;
  }

  var value = source[3];

  if (value) {
    var partials = data[3];
    data[3] = partials ? composeArgs(partials, value, source[4]) : value;
    data[4] = partials ? replaceHolders(data[3], PLACEHOLDER$1) : source[4];
  }

  value = source[5];

  if (value) {
    partials = data[5];
    data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
    data[6] = partials ? replaceHolders(data[5], PLACEHOLDER$1) : source[6];
  }

  value = source[7];

  if (value) {
    data[7] = value;
  }

  if (srcBitmask & WRAP_ARY_FLAG$2) {
    data[8] = data[8] == null ? source[8] : nativeMin$1(data[8], source[8]);
  }

  if (data[9] == null) {
    data[9] = source[9];
  }

  data[0] = source[0];
  data[1] = newBitmask;
  return data;
}

var FUNC_ERROR_TEXT$1 = 'Expected a function';
var WRAP_BIND_FLAG$6 = 1,
    WRAP_BIND_KEY_FLAG$4 = 2,
    WRAP_CURRY_FLAG$4 = 8,
    WRAP_CURRY_RIGHT_FLAG$2 = 16,
    WRAP_PARTIAL_FLAG$2 = 32,
    WRAP_PARTIAL_RIGHT_FLAG$2 = 64;
var nativeMax$2 = Math.max;

function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
  var isBindKey = bitmask & WRAP_BIND_KEY_FLAG$4;

  if (!isBindKey && typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }

  var length = partials ? partials.length : 0;

  if (!length) {
    bitmask &= ~(WRAP_PARTIAL_FLAG$2 | WRAP_PARTIAL_RIGHT_FLAG$2);
    partials = holders = undefined;
  }

  ary = ary === undefined ? ary : nativeMax$2(toInteger(ary), 0);
  arity = arity === undefined ? arity : toInteger(arity);
  length -= holders ? holders.length : 0;

  if (bitmask & WRAP_PARTIAL_RIGHT_FLAG$2) {
    var partialsRight = partials,
        holdersRight = holders;
    partials = holders = undefined;
  }

  var data = isBindKey ? undefined : getData(func);
  var newData = [func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity];

  if (data) {
    mergeData(newData, data);
  }

  func = newData[0];
  bitmask = newData[1];
  thisArg = newData[2];
  partials = newData[3];
  holders = newData[4];
  arity = newData[9] = newData[9] === undefined ? isBindKey ? 0 : func.length : nativeMax$2(newData[9] - length, 0);

  if (!arity && bitmask & (WRAP_CURRY_FLAG$4 | WRAP_CURRY_RIGHT_FLAG$2)) {
    bitmask &= ~(WRAP_CURRY_FLAG$4 | WRAP_CURRY_RIGHT_FLAG$2);
  }

  if (!bitmask || bitmask == WRAP_BIND_FLAG$6) {
    var result = createBind(func, bitmask, thisArg);
  } else if (bitmask == WRAP_CURRY_FLAG$4 || bitmask == WRAP_CURRY_RIGHT_FLAG$2) {
    result = createCurry(func, bitmask, arity);
  } else if ((bitmask == WRAP_PARTIAL_FLAG$2 || bitmask == (WRAP_BIND_FLAG$6 | WRAP_PARTIAL_FLAG$2)) && !holders.length) {
    result = createPartial(func, bitmask, thisArg, partials);
  } else {
    result = createHybrid.apply(undefined, newData);
  }

  var setter = data ? baseSetData : setData;
  return setWrapToString(setter(result, newData), func, bitmask);
}

var WRAP_ARY_FLAG$3 = 128;

function ary(func, n, guard) {
  n = guard ? undefined : n;
  n = func && n == null ? func.length : n;
  return createWrap(func, WRAP_ARY_FLAG$3, undefined, undefined, undefined, undefined, n);
}

function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

function eq(value, other) {
  return value === other || value !== value && other !== other;
}

var objectProto$5 = Object.prototype;
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;

function assignValue(object, key, value) {
  var objValue = object[key];

  if (!(hasOwnProperty$4.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}

function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }

    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }

  return object;
}

var nativeMax$3 = Math.max;

function overRest(func, start, transform) {
  start = nativeMax$3(start === undefined ? func.length - 1 : start, 0);
  return function () {
    var args = arguments,
        index = -1,
        length = nativeMax$3(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }

    index = -1;
    var otherArgs = Array(start + 1);

    while (++index < start) {
      otherArgs[index] = args[index];
    }

    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

var MAX_SAFE_INTEGER$1 = 9007199254740991;

function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
}

function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }

  var type = _typeof(index);

  if (type == 'number' ? isArrayLike(object) && isIndex(index, object.length) : type == 'string' && index in object) {
    return eq(object[index], value);
  }

  return false;
}

function createAssigner(assigner) {
  return baseRest(function (object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;
    customizer = assigner.length > 3 && typeof customizer == 'function' ? (length--, customizer) : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }

    object = Object(object);

    while (++index < length) {
      var source = sources[index];

      if (source) {
        assigner(object, source, index, customizer);
      }
    }

    return object;
  });
}

var objectProto$6 = Object.prototype;

function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto$6;
  return value === proto;
}

function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }

  return result;
}

var argsTag = '[object Arguments]';

function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

var objectProto$7 = Object.prototype;
var hasOwnProperty$5 = objectProto$7.hasOwnProperty;
var propertyIsEnumerable = objectProto$7.propertyIsEnumerable;
var isArguments = baseIsArguments(function () {
  return arguments;
}()) ? baseIsArguments : function (value) {
  return isObjectLike(value) && hasOwnProperty$5.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
};

function stubFalse() {
  return false;
}

var freeExports = (typeof exports === "undefined" ? "undefined" : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;
var freeModule = freeExports && (typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var Buffer = moduleExports ? root.Buffer : undefined;
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;
var isBuffer = nativeIsBuffer || stubFalse;
var argsTag$1 = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag$1 = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';
var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

function baseIsTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

function baseUnary(func) {
  return function (value) {
    return func(value);
  };
}

var freeExports$1 = (typeof exports === "undefined" ? "undefined" : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;
var freeModule$1 = freeExports$1 && (typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module && !module.nodeType && module;
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
var freeProcess = moduleExports$1 && freeGlobal.process;

var nodeUtil = function () {
  try {
    var types = freeModule$1 && freeModule$1.require && freeModule$1.require('util').types;

    if (types) {
      return types;
    }

    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}();

var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
var objectProto$8 = Object.prototype;
var hasOwnProperty$6 = objectProto$8.hasOwnProperty;

function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$6.call(value, key)) && !(skipIndexes && (key == 'length' || isBuff && (key == 'offset' || key == 'parent') || isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') || isIndex(key, length)))) {
      result.push(key);
    }
  }

  return result;
}

function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}

var nativeKeys = overArg(Object.keys, Object);
var objectProto$9 = Object.prototype;
var hasOwnProperty$7 = objectProto$9.hasOwnProperty;

function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }

  var result = [];

  for (var key in Object(object)) {
    if (hasOwnProperty$7.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }

  return result;
}

function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

var objectProto$a = Object.prototype;
var hasOwnProperty$8 = objectProto$a.hasOwnProperty;
var assign = createAssigner(function (object, source) {
  if (isPrototype(source) || isArrayLike(source)) {
    copyObject(source, keys(source), object);
    return;
  }

  for (var key in source) {
    if (hasOwnProperty$8.call(source, key)) {
      assignValue(object, key, source[key]);
    }
  }
});

function nativeKeysIn(object) {
  var result = [];

  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }

  return result;
}

var objectProto$b = Object.prototype;
var hasOwnProperty$9 = objectProto$b.hasOwnProperty;

function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }

  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty$9.call(object, key)))) {
      result.push(key);
    }
  }

  return result;
}

function keysIn$1(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

var assignIn = createAssigner(function (object, source) {
  copyObject(source, keysIn$1(source), object);
});
var assignInWith = createAssigner(function (object, source, srcIndex, customizer) {
  copyObject(source, keysIn$1(source), object, customizer);
});
var assignWith = createAssigner(function (object, source, srcIndex, customizer) {
  copyObject(source, keys(source), object, customizer);
});
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }

  var type = _typeof(value);

  if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol(value)) {
    return true;
  }

  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}

var nativeCreate = getNative(Object, 'create');

function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

var HASH_UNDEFINED = '__lodash_hash_undefined__';
var objectProto$c = Object.prototype;
var hasOwnProperty$a = objectProto$c.hasOwnProperty;

function hashGet(key) {
  var data = this.__data__;

  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }

  return hasOwnProperty$a.call(data, key) ? data[key] : undefined;
}

var objectProto$d = Object.prototype;
var hasOwnProperty$b = objectProto$d.hasOwnProperty;

function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty$b.call(data, key);
}

var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED$1 : value;
  return this;
}

function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

function assocIndexOf(array, key) {
  var length = array.length;

  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }

  return -1;
}

var arrayProto = Array.prototype;
var splice = arrayProto.splice;

function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }

  var lastIndex = data.length - 1;

  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }

  --this.size;
  return true;
}

function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);
  return index < 0 ? undefined : data[index][1];
}

function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }

  return this;
}

function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
var Map = getNative(root, 'Map');

function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash(),
    'map': new (Map || ListCache)(),
    'string': new Hash()
  };
}

function isKeyable(value) {
  var type = _typeof(value);

  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
}

function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
}

function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
var FUNC_ERROR_TEXT$2 = 'Expected a function';

function memoize(func, resolver) {
  if (typeof func != 'function' || resolver != null && typeof resolver != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT$2);
  }

  var memoized = function memoized() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }

    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };

  memoized.cache = new (memoize.Cache || MapCache)();
  return memoized;
}

memoize.Cache = MapCache;
var MAX_MEMOIZE_SIZE = 500;

function memoizeCapped(func) {
  var result = memoize(func, function (key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }

    return key;
  });
  var cache = result.cache;
  return result;
}

var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var reEscapeChar = /\\(\\)?/g;
var stringToPath = memoizeCapped(function (string) {
  var result = [];

  if (string.charCodeAt(0) === 46) {
    result.push('');
  }

  string.replace(rePropName, function (match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : number || match);
  });
  return result;
});

function toString(value) {
  return value == null ? '' : baseToString(value);
}

function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }

  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

var INFINITY$2 = 1 / 0;

function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }

  var result = value + '';
  return result == '0' && 1 / value == -INFINITY$2 ? '-0' : result;
}

function baseGet(object, path) {
  path = castPath(path, object);
  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }

  return index && index == length ? object : undefined;
}

function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

function baseAt(object, paths) {
  var index = -1,
      length = paths.length,
      result = Array(length),
      skip = object == null;

  while (++index < length) {
    result[index] = skip ? undefined : get(object, paths[index]);
  }

  return result;
}

function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }

  return array;
}

var spreadableSymbol = _Symbol ? _Symbol.isConcatSpreadable : undefined;

function isFlattenable(value) {
  return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
}

function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;
  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];

    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }

  return result;
}

function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, 1) : [];
}

function flatRest(func) {
  return setToString(overRest(func, undefined, flatten), func + '');
}

var at = flatRest(baseAt);
var getPrototype = overArg(Object.getPrototypeOf, Object);
var objectTag$1 = '[object Object]';
var funcProto$2 = Function.prototype,
    objectProto$e = Object.prototype;
var funcToString$2 = funcProto$2.toString;
var hasOwnProperty$c = objectProto$e.hasOwnProperty;
var objectCtorString = funcToString$2.call(Object);

function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag$1) {
    return false;
  }

  var proto = getPrototype(value);

  if (proto === null) {
    return true;
  }

  var Ctor = hasOwnProperty$c.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString$2.call(Ctor) == objectCtorString;
}

var domExcTag = '[object DOMException]',
    errorTag$1 = '[object Error]';

function isError(value) {
  if (!isObjectLike(value)) {
    return false;
  }

  var tag = baseGetTag(value);
  return tag == errorTag$1 || tag == domExcTag || typeof value.message == 'string' && typeof value.name == 'string' && !isPlainObject(value);
}

var attempt = baseRest(function (func, args) {
  try {
    return apply(func, undefined, args);
  } catch (e) {
    return isError(e) ? e : new Error(e);
  }
});
var FUNC_ERROR_TEXT$3 = 'Expected a function';

function before(n, func) {
  var result;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT$3);
  }

  n = toInteger(n);
  return function () {
    if (--n > 0) {
      result = func.apply(this, arguments);
    }

    if (n <= 1) {
      func = undefined;
    }

    return result;
  };
}

var WRAP_BIND_FLAG$7 = 1,
    WRAP_PARTIAL_FLAG$3 = 32;
var bind = baseRest(function (func, thisArg, partials) {
  var bitmask = WRAP_BIND_FLAG$7;

  if (partials.length) {
    var holders = replaceHolders(partials, getHolder(bind));
    bitmask |= WRAP_PARTIAL_FLAG$3;
  }

  return createWrap(func, bitmask, thisArg, partials, holders);
});
bind.placeholder = {};
var bindAll = flatRest(function (object, methodNames) {
  arrayEach(methodNames, function (key) {
    key = toKey(key);
    baseAssignValue(object, key, bind(object[key], object));
  });
  return object;
});
var WRAP_BIND_FLAG$8 = 1,
    WRAP_BIND_KEY_FLAG$5 = 2,
    WRAP_PARTIAL_FLAG$4 = 32;
var bindKey = baseRest(function (object, key, partials) {
  var bitmask = WRAP_BIND_FLAG$8 | WRAP_BIND_KEY_FLAG$5;

  if (partials.length) {
    var holders = replaceHolders(partials, getHolder(bindKey));
    bitmask |= WRAP_PARTIAL_FLAG$4;
  }

  return createWrap(key, bitmask, object, partials, holders);
});
bindKey.placeholder = {};

function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : length + start;
  }

  end = end > length ? length : end;

  if (end < 0) {
    end += length;
  }

  length = start > end ? 0 : end - start >>> 0;
  start >>>= 0;
  var result = Array(length);

  while (++index < length) {
    result[index] = array[index + start];
  }

  return result;
}

function castSlice(array, start, end) {
  var length = array.length;
  end = end === undefined ? length : end;
  return !start && end >= length ? array : baseSlice(array, start, end);
}

var rsAstralRange = "\\ud800-\\udfff",
    rsComboMarksRange = "\\u0300-\\u036f",
    reComboHalfMarksRange = "\\ufe20-\\ufe2f",
    rsComboSymbolsRange = "\\u20d0-\\u20ff",
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = "\\ufe0e\\ufe0f";
var rsZWJ = "\\u200d";
var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + ']');

function hasUnicode(string) {
  return reHasUnicode.test(string);
}

function asciiToArray(string) {
  return string.split('');
}

var rsAstralRange$1 = "\\ud800-\\udfff",
    rsComboMarksRange$1 = "\\u0300-\\u036f",
    reComboHalfMarksRange$1 = "\\ufe20-\\ufe2f",
    rsComboSymbolsRange$1 = "\\u20d0-\\u20ff",
    rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1,
    rsVarRange$1 = "\\ufe0e\\ufe0f";
var rsAstral = '[' + rsAstralRange$1 + ']',
    rsCombo = '[' + rsComboRange$1 + ']',
    rsFitz = "\\ud83c[\\udffb-\\udfff]",
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange$1 + ']',
    rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}",
    rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]",
    rsZWJ$1 = "\\u200d";
var reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange$1 + ']?',
    rsOptJoin = '(?:' + rsZWJ$1 + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

function unicodeToArray(string) {
  return string.match(reUnicode) || [];
}

function stringToArray(string) {
  return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
}

function createCaseFirst(methodName) {
  return function (string) {
    string = toString(string);
    var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined;
    var chr = strSymbols ? strSymbols[0] : string.charAt(0);
    var trailing = strSymbols ? castSlice(strSymbols, 1).join('') : string.slice(1);
    return chr[methodName]() + trailing;
  };
}

var upperFirst = createCaseFirst('toUpperCase');

function capitalize(string) {
  return upperFirst(toString(string).toLowerCase());
}

function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array == null ? 0 : array.length;

  if (initAccum && length) {
    accumulator = array[++index];
  }

  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }

  return accumulator;
}

function basePropertyOf(object) {
  return function (key) {
    return object == null ? undefined : object[key];
  };
}

var deburredLetters = {
  '\xc0': 'A',
  '\xc1': 'A',
  '\xc2': 'A',
  '\xc3': 'A',
  '\xc4': 'A',
  '\xc5': 'A',
  '\xe0': 'a',
  '\xe1': 'a',
  '\xe2': 'a',
  '\xe3': 'a',
  '\xe4': 'a',
  '\xe5': 'a',
  '\xc7': 'C',
  '\xe7': 'c',
  '\xd0': 'D',
  '\xf0': 'd',
  '\xc8': 'E',
  '\xc9': 'E',
  '\xca': 'E',
  '\xcb': 'E',
  '\xe8': 'e',
  '\xe9': 'e',
  '\xea': 'e',
  '\xeb': 'e',
  '\xcc': 'I',
  '\xcd': 'I',
  '\xce': 'I',
  '\xcf': 'I',
  '\xec': 'i',
  '\xed': 'i',
  '\xee': 'i',
  '\xef': 'i',
  '\xd1': 'N',
  '\xf1': 'n',
  '\xd2': 'O',
  '\xd3': 'O',
  '\xd4': 'O',
  '\xd5': 'O',
  '\xd6': 'O',
  '\xd8': 'O',
  '\xf2': 'o',
  '\xf3': 'o',
  '\xf4': 'o',
  '\xf5': 'o',
  '\xf6': 'o',
  '\xf8': 'o',
  '\xd9': 'U',
  '\xda': 'U',
  '\xdb': 'U',
  '\xdc': 'U',
  '\xf9': 'u',
  '\xfa': 'u',
  '\xfb': 'u',
  '\xfc': 'u',
  '\xdd': 'Y',
  '\xfd': 'y',
  '\xff': 'y',
  '\xc6': 'Ae',
  '\xe6': 'ae',
  '\xde': 'Th',
  '\xfe': 'th',
  '\xdf': 'ss',
  "\u0100": 'A',
  "\u0102": 'A',
  "\u0104": 'A',
  "\u0101": 'a',
  "\u0103": 'a',
  "\u0105": 'a',
  "\u0106": 'C',
  "\u0108": 'C',
  "\u010A": 'C',
  "\u010C": 'C',
  "\u0107": 'c',
  "\u0109": 'c',
  "\u010B": 'c',
  "\u010D": 'c',
  "\u010E": 'D',
  "\u0110": 'D',
  "\u010F": 'd',
  "\u0111": 'd',
  "\u0112": 'E',
  "\u0114": 'E',
  "\u0116": 'E',
  "\u0118": 'E',
  "\u011A": 'E',
  "\u0113": 'e',
  "\u0115": 'e',
  "\u0117": 'e',
  "\u0119": 'e',
  "\u011B": 'e',
  "\u011C": 'G',
  "\u011E": 'G',
  "\u0120": 'G',
  "\u0122": 'G',
  "\u011D": 'g',
  "\u011F": 'g',
  "\u0121": 'g',
  "\u0123": 'g',
  "\u0124": 'H',
  "\u0126": 'H',
  "\u0125": 'h',
  "\u0127": 'h',
  "\u0128": 'I',
  "\u012A": 'I',
  "\u012C": 'I',
  "\u012E": 'I',
  "\u0130": 'I',
  "\u0129": 'i',
  "\u012B": 'i',
  "\u012D": 'i',
  "\u012F": 'i',
  "\u0131": 'i',
  "\u0134": 'J',
  "\u0135": 'j',
  "\u0136": 'K',
  "\u0137": 'k',
  "\u0138": 'k',
  "\u0139": 'L',
  "\u013B": 'L',
  "\u013D": 'L',
  "\u013F": 'L',
  "\u0141": 'L',
  "\u013A": 'l',
  "\u013C": 'l',
  "\u013E": 'l',
  "\u0140": 'l',
  "\u0142": 'l',
  "\u0143": 'N',
  "\u0145": 'N',
  "\u0147": 'N',
  "\u014A": 'N',
  "\u0144": 'n',
  "\u0146": 'n',
  "\u0148": 'n',
  "\u014B": 'n',
  "\u014C": 'O',
  "\u014E": 'O',
  "\u0150": 'O',
  "\u014D": 'o',
  "\u014F": 'o',
  "\u0151": 'o',
  "\u0154": 'R',
  "\u0156": 'R',
  "\u0158": 'R',
  "\u0155": 'r',
  "\u0157": 'r',
  "\u0159": 'r',
  "\u015A": 'S',
  "\u015C": 'S',
  "\u015E": 'S',
  "\u0160": 'S',
  "\u015B": 's',
  "\u015D": 's',
  "\u015F": 's',
  "\u0161": 's',
  "\u0162": 'T',
  "\u0164": 'T',
  "\u0166": 'T',
  "\u0163": 't',
  "\u0165": 't',
  "\u0167": 't',
  "\u0168": 'U',
  "\u016A": 'U',
  "\u016C": 'U',
  "\u016E": 'U',
  "\u0170": 'U',
  "\u0172": 'U',
  "\u0169": 'u',
  "\u016B": 'u',
  "\u016D": 'u',
  "\u016F": 'u',
  "\u0171": 'u',
  "\u0173": 'u',
  "\u0174": 'W',
  "\u0175": 'w',
  "\u0176": 'Y',
  "\u0177": 'y',
  "\u0178": 'Y',
  "\u0179": 'Z',
  "\u017B": 'Z',
  "\u017D": 'Z',
  "\u017A": 'z',
  "\u017C": 'z',
  "\u017E": 'z',
  "\u0132": 'IJ',
  "\u0133": 'ij',
  "\u0152": 'Oe',
  "\u0153": 'oe',
  "\u0149": "'n",
  "\u017F": 's'
};
var deburrLetter = basePropertyOf(deburredLetters);
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
var rsComboMarksRange$2 = "\\u0300-\\u036f",
    reComboHalfMarksRange$2 = "\\ufe20-\\ufe2f",
    rsComboSymbolsRange$2 = "\\u20d0-\\u20ff",
    rsComboRange$2 = rsComboMarksRange$2 + reComboHalfMarksRange$2 + rsComboSymbolsRange$2;
var rsCombo$1 = '[' + rsComboRange$2 + ']';
var reComboMark = RegExp(rsCombo$1, 'g');

function deburr(string) {
  string = toString(string);
  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
}

var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

function asciiWords(string) {
  return string.match(reAsciiWord) || [];
}

var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

function hasUnicodeWord(string) {
  return reHasUnicodeWord.test(string);
}

var rsAstralRange$2 = "\\ud800-\\udfff",
    rsComboMarksRange$3 = "\\u0300-\\u036f",
    reComboHalfMarksRange$3 = "\\ufe20-\\ufe2f",
    rsComboSymbolsRange$3 = "\\u20d0-\\u20ff",
    rsComboRange$3 = rsComboMarksRange$3 + reComboHalfMarksRange$3 + rsComboSymbolsRange$3,
    rsDingbatRange = "\\u2700-\\u27bf",
    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
    rsPunctuationRange = "\\u2000-\\u206f",
    rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",
    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
    rsVarRange$2 = "\\ufe0e\\ufe0f",
    rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
var rsApos = "['\u2019]",
    rsBreak = '[' + rsBreakRange + ']',
    rsCombo$2 = '[' + rsComboRange$3 + ']',
    rsDigits = '\\d+',
    rsDingbat = '[' + rsDingbatRange + ']',
    rsLower = '[' + rsLowerRange + ']',
    rsMisc = '[^' + rsAstralRange$2 + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
    rsFitz$1 = "\\ud83c[\\udffb-\\udfff]",
    rsModifier$1 = '(?:' + rsCombo$2 + '|' + rsFitz$1 + ')',
    rsNonAstral$1 = '[^' + rsAstralRange$2 + ']',
    rsRegional$1 = "(?:\\ud83c[\\udde6-\\uddff]){2}",
    rsSurrPair$1 = "[\\ud800-\\udbff][\\udc00-\\udfff]",
    rsUpper = '[' + rsUpperRange + ']',
    rsZWJ$2 = "\\u200d";
var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
    rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
    rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
    rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
    reOptMod$1 = rsModifier$1 + '?',
    rsOptVar$1 = '[' + rsVarRange$2 + ']?',
    rsOptJoin$1 = '(?:' + rsZWJ$2 + '(?:' + [rsNonAstral$1, rsRegional$1, rsSurrPair$1].join('|') + ')' + rsOptVar$1 + reOptMod$1 + ')*',
    rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
    rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
    rsSeq$1 = rsOptVar$1 + reOptMod$1 + rsOptJoin$1,
    rsEmoji = '(?:' + [rsDingbat, rsRegional$1, rsSurrPair$1].join('|') + ')' + rsSeq$1;
var reUnicodeWord = RegExp([rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')', rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')', rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower, rsUpper + '+' + rsOptContrUpper, rsOrdUpper, rsOrdLower, rsDigits, rsEmoji].join('|'), 'g');

function unicodeWords(string) {
  return string.match(reUnicodeWord) || [];
}

function words(string, pattern, guard) {
  string = toString(string);
  pattern = guard ? undefined : pattern;

  if (pattern === undefined) {
    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
  }

  return string.match(pattern) || [];
}

var rsApos$1 = "['\u2019]";
var reApos = RegExp(rsApos$1, 'g');

function createCompounder(callback) {
  return function (string) {
    return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
  };
}

var camelCase = createCompounder(function (result, word, index) {
  word = word.toLowerCase();
  return result + (index ? capitalize(word) : word);
});

function castArray() {
  if (!arguments.length) {
    return [];
  }

  var value = arguments[0];
  return isArray(value) ? value : [value];
}

var nativeIsFinite = root.isFinite,
    nativeMin$2 = Math.min;

function createRound(methodName) {
  var func = Math[methodName];
  return function (number, precision) {
    number = toNumber(number);
    precision = precision == null ? 0 : nativeMin$2(toInteger(precision), 292);

    if (precision && nativeIsFinite(number)) {
      var pair = (toString(number) + 'e').split('e'),
          value = func(pair[0] + 'e' + (+pair[1] + precision));
      pair = (toString(value) + 'e').split('e');
      return +(pair[0] + 'e' + (+pair[1] - precision));
    }

    return func(number);
  };
}

var ceil = createRound('ceil');

function chain(value) {
  var result = lodash(value);
  result.__chain__ = true;
  return result;
}

var nativeCeil = Math.ceil,
    nativeMax$4 = Math.max;

function chunk(array, size, guard) {
  if (guard ? isIterateeCall(array, size, guard) : size === undefined) {
    size = 1;
  } else {
    size = nativeMax$4(toInteger(size), 0);
  }

  var length = array == null ? 0 : array.length;

  if (!length || size < 1) {
    return [];
  }

  var index = 0,
      resIndex = 0,
      result = Array(nativeCeil(length / size));

  while (index < length) {
    result[resIndex++] = baseSlice(array, index, index += size);
  }

  return result;
}

function baseClamp(number, lower, upper) {
  if (number === number) {
    if (upper !== undefined) {
      number = number <= upper ? number : upper;
    }

    if (lower !== undefined) {
      number = number >= lower ? number : lower;
    }
  }

  return number;
}

function clamp(number, lower, upper) {
  if (upper === undefined) {
    upper = lower;
    lower = undefined;
  }

  if (upper !== undefined) {
    upper = toNumber(upper);
    upper = upper === upper ? upper : 0;
  }

  if (lower !== undefined) {
    lower = toNumber(lower);
    lower = lower === lower ? lower : 0;
  }

  return baseClamp(toNumber(number), lower, upper);
}

function stackClear() {
  this.__data__ = new ListCache();
  this.size = 0;
}

function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);
  this.size = data.size;
  return result;
}

function stackGet(key) {
  return this.__data__.get(key);
}

function stackHas(key) {
  return this.__data__.has(key);
}

var LARGE_ARRAY_SIZE = 200;

function stackSet(key, value) {
  var data = this.__data__;

  if (data instanceof ListCache) {
    var pairs = data.__data__;

    if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }

    data = this.__data__ = new MapCache(pairs);
  }

  data.set(key, value);
  this.size = data.size;
  return this;
}

function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn$1(source), object);
}

var freeExports$2 = (typeof exports === "undefined" ? "undefined" : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;
var freeModule$2 = freeExports$2 && (typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module && !module.nodeType && module;
var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;
var Buffer$1 = moduleExports$2 ? root.Buffer : undefined,
    allocUnsafe = Buffer$1 ? Buffer$1.allocUnsafe : undefined;

function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }

  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
  buffer.copy(result);
  return result;
}

function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];

    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }

  return result;
}

function stubArray() {
  return [];
}

var objectProto$f = Object.prototype;
var propertyIsEnumerable$1 = objectProto$f.propertyIsEnumerable;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbols = !nativeGetSymbols ? stubArray : function (object) {
  if (object == null) {
    return [];
  }

  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function (symbol) {
    return propertyIsEnumerable$1.call(object, symbol);
  });
};

function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

var nativeGetSymbols$1 = Object.getOwnPropertySymbols;
var getSymbolsIn = !nativeGetSymbols$1 ? stubArray : function (object) {
  var result = [];

  while (object) {
    arrayPush(result, getSymbols(object));
    object = getPrototype(object);
  }

  return result;
};

function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn(source), object);
}

function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn$1, getSymbolsIn);
}

var DataView = getNative(root, 'DataView');
var Promise = getNative(root, 'Promise');
var Set = getNative(root, 'Set');
var mapTag$1 = '[object Map]',
    objectTag$2 = '[object Object]',
    promiseTag = '[object Promise]',
    setTag$1 = '[object Set]',
    weakMapTag$1 = '[object WeakMap]';
var dataViewTag$1 = '[object DataView]';
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);
var getTag = baseGetTag;

if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag$1 || Map && getTag(new Map()) != mapTag$1 || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set()) != setTag$1 || WeakMap && getTag(new WeakMap()) != weakMapTag$1) {
  getTag = function getTag(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag$2 ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag$1;

        case mapCtorString:
          return mapTag$1;

        case promiseCtorString:
          return promiseTag;

        case setCtorString:
          return setTag$1;

        case weakMapCtorString:
          return weakMapTag$1;
      }
    }

    return result;
  };
}

var getTag$1 = getTag;
var objectProto$g = Object.prototype;
var hasOwnProperty$d = objectProto$g.hasOwnProperty;

function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  if (length && typeof array[0] == 'string' && hasOwnProperty$d.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }

  return result;
}

var Uint8Array = root.Uint8Array;

function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

var reFlags = /\w*$/;

function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

var symbolProto$1 = _Symbol ? _Symbol.prototype : undefined,
    symbolValueOf = symbolProto$1 ? symbolProto$1.valueOf : undefined;

function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

var boolTag$1 = '[object Boolean]',
    dateTag$1 = '[object Date]',
    mapTag$2 = '[object Map]',
    numberTag$1 = '[object Number]',
    regexpTag$1 = '[object RegExp]',
    setTag$2 = '[object Set]',
    stringTag$1 = '[object String]',
    symbolTag$1 = '[object Symbol]';
var arrayBufferTag$1 = '[object ArrayBuffer]',
    dataViewTag$2 = '[object DataView]',
    float32Tag$1 = '[object Float32Array]',
    float64Tag$1 = '[object Float64Array]',
    int8Tag$1 = '[object Int8Array]',
    int16Tag$1 = '[object Int16Array]',
    int32Tag$1 = '[object Int32Array]',
    uint8Tag$1 = '[object Uint8Array]',
    uint8ClampedTag$1 = '[object Uint8ClampedArray]',
    uint16Tag$1 = '[object Uint16Array]',
    uint32Tag$1 = '[object Uint32Array]';

function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;

  switch (tag) {
    case arrayBufferTag$1:
      return cloneArrayBuffer(object);

    case boolTag$1:
    case dateTag$1:
      return new Ctor(+object);

    case dataViewTag$2:
      return cloneDataView(object, isDeep);

    case float32Tag$1:
    case float64Tag$1:
    case int8Tag$1:
    case int16Tag$1:
    case int32Tag$1:
    case uint8Tag$1:
    case uint8ClampedTag$1:
    case uint16Tag$1:
    case uint32Tag$1:
      return cloneTypedArray(object, isDeep);

    case mapTag$2:
      return new Ctor();

    case numberTag$1:
    case stringTag$1:
      return new Ctor(object);

    case regexpTag$1:
      return cloneRegExp(object);

    case setTag$2:
      return new Ctor();

    case symbolTag$1:
      return cloneSymbol(object);
  }
}

function initCloneObject(object) {
  return typeof object.constructor == 'function' && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
}

var mapTag$3 = '[object Map]';

function baseIsMap(value) {
  return isObjectLike(value) && getTag$1(value) == mapTag$3;
}

var nodeIsMap = nodeUtil && nodeUtil.isMap;
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
var setTag$3 = '[object Set]';

function baseIsSet(value) {
  return isObjectLike(value) && getTag$1(value) == setTag$3;
}

var nodeIsSet = nodeUtil && nodeUtil.isSet;
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;
var argsTag$2 = '[object Arguments]',
    arrayTag$1 = '[object Array]',
    boolTag$2 = '[object Boolean]',
    dateTag$2 = '[object Date]',
    errorTag$2 = '[object Error]',
    funcTag$2 = '[object Function]',
    genTag$1 = '[object GeneratorFunction]',
    mapTag$4 = '[object Map]',
    numberTag$2 = '[object Number]',
    objectTag$3 = '[object Object]',
    regexpTag$2 = '[object RegExp]',
    setTag$4 = '[object Set]',
    stringTag$2 = '[object String]',
    symbolTag$2 = '[object Symbol]',
    weakMapTag$2 = '[object WeakMap]';
var arrayBufferTag$2 = '[object ArrayBuffer]',
    dataViewTag$3 = '[object DataView]',
    float32Tag$2 = '[object Float32Array]',
    float64Tag$2 = '[object Float64Array]',
    int8Tag$2 = '[object Int8Array]',
    int16Tag$2 = '[object Int16Array]',
    int32Tag$2 = '[object Int32Array]',
    uint8Tag$2 = '[object Uint8Array]',
    uint8ClampedTag$2 = '[object Uint8ClampedArray]',
    uint16Tag$2 = '[object Uint16Array]',
    uint32Tag$2 = '[object Uint32Array]';
var cloneableTags = {};
cloneableTags[argsTag$2] = cloneableTags[arrayTag$1] = cloneableTags[arrayBufferTag$2] = cloneableTags[dataViewTag$3] = cloneableTags[boolTag$2] = cloneableTags[dateTag$2] = cloneableTags[float32Tag$2] = cloneableTags[float64Tag$2] = cloneableTags[int8Tag$2] = cloneableTags[int16Tag$2] = cloneableTags[int32Tag$2] = cloneableTags[mapTag$4] = cloneableTags[numberTag$2] = cloneableTags[objectTag$3] = cloneableTags[regexpTag$2] = cloneableTags[setTag$4] = cloneableTags[stringTag$2] = cloneableTags[symbolTag$2] = cloneableTags[uint8Tag$2] = cloneableTags[uint8ClampedTag$2] = cloneableTags[uint16Tag$2] = cloneableTags[uint32Tag$2] = true;
cloneableTags[errorTag$2] = cloneableTags[funcTag$2] = cloneableTags[weakMapTag$2] = false;

function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }

  if (result !== undefined) {
    return result;
  }

  if (!isObject(value)) {
    return value;
  }

  var isArr = isArray(value);

  if (isArr) {
    result = initCloneArray(value);

    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag$1(value),
        isFunc = tag == funcTag$2 || tag == genTag$1;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }

    if (tag == objectTag$3 || tag == argsTag$2 || isFunc && !object) {
      result = isFlat || isFunc ? {} : initCloneObject(value);

      if (!isDeep) {
        return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }

      result = initCloneByTag(value, tag, isDeep);
    }
  }

  stack || (stack = new Stack());
  var stacked = stack.get(value);

  if (stacked) {
    return stacked;
  }

  stack.set(value, result);

  if (isSet(value)) {
    value.forEach(function (subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap(value)) {
    value.forEach(function (subValue, key) {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });
  }

  var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
  var props = isArr ? undefined : keysFunc(value);
  arrayEach(props || value, function (subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }

    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

var CLONE_SYMBOLS_FLAG$1 = 4;

function clone(value) {
  return baseClone(value, CLONE_SYMBOLS_FLAG$1);
}

var CLONE_DEEP_FLAG$1 = 1,
    CLONE_SYMBOLS_FLAG$2 = 4;

function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG$1 | CLONE_SYMBOLS_FLAG$2);
}

var CLONE_DEEP_FLAG$2 = 1,
    CLONE_SYMBOLS_FLAG$3 = 4;

function cloneDeepWith(value, customizer) {
  customizer = typeof customizer == 'function' ? customizer : undefined;
  return baseClone(value, CLONE_DEEP_FLAG$2 | CLONE_SYMBOLS_FLAG$3, customizer);
}

var CLONE_SYMBOLS_FLAG$4 = 4;

function cloneWith(value, customizer) {
  customizer = typeof customizer == 'function' ? customizer : undefined;
  return baseClone(value, CLONE_SYMBOLS_FLAG$4, customizer);
}

function wrapperCommit() {
  return new LodashWrapper(this.value(), this.__chain__);
}

function compact(array) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];

    if (value) {
      result[resIndex++] = value;
    }
  }

  return result;
}

function concat() {
  var length = arguments.length;

  if (!length) {
    return [];
  }

  var args = Array(length - 1),
      array = arguments[0],
      index = length;

  while (index--) {
    args[index - 1] = arguments[index];
  }

  return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
}

var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED$2);

  return this;
}

function setCacheHas(value) {
  return this.__data__.has(value);
}

function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;
  this.__data__ = new MapCache();

  while (++index < length) {
    this.add(values[index]);
  }
}

SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }

  return false;
}

function cacheHas(cache, key) {
  return cache.has(key);
}

var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }

  var stacked = stack.get(array);

  if (stacked && stack.get(other)) {
    return stacked == other;
  }

  var index = -1,
      result = true,
      seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined;
  stack.set(array, other);
  stack.set(other, array);

  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
    }

    if (compared !== undefined) {
      if (compared) {
        continue;
      }

      result = false;
      break;
    }

    if (seen) {
      if (!arraySome(other, function (othValue, othIndex) {
        if (!cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result = false;
      break;
    }
  }

  stack['delete'](array);
  stack['delete'](other);
  return result;
}

function mapToArray(map) {
  var index = -1,
      result = Array(map.size);
  map.forEach(function (value, key) {
    result[++index] = [key, value];
  });
  return result;
}

function setToArray(set) {
  var index = -1,
      result = Array(set.size);
  set.forEach(function (value) {
    result[++index] = value;
  });
  return result;
}

var COMPARE_PARTIAL_FLAG$1 = 1,
    COMPARE_UNORDERED_FLAG$1 = 2;
var boolTag$3 = '[object Boolean]',
    dateTag$3 = '[object Date]',
    errorTag$3 = '[object Error]',
    mapTag$5 = '[object Map]',
    numberTag$3 = '[object Number]',
    regexpTag$3 = '[object RegExp]',
    setTag$5 = '[object Set]',
    stringTag$3 = '[object String]',
    symbolTag$3 = '[object Symbol]';
var arrayBufferTag$3 = '[object ArrayBuffer]',
    dataViewTag$4 = '[object DataView]';
var symbolProto$2 = _Symbol ? _Symbol.prototype : undefined,
    symbolValueOf$1 = symbolProto$2 ? symbolProto$2.valueOf : undefined;

function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag$4:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }

      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag$3:
      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }

      return true;

    case boolTag$3:
    case dateTag$3:
    case numberTag$3:
      return eq(+object, +other);

    case errorTag$3:
      return object.name == other.name && object.message == other.message;

    case regexpTag$3:
    case stringTag$3:
      return object == other + '';

    case mapTag$5:
      var convert = mapToArray;

    case setTag$5:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }

      var stacked = stack.get(object);

      if (stacked) {
        return stacked == other;
      }

      bitmask |= COMPARE_UNORDERED_FLAG$1;
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag$3:
      if (symbolValueOf$1) {
        return symbolValueOf$1.call(object) == symbolValueOf$1.call(other);
      }

  }

  return false;
}

var COMPARE_PARTIAL_FLAG$2 = 1;
var objectProto$h = Object.prototype;
var hasOwnProperty$e = objectProto$h.hasOwnProperty;

function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }

  var index = objLength;

  while (index--) {
    var key = objProps[index];

    if (!(isPartial ? key in other : hasOwnProperty$e.call(other, key))) {
      return false;
    }
  }

  var stacked = stack.get(object);

  if (stacked && stack.get(other)) {
    return stacked == other;
  }

  var result = true;
  stack.set(object, other);
  stack.set(other, object);
  var skipCtor = isPartial;

  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
    }

    if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result = false;
      break;
    }

    skipCtor || (skipCtor = key == 'constructor');
  }

  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }

  stack['delete'](object);
  stack['delete'](other);
  return result;
}

var COMPARE_PARTIAL_FLAG$3 = 1;
var argsTag$3 = '[object Arguments]',
    arrayTag$2 = '[object Array]',
    objectTag$4 = '[object Object]';
var objectProto$i = Object.prototype;
var hasOwnProperty$f = objectProto$i.hasOwnProperty;

function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag$2 : getTag$1(object),
      othTag = othIsArr ? arrayTag$2 : getTag$1(other);
  objTag = objTag == argsTag$3 ? objectTag$4 : objTag;
  othTag = othTag == argsTag$3 ? objectTag$4 : othTag;
  var objIsObj = objTag == objectTag$4,
      othIsObj = othTag == objectTag$4,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }

    objIsArr = true;
    objIsObj = false;
  }

  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack());
    return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }

  if (!(bitmask & COMPARE_PARTIAL_FLAG$3)) {
    var objIsWrapped = objIsObj && hasOwnProperty$f.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty$f.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;
      stack || (stack = new Stack());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }

  if (!isSameTag) {
    return false;
  }

  stack || (stack = new Stack());
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }

  if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
    return value !== value && other !== other;
  }

  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

var COMPARE_PARTIAL_FLAG$4 = 1,
    COMPARE_UNORDERED_FLAG$2 = 2;

function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }

  object = Object(object);

  while (index--) {
    var data = matchData[index];

    if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
      return false;
    }
  }

  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack();

      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }

      if (!(result === undefined ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$4 | COMPARE_UNORDERED_FLAG$2, customizer, stack) : result)) {
        return false;
      }
    }
  }

  return true;
}

function isStrictComparable(value) {
  return value === value && !isObject(value);
}

function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];
    result[length] = [key, value, isStrictComparable(value)];
  }

  return result;
}

function matchesStrictComparable(key, srcValue) {
  return function (object) {
    if (object == null) {
      return false;
    }

    return object[key] === srcValue && (srcValue !== undefined || key in Object(object));
  };
}

function baseMatches(source) {
  var matchData = getMatchData(source);

  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }

  return function (object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

function hasPath(object, path, hasFunc) {
  path = castPath(path, object);
  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey(path[index]);

    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }

    object = object[key];
  }

  if (result || ++index != length) {
    return result;
  }

  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
}

function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

var COMPARE_PARTIAL_FLAG$5 = 1,
    COMPARE_UNORDERED_FLAG$3 = 2;

function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }

  return function (object) {
    var objValue = get(object, path);
    return objValue === undefined && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$5 | COMPARE_UNORDERED_FLAG$3);
  };
}

function baseProperty(key) {
  return function (object) {
    return object == null ? undefined : object[key];
  };
}

function basePropertyDeep(path) {
  return function (object) {
    return baseGet(object, path);
  };
}

function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

function baseIteratee(value) {
  if (typeof value == 'function') {
    return value;
  }

  if (value == null) {
    return identity;
  }

  if (_typeof(value) == 'object') {
    return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
  }

  return property(value);
}

var FUNC_ERROR_TEXT$4 = 'Expected a function';

function cond(pairs) {
  var length = pairs == null ? 0 : pairs.length,
      toIteratee = baseIteratee;
  pairs = !length ? [] : arrayMap(pairs, function (pair) {
    if (typeof pair[1] != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT$4);
    }

    return [toIteratee(pair[0]), pair[1]];
  });
  return baseRest(function (args) {
    var index = -1;

    while (++index < length) {
      var pair = pairs[index];

      if (apply(pair[0], this, args)) {
        return apply(pair[1], this, args);
      }
    }
  });
}

function baseConformsTo(object, source, props) {
  var length = props.length;

  if (object == null) {
    return !length;
  }

  object = Object(object);

  while (length--) {
    var key = props[length],
        predicate = source[key],
        value = object[key];

    if (value === undefined && !(key in object) || !predicate(value)) {
      return false;
    }
  }

  return true;
}

function baseConforms(source) {
  var props = keys(source);
  return function (object) {
    return baseConformsTo(object, source, props);
  };
}

var CLONE_DEEP_FLAG$3 = 1;

function conforms(source) {
  return baseConforms(baseClone(source, CLONE_DEEP_FLAG$3));
}

function conformsTo(object, source) {
  return source == null || baseConformsTo(object, source, keys(source));
}

function arrayAggregator(array, setter, iteratee, accumulator) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    var value = array[index];
    setter(accumulator, value, iteratee(value), array);
  }

  return accumulator;
}

function createBaseFor(fromRight) {
  return function (object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];

      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }

    return object;
  };
}

var baseFor = createBaseFor();

function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

function createBaseEach(eachFunc, fromRight) {
  return function (collection, iteratee) {
    if (collection == null) {
      return collection;
    }

    if (!isArrayLike(collection)) {
      return eachFunc(collection, iteratee);
    }

    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while (fromRight ? index-- : ++index < length) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }

    return collection;
  };
}

var baseEach = createBaseEach(baseForOwn);

function baseAggregator(collection, setter, iteratee, accumulator) {
  baseEach(collection, function (value, key, collection) {
    setter(accumulator, value, iteratee(value), collection);
  });
  return accumulator;
}

function createAggregator(setter, initializer) {
  return function (collection, iteratee) {
    var func = isArray(collection) ? arrayAggregator : baseAggregator,
        accumulator = initializer ? initializer() : {};
    return func(collection, setter, baseIteratee(iteratee, 2), accumulator);
  };
}

var objectProto$j = Object.prototype;
var hasOwnProperty$g = objectProto$j.hasOwnProperty;
var countBy = createAggregator(function (result, value, key) {
  if (hasOwnProperty$g.call(result, key)) {
    ++result[key];
  } else {
    baseAssignValue(result, key, 1);
  }
});

function create(prototype, properties) {
  var result = baseCreate(prototype);
  return properties == null ? result : baseAssign(result, properties);
}

var WRAP_CURRY_FLAG$5 = 8;

function curry(func, arity, guard) {
  arity = guard ? undefined : arity;
  var result = createWrap(func, WRAP_CURRY_FLAG$5, undefined, undefined, undefined, undefined, undefined, arity);
  result.placeholder = curry.placeholder;
  return result;
}

curry.placeholder = {};
var WRAP_CURRY_RIGHT_FLAG$3 = 16;

function curryRight(func, arity, guard) {
  arity = guard ? undefined : arity;
  var result = createWrap(func, WRAP_CURRY_RIGHT_FLAG$3, undefined, undefined, undefined, undefined, undefined, arity);
  result.placeholder = curryRight.placeholder;
  return result;
}

curryRight.placeholder = {};

var now = function now() {
  return root.Date.now();
};

var FUNC_ERROR_TEXT$5 = 'Expected a function';
var nativeMax$5 = Math.max,
    nativeMin$3 = Math.min;

function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT$5);
  }

  wait = toNumber(wait) || 0;

  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax$5(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;
    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    lastInvokeTime = time;
    timerId = setTimeout(timerExpired, wait);
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;
    return maxing ? nativeMin$3(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;
    return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }

  function timerExpired() {
    var time = now();

    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }

    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    if (trailing && lastArgs) {
      return invokeFunc(time);
    }

    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }

    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }

      if (maxing) {
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }

    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }

    return result;
  }

  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

function defaultTo(value, defaultValue) {
  return value == null || value !== value ? defaultValue : value;
}

var objectProto$k = Object.prototype;
var hasOwnProperty$h = objectProto$k.hasOwnProperty;
var defaults = baseRest(function (object, sources) {
  object = Object(object);
  var index = -1;
  var length = sources.length;
  var guard = length > 2 ? sources[2] : undefined;

  if (guard && isIterateeCall(sources[0], sources[1], guard)) {
    length = 1;
  }

  while (++index < length) {
    var source = sources[index];
    var props = keysIn$1(source);
    var propsIndex = -1;
    var propsLength = props.length;

    while (++propsIndex < propsLength) {
      var key = props[propsIndex];
      var value = object[key];

      if (value === undefined || eq(value, objectProto$k[key]) && !hasOwnProperty$h.call(object, key)) {
        object[key] = source[key];
      }
    }
  }

  return object;
});

function assignMergeValue(object, key, value) {
  if (value !== undefined && !eq(object[key], value) || value === undefined && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}

function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

function safeGet(object, key) {
  if (key === 'constructor' && typeof object[key] === 'function') {
    return;
  }

  if (key == '__proto__') {
    return;
  }

  return object[key];
}

function toPlainObject(value) {
  return copyObject(value, keysIn$1(value));
}

function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = safeGet(object, key),
      srcValue = safeGet(source, key),
      stacked = stack.get(srcValue);

  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }

  var newValue = customizer ? customizer(objValue, srcValue, key + '', object, source, stack) : undefined;
  var isCommon = newValue === undefined;

  if (isCommon) {
    var isArr = isArray(srcValue),
        isBuff = !isArr && isBuffer(srcValue),
        isTyped = !isArr && !isBuff && isTypedArray(srcValue);
    newValue = srcValue;

    if (isArr || isBuff || isTyped) {
      if (isArray(objValue)) {
        newValue = objValue;
      } else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      } else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      } else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      } else {
        newValue = [];
      }
    } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;

      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      } else if (!isObject(objValue) || isFunction(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    } else {
      isCommon = false;
    }
  }

  if (isCommon) {
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }

  assignMergeValue(object, key, newValue);
}

function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }

  baseFor(source, function (srcValue, key) {
    stack || (stack = new Stack());

    if (isObject(srcValue)) {
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    } else {
      var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + '', object, source, stack) : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }

      assignMergeValue(object, key, newValue);
    }
  }, keysIn$1);
}

function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
  if (isObject(objValue) && isObject(srcValue)) {
    stack.set(srcValue, objValue);
    baseMerge(objValue, srcValue, undefined, customDefaultsMerge, stack);
    stack['delete'](srcValue);
  }

  return objValue;
}

var mergeWith = createAssigner(function (object, source, srcIndex, customizer) {
  baseMerge(object, source, srcIndex, customizer);
});
var defaultsDeep = baseRest(function (args) {
  args.push(undefined, customDefaultsMerge);
  return apply(mergeWith, undefined, args);
});
var FUNC_ERROR_TEXT$6 = 'Expected a function';

function baseDelay(func, wait, args) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT$6);
  }

  return setTimeout(function () {
    func.apply(undefined, args);
  }, wait);
}

var defer = baseRest(function (func, args) {
  return baseDelay(func, 1, args);
});
var delay = baseRest(function (func, wait, args) {
  return baseDelay(func, toNumber(wait) || 0, args);
});

function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }

  return false;
}

var LARGE_ARRAY_SIZE$1 = 200;

function baseDifference(array, values, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      isCommon = true,
      length = array.length,
      result = [],
      valuesLength = values.length;

  if (!length) {
    return result;
  }

  if (iteratee) {
    values = arrayMap(values, baseUnary(iteratee));
  }

  if (comparator) {
    includes = arrayIncludesWith;
    isCommon = false;
  } else if (values.length >= LARGE_ARRAY_SIZE$1) {
    includes = cacheHas;
    isCommon = false;
    values = new SetCache(values);
  }

  outer: while (++index < length) {
    var value = array[index],
        computed = iteratee == null ? value : iteratee(value);
    value = comparator || value !== 0 ? value : 0;

    if (isCommon && computed === computed) {
      var valuesIndex = valuesLength;

      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          continue outer;
        }
      }

      result.push(value);
    } else if (!includes(values, computed, comparator)) {
      result.push(value);
    }
  }

  return result;
}

var difference = baseRest(function (array, values) {
  return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true)) : [];
});

function last(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}

var differenceBy = baseRest(function (array, values) {
  var iteratee = last(values);

  if (isArrayLikeObject(iteratee)) {
    iteratee = undefined;
  }

  return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), baseIteratee(iteratee, 2)) : [];
});
var differenceWith = baseRest(function (array, values) {
  var comparator = last(values);

  if (isArrayLikeObject(comparator)) {
    comparator = undefined;
  }

  return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), undefined, comparator) : [];
});
var divide = createMathOperation(function (dividend, divisor) {
  return dividend / divisor;
}, 1);

function drop(array, n, guard) {
  var length = array == null ? 0 : array.length;

  if (!length) {
    return [];
  }

  n = guard || n === undefined ? 1 : toInteger(n);
  return baseSlice(array, n < 0 ? 0 : n, length);
}

function dropRight(array, n, guard) {
  var length = array == null ? 0 : array.length;

  if (!length) {
    return [];
  }

  n = guard || n === undefined ? 1 : toInteger(n);
  n = length - n;
  return baseSlice(array, 0, n < 0 ? 0 : n);
}

function baseWhile(array, predicate, isDrop, fromRight) {
  var length = array.length,
      index = fromRight ? length : -1;

  while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {}

  return isDrop ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length : index);
}

function dropRightWhile(array, predicate) {
  return array && array.length ? baseWhile(array, baseIteratee(predicate, 3), true, true) : [];
}

function dropWhile(array, predicate) {
  return array && array.length ? baseWhile(array, baseIteratee(predicate, 3), true) : [];
}

function castFunction(value) {
  return typeof value == 'function' ? value : identity;
}

function forEach(collection, iteratee) {
  var func = isArray(collection) ? arrayEach : baseEach;
  return func(collection, castFunction(iteratee));
}

function arrayEachRight(array, iteratee) {
  var length = array == null ? 0 : array.length;

  while (length--) {
    if (iteratee(array[length], length, array) === false) {
      break;
    }
  }

  return array;
}

var baseForRight = createBaseFor(true);

function baseForOwnRight(object, iteratee) {
  return object && baseForRight(object, iteratee, keys);
}

var baseEachRight = createBaseEach(baseForOwnRight, true);

function forEachRight(collection, iteratee) {
  var func = isArray(collection) ? arrayEachRight : baseEachRight;
  return func(collection, castFunction(iteratee));
}

function endsWith(string, target, position) {
  string = toString(string);
  target = baseToString(target);
  var length = string.length;
  position = position === undefined ? length : baseClamp(toInteger(position), 0, length);
  var end = position;
  position -= target.length;
  return position >= 0 && string.slice(position, end) == target;
}

function baseToPairs(object, props) {
  return arrayMap(props, function (key) {
    return [key, object[key]];
  });
}

function setToPairs(set) {
  var index = -1,
      result = Array(set.size);
  set.forEach(function (value) {
    result[++index] = [value, value];
  });
  return result;
}

var mapTag$6 = '[object Map]',
    setTag$6 = '[object Set]';

function createToPairs(keysFunc) {
  return function (object) {
    var tag = getTag$1(object);

    if (tag == mapTag$6) {
      return mapToArray(object);
    }

    if (tag == setTag$6) {
      return setToPairs(object);
    }

    return baseToPairs(object, keysFunc(object));
  };
}

var toPairs = createToPairs(keys);
var toPairsIn = createToPairs(keysIn$1);
var htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};
var escapeHtmlChar = basePropertyOf(htmlEscapes);
var reUnescapedHtml = /[&<>"']/g,
    reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

function escape(string) {
  string = toString(string);
  return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
}

var reRegExpChar$1 = /[\\^$.*+?()[\]{}|]/g,
    reHasRegExpChar = RegExp(reRegExpChar$1.source);

function escapeRegExp(string) {
  string = toString(string);
  return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar$1, '\\$&') : string;
}

function arrayEvery(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (!predicate(array[index], index, array)) {
      return false;
    }
  }

  return true;
}

function baseEvery(collection, predicate) {
  var result = true;
  baseEach(collection, function (value, index, collection) {
    result = !!predicate(value, index, collection);
    return result;
  });
  return result;
}

function every(collection, predicate, guard) {
  var func = isArray(collection) ? arrayEvery : baseEvery;

  if (guard && isIterateeCall(collection, predicate, guard)) {
    predicate = undefined;
  }

  return func(collection, baseIteratee(predicate, 3));
}

var MAX_ARRAY_LENGTH$1 = 4294967295;

function toLength(value) {
  return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH$1) : 0;
}

function baseFill(array, value, start, end) {
  var length = array.length;
  start = toInteger(start);

  if (start < 0) {
    start = -start > length ? 0 : length + start;
  }

  end = end === undefined || end > length ? length : toInteger(end);

  if (end < 0) {
    end += length;
  }

  end = start > end ? 0 : toLength(end);

  while (start < end) {
    array[start++] = value;
  }

  return array;
}

function fill(array, value, start, end) {
  var length = array == null ? 0 : array.length;

  if (!length) {
    return [];
  }

  if (start && typeof start != 'number' && isIterateeCall(array, value, start)) {
    start = 0;
    end = length;
  }

  return baseFill(array, value, start, end);
}

function baseFilter(collection, predicate) {
  var result = [];
  baseEach(collection, function (value, index, collection) {
    if (predicate(value, index, collection)) {
      result.push(value);
    }
  });
  return result;
}

function filter(collection, predicate) {
  var func = isArray(collection) ? arrayFilter : baseFilter;
  return func(collection, baseIteratee(predicate, 3));
}

function createFind(findIndexFunc) {
  return function (collection, predicate, fromIndex) {
    var iterable = Object(collection);

    if (!isArrayLike(collection)) {
      var iteratee = baseIteratee(predicate, 3);
      collection = keys(collection);

      predicate = function predicate(key) {
        return iteratee(iterable[key], key, iterable);
      };
    }

    var index = findIndexFunc(collection, predicate, fromIndex);
    return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
  };
}

var nativeMax$6 = Math.max;

function findIndex(array, predicate, fromIndex) {
  var length = array == null ? 0 : array.length;

  if (!length) {
    return -1;
  }

  var index = fromIndex == null ? 0 : toInteger(fromIndex);

  if (index < 0) {
    index = nativeMax$6(length + index, 0);
  }

  return baseFindIndex(array, baseIteratee(predicate, 3), index);
}

var find = createFind(findIndex);

function baseFindKey(collection, predicate, eachFunc) {
  var result;
  eachFunc(collection, function (value, key, collection) {
    if (predicate(value, key, collection)) {
      result = key;
      return false;
    }
  });
  return result;
}

function findKey(object, predicate) {
  return baseFindKey(object, baseIteratee(predicate, 3), baseForOwn);
}

var nativeMax$7 = Math.max,
    nativeMin$4 = Math.min;

function findLastIndex(array, predicate, fromIndex) {
  var length = array == null ? 0 : array.length;

  if (!length) {
    return -1;
  }

  var index = length - 1;

  if (fromIndex !== undefined) {
    index = toInteger(fromIndex);
    index = fromIndex < 0 ? nativeMax$7(length + index, 0) : nativeMin$4(index, length - 1);
  }

  return baseFindIndex(array, baseIteratee(predicate, 3), index, true);
}

var findLast = createFind(findLastIndex);

function findLastKey(object, predicate) {
  return baseFindKey(object, baseIteratee(predicate, 3), baseForOwnRight);
}

function head(array) {
  return array && array.length ? array[0] : undefined;
}

function baseMap(collection, iteratee) {
  var index = -1,
      result = isArrayLike(collection) ? Array(collection.length) : [];
  baseEach(collection, function (value, key, collection) {
    result[++index] = iteratee(value, key, collection);
  });
  return result;
}

function map(collection, iteratee) {
  var func = isArray(collection) ? arrayMap : baseMap;
  return func(collection, baseIteratee(iteratee, 3));
}

function flatMap(collection, iteratee) {
  return baseFlatten(map(collection, iteratee), 1);
}

var INFINITY$3 = 1 / 0;

function flatMapDeep(collection, iteratee) {
  return baseFlatten(map(collection, iteratee), INFINITY$3);
}

function flatMapDepth(collection, iteratee, depth) {
  depth = depth === undefined ? 1 : toInteger(depth);
  return baseFlatten(map(collection, iteratee), depth);
}

var INFINITY$4 = 1 / 0;

function flattenDeep(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, INFINITY$4) : [];
}

function flattenDepth(array, depth) {
  var length = array == null ? 0 : array.length;

  if (!length) {
    return [];
  }

  depth = depth === undefined ? 1 : toInteger(depth);
  return baseFlatten(array, depth);
}

var WRAP_FLIP_FLAG$2 = 512;

function flip(func) {
  return createWrap(func, WRAP_FLIP_FLAG$2);
}

var floor = createRound('floor');
var FUNC_ERROR_TEXT$7 = 'Expected a function';
var WRAP_CURRY_FLAG$6 = 8,
    WRAP_PARTIAL_FLAG$5 = 32,
    WRAP_ARY_FLAG$4 = 128,
    WRAP_REARG_FLAG$2 = 256;

function createFlow(fromRight) {
  return flatRest(function (funcs) {
    var length = funcs.length,
        index = length,
        prereq = LodashWrapper.prototype.thru;

    if (fromRight) {
      funcs.reverse();
    }

    while (index--) {
      var func = funcs[index];

      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT$7);
      }

      if (prereq && !wrapper && getFuncName(func) == 'wrapper') {
        var wrapper = new LodashWrapper([], true);
      }
    }

    index = wrapper ? index : length;

    while (++index < length) {
      func = funcs[index];
      var funcName = getFuncName(func),
          data = funcName == 'wrapper' ? getData(func) : undefined;

      if (data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG$4 | WRAP_CURRY_FLAG$6 | WRAP_PARTIAL_FLAG$5 | WRAP_REARG_FLAG$2) && !data[4].length && data[9] == 1) {
        wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
      } else {
        wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
      }
    }

    return function () {
      var args = arguments,
          value = args[0];

      if (wrapper && args.length == 1 && isArray(value)) {
        return wrapper.plant(value).value();
      }

      var index = 0,
          result = length ? funcs[index].apply(this, args) : value;

      while (++index < length) {
        result = funcs[index].call(this, result);
      }

      return result;
    };
  });
}

var flow = createFlow();
var flowRight = createFlow(true);

function forIn(object, iteratee) {
  return object == null ? object : baseFor(object, castFunction(iteratee), keysIn$1);
}

function forInRight(object, iteratee) {
  return object == null ? object : baseForRight(object, castFunction(iteratee), keysIn$1);
}

function forOwn(object, iteratee) {
  return object && baseForOwn(object, castFunction(iteratee));
}

function forOwnRight(object, iteratee) {
  return object && baseForOwnRight(object, castFunction(iteratee));
}

function fromPairs(pairs) {
  var index = -1,
      length = pairs == null ? 0 : pairs.length,
      result = {};

  while (++index < length) {
    var pair = pairs[index];
    result[pair[0]] = pair[1];
  }

  return result;
}

function baseFunctions(object, props) {
  return arrayFilter(props, function (key) {
    return isFunction(object[key]);
  });
}

function functions(object) {
  return object == null ? [] : baseFunctions(object, keys(object));
}

function functionsIn(object) {
  return object == null ? [] : baseFunctions(object, keysIn$1(object));
}

var objectProto$l = Object.prototype;
var hasOwnProperty$i = objectProto$l.hasOwnProperty;
var groupBy = createAggregator(function (result, value, key) {
  if (hasOwnProperty$i.call(result, key)) {
    result[key].push(value);
  } else {
    baseAssignValue(result, key, [value]);
  }
});

function baseGt(value, other) {
  return value > other;
}

function createRelationalOperation(operator) {
  return function (value, other) {
    if (!(typeof value == 'string' && typeof other == 'string')) {
      value = toNumber(value);
      other = toNumber(other);
    }

    return operator(value, other);
  };
}

var gt = createRelationalOperation(baseGt);
var gte = createRelationalOperation(function (value, other) {
  return value >= other;
});
var objectProto$m = Object.prototype;
var hasOwnProperty$j = objectProto$m.hasOwnProperty;

function baseHas(object, key) {
  return object != null && hasOwnProperty$j.call(object, key);
}

function has(object, path) {
  return object != null && hasPath(object, path, baseHas);
}

var nativeMax$8 = Math.max,
    nativeMin$5 = Math.min;

function baseInRange(number, start, end) {
  return number >= nativeMin$5(start, end) && number < nativeMax$8(start, end);
}

function inRange(number, start, end) {
  start = toFinite(start);

  if (end === undefined) {
    end = start;
    start = 0;
  } else {
    end = toFinite(end);
  }

  number = toNumber(number);
  return baseInRange(number, start, end);
}

var stringTag$4 = '[object String]';

function isString(value) {
  return typeof value == 'string' || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag$4;
}

function baseValues(object, props) {
  return arrayMap(props, function (key) {
    return object[key];
  });
}

function values(object) {
  return object == null ? [] : baseValues(object, keys(object));
}

var nativeMax$9 = Math.max;

function includes(collection, value, fromIndex, guard) {
  collection = isArrayLike(collection) ? collection : values(collection);
  fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
  var length = collection.length;

  if (fromIndex < 0) {
    fromIndex = nativeMax$9(length + fromIndex, 0);
  }

  return isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
}

var nativeMax$a = Math.max;

function indexOf(array, value, fromIndex) {
  var length = array == null ? 0 : array.length;

  if (!length) {
    return -1;
  }

  var index = fromIndex == null ? 0 : toInteger(fromIndex);

  if (index < 0) {
    index = nativeMax$a(length + index, 0);
  }

  return baseIndexOf(array, value, index);
}

function initial(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseSlice(array, 0, -1) : [];
}

var nativeMin$6 = Math.min;

function baseIntersection(arrays, iteratee, comparator) {
  var includes = comparator ? arrayIncludesWith : arrayIncludes,
      length = arrays[0].length,
      othLength = arrays.length,
      othIndex = othLength,
      caches = Array(othLength),
      maxLength = Infinity,
      result = [];

  while (othIndex--) {
    var array = arrays[othIndex];

    if (othIndex && iteratee) {
      array = arrayMap(array, baseUnary(iteratee));
    }

    maxLength = nativeMin$6(array.length, maxLength);
    caches[othIndex] = !comparator && (iteratee || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined;
  }

  array = arrays[0];
  var index = -1,
      seen = caches[0];

  outer: while (++index < length && result.length < maxLength) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;
    value = comparator || value !== 0 ? value : 0;

    if (!(seen ? cacheHas(seen, computed) : includes(result, computed, comparator))) {
      othIndex = othLength;

      while (--othIndex) {
        var cache = caches[othIndex];

        if (!(cache ? cacheHas(cache, computed) : includes(arrays[othIndex], computed, comparator))) {
          continue outer;
        }
      }

      if (seen) {
        seen.push(computed);
      }

      result.push(value);
    }
  }

  return result;
}

function castArrayLikeObject(value) {
  return isArrayLikeObject(value) ? value : [];
}

var intersection = baseRest(function (arrays) {
  var mapped = arrayMap(arrays, castArrayLikeObject);
  return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
});
var intersectionBy = baseRest(function (arrays) {
  var iteratee = last(arrays),
      mapped = arrayMap(arrays, castArrayLikeObject);

  if (iteratee === last(mapped)) {
    iteratee = undefined;
  } else {
    mapped.pop();
  }

  return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, baseIteratee(iteratee, 2)) : [];
});
var intersectionWith = baseRest(function (arrays) {
  var comparator = last(arrays),
      mapped = arrayMap(arrays, castArrayLikeObject);
  comparator = typeof comparator == 'function' ? comparator : undefined;

  if (comparator) {
    mapped.pop();
  }

  return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined, comparator) : [];
});

function baseInverter(object, setter, iteratee, accumulator) {
  baseForOwn(object, function (value, key, object) {
    setter(accumulator, iteratee(value), key, object);
  });
  return accumulator;
}

function createInverter(setter, toIteratee) {
  return function (object, iteratee) {
    return baseInverter(object, setter, toIteratee(iteratee), {});
  };
}

var objectProto$n = Object.prototype;
var nativeObjectToString$2 = objectProto$n.toString;
var invert = createInverter(function (result, value, key) {
  if (value != null && typeof value.toString != 'function') {
    value = nativeObjectToString$2.call(value);
  }

  result[value] = key;
}, constant(identity));
var objectProto$o = Object.prototype;
var hasOwnProperty$k = objectProto$o.hasOwnProperty;
var nativeObjectToString$3 = objectProto$o.toString;
var invertBy = createInverter(function (result, value, key) {
  if (value != null && typeof value.toString != 'function') {
    value = nativeObjectToString$3.call(value);
  }

  if (hasOwnProperty$k.call(result, value)) {
    result[value].push(key);
  } else {
    result[value] = [key];
  }
}, baseIteratee);

function parent(object, path) {
  return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
}

function baseInvoke(object, path, args) {
  path = castPath(path, object);
  object = parent(object, path);
  var func = object == null ? object : object[toKey(last(path))];
  return func == null ? undefined : apply(func, object, args);
}

var invoke = baseRest(baseInvoke);
var invokeMap = baseRest(function (collection, path, args) {
  var index = -1,
      isFunc = typeof path == 'function',
      result = isArrayLike(collection) ? Array(collection.length) : [];
  baseEach(collection, function (value) {
    result[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
  });
  return result;
});
var arrayBufferTag$4 = '[object ArrayBuffer]';

function baseIsArrayBuffer(value) {
  return isObjectLike(value) && baseGetTag(value) == arrayBufferTag$4;
}

var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer;
var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;
var boolTag$4 = '[object Boolean]';

function isBoolean(value) {
  return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag$4;
}

var dateTag$4 = '[object Date]';

function baseIsDate(value) {
  return isObjectLike(value) && baseGetTag(value) == dateTag$4;
}

var nodeIsDate = nodeUtil && nodeUtil.isDate;
var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;

function isElement(value) {
  return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
}

var mapTag$7 = '[object Map]',
    setTag$7 = '[object Set]';
var objectProto$p = Object.prototype;
var hasOwnProperty$l = objectProto$p.hasOwnProperty;

function isEmpty(value) {
  if (value == null) {
    return true;
  }

  if (isArrayLike(value) && (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
    return !value.length;
  }

  var tag = getTag$1(value);

  if (tag == mapTag$7 || tag == setTag$7) {
    return !value.size;
  }

  if (isPrototype(value)) {
    return !baseKeys(value).length;
  }

  for (var key in value) {
    if (hasOwnProperty$l.call(value, key)) {
      return false;
    }
  }

  return true;
}

function isEqual(value, other) {
  return baseIsEqual(value, other);
}

function isEqualWith(value, other, customizer) {
  customizer = typeof customizer == 'function' ? customizer : undefined;
  var result = customizer ? customizer(value, other) : undefined;
  return result === undefined ? baseIsEqual(value, other, undefined, customizer) : !!result;
}

var nativeIsFinite$1 = root.isFinite;

function isFinite(value) {
  return typeof value == 'number' && nativeIsFinite$1(value);
}

function isInteger(value) {
  return typeof value == 'number' && value == toInteger(value);
}

function isMatch(object, source) {
  return object === source || baseIsMatch(object, source, getMatchData(source));
}

function isMatchWith(object, source, customizer) {
  customizer = typeof customizer == 'function' ? customizer : undefined;
  return baseIsMatch(object, source, getMatchData(source), customizer);
}

var numberTag$4 = '[object Number]';

function isNumber(value) {
  return typeof value == 'number' || isObjectLike(value) && baseGetTag(value) == numberTag$4;
}

function isNaN(value) {
  return isNumber(value) && value != +value;
}

var isMaskable = coreJsData ? isFunction : stubFalse;
var CORE_ERROR_TEXT = 'Unsupported core-js use. Try https://npms.io/search?q=ponyfill.';

function isNative(value) {
  if (isMaskable(value)) {
    throw new Error(CORE_ERROR_TEXT);
  }

  return baseIsNative(value);
}

function isNil(value) {
  return value == null;
}

function isNull(value) {
  return value === null;
}

var regexpTag$4 = '[object RegExp]';

function baseIsRegExp(value) {
  return isObjectLike(value) && baseGetTag(value) == regexpTag$4;
}

var nodeIsRegExp = nodeUtil && nodeUtil.isRegExp;
var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
var MAX_SAFE_INTEGER$2 = 9007199254740991;

function isSafeInteger(value) {
  return isInteger(value) && value >= -MAX_SAFE_INTEGER$2 && value <= MAX_SAFE_INTEGER$2;
}

function isUndefined(value) {
  return value === undefined;
}

var weakMapTag$3 = '[object WeakMap]';

function isWeakMap(value) {
  return isObjectLike(value) && getTag$1(value) == weakMapTag$3;
}

var weakSetTag = '[object WeakSet]';

function isWeakSet(value) {
  return isObjectLike(value) && baseGetTag(value) == weakSetTag;
}

var CLONE_DEEP_FLAG$4 = 1;

function iteratee(func) {
  return baseIteratee(typeof func == 'function' ? func : baseClone(func, CLONE_DEEP_FLAG$4));
}

var arrayProto$1 = Array.prototype;
var nativeJoin = arrayProto$1.join;

function join(array, separator) {
  return array == null ? '' : nativeJoin.call(array, separator);
}

var kebabCase = createCompounder(function (result, word, index) {
  return result + (index ? '-' : '') + word.toLowerCase();
});
var keyBy = createAggregator(function (result, value, key) {
  baseAssignValue(result, key, value);
});

function strictLastIndexOf(array, value, fromIndex) {
  var index = fromIndex + 1;

  while (index--) {
    if (array[index] === value) {
      return index;
    }
  }

  return index;
}

var nativeMax$b = Math.max,
    nativeMin$7 = Math.min;

function lastIndexOf(array, value, fromIndex) {
  var length = array == null ? 0 : array.length;

  if (!length) {
    return -1;
  }

  var index = length;

  if (fromIndex !== undefined) {
    index = toInteger(fromIndex);
    index = index < 0 ? nativeMax$b(length + index, 0) : nativeMin$7(index, length - 1);
  }

  return value === value ? strictLastIndexOf(array, value, index) : baseFindIndex(array, baseIsNaN, index, true);
}

var lowerCase = createCompounder(function (result, word, index) {
  return result + (index ? ' ' : '') + word.toLowerCase();
});
var lowerFirst = createCaseFirst('toLowerCase');

function baseLt(value, other) {
  return value < other;
}

var lt = createRelationalOperation(baseLt);
var lte = createRelationalOperation(function (value, other) {
  return value <= other;
});

function mapKeys(object, iteratee) {
  var result = {};
  iteratee = baseIteratee(iteratee, 3);
  baseForOwn(object, function (value, key, object) {
    baseAssignValue(result, iteratee(value, key, object), value);
  });
  return result;
}

function mapValues(object, iteratee) {
  var result = {};
  iteratee = baseIteratee(iteratee, 3);
  baseForOwn(object, function (value, key, object) {
    baseAssignValue(result, key, iteratee(value, key, object));
  });
  return result;
}

var CLONE_DEEP_FLAG$5 = 1;

function matches(source) {
  return baseMatches(baseClone(source, CLONE_DEEP_FLAG$5));
}

var CLONE_DEEP_FLAG$6 = 1;

function matchesProperty(path, srcValue) {
  return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG$6));
}

function baseExtremum(array, iteratee, comparator) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    var value = array[index],
        current = iteratee(value);

    if (current != null && (computed === undefined ? current === current && !isSymbol(current) : comparator(current, computed))) {
      var computed = current,
          result = value;
    }
  }

  return result;
}

function max(array) {
  return array && array.length ? baseExtremum(array, identity, baseGt) : undefined;
}

function maxBy(array, iteratee) {
  return array && array.length ? baseExtremum(array, baseIteratee(iteratee, 2), baseGt) : undefined;
}

function baseSum(array, iteratee) {
  var result,
      index = -1,
      length = array.length;

  while (++index < length) {
    var current = iteratee(array[index]);

    if (current !== undefined) {
      result = result === undefined ? current : result + current;
    }
  }

  return result;
}

var NAN$2 = 0 / 0;

function baseMean(array, iteratee) {
  var length = array == null ? 0 : array.length;
  return length ? baseSum(array, iteratee) / length : NAN$2;
}

function mean(array) {
  return baseMean(array, identity);
}

function meanBy(array, iteratee) {
  return baseMean(array, baseIteratee(iteratee, 2));
}

var merge = createAssigner(function (object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});
var method = baseRest(function (path, args) {
  return function (object) {
    return baseInvoke(object, path, args);
  };
});
var methodOf = baseRest(function (object, args) {
  return function (path) {
    return baseInvoke(object, path, args);
  };
});

function min(array) {
  return array && array.length ? baseExtremum(array, identity, baseLt) : undefined;
}

function minBy(array, iteratee) {
  return array && array.length ? baseExtremum(array, baseIteratee(iteratee, 2), baseLt) : undefined;
}

function mixin(object, source, options) {
  var props = keys(source),
      methodNames = baseFunctions(source, props);
  var chain = !(isObject(options) && 'chain' in options) || !!options.chain,
      isFunc = isFunction(object);
  arrayEach(methodNames, function (methodName) {
    var func = source[methodName];
    object[methodName] = func;

    if (isFunc) {
      object.prototype[methodName] = function () {
        var chainAll = this.__chain__;

        if (chain || chainAll) {
          var result = object(this.__wrapped__),
              actions = result.__actions__ = copyArray(this.__actions__);
          actions.push({
            'func': func,
            'args': arguments,
            'thisArg': object
          });
          result.__chain__ = chainAll;
          return result;
        }

        return func.apply(object, arrayPush([this.value()], arguments));
      };
    }
  });
  return object;
}

var multiply = createMathOperation(function (multiplier, multiplicand) {
  return multiplier * multiplicand;
}, 1);
var FUNC_ERROR_TEXT$8 = 'Expected a function';

function negate(predicate) {
  if (typeof predicate != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT$8);
  }

  return function () {
    var args = arguments;

    switch (args.length) {
      case 0:
        return !predicate.call(this);

      case 1:
        return !predicate.call(this, args[0]);

      case 2:
        return !predicate.call(this, args[0], args[1]);

      case 3:
        return !predicate.call(this, args[0], args[1], args[2]);
    }

    return !predicate.apply(this, args);
  };
}

function iteratorToArray(iterator) {
  var data,
      result = [];

  while (!(data = iterator.next()).done) {
    result.push(data.value);
  }

  return result;
}

var mapTag$8 = '[object Map]',
    setTag$8 = '[object Set]';
var symIterator = _Symbol ? _Symbol.iterator : undefined;

function toArray(value) {
  if (!value) {
    return [];
  }

  if (isArrayLike(value)) {
    return isString(value) ? stringToArray(value) : copyArray(value);
  }

  if (symIterator && value[symIterator]) {
    return iteratorToArray(value[symIterator]());
  }

  var tag = getTag$1(value),
      func = tag == mapTag$8 ? mapToArray : tag == setTag$8 ? setToArray : values;
  return func(value);
}

function wrapperNext() {
  if (this.__values__ === undefined) {
    this.__values__ = toArray(this.value());
  }

  var done = this.__index__ >= this.__values__.length,
      value = done ? undefined : this.__values__[this.__index__++];
  return {
    'done': done,
    'value': value
  };
}

function baseNth(array, n) {
  var length = array.length;

  if (!length) {
    return;
  }

  n += n < 0 ? length : 0;
  return isIndex(n, length) ? array[n] : undefined;
}

function nth(array, n) {
  return array && array.length ? baseNth(array, toInteger(n)) : undefined;
}

function nthArg(n) {
  n = toInteger(n);
  return baseRest(function (args) {
    return baseNth(args, n);
  });
}

function baseUnset(object, path) {
  path = castPath(path, object);
  object = parent(object, path);
  return object == null || delete object[toKey(last(path))];
}

function customOmitClone(value) {
  return isPlainObject(value) ? undefined : value;
}

var CLONE_DEEP_FLAG$7 = 1,
    CLONE_FLAT_FLAG$1 = 2,
    CLONE_SYMBOLS_FLAG$5 = 4;
var omit = flatRest(function (object, paths) {
  var result = {};

  if (object == null) {
    return result;
  }

  var isDeep = false;
  paths = arrayMap(paths, function (path) {
    path = castPath(path, object);
    isDeep || (isDeep = path.length > 1);
    return path;
  });
  copyObject(object, getAllKeysIn(object), result);

  if (isDeep) {
    result = baseClone(result, CLONE_DEEP_FLAG$7 | CLONE_FLAT_FLAG$1 | CLONE_SYMBOLS_FLAG$5, customOmitClone);
  }

  var length = paths.length;

  while (length--) {
    baseUnset(result, paths[length]);
  }

  return result;
});

function baseSet(object, path, value, customizer) {
  if (!isObject(object)) {
    return object;
  }

  path = castPath(path, object);
  var index = -1,
      length = path.length,
      lastIndex = length - 1,
      nested = object;

  while (nested != null && ++index < length) {
    var key = toKey(path[index]),
        newValue = value;

    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : undefined;

      if (newValue === undefined) {
        newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
      }
    }

    assignValue(nested, key, newValue);
    nested = nested[key];
  }

  return object;
}

function basePickBy(object, paths, predicate) {
  var index = -1,
      length = paths.length,
      result = {};

  while (++index < length) {
    var path = paths[index],
        value = baseGet(object, path);

    if (predicate(value, path)) {
      baseSet(result, castPath(path, object), value);
    }
  }

  return result;
}

function pickBy(object, predicate) {
  if (object == null) {
    return {};
  }

  var props = arrayMap(getAllKeysIn(object), function (prop) {
    return [prop];
  });
  predicate = baseIteratee(predicate);
  return basePickBy(object, props, function (value, path) {
    return predicate(value, path[0]);
  });
}

function omitBy(object, predicate) {
  return pickBy(object, negate(baseIteratee(predicate)));
}

function once(func) {
  return before(2, func);
}

function baseSortBy(array, comparer) {
  var length = array.length;
  array.sort(comparer);

  while (length--) {
    array[length] = array[length].value;
  }

  return array;
}

function compareAscending(value, other) {
  if (value !== other) {
    var valIsDefined = value !== undefined,
        valIsNull = value === null,
        valIsReflexive = value === value,
        valIsSymbol = isSymbol(value);
    var othIsDefined = other !== undefined,
        othIsNull = other === null,
        othIsReflexive = other === other,
        othIsSymbol = isSymbol(other);

    if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
      return 1;
    }

    if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
      return -1;
    }
  }

  return 0;
}

function compareMultiple(object, other, orders) {
  var index = -1,
      objCriteria = object.criteria,
      othCriteria = other.criteria,
      length = objCriteria.length,
      ordersLength = orders.length;

  while (++index < length) {
    var result = compareAscending(objCriteria[index], othCriteria[index]);

    if (result) {
      if (index >= ordersLength) {
        return result;
      }

      var order = orders[index];
      return result * (order == 'desc' ? -1 : 1);
    }
  }

  return object.index - other.index;
}

function baseOrderBy(collection, iteratees, orders) {
  var index = -1;
  iteratees = arrayMap(iteratees.length ? iteratees : [identity], baseUnary(baseIteratee));
  var result = baseMap(collection, function (value, key, collection) {
    var criteria = arrayMap(iteratees, function (iteratee) {
      return iteratee(value);
    });
    return {
      'criteria': criteria,
      'index': ++index,
      'value': value
    };
  });
  return baseSortBy(result, function (object, other) {
    return compareMultiple(object, other, orders);
  });
}

function orderBy(collection, iteratees, orders, guard) {
  if (collection == null) {
    return [];
  }

  if (!isArray(iteratees)) {
    iteratees = iteratees == null ? [] : [iteratees];
  }

  orders = guard ? undefined : orders;

  if (!isArray(orders)) {
    orders = orders == null ? [] : [orders];
  }

  return baseOrderBy(collection, iteratees, orders);
}

function createOver(arrayFunc) {
  return flatRest(function (iteratees) {
    iteratees = arrayMap(iteratees, baseUnary(baseIteratee));
    return baseRest(function (args) {
      var thisArg = this;
      return arrayFunc(iteratees, function (iteratee) {
        return apply(iteratee, thisArg, args);
      });
    });
  });
}

var over = createOver(arrayMap);
var castRest = baseRest;
var nativeMin$8 = Math.min;
var overArgs = castRest(function (func, transforms) {
  transforms = transforms.length == 1 && isArray(transforms[0]) ? arrayMap(transforms[0], baseUnary(baseIteratee)) : arrayMap(baseFlatten(transforms, 1), baseUnary(baseIteratee));
  var funcsLength = transforms.length;
  return baseRest(function (args) {
    var index = -1,
        length = nativeMin$8(args.length, funcsLength);

    while (++index < length) {
      args[index] = transforms[index].call(this, args[index]);
    }

    return apply(func, this, args);
  });
});
var overEvery = createOver(arrayEvery);
var overSome = createOver(arraySome);
var MAX_SAFE_INTEGER$3 = 9007199254740991;
var nativeFloor = Math.floor;

function baseRepeat(string, n) {
  var result = '';

  if (!string || n < 1 || n > MAX_SAFE_INTEGER$3) {
    return result;
  }

  do {
    if (n % 2) {
      result += string;
    }

    n = nativeFloor(n / 2);

    if (n) {
      string += string;
    }
  } while (n);

  return result;
}

var asciiSize = baseProperty('length');
var rsAstralRange$3 = "\\ud800-\\udfff",
    rsComboMarksRange$4 = "\\u0300-\\u036f",
    reComboHalfMarksRange$4 = "\\ufe20-\\ufe2f",
    rsComboSymbolsRange$4 = "\\u20d0-\\u20ff",
    rsComboRange$4 = rsComboMarksRange$4 + reComboHalfMarksRange$4 + rsComboSymbolsRange$4,
    rsVarRange$3 = "\\ufe0e\\ufe0f";
var rsAstral$1 = '[' + rsAstralRange$3 + ']',
    rsCombo$3 = '[' + rsComboRange$4 + ']',
    rsFitz$2 = "\\ud83c[\\udffb-\\udfff]",
    rsModifier$2 = '(?:' + rsCombo$3 + '|' + rsFitz$2 + ')',
    rsNonAstral$2 = '[^' + rsAstralRange$3 + ']',
    rsRegional$2 = "(?:\\ud83c[\\udde6-\\uddff]){2}",
    rsSurrPair$2 = "[\\ud800-\\udbff][\\udc00-\\udfff]",
    rsZWJ$3 = "\\u200d";
var reOptMod$2 = rsModifier$2 + '?',
    rsOptVar$2 = '[' + rsVarRange$3 + ']?',
    rsOptJoin$2 = '(?:' + rsZWJ$3 + '(?:' + [rsNonAstral$2, rsRegional$2, rsSurrPair$2].join('|') + ')' + rsOptVar$2 + reOptMod$2 + ')*',
    rsSeq$2 = rsOptVar$2 + reOptMod$2 + rsOptJoin$2,
    rsSymbol$1 = '(?:' + [rsNonAstral$2 + rsCombo$3 + '?', rsCombo$3, rsRegional$2, rsSurrPair$2, rsAstral$1].join('|') + ')';
var reUnicode$1 = RegExp(rsFitz$2 + '(?=' + rsFitz$2 + ')|' + rsSymbol$1 + rsSeq$2, 'g');

function unicodeSize(string) {
  var result = reUnicode$1.lastIndex = 0;

  while (reUnicode$1.test(string)) {
    ++result;
  }

  return result;
}

function stringSize(string) {
  return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
}

var nativeCeil$1 = Math.ceil;

function createPadding(length, chars) {
  chars = chars === undefined ? ' ' : baseToString(chars);
  var charsLength = chars.length;

  if (charsLength < 2) {
    return charsLength ? baseRepeat(chars, length) : chars;
  }

  var result = baseRepeat(chars, nativeCeil$1(length / stringSize(chars)));
  return hasUnicode(chars) ? castSlice(stringToArray(result), 0, length).join('') : result.slice(0, length);
}

var nativeCeil$2 = Math.ceil,
    nativeFloor$1 = Math.floor;

function pad(string, length, chars) {
  string = toString(string);
  length = toInteger(length);
  var strLength = length ? stringSize(string) : 0;

  if (!length || strLength >= length) {
    return string;
  }

  var mid = (length - strLength) / 2;
  return createPadding(nativeFloor$1(mid), chars) + string + createPadding(nativeCeil$2(mid), chars);
}

function padEnd(string, length, chars) {
  string = toString(string);
  length = toInteger(length);
  var strLength = length ? stringSize(string) : 0;
  return length && strLength < length ? string + createPadding(length - strLength, chars) : string;
}

function padStart(string, length, chars) {
  string = toString(string);
  length = toInteger(length);
  var strLength = length ? stringSize(string) : 0;
  return length && strLength < length ? createPadding(length - strLength, chars) + string : string;
}

var reTrimStart = /^\s+/;
var nativeParseInt = root.parseInt;

function parseInt$1(string, radix, guard) {
  if (guard || radix == null) {
    radix = 0;
  } else if (radix) {
    radix = +radix;
  }

  return nativeParseInt(toString(string).replace(reTrimStart, ''), radix || 0);
}

var WRAP_PARTIAL_FLAG$6 = 32;
var partial = baseRest(function (func, partials) {
  var holders = replaceHolders(partials, getHolder(partial));
  return createWrap(func, WRAP_PARTIAL_FLAG$6, undefined, partials, holders);
});
partial.placeholder = {};
var WRAP_PARTIAL_RIGHT_FLAG$3 = 64;
var partialRight = baseRest(function (func, partials) {
  var holders = replaceHolders(partials, getHolder(partialRight));
  return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG$3, undefined, partials, holders);
});
partialRight.placeholder = {};
var partition = createAggregator(function (result, value, key) {
  result[key ? 0 : 1].push(value);
}, function () {
  return [[], []];
});

function basePick(object, paths) {
  return basePickBy(object, paths, function (value, path) {
    return hasIn(object, path);
  });
}

var pick = flatRest(function (object, paths) {
  return object == null ? {} : basePick(object, paths);
});

function wrapperPlant(value) {
  var result,
      parent = this;

  while (parent instanceof baseLodash) {
    var clone = wrapperClone(parent);
    clone.__index__ = 0;
    clone.__values__ = undefined;

    if (result) {
      previous.__wrapped__ = clone;
    } else {
      result = clone;
    }

    var previous = clone;
    parent = parent.__wrapped__;
  }

  previous.__wrapped__ = value;
  return result;
}

function propertyOf(object) {
  return function (path) {
    return object == null ? undefined : baseGet(object, path);
  };
}

function baseIndexOfWith(array, value, fromIndex, comparator) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (comparator(array[index], value)) {
      return index;
    }
  }

  return -1;
}

var arrayProto$2 = Array.prototype;
var splice$1 = arrayProto$2.splice;

function basePullAll(array, values, iteratee, comparator) {
  var indexOf = comparator ? baseIndexOfWith : baseIndexOf,
      index = -1,
      length = values.length,
      seen = array;

  if (array === values) {
    values = copyArray(values);
  }

  if (iteratee) {
    seen = arrayMap(array, baseUnary(iteratee));
  }

  while (++index < length) {
    var fromIndex = 0,
        value = values[index],
        computed = iteratee ? iteratee(value) : value;

    while ((fromIndex = indexOf(seen, computed, fromIndex, comparator)) > -1) {
      if (seen !== array) {
        splice$1.call(seen, fromIndex, 1);
      }

      splice$1.call(array, fromIndex, 1);
    }
  }

  return array;
}

function pullAll(array, values) {
  return array && array.length && values && values.length ? basePullAll(array, values) : array;
}

var pull = baseRest(pullAll);

function pullAllBy(array, values, iteratee) {
  return array && array.length && values && values.length ? basePullAll(array, values, baseIteratee(iteratee, 2)) : array;
}

function pullAllWith(array, values, comparator) {
  return array && array.length && values && values.length ? basePullAll(array, values, undefined, comparator) : array;
}

var arrayProto$3 = Array.prototype;
var splice$2 = arrayProto$3.splice;

function basePullAt(array, indexes) {
  var length = array ? indexes.length : 0,
      lastIndex = length - 1;

  while (length--) {
    var index = indexes[length];

    if (length == lastIndex || index !== previous) {
      var previous = index;

      if (isIndex(index)) {
        splice$2.call(array, index, 1);
      } else {
        baseUnset(array, index);
      }
    }
  }

  return array;
}

var pullAt = flatRest(function (array, indexes) {
  var length = array == null ? 0 : array.length,
      result = baseAt(array, indexes);
  basePullAt(array, arrayMap(indexes, function (index) {
    return isIndex(index, length) ? +index : index;
  }).sort(compareAscending));
  return result;
});
var nativeFloor$2 = Math.floor,
    nativeRandom = Math.random;

function baseRandom(lower, upper) {
  return lower + nativeFloor$2(nativeRandom() * (upper - lower + 1));
}

var freeParseFloat = parseFloat;
var nativeMin$9 = Math.min,
    nativeRandom$1 = Math.random;

function random(lower, upper, floating) {
  if (floating && typeof floating != 'boolean' && isIterateeCall(lower, upper, floating)) {
    upper = floating = undefined;
  }

  if (floating === undefined) {
    if (typeof upper == 'boolean') {
      floating = upper;
      upper = undefined;
    } else if (typeof lower == 'boolean') {
      floating = lower;
      lower = undefined;
    }
  }

  if (lower === undefined && upper === undefined) {
    lower = 0;
    upper = 1;
  } else {
    lower = toFinite(lower);

    if (upper === undefined) {
      upper = lower;
      lower = 0;
    } else {
      upper = toFinite(upper);
    }
  }

  if (lower > upper) {
    var temp = lower;
    lower = upper;
    upper = temp;
  }

  if (floating || lower % 1 || upper % 1) {
    var rand = nativeRandom$1();
    return nativeMin$9(lower + rand * (upper - lower + freeParseFloat('1e-' + ((rand + '').length - 1))), upper);
  }

  return baseRandom(lower, upper);
}

var nativeCeil$3 = Math.ceil,
    nativeMax$c = Math.max;

function baseRange(start, end, step, fromRight) {
  var index = -1,
      length = nativeMax$c(nativeCeil$3((end - start) / (step || 1)), 0),
      result = Array(length);

  while (length--) {
    result[fromRight ? length : ++index] = start;
    start += step;
  }

  return result;
}

function createRange(fromRight) {
  return function (start, end, step) {
    if (step && typeof step != 'number' && isIterateeCall(start, end, step)) {
      end = step = undefined;
    }

    start = toFinite(start);

    if (end === undefined) {
      end = start;
      start = 0;
    } else {
      end = toFinite(end);
    }

    step = step === undefined ? start < end ? 1 : -1 : toFinite(step);
    return baseRange(start, end, step, fromRight);
  };
}

var range = createRange();
var rangeRight = createRange(true);
var WRAP_REARG_FLAG$3 = 256;
var rearg = flatRest(function (func, indexes) {
  return createWrap(func, WRAP_REARG_FLAG$3, undefined, undefined, undefined, indexes);
});

function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
  eachFunc(collection, function (value, index, collection) {
    accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection);
  });
  return accumulator;
}

function reduce(collection, iteratee, accumulator) {
  var func = isArray(collection) ? arrayReduce : baseReduce,
      initAccum = arguments.length < 3;
  return func(collection, baseIteratee(iteratee, 4), accumulator, initAccum, baseEach);
}

function arrayReduceRight(array, iteratee, accumulator, initAccum) {
  var length = array == null ? 0 : array.length;

  if (initAccum && length) {
    accumulator = array[--length];
  }

  while (length--) {
    accumulator = iteratee(accumulator, array[length], length, array);
  }

  return accumulator;
}

function reduceRight(collection, iteratee, accumulator) {
  var func = isArray(collection) ? arrayReduceRight : baseReduce,
      initAccum = arguments.length < 3;
  return func(collection, baseIteratee(iteratee, 4), accumulator, initAccum, baseEachRight);
}

function reject(collection, predicate) {
  var func = isArray(collection) ? arrayFilter : baseFilter;
  return func(collection, negate(baseIteratee(predicate, 3)));
}

function remove(array, predicate) {
  var result = [];

  if (!(array && array.length)) {
    return result;
  }

  var index = -1,
      indexes = [],
      length = array.length;
  predicate = baseIteratee(predicate, 3);

  while (++index < length) {
    var value = array[index];

    if (predicate(value, index, array)) {
      result.push(value);
      indexes.push(index);
    }
  }

  basePullAt(array, indexes);
  return result;
}

function repeat(string, n, guard) {
  if (guard ? isIterateeCall(string, n, guard) : n === undefined) {
    n = 1;
  } else {
    n = toInteger(n);
  }

  return baseRepeat(toString(string), n);
}

function replace() {
  var args = arguments,
      string = toString(args[0]);
  return args.length < 3 ? string : string.replace(args[1], args[2]);
}

var FUNC_ERROR_TEXT$9 = 'Expected a function';

function rest(func, start) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT$9);
  }

  start = start === undefined ? start : toInteger(start);
  return baseRest(func, start);
}

function result(object, path, defaultValue) {
  path = castPath(path, object);
  var index = -1,
      length = path.length;

  if (!length) {
    length = 1;
    object = undefined;
  }

  while (++index < length) {
    var value = object == null ? undefined : object[toKey(path[index])];

    if (value === undefined) {
      index = length;
      value = defaultValue;
    }

    object = isFunction(value) ? value.call(object) : value;
  }

  return object;
}

var arrayProto$4 = Array.prototype;
var nativeReverse = arrayProto$4.reverse;

function reverse(array) {
  return array == null ? array : nativeReverse.call(array);
}

var round = createRound('round');

function arraySample(array) {
  var length = array.length;
  return length ? array[baseRandom(0, length - 1)] : undefined;
}

function baseSample(collection) {
  return arraySample(values(collection));
}

function sample(collection) {
  var func = isArray(collection) ? arraySample : baseSample;
  return func(collection);
}

function shuffleSelf(array, size) {
  var index = -1,
      length = array.length,
      lastIndex = length - 1;
  size = size === undefined ? length : size;

  while (++index < size) {
    var rand = baseRandom(index, lastIndex),
        value = array[rand];
    array[rand] = array[index];
    array[index] = value;
  }

  array.length = size;
  return array;
}

function arraySampleSize(array, n) {
  return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
}

function baseSampleSize(collection, n) {
  var array = values(collection);
  return shuffleSelf(array, baseClamp(n, 0, array.length));
}

function sampleSize(collection, n, guard) {
  if (guard ? isIterateeCall(collection, n, guard) : n === undefined) {
    n = 1;
  } else {
    n = toInteger(n);
  }

  var func = isArray(collection) ? arraySampleSize : baseSampleSize;
  return func(collection, n);
}

function set(object, path, value) {
  return object == null ? object : baseSet(object, path, value);
}

function setWith(object, path, value, customizer) {
  customizer = typeof customizer == 'function' ? customizer : undefined;
  return object == null ? object : baseSet(object, path, value, customizer);
}

function arrayShuffle(array) {
  return shuffleSelf(copyArray(array));
}

function baseShuffle(collection) {
  return shuffleSelf(values(collection));
}

function shuffle(collection) {
  var func = isArray(collection) ? arrayShuffle : baseShuffle;
  return func(collection);
}

var mapTag$9 = '[object Map]',
    setTag$9 = '[object Set]';

function size(collection) {
  if (collection == null) {
    return 0;
  }

  if (isArrayLike(collection)) {
    return isString(collection) ? stringSize(collection) : collection.length;
  }

  var tag = getTag$1(collection);

  if (tag == mapTag$9 || tag == setTag$9) {
    return collection.size;
  }

  return baseKeys(collection).length;
}

function slice(array, start, end) {
  var length = array == null ? 0 : array.length;

  if (!length) {
    return [];
  }

  if (end && typeof end != 'number' && isIterateeCall(array, start, end)) {
    start = 0;
    end = length;
  } else {
    start = start == null ? 0 : toInteger(start);
    end = end === undefined ? length : toInteger(end);
  }

  return baseSlice(array, start, end);
}

var snakeCase = createCompounder(function (result, word, index) {
  return result + (index ? '_' : '') + word.toLowerCase();
});

function baseSome(collection, predicate) {
  var result;
  baseEach(collection, function (value, index, collection) {
    result = predicate(value, index, collection);
    return !result;
  });
  return !!result;
}

function some(collection, predicate, guard) {
  var func = isArray(collection) ? arraySome : baseSome;

  if (guard && isIterateeCall(collection, predicate, guard)) {
    predicate = undefined;
  }

  return func(collection, baseIteratee(predicate, 3));
}

var sortBy = baseRest(function (collection, iteratees) {
  if (collection == null) {
    return [];
  }

  var length = iteratees.length;

  if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
    iteratees = [];
  } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
    iteratees = [iteratees[0]];
  }

  return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
});
var MAX_ARRAY_LENGTH$2 = 4294967295,
    MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH$2 - 1;
var nativeFloor$3 = Math.floor,
    nativeMin$a = Math.min;

function baseSortedIndexBy(array, value, iteratee, retHighest) {
  value = iteratee(value);
  var low = 0,
      high = array == null ? 0 : array.length,
      valIsNaN = value !== value,
      valIsNull = value === null,
      valIsSymbol = isSymbol(value),
      valIsUndefined = value === undefined;

  while (low < high) {
    var mid = nativeFloor$3((low + high) / 2),
        computed = iteratee(array[mid]),
        othIsDefined = computed !== undefined,
        othIsNull = computed === null,
        othIsReflexive = computed === computed,
        othIsSymbol = isSymbol(computed);

    if (valIsNaN) {
      var setLow = retHighest || othIsReflexive;
    } else if (valIsUndefined) {
      setLow = othIsReflexive && (retHighest || othIsDefined);
    } else if (valIsNull) {
      setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
    } else if (valIsSymbol) {
      setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
    } else if (othIsNull || othIsSymbol) {
      setLow = false;
    } else {
      setLow = retHighest ? computed <= value : computed < value;
    }

    if (setLow) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return nativeMin$a(high, MAX_ARRAY_INDEX);
}

var MAX_ARRAY_LENGTH$3 = 4294967295,
    HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH$3 >>> 1;

function baseSortedIndex(array, value, retHighest) {
  var low = 0,
      high = array == null ? low : array.length;

  if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
    while (low < high) {
      var mid = low + high >>> 1,
          computed = array[mid];

      if (computed !== null && !isSymbol(computed) && (retHighest ? computed <= value : computed < value)) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }

    return high;
  }

  return baseSortedIndexBy(array, value, identity, retHighest);
}

function sortedIndex(array, value) {
  return baseSortedIndex(array, value);
}

function sortedIndexBy(array, value, iteratee) {
  return baseSortedIndexBy(array, value, baseIteratee(iteratee, 2));
}

function sortedIndexOf(array, value) {
  var length = array == null ? 0 : array.length;

  if (length) {
    var index = baseSortedIndex(array, value);

    if (index < length && eq(array[index], value)) {
      return index;
    }
  }

  return -1;
}

function sortedLastIndex(array, value) {
  return baseSortedIndex(array, value, true);
}

function sortedLastIndexBy(array, value, iteratee) {
  return baseSortedIndexBy(array, value, baseIteratee(iteratee, 2), true);
}

function sortedLastIndexOf(array, value) {
  var length = array == null ? 0 : array.length;

  if (length) {
    var index = baseSortedIndex(array, value, true) - 1;

    if (eq(array[index], value)) {
      return index;
    }
  }

  return -1;
}

function baseSortedUniq(array, iteratee) {
  var index = -1,
      length = array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    if (!index || !eq(computed, seen)) {
      var seen = computed;
      result[resIndex++] = value === 0 ? 0 : value;
    }
  }

  return result;
}

function sortedUniq(array) {
  return array && array.length ? baseSortedUniq(array) : [];
}

function sortedUniqBy(array, iteratee) {
  return array && array.length ? baseSortedUniq(array, baseIteratee(iteratee, 2)) : [];
}

var MAX_ARRAY_LENGTH$4 = 4294967295;

function split(string, separator, limit) {
  if (limit && typeof limit != 'number' && isIterateeCall(string, separator, limit)) {
    separator = limit = undefined;
  }

  limit = limit === undefined ? MAX_ARRAY_LENGTH$4 : limit >>> 0;

  if (!limit) {
    return [];
  }

  string = toString(string);

  if (string && (typeof separator == 'string' || separator != null && !isRegExp(separator))) {
    separator = baseToString(separator);

    if (!separator && hasUnicode(string)) {
      return castSlice(stringToArray(string), 0, limit);
    }
  }

  return string.split(separator, limit);
}

var FUNC_ERROR_TEXT$a = 'Expected a function';
var nativeMax$d = Math.max;

function spread(func, start) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT$a);
  }

  start = start == null ? 0 : nativeMax$d(toInteger(start), 0);
  return baseRest(function (args) {
    var array = args[start],
        otherArgs = castSlice(args, 0, start);

    if (array) {
      arrayPush(otherArgs, array);
    }

    return apply(func, this, otherArgs);
  });
}

var startCase = createCompounder(function (result, word, index) {
  return result + (index ? ' ' : '') + upperFirst(word);
});

function startsWith(string, target, position) {
  string = toString(string);
  position = position == null ? 0 : baseClamp(toInteger(position), 0, string.length);
  target = baseToString(target);
  return string.slice(position, position + target.length) == target;
}

function stubObject() {
  return {};
}

function stubString() {
  return '';
}

function stubTrue() {
  return true;
}

var subtract = createMathOperation(function (minuend, subtrahend) {
  return minuend - subtrahend;
}, 0);

function sum(array) {
  return array && array.length ? baseSum(array, identity) : 0;
}

function sumBy(array, iteratee) {
  return array && array.length ? baseSum(array, baseIteratee(iteratee, 2)) : 0;
}

function tail(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseSlice(array, 1, length) : [];
}

function take(array, n, guard) {
  if (!(array && array.length)) {
    return [];
  }

  n = guard || n === undefined ? 1 : toInteger(n);
  return baseSlice(array, 0, n < 0 ? 0 : n);
}

function takeRight(array, n, guard) {
  var length = array == null ? 0 : array.length;

  if (!length) {
    return [];
  }

  n = guard || n === undefined ? 1 : toInteger(n);
  n = length - n;
  return baseSlice(array, n < 0 ? 0 : n, length);
}

function takeRightWhile(array, predicate) {
  return array && array.length ? baseWhile(array, baseIteratee(predicate, 3), false, true) : [];
}

function takeWhile(array, predicate) {
  return array && array.length ? baseWhile(array, baseIteratee(predicate, 3)) : [];
}

function tap(value, interceptor) {
  interceptor(value);
  return value;
}

var objectProto$q = Object.prototype;
var hasOwnProperty$m = objectProto$q.hasOwnProperty;

function customDefaultsAssignIn(objValue, srcValue, key, object) {
  if (objValue === undefined || eq(objValue, objectProto$q[key]) && !hasOwnProperty$m.call(object, key)) {
    return srcValue;
  }

  return objValue;
}

var stringEscapes = {
  '\\': '\\',
  "'": "'",
  '\n': 'n',
  '\r': 'r',
  "\u2028": 'u2028',
  "\u2029": 'u2029'
};

function escapeStringChar(chr) {
  return '\\' + stringEscapes[chr];
}

var reInterpolate = /<%=([\s\S]+?)%>/g;
var reEscape = /<%-([\s\S]+?)%>/g;
var reEvaluate = /<%([\s\S]+?)%>/g;
var templateSettings = {
  'escape': reEscape,
  'evaluate': reEvaluate,
  'interpolate': reInterpolate,
  'variable': '',
  'imports': {
    '_': {
      'escape': escape
    }
  }
};
var reEmptyStringLeading = /\b__p \+= '';/g,
    reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
    reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
var reNoMatch = /($^)/;
var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
var objectProto$r = Object.prototype;
var hasOwnProperty$n = objectProto$r.hasOwnProperty;

function template(string, options, guard) {
  var settings = templateSettings.imports._.templateSettings || templateSettings;

  if (guard && isIterateeCall(string, options, guard)) {
    options = undefined;
  }

  string = toString(string);
  options = assignInWith({}, options, settings, customDefaultsAssignIn);
  var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn),
      importsKeys = keys(imports),
      importsValues = baseValues(imports, importsKeys);
  var isEscaping,
      isEvaluating,
      index = 0,
      interpolate = options.interpolate || reNoMatch,
      source = "__p += '";
  var reDelimiters = RegExp((options.escape || reNoMatch).source + '|' + interpolate.source + '|' + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' + (options.evaluate || reNoMatch).source + '|$', 'g');
  var sourceURL = hasOwnProperty$n.call(options, 'sourceURL') ? '//# sourceURL=' + (options.sourceURL + '').replace(/[\r\n]/g, ' ') + '\n' : '';
  string.replace(reDelimiters, function (match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
    interpolateValue || (interpolateValue = esTemplateValue);
    source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);

    if (escapeValue) {
      isEscaping = true;
      source += "' +\n__e(" + escapeValue + ") +\n'";
    }

    if (evaluateValue) {
      isEvaluating = true;
      source += "';\n" + evaluateValue + ";\n__p += '";
    }

    if (interpolateValue) {
      source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
    }

    index = offset + match.length;
    return match;
  });
  source += "';\n";
  var variable = hasOwnProperty$n.call(options, 'variable') && options.variable;

  if (!variable) {
    source = 'with (obj) {\n' + source + '\n}\n';
  }

  source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source).replace(reEmptyStringMiddle, '$1').replace(reEmptyStringTrailing, '$1;');
  source = 'function(' + (variable || 'obj') + ') {\n' + (variable ? '' : 'obj || (obj = {});\n') + "var __t, __p = ''" + (isEscaping ? ', __e = _.escape' : '') + (isEvaluating ? ', __j = Array.prototype.join;\n' + "function print() { __p += __j.call(arguments, '') }\n" : ';\n') + source + 'return __p\n}';
  var result = attempt(function () {
    return Function(importsKeys, sourceURL + 'return ' + source).apply(undefined, importsValues);
  });
  result.source = source;

  if (isError(result)) {
    throw result;
  }

  return result;
}

var FUNC_ERROR_TEXT$b = 'Expected a function';

function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT$b);
  }

  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

function thru(value, interceptor) {
  return interceptor(value);
}

var MAX_SAFE_INTEGER$4 = 9007199254740991;
var MAX_ARRAY_LENGTH$5 = 4294967295;
var nativeMin$b = Math.min;

function times(n, iteratee) {
  n = toInteger(n);

  if (n < 1 || n > MAX_SAFE_INTEGER$4) {
    return [];
  }

  var index = MAX_ARRAY_LENGTH$5,
      length = nativeMin$b(n, MAX_ARRAY_LENGTH$5);
  iteratee = castFunction(iteratee);
  n -= MAX_ARRAY_LENGTH$5;
  var result = baseTimes(length, iteratee);

  while (++index < n) {
    iteratee(index);
  }

  return result;
}

function wrapperToIterator() {
  return this;
}

function baseWrapperValue(value, actions) {
  var result = value;

  if (result instanceof LazyWrapper) {
    result = result.value();
  }

  return arrayReduce(actions, function (result, action) {
    return action.func.apply(action.thisArg, arrayPush([result], action.args));
  }, result);
}

function wrapperValue() {
  return baseWrapperValue(this.__wrapped__, this.__actions__);
}

function toLower(value) {
  return toString(value).toLowerCase();
}

function toPath(value) {
  if (isArray(value)) {
    return arrayMap(value, toKey);
  }

  return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
}

var MAX_SAFE_INTEGER$5 = 9007199254740991;

function toSafeInteger(value) {
  return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER$5, MAX_SAFE_INTEGER$5) : value === 0 ? value : 0;
}

function toUpper(value) {
  return toString(value).toUpperCase();
}

function transform(object, iteratee, accumulator) {
  var isArr = isArray(object),
      isArrLike = isArr || isBuffer(object) || isTypedArray(object);
  iteratee = baseIteratee(iteratee, 4);

  if (accumulator == null) {
    var Ctor = object && object.constructor;

    if (isArrLike) {
      accumulator = isArr ? new Ctor() : [];
    } else if (isObject(object)) {
      accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
    } else {
      accumulator = {};
    }
  }

  (isArrLike ? arrayEach : baseForOwn)(object, function (value, index, object) {
    return iteratee(accumulator, value, index, object);
  });
  return accumulator;
}

function charsEndIndex(strSymbols, chrSymbols) {
  var index = strSymbols.length;

  while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}

  return index;
}

function charsStartIndex(strSymbols, chrSymbols) {
  var index = -1,
      length = strSymbols.length;

  while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}

  return index;
}

var reTrim$1 = /^\s+|\s+$/g;

function trim(string, chars, guard) {
  string = toString(string);

  if (string && (guard || chars === undefined)) {
    return string.replace(reTrim$1, '');
  }

  if (!string || !(chars = baseToString(chars))) {
    return string;
  }

  var strSymbols = stringToArray(string),
      chrSymbols = stringToArray(chars),
      start = charsStartIndex(strSymbols, chrSymbols),
      end = charsEndIndex(strSymbols, chrSymbols) + 1;
  return castSlice(strSymbols, start, end).join('');
}

var reTrimEnd = /\s+$/;

function trimEnd(string, chars, guard) {
  string = toString(string);

  if (string && (guard || chars === undefined)) {
    return string.replace(reTrimEnd, '');
  }

  if (!string || !(chars = baseToString(chars))) {
    return string;
  }

  var strSymbols = stringToArray(string),
      end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
  return castSlice(strSymbols, 0, end).join('');
}

var reTrimStart$1 = /^\s+/;

function trimStart(string, chars, guard) {
  string = toString(string);

  if (string && (guard || chars === undefined)) {
    return string.replace(reTrimStart$1, '');
  }

  if (!string || !(chars = baseToString(chars))) {
    return string;
  }

  var strSymbols = stringToArray(string),
      start = charsStartIndex(strSymbols, stringToArray(chars));
  return castSlice(strSymbols, start).join('');
}

var DEFAULT_TRUNC_LENGTH = 30,
    DEFAULT_TRUNC_OMISSION = '...';
var reFlags$1 = /\w*$/;

function truncate(string, options) {
  var length = DEFAULT_TRUNC_LENGTH,
      omission = DEFAULT_TRUNC_OMISSION;

  if (isObject(options)) {
    var separator = 'separator' in options ? options.separator : separator;
    length = 'length' in options ? toInteger(options.length) : length;
    omission = 'omission' in options ? baseToString(options.omission) : omission;
  }

  string = toString(string);
  var strLength = string.length;

  if (hasUnicode(string)) {
    var strSymbols = stringToArray(string);
    strLength = strSymbols.length;
  }

  if (length >= strLength) {
    return string;
  }

  var end = length - stringSize(omission);

  if (end < 1) {
    return omission;
  }

  var result = strSymbols ? castSlice(strSymbols, 0, end).join('') : string.slice(0, end);

  if (separator === undefined) {
    return result + omission;
  }

  if (strSymbols) {
    end += result.length - end;
  }

  if (isRegExp(separator)) {
    if (string.slice(end).search(separator)) {
      var match,
          substring = result;

      if (!separator.global) {
        separator = RegExp(separator.source, toString(reFlags$1.exec(separator)) + 'g');
      }

      separator.lastIndex = 0;

      while (match = separator.exec(substring)) {
        var newEnd = match.index;
      }

      result = result.slice(0, newEnd === undefined ? end : newEnd);
    }
  } else if (string.indexOf(baseToString(separator), end) != end) {
    var index = result.lastIndexOf(separator);

    if (index > -1) {
      result = result.slice(0, index);
    }
  }

  return result + omission;
}

function unary(func) {
  return ary(func, 1);
}

var htmlUnescapes = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'"
};
var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g,
    reHasEscapedHtml = RegExp(reEscapedHtml.source);

function unescape(string) {
  string = toString(string);
  return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
}

var INFINITY$5 = 1 / 0;
var createSet = !(Set && 1 / setToArray(new Set([, -0]))[1] == INFINITY$5) ? noop : function (values) {
  return new Set(values);
};
var LARGE_ARRAY_SIZE$2 = 200;

function baseUniq(array, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      length = array.length,
      isCommon = true,
      result = [],
      seen = result;

  if (comparator) {
    isCommon = false;
    includes = arrayIncludesWith;
  } else if (length >= LARGE_ARRAY_SIZE$2) {
    var set = iteratee ? null : createSet(array);

    if (set) {
      return setToArray(set);
    }

    isCommon = false;
    includes = cacheHas;
    seen = new SetCache();
  } else {
    seen = iteratee ? [] : result;
  }

  outer: while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;
    value = comparator || value !== 0 ? value : 0;

    if (isCommon && computed === computed) {
      var seenIndex = seen.length;

      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }

      if (iteratee) {
        seen.push(computed);
      }

      result.push(value);
    } else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed);
      }

      result.push(value);
    }
  }

  return result;
}

var union = baseRest(function (arrays) {
  return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
});
var unionBy = baseRest(function (arrays) {
  var iteratee = last(arrays);

  if (isArrayLikeObject(iteratee)) {
    iteratee = undefined;
  }

  return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), baseIteratee(iteratee, 2));
});
var unionWith = baseRest(function (arrays) {
  var comparator = last(arrays);
  comparator = typeof comparator == 'function' ? comparator : undefined;
  return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined, comparator);
});

function uniq(array) {
  return array && array.length ? baseUniq(array) : [];
}

function uniqBy(array, iteratee) {
  return array && array.length ? baseUniq(array, baseIteratee(iteratee, 2)) : [];
}

function uniqWith(array, comparator) {
  comparator = typeof comparator == 'function' ? comparator : undefined;
  return array && array.length ? baseUniq(array, undefined, comparator) : [];
}

var idCounter = 0;

function uniqueId(prefix) {
  var id = ++idCounter;
  return toString(prefix) + id;
}

function unset(object, path) {
  return object == null ? true : baseUnset(object, path);
}

var nativeMax$e = Math.max;

function unzip(array) {
  if (!(array && array.length)) {
    return [];
  }

  var length = 0;
  array = arrayFilter(array, function (group) {
    if (isArrayLikeObject(group)) {
      length = nativeMax$e(group.length, length);
      return true;
    }
  });
  return baseTimes(length, function (index) {
    return arrayMap(array, baseProperty(index));
  });
}

function unzipWith(array, iteratee) {
  if (!(array && array.length)) {
    return [];
  }

  var result = unzip(array);

  if (iteratee == null) {
    return result;
  }

  return arrayMap(result, function (group) {
    return apply(iteratee, undefined, group);
  });
}

function baseUpdate(object, path, updater, customizer) {
  return baseSet(object, path, updater(baseGet(object, path)), customizer);
}

function update(object, path, updater) {
  return object == null ? object : baseUpdate(object, path, castFunction(updater));
}

function updateWith(object, path, updater, customizer) {
  customizer = typeof customizer == 'function' ? customizer : undefined;
  return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
}

var upperCase = createCompounder(function (result, word, index) {
  return result + (index ? ' ' : '') + word.toUpperCase();
});

function valuesIn(object) {
  return object == null ? [] : baseValues(object, keysIn$1(object));
}

var without = baseRest(function (array, values) {
  return isArrayLikeObject(array) ? baseDifference(array, values) : [];
});

function wrap(value, wrapper) {
  return partial(castFunction(wrapper), value);
}

var wrapperAt = flatRest(function (paths) {
  var length = paths.length,
      start = length ? paths[0] : 0,
      value = this.__wrapped__,
      interceptor = function interceptor(object) {
    return baseAt(object, paths);
  };

  if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex(start)) {
    return this.thru(interceptor);
  }

  value = value.slice(start, +start + (length ? 1 : 0));

  value.__actions__.push({
    'func': thru,
    'args': [interceptor],
    'thisArg': undefined
  });

  return new LodashWrapper(value, this.__chain__).thru(function (array) {
    if (length && !array.length) {
      array.push(undefined);
    }

    return array;
  });
});

function wrapperChain() {
  return chain(this);
}

function wrapperReverse() {
  var value = this.__wrapped__;

  if (value instanceof LazyWrapper) {
    var wrapped = value;

    if (this.__actions__.length) {
      wrapped = new LazyWrapper(this);
    }

    wrapped = wrapped.reverse();

    wrapped.__actions__.push({
      'func': thru,
      'args': [reverse],
      'thisArg': undefined
    });

    return new LodashWrapper(wrapped, this.__chain__);
  }

  return this.thru(reverse);
}

function baseXor(arrays, iteratee, comparator) {
  var length = arrays.length;

  if (length < 2) {
    return length ? baseUniq(arrays[0]) : [];
  }

  var index = -1,
      result = Array(length);

  while (++index < length) {
    var array = arrays[index],
        othIndex = -1;

    while (++othIndex < length) {
      if (othIndex != index) {
        result[index] = baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator);
      }
    }
  }

  return baseUniq(baseFlatten(result, 1), iteratee, comparator);
}

var xor = baseRest(function (arrays) {
  return baseXor(arrayFilter(arrays, isArrayLikeObject));
});
var xorBy = baseRest(function (arrays) {
  var iteratee = last(arrays);

  if (isArrayLikeObject(iteratee)) {
    iteratee = undefined;
  }

  return baseXor(arrayFilter(arrays, isArrayLikeObject), baseIteratee(iteratee, 2));
});
var xorWith = baseRest(function (arrays) {
  var comparator = last(arrays);
  comparator = typeof comparator == 'function' ? comparator : undefined;
  return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined, comparator);
});
var zip = baseRest(unzip);

function baseZipObject(props, values, assignFunc) {
  var index = -1,
      length = props.length,
      valsLength = values.length,
      result = {};

  while (++index < length) {
    var value = index < valsLength ? values[index] : undefined;
    assignFunc(result, props[index], value);
  }

  return result;
}

function zipObject(props, values) {
  return baseZipObject(props || [], values || [], assignValue);
}

function zipObjectDeep(props, values) {
  return baseZipObject(props || [], values || [], baseSet);
}

var zipWith = baseRest(function (arrays) {
  var length = arrays.length,
      iteratee = length > 1 ? arrays[length - 1] : undefined;
  iteratee = typeof iteratee == 'function' ? (arrays.pop(), iteratee) : undefined;
  return unzipWith(arrays, iteratee);
});
var array = {
  chunk: chunk,
  compact: compact,
  concat: concat,
  difference: difference,
  differenceBy: differenceBy,
  differenceWith: differenceWith,
  drop: drop,
  dropRight: dropRight,
  dropRightWhile: dropRightWhile,
  dropWhile: dropWhile,
  fill: fill,
  findIndex: findIndex,
  findLastIndex: findLastIndex,
  first: head,
  flatten: flatten,
  flattenDeep: flattenDeep,
  flattenDepth: flattenDepth,
  fromPairs: fromPairs,
  head: head,
  indexOf: indexOf,
  initial: initial,
  intersection: intersection,
  intersectionBy: intersectionBy,
  intersectionWith: intersectionWith,
  join: join,
  last: last,
  lastIndexOf: lastIndexOf,
  nth: nth,
  pull: pull,
  pullAll: pullAll,
  pullAllBy: pullAllBy,
  pullAllWith: pullAllWith,
  pullAt: pullAt,
  remove: remove,
  reverse: reverse,
  slice: slice,
  sortedIndex: sortedIndex,
  sortedIndexBy: sortedIndexBy,
  sortedIndexOf: sortedIndexOf,
  sortedLastIndex: sortedLastIndex,
  sortedLastIndexBy: sortedLastIndexBy,
  sortedLastIndexOf: sortedLastIndexOf,
  sortedUniq: sortedUniq,
  sortedUniqBy: sortedUniqBy,
  tail: tail,
  take: take,
  takeRight: takeRight,
  takeRightWhile: takeRightWhile,
  takeWhile: takeWhile,
  union: union,
  unionBy: unionBy,
  unionWith: unionWith,
  uniq: uniq,
  uniqBy: uniqBy,
  uniqWith: uniqWith,
  unzip: unzip,
  unzipWith: unzipWith,
  without: without,
  xor: xor,
  xorBy: xorBy,
  xorWith: xorWith,
  zip: zip,
  zipObject: zipObject,
  zipObjectDeep: zipObjectDeep,
  zipWith: zipWith
};
var collection = {
  countBy: countBy,
  each: forEach,
  eachRight: forEachRight,
  every: every,
  filter: filter,
  find: find,
  findLast: findLast,
  flatMap: flatMap,
  flatMapDeep: flatMapDeep,
  flatMapDepth: flatMapDepth,
  forEach: forEach,
  forEachRight: forEachRight,
  groupBy: groupBy,
  includes: includes,
  invokeMap: invokeMap,
  keyBy: keyBy,
  map: map,
  orderBy: orderBy,
  partition: partition,
  reduce: reduce,
  reduceRight: reduceRight,
  reject: reject,
  sample: sample,
  sampleSize: sampleSize,
  shuffle: shuffle,
  size: size,
  some: some,
  sortBy: sortBy
};
var date = {
  now: now
};
var func = {
  after: after,
  ary: ary,
  before: before,
  bind: bind,
  bindKey: bindKey,
  curry: curry,
  curryRight: curryRight,
  debounce: debounce,
  defer: defer,
  delay: delay,
  flip: flip,
  memoize: memoize,
  negate: negate,
  once: once,
  overArgs: overArgs,
  partial: partial,
  partialRight: partialRight,
  rearg: rearg,
  rest: rest,
  spread: spread,
  throttle: throttle,
  unary: unary,
  wrap: wrap
};
var lang = {
  castArray: castArray,
  clone: clone,
  cloneDeep: cloneDeep,
  cloneDeepWith: cloneDeepWith,
  cloneWith: cloneWith,
  conformsTo: conformsTo,
  eq: eq,
  gt: gt,
  gte: gte,
  isArguments: isArguments,
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isArrayLike: isArrayLike,
  isArrayLikeObject: isArrayLikeObject,
  isBoolean: isBoolean,
  isBuffer: isBuffer,
  isDate: isDate,
  isElement: isElement,
  isEmpty: isEmpty,
  isEqual: isEqual,
  isEqualWith: isEqualWith,
  isError: isError,
  isFinite: isFinite,
  isFunction: isFunction,
  isInteger: isInteger,
  isLength: isLength,
  isMap: isMap,
  isMatch: isMatch,
  isMatchWith: isMatchWith,
  isNaN: isNaN,
  isNative: isNative,
  isNil: isNil,
  isNull: isNull,
  isNumber: isNumber,
  isObject: isObject,
  isObjectLike: isObjectLike,
  isPlainObject: isPlainObject,
  isRegExp: isRegExp,
  isSafeInteger: isSafeInteger,
  isSet: isSet,
  isString: isString,
  isSymbol: isSymbol,
  isTypedArray: isTypedArray,
  isUndefined: isUndefined,
  isWeakMap: isWeakMap,
  isWeakSet: isWeakSet,
  lt: lt,
  lte: lte,
  toArray: toArray,
  toFinite: toFinite,
  toInteger: toInteger,
  toLength: toLength,
  toNumber: toNumber,
  toPlainObject: toPlainObject,
  toSafeInteger: toSafeInteger,
  toString: toString
};
var math = {
  add: add,
  ceil: ceil,
  divide: divide,
  floor: floor,
  max: max,
  maxBy: maxBy,
  mean: mean,
  meanBy: meanBy,
  min: min,
  minBy: minBy,
  multiply: multiply,
  round: round,
  subtract: subtract,
  sum: sum,
  sumBy: sumBy
};
var number = {
  clamp: clamp,
  inRange: inRange,
  random: random
};
var object = {
  assign: assign,
  assignIn: assignIn,
  assignInWith: assignInWith,
  assignWith: assignWith,
  at: at,
  create: create,
  defaults: defaults,
  defaultsDeep: defaultsDeep,
  entries: toPairs,
  entriesIn: toPairsIn,
  extend: assignIn,
  extendWith: assignInWith,
  findKey: findKey,
  findLastKey: findLastKey,
  forIn: forIn,
  forInRight: forInRight,
  forOwn: forOwn,
  forOwnRight: forOwnRight,
  functions: functions,
  functionsIn: functionsIn,
  get: get,
  has: has,
  hasIn: hasIn,
  invert: invert,
  invertBy: invertBy,
  invoke: invoke,
  keys: keys,
  keysIn: keysIn$1,
  mapKeys: mapKeys,
  mapValues: mapValues,
  merge: merge,
  mergeWith: mergeWith,
  omit: omit,
  omitBy: omitBy,
  pick: pick,
  pickBy: pickBy,
  result: result,
  set: set,
  setWith: setWith,
  toPairs: toPairs,
  toPairsIn: toPairsIn,
  transform: transform,
  unset: unset,
  update: update,
  updateWith: updateWith,
  values: values,
  valuesIn: valuesIn
};
var seq = {
  at: wrapperAt,
  chain: chain,
  commit: wrapperCommit,
  lodash: lodash,
  next: wrapperNext,
  plant: wrapperPlant,
  reverse: wrapperReverse,
  tap: tap,
  thru: thru,
  toIterator: wrapperToIterator,
  toJSON: wrapperValue,
  value: wrapperValue,
  valueOf: wrapperValue,
  wrapperChain: wrapperChain
};
var string = {
  camelCase: camelCase,
  capitalize: capitalize,
  deburr: deburr,
  endsWith: endsWith,
  escape: escape,
  escapeRegExp: escapeRegExp,
  kebabCase: kebabCase,
  lowerCase: lowerCase,
  lowerFirst: lowerFirst,
  pad: pad,
  padEnd: padEnd,
  padStart: padStart,
  parseInt: parseInt$1,
  repeat: repeat,
  replace: replace,
  snakeCase: snakeCase,
  split: split,
  startCase: startCase,
  startsWith: startsWith,
  template: template,
  templateSettings: templateSettings,
  toLower: toLower,
  toUpper: toUpper,
  trim: trim,
  trimEnd: trimEnd,
  trimStart: trimStart,
  truncate: truncate,
  unescape: unescape,
  upperCase: upperCase,
  upperFirst: upperFirst,
  words: words
};
var util = {
  attempt: attempt,
  bindAll: bindAll,
  cond: cond,
  conforms: conforms,
  constant: constant,
  defaultTo: defaultTo,
  flow: flow,
  flowRight: flowRight,
  identity: identity,
  iteratee: iteratee,
  matches: matches,
  matchesProperty: matchesProperty,
  method: method,
  methodOf: methodOf,
  mixin: mixin,
  noop: noop,
  nthArg: nthArg,
  over: over,
  overEvery: overEvery,
  overSome: overSome,
  property: property,
  propertyOf: propertyOf,
  range: range,
  rangeRight: rangeRight,
  stubArray: stubArray,
  stubFalse: stubFalse,
  stubObject: stubObject,
  stubString: stubString,
  stubTrue: stubTrue,
  times: times,
  toPath: toPath,
  uniqueId: uniqueId
};

function lazyClone() {
  var result = new LazyWrapper(this.__wrapped__);
  result.__actions__ = copyArray(this.__actions__);
  result.__dir__ = this.__dir__;
  result.__filtered__ = this.__filtered__;
  result.__iteratees__ = copyArray(this.__iteratees__);
  result.__takeCount__ = this.__takeCount__;
  result.__views__ = copyArray(this.__views__);
  return result;
}

function lazyReverse() {
  if (this.__filtered__) {
    var result = new LazyWrapper(this);
    result.__dir__ = -1;
    result.__filtered__ = true;
  } else {
    result = this.clone();
    result.__dir__ *= -1;
  }

  return result;
}

var nativeMax$f = Math.max,
    nativeMin$c = Math.min;

function getView(start, end, transforms) {
  var index = -1,
      length = transforms.length;

  while (++index < length) {
    var data = transforms[index],
        size = data.size;

    switch (data.type) {
      case 'drop':
        start += size;
        break;

      case 'dropRight':
        end -= size;
        break;

      case 'take':
        end = nativeMin$c(end, start + size);
        break;

      case 'takeRight':
        start = nativeMax$f(start, end - size);
        break;
    }
  }

  return {
    'start': start,
    'end': end
  };
}

var LAZY_FILTER_FLAG = 1,
    LAZY_MAP_FLAG = 2;
var nativeMin$d = Math.min;

function lazyValue() {
  var array = this.__wrapped__.value(),
      dir = this.__dir__,
      isArr = isArray(array),
      isRight = dir < 0,
      arrLength = isArr ? array.length : 0,
      view = getView(0, arrLength, this.__views__),
      start = view.start,
      end = view.end,
      length = end - start,
      index = isRight ? end : start - 1,
      iteratees = this.__iteratees__,
      iterLength = iteratees.length,
      resIndex = 0,
      takeCount = nativeMin$d(length, this.__takeCount__);

  if (!isArr || !isRight && arrLength == length && takeCount == length) {
    return baseWrapperValue(array, this.__actions__);
  }

  var result = [];

  outer: while (length-- && resIndex < takeCount) {
    index += dir;
    var iterIndex = -1,
        value = array[index];

    while (++iterIndex < iterLength) {
      var data = iteratees[iterIndex],
          iteratee = data.iteratee,
          type = data.type,
          computed = iteratee(value);

      if (type == LAZY_MAP_FLAG) {
        value = computed;
      } else if (!computed) {
        if (type == LAZY_FILTER_FLAG) {
          continue outer;
        } else {
          break outer;
        }
      }
    }

    result[resIndex++] = value;
  }

  return result;
}
/**
 * @license
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="es" -o ./`
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */


var VERSION = '4.17.15';
var WRAP_BIND_KEY_FLAG$6 = 2;
var LAZY_FILTER_FLAG$1 = 1,
    LAZY_WHILE_FLAG = 3;
var MAX_ARRAY_LENGTH$6 = 4294967295;
var arrayProto$5 = Array.prototype,
    objectProto$s = Object.prototype;
var hasOwnProperty$o = objectProto$s.hasOwnProperty;
var symIterator$1 = _Symbol ? _Symbol.iterator : undefined;
var nativeMax$g = Math.max,
    nativeMin$e = Math.min;

var mixin$1 = function (func) {
  return function (object, source, options) {
    if (options == null) {
      var isObj = isObject(source),
          props = isObj && keys(source),
          methodNames = props && props.length && baseFunctions(source, props);

      if (!(methodNames ? methodNames.length : isObj)) {
        options = source;
        source = object;
        object = this;
      }
    }

    return func(object, source, options);
  };
}(mixin);

lodash.after = func.after;
lodash.ary = func.ary;
lodash.assign = object.assign;
lodash.assignIn = object.assignIn;
lodash.assignInWith = object.assignInWith;
lodash.assignWith = object.assignWith;
lodash.at = object.at;
lodash.before = func.before;
lodash.bind = func.bind;
lodash.bindAll = util.bindAll;
lodash.bindKey = func.bindKey;
lodash.castArray = lang.castArray;
lodash.chain = seq.chain;
lodash.chunk = array.chunk;
lodash.compact = array.compact;
lodash.concat = array.concat;
lodash.cond = util.cond;
lodash.conforms = util.conforms;
lodash.constant = util.constant;
lodash.countBy = collection.countBy;
lodash.create = object.create;
lodash.curry = func.curry;
lodash.curryRight = func.curryRight;
lodash.debounce = func.debounce;
lodash.defaults = object.defaults;
lodash.defaultsDeep = object.defaultsDeep;
lodash.defer = func.defer;
lodash.delay = func.delay;
lodash.difference = array.difference;
lodash.differenceBy = array.differenceBy;
lodash.differenceWith = array.differenceWith;
lodash.drop = array.drop;
lodash.dropRight = array.dropRight;
lodash.dropRightWhile = array.dropRightWhile;
lodash.dropWhile = array.dropWhile;
lodash.fill = array.fill;
lodash.filter = collection.filter;
lodash.flatMap = collection.flatMap;
lodash.flatMapDeep = collection.flatMapDeep;
lodash.flatMapDepth = collection.flatMapDepth;
lodash.flatten = array.flatten;
lodash.flattenDeep = array.flattenDeep;
lodash.flattenDepth = array.flattenDepth;
lodash.flip = func.flip;
lodash.flow = util.flow;
lodash.flowRight = util.flowRight;
lodash.fromPairs = array.fromPairs;
lodash.functions = object.functions;
lodash.functionsIn = object.functionsIn;
lodash.groupBy = collection.groupBy;
lodash.initial = array.initial;
lodash.intersection = array.intersection;
lodash.intersectionBy = array.intersectionBy;
lodash.intersectionWith = array.intersectionWith;
lodash.invert = object.invert;
lodash.invertBy = object.invertBy;
lodash.invokeMap = collection.invokeMap;
lodash.iteratee = util.iteratee;
lodash.keyBy = collection.keyBy;
lodash.keys = keys;
lodash.keysIn = object.keysIn;
lodash.map = collection.map;
lodash.mapKeys = object.mapKeys;
lodash.mapValues = object.mapValues;
lodash.matches = util.matches;
lodash.matchesProperty = util.matchesProperty;
lodash.memoize = func.memoize;
lodash.merge = object.merge;
lodash.mergeWith = object.mergeWith;
lodash.method = util.method;
lodash.methodOf = util.methodOf;
lodash.mixin = mixin$1;
lodash.negate = negate;
lodash.nthArg = util.nthArg;
lodash.omit = object.omit;
lodash.omitBy = object.omitBy;
lodash.once = func.once;
lodash.orderBy = collection.orderBy;
lodash.over = util.over;
lodash.overArgs = func.overArgs;
lodash.overEvery = util.overEvery;
lodash.overSome = util.overSome;
lodash.partial = func.partial;
lodash.partialRight = func.partialRight;
lodash.partition = collection.partition;
lodash.pick = object.pick;
lodash.pickBy = object.pickBy;
lodash.property = util.property;
lodash.propertyOf = util.propertyOf;
lodash.pull = array.pull;
lodash.pullAll = array.pullAll;
lodash.pullAllBy = array.pullAllBy;
lodash.pullAllWith = array.pullAllWith;
lodash.pullAt = array.pullAt;
lodash.range = util.range;
lodash.rangeRight = util.rangeRight;
lodash.rearg = func.rearg;
lodash.reject = collection.reject;
lodash.remove = array.remove;
lodash.rest = func.rest;
lodash.reverse = array.reverse;
lodash.sampleSize = collection.sampleSize;
lodash.set = object.set;
lodash.setWith = object.setWith;
lodash.shuffle = collection.shuffle;
lodash.slice = array.slice;
lodash.sortBy = collection.sortBy;
lodash.sortedUniq = array.sortedUniq;
lodash.sortedUniqBy = array.sortedUniqBy;
lodash.split = string.split;
lodash.spread = func.spread;
lodash.tail = array.tail;
lodash.take = array.take;
lodash.takeRight = array.takeRight;
lodash.takeRightWhile = array.takeRightWhile;
lodash.takeWhile = array.takeWhile;
lodash.tap = seq.tap;
lodash.throttle = func.throttle;
lodash.thru = thru;
lodash.toArray = lang.toArray;
lodash.toPairs = object.toPairs;
lodash.toPairsIn = object.toPairsIn;
lodash.toPath = util.toPath;
lodash.toPlainObject = lang.toPlainObject;
lodash.transform = object.transform;
lodash.unary = func.unary;
lodash.union = array.union;
lodash.unionBy = array.unionBy;
lodash.unionWith = array.unionWith;
lodash.uniq = array.uniq;
lodash.uniqBy = array.uniqBy;
lodash.uniqWith = array.uniqWith;
lodash.unset = object.unset;
lodash.unzip = array.unzip;
lodash.unzipWith = array.unzipWith;
lodash.update = object.update;
lodash.updateWith = object.updateWith;
lodash.values = object.values;
lodash.valuesIn = object.valuesIn;
lodash.without = array.without;
lodash.words = string.words;
lodash.wrap = func.wrap;
lodash.xor = array.xor;
lodash.xorBy = array.xorBy;
lodash.xorWith = array.xorWith;
lodash.zip = array.zip;
lodash.zipObject = array.zipObject;
lodash.zipObjectDeep = array.zipObjectDeep;
lodash.zipWith = array.zipWith;
lodash.entries = object.toPairs;
lodash.entriesIn = object.toPairsIn;
lodash.extend = object.assignIn;
lodash.extendWith = object.assignInWith;
mixin$1(lodash, lodash);
lodash.add = math.add;
lodash.attempt = util.attempt;
lodash.camelCase = string.camelCase;
lodash.capitalize = string.capitalize;
lodash.ceil = math.ceil;
lodash.clamp = number.clamp;
lodash.clone = lang.clone;
lodash.cloneDeep = lang.cloneDeep;
lodash.cloneDeepWith = lang.cloneDeepWith;
lodash.cloneWith = lang.cloneWith;
lodash.conformsTo = lang.conformsTo;
lodash.deburr = string.deburr;
lodash.defaultTo = util.defaultTo;
lodash.divide = math.divide;
lodash.endsWith = string.endsWith;
lodash.eq = lang.eq;
lodash.escape = string.escape;
lodash.escapeRegExp = string.escapeRegExp;
lodash.every = collection.every;
lodash.find = collection.find;
lodash.findIndex = array.findIndex;
lodash.findKey = object.findKey;
lodash.findLast = collection.findLast;
lodash.findLastIndex = array.findLastIndex;
lodash.findLastKey = object.findLastKey;
lodash.floor = math.floor;
lodash.forEach = collection.forEach;
lodash.forEachRight = collection.forEachRight;
lodash.forIn = object.forIn;
lodash.forInRight = object.forInRight;
lodash.forOwn = object.forOwn;
lodash.forOwnRight = object.forOwnRight;
lodash.get = object.get;
lodash.gt = lang.gt;
lodash.gte = lang.gte;
lodash.has = object.has;
lodash.hasIn = object.hasIn;
lodash.head = array.head;
lodash.identity = identity;
lodash.includes = collection.includes;
lodash.indexOf = array.indexOf;
lodash.inRange = number.inRange;
lodash.invoke = object.invoke;
lodash.isArguments = lang.isArguments;
lodash.isArray = isArray;
lodash.isArrayBuffer = lang.isArrayBuffer;
lodash.isArrayLike = lang.isArrayLike;
lodash.isArrayLikeObject = lang.isArrayLikeObject;
lodash.isBoolean = lang.isBoolean;
lodash.isBuffer = lang.isBuffer;
lodash.isDate = lang.isDate;
lodash.isElement = lang.isElement;
lodash.isEmpty = lang.isEmpty;
lodash.isEqual = lang.isEqual;
lodash.isEqualWith = lang.isEqualWith;
lodash.isError = lang.isError;
lodash.isFinite = lang.isFinite;
lodash.isFunction = lang.isFunction;
lodash.isInteger = lang.isInteger;
lodash.isLength = lang.isLength;
lodash.isMap = lang.isMap;
lodash.isMatch = lang.isMatch;
lodash.isMatchWith = lang.isMatchWith;
lodash.isNaN = lang.isNaN;
lodash.isNative = lang.isNative;
lodash.isNil = lang.isNil;
lodash.isNull = lang.isNull;
lodash.isNumber = lang.isNumber;
lodash.isObject = isObject;
lodash.isObjectLike = lang.isObjectLike;
lodash.isPlainObject = lang.isPlainObject;
lodash.isRegExp = lang.isRegExp;
lodash.isSafeInteger = lang.isSafeInteger;
lodash.isSet = lang.isSet;
lodash.isString = lang.isString;
lodash.isSymbol = lang.isSymbol;
lodash.isTypedArray = lang.isTypedArray;
lodash.isUndefined = lang.isUndefined;
lodash.isWeakMap = lang.isWeakMap;
lodash.isWeakSet = lang.isWeakSet;
lodash.join = array.join;
lodash.kebabCase = string.kebabCase;
lodash.last = last;
lodash.lastIndexOf = array.lastIndexOf;
lodash.lowerCase = string.lowerCase;
lodash.lowerFirst = string.lowerFirst;
lodash.lt = lang.lt;
lodash.lte = lang.lte;
lodash.max = math.max;
lodash.maxBy = math.maxBy;
lodash.mean = math.mean;
lodash.meanBy = math.meanBy;
lodash.min = math.min;
lodash.minBy = math.minBy;
lodash.stubArray = util.stubArray;
lodash.stubFalse = util.stubFalse;
lodash.stubObject = util.stubObject;
lodash.stubString = util.stubString;
lodash.stubTrue = util.stubTrue;
lodash.multiply = math.multiply;
lodash.nth = array.nth;
lodash.noop = util.noop;
lodash.now = date.now;
lodash.pad = string.pad;
lodash.padEnd = string.padEnd;
lodash.padStart = string.padStart;
lodash.parseInt = string.parseInt;
lodash.random = number.random;
lodash.reduce = collection.reduce;
lodash.reduceRight = collection.reduceRight;
lodash.repeat = string.repeat;
lodash.replace = string.replace;
lodash.result = object.result;
lodash.round = math.round;
lodash.sample = collection.sample;
lodash.size = collection.size;
lodash.snakeCase = string.snakeCase;
lodash.some = collection.some;
lodash.sortedIndex = array.sortedIndex;
lodash.sortedIndexBy = array.sortedIndexBy;
lodash.sortedIndexOf = array.sortedIndexOf;
lodash.sortedLastIndex = array.sortedLastIndex;
lodash.sortedLastIndexBy = array.sortedLastIndexBy;
lodash.sortedLastIndexOf = array.sortedLastIndexOf;
lodash.startCase = string.startCase;
lodash.startsWith = string.startsWith;
lodash.subtract = math.subtract;
lodash.sum = math.sum;
lodash.sumBy = math.sumBy;
lodash.template = string.template;
lodash.times = util.times;
lodash.toFinite = lang.toFinite;
lodash.toInteger = toInteger;
lodash.toLength = lang.toLength;
lodash.toLower = string.toLower;
lodash.toNumber = lang.toNumber;
lodash.toSafeInteger = lang.toSafeInteger;
lodash.toString = lang.toString;
lodash.toUpper = string.toUpper;
lodash.trim = string.trim;
lodash.trimEnd = string.trimEnd;
lodash.trimStart = string.trimStart;
lodash.truncate = string.truncate;
lodash.unescape = string.unescape;
lodash.uniqueId = util.uniqueId;
lodash.upperCase = string.upperCase;
lodash.upperFirst = string.upperFirst;
lodash.each = collection.forEach;
lodash.eachRight = collection.forEachRight;
lodash.first = array.head;
mixin$1(lodash, function () {
  var source = {};
  baseForOwn(lodash, function (func, methodName) {
    if (!hasOwnProperty$o.call(lodash.prototype, methodName)) {
      source[methodName] = func;
    }
  });
  return source;
}(), {
  'chain': false
});
lodash.VERSION = VERSION;
(lodash.templateSettings = string.templateSettings).imports._ = lodash;
arrayEach(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function (methodName) {
  lodash[methodName].placeholder = lodash;
});
arrayEach(['drop', 'take'], function (methodName, index) {
  LazyWrapper.prototype[methodName] = function (n) {
    n = n === undefined ? 1 : nativeMax$g(toInteger(n), 0);
    var result = this.__filtered__ && !index ? new LazyWrapper(this) : this.clone();

    if (result.__filtered__) {
      result.__takeCount__ = nativeMin$e(n, result.__takeCount__);
    } else {
      result.__views__.push({
        'size': nativeMin$e(n, MAX_ARRAY_LENGTH$6),
        'type': methodName + (result.__dir__ < 0 ? 'Right' : '')
      });
    }

    return result;
  };

  LazyWrapper.prototype[methodName + 'Right'] = function (n) {
    return this.reverse()[methodName](n).reverse();
  };
});
arrayEach(['filter', 'map', 'takeWhile'], function (methodName, index) {
  var type = index + 1,
      isFilter = type == LAZY_FILTER_FLAG$1 || type == LAZY_WHILE_FLAG;

  LazyWrapper.prototype[methodName] = function (iteratee) {
    var result = this.clone();

    result.__iteratees__.push({
      'iteratee': baseIteratee(iteratee, 3),
      'type': type
    });

    result.__filtered__ = result.__filtered__ || isFilter;
    return result;
  };
});
arrayEach(['head', 'last'], function (methodName, index) {
  var takeName = 'take' + (index ? 'Right' : '');

  LazyWrapper.prototype[methodName] = function () {
    return this[takeName](1).value()[0];
  };
});
arrayEach(['initial', 'tail'], function (methodName, index) {
  var dropName = 'drop' + (index ? '' : 'Right');

  LazyWrapper.prototype[methodName] = function () {
    return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
  };
});

LazyWrapper.prototype.compact = function () {
  return this.filter(identity);
};

LazyWrapper.prototype.find = function (predicate) {
  return this.filter(predicate).head();
};

LazyWrapper.prototype.findLast = function (predicate) {
  return this.reverse().find(predicate);
};

LazyWrapper.prototype.invokeMap = baseRest(function (path, args) {
  if (typeof path == 'function') {
    return new LazyWrapper(this);
  }

  return this.map(function (value) {
    return baseInvoke(value, path, args);
  });
});

LazyWrapper.prototype.reject = function (predicate) {
  return this.filter(negate(baseIteratee(predicate)));
};

LazyWrapper.prototype.slice = function (start, end) {
  start = toInteger(start);
  var result = this;

  if (result.__filtered__ && (start > 0 || end < 0)) {
    return new LazyWrapper(result);
  }

  if (start < 0) {
    result = result.takeRight(-start);
  } else if (start) {
    result = result.drop(start);
  }

  if (end !== undefined) {
    end = toInteger(end);
    result = end < 0 ? result.dropRight(-end) : result.take(end - start);
  }

  return result;
};

LazyWrapper.prototype.takeRightWhile = function (predicate) {
  return this.reverse().takeWhile(predicate).reverse();
};

LazyWrapper.prototype.toArray = function () {
  return this.take(MAX_ARRAY_LENGTH$6);
};

baseForOwn(LazyWrapper.prototype, function (func, methodName) {
  var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName),
      isTaker = /^(?:head|last)$/.test(methodName),
      lodashFunc = lodash[isTaker ? 'take' + (methodName == 'last' ? 'Right' : '') : methodName],
      retUnwrapped = isTaker || /^find/.test(methodName);

  if (!lodashFunc) {
    return;
  }

  lodash.prototype[methodName] = function () {
    var value = this.__wrapped__,
        args = isTaker ? [1] : arguments,
        isLazy = value instanceof LazyWrapper,
        iteratee = args[0],
        useLazy = isLazy || isArray(value);

    var interceptor = function interceptor(value) {
      var result = lodashFunc.apply(lodash, arrayPush([value], args));
      return isTaker && chainAll ? result[0] : result;
    };

    if (useLazy && checkIteratee && typeof iteratee == 'function' && iteratee.length != 1) {
      isLazy = useLazy = false;
    }

    var chainAll = this.__chain__,
        isHybrid = !!this.__actions__.length,
        isUnwrapped = retUnwrapped && !chainAll,
        onlyLazy = isLazy && !isHybrid;

    if (!retUnwrapped && useLazy) {
      value = onlyLazy ? value : new LazyWrapper(this);
      var result = func.apply(value, args);

      result.__actions__.push({
        'func': thru,
        'args': [interceptor],
        'thisArg': undefined
      });

      return new LodashWrapper(result, chainAll);
    }

    if (isUnwrapped && onlyLazy) {
      return func.apply(this, args);
    }

    result = this.thru(interceptor);
    return isUnwrapped ? isTaker ? result.value()[0] : result.value() : result;
  };
});
arrayEach(['pop', 'push', 'shift', 'sort', 'splice', 'unshift'], function (methodName) {
  var func = arrayProto$5[methodName],
      chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
      retUnwrapped = /^(?:pop|shift)$/.test(methodName);

  lodash.prototype[methodName] = function () {
    var args = arguments;

    if (retUnwrapped && !this.__chain__) {
      var value = this.value();
      return func.apply(isArray(value) ? value : [], args);
    }

    return this[chainName](function (value) {
      return func.apply(isArray(value) ? value : [], args);
    });
  };
});
baseForOwn(LazyWrapper.prototype, function (func, methodName) {
  var lodashFunc = lodash[methodName];

  if (lodashFunc) {
    var key = lodashFunc.name + '';

    if (!hasOwnProperty$o.call(realNames, key)) {
      realNames[key] = [];
    }

    realNames[key].push({
      'name': methodName,
      'func': lodashFunc
    });
  }
});
realNames[createHybrid(undefined, WRAP_BIND_KEY_FLAG$6).name] = [{
  'name': 'wrapper',
  'func': undefined
}];
LazyWrapper.prototype.clone = lazyClone;
LazyWrapper.prototype.reverse = lazyReverse;
LazyWrapper.prototype.value = lazyValue;
lodash.prototype.at = seq.at;
lodash.prototype.chain = seq.wrapperChain;
lodash.prototype.commit = seq.commit;
lodash.prototype.next = seq.next;
lodash.prototype.plant = seq.plant;
lodash.prototype.reverse = seq.reverse;
lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = seq.value;
lodash.prototype.first = lodash.prototype.head;

if (symIterator$1) {
  lodash.prototype[symIterator$1] = seq.toIterator;
}
/**
 * @license
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="es" -o ./`
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */


function heapPermutation(arr, size, n) {
  var result = [];
  if (size === 1) result.push(arr);

  for (var i = 0; i < size; i++) {
    heapPermutation(arr, size - 1, n);

    if (size % 2 == 1) {
      var temp = arr[0];
      arr[0] = arr[size - 1];
      arr[size - 1] = temp;
    } else {
      var _temp = arr[i];
      arr[i] = arr[size - 1];
      arr[size - 1] = _temp;
    }
  }

  return result;
}

var dir = SpreadsheetApp.Direction;
var ss = SpreadsheetApp.getActive();
var wordsSheet = ss.getSheetByName('Words');
var sentencesSheet = ss.getSheetByName('Sentences');
var paragraphs = ss.getSheetByName('Paragraphs');

function onOpen(e) {
  ui.createAddonMenu().addItem('Generate paragraphs', 'generate').addToUi();
}

function getSentences() {
  var lastRow = sentencesSheet.getRange('A1').getNextDataCell(dir.DOWN).getRow();
  return flatten(sentencesSheet.getRange(1, 1, lastRow, 1).getValues());
}

function generate() {
  var sentences = getSentences();
  heapPermutation(sentences, sentences.length, sentences.length);
}