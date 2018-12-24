import * as React from 'react'
import { FaReact } from 'react-icons/fa'
import { connect } from 'react-redux'
import { CodeExportModal } from '../../components'
import * as appOperations from '../../store/app/operations'
import { Wrapper, Link, Title, LinksContainer } from './styledComponents'
import EditableAppName from './EditableAppName'
import { SaveAsComponentModal } from '../SaveAsComponentModal'

class Navbar extends React.Component {
  state = {
    exportCodeModal: false,
    saveAsComponentModal: false
  }

  handleOpenExportCodeModal = (event) => {
    event.preventDefault()
    this.toggleExportCodeModal()
  }

  toggleExportCodeModal = () => {
    this.setState({
      exportCodeModal: !this.state.exportCodeModal
    })
  }

  handleOpenSaveAsComponentModal = (event) => {
    event.preventDefault()
    this.toggleSaveAsComponent()
  }

  toggleSaveAsComponent = () => {
    this.setState({
      saveAsComponentModal: !this.state.saveAsComponentModal
    })
  }

  render() {
    return (
      <Wrapper>
        {this.state.saveAsComponentModal && <SaveAsComponentModal onClose={this.toggleSaveAsComponent} />}
        {this.state.exportCodeModal && <CodeExportModal onClose={this.toggleExportCodeModal} />}
        <Title>
          <FaReact style={{ marginRight: 8 }} />
          <span>RVD v1.0.0 : <EditableAppName /></span>
        </Title>
        <LinksContainer>
          {this.props.activeComponent && <Link href='#' onClick={this.handleOpenSaveAsComponentModal}>{'Save component'}</Link>}
          <Link href="#" onClick={this.handleOpenExportCodeModal}>{'</>'}</Link>
        </LinksContainer>
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  appName: state.app.name,
  activeComponent: state.activeComponent
})

const mapDispatchToProps = {
  renameApp: appOperations.renameApp
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
