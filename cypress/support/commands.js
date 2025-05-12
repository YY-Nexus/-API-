// 自定义命令

// 登录命令
Cypress.Commands.add("login", (email, password) => {
  cy.visit("/login")
  cy.get("input[name=email]").type(email)
  cy.get("input[name=password]").type(password)
  cy.get("button[type=submit]").click()
  cy.url().should("include", "/dashboard")
})

// 导航到特定页面
Cypress.Commands.add("navigateTo", (path) => {
  cy.get(`a[href="${path}"]`).click()
  cy.url().should("include", path)
})

// 等待页面加载完成
Cypress.Commands.add("waitForPageLoad", () => {
  cy.get("[data-testid=page-loading]").should("not.exist")
})

// 切换主题
Cypress.Commands.add("toggleTheme", () => {
  cy.get("[data-testid=theme-toggle]").click()
})
