import { Patient, Reading } from '../types'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'


export default function AddReadingForm() {

    const { id } = useParams();
    const params = useParams();
    const [patient, setPatient] = useState<Patient>();
    const [reading, setReading] = useState<Reading>({
        heartRate: '', 
        systolicBp: '', 
        diastolicBp: '', 
        value: ''
    });
    const navigate = useNavigate();

    const deviceId = params.deviceId;

    console.log(id)
    console.log(patient);

    // TODO: create a get request to get the patient object
    useEffect(() => {
        async function getPatient() {
            try {
                const res = await fetch(`http://localhost:8081/api/patients/${id}`);
                const data = await res.json();
                setPatient(data);

            } catch(error) {
                console.error(error);
            }
        }

        getPatient();

    }, [])

    function handleChange(event: any) {
        const { name, value } = event.target;
        setReading({...reading, [name]: value})
        console.log(value);
        console.log('deviceId: ', deviceId);
    }

    // TODO: create a post request to add the reading
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const updatedReading = {
            // deviceId: Number(deviceId),
            heartRate: reading.heartRate,
            systolicBP: reading.systolicBp,
            diastolicBP: reading.diastolicBp,
            value: reading.value
          };

        const res = await fetch(`http://localhost:8081/api/add-readings/${deviceId}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updatedReading)
        });
        
        navigate(`/patients/${id}`);

    }

    // add conditional rendering based off of what the device.deviceName is
    
    return(
        <div>
            <div>
                Add Reading Form for {patient?.firstName}'s {patient?.devices?.map((device) => {
                    if (device.deviceId === Number(deviceId)) {
                        return device.deviceName;
                    } else {
                        return null;
                    }
                })}
            </div>
{/* Conditionally render form based off the type of device (ie BP Monitor, Weight Scale or Glucometer) */}
            <form onSubmit={handleSubmit}>
                {patient?.devices?.map((device) => {
                    if (device.deviceId === Number(deviceId)) {
                        if (device.deviceName.toLowerCase() === "bp monitor") {
                            return (
                                <div>
                                    <label>Systolic BP</label>
                                    <input 
                                        type="text" 
                                        name="systolicBp"
                                        value={reading.systolicBp}
                                        onChange={handleChange}
                                    />
                                    <label>Diastolic BP:</label>
                                    <input 
                                        type="text" 
                                        name="diastolicBp"
                                        value={reading.diastolicBp}
                                        onChange={handleChange}
                                    />
                                    <label>Heart Rate:</label>
                                    <input 
                                        type="text"
                                        name="heartRate"
                                        value={reading.heartRate}
                                        onChange={handleChange} 
                                    />
                                </div>
                            );
                        } else {
                            return(
                                <div>
                                    <label>Value:</label>
                                    <input 
                                        type="text"
                                        name="value"
                                        value={reading.value}
                                        onChange={handleChange} 
                                    />
                                </div>
                            )
                        }
                    }
                })}
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}