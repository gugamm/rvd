import * as React from 'react'
import { Wrapper, LabelWrapper } from './styledComponents'
import { DragSource } from 'react-dnd'
import { ItemTypes } from '../../constants'

const componentSource = {
  beginDrag(props) {
    return {
      component: props.component
    }
  }
}

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource()
  }
}

class ElementSelection extends React.Component {
  render() {
    const { component, onClick, connectDragSource } = this.props
    const { selectionName } = component

    return connectDragSource(
      <div style={{ margin: '10px 7px 5px 7px', border: '1px solid rgba(0,0,0,0.25)' }}>
        <Wrapper onClick={onClick}>
          <LabelWrapper>{selectionName}</LabelWrapper>
        </Wrapper>
      </div>
    )
  }
}

export default DragSource(ItemTypes.COMPONENT, componentSource, collect)(ElementSelection)
