import React from 'react'
import classnames from 'classnames'
import './index.scss'

const Avatar = ({ url, className, children }) => {
  const defaultImg = require("./img/default.png"), urlFormat = url ? url.replace('http://', 'https://') : ''
  return (
    <div className={classnames("avatar_wrap", { [`${className}`]: true })}>
      <img
        src={ urlFormat }
        onError={(event) => event.target.setAttribute("src", defaultImg)}
      />
      {children}
    </div>
  )
}

export default Avatar