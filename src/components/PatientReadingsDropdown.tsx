import { Patient, Device } from '../types'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PatientReadingsTable from './PatientReadingsTable';

export default function PatientReadingsDropdown() {

    const { id } = useParams();

    // get patient 
    const [patient, setPatient] = useState<Patient>({
        firstName: '',
        lastName: '',
        dob: '',
        email: '',
        phoneNumber: '',
        address: '',
        devices: [],
    })

    const [selectedDevice, setSelectedDevice] = useState<Device>()

    useEffect(() => {
        async function getPatient() {
           
            try {
                const res = await fetch(`http://localhost:8081/api/patients/${id}`);
                const data = await res.json()
                setPatient(data);
            } catch(error) {
                console.error(error)
            }
        }

        getPatient();

    }, [])

    function handleDeviceChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const selectedDevice = event.target.value;
        const device = patient?.devices?.find((device) => device.deviceName === selectedDevice);
        setSelectedDevice(device)
    }

    return(
        <div>
            <label>Device:</label>
            <select onChange={handleDeviceChange}>
                <option>--Choose Device--</option>
                {patient?.devices?.map((device) => (
                    <option>{device.deviceName}</option>
                ))}
            </select>
            {selectedDevice && <PatientReadingsTable device={selectedDevice} />}
        </div>
    )
}