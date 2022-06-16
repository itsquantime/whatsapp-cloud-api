export enum MessageType {
    text = 'text',
    image = 'image',
    location = 'location',
    interactive = 'interactive'
}

export interface Image {
    caption: string
    mime_type: string
    sha256: string
    id: string
}

export interface Text {
    body: string
}

export interface Location {
    latitude: number
    longitude: number
}

export enum InteractiveType {
    button_reply = 'button_reply',
    list_reply = 'list_reply'
}

export interface ListReply {
    id: string
    title: string
    description: string
}

export interface Interactive {
    type: InteractiveType
    list_reply: ListReply
}

export interface Message {
    from: string
    id: string
    timestamp: string
    type: MessageType
    image?: Image
    text?: Text
    location?: Location
    interactive?: Interactive
}

export enum ContextType {
    query = 'query',
    action = 'action',
    unknow = 'unknow'
}

export interface Context {
    type: ContextType
    last_message: Message
    expect_message_type: MessageType
}

export interface Conversation {
    contact: string
    context: Context
    messages: Array<Message>
}