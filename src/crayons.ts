import {
  window,
  workspace,
  Range,
  TextEditor,
  TextEditorDecorationType,
  OverviewRulerLane,
  DecorationOptions,
} from "vscode";

export class Crayons {
  private words: string[];
  private editor: TextEditor;
  private decorationTypes: TextEditorDecorationType[];
  private wordColorMap: Map<string, number>; // 存储每个词对应的颜色索引
  private regexMap: Map<string, boolean>; // 存储每个词是否为正则表达式
  private nextColorIndex: number; // 下一个可用的颜色索引
  private autoRefreshTimer: NodeJS.Timeout | null = null; // 自动刷新定时器
  private autoRefreshInterval: number; // 自动刷新间隔(毫秒)

  constructor(editor: TextEditor) {
    this.words = [];
    this.editor = editor;
    this.decorationTypes = fromConfig();
    this.wordColorMap = new Map();
    this.regexMap = new Map();
    this.nextColorIndex = 0;
    this.autoRefreshInterval = this.getAutoRefreshInterval();
    this.startAutoRefresh();
  }

  public highlight() {
    const word = this.getSelectedWord();
    
    // 如果当前未选中文本，且当前光标所在的位置已经高亮，则将这个高亮取消
    if (this.editor.selection.isEmpty && this.words.indexOf(word) !== -1) {
      // 光标在已高亮的词上，取消高亮
      this.removeHighlight(word);
    } else if (this.words.indexOf(word) !== -1) {
      // 选中的文本已经高亮，取消高亮
      this.removeHighlight(word);
    } else {
      // 词未高亮，添加高亮
      this.decorate(word);
    }
  }

  public async highlightManual() {
    const inputText = await window.showInputBox({
      prompt: "输入要高亮的字符串 (支持正则表达式)",
      placeHolder: "请输入要高亮的文本，如：hello 或正则表达式如：\\b\\w+@\\w+\\.\\w+\\b"
    });
    
    if (inputText && inputText.trim()) {
      const word = inputText.trim();
      
      // 询问是否使用正则表达式
      const useRegex = await window.showQuickPick(
        [
          { label: "普通文本", description: "按字面意思匹配文本", value: false },
          { label: "正则表达式", description: "使用正则表达式模式匹配", value: true }
        ],
        {
          placeHolder: "选择匹配模式",
          title: "文本匹配模式"
        }
      );
      
      if (useRegex) {
        const isRegex = useRegex.value;
        
        // 如果是正则表达式，验证语法
        if (isRegex) {
          try {
            new RegExp(word);
          } catch (error) {
            window.showErrorMessage(`正则表达式语法错误: ${error}`);
            return;
          }
        }
        
        if (this.words.indexOf(word) !== -1) {
          // Word is already highlighted, remove it
          this.removeHighlight(word);
        } else {
          // Word is not highlighted, add it
          this.decorateWithRegex(word, isRegex);
        }
      }
    }
  }

  public refresh() {
    // Clear all decorations first
    this.decorationTypes.forEach(decorationType =>
      this.editor.setDecorations(decorationType, []));
    
    // Re-apply all highlights using their fixed color indices
    this.words.forEach(word => {
      const colorIndex = this.wordColorMap.get(word);
      if (colorIndex !== undefined) {
        this.decorateWithColorIndex(word, colorIndex);
      }
    });
  }

  public clear() {
    this.words = [];
    this.wordColorMap.clear();
    this.regexMap.clear();
    this.nextColorIndex = 0;
    this.decorationTypes.forEach(decorationType =>
      this.editor.setDecorations(decorationType, []));
  }

  // 获取自动刷新间隔配置
  private getAutoRefreshInterval(): number {
    const config = workspace.getConfiguration();
    return config.get<number>('crayons.configuration.autoRefreshInterval') || 1000;
  }

  // 启动自动刷新
  private startAutoRefresh() {
    this.stopAutoRefresh(); // 先停止现有的定时器
    
    if (this.autoRefreshInterval > 0) {
      this.autoRefreshTimer = setInterval(() => {
        // 只有当有高亮内容时才刷新
        if (this.words.length > 0) {
          this.refresh();
        }
      }, this.autoRefreshInterval);
    }
  }

  // 停止自动刷新
  private stopAutoRefresh() {
    if (this.autoRefreshTimer) {
      clearInterval(this.autoRefreshTimer);
      this.autoRefreshTimer = null;
    }
  }

  // 更新自动刷新间隔
  public updateAutoRefreshInterval() {
    const newInterval = this.getAutoRefreshInterval();
    if (newInterval !== this.autoRefreshInterval) {
      this.autoRefreshInterval = newInterval;
      this.startAutoRefresh(); // 重新启动定时器
    }
  }

  // 销毁时清理资源
  public dispose() {
    this.stopAutoRefresh();
  }

  public removeHighlight(word: string) {
    const idx = this.words.indexOf(word);
    if (idx !== -1) {
      this.words.splice(idx, 1);
      // 获取该词的颜色索引并清除其装饰
      const colorIndex = this.wordColorMap.get(word);
      if (colorIndex !== undefined) {
        this.editor.setDecorations(this.decorationTypes[colorIndex % this.decorationTypes.length], []);
        this.wordColorMap.delete(word);
        this.regexMap.delete(word);
      }
    }
  }

  public updateEditor(editor: TextEditor) {
    this.editor = editor;
    // 重新启动自动刷新以适应新的编辑器
    this.startAutoRefresh();
  }

  private getSelectedWord(): string {
    // 如果有选中的文本，返回选中的文本
    if (!this.editor.selection.isEmpty) {
      return this.editor.document.getText(this.editor.selection);
    }
    
    // 否则返回光标位置的单词
    const range = this.editor.document.getWordRangeAtPosition(this.editor.selection.start);
    if (range) {
      return this.editor.document.getText(range);
    }
    return "";
  }

  private decorate(word: string) {
    if (this.words.indexOf(word) === -1) {
      this.words.push(word);
      // 为新词分配固定的颜色索引
      this.wordColorMap.set(word, this.nextColorIndex);
      this.regexMap.set(word, false); // 默认不是正则表达式
      this.nextColorIndex = (this.nextColorIndex + 1) % this.decorationTypes.length;
    }
    const colorIndex = this.wordColorMap.get(word)!;
    this.decorateWithColorIndex(word, colorIndex);
  }

  private decorateWithRegex(word: string, isRegex: boolean) {
    if (this.words.indexOf(word) === -1) {
      this.words.push(word);
      // 为新词分配固定的颜色索引
      this.wordColorMap.set(word, this.nextColorIndex);
      this.regexMap.set(word, isRegex);
      this.nextColorIndex = (this.nextColorIndex + 1) % this.decorationTypes.length;
    }
    const colorIndex = this.wordColorMap.get(word)!;
    this.decorateWithColorIndex(word, colorIndex);
  }

  private decorateWithColorIndex(word: string, colorIndex: number) {
    const isRegex = this.regexMap.get(word) || false;
    let regex: RegExp;
    
    try {
      if (isRegex) {
        // 如果是正则表达式，直接使用
        regex = new RegExp(word, 'g');
      } else {
        // 如果是普通文本，转义特殊字符
        const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        regex = new RegExp(escapedWord, 'g');
      }
    } catch (error) {
      // 如果正则表达式有错误，fallback到普通文本匹配
      const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      regex = new RegExp(escapedWord, 'g');
    }
    
    let decorations: DecorationOptions[] = [];
    let match;
    const text = this.editor.document.getText();
    
    while ((match = regex.exec(text))) {
      const decoration = {
        range: new Range(
          this.editor.document.positionAt(match.index),
          this.editor.document.positionAt(match.index + match[0].length)
        ),
      };
      decorations.push(decoration);
    }

    const decorationIdx = colorIndex % this.decorationTypes.length;
    this.editor.setDecorations(this.decorationTypes[decorationIdx], decorations);
  }

}

let documentCrayons = new Map<string, Crayons>();

function createIfAbsent<A, B>(key: A, map: Map<A, B>, def: () => B): B {
  let value = map.get(key);
  if (!value) {
    value = def();
    map.set(key, value);
  }
  return value;
}

export function getCrayons(editor: TextEditor): Crayons {
  const documentUri = editor.document.uri.toString();
  let crayons = documentCrayons.get(documentUri);
  if (!crayons) {
    crayons = new Crayons(editor);
    documentCrayons.set(documentUri, crayons);
  } else {
    // 更新编辑器引用，因为切换标签页时会创建新的TextEditor实例
    crayons.updateEditor(editor);
  }
  return crayons;
}

export function getAllCrayonsInstances(): Crayons[] {
  return Array.from(documentCrayons.values());
}

export function disposeCrayons(documentUri: string) {
  const crayons = documentCrayons.get(documentUri);
  if (crayons) {
    crayons.dispose();
    documentCrayons.delete(documentUri);
  }
}

function fromConfig(): TextEditorDecorationType[] {
  const config = workspace.getConfiguration();
  const colors = config.get<Color[]>('crayons.configuration.colors');
  return colors?.map(color => toDecorationType(color)) || [];
}

function toDecorationType(color: Color): TextEditorDecorationType {
  return window.createTextEditorDecorationType({
    overviewRulerLane: OverviewRulerLane.Right,
    overviewRulerColor: `${color.light.bg}`,
    light: {
      color: `${color.light.fg}`,
      backgroundColor: `${color.light.bg}`,
      fontStyle: "bold",
      border: `1px solid ${color.light.bg}`,
      borderRadius: "4px",
    },
    dark: {
      color: `${color.dark.fg}`,
      backgroundColor: `${color.dark.bg}`,
      fontStyle: "bold",
      border: `1px solid ${color.dark.bg}`,
      borderRadius: "4px",
    }
  });
}

interface Color {
  light: {
    bg: string,
    fg: string,
  };
  dark: {
    bg: string,
    fg: string
  };
}
