/* eslint guard-for-in: 0, no-case-declarations: 0, max-depth: 0 */

const assign = function (target, source, handler) {
  const sourceKeys = Object.keys(source)
  for (const index in sourceKeys) {
    const sourceKey = sourceKeys[index]
    if (source[sourceKey] != null) { // eslint-disable-line
      if (handler) {
        handler(sourceKey, target, source)
      } else {
        target[sourceKey] = source[sourceKey]
      }
    }
  }
  return target
}

export default function mergeData(target, source) {
  // Shallow copy target
  target = assign({}, target)

  // Merge
  assign(target, source, propName => {
    const targetValue = target[propName]
    const sourceValue = source[propName]
    if (targetValue) {
      switch (propName) {
        // append
        case 'staticClass':
          target[propName] = (targetValue + ' ' + sourceValue).trim()
          break
        // override
        case 'attrs':
        case 'domProps':
        case 'scopedSlots':
        case 'staticStyle':
        case 'props':
        case 'hook':
        case 'transition':
          assign(targetValue, sourceValue)
          break
        // expand
        case 'class':
        case 'style':
        case 'directives':
          target[propName] = [].concat(sourceValue, targetValue)
          break
        // expand
        case 'on':
        case 'nativeOn':
          assign(targetValue, sourceValue, listenerName => {
            if (targetValue[listenerName]) {
              targetValue[listenerName] = [].concat(
                sourceValue[listenerName],
                targetValue[listenerName]
              )
            } else {
              targetValue[listenerName] = sourceValue[listenerName]
            }
          })
          break
        // override
        default:
          target[propName] = source[propName]
          break
      }
    } else {
      target[propName] = sourceValue
    }
  })

  return target
}
