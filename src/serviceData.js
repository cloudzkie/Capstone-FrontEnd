// Catalog of diagnostic services offered by VHealth Diagnostics
export const DIAGNOSTIC_SERVICES = [
  {
    id: 's1',
    name: 'Complete Blood Count (CBC)',
    category: 'Laboratory',
    price: 350,
    preparation: 'Fasting not strictly required.',
    description: 'Evaluates overall health and detects a wide range of disorders, including anemia, infection, and leukemia.'
  },
  {
    id: 's2',
    name: 'Chest X-Ray (PA View)',
    category: 'Imaging',
    price: 500,
    preparation: 'Remove metal objects and wear comfortable clothing.',
    description: 'Produces images of the heart, lungs, airways, blood vessels, and the bones of the spine and chest.'
  },
  {
    id: 's3',
    name: 'Urinalysis (Routine)',
    category: 'Laboratory',
    price: 250,
    preparation: 'Mid-stream clean catch urine sample required.',
    description: 'Screens for metabolic disorders, kidney diseases, urinary tract infections, and diabetes.'
  },
  {
    id: 's4',
    name: 'Lipid Profile',
    category: 'Laboratory',
    price: 600,
    preparation: 'Requires 10–12 hours of overnight fasting.',
    description: 'Measures total cholesterol, HDL, LDL, and triglycerides to assess cardiovascular disease risk.'
  },
  {
    id: 's5',
    name: 'Fasting Blood Sugar (FBS)',
    category: 'Laboratory',
    price: 300,
    preparation: 'Requires 8–10 hours of overnight fasting.',
    description: 'Measures circulating blood glucose levels to diagnose prediabetes and diabetes.'
  },
  {
    id: 's6',
    name: 'Whole Abdomen Ultrasound',
    category: 'Imaging',
    price: 1500,
    preparation: 'Fasting for 6-8 hours; full bladder required before exam.',
    description: 'Non-invasive imaging of internal abdominal organs including liver, gallbladder, pancreas, kidneys, and spleen.'
  },
  {
    id: 's7',
    name: '12-Lead Electrocardiogram (ECG)',
    category: 'Cardiology',
    price: 450,
    preparation: 'Avoid heavy meals or caffeine right before the test.',
    description: 'Records the electrical activity of the heart to check rhythm, blood supply, and structural health.'
  },
  {
    id: 's8',
    name: 'Blood Typing (ABO & Rh)',
    category: 'Laboratory',
    price: 280,
    preparation: 'No special preparation needed.',
    description: 'Determines a person’s blood group (A, B, AB, O) and Rh factor (Positive or Negative).'
  }
];

// Clinic operating hours & selectable appointment time slots
export const TIME_SLOTS = [
  '08:00 AM - 09:00 AM',
  '09:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '01:00 PM - 02:00 PM',
  '02:00 PM - 03:00 PM',
  '03:00 PM - 04:00 PM'
];

// Helper function to get service details by ID
export const getServiceById = (id) => {
  return DIAGNOSTIC_SERVICES.find(service => service.id === id);
};

// Helper function to calculate total cost from an array of service IDs
export const calculateTotalCost = (selectedIds = []) => {
  return selectedIds.reduce((sum, id) => {
    const service = getServiceById(id);
    return sum + (service ? service.price : 0);
  }, 0);
};