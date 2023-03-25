import React, {useState} from 'react';
import Nav from './Nav';
import { useNavigate } from 'react-router-dom';
import "./add.css"
function Addposts(props) {
    const navigate = useNavigate() 
    const [data, setData] = useState({title:"", description:""})
    const token=JSON.parse(localStorage.getItem("notToken"))
    
    const handleData = (e)=>{
        e.preventDefault()
        fetch("https://note-backend-vvfj.onrender.com/v1/post", {
            method:"post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization":token
                },
            body:JSON.stringify(data)
        }).then((res)=>res.json())
        .then((mess)=>{
            navigate("/home")
        }).catch((e)=>{
            console.log(e)
        })
    }

    return (
        <>
        <Nav/>
        <div className='add-container'>
            <form onSubmit={handleData} className='add-form'>
                <div>
                <label htmlFor="title">Title</label>
                <input type="text" placeholder='Title' required onChange={(e)=>{setData({...data, title:e.target.value})}} />
                </div>
                <div>
                <label htmlFor="desc">Description</label>
                <textarea id="desc" cols="30" rows="10" required placeholder='Enter description' onChange={(e)=>{setData({...data, description:e.target.value})}} ></textarea>
                </div>
                <div>
                    <button>Add Note</button>
                </div>
            </form>
        </div>
        </>
    );
}

export default Addposts;