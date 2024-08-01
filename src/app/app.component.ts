import { Component, HostListener, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, NgFor, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('userInputElement') userInputElement!: ElementRef;

  title = 'project';
  buttons = [
    { top: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'] },
    { middle: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'] },
    { bottom: ['z', 'x', 'c', 'v', 'b', 'n', 'm'] }
  ];

  point = 0;
  time = 30;
  userInput = '';
  word = '';
  myWords = [
    'apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon',
    'mango', 'nectarine', 'orange', 'papaya', 'quince', 'raspberry', 'strawberry', 'tangerine',
    'ugli', 'vanilla', 'watermelon', 'xigua', 'yuzu', 'zucchini'
  ];

  timerStarted = false;
  keyPressed: string | null = null;

  ngOnInit() {
    this.changeWord();
  }

  changeWord() {
    const index = Math.floor(Math.random() * this.myWords.length);
    this.word = this.myWords[index];
  }

  startGame() {
    if (!this.timerStarted) {
      this.timerStarted = true;
      const interval = setInterval(() => {
        this.time--;
        if (this.time === 0) {
          clearInterval(interval);
          this.timerStarted = false;
        }
      }, 1000);
    }
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.userInputElement.nativeElement.focus();
    if (!this.timerStarted && event.key !== 'Enter') {
      this.startGame();
    }

    if (event.key === 'Enter' && this.timerStarted) {
      if (this.userInput === this.word) {
        this.point++;
        this.changeWord();
      } else if (this.point > 0) {
        this.point--;
        this.changeWord();
      }
      this.userInput = '';
    }
    this.keyPressed = event.key;
    setTimeout(() => {
      this.keyPressed = null;
    }, 200);
  }

  handleVirtualKeyPress(key: string) {
    this.userInput += key;
    this.userInputElement.nativeElement.focus();
    if (!this.timerStarted && key !== 'Enter') {
      this.startGame();
    }

    if (key === 'Enter' && this.timerStarted) {
      if (this.userInput === this.word) {
        this.point++;
        this.changeWord();
      } else if (this.point > 0) {
        this.point--;
        this.changeWord();
      }
      this.userInput = '';
    }
    this.keyPressed = key;
    setTimeout(() => {
      this.keyPressed = null;
    }, 200);
  }
}
