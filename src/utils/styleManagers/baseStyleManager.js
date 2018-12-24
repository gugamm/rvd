import { ModifierType, ModifierTarget } from '../../constants'

export const baseStyleManager = (appState) => [
  {
    name: 'Size',
    target: ModifierTarget.STYLE,
    modifiers: [
      {
        label: 'width',
        type: ModifierType.NUMBER,
        key: 'width'
      },
      {
        label: 'height',
        type: ModifierType.NUMBER,
        key: 'height'
      }
    ]
  },
  {
    name: 'Flex',
    target: ModifierTarget.STYLE,
    modifiers: [
      {
        label: 'display',
        type: ModifierType.SELECT,
        options: ['none', 'flex'],
        key: 'display'
      },
      {
        label: 'flex-direction',
        type: ModifierType.SELECT,
        options: ['row', 'row-reverse', 'column', 'column-reverse'],
        key: 'flexDirection'
      },
      {
        label: 'flex-wrap',
        type: ModifierType.SELECT,
        options: ['wrap', 'nowrap'],
        key: 'flexWrap'
      },
      {
        label: 'flex-grow',
        type: ModifierType.NUMBER,
        key: 'flexGrow'
      },
      {
        label: 'flex-shrink',
        type: ModifierType.NUMBER,
        key: 'flexShrink'
      },
      {
        label: 'flex-basis',
        type: ModifierType.NUMBER,
        key: 'flexBasis'
      },
      {
        label: 'align-self',
        type: ModifierType.SELECT,
        options: ['auto', 'flex-start', 'flex-end', 'center', 'stretch', 'baseline'],
        key: 'alignSelf'
      },
      {
        label: 'justify-content',
        type: ModifierType.SELECT,
        options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
        key: 'justifyContent'
      },
      {
        label: 'align-items',
        type: ModifierType.SELECT,
        options: ['flex-start', 'flex-end', 'center', 'stretch', 'baseline'],
        key: 'alignItems'
      },
      {
        label: 'align-content',
        type: ModifierType.SELECT,
        options: ['flex-start', 'flex-end', 'center', 'stretch', 'space-between', 'space-around'],
        key: 'alignContent'
      }
    ]
  },
  {
    name: 'Margin',
    target: ModifierTarget.STYLE,
    modifiers: [
      {
        label: 'margin-left',
        type: ModifierType.NUMBER,
        key: 'marginLeft'
      },
      {
        label: 'margin-top',
        type: ModifierType.NUMBER,
        key: 'marginTop'
      },
      {
        label: 'margin-right',
        type: ModifierType.NUMBER,
        key: 'marginRight'
      },
      {
        label: 'margin-bottom',
        type: ModifierType.NUMBER,
        key: 'marginBottom'
      }
    ]
  },
  {
    name: 'Padding',
    target: ModifierTarget.STYLE,
    modifiers: [
      {
        label: 'padding-left',
        type: ModifierType.NUMBER,
        key: 'paddingLeft'
      },
      {
        label: 'padding-top',
        type: ModifierType.NUMBER,
        key: 'paddingTop'
      },
      {
        label: 'padding-right',
        type: ModifierType.NUMBER,
        key: 'paddingRight'
      },
      {
        label: 'padding-bottom',
        type: ModifierType.NUMBER,
        key: 'paddingBottom'
      }
    ]
  }
]
