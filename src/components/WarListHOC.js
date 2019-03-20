import React from 'react'
import listHOC from './listHOC'
import Avatar from './Avatar'

const WarList = ({opts}) => {
    const {lPid,sLogo,lHourScore,iHourRank} = opts
    return  (
        <div>
            {
                lPid > 0 && 
                <div className="module_more">
                    <i className="line"/>
                    <Avatar url={sLogo}/>
                    <p>add:<span>{lHourScore}</span></p>
                    <p>rank:<span>NO.{iHourRank === 0 || iHourRank  > 99 ? '99+' : iHourRank}</span></p>
                </div>
            }
        </div>
    )
}

export default listHOC()(WarList)