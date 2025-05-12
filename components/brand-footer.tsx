"use client"

import { useState } from "react"
import { BrandLogo } from "./brand-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Github, Twitter, Linkedin, Mail, ArrowRight, ChevronUp, ChevronDown } from "lucide-react"

export function BrandFooter() {
  const [isExpanded, setIsExpanded] = useState(false)
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-r from-blue-50 to-white border-t border-blue-100">
      {/* 折叠控制按钮 */}
      <div className="container mx-auto px-4 py-2 flex justify-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
        >
          {isExpanded ? "收起页脚" : "展开页脚"}
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>

      {/* 简化版页脚 - 始终显示 */}
      <div className="container mx-auto px-4 py-2 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-2">
          <BrandLogo variant="icon" size="sm" />
          <span className="text-sm text-muted-foreground">© {currentYear} 言语云³</span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-2 md:mt-0 text-xs">
          <a href="#" className="text-muted-foreground hover:text-blue-600 transition-colors">
            使用条款
          </a>
          <a href="#" className="text-muted-foreground hover:text-blue-600 transition-colors">
            隐私政策
          </a>
          <a href="#" className="text-muted-foreground hover:text-blue-600 transition-colors">
            服务状态
          </a>
        </div>
      </div>

      {/* 完整页脚 - 仅在展开时显示 */}
      {isExpanded && (
        <div className="container mx-auto px-4 py-8 border-t border-blue-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <BrandLogo variant="full" size="lg" />
              <p className="text-sm text-muted-foreground">
                言语云³ - 智能×连接×安全
                <br />
                连接智慧丨云启未来
              </p>
              <div className="flex space-x-3">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Twitter</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Email</span>
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-4 text-blue-950">产品</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">
                    API管理
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">
                    开发工具
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">
                    智能助手
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">
                    安全中心
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">
                    数据分析
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4 text-blue-950">资源</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">
                    文档中心
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">
                    开发者社区
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">
                    API市场
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">
                    合作伙伴
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">
                    技术博客
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4 text-blue-950">订阅更新</h3>
              <p className="text-sm text-muted-foreground mb-4">订阅我们的通讯，获取最新产品更新和技术资讯</p>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input type="email" placeholder="您的邮箱地址" className="border-blue-200 focus:border-blue-400" />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  订阅
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">我们尊重您的隐私，不会发送垃圾邮件</p>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-blue-100 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© {currentYear} 言语云³. 保留所有权利</p>
            <div className="flex flex-wrap justify-center gap-4 mt-4 md:mt-0">
              <a href="#" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">
                使用条款
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">
                隐私政策
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">
                安全说明
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">
                服务状态
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">
                Cookie设置
              </a>
            </div>
          </div>
        </div>
      )}
    </footer>
  )
}
