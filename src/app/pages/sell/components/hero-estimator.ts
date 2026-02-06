import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "sell-estimator",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-4xl mx-auto">
      <div class="bg-white/6 backdrop-blur-lg rounded-full p-4 lg:p-5 flex items-center gap-4">
        <div class="flex-1 min-w-0">
          <label class="sr-only">Enter your address</label>
          <input
            [(ngModel)]="address"
            name="address"
            placeholder="Where are you looking? (Address, city or ZIP)"
            class="w-full bg-transparent rounded-full px-4 py-3 text-sm text-white placeholder-white/70 border border-white/12 outline-none"
          />
        </div>
        <div class="w-36">
          <label class="sr-only">Unit</label>
          <input
            [(ngModel)]="unit"
            name="unit"
            placeholder="Unit #"
            class="w-full bg-transparent rounded-full px-4 py-3 text-sm text-white placeholder-white/70 border border-white/12 outline-none"
          />
        </div>
        <div>
          <button type="submit" (click)="onNext()" class="button-gradient rounded-full px-5 py-3">Get Estimate</button>
        </div>
      </div>
      <div class="mt-4 flex justify-center gap-6 text-center text-sm text-white/80">
        <div>Multiple estimates</div>
        <div>Actual sold prices</div>
        <div>Potential buyers</div>
      </div>
    </div>
  `,
})
export class SellEstimator {
  address = "";
  unit = "";
  statusMessage: string | null = null;

  onNext() {
    // placeholder — later hook into estimator flow or navigation
    this.statusMessage = "Thanks — we received your request.";
    console.log("Next:", { address: this.address, unit: this.unit });
    setTimeout(() => (this.statusMessage = null), 4000);
  }

  reset() {
    this.address = "";
    this.unit = "";
    this.statusMessage = null;
  }
}

