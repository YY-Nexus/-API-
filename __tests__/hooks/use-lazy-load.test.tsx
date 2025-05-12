import { renderHook } from "@testing-library/react"
import { useLazyLoad } from "@/hooks/use-lazy-load"

// 模拟组件
const MockComponent = () => <div>Mock Component</div>

describe("useLazyLoad Hook", () => {
  it("should return loading state initially", () => {
    const importFn = jest.fn().mockResolvedValue({ default: MockComponent })
    const fallback = <div>Loading...</div>

    const { result } = renderHook(() => useLazyLoad(importFn, fallback))

    // 初始状态应该是加载中
    expect(result.current[0]).toBeNull()
    expect(result.current[1]).toBeTruthy()
    expect(result.current[2]).toBe(fallback)
  })

  it("should load component and update state", async () => {
    const importFn = jest.fn().mockResolvedValue({ default: MockComponent })

    const { result, waitForNextUpdate } = renderHook(() => useLazyLoad(importFn))

    // 等待组件加载完成
    await waitForNextUpdate()

    // 加载完成后，应该返回组件且不再处于加载状态
    expect(result.current[0]).toBe(MockComponent)
    expect(result.current[1]).toBeFalsy()
    expect(importFn).toHaveBeenCalledTimes(1)
  })

  it("should handle loading errors", async () => {
    const error = new Error("Failed to load")
    const importFn = jest.fn().mockRejectedValue(error)
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {})

    const { result, waitForNextUpdate } = renderHook(() => useLazyLoad(importFn))

    // 等待错误处理完成
    await waitForNextUpdate()

    // 发生错误时，组件应为null，且不再处于加载状态
    expect(result.current[0]).toBeNull()
    expect(result.current[1]).toBeFalsy()
    expect(consoleErrorSpy).toHaveBeenCalledWith("Failed to lazy load component:", error)

    consoleErrorSpy.mockRestore()
  })
})
