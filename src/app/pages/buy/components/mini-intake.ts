import { Component, EventEmitter, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { InputNumberModule } from "primeng/inputnumber";
import { ButtonModule } from "primeng/button";
import { LeadService } from "@/services/lead.service";

interface MiniFilters {
  city?: string;
  bedrooms?: number | null;
  bathrooms?: number | null;
  maxPrice?: number | null;
}

@Component({
  selector: "mini-intake",
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, InputNumberModule, ButtonModule],
  template: `
    <div class="bg-white/4 px-6 md:px-8 py-6 border border-white/8 backdrop-blur-[48px] rounded-2xl lg:rounded-3xl shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset] max-w-[68rem] w-[92%] mx-auto">
      <form (ngSubmit)="onSubmit()" class="flex flex-col lg:flex-row gap-6 items-end">
        <div class="lg:max-w-48 flex flex-col gap-2">
          <label class="text-surface-0 text-sm">Where are you looking?</label>
          <input pInputText [(ngModel)]="city" name="city" placeholder="City or ZIP" class="!bg-white/16 !rounded-full !py-2 !px-4 outline-none !text-white/90 placeholder:!text-surface-0/60" />
        </div>

        <div class="w-36 flex flex-col gap-2">
          <label class="text-surface-0 text-sm">Beds</label>
          <div class="relative">
            <select
              [(ngModel)]="bedrooms"
              name="bedrooms"
              class="!bg-white/16 !rounded-full !py-2 !px-4 !h-11 outline-none !text-white/90 backdrop-blur-[48px] !border-white/12 appearance-none w-full pr-10"
            >
              <option *ngFor="let b of bedOptions" [ngValue]="b.value">{{ b.label }}</option>
            </select>
            <i class="pi pi-angle-down absolute right-4 top-1/2 -translate-y-1/2 text-white/70"></i>
          </div>
        </div>

        <div class="w-36 flex flex-col gap-2">
          <label class="text-surface-0 text-sm">Baths</label>
          <div class="relative">
            <select
              [(ngModel)]="bathrooms"
              name="bathrooms"
              class="!bg-white/16 !rounded-full !py-2 !px-4 !h-11 outline-none !text-white/90 backdrop-blur-[48px] !border-white/12 appearance-none w-full pr-10"
            >
              <option *ngFor="let b of bathOptions" [ngValue]="b.value">{{ b.label }}</option>
            </select>
            <i class="pi pi-angle-down absolute right-4 top-1/2 -translate-y-1/2 text-white/70"></i>
          </div>
        </div>

        <div class="w-48 flex flex-col gap-2">
          <label class="text-surface-0 text-sm">Max price</label>
          <p-inputNumber [(ngModel)]="maxPrice" name="maxPrice" [min]="0" inputId="maxPrice" inputStyleClass="!rounded-full !px-4 !py-2 !bg-white/16 !text-white/90" ></p-inputNumber>
        </div>

        <div class="flex flex-row gap-4">
          <div class="flex items-center gap-3.5 mt-4">
            <button type="button" (click)="reset()" class="!bg-white button-regular w-full py-3">Clear</button>
          </div>

          <div class="flex items-center gap-3.5 mt-4">
            <button type="submit" class="button-gradient w-full py-3">Get Started</button>
          </div>
        </div>
      </form>
      <div *ngIf="statusMessage" class="mt-3 text-sm text-surface-500">{{ statusMessage }}</div>
    </div>
  `,
})
export class MiniIntake {
  @Output() submitted = new EventEmitter<MiniFilters>();

  city = "";
  bedrooms: number | null = null;
  bathrooms: number | null = null;
  maxPrice: number | null = null;

  statusMessage: string | null = null;
  bedOptions = [
    { label: "Any", value: null },
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5+", value: 5 },
  ];
  bathOptions = [
    { label: "Any", value: null },
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4+", value: 4 },
  ];

  constructor(private leadService: LeadService) {}

  async onSubmit() {
    const payload = {
      full_name: undefined,
      email: undefined,
      phone: undefined,
      intent: "Buy - Mini Intake",
      consent: true,
      status: "New",
      call_ready: false,
      source: "Website - Buy Mini Intake",
      step: "mini",
      timeframe: undefined,
      area: this.city,
      price_band: this.maxPrice ? String(this.maxPrice) : undefined,
      date_created: new Date().toISOString(),
    };

    try {
      const res = await this.leadService.insertLead(payload);
      this.statusMessage = "Thanks — we received your request.";
      this.submitted.emit({
        city: this.city || undefined,
        bedrooms: this.bedrooms ?? undefined,
        bathrooms: this.bathrooms ?? undefined,
        maxPrice: this.maxPrice ?? undefined,
      });
    } catch (err: any) {
      this.statusMessage = "An error occurred. Please try again.";
    }
    setTimeout(() => (this.statusMessage = null), 4000);
  }

  reset() {
    this.city = "";
    this.bedrooms = null;
    this.bathrooms = null;
    this.maxPrice = null;
    this.statusMessage = null;
  }
}

