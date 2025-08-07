<div align="center">

# Crayons

Highlight text with crayons - A powerful VS Code extension for text highlighting

![Extension preview](screenshots/preview.png)

</div>

---

**🌐 Language / 语言**

**English** | [**中文**](README.md)

---

## Features

### 🎨 Smart Text Highlighting
- **Selected Text Priority**: If you have text selected, it will highlight the selection
- **Word Detection**: If no text is selected, it highlights the word at cursor position
- **Multiple Colors**: Automatically cycles through different colors for different highlighted terms
- **Persistent Highlights**: Highlights are preserved when switching between files

### ⌨️ Manual Text Input
- **Custom Highlighting**: Manually input any text string to highlight
- **Regular Expression Support**: Use regex patterns for advanced text matching
- **Flexible Search**: Highlight terms that may not be easily selectable
- **Toggle Highlighting**: Re-highlighting the same term removes the highlight

### 🔄 Highlight Navigation
- **Same Color Navigation**: Use `n` key to jump to next highlight of the same color
- **Reverse Navigation**: Use `Shift+N` key to jump to previous highlight of the same color
- **Smart Activation**: Navigation keys only work when cursor is inside highlighted areas
- **Vim Compatible**: When cursor is outside highlights, n/N keys retain native functionality

### 🔧 Smart Toggle Logic
- **Precise Cursor Detection**: When cursor is in highlighted area, toggle cancels that specific highlight
- **Smart Addition**: When cursor is not in highlighted area, adds highlight for current word
- **Intuitive Operation**: Precise behavior based on actual cursor position

### 📋 Management Commands
- **Clear Individual**: Remove specific highlights
- **Clear All**: Remove all highlights from current file
- **Cross-file Support**: Each file maintains its own highlight state

## Commands

| Command | Description | Default Keybinding |
|---------|-------------|-------------------|
| `Crayons: Highlight` | Highlight selected text or word at cursor | `; k` |
| `Crayons: Highlight Manual Input` | Open input box to manually enter text to highlight | `Ctrl+Shift+F2` |
| `Crayons: Clear` | Clear highlights for current selection/word | `Ctrl+Shift+F1` |
| `Crayons: Clear All Highlights` | Clear all highlights in current file | - |
| `Crayons: Navigate to Next Highlight` | Jump to next highlight of same color | `n` (when cursor in highlight) |
| `Crayons: Navigate to Previous Highlight` | Jump to previous highlight of same color | `Shift+N` (when cursor in highlight) |

## Usage

### Quick Highlighting
1. **Select text** and press `; k` to highlight the selection
2. **Place cursor** on a word and press `; k` to highlight that word
3. Press the same shortcut on highlighted text to **remove the highlight**

### Highlight Navigation
1. **Place cursor inside any highlighted area**
2. Press `n` to jump to the **next highlight of the same color**
3. Press `Shift+N` to jump to the **previous highlight of the same color**  
4. **When cursor is outside highlights**, n/N keys retain native functionality (like vim search)

#### 📍 Navigation Example
```javascript
function calculate() {     // "calculate" blue highlight
  let result = 0;         // "result" red highlight
  calculate(result);      // "calculate" blue, "result" red
  return result;          // "result" red highlight
}
```

**Navigation behavior**:
- Cursor on blue "calculate" + press `n` → Jump to next blue "calculate"
- Cursor on red "result" + press `n` → Jump to next red "result"
- Cursor outside highlights + press `n` → Use native functionality (vim search)

### Manual Input Highlighting
1. Press `Ctrl+Shift+F2` to open the input dialog
2. Type the text you want to highlight (supports both plain text and regex)
3. Choose between "普通文本" (plain text) or "正则表达式" (regular expression) mode
4. Press Enter to apply the highlight

#### Regular Expression Examples
- **Email addresses**: `\b\w+@\w+\.\w+\b`
- **URLs**: `https?://[^\s]+`
- **Numbers**: `\b\d+\b`
- **Words starting with capital**: `\b[A-Z]\w*\b`
- **Function calls**: `\w+\s*\(`

### Managing Highlights
- Use `Ctrl+Shift+F1` to clear highlights for the current selection/word
- Use the Command Palette (`Ctrl+Shift+P`) and search for "Crayons: Clear All Highlights" to remove all highlights

## Configuration

### Color Customization

You can customize the highlighting colors in your VS Code settings:

```json
{
  "crayons.configuration.colors": [
    {
      "light": {
        "bg": "#5184a8",
        "fg": "#b7ccdc"
      },
      "dark": {
        "bg": "#c7d8e4", 
        "fg": "#ffffff"
      }
    },
    {
      "light": {
        "bg": "#6168b2",
        "fg": "#c7cae4"
      },
      "dark": {
        "bg": "#c7cae4",
        "fg": "#ffffff"
      }
    },
    {
      "light": {
        "bg": "#68b261",
        "fg": "#cae4c7"
      },
      "dark": {
        "bg": "#cae4c7",
        "fg": "#ffffff"
      }
    },
    {
      "light": {
        "bg": "#61b2ab",
        "fg": "#c7e4e1"
      },
      "dark": {
        "bg": "#61b2ab",
        "fg": "#c7e4e1"
      }
    }
  ]
}
```

### Color Properties
- `bg`: Background color for the highlight
- `fg`: Foreground (text) color
- `light`: Colors used in light theme
- `dark`: Colors used in dark theme

The extension automatically cycles through the defined colors when highlighting different terms.

## Installation

### From VS Code Marketplace
1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X`)
3. Search for "crayons"
4. Click Install

### From GitHub Release
1. Download the latest `.vsix` file from [GitHub Releases](https://github.com/FireKingY/crayons/releases)
2. Open VS Code
3. Press `Ctrl+Shift+P` and run "Extensions: Install from VSIX..."
4. Select the downloaded `.vsix` file

## Release Notes

### v0.4.3 - Latest Version
- 🔧 **Fixed Toggle Highlight Logic**: Precise highlight toggling based on cursor position
- ✨ **Smart Cursor Detection**: Accurate cursor position detection for highlight areas
- 🎯 **Improved UX**: More intuitive and predictable toggle behavior

### v0.4.2
- 🔧 **Same Color Navigation**: n/N now navigate only between highlights of the same color
- ✨ **Precise Color Matching**: Added precise color detection and word-specific navigation
- 🎯 **Independent Color Groups**: Different colored highlights form independent navigation cycles

### v0.4.1  
- 🔧 **Cursor Position Detection**: n/N keys only work when cursor is inside highlighted areas
- ✨ **Vim Compatibility**: n/N keys retain native functionality when cursor is outside highlights
- 🛡️ **Real-time Detection**: Automatic cursor position monitoring with real-time context updates

### v0.4.0
- ✨ **Highlight Navigation**: Navigate between highlighted areas using n (next) and Shift+N (previous) keys
- 🎯 **Smart Cursor Detection**: Intelligently detects cursor position within highlighted areas
- ⚡ **High-Priority Keybindings**: n/N keys override vim plugin search when highlights exist
- 🔄 **Circular Navigation**: Seamless navigation between highlights with automatic centering

### v0.3.0
- ✨ **Regular Expression Support**: Added regex pattern matching in manual input mode
- ✨ **Smart Input Dialog**: Interactive choice between plain text and regex modes
- 🛡️ **Error Handling**: Regex syntax validation with helpful error messages
- 🔧 **Enhanced Matching**: Improved text matching logic with proper escaping

## Contributing

Issues and pull requests are welcome! Please visit our [GitHub repository](https://github.com/FireKingY/crayons).

## License

See [LICENSE](LICENSE)

---

**Enjoy highlighting! 🎨**

