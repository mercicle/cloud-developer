
export interface CreateGroupRequest {
  name: string
  description: string
}

export interface Group {
  groupId: string
  name: string
  description: string
  userId: string
  timestamp: string
}

export interface CreateImageRequest {
  title: string
}

export interface Image {
  groupId: string
  title: string
  timestamp: string
  imageUrl: string
  imageId: string
  uploadUrl: string
}
