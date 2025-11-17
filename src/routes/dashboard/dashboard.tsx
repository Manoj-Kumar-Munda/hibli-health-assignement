import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import {
  BulbOutlined,
  CloudOutlined,
  PoweroffOutlined,
} from '@ant-design/icons'
import MetricsCard from './_components/metric-card'
import LastActiveUsersTable from './_components/last-active-users'
import PageHeaderCard from '@/components/page-header-card'

const data = [
  {
    title: 'Total Users',
    value: 512,
    description: 'Total registered users',
    icon: <CloudOutlined />,
  },
  {
    title: 'Active Users',
    value: 435,
    description: 'Total active account',
    icon: <BulbOutlined />,
  },
  {
    title: 'Inactive users',
    value: 77,
    description: 'Total inactive account',
    icon: <PoweroffOutlined />,
  },
]

const Dashboard: React.FunctionComponent = () => {
  const { t } = useTranslation()

  return (
    <div className="tw:flex tw:flex-col tw:gap-4">
      <PageHeaderCard pageHeading={t('dashboard.title')} />

      <div className="tw:flex tw:gap-4">
        {data.map((item) => (
          <MetricsCard key={item.title} {...item} />
        ))}
      </div>

      <div className="tw:bg-white tw:border tw:border-neutral-200 tw:rounded-xl">
        <div className="tw:px-6 tw:py-4 tw:border-b tw:border-neutral-200 tw:flex tw:items-center tw:justify-between">
          <h3 className="tw:font-medium tw:text-base">
            {t('dashboard.tableHeader')}
          </h3>

          <div className="tw:flex tw:gap-4 tw:items-center tw:text-sky-500">
            <span className="tw:text-xs">All users</span>
            <span>{'>'}</span>
          </div>
        </div>

        <LastActiveUsersTable />
      </div>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Dashboard,
})
