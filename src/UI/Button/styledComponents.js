import styled from 'styled-components'

export const StyledButton = styled.button`
  border: none;
  display: inline-block;
  padding: 8px 16px;
  vertical-align: middle;
  overflow: hidden;
  text-decoration: none;
  background-color: ${props => props.danger ? '#f3213e' : '#2196F3'};
  color: #fff;
  cursor: pointer;
  text-align: center;
  white-space: nowrap;

  &:hover {
    color: #000;
    background-color: #ccc;
  }
`
