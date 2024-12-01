import { useState, useEffect, useRef } from "react";
import './Modal.css';
export default function Modal() {
    const [data, setData] = useState({
        username: "",
        email: "",
        phonenumber: "",
        dateofbirth: ""
    });
    const dataRef = useRef(null);
    const [vali, setvali] = useState(false);

    function handleData(e) {
        const { name, value } = e.target;
        setData((d) => ({
            ...d,
            [name]: value
        }));
    }

    const handleClickOutside = (event) => {
        if (dataRef.current && !dataRef.current.contains(event.target)) {
            setvali(false);
        }
    };

    useEffect(() => {
        if (vali) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [vali]);

    function ValidateNumber() {
        if (data.phonenumber.length !== 10) {
            alert("Invalid Phone Number. Please Enter a 10-digit Phone Number.");
            return false;
        }
        return true;
    }

    function ValidateDate() {
        const selecteddate = new Date(data.dateofbirth);
        const today = new Date();
        selecteddate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        if (selecteddate >= today) {
            alert("Invalid Date of Birth. Date of Birth cannot be in Future.");
            return false;
        }
        return true;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (ValidateNumber() && ValidateDate()) {
            setvali(false);
        }
    }

    return (
        <div>
            {!vali && (
                <div>
                    <h1>User Details Modal</h1>
                    <button onClick={() => setvali(true)}>Open Form</button>
                </div>
            )}
            {vali && (
                <div className="modal">
                    <div className="modal-content" ref={dataRef}>
                        <form className="form" onSubmit={handleSubmit}>
                            <h2>Fill Details</h2>
                            <label>Username:</label>
                            <input type="text" id="username" value={data.username} onChange={handleData} name="username" required />
                            <label>Email Address:</label>
                            <input type="email" id="email" value={data.email} name="email" onChange={handleData} required />
                            <label>Phone number:</label>
                            <input type="number" id="phone" value={data.phonenumber} name="phonenumber" onChange={handleData} required />
                            <label>Date of Birth:</label>
                            <input type="date" id="dob" value={data.dateofbirth} name="dateofbirth" onChange={handleData} required />
                            <button className="submit-button">Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}