import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {IPost} from "../../models/post";
import {ICreatePost} from "../../models/ICreatePost";
import {Store} from "@ngrx/store";
import {IAppState} from "../../store/reducers";
import {addPosts, deletePost, updatePost} from "../../store/actions/post.action";

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})
export class ListPostsComponent implements OnInit {
  @Input()
  posts:IPost[] = [];

  actualPost:ICreatePost = {title: "", content: "", image: ""};
  creatingPost:boolean = true;

  constructor(public userService:UserService, private store:Store<IAppState>) { }

  displayStyle="none";

  ngOnInit(): void {
    console.log('test', this.posts);
  }

  openPopup(){
    this.displayStyle = "block";
  }
  closePopup(){
    this.creatingPost = true;
    this.actualPost = {id: 0, title: "", content: "", image: ""}
    this.displayStyle = "none";
  }

  createPost(post:IPost){
    this.posts.unshift(post)
  }

  onPostFormSubmit(post:ICreatePost){
    if(this.creatingPost)
      this.store.dispatch(addPosts({payload: post}));
    else
      this.store.dispatch(updatePost({payload: post}));
    this.displayStyle = "none";
  }

  updatePost(post:IPost){
    this.creatingPost =false;
    this.actualPost = {id: post.id, title:post.title, content:post.content, image: post.image};
    this.displayStyle = "block";
  }

  deletePost(id:number){
    this.store.dispatch(deletePost({payload: id}))
  }
}
