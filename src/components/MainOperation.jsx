import { useContext, useState } from "react";
import createContextProvider from "../store/Provider";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './MainOperation.module.css';
import ResultDisplay from "./ResultDisplay";
import { MdDelete } from "react-icons/md";

const MainOperation=()=>
{
    const{theme,generalArrayNames,data,setData}=useContext(createContextProvider);
    const [newArray,setNewArray]=useState([]);
    const [openResult,setOpenResult]=useState(false);
    const [per,setPer]=useState({high_per:0,sNo:NaN})

    const symtemsName=(event)=>
    {
        const value=event.target.value;
        if(value==='')
        {
            setNewArray([]);
        }
        else
        {
            const array=generalArrayNames.filter((ele)=>
            {
                return ele.name.toLowerCase().includes(value.toLowerCase())
            })
            setNewArray(array);
        }
    }

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
    const handleDelete=(value)=>
    {
        data.length<=3 && setOpenResult(false)
        const array=data.filter(element=>
        {
            return element.id!=value?element:'';
        })
        setData(array)
    }
    const submit=async(eve)=>
    {
        eve.preventDefault();
        const array=await data.map((element)=>
        {
            return element.name;
        })
        if(array.length=== 0)
            setOpenResult(false);
        else if(array.length>2)
        {
            try {
                const response = await fetch('diseaseObj.json');
                const data_Res = await response.json();
                let tempPer=0;
                let tempNum=null;
    
                // calulate the percentage of matching
                await data_Res.map((die)=>
                    {
                        const calculateMatchPercentage=(array1, array2)=> {
                            const intersection = array1.filter(item => array2.includes(item));

                            const matchCount = intersection.length;
                            const ar_length=array1.length;

                            const percentageMatch = (matchCount/ar_length ) * 100;
                            return percentageMatch;
                          }
                          const percentage=calculateMatchPercentage(die.symptoms,array);
                          if(percentage>=tempPer)
                          {
                            tempPer=percentage;
                            tempNum=die.sNo;
                          }
                        // console.log(`${die.sNo} at Percentage match: ${percentage}%`);
                    })
                    setPer({high_per:tempPer,sNo:tempNum})
                    setOpenResult(true);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }

    return(
        <center className={styles.scrollable_container} style={{color:theme?'black':'white',flexGrow:'1',height:'88.7vh',padding:'5px 0px'}}>
            <h2 className="lh-lg font-monospace">Online Health Care</h2>
            <div className={`card-body ${styles.sender}`} style={{padding:"10px 0px 15px 0px"}}>
                <div className="container-fluid">
                    <form className="d-flex" role="search" onSubmit={submit}>
                        <input className="form-control me-1" onChange={symtemsName} style={{backgroundColor:'rgba(235, 235, 235)'}} type="search" placeholder="Search Symptom..." aria-label="Search"/>
                        <button type="submit" className="btn btn-outline-success">Submit</button>
                    </form>
                    <div className={styles.sear_list}>
                        {
                            newArray.map((ele)=>
                            {
                                return <div className={styles.sym} style={{backgroundColor:"white",color:'black'}} key={ele.num}>
                                            <p data-num={ele.num} value={ele.name} onClick={handleClick}>{ele.name}</p>
                                        </div> 
                            })
                        }
                    </div>
                </div>
            </div>
            <div className={`card ${styles.collector}`} style={{backgroundColor:theme?'rgba(235, 235, 235)':'rgba(30, 30, 30)',color:theme?'black':'white'}}>
                <div className={`card-body`} style={{padding:'5px',display:'flex',flexDirection:"column",height: "10rem"}}>
                    <div style={{width:'100%'}}>
                    {
                        data.length<3 && <p className={`lh-lg font-monospace ${styles.warnPara}`} style={{width:'100%'}}>Enter {3-data.length} more Symptoms</p>
                    }
                    </div>
                    <div className={`card-body ${styles.symtoms_list}`} style={{padding:'5px'}}>
                    {
                        data.map((ele)=>
                        {
                            return <div key={ele.id} className={styles.sym} style={{backgroundColor:"white",color:'black'}}>
                                        <p key={ele.id}>{ele.name}</p>
                                        <MdDelete  onClick={() => handleDelete(ele.id)} className={styles.dele_Icon}/>
                                    </div> 
                        })
                    }
                    </div>
                </div>
            </div>
            {
                openResult && <ResultDisplay per={per}/>
            }
        </center>
    )
}
export default MainOperation;