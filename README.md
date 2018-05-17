# vue-merge-data

[![npm](https://img.shields.io/npm/v/vue-merge-data.svg?style=for-the-badge)](https://npm.im/vue-merge-data)
[![npm downloads](https://img.shields.io/npm/dt/vue-merge-data.svg?style=for-the-badge)](https://npm.im/vue-merge-data)
[![Travis](https://img.shields.io/travis/fjc0k/vue-merge-data.svg?style=for-the-badge)](https://travis-ci.org/fjc0k/vue-merge-data)
[![minified size](https://img.shields.io/badge/minified%20size-976%20B-blue.svg?MIN&style=for-the-badge)](https://github.com/fjc0k/vue-merge-data/blob/master/dist/vue-merge-data.min.js)
[![minzipped size](https://img.shields.io/badge/minzipped%20size-562%20B-blue.svg?MZIP&style=for-the-badge)](https://github.com/fjc0k/vue-merge-data/blob/master/dist/vue-merge-data.min.js)
[![license](https://img.shields.io/github/license/fjc0k/vue-merge-data.svg?style=for-the-badge)](https://github.com/fjc0k/vue-merge-data/blob/master/LICENSE)


Intelligently merge data for Vue render functions.

```shell
yarn add vue-merge-data
```

CDN: [jsDelivr](//www.jsdelivr.com/package/npm/vue-merge-data) | [UNPKG](//unpkg.com/vue-merge-data/) (Avaliable as `window.VueMergeData`)


## Usage

First, import it:

```javascript
import mergeData from 'vue-merge-data'
```

Then, use it in Vue render functions:

```javascript
// Normal component
export default {
  name: 'primary-button',
  props: { mini: Boolean },
  render(h) {
    return h('base-button', mergeData(this.$vnode.data, {
      attrs: {
        type: 'primary',
        mini: this.mini
      },
      on: {
        click: () => {}
      }
    }), this.$slots.default)
  }
}

// Functional component
export default {
  name: 'primary-button',
  functional: true,
  props: { mini: Boolean },
  render(h, { props, data, children }) {
    return h('base-button', mergeData(data, {
      attrs: {
        type: 'primary',
        mini: props.mini
      },
      on: {
        click: () => {}
      }
    }), children)
  }
}
```


## Merging strategies

Prop(s) | Strategy | Example
--|--|---
staticClass | append | target: `{ staticClass: 'button' }`<br />source: `{ staticClass: 'button--mini' }`<br />result: `{ staticClass: 'button button--mini' }`
attrs, domProps, scopedSlots, staticStyle, props, hook, transition | override | target: `{ attrs: { type: 'reset' } }`<br />source: `{ attrs: { type: 'submit' } }`<br />result: `{ attrs: { type: 'submit' } }`
class, style, directives, on, nativeOn | expand | target: `{ class: 'button', on: { click: FN1 } }`<br />source: `{ class: { mini: true }, on: { click: FN2 } }`<br />result: `{ class: ['button', { mini: true }], on: { click: [FN2, FN1] } }`
others: slot, key... | override | target: `{ slot: 'icon' }`<br />source: `{ slot: 'image' }`<br />result: `{ slot: 'image' }`
