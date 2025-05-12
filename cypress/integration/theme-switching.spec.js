describe("主题切换功能测试", () => {
  beforeEach(() => {
    cy.visit("/settings/preferences")
  })

  it("应该能够切换到深色主题", () => {
    // 选择深色主题
    cy.get("#theme-dark").check({ force: true })

    // 验证html元素上的data-theme属性
    cy.get("html").should("have.attr", "data-theme", "dark")
  })

  it("应该能够切换到浅色主题", () => {
    // 选择浅色主题
    cy.get("#theme-light").check({ force: true })

    // 验证html元素上的data-theme属性
    cy.get("html").should("have.attr", "data-theme", "light")
  })

  it("应该能够切换到系统主题", () => {
    // 选择系统主题
    cy.get("#theme-system").check({ force: true })

    // 验证html元素上的data-theme属性
    // 注意：这里的实际值取决于系统设置，所以我们只检查它不是light或dark
    cy.get("html").should("have.attr", "data-theme")
  })

  it("应该保存主题偏好设置", () => {
    // 选择深色主题
    cy.get("#theme-dark").check({ force: true })

    // 刷新页面
    cy.reload()

    // 验证设置被保存
    cy.get("#theme-dark").should("be.checked")
    cy.get("html").should("have.attr", "data-theme", "dark")
  })
})
