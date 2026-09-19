import {createEnquiryHandler,type EnquiryEnvironment} from '@/lib/enquiry-handler';

export async function POST(request:Request) {
  return createEnquiryHandler({runtime:process.env as EnquiryEnvironment})(request);
}
