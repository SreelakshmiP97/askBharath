import { Component, OnInit, Input, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface ChatMessage {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss']
})
export class ChatBotComponent implements OnInit {
  @Input() botId: string = '';
  @ViewChild('messageInput') messageInput!: ElementRef;
  
  isOpen: boolean = false;
  messages: ChatMessage[] = [];
  isTyping: boolean = false;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Only run in browser environment
    if (isPlatformBrowser(this.platformId)) {
      this.loadRelevanceAI();
      
      // Add event listener to close chat when clicking outside
      document.addEventListener('click', (event) => {
        if (this.isOpen && !this.el.nativeElement.contains(event.target)) {
          this.toggleChat();
        }
      });
    }
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
    
    if (this.isOpen) {
      // Focus on input after a short delay to allow for animation
      setTimeout(() => {
        if (this.messageInput) {
          this.messageInput.nativeElement.focus();
        }
      }, 300);
      
      // If we want to open the chat programmatically with Relevance AI
      console.log('Opening chat');
    } else {
      // If we want to close the chat programmatically
      console.log('Closing chat');
    }
  }
  
  sendMessage(event?: Event): void {
    // If it's an Enter key event, prevent default behavior (new line) unless Shift key is pressed
    if (event && event instanceof KeyboardEvent) {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
      } else {
        return; // If it's not an Enter keypress or Shift+Enter is pressed, do nothing
      }
    }
    
    // Get the message from the textarea
    const textarea = this.messageInput.nativeElement;
    const message = textarea.value.trim();
    
    // If the message is empty, don't send
    if (!message) return;
    
    // Add the user message to the chat
    this.addMessage(message, true);
    
    // Clear the textarea and reset its height
    textarea.value = '';
    textarea.style.height = 'auto';
    
    // Show typing indicator
    this.isTyping = true;
    
    // Here you would typically call your AI service API
    // For demo purposes, we'll just simulate a response after a delay
    setTimeout(() => {
      this.isTyping = false;
      
      // Sample responses - in a real app this would come from your API
      const responses = [
        "I'd be happy to help with that!",
        "Let me check that for you...",
        "Bharath typically handles that kind of request very efficiently.",
        "I can connect you with Bharath for more details on that.",
        "That's a service we offer. Would you like me to tell you more about the pricing?"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      this.addMessage(randomResponse, false);
    }, 1500);
  }
  
  addMessage(content: string, isUser: boolean): void {
    const message: ChatMessage = {
      content,
      isUser,
      timestamp: new Date()
    };
    
    this.messages.push(message);
    
    // Scroll to the bottom of the chat after a short delay
    setTimeout(() => {
      const chatContainer = this.el.nativeElement.querySelector('.chat-messages');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 100);
  }
  
  adjustTextareaHeight(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
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
    
    // Instead of setting up click event here, we're using Angular binding (click)="toggleChat()"
    console.log('Chat bot initialized');
  }
  
  formatTimestamp(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
} 