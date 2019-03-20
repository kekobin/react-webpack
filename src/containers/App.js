import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import Helper from '../assets/js/helper'
import Tpl1 from '../components/TableList/tpl1'
import PanelList1HOC from '../components/PanelList1HOC'
import PanelList2HOC from '../components/PanelList2HOC'

class App extends Component {
    constructor (props) {
        super(props)
        this.toggleNav = this.toggleNav.bind(this)
        this.togglePanel = this.togglePanel.bind(this)
    }
    toggleNav(type) {
        const { dispatch } = this.props
        dispatch(updateBase({navTab: type}))
    }


    getList() {
    

        return (
            <div className="index_lists">
                // <PanelNavTab {...navTabOpts}/>
                {
                    navTab === 1 &&
                    <PanelList1HOC
                        tabNavList={['a','aa','aa']}
                        reportPrefix='bb/bb/'
                        blankMsg="blank"
                        list={listOne}
                        navTab='1'
                        Tpl={Tpl1}
                        wrapOpts={preHourList}
                    />
                }
                {
                    navTab === 2 &&
                    <PanelList2HOC
                        tabNavList={['b','bb','bb']}
                        reportPrefix='cc/cc/'
                        blankMsg="blank"
                        list={listTwo}
                        navTab='2'
                        Tpl={Tpl1}
                        description={description1}
                    />
                }
            </div>
        )
    }


    render() {
        return (
            <div className={appClassName}>
                // { true ? <PKList {...pkList}/> : this.getList()) }
            </div>
        )
    }
}

const mapStateToProps = state => {
  return {...state}
}

export default connect(mapStateToProps)(App)
