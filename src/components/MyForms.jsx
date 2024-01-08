import React ,{useState}from 'react'
import './MyForms.css'

const MyForms = () => {
    const [user,setUser]=useState({
        Name:"",
        Email:"",
        PhoneNumber:"",
        DateOfBirth:"",
        Image:""
    })

    const changeHandler = (e)=>{
        const {name,value,type,files} = e.target;
         // Check file size before updating state
        if (type === 'file' && files.length > 0) {
            const fileSize = files[0].size;
            const maxSizeInBytes = 1024 * 1024; // 1 MB (adjust as needed)
    
            if (fileSize > maxSizeInBytes) {
            alert('File size exceeds the allowed limit (1 MB). Please choose a smaller file.');
            return;
            }
        }


        setUser({
            ...user ,[name]: type==='file' ? files[0] : value
        })
    }

    const submitHandler = (e)=>{
        e.preventDefault();

        const newData = {
            ...user,
            DateOfBirth: formatDate(user.DateOfBirth),
        }

        console.log(newData)
    }

    // Function to format the date as "yyyy-MM-dd"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const minDate = new Date().toISOString().split('T')[0];

//   const maxDate = new Date();
//   maxDate.setFullYear(maxDate.getFullYear() + 10);
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 60);
    

  return (
    <form onSubmit={submitHandler}>
        <div className='fields'>
            <label>Name</label>
            <input type='text' name='Name' value={user.Name} onChange={changeHandler} />
        </div>
        <div className='fields'>
            <label>email</label>
            <input type='email' name='Email' value={user.Email} onChange={changeHandler} />
        </div>
        <div className='fields'>
            <label>PhoneNumber</label>
            <input type="tel" name='PhoneNumber' value={user.PhoneNumber} onChange={changeHandler} />
        </div>
        <div className='fields'>
            <label>Date of Birth</label>
            <input type="date" name="DateOfBirth" 
                    value={user.DateOfBirth} 
                    onChange={changeHandler}
                    min={minDate}
                    max={maxDate.toISOString().split('T')[0]}
                    />
        </div>
        <div className='fields'>
            <label>Image</label>
            <input type='file' name='Image'  onChange={changeHandler}  />
        </div>
        <div className='fields'>
            {
                user.Image && (
                    <img src={URL.createObjectURL(user.Image)} alt="newimage"  style={{height:"125px"}} />
                )
            }
        </div>
        <div className='fields'>
            <button type="submit">Submit</button>
        </div>
    </form>
  )
}

export default MyForms