import { BrandLogo } from "./brand-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Github, Twitter, Linkedin, Mail, ArrowRight } from "lucide-react"

export function BrandFooter() {
  return (
    <footer className="bg-gradient-to-r from-blue-50 to-white border-t border-blue-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <BrandLogo variant="full" size="lg" />
            <p className="text-sm text-muted-foreground">
              启智云枢³ - 智能×连接×安全
              <br />
              智联万物丨枢启未来
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

        <div className="mt-12 pt-8 border-t border-blue-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} 启智云枢³. 保留所有权利</p>
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
    </footer>
  )
}
