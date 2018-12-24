import * as React from 'react'
import { connect } from 'react-redux'
import { Close, ModalContainer, ModalContent, ContentWrapper, CloseContainer } from './styledComponent'
import { Title, Button, FormField, TextInput } from '../../../../UI'
import * as userComponentTabsOperations from '../../../../store/userComponentTabs/operations'

class AddTabModal extends React.Component {
  state = {
    tabName: ''
  }

  handleAddTab = () => {
    const { addTab } = this.props
    const { tabName } = this.state
    addTab(tabName)
    this.props.onClose()
  }

  render() {
    return (
      <ModalContainer>
        <ModalContent>
          <CloseContainer>
            <Close onClick={this.props.onClose}>&times;</Close>
          </CloseContainer>
          <ContentWrapper>
            <Title>Add custom tab</Title>
            <div style={{ paddingTop: 16 }}>
              <FormField label='Tab name'>
                <TextInput value={this.state.tabName} onChange={ev => this.setState({ tabName: ev.target.value })} />
              </FormField>
            </div>
            <div style={{ marginTop: 16 }}>
              <Button onClick={this.handleAddTab}>Add</Button>
            </div>
          </ContentWrapper>
        </ModalContent>
      </ModalContainer>
    )
  }
}

const mapDispatchToProps = {
  addTab: userComponentTabsOperations.addTab 
}

export default connect(null, mapDispatchToProps)(AddTabModal)
