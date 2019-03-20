import React, {Component} from 'react'
import classnames from 'classnames'
import ModuleWrap from './ModuleWrap'
import TableList from './TableList'
import Blank from './Blank'

const listHOC = function() {
    return function(WrapperedComponent) {
      return class listHOC extends Component {
        render() {
          const {headerClass, topWrapClass, tabNavList, reportPrefix, list, navTab, Tpl, iHour,loadMore, 
                wrapOpts, loadMoreFunc, blankMsg, moduleClass, compPosition,firstThreeLen} = this.props
          const tableListOpts = {
            Tpl: Tpl,
            navTab: navTab,
            list: list,
            className: 'main_list',
            tabNavUlClass: 'col_3',
            reportPrefix: reportPrefix,
            tabNavList: tabNavList
          }
          return (
            <ModuleWrap className={classnames("module_normal", {[moduleClass]:true})}
              header={
                !!headerClass ? 
                <header>
                  { iHour > 0 && <p>{iHour}时</p>}
                  <h3 className={headerClass}></h3>
                </header>
                : 
                ''
              }
              topWrap={
                <div className={topWrapClass}/>
              }
              bottomWrap={
                <div className="bottom_wrap"/>
              }
            >
              { compPosition == '2' && <WrapperedComponent opts={wrapOpts}/> }
              <TableList {...tableListOpts}>
                {
                  firstThreeLen && firstThreeLen > 0 ? '' :
                  <Blank className="main_blank">{blankMsg}</Blank>
                }
              </TableList>
              {
                loadMore && list.length > 0 &&
                <div className="load_more_wrap" onClick={()=>loadMoreFunc()}>
                  <div className="load_more"></div>
                </div>
              }
              { compPosition == '1' && <WrapperedComponent opts={wrapOpts}/> }
            </ModuleWrap>
          )
        }
      }
    }
  }

  export default listHOC;