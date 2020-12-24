import { CREATE_POST, UPDATE_LIKES, CREATE_COMMENT } from './actionsTypes';

export const createPost = (body: string, imageUrl?: string) => ({
	type: CREATE_POST,
	payload: { body, imageUrl }
} as const)

export const updateLikes = (id: string | number) => ({
	type: UPDATE_LIKES,
	payload: { id }
} as const)

export const createComment = (id: string | number, body: string) => ({
	type: CREATE_COMMENT,
	payload: { id, body }
} as const)