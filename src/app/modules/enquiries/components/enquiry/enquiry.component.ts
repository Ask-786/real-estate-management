import { Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-enquiry',
    templateUrl: './enquiry.component.html',
    styleUrls: ['./enquiry.component.css'],
    imports: [MatCard, MatCardHeader, MatCardTitle, MatIconButton, MatIcon, MatCardContent, MatCardActions]
})
export class EnquiryComponent {}
