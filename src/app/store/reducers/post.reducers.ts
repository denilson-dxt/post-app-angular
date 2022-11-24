import {IPost} from "../../models/post";
import {createReducer, on} from "@ngrx/store";
import {
  addPosts,
  addPostsFail,
  addPostsSuccess,
  deletePost,
  deletePostFailure,
  deletePostSuccess,
  getPosts,
  getPostsFail,
  getPostsSuccess,
  updatePost, updatePostFailure, updatePostSuccess
} from "../actions/post.action";

export interface IPostState{
  posts: IPost[],
  isLoading:boolean,
  isSaving:boolean
}

const initialState: IPostState = {
  posts: [],
  isLoading: false,
  isSaving:false
}


export const postsReducer = createReducer(
  initialState,
  on(getPosts, (state) => {
    return {...state, isLoading: true}
  }),
  on(getPostsSuccess, (state, {payload}) => {
    return {...state, posts: payload, isLoading: false}
  }),
  on(getPostsFail, (state, {payload})=>{
      return {...state, isLoading:false}
  }),

  on(addPosts, (state) => {
    return {...state, isSaving: true}
  }),
  on(addPostsSuccess, (state, {payload}) => {
    const newPost = [...state.posts, payload]
    return {...state, isSaving: false, posts: newPost}
  }),
  on(addPostsFail, (state, {payload})=>{
    return {...state, isLoading: false}
  }),

  on(updatePost, (state) => {
    return {...state, isLoading: true}
  }),
  on(updatePostSuccess, (state, {payload}) => {
    let tmpPosts = state.posts.map(post=>{
      if(post.id == payload.id){
        return {...payload}
      }
      else return post;
    })
    return {...state, isLoading: false, posts: tmpPosts}
  }),
  on(updatePostFailure, (state, error) => {
    return {...state, isLoading: false}
  }),

  on(deletePost, (state) => {
    return {...state, isLoading: true}
  }),
  on(deletePostSuccess, (state, {payload}) => {
    let tmpPosts = state.posts.filter(p => p.id != payload.id);
    return {...state, isLoading: false, posts: tmpPosts}
  }),
  on(deletePostFailure, (state, {payload}) => {
    return {...state, isLoading: false}
  })

)
