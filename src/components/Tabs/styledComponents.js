import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

export const TabsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  flex-shrink: 0;
`

export const TabTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  cursor: pointer;
  background-color: ${props => props.active ? '#ccc' : '#f1f1f1'};

  &:hover {
    background-color: #d8d8d8; 
  }
`

export const ContentWrapper = styled.div`
  flex-grow: 1;
  display: flex;
`
