import * as React from 'react'
import { connect } from 'react-redux'
import { Wrapper } from './styledComponents'
import { InitialSceneModal, AddSceneModal } from './components'

class AddSceneTab extends React.Component {
  state = {
    isAdd: false
  }

  toggleAddSceneModal = () => {
    this.setState({
      isAdd: !this.state.isAdd
    })
  }

  render() {
    const { isAdd } = this.state
    const { isFirstScene } = this.props

    if (!isAdd && isFirstScene) {
      return (
        <Wrapper>
          <InitialSceneModal onCreateScene={this.toggleAddSceneModal} />
        </Wrapper>
      )
    }

    return (
      <Wrapper>
        <AddSceneModal />
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  isFirstScene: state.app.sceneIds.length === 0
})

export default connect(mapStateToProps)(AddSceneTab)
