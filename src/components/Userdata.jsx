import React, { useEffect, useState } from 'react';
import './MyForms.css'
import './User.css'
import axios from 'axios'

const Userdata = () => {
    const [user,setUser]=useState({
        Name:"",
        Email:"",
        Password: "",
        PhoneNumber:""
    })
    const [data,setDate] = useState([])

    const [id,setId]=useState(null)
    const changeHandler = (e)=>{
        // console.log(e.target)
        const {name,value,type} = e.target
        setUser({
        ...user,[name]:value
        })
    }

    const submitHandler = (e)=>{
        e.preventDefault();
        try{
            if(id!==null){
                    const EditRes = axios.put(`http://localhost:5000/user/${id}`,user)
                    console.log(EditRes,"edit")
                    if(EditRes){
                        // const updateData = [...data]
                        // updateData[id]=user
                        setDate(EditRes.data)
                        setId(null)
                    }   
            }else{
                const responce = axios.post('http://localhost:5000/user',user)
                if(responce){
                    setDate([...data,user])
                }
            }
        }catch(err){
            console.log(err)
        }
       
    }

    useEffect(()=>{
        const getData=async()=>{
            const response  = await axios.get("http://localhost:5000/user")
            // console.log(response.data)
            if(response){
                setDate(response.data)
            }
        }
        getData()
    },[id])

    const deleteHandler = (e)=>{
        // console.log(e.id)
        const deleteResponce = axios.delete(`http://localhost:5000/user/${e.id}`)
        if(deleteResponce){
            const deteteRes = data.filter((val)=> val.id !== e.id )
            setDate(deteteRes)
        }
    }

    const editHandler = (e)=>{
        // console.log(e.id)
        setId(e.id)
        setUser({
            Name:e.Name,
            Email:e.Email,
            PhoneNumber:e.PhoneNumber
        })
    }
  return (
    <div style={{marginTop:"2rem"}} className='main'>
        <form onSubmit={submitHandler}>
            <div className='fields'>
                <label>Name</label>
                <input type='text' name="Name" value={user.Name} onChange={changeHandler} />
            </div>
            <div className='fields'>
                <label>Email</label>
                <input type='email' name="Email" value={user.Email} onChange={changeHandler} />
            </div>
            <div className='fields'>
                <label>Password</label>
                <input type='password' name="Password" value={user.Password} onChange={changeHandler} />
            </div>
            <div className='fields'>
                <label>PhoneNumber</label>
                <input type='tel' name="PhoneNumber" value={user.PhoneNumber} onChange={changeHandler} />
            </div>
            <div>
                <button type='submit'>
                    {id?"Update":"submit"}
                </button>
            </div>
        </form>
        <div style={{marginTop:"3rem"}}>
            <table>
                <tr>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>PhoneNumber</th>
                    <th colspan="2">Edit/Delete</th>
                </tr>
                {
                   data && data.map((e,i)=>(
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td>{e.Name}</td>
                            <td>{e.Email}</td>
                            <td>{e.PhoneNumber}</td>
                            <td onClick={()=>editHandler(e)} style={{cursor:"pointer"}}>
                                Edit
                            </td>
                            <td onClick={()=>deleteHandler(e)} style={{cursor:"pointer"}}>
                                Delete
                            </td>
                        </tr>
                    ))
                }
            </table>
        </div>
    </div>
  )
}

export default Userdata