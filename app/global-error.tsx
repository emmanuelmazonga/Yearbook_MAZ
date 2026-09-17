"use client";
export default function GlobalError({reset}: {reset: () => void}) {
  return <html lang="en"><body><main style={{padding:'3rem',fontFamily:'sans-serif'}}><h1>The yearbook is temporarily unavailable.</h1><p>Your content hasn’t been lost. Please try again shortly.</p><button onClick={reset}>Try again</button></main></body></html>;
}
