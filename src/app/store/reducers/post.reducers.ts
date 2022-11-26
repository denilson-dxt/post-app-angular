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
  removeNotification,
  updatePost, updatePostFailure, updatePostSuccess
} from "../actions/post.action";
import { INotification } from "src/app/types/notification";
import { NotificationType } from "src/app/enums/notification-type";

export interface IPostState{
  posts: IPost[],
  isLoading:boolean,
  isSaving:boolean,
  messages:INotification[]
}

const initialState: IPostState = {
  posts: [],
  isLoading: false,
  isSaving:false,
  messages: []
}


export const postsReducer = createReducer(
  initialState,
  on(getPosts, (state) => {
    return {...state, isLoading: true, messages: [...state.messages, {title: "Post", message: "Loading posst", type: NotificationType.Information, duration: 2000}]}
  }),
  on(getPostsSuccess, (state, {payload}) => {
    return {...state, posts: payload, isLoading: false, messages: [...state.messages, {title: "Post", message: "Posts loaded successfully", type: NotificationType.Success, duration: 3000}]}
  }),
  on(getPostsFail, (state, {payload})=>{
      return {...state, isLoading:false, messages: [...state.messages, {title: "Post", message: "Error getting posts", type: NotificationType.Error, duration: -1}]}
  }),

  on(addPosts, (state) => {
    return {...state, isSaving: true, messages: [...state.messages, {title: "Post", message: "Adding post", type: NotificationType.Information, duration: 2000}]}
  }),
  on(addPostsSuccess, (state, {payload}) => {
    const newPost = [...state.posts, payload]
    return {...state, isSaving: false, posts: newPost, messages: [...state.messages, {title: "Post", message: "Post added successfully", type: NotificationType.Success, duration: 3000}]}
  }),
  on(addPostsFail, (state, {payload})=>{
    return {...state, isLoading: false, messages: [...state.messages, {title: "Post", message: "Adding post failed", type: NotificationType.Error, duration: -1}]}
  }),

  on(updatePost, (state) => {
    return {...state, isLoading: true, messages: [...state.messages, {title: "Post", message: "Updating post", type: NotificationType.Information, duration: 2000}]}
  }),
  on(updatePostSuccess, (state, {payload}) => {
    let tmpPosts = state.posts.map(post=>{
      if(post.id == payload.id){
        return {...payload}
      }
      else return post;
    })
    return {...state, isLoading: false, posts: tmpPosts, messages: [...state.messages, {title: "Post", message: "Post update successfully", type: NotificationType.Success, duration: 3000}]}
  }),
  on(updatePostFailure, (state, error) => {
    return {...state, isLoading: false, messages: [...state.messages, {title: "Post", message: "Update post failed", type: NotificationType.Error, duration: -1}]}
  }),

  on(deletePost, (state) => {
    return {...state, isLoading: true, messages: [...state.messages, {title: "Post", message: "Deleting post", type: NotificationType.Information, duration: 2000}]}
  }),
  on(deletePostSuccess, (state, {payload}) => {
    let tmpPosts = state.posts.filter(p => p.id != payload.id);
    return {...state, isLoading: false, posts: tmpPosts, messages: [...state.messages, {title: "Post", message: "Post deleted successfully", type: NotificationType.Success, duration: 3000}]}
  }),
  on(deletePostFailure, (state, {payload}) => {
    return {...state, isLoading: false, messages: [...state.messages, {title: "Post", message: "Post delete failed", type: NotificationType.Error, duration: -1}]}
  }),

  on(removeNotification, (state, {payload})=>{
    let tmpMessages = state.messages.filter(m => m != payload);
    return {...state, messages: tmpMessages}
  })

)
