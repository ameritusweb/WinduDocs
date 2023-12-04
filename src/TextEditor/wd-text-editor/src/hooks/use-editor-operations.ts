import { RefObject } from "react";
import { useStack } from "./use-stack";

export type SelectorType = 'ancestor' | 'immediate' | 'descendant';

export const useEditorOperations = (contentEditableRef: RefObject<HTMLDivElement>) => {

    const {
        captureState
      } = useStack(contentEditableRef);

    const determineState = (): string =>
    {
        const selection = window.getSelection();
        if (selection)
        {
        const range = selection.getRangeAt(0);
        const container = range.startContainer;
        let element: Node | null = container;
        if (container.nodeName === '#text')
        {
            element = element.parentElement;
        }
        else if (container === contentEditableRef.current)
        {
            element = contentEditableRef.current.firstElementChild;
        }

        if (element) {
            if (element.nodeName === 'P' || element.nodeName === 'DIV')
            {
                return 'p';
            }
            else if (element.nodeName === 'STRONG')
            {
                return 'strong';
            }
            else if (element.nodeName === 'EM')
            {
                return 'em';
            }
            else if (element.nodeName === 'H1')
            {
                return 'h1';
            }
            else if (element.nodeName === 'H2')
            {
                return 'h2';
            }
            else if (element.nodeName === 'H3')
            {
                return 'h3';
            }
            else if (element.nodeName === 'H4')
            {
                return 'h4';
            }
            else if (element.nodeName === 'H5')
            {
                return 'h5';
            }
            else if (element.nodeName === 'H6')
            {
                return 'h6';
            }
            else if (element.nodeName === 'CODE')
            {
                return '#text';
            }
        }
        
        }

        return '';
    }

    const focusOnNode = (editor: HTMLDivElement, node: Node, key: string, offset?: number) => {
        const range = new Range();
            if (offset)
            {
                range.setStart(node, offset + 1);
                range.setEnd(node, offset + 1);
            }
            else
            {
                    range.setStartAfter(node);
                    range.setEndAfter(node);
            }

            const selection = window.getSelection();
            selection?.removeAllRanges();
            selection?.addRange(range);

            captureState(node, key);

            editor.focus();
    }

    const findAncestors = (referenceNode: Node | Text, selector: string, maxHops?: number): (Node | Text)[] => {

        const ancestors: (Node | Text)[] = [];
        let current = referenceNode.parentNode;
        let hops = 0;
        while (current && current !== contentEditableRef.current && (maxHops === undefined || hops <= maxHops)) {
            if (current instanceof HTMLElement && current.matches(selector)) {
                ancestors.push(current);
            }

            current = current.parentNode;
            hops++;
        }

        return ancestors;
    }

    const findImmediateChildren = (referenceNode: Node | Text, parentSelector: string, childSelector: string, maxHops?: number): (Node | Text)[] => {

        return findAncestors(referenceNode, parentSelector, maxHops).filter(parent =>
            Array.from(parent.childNodes).some(child =>
                (child as Element).matches(childSelector)
            )
        );

    }

    const findDescendants = (referenceNode:Node, parentSelector: string, childSelector: string, maxHops?: number): (Node | Text)[] => {

        return findAncestors(referenceNode, parentSelector, maxHops).filter(parent =>
            (parent as Element).querySelector(childSelector) !== null
        );

    }

    const cedAncestorSelector = (referenceNode: Node | Text, selector: string, maxHops?: number): (Node | Text)[] => {

        const selectors = selector.split(',').map(s => s.trim());
        const uniqueResults = new Set<Node | Text>();

        selectors.forEach(sel => {
            const parts = sel.split(/ > /).filter(s => s);
            let results: (Node | Text)[] = [];

            if (parts.length === 1) {
                results = findAncestors(referenceNode, parts[0], maxHops);
            } else {
                const [parentSelector, childSelector] = parts;
                const selectorType: SelectorType = sel.includes('>') ? 'immediate' : 'descendant';

                switch (selectorType) {
                    case 'immediate':
                        results = findImmediateChildren(referenceNode, parentSelector, childSelector, maxHops);
                        break;
                    case 'descendant':
                        results = findDescendants(referenceNode, parentSelector, childSelector, maxHops);
                        break;
                }
            }

            results.forEach(result => uniqueResults.add(result));

        });

        return Array.from(uniqueResults);

    }

    const splitAndInsertNode = (textNode: Text, h1Node: Node, splitIndex: number) => {
        
        if (textNode.nodeType !== Node.TEXT_NODE) {
            return;
        }

        
        const textContent = textNode.textContent;
        if (!textContent)
        {
        return;
        }
        const beforeText = textContent.substring(0, splitIndex);
        const afterText = textContent.substring(splitIndex);

        
        const parentNode = textNode.parentNode;
        if (!parentNode) {
            return;
        }

        
        const fragment = document.createDocumentFragment();

        
        if (beforeText) {
            fragment.appendChild(document.createTextNode(beforeText));
        }

        fragment.appendChild(h1Node);

        if (afterText) {
            fragment.appendChild(document.createTextNode(afterText));
        }

        
        parentNode.replaceChild(fragment, textNode);
    }

    const validateParent = (state: string, parentState: string) => {
    if (state === 'h1') {
        if (parentState === 'p')
        {
        return false;
        }
    }
    else if (state === 'strong')
    {
        if (parentState === 'em')
        {
        return false;
        }
    }
    else if (state === 'em')
    {
        if (parentState === 'strong')
        {
        return false;
        }
    }
    return true;
    }

    return {
        determineState,
        focusOnNode,
        cedAncestorSelector,
        splitAndInsertNode,
        validateParent
      };
}