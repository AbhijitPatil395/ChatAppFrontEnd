import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { channelComponent } from './channel.component';
import { chatComponent } from './chatApp.component';
import { login } from './login.component';

import { sendComponent } from './send.component';
import { userChatComponent } from './userChat.component';
import { ChannelElementComponent } from './channel-element/channel-element.component';

@NgModule({
  declarations: [
    AppComponent,chatComponent,channelComponent,userChatComponent,sendComponent,login, ChannelElementComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
