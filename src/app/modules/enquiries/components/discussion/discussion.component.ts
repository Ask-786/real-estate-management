import { NgForm } from '@angular/forms';
import { EnquiryDiscussionService } from './../../services/enquiry-discussion.service';
import { Component, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css'],
})
export class DiscussionComponent implements OnInit {
  @ViewChild('chatForm') chatForm!: NgForm;

  message: string[] = [];

  constructor(private discussionService: EnquiryDiscussionService) {}

  ngOnInit(): void {
    this.discussionService.getNewMessage().subscribe((message: string) => {
      this.message.push(message);
    });
  }

  onSubmit(value: { message: string }) {
    if (!value.message) return;
    this.discussionService.sendMessage(value.message);
    this.chatForm.reset();
  }
}
