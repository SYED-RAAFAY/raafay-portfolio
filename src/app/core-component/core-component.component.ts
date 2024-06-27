import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatBackendService } from '../chat-backend.service';

interface Message {
	from: string;
	text: string;
}

@Component({
  selector: 'app-core-component',
  templateUrl: './core-component.component.html',
  styleUrls: ['./core-component.component.css']
})
export class CoreComponentComponent {
  chatBotActive: boolean = false;
  showChat: boolean = false;
  messages: Message[] = [];
  showConversation: boolean = false;
  userMessage: string = '';

  constructor(private service: ChatBackendService) { }

  toggleChat() {
    if(this.showChat && this.showConversation && this.chatBotActive){
      this.showChat = false;
      this.showConversation=false;
      this.chatBotActive = false;
    }
    else{
      this.showChat = true;
		  this.showConversation=true;
      this.chatBotActive = true;
		  if (this.showChat) {
			  // Start the conversation with a greeting from the server
			  this.messages = [];
			  this.addServerMessage('Hi there! What do you want to know about Syed Raafay Mohiuddin?');
		  }
    }
  }

  addServerMessage(text: string) {
		const fetchingResponseIndex = this.messages.findIndex(message => message.text === 'Loading...');
		if (fetchingResponseIndex !== -1) {
			this.messages[fetchingResponseIndex] = { from: 'server', text };
		  } else {
			this.messages.push({ from: 'server', text });
		  }
		this.scrollChat();
	  }

    private scrollChat() {
      setTimeout(() => {
        const chatContainer = document.querySelector('.scroll-wrapper');
        if (chatContainer) {
        chatContainer.scrollTo({
          top: chatContainer.scrollHeight,
          behavior: 'smooth'
          }),20000;
        }
      });
      }

  onEnterPressed(event: any){
		if(event.keyCode === 13){
		  this.sendMessage();
		}
	}

  closeChat() {
    this.messages = [];
		this.showChat = false;
		this.showConversation=false;
    this.chatBotActive = false;
  }

  sendMessage() {
		if (!this.userMessage.trim()) return; // Ignore empty messages
    	// Send user message to the API
    	this.addClientMessage(this.userMessage);
		this.addServerMessage('Loading...');

		this.service.fetchQueryResponse("raafay",this.userMessage).subscribe(
			(response) => {
				const jsonResponse = JSON.parse(JSON.stringify(response));
				const ans = jsonResponse.answer;
				console.log('response', ans)
				
				this.addServerMessage(ans)
			},
			(error) => {
				const ans = 'Error while fetching response. Please try again.'
				this.addServerMessage(ans)
				console.error('Error while fetching response:', error);
			}
		);

		this.userMessage = '';
	}

  addClientMessage(text: string) {
		this.messages.push({ from: 'client', text });
		this.scrollChat();
	  }

}
