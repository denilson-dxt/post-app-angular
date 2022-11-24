import {Component, Input, OnInit} from '@angular/core';
import {IPost} from "../../models/post";
import {PostService} from "../../services/post.service";
import {select, Store} from "@ngrx/store";
import {IAppState} from "../../store/reducers";
import {getPosts} from "../../store/actions/post.action";
import {selectAllPosts} from "../../store/selectors/post.selectors";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input()
  allPost:IPost[] = [];
  constructor(private postService:PostService, private store:Store<IAppState>) { }

  ngOnInit(): void {

    this.store.dispatch(getPosts());
    this.store.pipe(select(selectAllPosts)).subscribe(data=>{
      this.allPost = data;
    })

    /*this.postService.getAllPosts().subscribe(data=>{
      console.log(data)
      if(data){
        this.allPost = data;
      }
    });*/
  }

}
