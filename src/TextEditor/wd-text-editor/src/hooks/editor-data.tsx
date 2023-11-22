import { IEventEmitter } from "../components/wysiwyg/interface";
import EventEmitter from "../rich-text-editor/handlers/event-emitter";

export interface EditorDataType {
    editorState: string;
    events: IEventEmitter;
    emitEvent: (action: EventAction, id: string, payload: any) => void;
    cursorOffset: number;
    cursorOffsetReduction: number;
    cursorLine: number;
}

export type EventAction = 'indent' | 'outdent' | 'insertHR' | 'copy' | 'cut' | 'paste' | 'update';

export class EditorData implements EditorDataType {

    constructor(editorState: string) {
        this.editorState = editorState;
        this.events = new EventEmitter();
        this.cursorOffset = 0;
        this.cursorLine = 0;
        this.cursorOffsetReduction = 0;
    }

    editorState: string;
    events: IEventEmitter;
    cursorOffset: number;
    cursorLine: number;
    cursorOffsetReduction: number;

    public emitEvent(action: EventAction, id: string, payload: any) {
        if (id === 'broadcast') {
            const selection = window.getSelection();
            if (selection) {
                const range = selection.getRangeAt(0);
                const container = range.startContainer;
                if (container instanceof Element)
                {
                    this.events.emit(action, container.id, null);
                } else if (container instanceof Text)
                {
                    const parent = container.parentElement as Element;
                    this.events.emit(action, parent.id, null);
                }
            }
        } else {
            this.events.emit(action, id, payload);
        }
    }
}

export default new EditorData('unselected');
