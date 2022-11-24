import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IPost} from "../../../models/post";

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  @Input()
  post:IPost | any;
  constructor() { }

  @Output()
  onUpdatePost = new EventEmitter<IPost>();

  @Output()
  onDeletePost = new EventEmitter<number>();
  ngOnInit(): void {
  }
  updatePost(){
    this.onUpdatePost.emit(this.post);
  }

  deletePost(){
    this.onDeletePost.emit(this.post.id);
  }
}
