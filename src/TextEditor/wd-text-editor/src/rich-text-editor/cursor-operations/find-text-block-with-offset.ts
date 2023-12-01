import { ITextBlock } from "../../components/wysiwyg/interface";

const findTextBlockWithOffset = (blocks: ITextBlock[], totalOffset: number): { block: ITextBlock, blockOffset: number, reduction: number } => {
    let cumulativeLength = 0;
  console.log(blocks);
    for (const block of blocks) {
      const textLength = block.textContent.length;
      if (cumulativeLength + textLength >= totalOffset) {
        const blockOffset = totalOffset - cumulativeLength;
        return { block, blockOffset, reduction: 0 };
      }
      cumulativeLength += textLength;
    }
  
    const lastBlock = blocks[blocks.length - 1];
    if (lastBlock.textContent === '\n')
    {
        return { block: lastBlock, blockOffset: 0, reduction: totalOffset - 0 };
    }
    return { block: lastBlock, blockOffset: lastBlock.textContent.length, reduction: totalOffset - cumulativeLength };
  }

  export default findTextBlockWithOffset;