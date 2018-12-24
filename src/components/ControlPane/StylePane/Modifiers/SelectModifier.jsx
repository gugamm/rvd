import * as React from 'react'
import { connect } from 'react-redux'
import { ModifierWrapper, ModifierLabel, ModifierSelect } from './styledComponents'
import * as componentsOperations from '../../../../store/components/operations'

class SelectModifier extends React.Component {
  handleChange = (event) => {
    const { modifyComponent, activeComponent, target, modifier: { key } } = this.props

    modifyComponent(activeComponent.id, {
      key,
      target, 
      value: event.target.value
    })
  }

  render() {
    const { activeComponent, modifier: { key, label, options }, target } = this.props
    const modifierValue = activeComponent[target] ? (activeComponent[target][key] || '') : ''
    const modifierOptions = options.map((option, index) => (
      <option value={option} key={index}>{option}</option>
    ))

    return (
      <ModifierWrapper>
        <div>
          <ModifierLabel>{label}</ModifierLabel>
        </div>
        <div>
          <ModifierSelect value={modifierValue} onChange={this.handleChange}>
            {modifierOptions}
          </ModifierSelect>
        </div>
      </ModifierWrapper>
    )
  }
}

const mapDispatchToProps = {
  modifyComponent: componentsOperations.modifyComponent
}

export default connect(undefined, mapDispatchToProps)(SelectModifier)
