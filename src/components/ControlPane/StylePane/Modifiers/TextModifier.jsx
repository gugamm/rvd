import * as React from 'react'
import { connect } from 'react-redux'
import { ModifierWrapper, ModifierLabel, ModifierInput } from './styledComponents'
import * as componentsOperations from '../../../../store/components/operations'

class TextModifier extends React.Component {
  handleChange = (event) => {
    const { modifyComponent, activeComponent, target, modifier: { key } } = this.props

    modifyComponent(activeComponent.id, {
      key,
      target, 
      value: event.target.value
    })
  }

  render() {
    const { activeComponent, modifier: { key, label }, target } = this.props
    const modifierValue = activeComponent[target][key] || ''

    return (
      <ModifierWrapper>
        <div>
          <ModifierLabel>{label}</ModifierLabel>
        </div>
        <div>
          <ModifierInput type='text' value={modifierValue} onChange={this.handleChange} />
        </div>
      </ModifierWrapper>
    )
  }
}

const mapDispatchToProps = {
  modifyComponent: componentsOperations.modifyComponent
}

export default connect(undefined, mapDispatchToProps)(TextModifier)
