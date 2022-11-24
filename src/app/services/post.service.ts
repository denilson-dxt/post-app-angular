import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_URL} from "../../environments/environment";
import {IPost} from "../models/post";
import {ICreatePost} from "../models/ICreatePost";
import {Observable} from "rxjs";

@Injectable()
export class PostService{
  constructor(private http: HttpClient) {}

  getAllPosts(){
    return this.http.get<IPost[]>(`${API_URL}/posts`)
  }
  createPost(data: ICreatePost){

    const token = localStorage.getItem("token");
    const options = {
      headers: new HttpHeaders().set("Authorization", 'Bearer ' + token)
    }

    return this.http.post<IPost>(`${API_URL}/posts`, data, options);
  }

  updatePost(post:ICreatePost):Observable<IPost>{
    const token = localStorage.getItem("token");
    const options = {
      headers: new HttpHeaders().set("Authorization", 'Bearer ' + token)
    }
    return this.http.put<IPost>(`${API_URL}/posts/${post.id}`, post, options);
  }

  deletePost(id:number):Observable<IPost>{
    const token = localStorage.getItem("token");
    const options = {
      headers: new HttpHeaders().set("Authorization", 'Bearer ' + token)
    }
    return this.http.delete<IPost>(`${API_URL}/posts/${id}`, {body: {id: id}, ...options});
  }
}
