import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {IPost} from "../../../models/post";

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  @Input()
  post:IPost | any;
  
  @Output()
  onUpdatePost = new EventEmitter<IPost>();
  
  @Output()
  onDeletePost = new EventEmitter<number>();
  ngOnInit(): void {
  }
  
  constructor(public userService:UserService) { }

  
  updatePost(){
    this.onUpdatePost.emit(this.post);
  }

  deletePost(){
    this.onDeletePost.emit(this.post.id);
  }
}
