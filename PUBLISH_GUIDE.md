# VS Code 插件发布指南

您的插件已经成功打包为 `crayons-0.1.1.vsix` 文件！现在需要发布到 VS Code 市场。

## 第一步：创建 Azure DevOps 个人访问令牌

1. 访问 [Azure DevOps](https://dev.azure.com)
2. 登录您的 Microsoft 账户（如果没有账户请先注册）
3. 点击右上角的用户头像，选择 "Personal access tokens"
4. 点击 "New Token"
5. 配置令牌：
   - Name: 填写 "VS Code Extension Publishing"
   - Organization: 选择 "All accessible organizations"
   - Expiration: 建议选择 "Custom defined" 并设置较长时间（如1年）
   - Scopes: 选择 "Marketplace" -> "Acquire, manage"
6. 点击 "Create" 并复制生成的令牌（务必保存好，只会显示一次）

## 第二步：登录 vsce

使用以下命令登录（将 YOUR_PAT_TOKEN 替换为您的个人访问令牌）：

```bash
vsce login vallyscode
```

系统会提示输入个人访问令牌，输入您在第一步创建的令牌。

## 第三步：发布插件

登录成功后，使用以下命令发布：

```bash
vsce publish
```

或者如果您想要发布特定版本：

```bash
vsce publish --packagePath crayons-0.1.1.vsix
```

## 验证发布

发布成功后，您可以：

1. 访问 [VS Code Marketplace](https://marketplace.visualstudio.com/vscode)
2. 搜索 "crayons" 或您的发布者名称 "vallyscode"
3. 确认插件已经上线

## 注意事项

- 发布者名称必须与 package.json 中的 "publisher" 字段一致（当前为 "vallyscode"）
- 第一次发布可能需要几分钟时间同步到市场
- 更新插件时，记得修改 package.json 中的版本号

## 如果遇到问题

1. 确保已经编译了代码：`npm run compile`
2. 确认所有必要文件都包含在打包中：`vsce ls`
3. 检查 package.json 配置是否正确
4. 确认访问令牌权限正确

您的插件包已经准备就绪！按照上述步骤即可发布到 VS Code 市场。