import styled from 'styled-components'
import { Card } from '../../Card'

export const Wrapper = styled(Card)`
  overflow: auto;
  min-height: 100%;
  display: block;
  background-color: #463a3c;
  width: 316px;
`

export const ElementsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 316px;
`
