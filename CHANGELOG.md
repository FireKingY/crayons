# Change Log

## [0.3.0] - 2025-08-06
### ✨ Added
- **Regular Expression Support**: Manual input now supports regex patterns for advanced text matching
- **Interactive Mode Selection**: Added choice dialog between plain text and regex modes
- **Regex Examples**: Provided common regex patterns for emails, URLs, numbers, etc.
- **Smart Text Escaping**: Automatically escape special characters in plain text mode

### 🛡️ Improved
- **Error Handling**: Added regex syntax validation with user-friendly error messages
- **Fallback Mechanism**: Graceful fallback to plain text if regex fails
- **Enhanced Input Dialog**: Better prompts and placeholders with regex examples

### 🔧 Technical Improvements
- Added `regexMap` to track which patterns are regex vs plain text
- Enhanced `decorateWithColorIndex` method to handle both text types
- Improved pattern matching logic with proper character escaping
- Added regex validation before applying highlights

## [0.2.0] - 2025-08-06
### ✨ Added
- **Smart Text Highlighting**: Enhanced highlighting logic that prioritizes selected text over word detection
- **Manual Text Input**: New command `Crayons: Highlight Manual Input` allows users to manually input text strings to highlight
- **Keyboard Shortcut**: Added `Ctrl+Shift+F2` shortcut for manual text input functionality
- **Improved User Experience**: Better highlighting behavior with intelligent text selection

### 📖 Documentation
- **Comprehensive README**: Complete rewrite with detailed feature descriptions, usage instructions, and configuration options
- **Command Reference**: Added table of all available commands and their keybindings
- **Configuration Guide**: Detailed color customization instructions
- **Installation Instructions**: Multiple installation methods including GitHub releases

### 🔧 Technical Improvements
- Enhanced `getSelectedWord()` method to check for text selection first
- Added `highlightManual()` method for custom text input
- Updated package.json with new command configurations
- Version bump to 0.2.0

## [0.1.1] - Previous Release
### 🐛 Fixed
- Fixed issue where highlights disappeared when switching between tabs
- Improved highlight persistence across tab changes

### 🎨 Features
- Multiple color support with automatic cycling
- Basic text highlighting functionality
- Clear individual and all highlights commands
- Cross-file highlight management

## [0.1.0] - Initial Release
### 🎉 Initial Features
- Basic text highlighting with crayons
- Word detection and highlighting
- Multiple color themes for light/dark modes
- Command palette integration