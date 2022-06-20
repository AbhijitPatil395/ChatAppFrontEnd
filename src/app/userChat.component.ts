import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { ChatApiService } from "src/service/chat-api.service";
import { Channel } from "./channel";
import { channelComponent } from "./channel.component";
import { channelService } from "./channel.service";

@Component({
    selector:'<pm-userChat>',
    templateUrl:'./userChat.component.html'
   
})
export class userChatComponent implements OnInit
{
    @Input() userName:string='';
    arrChannel:any[]=[];
    chName:string='general';
    IsMember:boolean=true;
    @ViewChild('display') dispCompo:any;
    @ViewChild('send') sendCompo:any;
    subscription:any;
    constructor(private chls:channelService,private chatApi:ChatApiService){}

    ngOnInit(): void {
       console.log("ng on init userchat")
        this.subscription=this.chatApi.getAllChannels().subscribe((data)=>{
            console.log(data);
            this.arrChannel=data;
            this.sendCompo.isSendDisabled();
        })
        //this.IsMember= this.chls.isMember(this.userName,this.chName);
    }


    addChannel(cn:string,un:string){
        this.subscription.unsubscribe();
        if(cn=='')
        alert("Please enter the channel name");
        else if(this.chls.checkDuplicateChannel(cn))
        alert("Channel already exists with same name")
        else{
            this.chatApi.addChannel({chName:cn,UserName:un}).subscribe((data)=>{
                console.log("channel added");
                this.setChannel({chName:cn,flag:true});
                this.ngOnInit();
            });
        }

    }
    
    setChannel(event:any){
        
        this.subscription.unsubscribe();
        console.log("inside set channel")
        console.log(event.chName);
        console.log(event.flag)
        this.chName=event.chName;
        this.IsMember=event.flag;
        this.dispCompo.channelName=event.chName;
        this.dispCompo.ngOnInit();
        this.ngOnInit();
        this.dispCompo.ngOnInit();
       
    }

    getCurrentChannel():string{
        //console.log("in get current chanel"+this.chName)
        if(this.chName=='general')
        return "General chat"
        else
        return this.chName;
    }

    changeSendDetails(detail:any){
        console.log("inside change send details")
        this.userName=detail.userName;
        this.chName=detail.channelName;
        this.dispCompo.ngOnInit();
    }
}