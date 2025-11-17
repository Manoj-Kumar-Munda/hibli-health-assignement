interface MetricsCardProps {
  title: string
  value: number
  description: string
  icon?: React.ReactNode
}

const MetricsCard = ({ title, value, description, icon }: MetricsCardProps) => {
  return (
    <div className="tw:border tw:border-neutral-200 tw:rounded-xl tw:grow tw:bg-white">
      <div className="tw:px-3 tw:py-2 tw:border-b-neutral-200 tw:border-b tw:flex tw:items-center tw:justify-between">
        <h3 className="tw:text-sm tw:font-medium">{title}</h3>
        {icon && <div>{icon}</div>}
      </div>
      <div className="tw:p-3 tw:space-y-1">
        <p className="tw:text-2xl">{value}</p>
        <p className="tw:text-xs tw:text-neutral-400">{description}</p>
      </div>
    </div>
  )
}

export default MetricsCard
