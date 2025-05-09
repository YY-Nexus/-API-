"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronDown, ChevronRight, ChevronUp, Filter, Search } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

interface Column<T> {
  header: string
  accessorKey: keyof T
  cell?: (item: T) => React.ReactNode
  sortable?: boolean
  className?: string
  mobileHidden?: boolean
}

interface ResponsiveDataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  searchable?: boolean
  searchPlaceholder?: string
  onSearch?: (query: string) => void
  filterable?: boolean
  onFilter?: () => void
  expandable?: boolean
  renderExpandedRow?: (item: T) => React.ReactNode
  pageSize?: number
  className?: string
}

export function ResponsiveDataTable<T>({
  data,
  columns,
  searchable = false,
  searchPlaceholder = "搜索...",
  onSearch,
  filterable = false,
  onFilter,
  expandable = false,
  renderExpandedRow,
  pageSize = 5,
  className = "",
}: ResponsiveDataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null
    direction: "asc" | "desc" | null
  }>({ key: null, direction: null })
  const [currentPage, setCurrentPage] = useState(1)

  const isMobile = useMediaQuery("(max-width: 640px)")

  // 处理搜索
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    if (onSearch) {
      onSearch(query)
    }
  }

  // 处理排序
  const handleSort = (key: keyof T) => {
    let direction: "asc" | "desc" | null = "asc"

    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        direction = "desc"
      } else if (sortConfig.direction === "desc") {
        direction = null
      }
    }

    setSortConfig({ key, direction })
  }

  // 处理展开/折叠行
  const toggleRowExpanded = (index: number) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  // 排序数据
  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key || !sortConfig.direction) return 0

    const aValue = a[sortConfig.key]
    const bValue = b[sortConfig.key]

    if (aValue < bValue) {
      return sortConfig.direction === "asc" ? -1 : 1
    }
    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1
    }
    return 0
  })

  // 分页
  const totalPages = Math.ceil(sortedData.length / pageSize)
  const paginatedData = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  // 获取排序图标
  const getSortIcon = (key: keyof T) => {
    if (sortConfig.key !== key) return null

    if (sortConfig.direction === "asc") {
      return <ChevronUp className="h-4 w-4 ml-1" />
    } else if (sortConfig.direction === "desc") {
      return <ChevronDown className="h-4 w-4 ml-1" />
    }

    return null
  }

  // 移动端视图
  if (isMobile) {
    return (
      <div className={`space-y-4 ${className}`}>
        {/* 搜索和筛选 */}
        {(searchable || filterable) && (
          <div className="flex items-center space-x-2 mb-2">
            {searchable && (
              <div className="relative flex-1">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full pl-8 pr-3 py-1 text-sm rounded-md border border-input"
                />
              </div>
            )}
            {filterable && (
              <Button variant="outline" size="sm" onClick={onFilter}>
                <Filter className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}

        {/* 卡片列表 */}
        <div className="space-y-2">
          {paginatedData.map((item, index) => (
            <Card key={index} className="overflow-hidden">
              <div
                className={`p-3 ${expandable ? "cursor-pointer" : ""}`}
                onClick={expandable ? () => toggleRowExpanded(index) : undefined}
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1 flex-1">
                    {columns
                      .filter((col) => !col.mobileHidden)
                      .map((column, colIndex) => (
                        <div key={colIndex} className="flex flex-col">
                          <span className="text-xs text-muted-foreground">{column.header}</span>
                          <div className="font-medium text-sm">
                            {column.cell ? column.cell(item) : String(item[column.accessorKey] || "")}
                          </div>
                        </div>
                      ))}
                  </div>
                  {expandable && (
                    <Button variant="ghost" size="sm" className="p-1 h-auto">
                      {expandedRows[index] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  )}
                </div>
              </div>

              {/* 展开的内容 */}
              {expandable && expandedRows[index] && renderExpandedRow && (
                <div className="px-3 pb-3 pt-0 border-t">{renderExpandedRow(item)}</div>
              )}
            </Card>
          ))}
        </div>

        {/* 分页 */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-1 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              上一页
            </Button>
            <span className="text-sm px-2">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              下一页
            </Button>
          </div>
        )}
      </div>
    )
  }

  // 桌面端视图
  return (
    <div className={`space-y-4 ${className}`}>
      {/* 搜索和筛选 */}
      {(searchable || filterable) && (
        <div className="flex items-center space-x-2 mb-2">
          {searchable && (
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-9 pr-3 py-2 rounded-md border border-input"
              />
            </div>
          )}
          {filterable && (
            <Button variant="outline" onClick={onFilter}>
              <Filter className="h-4 w-4 mr-2" />
              筛选
            </Button>
          )}
        </div>
      )}

      {/* 表格 */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              {expandable && <th className="w-10 py-3 px-4"></th>}
              {columns.map((column, index) => (
                <th key={index} className={`text-left py-3 px-4 font-medium ${column.className || ""}`}>
                  {column.sortable ? (
                    <button
                      className="flex items-center focus:outline-none"
                      onClick={() => handleSort(column.accessorKey)}
                    >
                      {column.header}
                      {getSortIcon(column.accessorKey)}
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, rowIndex) => (
              <>
                <tr key={rowIndex} className="border-b">
                  {expandable && (
                    <td className="py-3 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-0 h-6 w-6"
                        onClick={() => toggleRowExpanded(rowIndex)}
                      >
                        {expandedRows[rowIndex] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </td>
                  )}
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className={`py-3 px-4 ${column.className || ""}`}>
                      {column.cell ? column.cell(item) : String(item[column.accessorKey] || "")}
                    </td>
                  ))}
                </tr>

                {/* 展开的行 */}
                {expandable && expandedRows[rowIndex] && renderExpandedRow && (
                  <tr>
                    <td colSpan={columns.length + (expandable ? 1 : 0)} className="py-3 px-4 bg-muted/20">
                      {renderExpandedRow(item)}
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* 分页 */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-muted-foreground">
            显示 {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, data.length)} 条，共{" "}
            {data.length} 条
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              上一页
            </Button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum = i + 1
              if (totalPages > 5 && currentPage > 3) {
                pageNum = currentPage - 3 + i
                if (pageNum > totalPages) {
                  pageNum = totalPages - (4 - i)
                }
              }
              return (
                <Button
                  key={i}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(pageNum)}
                  className="w-8 h-8 p-0"
                >
                  {pageNum}
                </Button>
              )
            })}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              下一页
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
