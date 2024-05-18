import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() modelId!:string;
  
  @Input('template') template!: TemplateRef<any>;

  @Output() checked = new EventEmitter<boolean>();

  @Input('title') title!: String;

  @Input('showBtn') showBtn = true;

  @Input('submitName') submitName!:String;

  constructor() { }

  ngOnInit() {
  }

  submitConfirm(){
    this.checked.emit(true);
  }

  submitCancel(){
    this.checked.emit(false);
  }


}
