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

export type EventAction = 'Indent' | 'Iutdent' | 'Copy' | 'Cut' | 'Paste' | 'update' | 'InsertHR' | 'InsertQuote' | 'InsertTable' | 'InsertNumbered' | 'InsertBulleted' | 'InsertFenced' | 'InsertWarningAlert' | 'InsertSuccessAlert' | 'InsertErrorAlert' | 'InsertInfoAlert';

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
                console.log('broadcast');
                if (container instanceof Element)
                {
                    console.log(container.id);
                    this.events.emit(action, container.id, payload || null);
                } else if (container instanceof Text)
                {
                    const parent = container.parentElement as Element;
                    console.log(parent.id);
                    this.events.emit(action, parent.id, payload || null);
                }
            }
        } else {
            this.events.emit(action, id, payload);
        }
    }
}

export default new EditorData('unselected');
