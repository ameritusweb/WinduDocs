import generateKey from "./generate-key";
import { AstNode } from "../../components/wysiwyg/interface";

const replaceKeys = (node: AstNode): AstNode => {

    return {
      ...node, 
      Guid: generateKey(),
      Children: node.Children.map(child => replaceKeys(child))
    };
  
  }

  export default replaceKeys;