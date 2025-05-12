// 导入命令
import "./commands"

// 忽略未捕获的异常
Cypress.on("uncaught:exception", (err, runnable) => {
  // 返回false阻止Cypress失败
  return false
})
