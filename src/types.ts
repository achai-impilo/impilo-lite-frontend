export interface Patient {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dob: string;
    address: string;
    devices?: Device[];
}

export interface PatientProps {
    patients: Patient[]
  }
  
export interface Reading {
    readingId?: number;
    deviceId?: number;
    heartRate?: string;
    systolicBp?: string;
    diastolicBp?: string;
    value?: string;
    // timestamp
}

export interface Device {
    deviceId?: number;
    deviceName: string;
    deviceSerialNumber: string;
    readings: [];
}