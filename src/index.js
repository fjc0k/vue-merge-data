/* eslint guard-for-in: 0, no-case-declarations: 0, max-depth: 0 */

const keys = Object.keys

export default function mergeData(target, source) {
  const propNames = keys(source)
  for (const i in propNames) {
    const propName = propNames[i]
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
          const props = keys(sourceValue)
          for (const ii in props) {
            const prop = props[ii]
            targetValue[prop] = sourceValue[prop]
          }
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
          const listenerNames = keys(sourceValue)
          for (const ii in listenerNames) {
            const listenerName = listenerNames[ii]
            if (targetValue[listenerName]) {
              targetValue[listenerName] = [].concat(
                sourceValue[listenerName],
                targetValue[listenerName]
              )
            } else {
              targetValue[listenerName] = sourceValue[listenerName]
            }
          }
          break
        // override
        default:
          target[propName] = source[propName]
          break
      }
    } else {
      target[propName] = sourceValue
    }
  }
}
