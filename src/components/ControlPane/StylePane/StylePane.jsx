import * as React from 'react'
import { connect } from 'react-redux'
import { Accordion } from '../../Accordion'
import { Wrapper } from './styledComponents'
import { Modifiers } from './Modifiers'
import { ElementGenerators } from '../../../utils/elements'

class StylePane extends React.Component {
  render() {
    const { activeComponent, appState } = this.props

    if (!activeComponent) {
      return (
        <Wrapper style={{ display: 'flex', justifyContent: 'center'}}>
          <div style={{ marginTop: 32, color: '#b9a5a6', fontSize: 19 }}>
            Select a component!
          </div>
        </Wrapper>
      )
    }

    const styleManager = ElementGenerators[activeComponent.name].generateStyleManager(appState)

    const styles = styleManager.map((style, index) => (
      <Accordion title={style.name} key={index} active>
        <Modifiers target={style.target} modifiers={style.modifiers} activeComponent={activeComponent} />
      </Accordion>
    ))

    return (
      <Wrapper>
        {styles}
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  activeComponent: state.components.byId[state.activeComponent] || null,
  appState: state
})

export default connect(mapStateToProps)(StylePane)

