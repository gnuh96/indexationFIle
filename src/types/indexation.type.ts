export interface Indexation {
  mot: string
  lemma: string
  occurrence: string
  document: string
}

export type BlockItemType = {
  title: string
  id: string
  iconType: string
}

export type ResultBlockType = {
  title: string
  id: string
  iconType: string
  refresh: boolean
}
