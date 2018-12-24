import * as React from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'
import { Wrapper, Title, TitleWrapper, ContentWrapper } from './styledComponents'

class Accordion extends React.Component {
  state = {
    visible: this.props.active || false
  }

  toggleVisibility = () => {
    this.setState(prevState => ({
      visible: !prevState.visible
    }))
  }
  
  render() {
    const { title, children, active, ...rest } = this.props
    return (
      <Wrapper {...rest}>
        <TitleWrapper onClick={this.toggleVisibility}>
          {this.state.visible ? <FaAngleDown /> : <FaAngleUp />}
          <Title>{title}</Title>
        </TitleWrapper>
        <ContentWrapper visible={this.state.visible}>{children}</ContentWrapper>
      </Wrapper>
    )
  }
}

export default Accordion
