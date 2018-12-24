import * as React from 'react'
import { StyledSelectInput } from './styledComponents'

class SelectInput extends React.Component {
  render() {
    return (
      <StyledSelectInput {...this.props} />
    )
  }
}

export default SelectInput
