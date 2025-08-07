# Change Log

## [0.4.3] - 2025-01-27
### 🔧 Fixed Toggle Highlight Logic
- **Precise Toggle**: When cursor is in highlighted area, toggle now cancels that specific highlight
- **Smart Detection**: Uses cursor position to detect actual highlighted area, not just word matching
- **Improved Logic**: First checks if cursor is in highlight area, then decides to add/remove highlight

### 🎯 Correct Toggle Behavior Now
- **Cursor IN highlight area** → Toggle cancels the current highlight 
- **Cursor NOT in highlight area** → Toggle adds new highlight or removes existing word highlight
- **More precise and intuitive** toggle behavior based on actual cursor position

### 🔧 Technical Improvements  
- Use `getCurrentHighlightWord()` for precise highlight detection
- Better separation of highlight addition vs removal logic
- More accurate cursor-based highlight detection

## [0.4.2] - 2025-01-27
### 🔧 Critical Fix
- **Same Color Navigation**: Now correctly navigates only between highlights of the **same color/word**
- **Precise Color Matching**: Added `getCurrentHighlightWord()` to detect current highlight's word/color
- **Improved Logic**: `getHighlightRangesForWord()` gets ranges for specific words only

### 🎯 Correct Behavior Now
- When cursor is in a **blue** highlight, n/N navigates only between **blue** highlights
- When cursor is in a **red** highlight, n/N navigates only between **red** highlights  
- Different colored highlights are treated separately

## [0.4.1] - 2025-01-27
### 🔧 Fixed
- **Cursor-Based Navigation**: n/N keys now only work when cursor is **inside** a highlighted area
- **Smart Context Detection**: Automatically detects cursor position changes and updates context
- **Vim Compatibility**: When cursor is outside highlights, n/N keys work normally with vim search

### 🛡️ Improved
- **Real-time Context Updates**: Cursor position changes are monitored in real-time
- **Better Integration**: Seamless integration with other extensions and vim plugins
- **Precise Activation**: More precise control over when navigation keys are active

## [0.4.0] - 2025-01-27
### ✨ Added
- **Highlight Navigation**: Navigate between highlighted areas using `n` (next) and `Shift+N` (previous) keys
- **Smart Cursor Detection**: Intelligently detects when cursor is within a highlighted area
- **High-Priority Keybindings**: n/N keys override vim plugin search functionality when highlights exist
- **Context-Aware Activation**: Navigation keys only work when there are active highlights
- **Circular Navigation**: Seamlessly wrap around from last to first highlight and vice versa

### 🛡️ Improved
- **Enhanced Navigation Logic**: Smart positioning based on current cursor location
- **Visual Feedback**: Automatic centering of highlighted areas when navigating
- **Priority Override**: Configurable keybinding priority to work with other extensions

### 🔧 Technical Improvements
- Added `navigateToNext()` and `navigateToPrevious()` methods
- Implemented `getAllHighlightRanges()` for comprehensive highlight tracking
- Added context management with `crayons.hasHighlights` for conditional keybinding activation
- Enhanced command registration and package.json configuration

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