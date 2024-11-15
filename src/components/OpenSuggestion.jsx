import { useContext, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./OpenSuggestion.module.css"
import { RxCrossCircled } from "react-icons/rx";
import createContextProvider from "../store/Provider";

const OpenSuggestion=()=>
{
    const {suggesting,theme,generalArrayNames,setData}=useContext(createContextProvider);

    const [time,setTime]=useState(false);
    useEffect(()=>
    {
        setTimeout(()=>
        {
            setTime(true)
        },820)
    })


    const handleClick=(event)=>
    {
        const clickedValue = event.target.getAttribute('value');
        const clickedKey = event.target.dataset.num;
        setData(
            (def)=>{
                let tell=true;
                def.map((ele)=>
                {

                    if(ele.id===clickedKey)
                    {
                        tell=false;
                    }   
                })
                return tell?[...def,{id:clickedKey,name:clickedValue}]:def;
            }
        );

    };
    

    
    return (
        <div className={styles.open_Suggestion_container} style={{backgroundColor:theme?'rgba(235, 235, 235)':'rgba(30, 30, 30)'}}>
            {
                time && 
                <div className={styles.suggestion_Main}>
                    <RxCrossCircled className={styles.close} style={{color:theme?'black':'white'}} onClick={suggesting}/>
                    <div className={styles.border} style={{color:theme?'black':'white'}}></div>
                    <div className={styles.symtoms_container}>
                        <center>
                            <div><p className="fs-4" style={{color:theme?'black':'white'}}>Symptom</p></div>
                            <div className={styles.symtoms_list}>
                                {
                                    generalArrayNames.map((ele)=>
                                    {
                                        return <div key={ele.num} className={styles.sym} style={{backgroundColor:theme?"rgba(128, 128, 128, 0.3)":" rgba(255, 255, 255, 0.3)",color:theme?'black':'white'}}><p style={{height:'auto'}} key={ele.num} data-num={ele.num} value={ele.name} onClick={handleClick}>{ele.name}</p></div>
                                    })  
                                }
                            </div>
                        </center>
                    </div>
                </div>
            }
            
        </div>
    )
}
export default OpenSuggestion;