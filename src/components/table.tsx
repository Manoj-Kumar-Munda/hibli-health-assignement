import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'

interface TableProps<TData> {
  data: Array<TData>
  columns: Array<ColumnDef<TData>>
  isLoading?: boolean
  onPaginationChange?: ({
    pageSize,
    pageIndex,
  }: {
    pageSize: number
    pageIndex: number
  }) => void
  pageSize: number
  pageIndex: number
  pageCount: number
  manualPagination?: boolean
  statusFilter?: {
    value: string | undefined
    onChange: (status: string | undefined) => void
    options: Array<{ value: string; label: string }>
  }
}

function Table<TData>({
  data,
  columns,
  isLoading = false,
  pageSize,
  pageIndex,
  pageCount,
  onPaginationChange,
  manualPagination = false,
  statusFilter,
}: TableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: manualPagination
      ? undefined
      : getPaginationRowModel(),
    pageCount: manualPagination ? pageCount : undefined,
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    manualPagination,
    onPaginationChange: (updater) => {
      if (onPaginationChange) {
        const currentState = { pageIndex, pageSize }
        const newState =
          typeof updater === 'function' ? updater(currentState) : updater
        onPaginationChange(newState)
      }
    },
  })

  if (isLoading) {
    return (
      <div className="tw:flex tw:items-center tw:justify-center tw:p-8">
        <span className="tw:text-gray-500">Loading...</span>
      </div>
    )
  }

  return (
    <div>
      <div className="tw:overflow-x-auto">
        {statusFilter && (
          <div className="tw:flex tw:justify-end tw:items-center tw:p-4 tw:bg-white tw:rounded-t-xl">
            <div className="tw:flex tw:items-center tw:gap-2">
              <label
                htmlFor="status-filter"
                className="tw:text-sm tw:text-gray-700 tw:whitespace-nowrap"
              >
                Filter by Status:
              </label>
              <select
                id="status-filter"
                value={statusFilter.value || ''}
                onChange={(e) =>
                  statusFilter.onChange(
                    e.target.value === '' ? undefined : e.target.value,
                  )
                }
                className="tw:border tw:border-gray-300 tw:rounded-md tw:px-3 tw:py-1.5 tw:text-sm tw:bg-white hover:tw:border-gray-400"
              >
                <option value="">All Statuses</option>
                {statusFilter.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        <table className="tw:w-full tw:bg-white tw:min-w-max">
          <thead className="tw:text-start tw:border-b tw:border-neutral-400 ">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="tw:py-4 tw:text-start tw:px-2"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className=" tw:not-last:border-b tw:border-neutral-400"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="tw-text-start tw:p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="tw:flex tw:items-center tw:justify-between tw:mt-0 tw:px-2 tw:py-3 tw:bg-white tw:rounded-b-xl">
        <div className="tw:flex tw:items-center tw:gap-2">
          <span className="tw:text-sm tw:text-gray-700">
            Page&nbsp;
            <span className="tw:font-medium">
              {table.getState().pagination.pageIndex + 1}
            </span>
            &nbsp; of &nbsp;
            <span className="tw:font-medium">{table.getPageCount()}</span>
          </span>
          <span className="tw:text-sm tw:text-gray-500 tw:hidden sm:tw:inline">
            •
          </span>
          <span className="tw:text-sm tw:text-gray-700 tw:hidden sm:tw:inline">
            {data.length} results
          </span>
        </div>

        <div className="tw:flex tw:items-center tw:gap-6">
          <div className="tw:flex tw:items-center tw:gap-2">
            <label
              htmlFor="page-size"
              className="tw:text-sm tw:text-gray-700 tw:whitespace-nowrap"
            >
              Rows per page:
            </label>
            <select
              id="page-size"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value))
              }}
              className="tw:border tw:border-gray-300 tw:rounded-md tw:px-3 tw:py-1.5 tw:text-sm tw:bg-white hover:tw:border-gray-400"
            >
              {[10, 20, 30, 40, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="tw:flex tw:items-center tw:gap-1">
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="tw:px-2 tw:py-1.5 tw:text-sm tw:font-medium tw:text-gray-700 tw:bg-white tw:border tw:border-gray-300 tw:rounded-md hover:tw:bg-gray-50 disabled:tw:opacity-50 disabled:tw:cursor-not-allowed disabled:hover:tw:bg-white"
            >
              {'<<'}
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="tw:px-3 tw:py-1.5 tw:text-sm tw:font-medium tw:text-gray-700 tw:bg-white tw:border tw:border-gray-300 tw:rounded-md hover:tw:bg-gray-50 disabled:tw:opacity-50 disabled:tw:cursor-not-allowed disabled:hover:tw:bg-white"
            >
              {'<'}
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="tw:px-3 tw:py-1.5 tw:text-sm tw:font-medium tw:text-gray-700 tw:bg-white tw:border tw:border-gray-300 tw:rounded-md hover:tw:bg-gray-50 disabled:tw:opacity-50 disabled:tw:cursor-not-allowed disabled:hover:tw:bg-white"
            >
              {'>'}
            </button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="tw:px-2 tw:py-1.5 tw:text-sm tw:font-medium tw:text-gray-700 tw:bg-white tw:border tw:border-gray-300 tw:rounded-md hover:tw:bg-gray-50 disabled:tw:opacity-50 disabled:tw:cursor-not-allowed disabled:hover:tw:bg-white"
            >
              {'>>'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table
