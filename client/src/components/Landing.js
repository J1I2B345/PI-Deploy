import React from 'react';
import {Link} from 'react-router-dom';
import s from './Landing.module.css';


const Landing = () =>{

    return (
        <div className={s.landingimg}>
          <Link to='/home'><button className={s.button}/></Link> 
        </div>
    )
}

export default Landing