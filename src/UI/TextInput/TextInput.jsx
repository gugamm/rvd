import * as React from 'react'
import { StyledTextInput } from './styledComponents'

class TextInput extends React.Component {
  render() {
    return (
      <StyledTextInput {...this.props} />
    )
  }
}

export default TextInput
