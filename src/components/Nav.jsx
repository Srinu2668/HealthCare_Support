import styles from './Nav.module.css';
import { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import createContextProvider from '../store/Provider';
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { IoMenu } from "react-icons/io5";

const Nav=()=>
{
    const {open1,suggesting,theme,setTheme}=useContext(createContextProvider);

    return(
        <header className="py-3 mb-3 border-bottom" style={{justifyContent:'space-between',display:'flex',height:'9vh',padding:'0px 20px', backgroundColor:theme?'white':'black'}}>
            <div className="dropdown">
                {
                    open1 ?'':<IoMenu style={{cursor:'pointer',height:'30px', width:'30px',color:theme?'black':'white'}} onClick={suggesting}/>
                }
            </div>
            <div className={styles.lane}>
                {
                    theme?<MdOutlineDarkMode style={{color:theme?'black':'white',height:22,width:22,cursor:'pointer'}} onClick={()=>setTheme(the=>!the)}/>
                    :<MdOutlineLightMode style={{color:theme?'black':'white',height:22,width:22,cursor:'pointer'}} onClick={()=>setTheme(the=>!the)} />
                }
            </div>  
        </header>
    )
}
export default Nav;