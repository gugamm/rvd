import * as React from 'react'

class Title extends React.Component {
  render() {
    const { children, ...rest } = this.props
    return (
      <h2 {...rest}>{children}</h2>
    )
  }
}

export default Title
