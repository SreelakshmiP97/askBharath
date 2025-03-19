import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChatBotComponent } from './components/chat-bot/chat-bot.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ChatBotComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Ask Bharath';
  isChatOpen = false;
  logoPath = 'assets/images/logo.png';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    // Only initialize when running in a browser
    if (isPlatformBrowser(this.platformId)) {
      this.initializeRelevanceAIBot();
    }
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  private initializeRelevanceAIBot() {
    // This will be implemented to integrate the Relevance AI bot
    // We'll add the script to load the Relevance AI bot
    const script = document.createElement('script');
    script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js';
    script.async = true;
    document.body.appendChild(script);

    // Add a small delay to ensure the script is loaded
    setTimeout(() => {
      this.loadChatBotUI();
    }, 1000);
  }

  private loadChatBotUI() {
    // This is a placeholder for when we have the actual Relevance AI bot credentials
    // Add your Relevance AI bot ID here when you have it
    const botId = 'YOUR_RELEVANCE_AI_BOT_ID';
    
    // This is a placeholder method that would be replaced with the actual Relevance AI initialization
    // when you have the proper credentials
    const chatContainer = document.getElementById('chat-bot-container');
    if (chatContainer) {
      chatContainer.innerHTML = '<div>🤖</div>';
      chatContainer.addEventListener('click', () => this.toggleChat());
    }
  }
}
