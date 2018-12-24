import { ModifierType } from '../../constants'
import { baseStyleManager } from './baseStyleManager'

export const textStyleManager = (appState) => [
  ...baseStyleManager(appState),
  {
    name: 'Props',
    target: 'props',
    modifiers: [
      {
        label: 'Text',
        type: 'text',
        key: 'text'
      }
    ]
  },
  {
    name: 'Colors',
    target: 'style',
    modifiers: [
      {
        label: 'background-color',
        type: ModifierType.COLOR,
        key: 'backgroundColor'
      },
      {
        label: 'color',
        type: ModifierType.SELECT,
        key: 'color',
        options: ['red', 'blue', 'green', 'yellow']
      }
    ]
  },
  {
    name: 'Font',
    target: 'style',
    modifiers: [
      {
        label: 'font-size',
        type: ModifierType.NUMBER,
        key: 'fontSize'
      },
      {
        label: 'line-height',
        type: ModifierType.NUMBER,
        key: 'lineHeight'
      },
      {
        label: 'font-weight',
        type: ModifierType.SELECT,
        key: 'fontWeight',
        options: ['normal', 'bold', 'bolder', 'lighter']
      },
      {
        label: 'font-family',
        type: ModifierType.NUMBER,
        key: 'fontFamily'
      }
    ]
  }
]
