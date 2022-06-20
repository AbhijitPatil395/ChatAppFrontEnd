import { Injectable } from "@angular/core";
import { ChatApiService } from "src/service/chat-api.service";
import { Channel } from "./channel";
import { message } from "./message";
@Injectable({
    providedIn:'root'
})
export class channelService
{
    constructor(private api:ChatApiService){}
    arrUsers:string[]=[];
    arrGeneralChat:any[]=[];
    IsMember?:boolean;
    private arrChannel:Channel[]=[{name:'general',arrMessage:[],arrSubUsers:[]}];
    isActive:boolean=true;
    joinUser(u:string){
        this.arrUsers.push(u);
       
    }
    checkDuplicate(u:string):boolean{
        if(this.arrUsers.find((e)=>e==u))
        return true;
        else 
        return false;
    }
    getUsers():string[]{
        return this.arrUsers;
    }

    addChannel(c:string){
        let channelObj=new Channel();
        channelObj.name=c;
        this.arrChannel.push(channelObj);
    }
    addUser(name:string,ch:string){
        let channelElem=this.arrChannel.find((elem)=>elem.name==ch);
        if(channelElem)
        channelElem.arrSubUsers.push(name);
       // this.api.addUser({name:userName});
    }
    leaveChannel(chName:string,user:string){
        console.log(this.arrChannel)
        let arr=this.arrChannel.find((elem)=>elem.name==chName);
        if(arr)
        arr.arrSubUsers=arr.arrSubUsers.filter(elem=>elem!=user);
    }
    addMessage(msg:string,uname:string,ch:string){
        let m=new message();
        m.messageBody=msg;
        m.messageDate=new Date();
        m.userName=uname;
        
        let channelElem=this.arrChannel.find((elem)=>elem.name==ch);
        if(channelElem)
        channelElem.arrMessage.push(m);
    }

    getChannels():Channel[]{
        return this.arrChannel;
    }
    getChannelMessages(chname:string):message[]{
        let channelElem= this.arrChannel.find((elem)=>elem.name==chname);
        if(channelElem)
        return channelElem.arrMessage;
        else
        return [];

    }
    setMemberFlag(uname:string ,chname:string){
            let flag:boolean;
            this.api.isMember({chName:chname,UserName:uname}).subscribe((data)=>{
                console.log(data);
                flag=data;
                return flag;
            });
    }

    isMember(uname:string ,chname:string):boolean
    {
        console.log("inside is Member");
        if(chname=='general')
        return true;
        else
        {
           
        }
        return false;
    }
    isLeavable(uname:string ,ch:string  ):boolean
    {
        if(ch=='general')
        return false;
        else
        {
            let channelElem=this.arrChannel.find((elem)=>elem.name==ch);
            if(channelElem)
            return channelElem.arrSubUsers.find((e)=>e==uname)?true:false;
        }
        return false;
    }
    checkDuplicateChannel(ch:string):boolean{
        if(this.arrChannel.find(e=>e.name==ch))
        return true;
        else
        return false;
    }

}