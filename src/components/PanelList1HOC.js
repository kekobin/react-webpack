import React  from 'react'
import panelListHOC from './panelListHOC'
import Avatar from './Avatar'
import Helper from '../assets/js/helper'

const PanelList1HOC = ({vRank, iHour}) => {
    return (
        <div>
            {
                vRank.length > 0 &&
                <div className="front_three_list">
                    <ul>
                        {
                            vRank.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <div className="f_wrap">
                                            <div className="f_avatar_wrap">
                                                <Avatar url={item.sLogo} className="border_wrap">
                                                </Avatar>
                                            </div>
                                            <div className="f_info">
                                                <h3 className="word">{item.sNickName}</h3>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            }
        </div>
    )
}

export default panelListHOC()(PanelList1HOC)