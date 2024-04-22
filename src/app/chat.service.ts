import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum Author {
  User = 'user',
  Bot = 'bot',
}

export class Message {
  constructor(public author: Author, public content: string) { }
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  conversation = new Subject<Message[]>();
  messageMap: { [key: string]: string } = {
    'hi': 'Hello',
    'hello': 'Hello',
    'hey': 'Hello',
    'who are you': 'My name is AI Bot',
    'what is angular': 'Angular is the UI framework',
    'tell me about yourself': 'I am a developer passionate about creating innovative web applications.',
    'can I see your projects': 'Sure! You can view my projects on my portfolio page.',
    'where did you study': 'I studied Computer Science at XYZ University.',
    'how can I reach you': 'You can contact me through the contact form on my portfolio or via email at example@example.com.',
    'are you available for freelance work': 'Yes, I am available for freelance work. Feel free to reach out to discuss your project.',
    'do you have any social media profiles': 'Yes, you can connect with me on LinkedIn, Twitter, and GitHub.',
    'what programming languages do you use': 'I am proficient in JavaScript, TypeScript, HTML, CSS, and more.',
    'how do you approach a new project': 'I typically start by understanding the requirements and user needs, followed by designing and implementing a solution.',
    'what are your goals for the future': 'My goal is to continue learning and growing as a developer, while also delivering impactful projects.',
  };

  getBotAnswer(userMessage: string): void {
    const formattedUserMessage = userMessage.trim().toLowerCase();
    const userMessageObj = new Message(Author.User, formattedUserMessage);
    this.conversation.next([userMessageObj]);

    let botMessageContent = this.getBotMessage(formattedUserMessage);
    if (!botMessageContent) {
      botMessageContent = 'I can\'t understand. Please try one of these questions:\n';
      const exampleQuestions = Object.keys(this.messageMap).map(question => `- ${question}`);
      botMessageContent += '\n' + exampleQuestions;
    }

    const botMessageObj = new Message(Author.Bot, botMessageContent);
    setTimeout(() => {
      this.conversation.next([botMessageObj]);
    }, 500);
  }

  private getBotMessage(question: string): string {
    return this.messageMap[question];
  }
}
