import styled from 'styled-components'

export const ModalContainer = styled.div`
  position: fixed;
  display: flex;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
`

export const ModalContent = styled.div`
  flex-direction: column;
  background-color: #fefefe;
  margin: 15% auto;
  width: 400px;
  height: 300px;
  padding: 20px;
  border: 1px solid #888;
`

export const CloseContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 8px 16px 8px 16px;
`

export const Close = styled.span`
  color: #aaa;
  font-size: 28px;
  font-weight: bold;

  &:hover {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }

  &:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 32px 16px 32px;
`
