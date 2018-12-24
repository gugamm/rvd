import * as React from 'react'
import { connect } from 'react-redux'
import { Close, ModalContainer, ModalContent, ContentWrapper, CloseContainer } from './styledComponent'
import { Title, Button, FormField, TextInput, SelectInput } from '../../UI'
import * as userComponentTabsOperations from '../../store/userComponentTabs/operations'
import { generateElementDescription } from '../../utils/elements'

class SaveAsComponentModal extends React.Component {
  state = {
    name: '',
    tab: ''
  }

  handleSaveDocument = () => {
    const { name, tab } = this.state
    const { componentToSave, appState } = this.props
    const componentDescription = generateElementDescription(componentToSave, appState.components.byId)
    this.props.addComponentToTab(tab, {
      selectionName: name,
      __custom: true,
      description: componentDescription
    })
    this.props.onClose()
  }

  render() {
    const { userComponentTabs } = this.props

    const tabOptions = userComponentTabs.map(userComponentTab => (
      <option key={userComponentTab.id} value={userComponentTab.id}>{userComponentTab.name}</option>
    ))

    return (
      <ModalContainer>
        <ModalContent>
          <CloseContainer>
            <Close onClick={this.props.onClose}>&times;</Close>
          </CloseContainer>
          <ContentWrapper>
            <Title>Save as component</Title>
            <div style={{ paddingTop: 16 }}>
              <FormField label='Component name'>
                <TextInput value={this.state.name} onChange={ev => this.setState({ name: ev.target.value })} />
              </FormField>
              <FormField label='Tab'>
                <SelectInput value={this.state.tab} onChange={ev => this.setState({ tab: ev.target.value })}>
                  <option value={null}></option>
                  {tabOptions}
                </SelectInput>
              </FormField>
            </div>
            <div style={{ marginTop: 16 }}>
              <Button onClick={this.handleSaveDocument}>Save</Button>
            </div>
          </ContentWrapper>
        </ModalContent>
      </ModalContainer>
    )
  }
}

const mapStateToProps = (state) => ({
  userComponentTabs: state.userComponentTabs.allIds.map(id => state.userComponentTabs.byId[id]),
  componentToSave: state.components.byId[state.activeComponent],
  appState: state
})

const mapDispatchToProps = {
  addComponentToTab: userComponentTabsOperations.addComponent
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveAsComponentModal)
