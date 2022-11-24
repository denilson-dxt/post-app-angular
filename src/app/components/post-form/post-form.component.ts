import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ICreatePost} from "../../models/ICreatePost";
import {Store} from "@ngrx/store";
import {IAppState} from "../../store/reducers";
import {IPost} from "../../models/post";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  @Output()
  onSubmitEvent = new EventEmitter<ICreatePost>();

  @Output()
  onPopupClose = new EventEmitter();

  @Input()
  displayStyle:string = "none";

  @Input()
  creating!:boolean;

  @Input()
  post!:IPost

  @Input()
  data!:ICreatePost;
  submitText:string = this.creating ? "Update" : "Create";
  constructor(private store:Store<IAppState>) { }

  ngOnInit(): void {
    console.log(this.data)
    if(this.post != null){
      this.data = {id: this.post.id, title:this.post.title, content: this.post.content, image: this.post.image}
    }
  }

  onSubmit(){
    this.onSubmitEvent.emit(this.data);
  }

  closePopup(){
    this.onPopupClose.emit();
    this._clearForm();
  }

  private _clearForm(){
    this.data = {title: "", content: "", image: ""};
  }

}
