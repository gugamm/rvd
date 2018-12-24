import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #463a3c;
  cursor: move;
  color: #b9a5a6;

  &:hover {
    background-color: #a06e71;
  }
`

export const LabelWrapper = styled.div`
  text-align: center;
  font-size: 16px;
`

export const FontWrapper = styled.div`
  font-size: 48px;
`
