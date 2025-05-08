import { useState } from 'react'
import { Device } from '../types'
import { useParams, useNavigate } from 'react-router-dom'

export default function AddDeviceForm() {

    const [device, setDevice] = useState<Device>({
        deviceId: 1,
        deviceName: "",
        deviceSerialNumber: "",
        readings: []
    })

    const { id } = useParams()
    const navigate = useNavigate();

    function handleChangeDevice(event: React.ChangeEvent<HTMLSelectElement>) {
        const deviceName = event.target.value;
        setDevice({
            ...device,
            deviceName
        });
        // console.log(value);
    }

    function handleChangeSN(event: React.ChangeEvent<HTMLInputElement>) {
        const deviceSerialNumber = event.target.value;
        setDevice({
            ...device,
            deviceSerialNumber
        })
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
            event.preventDefault();
        // submit a POST request to add the device
            const res = await fetch(`http://localhost:8081/api/add-device/${id}`, {
              method: 'POST',
              headers: {
                'Content-type': 'application/json'
              },
              body: JSON.stringify(device)
            })

            navigate(`/patients/${id}`);

        }


    return(
        <div>
            <form onSubmit={handleSubmit}>
                <strong>Add Device</strong>
                <div>
                    <label>Device:</label>
                    <select value={device.deviceName} onChange={handleChangeDevice}>
                        <option value="">--Choose a device--</option>
                        <option value="BP Monitor">BP Monitor</option>
                        <option value="Glucometer">Glucometer</option>
                        <option value="Weight Scale">Weight Scale</option>
                    </select>
                </div>
                <div>
                    <label>Serial Number:</label>
                    <input 
                        type="text"
                        name="serialNumber"
                        value={device.deviceSerialNumber}
                        onChange={handleChangeSN}
                    />
                </div>
                {/* <div>
                    <label>Serial Number:</label>
                    <input 
                        type="text"
                        name="serialNumber"
                        value={device.serialNumber}
                        onChange={handleChange}
                    />
                </div> */}
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}