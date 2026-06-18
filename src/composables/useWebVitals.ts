export function useWebVitals() {
  const loadAndStartTracking = async () => {
    const { onLCP, onINP, onCLS } = await import('web-vitals/attribution')

    // TODO: Sent metrics to observability platform (New Relic?) on PROD
    onLCP(console.log)
    onINP(console.log)
    onCLS(console.log)
  }

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(loadAndStartTracking)
  } else {
    // safari fallback since it doesnt support requestIdleCallback yet
    setTimeout(loadAndStartTracking, 2000)
  }
}
