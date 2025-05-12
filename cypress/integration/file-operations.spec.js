describe("文件操作功能测试", () => {
  beforeEach(() => {
    cy.visit("/api-file-manager")
  })

  it("应该显示文件列表", () => {
    cy.get("[data-testid=file-item]").should("have.length.greaterThan", 0)
  })

  it("应该能够切换视图模式", () => {
    // 默认应该是列表视图
    cy.get("[data-testid=list-view]").should("have.class", "bg-muted")

    // 切换到网格视图
    cy.get("[data-testid=grid-view]").click()
    cy.get("[data-testid=grid-view]").should("have.class", "bg-muted")
    cy.get("[data-testid=file-grid]").should("exist")

    // 切换回列表视图
    cy.get("[data-testid=list-view]").click()
    cy.get("[data-testid=list-view]").should("have.class", "bg-muted")
    cy.get("[data-testid=file-list]").should("exist")
  })

  it("应该能够搜索文件", () => {
    // 获取第一个文件的名称
    cy.get("[data-testid=file-name]")
      .first()
      .invoke("text")
      .then((fileName) => {
        // 搜索该文件名的一部分
        const searchTerm = fileName.substring(0, 3)
        cy.get("[data-testid=file-search]").type(searchTerm)

        // 验证搜索结果
        cy.get("[data-testid=file-item]").should("have.length.greaterThan", 0)
        cy.get("[data-testid=file-name]").each(($el) => {
          cy.wrap($el).invoke("text").should("include", searchTerm)
        })
      })
  })

  it("应该能够选择和取消选择文件", () => {
    // 选择第一个文件
    cy.get("[data-testid=file-checkbox]").first().check()
    cy.get("[data-testid=selected-count]").should("contain", "1")

    // 选择第二个文件
    cy.get("[data-testid=file-checkbox]").eq(1).check()
    cy.get("[data-testid=selected-count]").should("contain", "2")

    // 取消选择第一个文件
    cy.get("[data-testid=file-checkbox]").first().uncheck()
    cy.get("[data-testid=selected-count]").should("contain", "1")

    // 取消选择所有文件
    cy.get("[data-testid=cancel-selection]").click()
    cy.get("[data-testid=selected-count]").should("not.exist")
  })

  it("应该能够预览文件", () => {
    // 点击第一个文件的预览按钮
    cy.get("[data-testid=preview-button]").first().click()

    // 验证预览对话框打开
    cy.get("[data-testid=file-preview-dialog]").should("be.visible")

    // 关闭预览
    cy.get("[data-testid=close-preview]").click()
    cy.get("[data-testid=file-preview-dialog]").should("not.exist")
  })
})
