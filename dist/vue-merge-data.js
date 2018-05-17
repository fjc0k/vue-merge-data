/*!
 * vue-merge-data v0.2.1
 * (c) 2018-present fjc0k <fjc0kb@gmail.com> (https://github.com/fjc0k)
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueMergeData = factory());
}(this, (function () { 'use strict';

  /* eslint guard-for-in: 0, no-case-declarations: 0, max-depth: 0 */
  var assign = function assign(target, source, handler) {
    var sourceKeys = Object.keys(source);

    for (var index in sourceKeys) {
      var sourceKey = sourceKeys[index];

      if (source[sourceKey] != null) {
        // eslint-disable-line
        if (handler) {
          handler(sourceKey, target, source);
        } else {
          target[sourceKey] = source[sourceKey];
        }
      }
    }

    return target;
  };

  function mergeData() {
    var args = [].slice.call(arguments);
    var target = assign({}, args[0]);
    var sources = args.slice(1);

    var _loop = function _loop(i) {
      var source = sources[i];
      assign(target, source, function (propName) {
        var targetValue = target[propName];
        var sourceValue = source[propName];

        if (targetValue) {
          switch (propName) {
            // append
            case 'staticClass':
              target[propName] = (targetValue + ' ' + sourceValue).trim();
              break;
            // override

            case 'attrs':
            case 'domProps':
            case 'scopedSlots':
            case 'staticStyle':
            case 'props':
            case 'hook':
            case 'transition':
              assign(targetValue, sourceValue);
              break;
            // expand

            case 'class':
            case 'style':
            case 'directives':
              target[propName] = [].concat(sourceValue, targetValue);
              break;
            // expand

            case 'on':
            case 'nativeOn':
              assign(targetValue, sourceValue, function (listenerName) {
                if (targetValue[listenerName]) {
                  targetValue[listenerName] = [].concat(sourceValue[listenerName], targetValue[listenerName]);
                } else {
                  targetValue[listenerName] = sourceValue[listenerName];
                }
              });
              break;
            // override

            default:
              target[propName] = source[propName];
              break;
          }
        } else {
          target[propName] = sourceValue;
        }
      });
    };

    for (var i in sources) {
      _loop(i);
    }

    return target;
  }

  return mergeData;

})));
