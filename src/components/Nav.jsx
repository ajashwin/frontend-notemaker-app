import React from 'react';
import {Link, Outlet, useNavigate} from "react-router-dom"
import "./home.css"
function Nav(props) {
    const navigate = useNavigate()
    const token = JSON.parse(localStorage.getItem("notToken"))
    const handleLogOut=()=>{
        localStorage.removeItem("notToken")
        navigate("/")
    }

    const handleDeleteAll =()=>{
        alert("Are you Sure to delete all data")
        fetch("https://note-backend-vvfj.onrender.com/v1/post", {
            method:"delete",
            headers: {
                "Authorization":token
                }
            
        }).then((res)=>res.json())
        .then((data)=>{
           alert("Data Success fully deleted")
           props.handleData()
        }).catch((e)=>{
            console.log(e)
        })
    }
    return (
        <>
         <nav>
                <ul>
                    <li>
                        <Link to={"/home"} className="links">Home</Link>
                    </li>
                    <li>
                        <Link to={"/add"} className="links">AddNotes</Link>
                    </li>
                    <li onClick={handleDeleteAll}>
                        DeleteALL
                    </li>
                    <li>
                        ExportPdf
                    </li>
                    <li onClick={handleLogOut}>
                        LogOut
                    </li>

                </ul>
            </nav>

        </>
    );
}

export default Nav;