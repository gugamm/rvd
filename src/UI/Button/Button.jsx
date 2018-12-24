import * as React from 'react'
import { StyledButton } from './styledComponents'

class Button extends React.Component {
  render() {
    return (
      <StyledButton {...this.props} />
    )
  }
}

export default Button
