/*!
 * vue-merge-data v0.0.4
 * (c) 2018-present fjc0k <fjc0kb@gmail.com> (https://github.com/fjc0k)
 * Released under the MIT License.
 */
/* eslint guard-for-in: 0, no-case-declarations: 0, max-depth: 0 */
var keys = Object.keys;
function mergeData(target, source) {
  var propNames = keys(source);

  for (var i in propNames) {
    var propName = propNames[i];
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
          var props = keys(sourceValue);

          for (var ii in props) {
            var prop = props[ii];
            targetValue[prop] = sourceValue[prop];
          }

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
          var listenerNames = keys(sourceValue);

          for (var _ii in listenerNames) {
            var listenerName = listenerNames[_ii];

            if (targetValue[listenerName]) {
              targetValue[listenerName] = [].concat(sourceValue[listenerName], targetValue[listenerName]);
            } else {
              targetValue[listenerName] = sourceValue[listenerName];
            }
          }

          break;
        // override

        default:
          target[propName] = source[propName];
          break;
      }
    } else {
      target[propName] = sourceValue;
    }
  }
}

export default mergeData;
