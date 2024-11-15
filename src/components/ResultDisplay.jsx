import { useEffect, useState,useContext} from 'react';
import styles from './ResultDisplay.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlineMedicineBox } from "react-icons/ai";
import createContextProvider from '../store/Provider';

const ResultDisplay=(props)=>
{
    const {per}=props;
    const {high_per,sNo}=per;
    const{data,theme}=useContext(createContextProvider);

    const [result,setResult]=useState({sNo:NaN,disease:'',precautions:[]});
    const [getData,setGetData]=useState(true);
    const [error,setError]=useState(false)
    const [medicineObj,setMedicineObj]=useState([])
    const [string,setString]=useState('show medicine / suggestion');
    const [isClicked, setIsClicked] = useState(false);
    
    const handleClick =() => {
        if (!isClicked) {
            setMedicineObj([]);
            setString('hide medicine / suggestion');
        }
        else
        {
            setString('show medicine / suggestion');
        }
        setIsClicked(!isClicked);
      };

    useEffect(()=>
    {
        const callApi=async()=>
        {
            try {
                const response = await fetch('mapping_specific.json');
                const dataRes = await response.json();
                dataRes.map((ele)=>{
                    if(ele.sNo===sNo)
                    {
                        setResult({sNo:ele.sNo,disease:ele.disease,precautions:ele.precautions})
                    }
                })
                setGetData(false)
              } catch (error) {
                console.error('Error fetching data:', error);
              }
        }
        callApi();
    },[])

    const submitAction=async(event)=>
    {
        event.preventDefault();
        setMedicineObj([])
        const age=event.target.children[0].value;
        if(age<=3 || age>100)
        {
            setError(true);
        }
        else
        {
            setError(false);
            try 
            {
                const response = await fetch('medicine.json');
                const dataRes = await response.json();
                data.map((element1)=>
                {
                    dataRes.map((element2)=>
                    {
                        if(element1.name===element2.symptom)
                        {
                            if(age>=4 && age<=17)
                                setMedicineObj(def=>[...def,{...element1,...{medicine:element2.age.child}}])
                            else if(age>17 && age<=60)
                                setMedicineObj(def=>[...def,{...element1,...{medicine:element2.age.adult}}])
                            else
                                setMedicineObj(def=>[...def,{...element1,...{medicine:element2.age.senior_citizen}}])
                        }
                    })
                })   
            }
            catch (error) 
            {
                console.error('Error fetching data:', error);
            }

        }
    }
   
    return(
        <div className={styles.result_container}>
            {
                getData?<h1>Loading...</h1>:
                <>
                    <div className={styles.precautions_Container}> 
                        <div style={{width:"100%",display:'flex',justifyContent:'space-around',alignItems:"center",position:'relative'}}><h3 style={{margin:"0px",borderBottom:"1px solid red"}}>{result.disease}</h3> <p style={{margin:"0px"}}>({Math.round(high_per)}%)</p></div>
                        <div style={{padding:'10px'}} >
                        {
                            (result.precautions).map((ele)=>
                            {
                            return <li className={styles.precaut} style={{textAlign:'left',padding:'5px',fontSize:'18px'}} key={ele}>{ele}</li>
                            })
                        }
                        </div>
                    </div>
                    <div className={styles.medicine_checker}>
                        <div style={{display:'flex'}}>
                            <button className={styles.showbutton} onClick={handleClick}></button>
                            <p style={{color:'red',fontSize:"12px",margin:"0px",paddingLeft:'10px'}}>* {string}</p>
                        </div>
                        {
                            isClicked && 
                            <div className={styles.medicine_shower}>
                                <form className={styles.from_age} onSubmit={submitAction}>
                                    <input className={styles.formInput} type="text" name="age" placeholder="Enter your age" />
                                    <button style={{padding:"2px 5px"}} type="submit" className="btn btn-success">Submit</button>
                                </form>
                                {
                                    error && <p style={{color:'red'}}>* age not applicable</p>
                                }
                                <div style={{padding:'15px 5px',height:'auto'}}>
                                    {
                                        medicineObj.map((element)=>
                                        {
                                            return <li className={styles.precaut} style={{textAlign:'left',padding:'5px',fontSize:'18px'}} key={element.id}>{element.name} : <AiOutlineMedicineBox /> <a href={`https://www.google.com/search?q=${element.medicine}+medicine`} target="_blank" style={{textDecoration:'none',color:theme?'black':'wheat'}}>{element.medicine}</a></li>
                                        })
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </>
            }
        </div>
    )
}
export default ResultDisplay;