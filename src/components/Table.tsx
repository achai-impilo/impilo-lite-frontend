import { Patient } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import PatientDetails from '../components/PatientDetails'
import { PatientProps } from '../types'
import React, { useState } from 'react'


export default function Table({ patients }: PatientProps) {

    const [patient, setPatient] = useState<Patient| null>()
    const navigate = useNavigate();

    function handleClick(event: React.MouseEvent<HTMLTableCellElement>) {

        const clickedPatientId = event.currentTarget.dataset.patientId;
        navigate(`/patients/${clickedPatientId}`)

    }
    
    return(
        <table>
            <tr>
                <th>Name</th>
                <th>DOB</th>
                <th>Readings</th>
                {/* <th>Address</th> */}
            </tr>
            {}
            {patients.map((patient) => (
                <tr>
                        <td 
                            onClick={handleClick}
                            data-patient-id={patient.id}
                        >
                            {patient.firstName} {patient.lastName}
                        </td>
                        <td>{patient.dob}</td>
                        <td>{patient.devices?.flatMap((device) => device.readings).length}</td>
                        {/* <td>{patient.devices?.reduce((acc, device) => acc + device.readings.length, 0)}</td> */}
                        {/* <td>{patient.address}</td> */}
                </tr>
            ))}
        </table>
    )
}