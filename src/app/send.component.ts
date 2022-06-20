import { Component, Input, Output, ViewChild,EventEmitter, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { ChatApiService } from "src/service/chat-api.service";
import { channelService } from "./channel.service";

@Component({
    selector:'<pm-send>',
    templateUrl:'./send.component.html'
})
export class sendComponent implements OnChanges{
    constructor(private chls:channelService,private chatApi:ChatApiService){}

    @Input() UserName:string='';
    @Input() channelName:string='general';
    @Output() sendDetails: EventEmitter<{userName:string,channelName:string}> = new EventEmitter();
    @Input() flag:boolean=false;
    @ViewChild('inp') inputName:any;

    ngOnChanges(changes: SimpleChanges): void {
     console.log("inside onchanges Send component");
     console.log(this.UserName+" : "+this.channelName+" : "+this.flag);
    }

    

    sendMessage(msg:string,inp:HTMLElement)
    {
        if(msg=='')
        alert("Please enter message!!")
        else
        {
            // this.chls.addMessage(msg,this.UserName,this.channelName);
            //console.log("in add mesaage")
            let date=new Date();
            //console.log(date.toDateString());
            this.chatApi.addMessage({messageText:msg,userName:this.UserName,channelName:this.channelName,dateTime:date}).subscribe((data)=>{
                //console.log("Message sent ");
            this.sendDetails.emit({userName:this.UserName,channelName:this.channelName});
            });
            this.inputName.nativeElement.value='';
        }
    }


    isSendDisabled():boolean{
        if(this.channelName=='general')
        return true;
        return this.flag;
    }
}