import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { interval } from 'rxjs';
import {AppService} from './../app.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  questions: any[] = [];
  category: string = "";
  categoryId: number = 0;
  currentQuestion: number = 0;
  points: number = 0;
  counter: number = 60;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$: any;
  progress: number = 0;
  isQuizCompleted: boolean = false;
  qProgress: unknown[] = [];

  constructor(public appService: AppService, public cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.categoryId = Number(localStorage.getItem("category"));
    this.getData();
    this.startCounter();
  }

  getData() {
    this.appService.getQuestionsByCategoryId(this.categoryId).subscribe((data: any) => {
		  this.questions = data.data.questions;
      this.category = data.data.category;
      console.log("this.questions :: ", this.questions)
		});
  }

  nextQuestion() {
    this.currentQuestion++;
  }

  previousQuestion() {
    this.currentQuestion--;
  }

  answer(currentQues: number, option: any, quesId: number) {
    let val = {
      "questionId": quesId,
      "answerId": option.optionId,
      "isAttempted": true
    };
    this.qProgress.push(val);
    if(option.isCorrect) {
      this.points += 10;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);
    }
    else {
      setTimeout(() => {
        this.currentQuestion++;
        this.inCorrectAnswer++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);
      this.points -= 10;
    }

    setTimeout(() => {
    if(currentQues == (this.questions.length))
    {
      this.isQuizCompleted = true;
      this.stopCounter();
      this.submitResult();
    }
  }, 1000);
    
  }
  
  startCounter() {
    this.interval$ = interval(1000).subscribe(val => {
      this.counter--;
      if(this.counter == 0) {
        this.currentQuestion++;
        this.counter=60;
      }
    });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000)
  }

  stopCounter() {
    this.interval$.unsubscribe();
    //this.counter=0;
  }

  resetCounter() {
    this.startCounter();
    this.counter=60;
  }

  resetContest() {
    this.resetCounter();
    this.getData();
    this.points=0;
    this.counter=60;
    this.currentQuestion = 0;
    this.correctAnswer = 0;
    this.inCorrectAnswer = 0;
  }

  getProgressPercent() {
    this.progress = ((this.currentQuestion/this.questions.length) * 100);
    return this.progress;
  }

  submitResult() {
    let data = {
      "questionAnswers": this.qProgress
    }
    this.appService.saveResult(data).subscribe((data: any) => {
      console.log("data :: ", data)
		});
  }
}
