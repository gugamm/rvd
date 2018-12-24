import styled from 'styled-components'

export const Wrapper = styled.div``

export const TitleWrapper = styled.div`
  cursor: pointer;
  padding: 8px 16px;
  background-color: #463a3c;
  color: white;
  display: flex;
  align-items: center;
  border-top: 1px solid rgba(0, 0, 0, 0.25);
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
`

export const Title = styled.div`
  margin-left: 8px;
`

export const ContentWrapper = styled.div`
  display: ${props => props.visible ? 'block' : 'none'};
`
