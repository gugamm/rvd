import * as React from 'react'
import { connect } from 'react-redux'
import { Close, ModalContainer, ModalContent, ContentWrapper, CloseContainer } from './styledComponent'
import { Paragraph, Title, Button, FormField, TextInput } from '../../UI'

class CodeExportModal extends React.Component {
  state = {
    author: 'author',
    slug: 'app-slug',
    description: 'An app description'
  }

  handleSaveDocument = () => {
    const { generateAppState } = this.props
    const { slug, author, description } = this.state
    const appState = generateAppState({ author, slug, description })
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(appState, null, 2)))
    element.setAttribute('download', 'output.json')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  render() {
    return (
      <ModalContainer>
        <ModalContent>
          <CloseContainer>
            <Close onClick={this.props.onClose}>&times;</Close>
          </CloseContainer>
          <ContentWrapper>
            <Title>Export code</Title>
            <Paragraph>To export the code, fullfill some data below and click on the button to export</Paragraph>
            <div style={{ paddingTop: 16 }}>
              <FormField label='Author'>
                <TextInput value={this.state.author} onChange={ev => this.setState({ author: ev.target.value })} />
              </FormField>
              <FormField label='Slug'>
                <TextInput value={this.state.slug} onChange={ev => this.setState({ slug: ev.target.value })}  />
              </FormField>
              <FormField label='Description'>
                <TextInput value={this.state.description} onChange={ev => this.setState({ description: ev.target.value })}  />
              </FormField>
            </div>
            <div style={{ marginTop: 16 }}>
              <Button onClick={this.handleSaveDocument}>Export</Button>
            </div>
          </ContentWrapper>
        </ModalContent>
      </ModalContainer>
    )
  }
}

const mapComponentIdToComponent = (state) => (componentId) => {
  const component = state.components.byId[componentId]
  const children = component.children ? component.children.map(mapComponentIdToComponent(state)) : null

  return {
    id: component.id,
    name: component.name,
    navigation: component.navigation,
    children,
    props: component.props,
    style: component.style
  }
}

const mapSceneIdToScene = (state) => (sceneId) => {
  const scene = state.scenes.byId[sceneId]
  const componentIds = scene.componentIds
  const components = componentIds.map(mapComponentIdToComponent(state))

  return {
    name: sceneId,
    children: components
  }
}

const mapAppToObject = (appState, state, { author, slug, description }) => {
  const appName = appState.name
  const sceneIds = appState.sceneIds

  const screens = sceneIds.map(mapSceneIdToScene(state))

  return {
    name: appName,
    version: '1.0.0',
    author,
    slug,
    description,
    createdAt: new Date().toISOString(),
    screens
  }
}

const mapStateToProps = (state) => ({
  generateAppState({ author, slug, description }) {
    return mapAppToObject(state.app, state, { author, slug, description })
  }
})

export default connect(mapStateToProps)(CodeExportModal)
