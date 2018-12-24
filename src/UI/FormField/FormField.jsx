import * as React from 'react'
import { StyledFormField, LabelWrapper } from './styledComponents'

class FormField extends React.Component {
  render() {
    const { label, children } = this.props

    const labelContent = label ? <LabelWrapper>{label}</LabelWrapper> : null

    return (
      <StyledFormField>
        {labelContent}
        {children}
      </StyledFormField>
    )
  }
}

export default FormField
