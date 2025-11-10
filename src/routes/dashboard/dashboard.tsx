import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

const Dashboard: React.FunctionComponent = () => {
  const { t } = useTranslation()

  return (
    <div className="tw:p-4">
      <h1 className="tw:text-2xl tw:font-bold mb-4">{t('dashboard.title')}</h1>
      <p>{t('dashboard.description')}</p>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Dashboard,
})
