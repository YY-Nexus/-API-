import { format, formatDistanceToNow } from "date-fns"
import { zhCN } from "date-fns/locale"

/**
 * 格式化日期为中文格式
 * @param date 日期对象或时间戳
 * @param formatStr 格式化字符串
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: Date | number, formatStr = "yyyy年MM月dd日"): string {
  return format(date, formatStr, { locale: zhCN })
}

/**
 * 格式化日期和时间为中文格式
 * @param date 日期对象或时间戳
 * @param withSeconds 是否包含秒
 * @returns 格式化后的日期时间字符串
 */
export function formatDateTime(date: Date | number, withSeconds = true): string {
  const timeFormat = withSeconds ? "HH:mm:ss" : "HH:mm"
  return format(date, `yyyy年MM月dd日 ${timeFormat}`, { locale: zhCN })
}

/**
 * 格式化时间为中文格式
 * @param date 日期对象或时间戳
 * @param withSeconds 是否包含秒
 * @returns 格式化后的时间字符串
 */
export function formatTime(date: Date | number, withSeconds = true): string {
  return format(date, withSeconds ? "HH:mm:ss" : "HH:mm", { locale: zhCN })
}

/**
 * 获取相对时间（如：3分钟前）
 * @param date 日期对象或时间戳
 * @returns 相对时间字符串
 */
export function getRelativeTime(date: Date | number): string {
  return formatDistanceToNow(date, { locale: zhCN, addSuffix: true })
}

/**
 * 获取当前北京时间
 * @returns 当前北京时间的Date对象
 */
export function getCurrentBeijingTime(): Date {
  return new Date()
}

/**
 * 格式化为中文星期
 * @param date 日期对象或时间戳
 * @returns 星期几字符串
 */
export function formatWeekday(date: Date | number): string {
  const weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
  return weekdays[new Date(date).getDay()]
}
