import React, { useEffect, useState } from 'react';
import './MyForms.css'
import './User.css'
import axios from 'axios';
import validation from './validation';

const Userdata = () => {
    const [user,setUser]=useState({
        Name:"",
        Email:"",
        Password: "",
        PhoneNumber:""
    })
    const [data,setDate] = useState([])

    const [id,setId]=useState(null)

    const [error,setError]=useState({})
    const changeHandler = (e)=>{
        // console.log(e)
        const {name,value} = e.target
        
        setUser({
        ...user,[name]:value
        })
    }

    const submitHandler = async(e)=>{
        e.preventDefault();

        //sending the user data to validation fs to check the vaidation
       const validationErrors = validation(user);

       console.log(Object.keys(validationErrors).length > 0,"VVVV")

       
       if(Object.keys(validationErrors).length > 0){
        //if not valid exqute this
         return setError(validationErrors)
       }else{
        //other wise exqute this
        try{
            if(id!==null){

                    const EditRes = await axios.put(`http://localhost:5000/user/${id}`,user)
                    console.log(EditRes,"edit")
                    if(EditRes){
                        // const updateData = [...data]
                        // updateData[id]=user
                        setDate(EditRes.data)
                        setUser({
                            Name:"",
                            Email:"",
                            Password:"",
                            PhoneNumber:""
                        })
                        setId(null)
                    } 
                    setError({})
            }else{
                const responce = await axios.post('http://localhost:5000/user',user)
                if(responce){
                    setDate([...data,user])
                    setUser({
                        Name:"",
                        Email:"",
                        Password:"",
                        PhoneNumber:""
                    })
                }
                setError({})
            }
        }catch(err){
            console.log(err)
            // return(
            //     <Error>Hello</Error>
            // )
        }
       }
         
    }

    useEffect(()=>{

            const getData=async()=>{
                try{
                    const response  = await axios.get("http://localhost:5000/user")
                    // console.log(response)
                    if(response){
                        setDate(response.data)
                    }

                }catch(err){
                    console.error(err);

                    // Render the Error component when there is a network error
                   

                }
            }
            getData()
    },[id,user,error])

    const deleteHandler = (e)=>{
        // console.log(e.id)
        const deleteResponce = axios.delete(`http://localhost:5000/user/${e.id}`)
        if(deleteResponce){
            const deteteRes = data.filter((val)=> val.id !== e.id )
            setDate(deteteRes)
        }
    }

    const editHandler = (e)=>{
        console.log(e)
        setId(e.id)
        setUser({
            Name:e.Name,
            Email:e.Email,
            Password:e.Password,
            PhoneNumber:e.PhoneNumber
        })
    }

    // const focusHandler = (e)=>{
    //         console.log(e)
    //         const validationErrors = match(user);

    //         if(Object.keys(validationErrors).length > 0){
    //             //if not valid exqute this
    //              return setError(validationErrors)
    //            }


    // }

    // const blurHandler = (e,fields)=>{
    //         console.log(e)
    //         console.log(e,"ff")
    //         if(e.isTrusted){
    //             alert("Please enter name.")
    //         }
            
    // }
  return (
    <div style={{marginTop:"2rem"}} className='main'>
        <form onSubmit={submitHandler}>
            <div className='fields'>
                <label>Name</label>
                <input type='text' name="Name" value={user.Name} onChange={changeHandler}   />     
            </div>
            <div className=''>
                {error.Name && user.Name.length<=0 ? <p>{error.Name}</p>:""}
                {/* {error.fields && user.Name.length<=0 ? <p>{error.fields}</p>:""} */}
            </div>
            <div className='fields'>
                <label>Email</label>
                <input type='email' name="Email" value={user.Email} onChange={changeHandler} />
            </div>
            <div className=''>
                {error.Email && user.Email.length<=0 ? <>{error.Email}</>:""}
            </div>
            <div className='fields'>
                <label>Password</label>
                <input type='password' name="Password" value={user.Password} onChange={changeHandler} />
            </div>
            <div className=''>
                {error.Password && user.Password.length<=0 ? <p>{error.Password}</p>:""}
                {/* {error.fields && user.Email.length<=0 ? <p>{error.fields}</p>:""} */}
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