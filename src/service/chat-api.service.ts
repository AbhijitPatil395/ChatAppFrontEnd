import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { convertFromMaybeForwardRefExpression } from '@angular/compiler/src/render3/util';
const post_user_api='https://localhost:44381/user/adduser'
const post_message_api='https://localhost:44381/message/addMessage'
const get_generalChat_api='https://localhost:44381/message/getGeneralChat/'
const get_messages_api='https://localhost:44381/message/getMessages/'

const get_channel_api='https://localhost:44381/Channel/getChannel/general'
const get_AllChannels_api='https://localhost:44381/Channel';
const post_channel_api='https://localhost:44381/Channel';
const post_JoinChannel_api='https://localhost:44381/Channel/joinchannel';
const post_LeaveChannel_api='https://localhost:44381/Channel/leavechannel';
const isMember_api='https://localhost:44381/Channel/isMember';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ChatApiService {

  constructor(private http:HttpClient) { }


  addUser(userObj:any):Observable<any> {
    console.log("inside chat api service:")
    console.log(userObj);
    return this.http.post(post_user_api,userObj,httpOptions);
  }

  addMessage(messageObj:any):Observable<any>{
    return this.http.post(post_message_api,messageObj,httpOptions);
  }

  getGeneralChat(id:number):Observable<any>{
    return this.http.get(get_generalChat_api+id);
  }

  getMessages(chName:string):Observable<any>{
    return this.http.get(get_messages_api+chName);
  }

  getChannel(chName:string){
    return this.http.get(get_channel_api);
  }

  getAllChannels():Observable<any>{
    return this.http.get(get_AllChannels_api);
  }

  addChannel(channelObj:any):Observable<any>{
    return this.http.post(post_channel_api,channelObj,httpOptions);
  }
  joinChannel(channelObj:any):Observable<any>{
    return this.http.post(post_JoinChannel_api,channelObj,httpOptions);
  }
  leaveChannel(channelObj:any):Observable<any>{
    return this.http.post(post_LeaveChannel_api,channelObj,httpOptions);
  }
  isMember(checkObj:any):Observable<any>{
    //console.log(checkObj.chName+" : "+checkObj.UserName)
    return this.http.post(isMember_api,checkObj,httpOptions)
  }
}
