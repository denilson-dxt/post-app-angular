import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
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

  ngOnChanges(changes:SimpleChanges){
    this.initializePostForm();
  }

  initializePostForm(){
    this.postFormGroup = new FormGroup({
      title: new FormControl(this.data?.title || "", Validators.required),
      content: new FormControl(this.data?.content || "", Validators.required),
      image: new FormControl(this.data?.image || "", Validators.required)
    });
  }

  onSubmit(){
        
    this.onSubmitEvent.emit({...this.postFormGroup.value, id: this.data.id});
  }

  closePopup(){
    this.onPopupClose.emit();
    this._clearForm();
  }

  private _clearForm(){
    this.data = {title: "", content: "", image: ""};
  }

  onActualPostChange(){
    
  }
}
