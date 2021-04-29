import React, { Component } from 'react'
import logo from '../../images/covid-logo.png'
import '../../styles/CovidLogo.css'

export default class covidLogo extends Component {
  render() {
    return (
      <div className="body">
        <img src={logo} alt="" className="mainLogo"/>
        <h1 className="title">Como está o coronavírus na minha cidade?</h1>
        <h2 className="subtitle">Rio Grande do Norte</h2>
      </div>
    )
  }
}
