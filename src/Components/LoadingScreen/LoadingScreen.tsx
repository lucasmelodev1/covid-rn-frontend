import React from 'react'
import ReactLoading from 'react-loading'
import '../../styles/LoadingScreen.css'

export default function LoadingScreen() {
  return (
    <div className="screen">
      <div className="loading">
        <ReactLoading type={"spin"} color={"#333333"} />
      </div>
    </div>
  )
}
