// 👇 Backend type — what your API expects
export interface Report {
  reportTitle: string;
  reportDescription: string;
  reportFileUrl: string; // must be the final uploaded URL
  uploadedAt: Date;
  accessLevel: "doctor-patient" | "private" | "admin";
  verificationStatus: "pending" | "verified" | "rejected";
  verifiedAt: Date | null;
  verificationRemarks: string;
}

// 👇 Frontend form type — what Formik holds
export interface ReportFormValues {
  reportTitle: string;
  reportDescription: string;
  reportFileUrl: File | string | null; // can be file before upload
  uploadedAt: Date;
  accessLevel: "doctor-patient" | "private" | "admin";
  verificationStatus: "pending" | "verified" | "rejected";
  verifiedAt: Date | null;
  verificationRemarks: string;
}

export interface EmergencyContact {
  name: string;
  phone: string;
}

export interface Patient {
  name: string;
  age: number;
  gender: string;
  allergies?: string[];
  chronicDiseases?: string[];
  emergencyContact: EmergencyContact;
  doctor?: string | null;
  reports?: Report[];
}
