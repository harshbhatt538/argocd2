import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>K3s Networking PoC</h1>
    <button (click)="load()">Call Backend</button>

    <pre *ngIf="response">{{ response | json }}</pre>
  `
})
export class AppComponent {
  response: any;

  async load() {
    // We use a relative path here. Nginx will proxy /api -> backend-a
    const res = await fetch("/api/aggregate");
    this.response = await res.json();
  }
}
