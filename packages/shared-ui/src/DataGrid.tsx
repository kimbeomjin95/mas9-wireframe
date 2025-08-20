import * as React from 'react'
import Checkbox from '@mui/material/Checkbox'
import Table from '@mui/material/Table'
import type { TableProps } from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import {
  SvgIcon,
  SvgIconProps,
  SxProps,
  TableContainer,
  TableSortLabel,
  Typography,
} from '@mui/material'
import TableSummaryHeader from './TableSummaryHeader'
import { get } from 'lodash'

export const DATA_GRID_TYPES = {
  LINE_ONLY: 'lineOnly',
  BORDERED: 'bordered',
} as const

export type TableType = (typeof DATA_GRID_TYPES)[keyof typeof DATA_GRID_TYPES]

export interface ColumnDef<TRowModel> {
  align?: 'left' | 'right' | 'center'
  field?: keyof TRowModel
  formatter?: (row: TRowModel, index: number) => React.ReactNode
  hideName?: boolean
  name: string
  width?: number | string
  sort?: string
  sortClick?: () => void
  label?: string
}

export type RowId = number | string

export interface DataGridProps<TRowModel> extends Omit<TableProps, 'onClick'> {
  columns: ColumnDef<TRowModel>[]
  sortData?: { sort: string; sortValue: string }
  hideHead?: boolean
  hover?: boolean
  onClick?: (event: React.MouseEvent, row: TRowModel) => void
  onDeselectAll?: (event: React.ChangeEvent) => void
  onDeselectOne?: (event: React.ChangeEvent, row: TRowModel) => void
  onSelectAll?: (event: React.ChangeEvent) => void
  onSelectOne?: (event: React.ChangeEvent, row: TRowModel) => void
  rows: TRowModel[]
  selectable?: boolean
  selected?: Set<RowId>
  uniqueRowId?: (row: TRowModel) => RowId
  isActive?: boolean
  activeId?: RowId
  tableType?: TableType
  draggedItemId?: number | null
  isDragging?: boolean
  isDragDrop?: boolean
  handlers?: {
    handleDragStart: (e: React.DragEvent<HTMLElement>, rowId: number) => void
    handleDragOver: (e: React.DragEvent<HTMLElement>) => void
    handleDragEnter: (e: React.DragEvent<HTMLElement>) => void
    handleDragLeave: (e: React.DragEvent<HTMLElement>) => void
    handleDrop: (e: React.DragEvent<HTMLElement>, rowId: number) => void
    handleDragEnd: (e: React.DragEvent<HTMLElement>) => void
  }
  bgColor?: {
    header: string
    rowEven: string
    rowOdd: string
    rowHover: string
  }
  count?: number
  tableHeaderCellSx?: SxProps
}

export function DataGrid<TRowModel extends object & { id?: RowId | null }>({
  columns,
  sortData,
  hideHead,
  hover,
  onClick,
  onDeselectAll,
  onDeselectOne,
  onSelectOne,
  onSelectAll,
  rows,
  selectable,
  selected,
  uniqueRowId,
  isActive,
  activeId,
  tableType = 'lineOnly',
  draggedItemId,
  isDragging,
  handlers,
  isDragDrop,
  bgColor = {
    header: '#E7E7E7',
    rowEven: 'rgba(0, 0, 0, 0.01)',
    rowOdd: 'transparent',
    rowHover: 'rgba(0, 0, 0, 0.04)',
  },
  count,
  tableHeaderCellSx,
  ...props
}: DataGridProps<TRowModel>): React.JSX.Element {
  let selectedSome = false
  let selectedAll = false
  if (selected?.size) {
    selectedSome = selected?.size > 0
    selectedAll = selected?.size === rows?.length
  }

  return (
    <>
      <TableSummaryHeader count={count} sx={{ mb: 2 }} />
      <TableContainer
        sx={{
          '& .MuiTableCell-body': {
            borderBottom: 'none',
          },
          border: tableType === 'bordered' ? '1px solid #ccc' : 'none',
          borderRadius: tableType === 'bordered' ? '15px' : 'none',
          ...(isDragDrop && {
            overflow: 'hidden',
            position: 'relative',
            transition: 'all 0.3s ease',
            '&.reset-animation': {
              animation: 'pulse 0.5s ease',
            },
            '& .dragging-row': {
              backgroundColor: 'rgba(33, 150, 243, 0.1) !important',
              boxShadow: '0 0 0 2px rgba(33, 150, 243, 0.5) !important',
            },
            '& .drag-over': {
              borderTop: '2px dashed rgba(25, 118, 210, 0.5)',
              borderBottom: '2px dashed rgba(25, 118, 210, 0.5)',
            },
            '@keyframes pulse': {
              '0%': {
                boxShadow: '0px 2px 9px 0px rgba(136, 136, 136, 0.12)',
              },
              '50%': {
                boxShadow:
                  '0px 0px 0px 2px rgba(33, 150, 243, 0.5), 0px 2px 15px 0px rgba(33, 150, 243, 0.3)',
              },
              '100%': {
                boxShadow: '0px 2px 9px 0px rgba(136, 136, 136, 0.12)',
              },
            },
          }),
        }}
      >
        <Table
          {...props}
          {...(isDragDrop && {
            'aria-label': 'draggable table',
            stickyHeader: true,
          })}
        >
          <TableHead
            sx={{
              ...(hideHead && {
                visibility: 'collapse',
                '--TableCell-borderWidth': 0,
              }),
            }}
          >
            <TableRow>
              {selectable ? (
                <TableCell
                  padding="checkbox"
                  sx={{
                    width: '40px',
                    minWidth: '40px',
                    maxWidth: '40px',
                    py: 0,
                    height: '46px',
                  }}
                >
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome && !selectedAll}
                    onChange={(event: React.ChangeEvent) => {
                      if (selectedAll) {
                        onDeselectAll?.(event)
                      } else {
                        onSelectAll?.(event)
                      }
                    }}
                  />
                </TableCell>
              ) : null}
              {columns.map((column): React.JSX.Element => {
                const isActive = sortData?.sort === column.sort?.toString()
                const direction =
                  isActive && sortData?.sortValue?.toLowerCase() === 'desc'
                    ? 'desc'
                    : 'asc'

                return (
                  <TableCell
                    key={column.name}
                    align={'center'}
                    sx={{
                      width: column.width,
                      minWidth: column.width,
                      maxWidth: column.width,
                      py: 0,
                      height: '46px',
                      ...(column.align && { textAlign: column.align }),
                      '& .MuiTableSortLabel-root': {
                        gap: '10px',
                      },
                      ...tableHeaderCellSx,
                    }}
                  >
                    {column.sortClick ? (
                      <TableSortLabel
                        active
                        direction={isActive ? direction : 'desc'}
                        IconComponent={CustomSortIcon}
                        onClick={(e) => {
                          e.stopPropagation()
                          column.sortClick?.()
                        }}
                      >
                        {column.hideName ? null : column.name}
                      </TableSortLabel>
                    ) : column.hideName ? null : (
                      column.name
                    )}
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell
                  sx={{ py: 8 }}
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  align="center"
                >
                  <Typography color="text.secondary" variant="body2">
                    No data
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, index): React.JSX.Element => {
                const rowId = row.id ? row.id : uniqueRowId?.(row)
                const rowSelected = rowId ? selected?.has(rowId) : false
                return (
                  <TableRow
                    hover={hover}
                    key={rowId ?? index}
                    selected={rowSelected}
                    {...(onClick && {
                      onClick: (event: React.MouseEvent) => {
                        onClick(event, row)
                      },
                    })}
                    sx={{
                      ...(onClick && { cursor: 'pointer' }),
                      ...(isActive &&
                        activeId === rowId && {
                          backgroundColor: 'rgba(221, 25, 33, 0.08)',
                        }),
                      borderBottom: 'none',
                    }}
                    // draggable style
                    {...(isDragDrop && {
                      draggable: true,
                      onDragStart: (e: React.DragEvent<HTMLElement>) =>
                        handlers?.handleDragStart(e, +rowId!),
                      onDragOver: handlers?.handleDragOver,
                      onDragEnter: handlers?.handleDragEnter,
                      onDragLeave: handlers?.handleDragLeave,
                      onDrop: (e: React.DragEvent<HTMLElement>) =>
                        handlers?.handleDrop(e, +rowId!),
                      onDragEnd: handlers?.handleDragEnd,
                      cursor: isDragging
                        ? +rowId! === draggedItemId
                          ? 'grabbing'
                          : 'pointer'
                        : 'grab',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                      backgroundColor:
                        index % 2 === 0 ? bgColor.rowEven : bgColor.rowOdd,
                      '&:hover': {
                        backgroundColor: bgColor.rowHover,
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                        '& .drag-handle': {
                          opacity: 1,
                        },
                      },
                      ...(+rowId! === draggedItemId && {
                        opacity: 0.7,
                        backgroundColor: 'rgba(33, 150, 243, 0.1)',
                        boxShadow: '0 0 0 2px rgba(33, 150, 243, 0.5)',
                      }),
                      ...(!isDragging && {
                        '&:active': {
                          cursor: 'grabbing',
                          transform: 'scale(0.99)',
                        },
                      }),
                    })}
                    className={+rowId! === draggedItemId ? 'dragging-row' : ''}
                  >
                    {selectable ? (
                      <TableCell padding="checkbox" align={'center'}>
                        <Checkbox
                          checked={rowId ? rowSelected : false}
                          onChange={(event: React.ChangeEvent) => {
                            if (rowSelected) {
                              onDeselectOne?.(event, row)
                            } else {
                              onSelectOne?.(event, row)
                            }
                          }}
                          onClick={(event: React.MouseEvent) => {
                            if (onClick) {
                              event.stopPropagation()
                            }
                          }}
                        />
                      </TableCell>
                    ) : null}
                    {columns.map((column): React.JSX.Element => {
                      return (
                        <TableCell
                          align={'center'}
                          key={column.name}
                          sx={{
                            ...(column.align && { textAlign: column.align }),
                          }}
                        >
                          {
                            (column.formatter
                              ? column.formatter(row, index) || '-'
                              : column.field
                                ? get(row, column.field)
                                : null) as React.ReactNode
                          }
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

const CustomSortIcon = (props: SvgIconProps) => {
  const isDesc = props.className?.includes(
    'MuiTableSortLabel-iconDirectionDesc',
  )
  return (
    <SvgIcon
      {...props}
      sx={{
        transform: isDesc ? 'rotate(180deg)' : 'rotate(0deg)',
        width: '8px',
        height: '6px',
      }}
    >
      <svg
        width="8"
        height="6"
        viewBox="0 0 8 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.77769 5.03783C4.37744 5.533 3.62251 5.533 3.22226 5.03783L0.466628 1.62862C-0.0619455 0.974678 0.403492 -8.03982e-07 1.24434 -7.30473e-07L6.75561 -2.48662e-07C7.59646 -1.75153e-07 8.06189 0.974678 7.53332 1.62862L4.77769 5.03783Z"
          fill="#222222"
        />
      </svg>
    </SvgIcon>
  )
}