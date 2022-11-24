import {IPostState, postsReducer} from "./post.reducers";
import {ActionReducerMap, MetaReducer} from "@ngrx/store";
import {environment} from "../../../environments/environment.prod";

export interface IAppState{
  posts: IPostState;
}


export const reducers: ActionReducerMap<IAppState> = {
  posts: postsReducer
};


export const metaReducers: MetaReducer<IAppState>[] = !environment.production ? [] : [];
