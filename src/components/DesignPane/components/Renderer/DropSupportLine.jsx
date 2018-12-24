import * as React from 'react'

class DropSupportLine extends React.Component {
  render() {
    const { left, top, width, height, color } = this.props

    return (
      <div style={{ position: 'absolute', left, top, width, height, backgroundColor: color }} />
    )
  }
}

export default DropSupportLine
