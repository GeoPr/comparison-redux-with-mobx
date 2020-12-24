import { makeAutoObservable } from 'mobx';

interface IState {
	username: string
}

class User {
	state: IState = {
		username: 'GeoPr'
	}

	constructor() {
		makeAutoObservable(this)
	}

	updateUsername(username: string) {
		this.state.username = username
	}
}

export const userStore = new User()