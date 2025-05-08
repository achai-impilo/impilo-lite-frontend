import { Patient } from '../types'

export default function PatientInfoCard(props: Patient) {
    return(
        <div>
            <div>
                First Name: {props.firstName} Last Name: {props.lastName} Address: {props.address}
            </div>
            <div>
                Email: {props.email} DOB: {props.dob} Phone Number: {props.phoneNumber}
            </div>
        </div>
    )
}