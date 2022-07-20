import React from 'react';
import s from './Pagination.module.css';


const Pagination =({totalPokes, pokesPerPage, changePage})=>{
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalPokes/pokesPerPage); i++){
        pageNumbers.push(i)
    }
   

    return <nav className={s.nav}>
            <ul className={s.ul}>
                {pageNumbers.map(e =>{return <li className={s.li} key={e} onClick={event => changePage(parseInt(e))}> <a>{e}</a> </li>})}
            </ul>
    </nav>

}


export default Pagination