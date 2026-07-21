import OpsWall from '../three/OpsWall'

export default function LiveOpsSection() {
  return (
    <section className="border-b border-panel-border py-14">
      <div className="container mb-8">
        <div className="font-mono text-xs text-accent uppercase tracking-wide mb-2">// Live view</div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">This is what the job looks like.</h2>
        <p className="text-text-secondary max-w-2xl">
          A stylized read on the monitoring wall — request rate, error rate, latency, uptime,
          and per-service health, animated in 3D. Not live data, but the shape of it is real.
        </p>
      </div>
      <div className="w-full h-[420px] md:h-[520px]">
        <OpsWall />
      </div>
    </section>
  )
}
