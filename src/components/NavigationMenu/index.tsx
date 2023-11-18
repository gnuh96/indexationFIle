import {useState} from 'react'
import {DndContext, closestCenter} from '@dnd-kit/core'
import {CSS} from '@dnd-kit/utilities'
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import {restrictToVerticalAxis, restrictToWindowEdges} from '@dnd-kit/modifiers'
import './index.css'
import {BlockItemType} from '@/types/indexation.type'
import Icon from '../icon/Icon'

interface SortableItemType {
  item: BlockItemType
  itemClicked: string | null
  setItemClicked: (item: string) => void
}

interface NavigationMenuType {
  blockItemList: BlockItemType[]
  handleSetBlockItemList: (activeId: string, overId: string) => void
}

export default function NavigationMenu({
  blockItemList,
  handleSetBlockItemList,
}: NavigationMenuType): JSX.Element {
  const [itemClicked, setItemClicked] = useState<string | null>(null)

  const handleDragEnd = (event: any) => {
    const {active, over} = event
    if (active.id !== over.id) {
      handleSetBlockItemList(active.id, over.id)
    }
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}>
      <SortableContext
        items={blockItemList}
        strategy={verticalListSortingStrategy}>
        <ul>
          {blockItemList.map((item: BlockItemType, index: number) => (
            <SortableItem
              key={`navigation_item_${index}`}
              item={item}
              itemClicked={itemClicked}
              setItemClicked={item => setItemClicked(item)}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  )
}

function SortableItem({item, itemClicked}: SortableItemType): JSX.Element {
  const iconContainerStyle = {
    flex: 1,
    justifyContent: 'center',
    height: '2.5rem',
    margin: '.3rem 0',
  }

  const dragIconContainerStyle = {
    flex: 1,
    justifyContent: 'center',
    cursor: 'move',
  }

  const {attributes, listeners, setNodeRef, transform} = useSortable({
    id: item.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    backgroundColor: '#124376',
  }

  return (
    <li
      style={style}
      className={`NavItem${itemClicked === item.id ? ' Active' : ''}`}
      ref={setNodeRef}
      {...attributes}
      {...listeners}>
      <a className='NavItemLink' href={`#${item.id}`}>
        <Icon type={item.iconType} containerStyle={iconContainerStyle} />
        <p className='NavItemLabel'>{item.title}</p>
        <Icon
          type='drag'
          iconStyle={{color: '#FFFFFF'}}
          containerStyle={dragIconContainerStyle}
        />
      </a>
    </li>
  )
}
