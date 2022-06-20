import { Component, Injectable, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { ChatApiService } from "src/service/chat-api.service";
import { channelService } from "./channel.service";
import { message } from "./message";

@Component({
    selector:'<pm-channel>',
    templateUrl:'./channel.component.html',
    styleUrls:['./channel.component.css']
})
export class channelComponent implements OnInit,OnChanges{
    constructor(private chls:channelService,private chatApi:ChatApiService){}
    @Input() channelName:string='';
    @Input() userName:string='';
    
    channelId:number=0;
    arrGeneralChat:any[]=[];

    getGeneralChat():any[]{
        
      return this.arrGeneralChat;
    }
    ngOnInit(): void 
    {
        console.log(this.channelName+":"+this.userName);
        // this.chatApi.getChannel(this.channelName).subscribe((data:any)=>{
        //     console.log(data.id);
        //     this.chatApi.getMessages(this.channelName).subscribe((data)=>{
        //         console.log(data);
        //         console.log(this.userName);
        //         this.arrGeneralChat=data;
        //     },(err)=>{
        //       console.log("inside error")
        //     })
        // })
        this.chatApi.getMessages(this.channelName).subscribe((data)=>{
            console.log(data);
            //console.log(this.userName);
            this.arrGeneralChat=data;
        },(err)=>{
          console.log("inside error")
        })
    }
    ngOnChanges(changes: SimpleChanges): void {
        this.chatApi.getGeneralChat(this.channelId).subscribe((data)=>{
            console.log(data);
            this.arrGeneralChat=data;
        },(err)=>{
          console.log("inside error")
        })
    }


    getMessages():message[]|undefined
    {
        console.log("in channel compo: "+this.channelName)
        //console.log("in channel compo service: "+this.chls.currentChannel)

        if(this.chls.isMember(this.userName,this.channelName))
        {
            console.log("inside if")

        return  this.chls.getChannelMessages(this.channelName);
        }
     else
     return undefined;
    }

    getUserName():string{
        return this.userName;
    }
}