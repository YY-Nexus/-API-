import { type NextRequest, NextResponse } from "next/server"
import sharp from "sharp"
import { mkdir, writeFile } from "fs/promises"
import path from "path"
import { v4 as uuidv4 } from "uuid"

// 文件操作类型
type OperationType = "rename" | "convert" | "tags" | "category" | "process-image" | "extract-text"

// 操作状态
type TaskStatus = "pending" | "processing" | "completed" | "failed"

// 任务接口
interface Task {
  id: string
  type: OperationType
  status: TaskStatus
  progress: number
  createdAt: Date
  startedAt?: Date
  completedAt?: Date
  params: Record<string, any>
  result?: {
    success: boolean
    message: string
    affectedFiles: number
    failedFiles: number
    details?: string
    outputFiles?: string[]
  }
  fileIds: string[]
}

// 模拟任务存储
const tasks: Task[] = []

// 文件存储路径
const UPLOAD_DIR = path.join(process.cwd(), "uploads")
const TEMP_DIR = path.join(process.cwd(), "temp")

// 确保目录存在
async function ensureDirectoryExists(dir: string) {
  try {
    await mkdir(dir, { recursive: true })
  } catch (error) {
    console.error(`创建目录失败: ${dir}`, error)
  }
}

// 生成唯一ID
function generateId(): string {
  return uuidv4()
}

// 创建新任务
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, params, fileIds } = body

    if (!type || !Array.isArray(fileIds) || fileIds.length === 0) {
      return NextResponse.json({ error: "无效请求。需要指定操作类型和文件ID。" }, { status: 400 })
    }

    // 创建新任务
    const task: Task = {
      id: generateId(),
      type,
      status: "pending",
      progress: 0,
      createdAt: new Date(),
      params,
      fileIds,
    }

    // 添加到任务列表
    tasks.push(task)

    // 异步处理任务
    processTask(task)

    return NextResponse.json({ taskId: task.id })
  } catch (error) {
    console.error("创建任务失败:", error)
    return NextResponse.json({ error: "创建任务失败" }, { status: 500 })
  }
}

// 获取任务状态
export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const taskId = url.searchParams.get("taskId")
  const all = url.searchParams.get("all")

  if (all === "true") {
    // 返回所有任务
    return NextResponse.json({ tasks })
  }

  if (!taskId) {
    return NextResponse.json({ error: "需要提供任务ID" }, { status: 400 })
  }

  // 查找任务
  const task = tasks.find((t) => t.id === taskId)
  if (!task) {
    return NextResponse.json({ error: "未找到任务" }, { status: 404 })
  }

  return NextResponse.json({ task })
}

// 处理任务
async function processTask(task: Task) {
  // 更新任务状态
  task.status = "processing"
  task.startedAt = new Date()

  try {
    // 确保目录存在
    await ensureDirectoryExists(UPLOAD_DIR)
    await ensureDirectoryExists(TEMP_DIR)

    // 根据任务类型处理
    switch (task.type) {
      case "convert":
        await handleConvertTask(task)
        break
      case "rename":
        await handleRenameTask(task)
        break
      case "process-image":
        await handleImageProcessingTask(task)
        break
      case "extract-text":
        await handleTextExtractionTask(task)
        break
      case "tags":
      case "category":
        await handleMetadataTask(task)
        break
      default:
        throw new Error(`不支持的任务类型: ${task.type}`)
    }

    // 完成任务
    completeTask(task, true, "任务成功完成", task.fileIds.length, 0)
  } catch (error) {
    console.error(`处理任务失败 ${task.id}:`, error)
    completeTask(
      task,
      false,
      `处理失败: ${error instanceof Error ? error.message : "未知错误"}`,
      0,
      task.fileIds.length,
    )
  }
}

// 处理文件转换任务
async function handleConvertTask(task: Task) {
  const { targetFormat, quality = 80 } = task.params
  const outputFiles: string[] = []

  for (let i = 0; i < task.fileIds.length; i++) {
    const fileId = task.fileIds[i]
    const filePath = path.join(UPLOAD_DIR, fileId)
    const fileName = path.basename(filePath)
    const outputFileName = `${path.parse(fileName).name}.${targetFormat}`
    const outputPath = path.join(TEMP_DIR, outputFileName)

    // 更新进度
    task.progress = Math.floor((i / task.fileIds.length) * 100)

    if (isImageFormat(targetFormat)) {
      // 图片转换
      await convertImage(filePath, outputPath, targetFormat, quality)
    } else if (targetFormat === "pdf") {
      // 转换为PDF (模拟)
      await simulateConversion(filePath, outputPath, 1000)
    } else {
      // 其他格式转换 (模拟)
      await simulateConversion(filePath, outputPath, 500)
    }

    outputFiles.push(outputPath)
  }

  task.result = {
    ...task.result,
    outputFiles,
  }
}

// 处理文件重命名任务
async function handleRenameTask(task: Task) {
  const { newName, prefix, suffix } = task.params
  const outputFiles: string[] = []

  for (let i = 0; i < task.fileIds.length; i++) {
    const fileId = task.fileIds[i]
    const filePath = path.join(UPLOAD_DIR, fileId)
    const fileName = path.basename(filePath)
    const fileExt = path.extname(fileName)
    const fileNameWithoutExt = path.basename(fileName, fileExt)

    // 更新进度
    task.progress = Math.floor((i / task.fileIds.length) * 100)

    let newFileName = fileName

    if (newName && task.fileIds.length === 1) {
      // 单文件重命名
      newFileName = `${newName}${fileExt}`
    } else if (prefix || suffix) {
      // 批量添加前缀/后缀
      const newNameWithoutExt = `${prefix || ""}${fileNameWithoutExt}${suffix || ""}`
      newFileName = `${newNameWithoutExt}${fileExt}`
    }

    const outputPath = path.join(TEMP_DIR, newFileName)

    // 复制文件 (模拟)
    await simulateConversion(filePath, outputPath, 200)

    outputFiles.push(outputPath)
  }

  task.result = {
    ...task.result,
    outputFiles,
  }
}

// 处理图片处理任务
async function handleImageProcessingTask(task: Task) {
  const { resize, crop, rotate, flip, blur, sharpen } = task.params
  const outputFiles: string[] = []

  for (let i = 0; i < task.fileIds.length; i++) {
    const fileId = task.fileIds[i]
    const filePath = path.join(UPLOAD_DIR, fileId)
    const fileName = path.basename(filePath)
    const outputFileName = `processed_${fileName}`
    const outputPath = path.join(TEMP_DIR, outputFileName)

    // 更新进度
    task.progress = Math.floor((i / task.fileIds.length) * 100)

    // 处理图片
    let sharpInstance = sharp(filePath)

    if (resize) {
      sharpInstance = sharpInstance.resize(resize.width, resize.height, {
        fit: resize.fit || "cover",
      })
    }

    if (crop) {
      sharpInstance = sharpInstance.extract({
        left: crop.left,
        top: crop.top,
        width: crop.width,
        height: crop.height,
      })
    }

    if (rotate) {
      sharpInstance = sharpInstance.rotate(rotate.angle, {
        background: rotate.background || { r: 255, g: 255, b: 255, alpha: 0 },
      })
    }

    if (flip) {
      if (flip.horizontal) sharpInstance = sharpInstance.flop()
      if (flip.vertical) sharpInstance = sharpInstance.flip()
    }

    if (blur) {
      sharpInstance = sharpInstance.blur(blur.sigma || 1)
    }

    if (sharpen) {
      sharpInstance = sharpInstance.sharpen(sharpen.sigma || 1)
    }

    // 保存处理后的图片
    await sharpInstance.toFile(outputPath)

    outputFiles.push(outputPath)
  }

  task.result = {
    ...task.result,
    outputFiles,
  }
}

// 处理文本提取任务 (模拟)
async function handleTextExtractionTask(task: Task) {
  const outputFiles: string[] = []

  for (let i = 0; i < task.fileIds.length; i++) {
    const fileId = task.fileIds[i]
    const filePath = path.join(UPLOAD_DIR, fileId)
    const fileName = path.basename(filePath)
    const outputFileName = `${path.parse(fileName).name}.txt`
    const outputPath = path.join(TEMP_DIR, outputFileName)

    // 更新进度
    task.progress = Math.floor((i / task.fileIds.length) * 100)

    // 模拟文本提取
    const extractedText = `这是从文件 ${fileName} 中提取的文本内容。\n这是一个模拟的文本提取结果。`
    await writeFile(outputPath, extractedText, "utf8")

    outputFiles.push(outputPath)
  }

  task.result = {
    ...task.result,
    outputFiles,
  }
}

// 处理元数据任务 (标签、分类)
async function handleMetadataTask(task: Task) {
  // 这里应该是更新数据库中的文件元数据
  // 由于是模拟，我们只更新任务状态
  await new Promise((resolve) => setTimeout(resolve, 500))

  task.progress = 100
}

// 完成任务
function completeTask(task: Task, success: boolean, message: string, affectedFiles: number, failedFiles: number) {
  task.status = success ? "completed" : "failed"
  task.completedAt = new Date()
  task.progress = 100

  task.result = {
    success,
    message,
    affectedFiles,
    failedFiles,
    ...(task.result || {}),
  }
}

// 模拟文件转换
async function simulateConversion(inputPath: string, outputPath: string, delay: number) {
  await new Promise((resolve) => setTimeout(resolve, delay))
  // 在实际应用中，这里应该是真实的文件操作
  // 为了模拟，我们只是等待一段时间
}

// 图片格式转换
async function convertImage(inputPath: string, outputPath: string, format: string, quality: number) {
  try {
    await sharp(inputPath)
      .toFormat(format as keyof sharp.FormatEnum, { quality })
      .toFile(outputPath)
  } catch (error) {
    console.error(`图片转换失败: ${inputPath} -> ${outputPath}`, error)
    throw error
  }
}

// 检查是否为图片格式
function isImageFormat(format: string): boolean {
  return ["jpeg", "jpg", "png", "webp", "gif", "avif", "tiff"].includes(format.toLowerCase())
}
