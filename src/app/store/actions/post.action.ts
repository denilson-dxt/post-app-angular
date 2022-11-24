import {createAction, props} from "@ngrx/store";
import {IPost} from "../../models/post";
import {ICreatePost} from "../../models/ICreatePost";

export const getPosts = createAction('[IPost] Get a;; post');
export const getPostsFail = createAction('[IPost] get all post Fail', props<{payload: any}>());
export const getPostsSuccess = createAction('[IPost] get all post success', props<{payload: IPost[]}>());

export const addPosts = createAction('[IPost] add Post', props<{ payload:ICreatePost }>());
export const addPostsFail = createAction('[IPost] ass post Fail', props<{payload: any}>());
export const addPostsSuccess = createAction('[IPost] add post success', props<{payload: IPost}>());

export const updatePost = createAction("[IPost] Update Post", props<{payload: ICreatePost}>());
export const updatePostSuccess = createAction("[IPost Update Post Success]", props<{payload: IPost}>());
export const updatePostFailure = createAction("[IPost update failure]", props<{error: any}>());

export const deletePost = createAction("[IPost] Delete Post", props<{payload: number}>())
export const deletePostSuccess = createAction("[IPost Delete Post success]", props<{payload: IPost}>())
export const deletePostFailure = createAction("[IPost Delete Post failure]", props<{payload: any}>());