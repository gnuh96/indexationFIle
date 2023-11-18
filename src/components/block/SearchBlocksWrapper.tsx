import {BlockItemType} from '@/types/indexation.type'
import ListFileBlock from './ListFileBlock'
import IndexationBlock from './IndexationBlock'

interface SearchBlocksWrapperType {
  blockItemList: BlockItemType[]
  refresh: boolean
}

export default function SearchBlocksWrapper({
  blockItemList,
  refresh,
}: SearchBlocksWrapperType): JSX.Element {
  const returnSearchBlocks = () => {
    return blockItemList.map((item: BlockItemType, index: number) => {
      const searchBlocks: Record<string, JSX.Element> = {
        list_doc: (
          <ListFileBlock
            key={`list_doc_${index}`}
            {...item}
            refresh={refresh}
          />
        ),
        indexation: (
          <IndexationBlock
            key={`indexation_${index}`}
            {...item}
            refresh={refresh}
          />
        ),
      }
      return searchBlocks[item.id]
    })
  }

  return <>{returnSearchBlocks()}</>
}
