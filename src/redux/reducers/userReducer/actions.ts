import { CHANGE_USERNAME } from './actionsTypes';

export const changeUserName = (username: string) => ({
	type: CHANGE_USERNAME,
	payload: { username }
} as const)