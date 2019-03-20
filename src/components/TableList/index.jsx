import React, { Component } from 'react'
import classnames from 'classnames'
import './index.scss'

class TableList extends Component {
  render () {
    const {description, tabNavUlClass, tabNavList, className, Tpl, reportPrefix, list, navTab} = this.props
    

    return (
      <div className={classnames("table_list", {[`${className}`]:true})}>
        {description}
        {
          tabNavList.length >= 2 &&
          <nav className="table_nav">
            <ul className={classnames({[`${tabNavUlClass}`]: true})}>
              {
                tabNavList.map((item, index) =>{
                  return (
                    <li className="col_item center" key={index}>{item}</li>
                  )
                })
              }
            </ul>
          </nav>
        }
        {
          list.length > 0 ? 
          <ul className="table_ul">
            { list.map((item, index) => <Tpl item={item} index={index} key={index} reportPrefix={reportPrefix} tabNavUlClass={tabNavUlClass} navTab={navTab} /> ) }
          </ul>
          :
          this.props.children
        }
      </div>
    )
  }
}

export default TableList

