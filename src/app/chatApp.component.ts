import { Component, ViewChild } from "@angular/core";
import { Channel } from "./channel";
import { channelService } from "./channel.service";

@Component({
    selector:'<pm-chatApp>',
    templateUrl:'./chatApp.component.html'
})
export class chatComponent{
    userName:string='';
    arrChannel:Channel[]=[];
    chName:string='general';
    isLoggedIn:boolean=false;
    @ViewChild('pm-login') logCompo:any;
    constructor(private chls:channelService){}
    changeLoginStatus($event:any){
        this.isLoggedIn=$event.status;
        this.userName=$event.user;
    }
    addChannel(cn:string){
        if(cn=='')
        alert("Please enter the channel name");
        else if(this.chls.checkDuplicateChannel(cn))
        alert("Channel already exists with same name")
        else{
            this.chls.addChannel(cn);
            console.log(this.getChannels())
            this.arrChannel=this.getChannels();
        }
    }
    addUsers(u:string){
    }
    getUsers():string[]{
        return this.chls.getUsers();
    }
    getChannels():Channel[]{
        return this.chls.getChannels();
    }
    setChannel(event:any){
        this.chName=event.target.value;
    }
}