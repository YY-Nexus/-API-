import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// 分析类型
type AnalysisType = "classify" | "tag" | "extract" | "summarize" | "chat"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, files, customPrompt } = body

    if (!type || !Array.isArray(files) || files.length === 0) {
      return NextResponse.json({ error: "无效请求。需要指定分析类型和文件。" }, { status: 400 })
    }

    // 根据分析类型构建提示词
    let prompt = ""
    switch (type) {
      case "classify":
        prompt =
          customPrompt ||
          `请分析以下文件并将它们分类为适当的类别。考虑文件的内容、格式和用途。
文件列表：
${files.map((file: any) => `- ${file.name} (${file.type})`).join("\n")}

请为每个文件提供一个合适的分类，并简要解释原因。`
        break
      case "tag":
        prompt =
          customPrompt ||
          `请为以下文件生成相关标签。标签应该反映文件的内容、主题和用途。
文件列表：
${files.map((file: any) => `- ${file.name} (${file.type})`).join("\n")}

请为每个文件提供5-10个相关标签。`
        break
      case "extract":
        prompt =
          customPrompt ||
          `请从以下文件中提取关键信息，包括主要内容、重要数据和关键概念。
文件列表：
${files.map((file: any) => `- ${file.name} (${file.type})`).join("\n")}

请提供每个文件的关键信息摘要。`
        break
      case "summarize":
        prompt =
          customPrompt ||
          `请为以下文件生成简洁的摘要，概括其主要内容和目的。
文件列表：
${files.map((file: any) => `- ${file.name} (${file.type})`).join("\n")}

请为每个文件提供一个简短的摘要（100-200字）。`
        break
      case "chat":
        // 聊天模式使用用户提供的自定义提示词
        prompt =
          customPrompt ||
          `请分析以下文件并回答我的问题。
文件列表：
${files.map((file: any) => `- ${file.name} (${file.type})`).join("\n")}

我的问题是：这些文件的主要内容是什么？`
        break
      default:
        return NextResponse.json({ error: "不支持的分析类型" }, { status: 400 })
    }

    // 调用AI生成回答
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: prompt,
      temperature: 0.7,
      maxTokens: 1000,
    })

    // 处理AI响应
    let result
    switch (type) {
      case "classify":
        // 解析分类结果
        result = {
          success: true,
          message: "文件分类完成",
          classifications: parseClassifications(text, files),
        }
        break
      case "tag":
        // 解析标签结果
        result = {
          success: true,
          message: "标签生成完成",
          tags: parseTags(text, files),
        }
        break
      case "extract":
        // 解析提取结果
        result = {
          success: true,
          message: "内容提取完成",
          extractions: parseExtractions(text, files),
        }
        break
      case "summarize":
        // 解析摘要结果
        result = {
          success: true,
          message: "摘要生成完成",
          summaries: parseSummaries(text, files),
        }
        break
      case "chat":
        // 返回聊天响应
        result = {
          success: true,
          message: "AI已响应您的问题",
          response: text,
        }
        break
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("AI分析失败:", error)
    return NextResponse.json(
      { error: "AI分析失败", details: error instanceof Error ? error.message : "未知错误" },
      { status: 500 },
    )
  }
}

// 解析分类结果
function parseClassifications(text: string, files: any[]) {
  // 简单实现：假设AI返回的是每行一个文件分类
  // 实际应用中应该使用更复杂的解析逻辑或结构化输出
  const lines = text.split("\n").filter((line) => line.trim())

  return files.map((file, index) => {
    const relevantLine = lines.find((line) => line.includes(file.name)) || lines[index] || ""
    const category = extractCategory(relevantLine)

    return {
      fileId: file.id,
      fileName: file.name,
      category: category || "未分类",
    }
  })
}

// 解析标签结果
function parseTags(text: string, files: any[]) {
  // 简单实现：假设AI返回的是每行一个文件的标签
  const lines = text.split("\n").filter((line) => line.trim())

  return files.map((file, index) => {
    const relevantLine = lines.find((line) => line.includes(file.name)) || lines[index] || ""
    const tags = extractTags(relevantLine)

    return {
      fileId: file.id,
      fileName: file.name,
      tags: tags.length > 0 ? tags : ["API", "文档"],
    }
  })
}

// 解析提取结果
function parseExtractions(text: string, files: any[]) {
  // 简单实现：假设AI返回的是每个文件的内容提取
  const sections = text.split("\n\n").filter((section) => section.trim())

  return files.map((file, index) => {
    const relevantSection = sections.find((section) => section.includes(file.name)) || sections[index] || ""

    return {
      fileId: file.id,
      fileName: file.name,
      extractedContent: relevantSection.replace(file.name, "").trim(),
    }
  })
}

// 解析摘要结果
function parseSummaries(text: string, files: any[]) {
  // 简单实现：假设AI返回的是每个文件的摘要
  const sections = text.split("\n\n").filter((section) => section.trim())

  return files.map((file, index) => {
    const relevantSection = sections.find((section) => section.includes(file.name)) || sections[index] || ""

    return {
      fileId: file.id,
      fileName: file.name,
      summary: relevantSection.replace(file.name, "").trim(),
    }
  })
}

// 从文本中提取分类
function extractCategory(text: string): string {
  // 简单实现：尝试从文本中提取分类信息
  const categoryMatches =
    text.match(/分类[：:]\s*([^,，.。\n]+)/i) ||
    text.match(/类别[：:]\s*([^,，.。\n]+)/i) ||
    text.match(/归类为[：:]\s*([^,，.。\n]+)/i)

  return categoryMatches ? categoryMatches[1].trim() : ""
}

// 从文本中提取标签
function extractTags(text: string): string[] {
  // 简单实现：尝试从文本中提取标签信息
  const tagMatches = text.match(/标签[：:]\s*([^.。\n]+)/i) || text.match(/tags[：:]\s*([^.。\n]+)/i)

  if (!tagMatches) return []

  return tagMatches[1]
    .split(/[,，、]/)
    .map((tag) => tag.trim())
    .filter(Boolean)
}
