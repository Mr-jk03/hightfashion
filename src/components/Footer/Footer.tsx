import React from 'react'

const Footer = () => {
  return (
    <div style={{
        height:'280px',
        width:'100%',
        backgroundColor:"#000"
    }}
        className='home-footer'
    >
      <div className="container">
        <div className="row">
            <div className="col-md-3 col-12">
                <span style={{color:"#fff"}}>ft</span>
            </div>
            <div className="col-md-3 col-12">
                <span style={{color:"#fff"}}>ft</span>
            </div>
            <div className="col-md-3 col-12">
                <span style={{color:"#fff"}}>ft</span>
            </div>
            <div className="col-md-3 col-12">
                <span style={{color:"#fff"}}>ft</span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
