import {createFeatureSelector, createSelector} from "@ngrx/store";
import {IPostState} from "../reducers/post.reducers";

export const post = createFeatureSelector<IPostState>('posts')


export const selectAllPosts = createSelector(
  post, state => state.posts
)


export const selectAllMessages = createSelector(
  post, state => state.messages
)
