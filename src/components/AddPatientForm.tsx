import { Patient } from '../types'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';


export default function AddPatientForm() {

    const [patient, setPatient] = useState<Patient>({
        firstName: '',
        lastName: '',
        dob: '',
        email: '',
        phoneNumber: '',
        address: '',
    })
    const [patients, setAllPatients] = useState<Patient[]>()
    const navigate = useNavigate();
    const { id } = useParams();

    async function getPatients() {
        try {
          const res = await fetch('http://localhost:8081/api/patients');
          const data = await res.json();
          setAllPatients(data);
        } catch (error) {
          console.error(error)
        }
      }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // TODO: send a POST request to the DB
        event.preventDefault();
        const res = await fetch('http://localhost:8081/api/patients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patient)
        })

        navigate('/')
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setPatient({
            ...patient,
            [name]: value
        });
    }

    return(
        <form onSubmit={handleSubmit}>
            <div>
                <strong>Basic Information</strong>
                    <div>
                        <label>First Name: </label>
                        <input 
                            type="text" 
                            name="firstName" 
                            value={patient.firstName}
                            onChange={handleChange}
                            required={true}
                        />
                    </div>
                    <div>
                        <label>Last Name: </label>
                        <input 
                            type="text" 
                            name="lastName" 
                            value={patient.lastName}
                            onChange={handleChange}
                            required={true}/>
                    </div>
                    <div>
                        <label>Date of Birth: </label>
                        <input 
                            type="date" 
                            name="dob"
                            value={patient.dob}
                            onChange={handleChange}
                            required={true}/>
                    </div>
            </div>
            <div>
                <strong>Contact Information</strong>
                <div>
                    <label>Email Address: </label>
                    <input 
                        type="text" 
                        name="email" 
                        value={patient.email}
                        onChange={handleChange}
                        required={true}/>
                </div>
                <div>
                    <label>Phone Number: </label>
                    <input 
                        type="text" 
                        name="phoneNumber"
                        value={patient.phoneNumber}
                        onChange={handleChange} 
                        required={true}/>
                </div>
            </div>
            <div>
                <strong>Shipping Information: </strong>
                <div>
                    <label>Address: </label>
                    <input 
                        type="text" 
                        name="address" 
                        value={patient.address}
                        onChange={handleChange}
                        required={true}/>
                </div>
            </div>

            <button type="submit">Submit</button>
        </form>
    )
}