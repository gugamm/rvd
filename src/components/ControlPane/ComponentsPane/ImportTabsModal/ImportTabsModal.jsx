import * as React from 'react'
import { connect } from 'react-redux'
import { Close, ModalContainer, ModalContent, ContentWrapper, CloseContainer } from './styledComponent'
import { Title, Button, FormField, TextInput } from '../../../../UI'
import * as userComponentTabsOperations from '../../../../store/userComponentTabs/operations'

class ImportTabsModal extends React.Component {
  state = {
    tabConfigFile: null
  }

  readFile = (file) => {
    return new Promise(resolve => {
      const fileReader = new FileReader()
      fileReader.onload = (event) => {
        resolve(event.target.result)
      }
      fileReader.readAsText(file)
    })
  }

  handleImportTabs = async () => {
    const fileContent = await this.readFile(this.state.tabConfigFile)
    const jsonContent = JSON.parse(fileContent)
    this.props.importTabs(jsonContent)
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
            <Title>Import tabs</Title>
            <div style={{ paddingTop: 16 }}>
              <FormField label='Tab config file'>
                <TextInput type='file' onChange={ev => this.setState({ tabConfigFile: ev.target.files[0] })} />
              </FormField>
            </div>
            <div style={{ marginTop: 16 }}>
              <Button onClick={this.handleImportTabs}>Import</Button>
            </div>
          </ContentWrapper>
        </ModalContent>
      </ModalContainer>
    )
  }
}

const mapDispatchToProps = {
  importTabs: userComponentTabsOperations.importTabs
}

export default connect(null, mapDispatchToProps)(ImportTabsModal)
