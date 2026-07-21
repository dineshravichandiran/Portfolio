interface Props {
  label: string
  title: string
}

export default function SectionHeader({ label, title }: Props) {
  return (
    <div className="my-6 mb-10">
      <div className="font-mono text-[0.78rem] text-accent tracking-wide uppercase mb-2.5">
        {label}
      </div>
      <div className="text-[clamp(1.7rem,3.5vw,2.4rem)] font-bold tracking-tight text-balance">
        {title}
      </div>
    </div>
  )
}
