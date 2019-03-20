import React from 'react'
import listHOC from './listHOC'
import Avatar from './Avatar'

const UserList = ({opts}) =>  {
    return (
        <div>
            {
            opts.length > 0 &&
            <div className="best_three_boss">
                <ul>
                {
                    opts[1] && 
                    <li>
                        <Avatar url={opts[1].sLogo}></Avatar>
                        <h3 className="word">{opts[1].sNickName}</h3>
                    </li>
                }
                {
                    opts[0] && 
                    <li>
                        <Avatar url={opts[0].sLogo}></Avatar>
                        <h3 className="word">{opts[0].sNickName}</h3>
                    </li>
                }
                {
                    opts[2] &&
                    <li>
                        <Avatar url={opts[2].sLogo}></Avatar>
                        <h3 className="word">{opts[2].sNickName}</h3>
                    </li>
                }
                </ul>
                { opts.length > 3 && <i className="line"/> }
            </div>
            }
        </div>
    )
}

export default listHOC()(UserList)