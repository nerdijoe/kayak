export const signup = (data) => {
    let msg = "";
    const namePattern = /^[a-zA-Z\s]+$/;
    const cardNamePattern = /^[a-zA-Z\s]+$/;
    const emailPattern = /^[\w.]*@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    // const passwordPattern = /^([a-zA-Z0-9@*#]{8,14})$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z@]{8,}$/;
    const phonePattern = /^\+[1][\s-(]?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}/;
    const creditCardPattern = /[0-9]{4}[0-9]{4}[0-9]{4}[0-9]{4}/;
    const zipcodePattern  = /^\d{5}(?:[-]\d{4})?$/;

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
        msg = "Password should contain one small letter, \n one capital letter, one digit \nand one special character @ ";
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

export const carSearch = (data) => {
    let msg = "";
    const namePattern = /^[a-zA-Z\s]+$/;

    let strtDate = new Date(data.startDate);
    let endDate = new Date(data.endDate);

    if( data.location ==='' || data.startDate ==='' || data.endDate ===''){
        msg = "All fields are mandatory. Please fill all details";
        return msg;
    }
    if (!(namePattern.test(data.location))) {
        msg = "Enter correct location";
        return msg;
    }
    if(strtDate > endDate){
        msg = "Drop off Date should be a date after the pick up date";
        return msg;
    }
    return msg;
};

export const hotelSearch = (data) => {
    let msg = "";
    const namePattern = /^[a-zA-Z\s]+$/;

    let strtDate = new Date(data.startDate);
    let endDate = new Date(data.endDate);

    if( data.place ==='' || data.startDate ==='' || data.endDate ===''){
        msg = "All fields are mandatory. Please fill all details";
        return msg;
    }
    if (!(namePattern.test(data.location))) {
        msg = "Enter correct Place";
        return msg;
    }
    if(strtDate > endDate){
        msg = "Check out date should be after the check in date";
        return msg;
    }
    return msg;
};

export const flightSearch = (data) => {
    let msg = "";
    const namePattern = /^[a-zA-Z\s]+$/;

    let strtDate = new Date(data.departureDate);
    let endDate = new Date(data.arrivalDate);

    if( data.place ==='' || data.departureDate ==='' || data.arrivalDate ==='' || data.departure === '' || data.source === ''){
        msg = "All fields are mandatory. Please fill all details";
        return msg;
    }
    if (!(namePattern.test(data.source))) {
        msg = "Enter correct Source";
        return msg;
    }
    if (!(namePattern.test(data.departure))) {
        msg = "Enter correct Departure";
        return msg;
    }
    if(strtDate > endDate){
        msg = "Arriving date should be after the departure date";
        return msg;
    }
    return msg;
};


export const makePayment = (data) => {
    let msg = "";
    const cardNamePattern = /^[a-zA-Z\s]+$/;
    const creditCardPattern = /[0-9]{4}[0-9]{4}[0-9]{4}[0-9]{4}/;
    if( data.creditCardNum ==='' || data.creditCardFullName ==='' || data.cvv ===''){
        msg = "All fields are mandatory. Please fill all details";
        return msg;
    }
    if(data.creditCardNum.length>16 || !(creditCardPattern.test(data.creditCardNum))){
        msg="Credit card number should be 16 characters long with no spaces or '-' in between";
        return msg;
    }
    if(!(creditCardPattern.test(data.creditCardNum))){
        msg="Enter correct Credit card number";
        return msg;
    }
    if(!(cardNamePattern.test(data.creditCardFullName))){
        msg="Enter correct Credit card name";
        return msg;
    }
    if(data.cvv.length>3 || data.cvv.length<3){
        msg="Enter your 3 digit cvv number";
        return msg;
    }
    // if()
    return msg;
};