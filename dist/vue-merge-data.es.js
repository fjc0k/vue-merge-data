/*!
 * vue-merge-data v0.1.3
 * (c) 2018-present fjc0k <fjc0kb@gmail.com> (https://github.com/fjc0k)
 * Released under the MIT License.
 */
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

function mergeData(target, source) {
  // Shallow copy target
  target = assign({}, target); // Merge

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
  return target;
}

export default mergeData;
