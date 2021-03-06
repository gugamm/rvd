import * as React from 'react'
import { connect } from 'react-redux'
import { ChromePicker  } from 'react-color'
import { ModifierWrapper, ModifierLabel, ModifierInput } from './styledComponents'
import * as componentsOperations from '../../../../store/components/operations'

const pickerModalStyle = {
  position: 'absolute',
  height: '100%',
  zIndex: '2'
}

const pickerBackdropStyle = {
  position: 'fixed',
  top: '0px',
  bottom: '0px',
  left: '0px',
  right: '0px'
}

const pickerModalContainerStyle = {
  position: 'relative',
  height: 'auto'
}

class ColorModifier extends React.Component {
  state = {
    displayPicker: false,
    selectedColor: {}
  }

  togglePicker = () => {
    this.setState({
      displayPicker: !this.state.displayPicker
    })
  }

  getNextRgbaColorValue = ({ r, g, b, a}) => {
    return `rgb(${r}, ${g}, ${b}, ${a})`
  }

  handleChange = (eventOrColor) => {
    const { modifyComponent, activeComponent, target, modifier: { key } } = this.props

    const nextValue = eventOrColor.target ? eventOrColor.target.value : this.getNextRgbaColorValue(eventOrColor.rgb)

    modifyComponent(activeComponent.id, {
      key,
      target,
      value: nextValue
    })
    this.setState({
      selectedColor: eventOrColor.target ? eventOrColor.target.value : eventOrColor.rgb
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
          <ModifierInput type='text' value={modifierValue} onClick={this.togglePicker} readOnly />
          {this.state.displayPicker && (
            <>
              <div style={pickerBackdropStyle} onClick={this.togglePicker} />
              <div style={pickerModalContainerStyle}>
                <div style={pickerModalStyle}>
                  <ChromePicker color={this.state.selectedColor} onChange={this.handleChange} />
                </div>
              </div>
            </>
          )}
        </div>
      </ModifierWrapper>
    )
  }
}

const mapDispatchToProps = {
  modifyComponent: componentsOperations.modifyComponent
}

export default connect(undefined, mapDispatchToProps)(ColorModifier)
