export type Movie = {
  id?: string
  created_at?: Date
  title: string
  description: string
  year: string
  picture:
    | File
    | Blob
    | ArrayBuffer
    | ArrayBufferView
    | Buffer
    | FormData
    | NodeJS.ReadableStream
}
