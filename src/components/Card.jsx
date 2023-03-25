import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Nav from './Nav';

function Card(props) {
    const location = useLocation()
    const navigate = useNavigate()
    let month = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "Sept", "Oct", "Nov", "Dec"]
    const token = JSON.parse(localStorage.getItem("notToken"))
    const handleCardDelete =(id)=>{
        fetch(`https://note-backend-vvfj.onrender.com/v1/post/${id}`, {
            method:"delete",
            headers: {
                "Authorization":token
                }
            
        }).then((res)=>res.json())
        .then((data)=>{
           alert("Data Success fully deleted")
           navigate("/home")
        }).catch((e)=>{
            console.log(e)
        })
    }
    return (
        <div>
            <Nav/>
            <div className='card'>
            {
                    location.state.map((val, i)=>{
                        let times = val.createdAt.split("T")
                        let m = parseInt(times[0].split("-")[1])
                        console.log(m)
                        return(
                            <div key={i} className='cards'>
                                <div className='time'>
                                    <p >
                                    <span style={{marginRight:"10px",fontWeight:700}}>{month[m-1]}</span>
                                    <span style={{marginRight:"10px",fontWeight:700}}>{times[0]}</span>
                                    <span>{times[1]}</span>
                                    </p>
                                </div>
                                <h1>{val.title}</h1>
                                <p>{val.description}</p>
                                <button onClick={()=>{handleCardDelete(val._id)}}>Delete</button> <button>Update</button>
                            </div>
                            
                        )
                    })
                }

            </div>
           
        </div>
    );
}

export default Card;