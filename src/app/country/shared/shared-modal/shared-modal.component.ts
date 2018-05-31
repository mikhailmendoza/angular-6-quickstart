import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'my-shared-modal',
  templateUrl: './shared-modal.component.html',
  styleUrls: ['./shared-modal.component.css']
})
export class SharedModalComponent implements OnInit {
  @Input() modalTitle: string;
  @Input() modalBody: string;
  @Input() mode: string;
  @Input () showModal: boolean;
  @Output() exitSharedModal: EventEmitter<any> = new EventEmitter();
  @Output() proceedTransaction: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  proceed(){
    this.proceedTransaction.emit(true);
  }

  closeConfirmatioModal(){
    this.exitSharedModal.emit(true);
  }
}
