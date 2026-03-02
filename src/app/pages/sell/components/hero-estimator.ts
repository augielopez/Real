import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "sell-estimator",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-white/4 px-6 md:px-8 py-6 border border-white/8 backdrop-blur-[48px] rounded-2xl lg:rounded-3xl shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset] max-w-[90rem] w-[98%] mx-auto">
      <h3 class="text-xl lg:text-2xl font-semibold text-surface-0 text-center mb-6">See what your home is worth</h3>
      <form (ngSubmit)="onNext()" class="flex flex-col lg:flex-row gap-6 items-stretch lg:items-end">
        <div class="lg:flex-1 flex flex-col gap-2">
          <label class="text-surface-0 text-sm">Enter your address</label>
          <input
            [(ngModel)]="address"
            name="address"
            placeholder="Address, city or ZIP"
            class="!bg-white/16 !rounded-full !py-2 !px-4 outline-none !text-white/90 placeholder:!text-surface-0/60 w-full"
          />
        </div>

        <div class="w-full sm:w-36 flex flex-col gap-2">
          <label class="text-surface-0 text-sm">Unit Number</label>
          <input
            [(ngModel)]="unit"
            name="unit"
            placeholder="Unit #"
            class="!bg-white/16 !rounded-full !py-2 !px-4 !h-11 outline-none !text-white/90 placeholder:!text-white/70 backdrop-blur-[48px] !border-white/12 w-full"
          />
        </div>

        <div class="flex flex-col sm:flex-row gap-4 sm:items-center w-full sm:w-auto">
          <button type="button"
            (click)="reset()"
            class="!bg-white !text-surface-900 rounded-full px-5 py-3 border border-white/12 shadow-sm w-full sm:w-auto">
            Clear
          </button>

          <button type="submit" class="button-gradient rounded-full px-5 py-3 w-full sm:w-auto">
            Get Estimate
          </button>
        </div>
      </form>
      <div *ngIf="statusMessage" class="mt-3 text-sm text-surface-500">{{ statusMessage }}</div>
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

