import * as React from 'react'
import { TabTitleWrapper, TabsWrapper, Wrapper, ContentWrapper } from './styledComponents'
import Tab from './Tab'
import { ContextMenuTrigger } from 'react-contextmenu'

class Tabs extends React.Component {
  getTabProps = () => {
    return React.Children.map(this.props.children, (child) => {
      return {
        title: child.props.title,
        id: child.props.id,
        style: child.props.style,
        contextMenu: child.props.contextMenu
      }
    })
  }

  getActiveTabChildren = () => {
    const { activeTab } = this.props

    if (!activeTab) {
      return null
    }

    const tabsArray = React.Children.toArray(this.props.children)
    const activeTabChild = tabsArray.filter(child => child.props.id === activeTab)[0]
    const activeTabChildren = activeTabChild.props.children

    return activeTabChildren
  }

  render() {
    const { activeTab, onTabClick, ...rest } = this.props
    const tabTitles = this.getTabProps().map(({ title, id, style, contextMenu }) => {
      if (contextMenu) {
        return (
          <ContextMenuTrigger {...contextMenu} key={id} holdToDisplay={-1}>
            <TabTitleWrapper onClick={() => onTabClick(id)} active={activeTab === id} style={style}>
              {title}
            </TabTitleWrapper>
          </ContextMenuTrigger>
        )
      }

      return (
        <TabTitleWrapper key={id} onClick={() => onTabClick(id)} active={activeTab === id} style={style}>
          {title}
        </TabTitleWrapper>
      )
    })

    return (
      <Wrapper {...rest}>
        <TabsWrapper>
          {tabTitles}
        </TabsWrapper>
        <ContentWrapper>
          {this.getActiveTabChildren()}
        </ContentWrapper>
      </Wrapper>
    )
  }
}

Tabs.Tab = Tab

export default Tabs
