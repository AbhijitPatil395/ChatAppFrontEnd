import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ChatApiService } from "src/service/chat-api.service";
import { channelComponent } from "./channel.component";
import { channelService } from "./channel.service";

@Component({
    selector:'pm-login',
    templateUrl:'./login.component.html'
})
export class login
{
    userName:string='';
    @Output() loginStatus: EventEmitter<{status:boolean,user:string}> = new EventEmitter();
    @Input() isLoggedIn:boolean=false;
    
    constructor(private chls:channelService,private api:ChatApiService){}

    joinChat(u:string){
        if(u=='')
         alert("Please enter the name");
         else
         {
                this.api.addUser({name:u}).subscribe((data)=>{
                    this.isLoggedIn=true;
                    this.loginStatus.emit({status:this.isLoggedIn,user:u});
                    this.userName=u;
                },
                (err)=>{
                    this.isLoggedIn=true;
                    this.loginStatus.emit({status:this.isLoggedIn,user:u});
                    this.userName=u;
                });
         }
    }
}