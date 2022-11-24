import {Injectable} from "@angular/core";
import {PostService} from "../../services/post.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
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
import {catchError, exhaustMap, map, of} from "rxjs";

@Injectable()
export class PostsEffects{
  constructor(private postService:PostService, private actions$:Actions) {
  }

  loadPost$ = createEffect(() => this.actions$.pipe(
        ofType(getPosts),
        exhaustMap(actions=>
          this.postService.getAllPosts().pipe(
            map(post => getPostsSuccess({payload: post})),
            catchError(error => of(getPostsFail({payload: error})))
          )
        )
      )
  );
  addPost$ = createEffect(() => this.actions$.pipe(
        ofType(addPosts),
        exhaustMap(action=>
          this.postService.createPost(action.payload).pipe(
            map(post => addPostsSuccess({payload: post})),
            catchError(error => of(addPostsFail({payload: error})))
          )
        )
      )
  );

  updatePost$ = createEffect(() => this.actions$.pipe
  (
    ofType(updatePost),
    exhaustMap(action => {
      return this.postService.updatePost(action.payload).pipe
      (
        map(post => updatePostSuccess({payload: post})),
        catchError(error => of(updatePostFailure({error: error})))
      )
    })
  ))

  deletePost$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(deletePost),
      exhaustMap(action=>{
        return this.postService.deletePost(action.payload).pipe(
          map(post => deletePostSuccess({payload: post})),
          catchError(error => of(deletePostFailure({payload: error})))
        )
      })
    )
  })
}
