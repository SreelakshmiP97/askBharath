import { Component, OnInit, Input, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss']
})
export class ChatBotComponent implements OnInit {
  @Input() botId: string = '';
  isOpen: boolean = false;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Only run in browser environment
    if (isPlatformBrowser(this.platformId)) {
      this.loadRelevanceAI();
    }
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
    
    if (this.isOpen) {
      // If we want to open the chat programmatically with Relevance AI
      // This would depend on the specific API of Relevance AI
      console.log('Opening chat');
    } else {
      // If we want to close the chat programmatically
      console.log('Closing chat');
    }
  }

  private loadRelevanceAI(): void {
    // This is where we would load the Relevance AI script
    // For now, we're using a placeholder implementation
    console.log('Loading Relevance AI with bot ID:', this.botId);
    
    // The actual implementation would depend on Relevance AI's specific integration instructions
    if (this.botId) {
      // Create a script element to load the Relevance AI script
      const script = document.createElement('script');
      script.src = 'https://cdn.relevanceai.com/widget.js'; // Replace with actual URL
      script.async = true;
      script.onload = () => {
        this.initializeBot();
      };
      document.body.appendChild(script);
    }
  }

  private initializeBot(): void {
    // This would be replaced with the actual Relevance AI initialization
    // Example of what it might look like (placeholder):
    /*
    window.RelevanceAI.init({
      botId: this.botId,
      container: '#chat-container',
      theme: {
        primaryColor: '#4a49e5',
        backgroundColor: '#ffffff',
        textColor: '#1e2751'
      }
    });
    */
    
    // For now, we'll just setup a chat button
    const chatButton = this.el.nativeElement.querySelector('#chat-button');
    if (chatButton) {
      chatButton.addEventListener('click', () => {
        this.toggleChat();
      });
    }
  }
} 