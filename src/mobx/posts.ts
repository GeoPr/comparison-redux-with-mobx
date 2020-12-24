import { IPost } from './../redux/reducers/postsReducer/postsReducer';
import { makeAutoObservable } from 'mobx';

type TState = Array<IPost>

class Posts {
	posts: TState = []

  constructor() {
    makeAutoObservable(this);
	}
	
	createPost(body: string, imageUrl: string = '') {
		const id = Date.now().toString()

		this.posts.push({ body, imageUrl, id, comments: [], likes: 0 })
	}

	updateLikes(id: string | number) {
		const updatablePost = this.getUpdatablePost(id)

		++updatablePost!.likes
	}

	createComment(id: string |number, body: string) {
		const updatablePost = this.getUpdatablePost(id)
		const commentId = Date.now().toString()

		updatablePost!.comments.push({ body, id: commentId })
		const sortedComments = updatablePost!.comments.slice().sort((a, b) => +b.id - +a.id)
		updatablePost!.comments = sortedComments
	}

	private getUpdatablePost(id: string | number) {
		return this.posts.find(post => post.id === id)
	}
}

export const postsStore = new Posts();
