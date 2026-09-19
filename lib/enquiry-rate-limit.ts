import {Ratelimit} from '@upstash/ratelimit';
import {Redis} from '@upstash/redis';
import {ENQUIRY_RATE_LIMIT,ENQUIRY_RATE_WINDOW_SECONDS} from './enquiry.ts';

export type EnquiryRateLimitResult={allowed:boolean;remaining:number;retryAfter:number};
export type EnquiryRateLimitChecker=(key:string)=>Promise<EnquiryRateLimitResult>;

export async function rateLimitKey(request:Request,salt:string) {
  const ip=request.headers.get('cf-connecting-ip') || request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(`${salt}:${ip}`));
  return [...new Uint8Array(digest)].map(value=>value.toString(16).padStart(2,'0')).join('');
}

export function createUpstashRateLimiter(url:string,token:string):EnquiryRateLimitChecker {
  const ratelimit=new Ratelimit({
    redis:new Redis({url,token}),
    limiter:Ratelimit.slidingWindow(ENQUIRY_RATE_LIMIT,`${ENQUIRY_RATE_WINDOW_SECONDS} s`),
    analytics:false,
    prefix:'yearbook-maz:enquiry',
  });

  return async key=>{
    const result=await ratelimit.limit(key);
    return {
      allowed:result.success,
      remaining:Math.max(0,result.remaining),
      retryAfter:Math.max(1,Math.ceil((result.reset-Date.now())/1000)),
    };
  };
}
