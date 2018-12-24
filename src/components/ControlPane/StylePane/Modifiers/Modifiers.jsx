import * as React from 'react'
import { Wrapper } from './styledComponents'
import { ModifierType } from '../../../../constants'
import TextModifier from './TextModifier'
import NumberModifier from './NumberModifier'
import SelectModifier from './SelectModifier'
import ColorModifier from './ColorModifier'

class Modifiers extends React.Component {
  renderModifier = (modifier) => {
    const { target, activeComponent } = this.props
    const { type } = modifier

    switch (type) {
      case ModifierType.SELECT:
        return <SelectModifier modifier={modifier} activeComponent={activeComponent} target={target} />
      case ModifierType.NUMBER:
        return <NumberModifier modifier={modifier} activeComponent={activeComponent} target={target} />
      case ModifierType.COLOR:
        return <ColorModifier modifier={modifier} activeComponent={activeComponent} target={target} />
      default:
        return <TextModifier modifier={modifier} activeComponent={activeComponent} target={target} />
    }
  }

  render() {
    const { modifiers } = this.props

    const modifiersToRender = modifiers.map((modifier, index) => (
      <React.Fragment key={index}>
        {this.renderModifier(modifier)}
      </React.Fragment>
    ))

    return (
      <Wrapper>
        {modifiersToRender}
      </Wrapper>
    )
  }
}

export default Modifiers
