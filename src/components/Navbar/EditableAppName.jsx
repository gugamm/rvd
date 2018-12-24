import * as React from 'react'
import { connect } from 'react-redux'
import * as appOperations from '../../store/app/operations'

class EditableAppName extends React.Component {
  state = {
    isEdit: false,
    nextAppName: ''
  }

  toggleEdit = () => {
    this.setState({
      isEdit: !this.state.isEdit
    })
  }

  handleChangeAppName = (event) => {
    this.setState({
      nextAppName: event.target.value
    })
  } 

  handleBlur = () => {
    this.toggleEdit()
    this.props.renameApp(this.state.nextAppName)
  }

  componentDidMount() {
    this.setState({
      nextAppName: this.props.appName
    })
  }

  render() {
    const { isEdit, nextAppName } = this.state
    const { appName } = this.props

    if (isEdit) {
      return (
        <input
          type='text'
          onChange={this.handleChangeAppName} 
          value={nextAppName} 
          onBlur={this.handleBlur}
        />
      )
    }

    return (
      <span
        onClick={this.toggleEdit}
        style={{ cursor: 'pointer' }}
      >
        {appName}
      </span>
    )
  }
}

const mapStateToProps = (state) => ({
  appName: state.app.name
})

const mapDispatchToProps = {
  renameApp: appOperations.renameApp
}

export default connect(mapStateToProps, mapDispatchToProps)(EditableAppName)
