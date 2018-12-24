import * as React from 'react'
import ComponentView from './ComponentView'

class Renderer extends React.Component {
  render() {
    const { components } = this.props

    const elementsToRender = components.map((component) => (
      <ComponentView componentDescription={component} key={component.id} />
    ))

    return elementsToRender
  }
}

export default Renderer
