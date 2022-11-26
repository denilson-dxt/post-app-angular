import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getPosts } from './store/actions/post.action';
import { IAppState } from './store/reducers';
import { selectAllMessages } from './store/selectors/post.selectors';
import { INotification } from './types/notification';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  notifications:INotification[] = [];
  constructor(private store:Store<IAppState>){
 
  }
  ngOnInit(): void {
    this.store.pipe(select(selectAllMessages)).subscribe(data=>{
      console.log(data);
      
      this.notifications = data;
    })
  }
  title = 'template';
}
