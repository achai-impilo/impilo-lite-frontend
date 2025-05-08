import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Patient } from '../types'

export default function EditPatientForm() {

    const [patient, setPatient] = useState<Patient>(
        {
            firstName: '',
            lastName: '',
            dob: '',
            email: '',
            phoneNumber: '',
            address: '',
        }
    );
    const { id } = useParams();
    const navigate = useNavigate();

    // get specific patient from backend
    useEffect(() => {

        async function getPatient(url: string) {

            try {
                const res = await fetch(url);
                const data = await res.json();
                setPatient(data);
            } catch(error) {
                console.error('Error Fetching Patient: ', error)
            }
        }

        getPatient(`http://localhost:8081/api/patients/${id}`)
        console.log(patient?.firstName)

    }, [])

    // create a handle change to handle user input
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        // TODO
        // handle new user inputs to update the specific fields
        const { name, value } = event.target;
        setPatient({
            ...patient,
            [name]: value
        })
    }

    // create a handleSubmit that navigates back to the patient detail page
    // and makes the PUT request

        async function handleEditSubmit(event: React.FormEvent<HTMLFormElement>) {
            // TODO - create PUT request to update the backend
            event.preventDefault();
            try {
                const url = `http://localhost:8081/api/edit-patient/${id}`;
                const patientData = patient;
    
                const res = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(patientData)
                });
    
                const data = await res.json();
                console.log(id);
    
                navigate(`/patients/${id}`)
            } catch (error) {
                console.error(error)
            }
        }

    return (
        <form onSubmit={handleEditSubmit}>
            <div>Edit Patient with ID: {id}</div>
            <div>
                <strong>Basic Informaton</strong>
                    <div>
                        <label>First Name: </label>
                        <input
                            type="text"
                            name="firstName"
                            value={patient?.firstName}
                            onChange={handleChange}
                            defaultValue={patient?.firstName}
                        />
                    </div>
                    <div>
                        <label>Last Name: </label>
                        <input 
                            type="text"
                            name="lastName"
                            value={patient?.lastName}
                            onChange={handleChange}
                            defaultValue={patient?.lastName}
                        />
                    </div>
                    <div>
                        <label>Date of Birth: </label>
                        <input 
                            type="date"
                            name="dob"
                            value={patient?.dob}
                            onChange={handleChange}
                            defaultValue={patient?.dob}
                        />
                    </div>
            </div>
            <div>
                <strong>Contact Information</strong>
                <div>
                    <label>Email Address: </label>
                    <input
                        type="text"
                        name="email"
                        value={patient?.email}
                        onChange={handleChange}
                        defaultValue={patient?.email} 
                    />
                </div>
                <div>
                    <label>Phone Number: </label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={patient?.phoneNumber}
                        onChange={handleChange}
                        defaultValue={patient?.phoneNumber} 
                    />
                </div>
            </div>
            <div>
                <strong>Shipping Information</strong>
                <div>
                    <label>Address: </label>
                    <input 
                        type="text"
                        name="address"
                        value={patient?.address}
                        onChange={handleChange}
                        defaultValue={patient?.address}
                    />
                </div>
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}