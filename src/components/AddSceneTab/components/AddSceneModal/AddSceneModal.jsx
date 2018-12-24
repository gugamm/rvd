import * as React from 'react'
import { connect } from 'react-redux'
import * as appOperations from '../../../../store/app/operations'
import * as activeTabOperations from '../../../../store/activeTab/operations'
import * as activeSceneOperations from '../../../../store/activeScene/operations'
import { Title, Button, TextInput, FormField } from '../../../../UI'
import { ModalWrapper, ModalContentWrapper } from './styledComponents'

class AddSceneModal extends React.Component {
  state = {
    sceneId: ''
  }

  handleAddScene = () => {
    this.props.addScene(this.state.sceneId)
    this.props.setActiveScene(this.state.sceneId)
    this.props.setActiveTab(this.state.sceneId)
  }

  handleSceneIdChange = (event) => {
    this.setState({
      sceneId: event.target.value
    })
  }

  render() {
    const { sceneId } = this.state

    return (
      <ModalWrapper>
        <ModalContentWrapper>
          <Title>Add a scene</Title>
          <FormField label='Name'>
            <TextInput value={sceneId} onChange={this.handleSceneIdChange} />
          </FormField>
          <Button onClick={this.handleAddScene}>Add</Button>
        </ModalContentWrapper>
      </ModalWrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  sceneIds: state.app.sceneIds
})

const mapDispatchToProps = {
  addScene: appOperations.addScene,
  setActiveTab: activeTabOperations.setActiveTab,
  setActiveScene: activeSceneOperations.setActiveScene
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSceneModal)
