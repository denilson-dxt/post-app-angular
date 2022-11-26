import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IPost} from "../../models/post";
import {PostService} from "../../services/post.service";
import {Store} from "@ngrx/store";
import {IAppState} from "../../store/reducers";
import {addPosts} from "../../store/actions/post.action";
import {ICreatePost} from "../../models/ICreatePost";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  @Input()
  displayStyle="block";

  data:ICreatePost = {title:"", content:"", image: ""};

  @Output()
  onPostCreated = new EventEmitter<IPost>();

  @Output()
  onPopupClose = new EventEmitter();

  @Input()
  actualPost:ICreatePost = {id: 0, title: "", content: "", image: ""};

  constructor(private service: PostService, private store:Store<IAppState>) { }

  ngOnInit(): void {
   
  }
  createPost(post:ICreatePost){
    console.log(post)
  }

  onSubmit(){
    this.store.dispatch(addPosts({payload: {title: this.data.title, content: this.data.content, image: this.data.image}}))
    this.onPopupClose.emit();
    /*this.service.createPost(this.data).subscribe(data=>{
       this.onPostCreated.emit(data);
       this._clearForm();
     })*/
  }
  onPostFormSubmit(post:ICreatePost){
    
  }




}
