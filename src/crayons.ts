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
  private nextColorIndex: number; // 下一个可用的颜色索引

  constructor(editor: TextEditor) {
    this.words = [];
    this.editor = editor;
    this.decorationTypes = fromConfig();
    this.wordColorMap = new Map();
    this.nextColorIndex = 0;
  }

  public highlight() {
    const word = this.getSelectedWord();
    if (this.words.indexOf(word) !== -1) {
      // Word is already highlighted, remove it
      this.removeHighlight(word);
    } else {
      // Word is not highlighted, add it
      this.decorate(word);
    }
  }

  public async highlightManual() {
    const inputText = await window.showInputBox({
      prompt: "输入要高亮的字符串",
      placeHolder: "请输入要高亮的文本..."
    });
    
    if (inputText && inputText.trim()) {
      const word = inputText.trim();
      if (this.words.indexOf(word) !== -1) {
        // Word is already highlighted, remove it
        this.removeHighlight(word);
      } else {
        // Word is not highlighted, add it
        this.decorate(word);
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
    this.nextColorIndex = 0;
    this.decorationTypes.forEach(decorationType =>
      this.editor.setDecorations(decorationType, []));
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
      }
    }
  }

  public updateEditor(editor: TextEditor) {
    this.editor = editor;
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
      this.nextColorIndex = (this.nextColorIndex + 1) % this.decorationTypes.length;
    }
    const colorIndex = this.wordColorMap.get(word)!;
    this.decorateWithColorIndex(word, colorIndex);
  }

  private decorateWithColorIndex(word: string, colorIndex: number) {
    const regex = RegExp(word, 'g');
    let decorations: DecorationOptions[] = [];
    let match;
    while ((match = regex.exec(this.editor.document.getText()))) {
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
