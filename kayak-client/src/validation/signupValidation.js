export const signup = (data) => {
    let msg = "";
    const namePattern = /^[a-zA-Z\s]+$/;
    const cardNamePattern = /^[a-zA-Z\s]+$/;
    const emailPattern = /^[\w.]*@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const passwordPattern = /^([a-zA-Z0-9@*#]{8,14})$/;
    const phonePattern = /^\+[1][\s-(]?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}/;
    const creditCardPattern = /[0-9]{4}[0-9]{4}[0-9]{4}[0-9]{4}/;
    const zipcodePattern  = /^\d{5}(?:[-]\d{4})?$/;
    // const statePattern = /^(?-i:A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$/;
    if(data.firstName ==='' || data.lastName ==='' || data.email ==='' || data.password ==='' ||
        data.address ==='' || data.city ==='' || data.state ==='' || data.zipcode ==='' ||
        data.phone ==='' || data.creditCardNum ==='' || data.creditCardFullName ==='' ){
        msg = "All fields are mandatory. Please fill all details";
        return msg;
    }
    if (!(namePattern.test(data.firstName))) {
        msg = "Enter correct First Name";
        return msg;
    }
    if(!(namePattern.test(data.lastName))){
        msg = "Enter correct Last Name";
        return msg;
    }
    if (!(emailPattern.test(data.email))) {
        msg = "Enter correct Email Address";
        return msg;
    }
    if (data.password.length<8 || data.password.length>14) {
        msg = "Password must be 8 to 15 character long";
        return msg;
    }
    if (!(passwordPattern.test(data.password))) {
        msg = "Password should contain one small letter, \n one capital letter, one digit \nand one special character (@,#) ";
        return msg;
    }
    if(!(namePattern.test(data.city))){
        msg="Enter correct city";
        return msg;
    }
    if(!(namePattern.test(data.state))){
        msg="Enter correct state";
        return msg;
    }
    if(!(zipcodePattern.test(data.zipcode))){
        msg="Enter valid zipcode";
        return msg;
    }
    if(data.creditCardNum.length>16 || !(creditCardPattern.test(data.creditCardNum))){
        msg="Enter correct Credit Card Number followed by space";
        return msg;
    }
    if(!(phonePattern.test(data.phone))){
        msg="Enter correct Phone Number";
        return msg;
    }
    if(!(cardNamePattern.test(data.creditCardFullName))){
        msg="Enter correct Credit card name";
        return msg;
    }
    return msg;
};

export const login = (data) => {
    let msg = "";
    const emailPattern = /^[\w.]*@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    if( data.email ==='' || data.password ===''){
        msg = "All fields are mandatory. Please fill all details";
        return msg;
    }
    if (!(emailPattern.test(data.email))) {
        msg = "Enter correct email";
        return msg;
    }
    return msg;
};

export const update = (data) => {
    let msg = "";
    const namePattern = /^[a-zA-Z\s]+$/;
    const cardNamePattern = /^[a-zA-Z\s]+$/;
    // const emailPattern = /^[\w.]*@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const passwordPattern = /^([a-zA-Z0-9@*#]{8,14})$/;
    const phonePattern = /^\+[1][\s-(]?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}/;
    const creditCardPattern = /[0-9]{4}[0-9]{4}[0-9]{4}[0-9]{4}/;
    const zipcodePattern  = /^\d{5}(?:[-]\d{4})?$/;
    // const statePattern = /^(?-i:A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$/;

    if(data.firstName ==='' || data.lastName ==='' ||
        data.address ==='' || data.city ==='' || data.state ==='' || data.zipcode ==='' ||
        data.phone ==='' || data.creditCardNum ==='' || data.creditCardFullName ==='' ){
        msg = "All fields are mandatory. Please fill all details";
        return msg;
    }
    if (!(namePattern.test(data.firstName))) {
        msg = "Enter correct First Name";
        return msg;
    }

    if(!(namePattern.test(data.lastName))){
        msg = "Enter correct Last Name";
        return msg;
    }

    if(data.password !== undefined){
        if (data.password.length<8 || data.password.length>14) {
            msg = "Password must be 8 to 15 character long";
            return msg;
        }
    }

    if (!(passwordPattern.test(data.password))) {
        msg = "Password should contain one small letter, \n one capital letter, one digit \nand one special character (@,#) ";
        return msg;
    }
    if(!(namePattern.test(data.city))){
        msg="Enter correct city";
        return msg;
    }
    if(!(namePattern.test(data.state))){
        msg="Enter correct state";
        return msg;
    }
    if(!(zipcodePattern.test(data.zipcode))){
        msg="Enter valid zipcode";
        return msg;
    }
    if(data.creditCardNum.length>16 || !(creditCardPattern.test(data.creditCardNum))){
        msg="Credit card number should be 16 characters long with no spaces or '-' in between";
        return msg;
    }
    if(!(phonePattern.test(data.phone))){
        msg="Enter correct Phone Number";
        return msg;
    }
    if(!(cardNamePattern.test(data.creditCardFullName))){
        msg="Enter correct Credit card name";
        return msg;
    }
    return msg;
};
