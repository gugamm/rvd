import * as React from 'react'
import { StyledParagraph } from './styledComponents'

class Paragraph extends React.Component {
  render() {
    return (
      <StyledParagraph {...this.props} />
    )
  }
}

export default Paragraph
