
import { Group, Image, CreateGroupRequest, CreateImageRequest} from '../models/Models'
import { DataAccess } from './dataLayer'

const dataAccess = new DataAccess()

export async function createGroup(createGroupRequest: CreateGroupRequest, userId: string): Promise<Group> {
  return await dataAccess.createGroup(createGroupRequest, userId)
}

export async function getAllGroups(): Promise<Group[]> {
  return dataAccess.getAllGroups()
}

export async function groupExists(groupId: string):Promise<any> {
  return dataAccess.groupExists(groupId)
}

export async function createImage(createImageRequest: CreateImageRequest, groupId: string): Promise<Image> {
  return await dataAccess.createImage(createImageRequest, groupId)

}

export async function getImage(imageId: string): Promise<any> {
  return await dataAccess.getImage(imageId)
}

export async function getImagesOfGroup(groupId: string): Promise<Image[]> {
  return await dataAccess.getImagesOfGroup(groupId)
}

export async function processImage(key: string): Promise<any> {
  return await dataAccess.processImage(key)
}
