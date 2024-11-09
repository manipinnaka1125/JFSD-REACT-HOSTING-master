import axios from "axios";
import { useState, useEffect } from "react";

export default function Show() {
    const [result, setResult] = useState(null);

    useEffect(() => {
        // Fetch data only once on mount
        axios.get("https://jfsd-hosting-spring-backend-production.up.railway.app/all")
            .then((res) => {
                console.log("Fetched data:", res.data);  // Debugging
                setResult(res.data);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []); // Empty dependency array to ensure it runs only once

    function Deletefun(email) {
        axios.delete("https://jfsd-hosting-spring-backend-production.up.railway.app/delete", { params: { email } })
            .then((res) => {
                alert(res.data);
                // Update the result by filtering out the deleted item
                setResult((prevResult) => prevResult.filter((user) => user.email !== email));
            });
    }

    function Editfun(name, role, email, password) {
        document.getElementsByName("e_name")[0].value = name;
        document.getElementsByName("e_role")[0].value = role;
        document.getElementsByName("e_pass")[0].value = password;
        document.getElementsByName("e_email")[0].value = email;
        document.getElementById("edit").style.display = "block";
    }

    function saveEdit() {
        const updatedUser = {
            name: document.getElementsByName("e_name")[0].value,
            role: document.getElementsByName("e_role")[0].value,
            email: document.getElementsByName("e_email")[0].value,
            password: document.getElementsByName("e_pass")[0].value,
        };
        axios.put("https://jfsd-hosting-spring-backend-production.up.railway.app/update", updatedUser)
            .then((res) => {
                alert(res.data);
                setResult(null); // Reset to refetch updated data
            });
    }

    console.log("Rendering result:", result);  // Debugging

    if (result === null) {
        return <div>Fetching data...</div>;
    }

    return (
        <div>
            <table border="1" style={{ color: "blue" }}>
                <thead>
                    <tr style={{ backgroundColor: "yellow" }}>
                        <th>NAME</th>
                        <th>ROLE</th>
                        <th>EMAIL</th>
                        <th>PASSWORD</th>
                        <th>DELETE</th>
                        <th>EDIT</th>
                    </tr>
                </thead>
                <tbody>
                    {result.map((obj, index) => (
                        <tr key={index} style={{ backgroundColor: index % 2 === 0 ? 'yellowgreen' : 'red' }}>
                            <td>{obj.name}</td>
                            <td>{obj.role}</td>
                            <td>{obj.email}</td>
                            <td>{obj.password}</td>
                            <td><button onClick={() => Deletefun(obj.email)}>DELETE</button></td>
                            <td><button onClick={() => Editfun(obj.name, obj.role, obj.email, obj.password)}>EDIT</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div id="edit" style={{ display: "none" }}>
                <label>Name:</label> <input type="text" name="e_name" />
                <br />
                <label>Role:</label>
                <select name="e_role">
                    <option value="1">Admin</option>
                    <option value="0">Guest</option>
                    <option value="2">User</option>
                </select>
                <br />
                <label>Password:</label> <input type="password" name="e_pass" />
                <br />
                <input type="text" name="e_email" style={{ display: "none" }} />
                <br />
                <button onClick={() => saveEdit()}>SAVE EDIT</button>
            </div>
        </div>
    );
}
