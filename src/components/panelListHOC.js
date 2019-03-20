import React, {Component} from 'react'
import TableList from './TableList'
import Blank from './Blank'

const panelListHOC = function() {
    return function(WrapperedComponent) {
      return class listHOC extends Component {
        render() {
          const {tabNavList, reportPrefix, list, navTab, Tpl,blankMsg, description, wrapOpts} = this.props
          const tableListOpts = {
            Tpl: Tpl,
            navTab: navTab,
            list: list,
            tabNavUlClass: 'col_3',
            reportPrefix: reportPrefix,
            tabNavList: tabNavList,
            description
          }
          return (
            <div>
                <WrapperedComponent {...wrapOpts}/>
                <TableList {...tableListOpts}>
                  <Blank>{blankMsg}</Blank>
                </TableList>
            </div>
          )
        }
      }
    }
  }

  export default panelListHOC;