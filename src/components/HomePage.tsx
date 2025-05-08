import Table from './Table'
import { useState, useEffect } from 'react'
import { Patient } from '../types'
import { Link } from 'react-router-dom'
import { PatientProps } from '../types'


export default function HomePage() {

    const [patients, setPatients] = useState<Patient[]>([])

    useEffect(() => {

        async function getPatients() {
    
          try {
            const res = await fetch('http://localhost:8081/api/patients');
            const data = await res.json();
            setPatients(data);
          } catch (error) {
            console.error(error)
          }
        }
    
        getPatients();
    
      }, [])
      
    return(
        <>
            <header>
              <strong>Impilo Lite</strong>
            </header>
            <div>
                <p>Patients</p>
                <Link to="/add-patient">
                    <button>Add Patient</button>
                </Link>
            </div>
            <Table patients={patients} />
        </>
    )
}