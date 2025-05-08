import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Patient } from '../types'
import PatientInfoCard from './PatientInfoCard'
import PatientDeviceTable from './PatientDeviceTable'
import PatientReadingsTable from './PatientReadingsDropdown'


export default function PatientDetails() {

    const [patient, setPatient] = useState<Patient>();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function getPatient(url: string) {
            try {
                const res = await fetch(url);
                const data = await res.json();
                // console.log('data: ', data)
                setPatient(data)
            } catch (error) {
                console.error('Error fetching patient:', error);
            }
        }

        getPatient(`http://localhost:8081/api/patients/${id}`);

    }, [])

    async function handleDeletePatient() {
      await fetch(`http://localhost:8081/api/patients/${id}`, {
        method: 'DELETE'
      })
      
      navigate('/');

    }

    return (
        <div>
          <h3>
            {patient?.firstName ?? 'No First Name Found.'} {patient?.lastName ?? 'No Last Name Found'}
          </h3>
          <div>
            <strong>Patient Info</strong>
            <Link to={`/edit-patient/${id}`}>
              <button id={id}>Edit Patient</button>
            </Link>
            <button onClick={handleDeletePatient}>Delete Patient</button>
            <div>
              {patient && <PatientInfoCard {...patient} />}
            </div>
          </div>
          <div>
            <strong>Devices</strong>
            <Link to={`/add-device/${id}`}>
              <button id={id}>Add Device</button>
            </Link>
            <div>
              {patient && <PatientDeviceTable {...patient} /> }
            </div>
          </div>
          <div>
            <strong>Readings</strong>
            <div>
              {patient && <PatientReadingsTable />}
            </div>
          </div>
          <div>
            <Link to={"/"}>
              <button>See All Patients</button>
            </Link>
          </div>
        </div>
      );
}