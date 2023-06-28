// @NOTE also used by app-view
export interface DidHandle {
  did: string
  handle: string | null
}

export const tableName = 'did_handle'

export type PartialDB = { [tableName]: DidHandle }
