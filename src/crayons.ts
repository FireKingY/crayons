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

  constructor(editor: TextEditor) {
    this.words = [];
    this.editor = editor;
    this.decorationTypes = fromConfig();
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

  public refresh() {
    // Clear all decorations first
    this.decorationTypes.forEach(decorationType =>
      this.editor.setDecorations(decorationType, []));
    
    // Re-apply all highlights
    this.words.forEach((word, index) => this.decorateWithIndex(word, index));
  }

  public clear() {
    this.words = [];
    this.decorationTypes.forEach(decorationType =>
      this.editor.setDecorations(decorationType, []));
  }

  public removeHighlight(word: string) {
    const idx = this.words.indexOf(word);
    if (idx !== -1) {
      this.words.splice(idx, 1);
      // Re-apply all remaining highlights to maintain color consistency
      this.refresh();
    }
  }

  public updateEditor(editor: TextEditor) {
    this.editor = editor;
  }

  private getSelectedWord(): string {
    const range = this.editor.document.getWordRangeAtPosition(this.editor.selection.start);
    if (range) {
      return this.editor.document.getText(range);
    }
    return "";
  }

  private decorate(word: string) {
    if (this.words.indexOf(word) === -1) {
      this.words.push(word);
    }
    const idx = this.words.indexOf(word);
    this.decorateWithIndex(word, idx);
  }

  private decorateWithIndex(word: string, wordIndex: number) {
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

    let decorationIdx = wordIndex;
    if (decorationIdx >= this.decorationTypes.length) {
      decorationIdx %= this.decorationTypes.length;
    }

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
