import styled from 'styled-components'

export const Wrapper = styled.div`
  background-color: #2b2828;
  display: flex;
  overflow: hidden;
  justify-content: space-between;
  flex-direction: row;
`

export const Title = styled.h1`
  flex-shrink: 1;
  padding: 14px 16px;
  font-size: 17px;
  color: white;
  margin: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const LinksContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

export const Link = styled.a`
  text-decoration: none;
  color: white;
  text-align: center;
  padding: 14px 16px;
  font-size: 17px;
`
