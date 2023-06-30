import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit {

  // Declaration of debouncer observable
  private debouncer = new Subject<string>();

  @Input()
  public placeholder: string = "";

  // Previous way of searching in searchbox without debounce
  @Output()
  public onValue    = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  // While writting if value hasn't changed in 0,3s, it will automatically search it
  ngOnInit(): void {
    this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe( value => {
      this.onDebounce.emit(value);
    })
  }

  // Previous way of searching in searchbox without debounce x2
  emitValue(value: string): void {
    this.onValue.emit(value);
  }

  onKeyPress(value: string): void {
    this.debouncer.next(value)
  }

}
