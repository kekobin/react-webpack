import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import Helper from '../assets/js/helper'
import Tpl1 from '../components/TableList/tpl1'
import WarListHOC from '../components/WarListHOC'
import CarListHOC from '../components/CarListHOC'
import UserListHOC from '../components/UserListHOC'

import { updateBase, updateIDS, queryHourRank, receiveHourRank,queryPresenterMatchInfo, receiveDriverRank,queryDriverMasterRank,receiveDriverMasterRank,queryDriverRank } from '../actions/mapp'

class Mapp extends Component {
    constructor (props) {
      super(props)
      this.loadMore1 = this.loadMore1.bind(this)
      this.loadMore2 = this.loadMore2.bind(this)
      this.loadMore3 = this.loadMore3.bind(this)
    }
    componentDidMount () {
      const {dispatch} = this.props;

      dispatch(updateBase(baseParam))
      dispatch(updateIDS({pid, cid, sid, uid}))

      // //请求数据
      // dispatch(queryHourRank())
      // dispatch(queryDriverRank())
      // dispatch(queryPresenterMatchInfo(pid))
    }
   
    getNavContent1 () {
      const { base, hourRank, winnerRank, driverRank, userMaster } = this.props, { groupID } = base, groupFilter = [1,2,3].filter((item) => item !== groupID),{ iHour, list, current, loadMore } = hourRank
      return (
        <div className="nav_tab_1">
          // <WarListHOC
          //   iHour={iHour}
          //   headerClass={`hd_rank2_${groupID}`}
          //   topWrapClass="top_wrap_1"
          //   tabNavList={['a','a','a']}
          //   reportPrefix='a/a/'
          //   blankMsg="a"
          //   list={current}
          //   navTab='1'
          //   compPosition='1'
          //   Tpl={Tpl1}
          //   loadMore={loadMore}
          //   wrapOpts={userMaster}
          //   loadMoreFunc={this.loadMore1}
          // />
          // <CarListHOC
          //   headerClass={`hd_rank3_${groupID}`}
          //   topWrapClass="top_wrap_1"
          //   tabNavList={['b','b','b']}
          //   reportPrefix='b/b/'
          //   blankMsg="b"
          //   list={driverRank.current}
          //   navTab='2'
          //   compPosition='1'
          //   Tpl={Tpl1}
          //   loadMore={driverRank.loadMore}
          //   wrapOpts={userMaster}
          //   loadMoreFunc={this.loadMore2}
          // />
        </div>
      )
    }
    render() {
        const {base, dispatch} = this.props, {tab} = base

        return (
        <div className="main_content">
            { tab === 1 && this.getNavContent1()}
        </div>
        );
    }
}

const mapStateToProps = state => {
  return {...state}
}

export default connect(mapStateToProps)(Mapp)
