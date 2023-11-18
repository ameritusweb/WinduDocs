import { IEventEmitter } from "../../components/wysiwyg/interface";
import { generateKey } from "../node-operations";

class EventEmitter implements IEventEmitter {
    private subscribers: { [guid: string]: { [event: string]: EventListener } };

    constructor() {
        this.subscribers = {}; // Stores subscribers indexed by their GUID
    }

    subscribe(guid: string, event: string, listener: EventListener): string {
        if (!this.subscribers[guid]) {
            this.subscribers[guid] = {};
        }
        this.subscribers[guid][event] = listener;
        return guid;
    }

    unsubscribe(guid: string): void {
        delete this.subscribers[guid];
    }

    emit(event: string, guid: string, payload: any): void {
        if (this.subscribers[guid] && this.subscribers[guid][event]) {
            this.subscribers[guid][event](payload);
        }
    }
}

export default EventEmitter;