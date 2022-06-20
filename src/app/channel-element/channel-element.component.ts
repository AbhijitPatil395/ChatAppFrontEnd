import { Component, Input, OnInit,EventEmitter, Output } from '@angular/core';
import { ChatApiService } from 'src/service/chat-api.service';


@Component({
  selector: 'pm-channel-element',
  templateUrl: './channel-element.component.html',
  styleUrls: ['./channel-element.component.css']
})
export class ChannelElementComponent implements OnInit {

  constructor(private chatApi:ChatApiService) { }
  @Input() userName:string='';
  @Input() chName:string='general';
  @Output() SetChannel: EventEmitter<{}> = new EventEmitter();
  isMember:boolean=true;

  ngOnInit(): void {
    console.log(this.chName+" : "+this.userName);
    let sub=this.chatApi.isMember({chName:this.chName,UserName:this.userName}).subscribe((data)=>{
      this.isMember=data;
     sub.unsubscribe();
  });
  }

  joinChannel(ch:string){
    console.log("User:"+this.userName)
    console.log("Ready toadd channel mapping");
    this.chatApi.joinChannel({chName:ch,UserName:this.userName}).subscribe((data)=>{
      console.log("channel mapping added")
      this.ngOnInit();
      console.log("In join channel:"+ch);
      this.SetChannel.emit({chName:ch,flag:true});
      this.ngOnInit();
    });
  }

  leaveChannel(ch:string){
      // console.log("leave: "+ch+","+this.userName)
      // this.chls.leaveChannel(ch,this.userName)
      this.chatApi.leaveChannel({chName:ch,UserName:this.userName}).subscribe((data)=>{
        console.log("channel Mapping removed");
        this.setChannel("general");
        this.ngOnInit();
    });
  }
  setChannel(ch:string){
    console.log("inside set channel")
    this.chName=ch;
    this.SetChannel.emit({chName:ch,flag:this.isMember});
  }
  isLeveable():boolean{
    if(this.chName=='general')
    return false;
    else
    return this.isMember;
  }

}
