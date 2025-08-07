# 📦 Release v0.4.3 手动发布指南

## 🎯 Release信息

- **版本**: v0.4.3
- **标题**: Release v0.4.3: Improved Toggle Highlight Logic
- **VSIX文件**: `crayons-0.4.3.vsix` (191.19 KB)
- **Git Tag**: v0.4.3 (已推送到GitHub)

## 📝 Release Notes (复制到GitHub)

```markdown
## 🔧 修复高亮切换逻辑 / Fixed Toggle Highlight Logic

### ✅ 现在的正确行为 / Correct Behavior Now

#### 场景1: 光标在高亮区域内
当光标位于已高亮的区域时，按下 toggle highlight 会取消该特定高亮的所有实例。

#### 场景2: 光标不在高亮区域内  
当光标不在任何高亮区域时，按下 toggle highlight 会为当前词汇添加新高亮（或取消现有的同词汇高亮）。

### 🎯 核心改进 / Core Improvements

1. **精确光标检测** - 使用 `getCurrentHighlightWord()` 检测光标是否真的在高亮区域内
2. **智能切换逻辑** - 优先检查光标位置，然后决定添加或取消高亮
3. **更直观的用户体验** - 基于实际光标位置的精确行为

### ❌ 修复的问题 / Fixed Issues
- 之前只基于词汇匹配，可能错误地取消不相关位置的高亮
- 现在基于精确的光标位置检测，行为更加可预测

## 📋 完整功能列表 / Complete Features

✅ **导航功能**: 在相同颜色高亮间使用 n/N 导航  
✅ **光标检测**: 只有光标在高亮区域内时 n/N 才生效  
✅ **Vim兼容**: 光标在高亮区域外时 n/N 保持原生功能  
✅ **精确切换**: 基于光标位置的准确高亮切换逻辑

## 📦 安装方法 / Installation

下载 `.vsix` 文件并在 VS Code 中安装：

```bash
code --install-extension crayons-0.4.3.vsix
```

或者在 VS Code 中：
1. 打开扩展面板 (Ctrl+Shift+X)
2. 点击 "..." 菜单
3. 选择 "Install from VSIX..."
4. 选择下载的 `crayons-0.4.3.vsix` 文件
```

## 🚀 手动发布步骤

### 1. 访问GitHub Release页面
访问：https://github.com/FireKingY/crayons/releases

### 2. 创建新Release
1. 点击 "Create a new release"
2. 选择tag: `v0.4.3`
3. Release title: `Release v0.4.3: Improved Toggle Highlight Logic`
4. 在描述框中粘贴上面的Release Notes

### 3. 上传VSIX文件
1. 在 "Attach binaries" 区域拖入或选择 `crayons-0.4.3.vsix` 文件
2. 确认文件上传成功

### 4. 发布
1. 确认所有信息正确
2. 点击 "Publish release"

## ✅ 发布完成后验证

- [ ] Release页面显示v0.4.3
- [ ] VSIX文件可以正常下载
- [ ] Release notes显示正确
- [ ] 可以通过release页面安装扩展