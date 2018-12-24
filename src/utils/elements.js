import * as React from 'react'
import uuid from 'uuid/v4'
import { textStyleManager } from './styleManagers/textStyleManager'
import { buttonStyleManager } from './styleManagers/buttonStyleManager'
import { textAreaStyleManager } from './styleManagers/textAreaStyleManager'
import { imageStyleManager } from './styleManagers/imageStyleManager'
import { textInputStyleManager } from './styleManagers/textInputStyleManager'
import { boxStyleManager } from './styleManagers/boxStyleManager'

/*
  ATOMIC UI ELEMENTS

  - Text (div)
  - TextInput (<input />)
  - Button (<button />)
  - Image
  - TextArea (textarea)

  LAYOUT ELEMENTS

  - Box (div) -> Columns / Size

  HELPER ELEMENTS

  - Card
  - 2 Columns
  - 3 Columns
  - Navbar
  - Jumbotron
  - Footer
*/

/******************
 * UI ELEMENTS
 ******************/

const UIText = {
  selectionName: 'Text',
  generateView({ style, props }) {
    return <div style={style}>{props.text}</div>
  },
  generateInitialComponent(parentId) {
    return {
      id: uuid(),
      parentId,
      name: '@UI/TEXT',
      children: null,
      props: {
        text: 'Hello World'
      },
      style: {
        display: 'flex',
        flexDirection: 'column'
      },
      navigation: {
        to: null
      }
    }
  },
  generateStyleManager(appState) {
    return textStyleManager(appState)
  }
}

const UIButton = {
  selectionName: 'Button',
  generateView({ props, style }) {
    return <button style={style}>{props.text}</button>
  },
  generateInitialComponent(parentId) {
    return {
      id: uuid(),
      parentId,
      name: '@UI/BUTTON',
      children: null,
      props: {
        text: 'Click me'
      },
      style: {
        display: 'flex',
        flexDirection: 'column'
      },
      navigation: {
        to: null
      }
    }
  },
  generateStyleManager(appState) {
    return buttonStyleManager(appState)
  }
}

const UITextInput = {
  selectionName: 'TextInput',
  generateView({ style }) {
    return <input type='text' style={style} />
  },
  generateInitialComponent(parentId) {
    return {
      id: uuid(),
      parentId,
      name: '@UI/TEXT_INPUT',
      children: null,
      props: {},
      style: {
        display: 'flex',
        flexDirection: 'column'
      },
      navigation: {
        to: null
      }
    }
  },
  generateStyleManager(appState) {
    return textInputStyleManager(appState)
  }
}

const UIImage = {
  selectionName: 'Image',
  generateView({ style, props }) {
    return <img src={props.src} style={style} alt={props.alt} />
  },
  generateInitialComponent(parentId) {
    return {
      id: uuid(),
      parentId,
      name: '@UI/IMAGE',
      children: null,
      props: {
        source: null,
        alt: 'image'
      },
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: 300,
        height: 300
      },
      navigation: {
        to: null
      }
    }
  },
  generateStyleManager(appState) {
    return imageStyleManager(appState)
  }
}

const UITextArea = {
  selectionName: 'Textarea',
  generateView({ style, props }) {
    return <textarea style={style} {...props} />
  },
  generateInitialComponent(parentId) {
    return {
      id: uuid(),
      parentId,
      name: '@UI/TEXT_AREA',
      children: null,
      props: {},
      style: {
        display: 'flex',
        flexDirection: 'column'
      },
      navigation: {
        to: null
      }
    }
  },
  generateStyleManager(appState) {
    return textAreaStyleManager(appState)
  }
}

/******************
 * LAYOUT ELEMENTS
 ******************/

const LayoutBox = {
  selectionName: 'Box',
  generateView({ children, style }) {
    return (
      <div style={style}>{children}</div>
    )
  },
  generateInitialComponent(parentId) {
    return {
      id: uuid(),
      parentId,
      name: '@LAYOUT/BOX',
      children: null,
      props: {},
      style: {
        height: 20,
        display: 'flex',
        flexDirection: 'column'
      },
      navigation: {
        to: null
      }
    }
  },
  generateStyleManager(appState) {
    return boxStyleManager(appState)
  }
}

/******************
 * HELPER FUNCTIONS
 ******************/

export const generateElementDescription = (component, componentsById) => {
  const { navigation, children, props, style, name } = component
  const childrenComponentDescription = children ? children.map(childId => generateElementDescription(componentsById[childId], componentsById)) : null
  const elementDescription = {
    name,
    navigation,
    children: childrenComponentDescription,
    props: { ...props},
    style: { ...style}
  }
  return elementDescription
}

export const generateComponentsTreeFromCustomDescription = (componentDescription, parentId) => {
  const initialTree = {
    rootComponentId: null,
    byId: {},
    allIds: []
  }

  enhanceComponentsTreeFromCustomDescription(componentDescription, parentId, initialTree)

  return initialTree
}

const enhanceComponentsTreeFromCustomDescription = (componentDescription, parentId, tree) => {
  const rootComponent = generateComponentFromCustomDescription(componentDescription, parentId, tree)
  tree.rootComponentId = rootComponent.id
}

const generateComponentFromCustomDescription = (componentDescription, parentId, tree) => {
  const { name, navigation, props, style, children } = componentDescription

  const component = {
    id: uuid(),
    parentId,
    name,
    children: null,
    props,
    style,
    navigation
  }

  tree.byId[component.id] = component
  tree.allIds.push(component.id)

  component.children = children ? children.map(childDescription => generateComponentFromCustomDescription(childDescription, component.id, tree).id) : null

  return component
}

export const ElementGenerators = {
  '@UI/TEXT': UIText,
  '@UI/BUTTON': UIButton,
  '@UI/TEXT_INPUT': UITextInput,
  '@UI/IMAGE': UIImage,
  '@UI/TEXT_AREA': UITextArea,
  '@LAYOUT/BOX': LayoutBox
}
