import { Device } from '../types'
import { Link, useParams } from 'react-router-dom'

interface PatientReadingsTableProps {
    device: Device;
}

export default function PatientReadingsTable({ device }: PatientReadingsTableProps) {

    const { id } = useParams();
    // console.log('device id: ', device.deviceId)
    return(
        <div>
            <div>
                <table>
                    <tr>
                        <th>{device.deviceName}</th>
                        <th>Readings</th>
                    </tr>
                    {device?.readings.map((reading: any) => (
                        device.deviceName.toLowerCase() === "bp monitor" ? (
                            <tr>
                                <td>{reading.systolicBP}/{reading.diastolicBP} Heart Rate: {reading.heartRate}</td>
                                {/* <button>Delete Reading</button> */}
                            </tr>
                        ) : (
                            <tr>
                                <td>{reading.value}</td>
                                {/* <button>Delete Reading</button> */}
                            </tr>
                        )
                    ))}
                </table>
            </div>
            <div>
                <Link to={`add-reading/${id}/${device.deviceId}`}>
                    <button>Add Reading</button>
                </Link>   
            </div>
        </div>
    )
}