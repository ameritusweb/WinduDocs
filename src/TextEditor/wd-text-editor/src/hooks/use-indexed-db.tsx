import { useState } from 'react';
import { AstNode } from '../components/wysiwyg/interface';

const useIndexedDBAST = () => {
    const [ast, setAst] = useState(null);
    const [loading, setLoading] = useState(false);

    const openDB = () => {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('myDatabase', 1);
            request.onupgradeneeded = function(event) {
                const db = (event.target as IDBOpenDBRequest).result;
                if (!db.objectStoreNames.contains('astStore')) {
                    db.createObjectStore('astStore', { keyPath: 'id' });
                }
            };
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    };

    const storeAST = async (newAST: AstNode) => {
        const db = await openDB() as IDBDatabase;
        const transaction = db.transaction('astStore', 'readwrite');
        const store = transaction.objectStore('astStore');
        store.put({ id: 'uniqueASTId', ast: newAST });
    };

    const retrieveAST = async () => {
        setLoading(true);
        const db = await openDB() as IDBDatabase;
        const transaction = db.transaction('astStore', 'readonly');
        const store = transaction.objectStore('astStore');
        const request = store.get('uniqueASTId');

        request.onsuccess = () => {
            setAst(request.result?.ast);
            setLoading(false);
        };
    };

    return { ast, loading, storeAST, retrieveAST };
}
