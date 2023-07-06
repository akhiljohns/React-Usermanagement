import * as yup from 'yup'

const passwordRules = "^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+-]).{5,}$"


const signupValidation= yup.object().shape({
    name: yup.string().required("required"),
    email: yup.string().email("Please enter a valid email").required("required"),
    password: yup.string().matches(passwordRules,{message: "Add a strong password"}).required("required"),
    confirmPassword: yup.string().oneOf([yup.ref("password"),null], "Passwords must match").required()
})


export default signupValidation