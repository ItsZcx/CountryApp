import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  // Declaration of debouncer observable and subscription for later destruction
  private debouncer = new Subject<string>();
  private debouncerSubscription?: Subscription;

  @Input()
  public placeholder: string = "";

  // Previous way of searching in searchbox without debounce
  @Output()
  public onValue    = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  // While writting if value hasn't changed in 0,3s, it will automatically search it
  ngOnInit(): void {
    // We equal the "debouncer" subscription to "debouncerSubscription" for later destruction. MORE INFO on ngOnDestroy
    this.debouncerSubscription = this.debouncer
    .pipe(
      debounceTime(300)
      )
      .subscribe( value => {
        this.onDebounce.emit(value);
      })
    }

  // On destruction of component we unsubsribe to save memory
    // We have to unsubscribe debouncerSubscription because we want to unsubscribe that one subscription on the Observable
    // (every .subscribe on ngOnInit generates one type "Subscription")
    // If we unsubscribed "this.debouncer" we would "kill" all the subscription on the Observable as well as the Observable
    // and we would not be able to use it in the same instance of the component (before the ngOnDestroy) if we wanted to
  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

  // Previous way of searching in searchbox without debounce x2
  emitValue(value: string): void {
    this.onValue.emit(value);
  }

  onKeyPress(value: string): void {
    this.debouncer.next(value)
  }

}
