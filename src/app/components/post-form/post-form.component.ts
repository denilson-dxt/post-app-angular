import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ICreatePost} from "../../models/ICreatePost";
import {Store} from "@ngrx/store";
import {IAppState} from "../../store/reducers";
import {IPost} from "../../models/post";
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  displayStyle:string = "block";

  @Input()
  creating!:boolean;

  @Input()
  post!:IPost

  @Input()
  data!:ICreatePost;
  submitText:string = this.creating ? "Update" : "Create";

  postFormGroup!:FormGroup;
  constructor(private store:Store<IAppState>) { }

  ngOnInit(): void {
    this.initializePostForm();
    console.log(this.data)
    if(this.post != null){
      this.data = {id: this.post.id, title:this.post.title, content: this.post.content, image: this.post.image}
    }
  }

  initializePostForm(){
    this.postFormGroup = new FormGroup({
      title: new FormControl("", Validators.required),
      content: new FormControl("", Validators.required),
      image: new FormControl("", Validators.required)
    });
  }

  onSubmit(){
    console.log(this.postFormGroup.value);
    
    this.onSubmitEvent.emit(this.postFormGroup.value);
  }

  closePopup(){
    this.onPopupClose.emit();
    this._clearForm();
  }

  private _clearForm(){
    this.data = {title: "", content: "", image: ""};
  }

}
