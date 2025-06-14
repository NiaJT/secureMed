export interface Report {
  reportTitle: string;
  reportDescription?: string | null;
  reportFileUrl: string;
  uploadedAt?: Date;
  accessLevel?: "private" | "doctor-patient" | "admin";
  verificationStatus?: "pending" | "verified" | "rejected";
  verifiedAt?: Date | null;
  verificationRemarks?: string | null;
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
