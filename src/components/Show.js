import axios from "axios";
import { useState } from "react";

export default function Show(){

    function Deletefun (email) {
        axios.delete("https://jfsd-hosting-spring-backend-production.up.railway.app/delete", {params:{
            email: email
        }}).then((res)=>{
            alert(res.data);
            setResult(null)
        })
    }

    function Editfun (name, role, email, password) {
        document.getElementsByName("e_name")[0].value = name;
        document.getElementsByName("e_role")[0].value = role;
        document.getElementsByName("e_pass")[0].value = password;
        document.getElementsByName("e_email")[0].value = email;
        document.getElementById("edit").style.display = "block";
    }

    function saveEdit() {
        axios.put("https://jfsd-hosting-spring-backend-production.up.railway.app/update", {
            name: document.getElementsByName("e_name")[0].value,
            role: document.getElementsByName("e_role")[0].value,
            email: document.getElementsByName("e_email")[0].value,
            password: document.getElementsByName("e_pass")[0].value
        }).then((res)=>{
            alert(res.data)
            setResult(null)
        })
    }

    const [result, setResult] = useState(null)
    
    if(result == null) {
        axios.get("https://jfsd-hosting-spring-backend-production.up.railway.app/all", {}).then ((res)=>{
            setResult(res.data)
        })
    }

    if(result == null){
    return (
        <div>
            result is fetching 
        </div>
    );
    }

    else{
        return (
            <div>
                <table border="1" style={{ color: "blue" }}>
                    <tr style = {{ backgroundColor: "yellow" }}>
                        <th>NAME</th>
                        <th>ROLE</th>
                        <th>EMAIL</th>
                        <th>PASSWORD</th>
                        <th>DELETE</th>
                        <th>EDIT</th>
                    </tr>
                {result.map((obj, index)=>{
                    return(
                        <tr style={{backgroundColor: index%2 === 0?'yellowgreen':'red'}}>
                            <td>{obj.name}</td>
                            <td>{obj.role}</td>
                            <td>{obj.email}</td>
                            <td>{obj.password}</td>
                            <td> <button onClick = {()=>Deletefun(obj.email)} > DELETE </button> </td>
                            <td> <button onClick = {()=>Editfun(obj.name, obj.role, obj.email, obj.password)} > EDIT </button> </td>
                        </tr>
                    );
                })}
                </table>
                <br/>
                <br/>
                <div id="edit" style={{ display:"none" }}>
                    Name: <input type = "text" name = "e_name" />
                    <br/>
                    Role: <select name = "e_role">
                        <option value = {1}> Admin </option>
                        <option value = {0}> Guest </option>
                        <option value = {2}> User </option>
                    </select>
                    <br/>
                    password: <input type = "password" name = "e_pass" />
                    <br/>
                    <input type = "text" name = "e_email" style={{ display: "none" }} />
                    <br/>
                    <button onClick={() => saveEdit()}> SAVE EDIT </button>
                </div>
            </div>
        );
    }

}