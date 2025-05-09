"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Search, X } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-mobile"

interface MobileSearchProps {
  onSearch: (query: string) => void
  onSelectEndpoint?: (endpoint: any) => void
  endpoints: any[]
}

export function MobileSearch({ onSearch, onSelectEndpoint, endpoints }: MobileSearchProps) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const isMobile = useMediaQuery("(max-width: 768px)")

  // 处理搜索
  const handleSearch = () => {
    onSearch(searchQuery)
    if (!onSelectEndpoint) {
      setOpen(false)
    }
  }

  // 处理端点选择
  const handleEndpointSelect = (endpoint: any) => {
    if (onSelectEndpoint) {
      onSelectEndpoint(endpoint)
      setOpen(false)
    }
  }

  // 过滤端点
  const filteredEndpoints = searchQuery
    ? endpoints.flatMap((category) =>
        category.endpoints.filter(
          (endpoint: any) =>
            endpoint.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            endpoint.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
            endpoint.description.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      )
    : []

  if (!isMobile) return null

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="md:hidden fixed top-4 right-4 z-50"
        onClick={() => setOpen(true)}
      >
        <Search className="h-5 w-5" />
        <span className="sr-only">搜索</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] p-0 gap-0">
          <DialogHeader className="p-4 border-b">
            <DialogTitle>搜索API</DialogTitle>
          </DialogHeader>
          <div className="p-4 space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="搜索API端点..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch()
                  }
                }}
                autoFocus
              />
              {searchQuery && (
                <Button variant="ghost" size="icon" onClick={() => setSearchQuery("")}>
                  <X className="h-4 w-4" />
                </Button>
              )}
              <Button onClick={handleSearch}>搜索</Button>
            </div>

            {searchQuery && (
              <ScrollArea className="h-[50vh]">
                <div className="space-y-2">
                  {filteredEndpoints.length > 0 ? (
                    filteredEndpoints.map((endpoint, index) => (
                      <div
                        key={index}
                        className="p-3 border rounded-md hover:bg-muted cursor-pointer"
                        onClick={() => handleEndpointSelect(endpoint)}
                      >
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant="outline"
                            className={
                              endpoint.method === "GET"
                                ? "bg-blue-100"
                                : endpoint.method === "POST"
                                  ? "bg-green-100"
                                  : endpoint.method === "PUT"
                                    ? "bg-yellow-100"
                                    : endpoint.method === "DELETE"
                                      ? "bg-red-100"
                                      : ""
                            }
                          >
                            {endpoint.method}
                          </Badge>
                          <span className="font-medium">{endpoint.name}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{endpoint.description}</p>
                        <code className="text-xs bg-muted px-1 py-0.5 rounded mt-1 block">{endpoint.path}</code>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>没有找到匹配的API端点</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
