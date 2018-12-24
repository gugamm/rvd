import * as React from 'react'
import { Title, Button, Paragraph } from '../../../../UI'
import { ModalWrapper, ModalContentWrapper } from './styledComponents'

class InitialSceneModal extends React.Component {
  render() {
    return (
      <ModalWrapper>
        <ModalContentWrapper>
          <Title>Create a scene</Title>
          <Paragraph>Looks like you don`t have a scene created yet. Click on the button below to create your first scene!</Paragraph>
          <Button onClick={this.props.onCreateScene}>Create a scene</Button>
        </ModalContentWrapper>
      </ModalWrapper>
    )
  }
}

export default InitialSceneModal
