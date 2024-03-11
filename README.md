# Create project

> node -v // verify node installed
> npm install -g create-react-app
> npx create-react-app web-react // waiting until finish // make sure have internet
> cd web-react // goto root project of react
> npm start // command for run dev react
> -- open default in browser : http://localhost:3000

clear
cd directory
cd ..

# Configure Route

    > npm install react-router-dom

# React request API

    - install axios
        > npm intall axios
        - configure
            import axios from "axios"

            axios({
                url :"",
                method :"",
                data :"",
            }).thend(res=>{

            })


    - run api
        - localhost:8080/api/user/getlist
            method paramter res
        - localhost:8080/api/user/login

    export const config = {
        base_server : "http://localhost:8081/api/",
        image_path:"",
        version:1
    }

export const request = (url,method,param,new_token=null) => {
var access_token = getAccessToken();
if(new_token != null){
access_token = new_token
}
return axios({
url:config.base_server + url,
method:method,
data:param,
headers : {
Authorization : "Bearer "+access_token
}
}).then(res=>{
return res.data;
}).catch(err=>{
var status = err.response?.status
if(status == 404){
message.error("Route Not Found!")
}else if (status == 401){
return refreshToken(url,method,param)
// logout()
// console.log(err)
// message.error("You don't has permission access this method!")
// ព្យាយាមត Token ថ្មី
}else if (status == 500){
message.error("Internal error server!")
}else{
message.error(err.message)
}
return false
}).finally(final=>{
console.log("final",final)
})
}

export const refreshToken = (url,method,param) => {
const refresh_key = getRefreshToken()
return axios({
url: config.base_server + "employee_refresh_token",
method:"post",
data:{
"refresh_key" : refresh_key
}
}).then(res=>{
storeUserData(res.data)
var new_token = res.data.access_token
return request(url,method,param,new_token)
}).catch(error=>{
// តលែងបាន ចង់មិនចង់ ត្រូវ Logout
message.error("refresh fail")
logout()
return false
})
}

# Login and manage layout

    - global function fetch data from api (done)
    - login  (done)
    - store user profile (done)
    - logout (done)
    - protect route | not yet login (done)
    - Two loyout check App.js
        - loyout Dashboard (done)
        - loyout Not yet Login (done)

# Plugin Bootstrap | antd ,..

    - Plugin Bootstrap Or AntD
    - Plugin Icon
    - Using Component
    - Using Layout themplate

# Plugin Antd Design

    > npm install antd --save
    > npm install @ant-design/icons --save

# React CRUD

#
