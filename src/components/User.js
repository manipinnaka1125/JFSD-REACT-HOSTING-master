import axios from "axios";

export default function User() {

    function fun1() {
        console.log(document.getElementsByName("t1")[0].value);
        axios.get("https://jfsd-hosting-spring-backend-production.up.railway.app/user", {params:{
            email: document.getElementsByName("t1")[0].value
        }}).then((res)=>{
            console.log(res.data)
        })
    }

    return (
        <div>
            Email: <input type="email" name="t1" />
            <br/><br/>
            <button onClick={fun1}> Get Details </button> 
        </div>
    );
}