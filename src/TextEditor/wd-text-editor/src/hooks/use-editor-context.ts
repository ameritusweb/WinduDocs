import { useState } from "react";

export const useEditorContext = () => {

    const [state, setState] = useState<string>('unselected');

    return {
        state,
        setState
    };

}