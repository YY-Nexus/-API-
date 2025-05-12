describe("导航功能测试", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("应该能够导航到仪表盘页面", () => {
    cy.navigateTo("/dashboard")
    cy.get("h1").should("contain", "控制面板")
  })

  it("应该能够导航到API文档页面", () => {
    cy.navigateTo("/api-docs")
    cy.get("h1").should("contain", "API文档")
  })

  it("应该能够导航到代码片段页面", () => {
    cy.navigateTo("/code-snippets")
    cy.get("h1").should("contain", "代码片段")
  })

  it("应该能够折叠和展开侧边栏", () => {
    // 检查侧边栏默认状态
    cy.get("[data-testid=side-navigation]").should("have.class", "w-[280px]")

    // 点击折叠按钮
    cy.get("[data-testid=collapse-sidebar]").click()
    cy.get("[data-testid=side-navigation]").should("have.class", "w-[70px]")

    // 再次点击展开
    cy.get("[data-testid=collapse-sidebar]").click()
    cy.get("[data-testid=side-navigation]").should("have.class", "w-[280px]")
  })

  it("应该能够通过搜索过滤导航项", () => {
    // 搜索"API"
    cy.get("[data-testid=nav-search]").type("API")

    // 验证过滤结果
    cy.get("[data-testid=nav-item]").should("have.length.greaterThan", 0)
    cy.get("[data-testid=nav-item]").each(($el) => {
      cy.wrap($el).should("contain", "API")
    })

    // 清除搜索
    cy.get("[data-testid=nav-search]").clear()
    cy.get("[data-testid=nav-item]").should("have.length.greaterThan", 5)
  })
})
