import mergeData from '../src'

const target = {
  directives: [{
    name: 'show',
    value: false
  }],
  ref: 'button',
  staticClass: 'component',
  class: ['button', {
    mini: true
  }],
  staticStyle: {
    width: '20px',
    height: '10px'
  },
  style: ({
    color: 'red',
    fontSize: '1em'
  }),
  attrs: {
    id: 'btn',
    type: 'submit'
  },
  domProps: {
    innerHTML: 'html',
    textContent: 'text'
  },
  on: {
    click: 1,
    touchstart: 1
  },
  nativeOn: {
    click: 1,
    touchstart: 1
  }
}

const source = {
  styleName: '@button',
  style: 'font-size:2em',
  staticStyle: {
    width: '10px'
  },
  staticClass: 'btn2 btn-disabled',
  class: 'btn3',
  attrs: {
    type: 'button',
    disabled: true
  },
  domProps: {
    innerHTML: 'new html'
  },
  on: {
    click: 2,
    touchend: 1
  },
  nativeOn: {
    touchstart: 2
  }
}

const source2 = {
  attrs: {
    new: true
  }
}

const result = {
  attrs: {
    disabled: true,
    id: 'btn',
    type: 'button',
    new: true
  },
  class: [
    'btn3',
    'button',
    {
      mini: true
    }
  ],
  directives: [
    {
      name: 'show',
      value: false
    }
  ],
  domProps: {
    innerHTML: 'new html',
    textContent: 'text'
  },
  nativeOn: {
    click: 1,
    touchstart: [
      2,
      1
    ]
  },
  on: {
    click: [
      2,
      1
    ],
    touchend: 1,
    touchstart: 1
  },
  ref: 'button',
  staticClass: 'component btn2 btn-disabled',
  staticStyle: {
    height: '10px',
    width: '10px'
  },
  style: [
    'font-size:2em',
    {
      color: 'red',
      fontSize: '1em'
    }
  ],
  styleName: '@button'
}

test('The merged data is correct.', () => {
  expect(mergeData(target, source, source2)).toEqual(result)
})
