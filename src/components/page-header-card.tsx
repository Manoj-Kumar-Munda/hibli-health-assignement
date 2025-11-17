import { Link, useRouterState } from '@tanstack/react-router'
import { Breadcrumb, Card } from 'antd'
import { cn } from '@/integrations/cn/cn'

const PageHeaderCard: React.FC<{ pageHeading: string }> = ({ pageHeading }) => {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  const segments = pathname.split('/').filter((segment) => segment)

  const crumbs = segments.map((segment, index) => {
    const to = `/${segments.slice(0, index + 1).join('/')}`
    const label = segment.charAt(0).toUpperCase() + segment.slice(1)
    return {
      title: (
        <Link className={cn(pathname === to ? 'tw:text-black!' : '')} to={to}>
          {label}
        </Link>
      ),
    }
  })

  const breadcrumbs = [
    {
      title: <Link to="/">Home</Link>,
    },
    ...(pathname === '/' ? [] : crumbs),
  ]
  return (
    <Card>
      <Breadcrumb items={breadcrumbs} separator=">" />
      <h1 className={cn('tw:text-2xl tw:font-medium')}>{pageHeading}</h1>
    </Card>
  )
}

export default PageHeaderCard
