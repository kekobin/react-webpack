import React  from 'react'
import listHOC from './listHOC'
import Avatar from './Avatar'

const CarList = ({opts}) => {
    const {lPid,sLogo,lScore,iRank} = opts
    return (
        <div>
            {
                lPid > 0 && 
                <div className="module_more">
                    <i className="line"/>
                    <Avatar url={sLogo}/>
                    <p>all:<span>{lScore}</span></p>
                    <p>rank:<span>NO.{iRank === 0 || iRank  > 99 ? '99+' : iRank}</span></p>
                </div>
            }
        </div>
    )
}

export default listHOC()(CarList)