import React, { Component } from 'react'
import classnames from 'classnames'
import Helper from '../../assets/js/helper.js'
import Avatar from '../Avatar'

class Tpl1 extends Component {
  goLive (item, index) {
    const {reportPrefix} = this.props, position = reportPrefix + index 
    Helper.goLive(item,position);
  }
  render () {
    const {item, index, tabNavUlClass,navTab} = this.props
    const className = classnames({
      'col_item rank': true,
      [`rank_${index + 1}`]: index < 3,
      'rank_normal': index > 2
    })

    let sDecoUrl = null
    if(navTab == 3 && item.sDecorUrl) {
        sDecoUrl = item.sDecorUrl.split('.png')[0] + '_app.png'
        sDecoUrl = sDecoUrl.replace('http://', 'https://')
    }

    return (
      <li className={tabNavUlClass} onClick={()=>this.goLive(item.tJump, index)}>
        <div className={className}>
          { index < 3 ? <span></span> : <span>{index + 1}</span> }
        </div>
        <div className="col_item center_left">
          <Avatar className="table_avatar" url={item.sLogoUrl || item.sLogo}>
            { item.tJump && item.tJump.lTid > 0 && <i className="icon_live"/> }
          </Avatar>
          <div className="list_detail_info">
            <h3 className="word">{item.sNickName}</h3>
          </div>
        </div>
        {
          navTab == 3 ? 
          <div className="col_item">
            {item.lScore}
            <i className="icon_rocket"></i>
          </div>
          :
          <div className="col_item">{item.lScore}</div>
        }
      </li>
    )
  }
}

export default Tpl1

