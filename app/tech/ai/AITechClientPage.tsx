"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Cpu, Search, Brain, FileText, ArrowUpRight, Filter, BookOpen } from "lucide-react"

// AI模型数据
const aiModels = [
  {
    id: 1,
    name: "GPT-4",
    provider: "OpenAI",
    description: "先进的大型语言模型，具有强大的自然语言理解和生成能力",
    category: "大型语言模型",
    capabilities: ["文本生成", "对话", "内容创作", "代码生成", "问答"],
    releaseYear: 2023,
    website: "https://openai.com/gpt-4",
    logo: "/placeholder.svg?height=40&width=40&query=OpenAI",
  },
  {
    id: 2,
    name: "Claude",
    provider: "Anthropic",
    description: "专注于安全和有益对话的AI助手",
    category: "大型语言模型",
    capabilities: ["对话", "内容创作", "问答", "摘要"],
    releaseYear: 2023,
    website: "https://www.anthropic.com/claude",
    logo: "/placeholder.svg?height=40&width=40&query=Anthropic",
  },
  {
    id: 3,
    name: "DALL-E 3",
    provider: "OpenAI",
    description: "能够从文本描述生成高质量图像的AI模型",
    category: "图像生成",
    capabilities: ["图像生成", "创意设计", "概念可视化"],
    releaseYear: 2023,
    website: "https://openai.com/dall-e-3",
    logo: "/placeholder.svg?height=40&width=40&query=DALL-E",
  },
  {
    id: 4,
    name: "Midjourney",
    provider: "Midjourney",
    description: "强大的AI图像生成工具，专注于艺术和创意表达",
    category: "图像生成",
    capabilities: ["图像生成", "艺术创作", "概念设计"],
    releaseYear: 2022,
    website: "https://www.midjourney.com/",
    logo: "/placeholder.svg?height=40&width=40&query=Midjourney",
  },
  {
    id: 5,
    name: "Gemini",
    provider: "Google",
    description: "谷歌的多模态AI模型，能够处理文本、图像和其他数据类型",
    category: "多模态模型",
    capabilities: ["文本生成", "图像理解", "多模态推理", "代码生成"],
    releaseYear: 2023,
    website: "https://deepmind.google/technologies/gemini/",
    logo: "/placeholder.svg?height=40&width=40&query=Google Gemini",
  },
  {
    id: 6,
    name: "Whisper",
    provider: "OpenAI",
    description: "强大的语音识别模型，支持多种语言",
    category: "语音识别",
    capabilities: ["语音转文本", "多语言支持", "音频转录"],
    releaseYear: 2022,
    website: "https://openai.com/research/whisper",
    logo: "/placeholder.svg?height=40&width=40&query=Whisper",
  },
  {
    id: 7,
    name: "Stable Diffusion",
    provider: "Stability AI",
    description: "开源的文本到图像生成模型",
    category: "图像生成",
    capabilities: ["图像生成", "图像编辑", "风格转换"],
    releaseYear: 2022,
    website: "https://stability.ai/stable-diffusion",
    logo: "/placeholder.svg?height=40&width=40&query=Stable Diffusion",
  },
  {
    id: 8,
    name: "LLaMA 2",
    provider: "Meta",
    description: "Meta的开源大型语言模型",
    category: "大型语言模型",
    capabilities: ["文本生成", "对话", "推理", "问答"],
    releaseYear: 2023,
    website: "https://ai.meta.com/llama/",
    logo: "/placeholder.svg?height=40&width=40&query=Meta AI",
  },
]

// AI应用场景数据
const aiApplications = [
  {
    id: 1,
    name: "智能客服",
    description: "使用AI驱动的聊天机器人提供24/7客户支持",
    category: "企业应用",
    technologies: ["自然语言处理", "对话管理", "情感分析"],
    benefits: ["降低运营成本", "提高响应速度", "扩展服务能力", "收集客户反馈"],
    examples: ["Intercom", "Zendesk", "Freshdesk", "Drift"],
  },
  {
    id: 2,
    name: "内容生成",
    description: "自动创建文章、报告、广告文案和社交媒体内容",
    category: "创意工具",
    technologies: ["大型语言模型", "自然语言生成", "内容规划"],
    benefits: ["提高内容产出", "保持一致性", "减少创作时间", "多语言支持"],
    examples: ["Jasper", "Copy.ai", "Writesonic", "Notion AI"],
  },
  {
    id: 3,
    name: "智能推荐系统",
    description: "为用户提供个性化产品、内容和服务推荐",
    category: "电子商务",
    technologies: ["协同过滤", "内容分析", "用户行为建模"],
    benefits: ["提高转化率", "增加用户参与度", "个性化体验", "发现新内容"],
    examples: ["Netflix", "Amazon", "Spotify", "YouTube"],
  },
  {
    id: 4,
    name: "计算机视觉应用",
    description: "使用AI分析和理解图像和视频内容",
    category: "视觉智能",
    technologies: ["图像识别", "物体检测", "场景理解", "视频分析"],
    benefits: ["自动化视觉任务", "提高安全性", "质量控制", "数据洞察"],
    examples: ["自动驾驶", "医学影像分析", "安防监控", "零售分析"],
  },
  {
    id: 5,
    name: "预测分析",
    description: "使用AI预测未来趋势和行为",
    category: "数据分析",
    technologies: ["机器学习", "时间序列分析", "回归模型", "神经网络"],
    benefits: ["优化决策", "预测需求", "风险管理", "资源规划"],
    examples: ["销售预测", "库存管理", "金融市场分析", "天气预报"],
  },
  {
    id: 6,
    name: "语音助手",
    description: "通过语音交互提供信息和服务",
    category: "消费者应用",
    technologies: ["语音识别", "自然语言理解", "语音合成", "对话管理"],
    benefits: ["免手操作", "提高可访问性", "简化交互", "多任务处理"],
    examples: ["Siri", "Google Assistant", "Alexa", "Cortana"],
  },
]

// AI开发框架数据
const aiFrameworks = [
  {
    id: 1,
    name: "TensorFlow",
    developer: "Google",
    description: "开源机器学习框架，支持深度学习和神经网络",
    category: "深度学习",
    languages: ["Python", "JavaScript", "C++", "Java"],
    features: ["分布式训练", "模型部署", "可视化工具", "预训练模型"],
    website: "https://www.tensorflow.org/",
    logo: "/placeholder.svg?height=40&width=40&query=TensorFlow",
  },
  {
    id: 2,
    name: "PyTorch",
    developer: "Facebook/Meta",
    description: "灵活的深度学习框架，广泛用于研究和生产",
    category: "深度学习",
    languages: ["Python", "C++"],
    features: ["动态计算图", "GPU加速", "丰富的工具生态", "易于调试"],
    website: "https://pytorch.org/",
    logo: "/placeholder.svg?height=40&width=40&query=PyTorch",
  },
  {
    id: 3,
    name: "Hugging Face Transformers",
    developer: "Hugging Face",
    description: "提供预训练模型的自然语言处理库",
    category: "自然语言处理",
    languages: ["Python"],
    features: ["预训练模型", "微调工具", "模型共享", "多任务支持"],
    website: "https://huggingface.co/transformers/",
    logo: "/placeholder.svg?height=40&width=40&query=Hugging Face",
  },
  {
    id: 4,
    name: "scikit-learn",
    developer: "开源社区",
    description: "简单高效的数据挖掘和数据分析工具",
    category: "机器学习",
    languages: ["Python"],
    features: ["分类", "回归", "聚类", "降维", "模型选择"],
    website: "https://scikit-learn.org/",
    logo: "/placeholder.svg?height=40&width=40&query=scikit-learn",
  },
  {
    id: 5,
    name: "Keras",
    developer: "François Chollet",
    description: "高级神经网络API，现已集成到TensorFlow中",
    category: "深度学习",
    languages: ["Python"],
    features: ["用户友好", "模块化", "可扩展", "多后端支持"],
    website: "https://keras.io/",
    logo: "/placeholder.svg?height=40&width=40&query=Keras",
  },
  {
    id: 6,
    name: "LangChain",
    developer: "LangChain",
    description: "构建基于语言模型的应用程序框架",
    category: "LLM应用",
    languages: ["Python", "JavaScript"],
    features: ["链式调用", "代理", "记忆管理", "工具集成"],
    website: "https://langchain.com/",
    logo: "/placeholder.svg?height=40&width=40&query=LangChain",
  },
  {
    id: 7,
    name: "OpenCV",
    developer: "开源社区",
    description: "计算机视觉和机器学习软件库",
    category: "计算机视觉",
    languages: ["C++", "Python", "Java"],
    features: ["图像处理", "视频分析", "物体检测", "机器学习集成"],
    website: "https://opencv.org/",
    logo: "/placeholder.svg?height=40&width=40&query=OpenCV",
  },
  {
    id: 8,
    name: "spaCy",
    developer: "Explosion",
    description: "工业级自然语言处理库",
    category: "自然语言处理",
    languages: ["Python"],
    features: ["词性标注", "命名实体识别", "依存句法分析", "词向量"],
    website: "https://spacy.io/",
    logo: "/placeholder.svg?height=40&width=40&query=spaCy",
  },
]

// AI教程数据
const aiTutorials = [
  {
    id: 1,
    title: "机器学习基础",
    description: "学习机器学习的核心概念和算法",
    level: "初级",
    duration: "10小时",
    topics: ["监督学习", "无监督学习", "模型评估", "特征工程"],
    link: "#ml-basics",
  },
  {
    id: 2,
    title: "深度学习入门",
    description: "了解神经网络和深度学习的基本原理",
    level: "中级",
    duration: "15小时",
    topics: ["神经网络基础", "反向传播", "卷积神经网络", "循环神经网络"],
    link: "#deep-learning",
  },
  {
    id: 3,
    title: "自然语言处理实战",
    description: "学习处理和分析文本数据的技术",
    level: "中级",
    duration: "12小时",
    topics: ["文本预处理", "词向量", "情感分析", "命名实体识别"],
    link: "#nlp-practical",
  },
  {
    id: 4,
    title: "大型语言模型应用开发",
    description: "学习如何使用和微调大型语言模型构建应用",
    level: "高级",
    duration: "20小时",
    topics: ["提示工程", "微调技术", "LLM应用架构", "RAG系统"],
    link: "#llm-applications",
  },
]

export function AITechClientPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // 过滤AI模型
  const filteredModels = aiModels.filter((model) => {
    const matchesSearch =
      model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.capabilities.some((capability) => capability.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || model.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // 获取所有唯一的模型类别
  const categories = ["all", ...new Set(aiModels.map((model) => model.category))]

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">智能技术</h1>
          <p className="text-muted-foreground">人工智能、机器学习和智能应用开发</p>
        </div>
      </div>

      <Tabs defaultValue="models" className="space-y-4">
        <TabsList>
          <TabsTrigger value="models">
            <Brain className="h-4 w-4 mr-2" />
            AI模型
          </TabsTrigger>
          <TabsTrigger value="applications">
            <Cpu className="h-4 w-4 mr-2" />
            应用场景
          </TabsTrigger>
          <TabsTrigger value="frameworks">
            <FileText className="h-4 w-4 mr-2" />
            开发框架
          </TabsTrigger>
          <TabsTrigger value="tutorials">
            <BookOpen className="h-4 w-4 mr-2" />
            AI教程
          </TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="搜索AI模型..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === "all" ? "全部" : category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredModels.map((model) => (
              <Card key={model.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={model.logo || "/placeholder.svg"} alt={model.provider} className="w-10 h-10 rounded" />
                      <div>
                        <CardTitle className="text-lg">{model.name}</CardTitle>
                        <CardDescription>{model.provider}</CardDescription>
                      </div>
                    </div>
                    <Badge>{model.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{model.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">发布年份:</span>
                      <span className="font-medium">{model.releaseYear}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm text-muted-foreground">能力:</span>
                      <div className="flex flex-wrap gap-2">
                        {model.capabilities.map((capability) => (
                          <Badge key={capability} variant="outline">
                            {capability}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <a href={model.website} target="_blank" rel="noopener noreferrer">
                      了解更多
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiApplications.map((app) => (
              <Card key={app.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{app.name}</CardTitle>
                      <CardDescription>{app.category}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>{app.description}</p>
                  <div>
                    <h4 className="text-sm font-medium mb-2">核心技术</h4>
                    <div className="flex flex-wrap gap-2">
                      {app.technologies.map((tech) => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">主要优势</h4>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                      {app.benefits.map((benefit) => (
                        <li key={benefit} className="text-sm flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">代表性应用</h4>
                    <div className="flex flex-wrap gap-2">
                      {app.examples.map((example) => (
                        <Badge key={example} variant="secondary">
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="frameworks" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiFrameworks.map((framework) => (
              <Card key={framework.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={framework.logo || "/placeholder.svg"}
                        alt={framework.name}
                        className="w-10 h-10 rounded"
                      />
                      <div>
                        <CardTitle className="text-lg">{framework.name}</CardTitle>
                        <CardDescription>{framework.developer}</CardDescription>
                      </div>
                    </div>
                    <Badge>{framework.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{framework.description}</p>
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <span className="text-sm text-muted-foreground">支持语言:</span>
                      <div className="flex flex-wrap gap-2">
                        {framework.languages.map((lang) => (
                          <Badge key={lang} variant="outline">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm text-muted-foreground">主要特性:</span>
                      <div className="flex flex-wrap gap-2">
                        {framework.features.map((feature) => (
                          <Badge key={feature} variant="outline">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <a href={framework.website} target="_blank" rel="noopener noreferrer">
                      访问官网
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tutorials" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiTutorials.map((tutorial) => (
              <Card key={tutorial.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                    <Badge
                      variant="outline"
                      className={
                        tutorial.level === "初级"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : tutorial.level === "中级"
                            ? "bg-blue-100 text-blue-800 border-blue-200"
                            : "bg-purple-100 text-purple-800 border-purple-200"
                      }
                    >
                      {tutorial.level}
                    </Badge>
                  </div>
                  <CardDescription>{tutorial.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Clock className="mr-1 h-4 w-4" />
                    {tutorial.duration}
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">涵盖主题</h4>
                    <div className="flex flex-wrap gap-2">
                      {tutorial.topics.map((topic) => (
                        <Badge key={topic} variant="outline">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <a href={tutorial.link}>
                      开始学习
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function CheckCircle(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

function Clock(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
