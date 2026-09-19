import {z} from 'zod';

export const MAX_ENQUIRY_BYTES=20_000;
export const ENQUIRY_RATE_LIMIT=5;
export const ENQUIRY_RATE_WINDOW_SECONDS=10*60;

const optionalPhone=z.string().trim().max(30,'Keep the phone number under 30 characters.').refine(value=>!value || /^\+?[0-9 ()-]{7,30}$/.test(value),'Enter a valid phone number.');

export const enquirySchema=z.object({
  name:z.string().trim().min(2,'Enter your name.').max(100,'Keep your name under 100 characters.'),
  email:z.string().trim().max(254,'Keep the email address under 254 characters.').email('Enter a valid email address.'),
  phone:optionalPhone.default(''),
  school:z.string().trim().min(2,'Enter the school name.').max(150,'Keep the school name under 150 characters.'),
  role:z.string().trim().min(2,'Choose your role.').max(80,'Keep the role under 80 characters.'),
  message:z.string().trim().min(20,'Tell us a little more about the yearbook you have in mind.').max(2_000,'Keep the message under 2,000 characters.'),
  consent:z.boolean().refine(value=>value,'Consent is required so we can respond to your enquiry.'),
  website:z.string().max(200).default(''),
}).strict();

export type Enquiry=Omit<z.infer<typeof enquirySchema>,'website'>;

export function fieldErrors(error:z.ZodError) {
  const flattened=error.flatten().fieldErrors;
  return Object.fromEntries(Object.entries(flattened).map(([field,messages])=>[field,messages?.[0] || 'Check this field.']));
}

export function enquiryEmail(enquiry:Enquiry,submittedAt:string,reference:string) {
  return [
    'NEW YEARBOOK_MAZ ENQUIRY','',
    `Reference: ${reference}`,
    `Name: ${enquiry.name}`,
    `School: ${enquiry.school}`,
    `Role: ${enquiry.role}`,
    `Email: ${enquiry.email}`,
    `Phone: ${enquiry.phone || 'Not provided'}`,'',
    'Message:',enquiry.message,'',
    `Submitted: ${submittedAt}`,
  ].join('\n');
}
