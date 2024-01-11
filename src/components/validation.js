export default function validation(user){

    console.log(user.Name,user.Email,"userssss")
    const errors={}
    const email_patren = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/

    if(user.Name==="" || user.Email==="" || user.Password===''){
        errors.Name="Name is required"
        errors.Email="Email is required"
        errors.Password="password is required"
    }else if(!email_patren.test(user.Email)){
        errors.Email = "Email is not Match"
    }

    return errors;
    // const {Name,Email}=user

    // const errors = {}

    // if(Name==="" || Email===""){
    //     errors.fields = ` field are required`
    // }

    // return errors

};


// function match(user){

//     console.log(user.Name,user.Email,"userssss")
//     const errors={}
//     const email_patren = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/

//     if(!email_patren.test(user.Email)){
//         errors.Email = "Email is not Match"
//     }

//     return errors;
    

// }

// export { match, validation };