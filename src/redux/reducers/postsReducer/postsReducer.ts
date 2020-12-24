import { CREATE_POST, UPDATE_LIKES, CREATE_COMMENT } from './actionsTypes';
import { TActions } from './../../store';
import * as actions from './actions';

export interface IComment {
  id: string | number;
  body: string;
}

export interface IPost {
  id: string | number;
  body: string;
  imageUrl: string;
  likes: number;
  comments: Array<IComment>;
}

type TInitalState = Array<IPost>;

const initalState: TInitalState = [];

type ActionsTypes = TActions<typeof actions>;

export const postsReducer = (
  state: TInitalState = initalState,
  action: ActionsTypes,
): TInitalState => {
  switch (action.type) {
    case CREATE_POST: {
      const { body, imageUrl } = action.payload;
      const id = Date.now().toString();
      const url = imageUrl ? imageUrl : '';

      return [
        ...state,
        {
          id,
          body,
          imageUrl: url,
          likes: 0,
          comments: [],
        },
      ];
    }

    case UPDATE_LIKES: {
      const { id } = action.payload;

      return state.map(post => {
        return post.id === id ? { ...post, likes: ++post.likes } : post;
      });
    }

    case CREATE_COMMENT: {
      const { id, body } = action.payload;
      const currentPost = state.find(post => post.id === id)
      const commentId = Date.now().toString()
      
      currentPost!.comments = [...currentPost!.comments, { id: commentId, body }]

      return state
    }

    default:
      return state;
  }
};
