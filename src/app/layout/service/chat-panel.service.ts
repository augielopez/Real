import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class ChatPanelService {
  private _open = new BehaviorSubject<boolean>(false);
  open$ = this._open.asObservable();

  /** Synchronous getter/setter for two-way binding with PrimeNG Drawer */
  get isOpen(): boolean {
    return this._open.value;
  }
  set isOpen(value: boolean) {
    this._open.next(value);
  }
  private _expanded = new BehaviorSubject<boolean>(false);
  expanded$ = this._expanded.asObservable();

  get isExpanded(): boolean {
    return this._expanded.value;
  }
  set isExpanded(value: boolean) {
    this._expanded.next(value);
  }
  toggleExpanded() {
    this._expanded.next(!this._expanded.value);
  }

  open() {
    this._open.next(true);
  }
  close() {
    this._open.next(false);
  }
  toggle() {
    this._open.next(!this._open.value);
  }
}

