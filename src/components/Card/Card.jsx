import * as React from 'react'
import { Wrapper } from './styledComponents'

class Card extends React.Component {
  render() {
    const { children, ...rest } = this.props

    return (
      <Wrapper {...rest}>
        {this.props.children}
      </Wrapper>
    )
  }
}

export default Card
