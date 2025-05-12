"use client"

import { render, screen, fireEvent } from "@testing-library/react"
import { UserPreferencesProvider, useUserPreferences } from "@/contexts/user-preferences-context"

// 测试组件
const TestComponent = () => {
  const { preferences, updatePreference, resetPreferences } = useUserPreferences()

  return (
    <div>
      <div data-testid="theme">{preferences.theme}</div>
      <div data-testid="fontSize">{preferences.fontSize}</div>
      <button onClick={() => updatePreference("theme", "dark")}>Set Dark Theme</button>
      <button onClick={() => updatePreference("fontSize", "large")}>Set Large Font</button>
      <button onClick={resetPreferences}>Reset</button>
    </div>
  )
}

describe("UserPreferencesContext", () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  it("provides default preferences", () => {
    render(
      <UserPreferencesProvider>
        <TestComponent />
      </UserPreferencesProvider>,
    )

    expect(screen.getByTestId("theme")).toHaveTextContent("system")
    expect(screen.getByTestId("fontSize")).toHaveTextContent("medium")
  })

  it("updates preferences when updatePreference is called", () => {
    render(
      <UserPreferencesProvider>
        <TestComponent />
      </UserPreferencesProvider>,
    )

    fireEvent.click(screen.getByText("Set Dark Theme"))
    expect(screen.getByTestId("theme")).toHaveTextContent("dark")

    fireEvent.click(screen.getByText("Set Large Font"))
    expect(screen.getByTestId("fontSize")).toHaveTextContent("large")
  })

  it("resets preferences to defaults when resetPreferences is called", () => {
    render(
      <UserPreferencesProvider>
        <TestComponent />
      </UserPreferencesProvider>,
    )

    // 先更改设置
    fireEvent.click(screen.getByText("Set Dark Theme"))
    fireEvent.click(screen.getByText("Set Large Font"))

    // 然后重置
    fireEvent.click(screen.getByText("Reset"))

    // 验证重置后的值
    expect(screen.getByTestId("theme")).toHaveTextContent("system")
    expect(screen.getByTestId("fontSize")).toHaveTextContent("medium")
  })

  it("saves preferences to localStorage", () => {
    const setItemSpy = jest.spyOn(localStorage, "setItem")
    render(
      <UserPreferencesProvider>
        <TestComponent />
      </UserPreferencesProvider>,
    )

    fireEvent.click(screen.getByText("Set Dark Theme"))

    expect(setItemSpy).toHaveBeenCalledWith("userPreferences", expect.stringContaining('"theme":"dark"'))
    setItemSpy.mockRestore()
  })

  it("loads preferences from localStorage", () => {
    // 模拟localStorage中已有的设置
    const getItemSpy = jest.spyOn(localStorage, "getItem")
    getItemSpy.mockReturnValueOnce(
      JSON.stringify({
        theme: "dark",
        fontSize: "large",
        language: "zh-CN",
        sidebarCollapsed: true,
        animations: false,
      }),
    )

    render(
      <UserPreferencesProvider>
        <TestComponent />
      </UserPreferencesProvider>,
    )

    expect(screen.getByTestId("theme")).toHaveTextContent("dark")
    expect(screen.getByTestId("fontSize")).toHaveTextContent("large")
    getItemSpy.mockRestore()
  })
})
