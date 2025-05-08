import { Patient, Device } from '../types'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'

export default function DeviceTable(patient: Patient) {


    return(
        <div>
            <table>
                <tr>
                    <th>Device Name</th>
                    <th>Device SN</th>
                </tr>
                {patient.devices?.map((device) => (
                    <div>
                        <tr>
                            {device.deviceName} {device.deviceSerialNumber}
                        </tr>
                    </div>
                ))}
            </table>
        </div>
    )
}