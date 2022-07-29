import {React} from 'react';
import {Link} from 'react-router-dom';
import s from './Pokemon.module.css';

const Pokemon = (props)=>{  
    
    return (
        <div className={`${s.div} ${s[`number${props.i}`]} `}>
            <Link  to={`/pokemon/Id/${props.id}`} className={s.link}>
                <div className={s.divname}> 
                    <h1 className={s.h1}> {props.name.toUpperCase()}</h1>           
                </div>
                <div className={s.divimg}> 
                    <img className={s.img} src={props.img} alt={`Imagen de pokemon ${props.name}`}/>
                </div>
                <div className={s.divcontainer}>
                    
                    <div className={s.divtipos}> 
                        {props.tipos.map ((e, i) => {
                            return <span key={i} className={`${s[e.name]} ${s}.tipos`}>{e.name}</span>
                        }
                        )}
                    </div>
                </div>
            </Link>
        </div>
        )
}

export default Pokemon