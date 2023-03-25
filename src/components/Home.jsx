import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import "./home.css"
import { useNavigate } from 'react-router-dom';
function Home(props) {
    const [arr, setArr] = useState([])
    const navigate = useNavigate()
    const token=JSON.parse(localStorage.getItem("notToken"))
    let month = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "Sept", "Oct", "Nov", "Dec"]
    useEffect(()=>{
        handleData()
    }, [])

    function handleData(){
        if(!token){
           return navigate("/") 
        }
        fetch("https://note-backend-vvfj.onrender.com/v1/post", {
            method:"get",
            headers: {
                "Authorization":token
                }
            
        }).then((res)=>res.json())
        .then((data)=>{
            setArr(data)
        }).catch((e)=>{
            console.log(e)
        })
    }

    const handleCard=(i)=>{
        navigate("/card", {state:[arr[i]]})
    }

    const handleSearch = (e)=>{
        let id = e.target.value
        if(id){
        fetch(`https://note-backend-vvfj.onrender.com/v1/post/${id}`, {
            method:"get",
            headers: {
                "Authorization":token
                }
            
        }).then((res)=>res.json())
        .then((data)=>{
            if(data.length) setArr(data)
            else{
                handleData()
            }
        }).catch((e)=>{
            console.log(e)
        })
    }
    else{
        handleData()
    }
    }
    return (
        <>
        <Nav handleData={handleData}/>
        
            <div className='home-container'>
            <div className='search'>
                <input type="text" placeholder='Search by title'/>
            </div>
                {
                    arr.map((val, i)=>{
                        let times = val.createdAt.split("T")
                        let m = parseInt(times[0].split("-")[1])
                        console.log(m)
                        return(
                            <div key={i} className='cards' onClick={()=>handleCard(i)}>
                                <div className='time'>
                                    <p >
                                    <span style={{marginRight:"10px",fontWeight:700}}>{month[m-1]}</span>
                                    <span style={{marginRight:"10px",fontWeight:700}}>{times[0]}</span>
                                    <span>{times[1]}</span>
                                    </p>
                                </div>
                                <h1>{val.title}</h1>
                                <p>{val.description}</p>
                            </div>
                        )
                    })
                }
            </div>
        </>
        
    );
}

export default Home;