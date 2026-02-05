import { Component, computed, inject } from "@angular/core";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { AppNavbar } from "@/layout/components/app.navbar";
import { CirclePattern } from "@/layout/components/circlepattern";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { CheckboxModule } from "primeng/checkbox";
import { InputMaskModule } from "primeng/inputmask";
import { RouterModule } from "@angular/router";
import { LayoutService } from "@/layout/service/layout.service";
import { LeadService } from "@/services/lead.service";

@Component({
  selector: "get-started",
  standalone: true,
  imports: [
    CommonModule,
    AnimatedContainer,
    CirclePattern,
    AppNavbar,
    InputTextModule,
    InputMaskModule,
    FormsModule,
    CheckboxModule,
    RouterModule,
  ],
  template: ` <animated-container
    [className]="
      isWide()
        ? 'bg-main-gradient shadow-black-card min-h-screen'
        : 'pt-6 bg-main-gradient min-h-screen'
    "
  >
    <div class="container">
      <div
        [ngClass]="{
          'relative overflow-hidden': true,
          'bg-main-gradient rounded-3xl lg:rounded-4xl shadow-black-card':
            !isWide(),
        }"
      >
        <circle-pattern
          className="w-[82rem] absolute -bottom-1/2 translate-y-24 left-1/2 -translate-x-1/2 lg:block hidden"
        />
        <div class="relative z-20 px-6">
          <app-navbar />
          <div class="pb-6 pt-10 lg:py-24 max-w-[48rem] mx-auto">
            <div
              class="bg-white/4 px-6 md:px-8 pt-16 pb-12 border border-white/8 backdrop-blur-[48px] rounded-2.5xl lg:rounded-4xl shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]"
            >
              <h1
                class="text-3xl lg:text-6xl font-semibold text-surface-0 text-center mt-8"
              >
                Get Started
              </h1>
              <p class="text-xl text-white/64 text-center mt-6">
                Share a few details and we’ll reach out.
              </p>

              <!-- Step 1: Required -->
              <form
                *ngIf="currentStep === 1"
                (ngSubmit)="onNext()"
                class="flex flex-col gap-8 mt-12"
              >
                <div class="flex flex-col md:flex-row gap-4">
                  <div class="flex-1 flex flex-col gap-2">
                    <label for="full_name" class="text-surface-0">Full name</label>
                    <input
                      pInputText
                      id="full_name"
                      [(ngModel)]="fullName"
                      name="fullName"
                      class="!bg-white/16 !rounded-full !py-2 !px-4 outline-none !text-white/90 backdrop-blur-[48px] !border-white/12 placeholder:!text-surface-0/60"
                    />
                    <div *ngIf="submitted && !fullName" class="text-sm text-red-400">Full name is required.</div>
                  </div>

                  <div class="flex-1 flex flex-col gap-2">
                    <label for="email" class="text-surface-0">Email</label>
                    <input
                      pInputText
                      id="email"
                      [(ngModel)]="email"
                      name="email"
                      type="email"
                      class="!bg-white/16 !rounded-full !py-2 !px-4 outline-none !text-white/90 backdrop-blur-[48px] !border-white/12 placeholder:!text-surface-0/60"
                    />
                    <div *ngIf="submitted && !email" class="text-sm text-red-400">Email is required.</div>
                  </div>
                </div>

                <div class="flex flex-col md:flex-row gap-4">
                  <div class="flex-1 flex flex-col gap-2">
                    <label for="phone" class="text-surface-0">Phone number</label>
                    <input
                      pInputText
                      id="phone"
                      [(ngModel)]="phone"
                      (input)="formatPhone($event)"
                      name="phone"
                      class="!bg-white/16 !rounded-full !py-2 !px-4 outline-none !text-white/90 backdrop-blur-[48px] !border-white/12 placeholder:!text-surface-0/60"
                    />
                    <div *ngIf="submitted && !phone" class="text-sm text-red-400">Phone number is required.</div>
                  </div>

                  <div class="flex-1 flex flex-col gap-2">
                    <label class="text-surface-0">Intent</label>
                    <div class="relative">
                      <select
                        [(ngModel)]="intent"
                        name="intent"
                        class="!bg-white/16 !rounded-full !py-2 !px-4 !h-11 outline-none !text-white/90 backdrop-blur-[48px] !border-white/12 appearance-none w-full pr-10"
                      >
                        <option value="">Select intent</option>
                        <option>Buy</option>
                        <option>Sell</option>
                        <option>Buy & Sell</option>
                        <option>Invest</option>
                        <option>Just exploring</option>
                      </select>
                      <i class="pi pi-angle-down absolute right-4 top-1/2 -translate-y-1/2 text-white/70"></i>
                    </div>
                    <div *ngIf="submitted && !intent" class="text-sm text-red-400">Intent is required.</div>
                  </div>
                </div>

                <label class="flex items-center gap-3">
                  <p-checkbox [(ngModel)]="consent" binary="true" name="consent" styleClass="!w-6 !h-6"></p-checkbox>
                  <span class="text-surface-0 font-medium">I agree to be contacted about my request.</span>
                </label>
                <div *ngIf="submitted && !consent" class="text-sm text-red-400">Consent is required.</div>

                <div class="flex items-center gap-3.5 mt-4">
                  <button type="button" (click)="onNext()" class="button-regular w-full py-3">Next</button>
                </div>
              </form>

              <!-- Dynamic Steps -->
              <div *ngIf="currentStep === 2" class="flex flex-col gap-6 mt-12">
                <div class="flex flex-col gap-2">
                  <label class="text-surface-0">Timeframe</label>
                  <div class="relative">
                    <select
                      [(ngModel)]="timeframe"
                      name="timeframe"
                      class="!bg-white/16 !rounded-full !py-2 !px-4 !h-11 outline-none !text-white/90 backdrop-blur-[48px] !border-white/12 appearance-none w-full pr-10"
                    >
                      <option value="">Choose</option>
                      <option>0–3 months</option>
                      <option>3–6 months</option>
                      <option>6+ months</option>
                      <option>Not sure</option>
                    </select>
                    <i class="pi pi-angle-down absolute right-4 top-1/2 -translate-y-1/2 text-white/70"></i>
                  </div>
                </div>

                <div class="flex flex-col gap-2">
                  <label class="text-surface-0">Area (City / ZIP)</label>
                  <div class="relative">
                    <input
                      pInputText
                      id="area-ac"
                      [(ngModel)]="areaQuery"
                      (input)="onAreaQueryChange()"
                      (keydown)="onAreaKeydown($event)"
                      (focus)="showSuggestions = true"
                      (blur)="hideSuggestions()"
                      name="areaQuery"
                      placeholder="Start typing a city"
                      role="combobox"
                      aria-autocomplete="list"
                      [attr.aria-expanded]="showSuggestions && filteredCities.length ? 'true' : 'false'"
                      aria-controls="area-options"
                      [attr.aria-activedescendant]="activeIndex >= 0 ? 'area-option-' + activeIndex : null"
                      class="!bg-white/16 !rounded-full !py-2 !px-4 !h-11 w-full outline-none !text-white/90 backdrop-blur-[48px] !border-white/12 placeholder:!text-surface-0/60"
                    />
                    <div
                      *ngIf="showSuggestions && filteredCities.length"
                      id="area-options"
                      role="listbox"
                      class="absolute z-20 mt-2 w-full max-h-56 overflow-auto rounded-2xl bg-surface-0 shadow-blue-card p-2"
                    >
                      <button
                        type="button"
                        *ngFor="let city of filteredCities; let i = index"
                        (mousedown)="addCity(city)"
                        [attr.id]="'area-option-' + i"
                        role="option"
                        [attr.aria-selected]="i === activeIndex"
                        [ngClass]="{
                          'bg-surface-200 text-surface-950': i === activeIndex,
                          'text-surface-500': i !== activeIndex
                        }"
                        class="w-full text-left px-3 py-2 rounded-lg font-medium hover:bg-surface-200 hover:text-surface-950"
                      >
                        {{ city }}
                      </button>
                    </div>
                  </div>
                  <div *ngIf="area.length" class="flex flex-wrap gap-2 mt-2">
                    <span
                      *ngFor="let city of area"
                      class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/8 border border-white/12 text-surface-0 text-sm"
                    >
                      {{ city }}
                      <button type="button" (click)="removeCity(city)" class="text-surface-0/70 hover:text-surface-0">
                        ✕
                      </button>
                    </span>
                  </div>
                </div>

                <div class="flex flex-col gap-2">
                  <label class="text-surface-0">
                    {{ priceLabel }}
                  </label>
                  <div class="relative">
                    <select
                      [(ngModel)]="priceBand"
                      name="priceBand"
                      class="!bg-white/16 !rounded-full !py-2 !px-4 !h-11 outline-none !text-white/90 backdrop-blur-[48px] !border-white/12 appearance-none w-full pr-10"
                    >
                      <option value="">Choose</option>
                      <option>$0–$200k</option>
                      <option>$200k–$400k</option>
                      <option>$400k–$600k</option>
                      <option>$600k–$800k</option>
                      <option>$800k–$1M</option>
                      <option>$1M+</option>
                      <option>Not Sure</option>
                    </select>
                    <i class="pi pi-angle-down absolute right-4 top-1/2 -translate-y-1/2 text-white/70"></i>
                  </div>
                </div>

                <div class="flex items-center gap-3.5 mt-4">
                  <button class="button-regular" (click)="onBack()">Back</button>
                  <button class="button-regular ml-auto" (click)="onFinalSubmit()">Submit</button>
                </div>
              </div>

              <!-- Confirmation -->
              <div *ngIf="currentStep === 3" class="text-center mt-12">
                <h2 class="text-2xl text-surface-0 font-semibold mb-4">Thank you</h2>
                <p class="text-white/64 mb-6">We received your request. We’ll reach out soon.</p>
                <a routerLink="/" class="button-regular">Back to Home</a>
              </div>

              <div *ngIf="error" class="mt-4 text-sm text-red-400">{{ error }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </animated-container>`,
  styles: [],
})
export class GetStarted {
  layoutService = inject(LayoutService);
  leadService: LeadService = inject(LeadService);

  isWide = computed(() => this.layoutService.isWide());

  // form state
  fullName = "";
  email = "";
  phone = "";
  intent = "";
  consent = false;

  // optional
  timeframe = "";
  area: string[] = [];
  priceBand = "";

  // city suggestions
  areaQuery = "";
  filteredCities: string[] = [];
  showSuggestions = false;
  activeIndex = -1;
  cities: string[] = [
    "Auberry",
    "Big Creek",
    "Biola",
    "Cantua Creek",
    "Caruthers",
    "Clovis",
    "Coalinga",
    "Del Rey",
    "Dunlap",
    "Firebaugh",
    "Five Points",
    "Fowler",
    "Fresno",
    "Friant",
    "Helm",
    "Huron",
    "Kerman",
    "Kingsburg",
    "Lakeshore",
    "Laton",
    "Mendota",
    "Miramonte",
    "Orange Cove",
    "Parlier",
    "Prather",
    "Raisin City",
    "Reedley",
    "Riverdale",
    "San Joaquin",
    "Sanger",
    "Selma",
    "Shaver Lake",
    "Squaw Valley",
    "Tollhouse",
    "Tranquillity",
  ];

  // wizard
  currentStep = 1;
  leadId: string | null = null;
  submitted = false;
  error: string | null = null;

  get priceLabel() {
    if (this.intent === "Buy" || this.intent === "Invest") return "Budget range";
    if (this.intent === "Sell") return "Estimated home value";
    if (this.intent === "Buy & Sell") return "Which range best fits right now?";
    return "Price range";
  }

  async onSubmit(finalSubmit: boolean) {
    // Deprecated: keep for compatibility; use onNext() and onFinalSubmit() instead.
    this.onNext();
  }

  onNext() {
    this.submitted = true;
    this.error = null;
    // First step only requires name and phone
    if (!this.fullName || !this.phone) {
      this.error = "Please provide your name and phone number.";
      return;
    }
    // Just advance UI to step 2; do not send payload yet.
    this.currentStep = 2;
  }

  async onFinalSubmit() {
    // Final submit: send full payload to webhook, create or update lead accordingly.
    this.error = null;
    try {
      const payload = {
        full_name: this.fullName,
        email: this.email,
        phone: this.phone,
        intent: this.intent,
        consent: this.consent,
        status: "New",
        call_ready: true,
        source: "Website",
        step: "final",
        timeframe: this.timeframe,
        area: Array.isArray(this.area) ? this.area.join(", ") : this.area,
        price_band: this.priceBand,
        date_created: new Date().toISOString(),
      };

      if (this.leadId) {
        await this.leadService.updateLead(this.leadId, { ...payload });
      } else {
        const res = await this.leadService.insertLead(payload);
        this.leadId = res?.id ?? res?.ID ?? res?.recordId ?? null;
      }

      this.currentStep = 3;
    } catch (err: any) {
      this.error = err?.message ?? "An unexpected error occurred.";
    }
  }

  async onBack() {
    if (this.currentStep > 1) this.currentStep -= 1;
  }

  async onSkip() {
    // advance to confirmation without updating optional fields
    this.currentStep = 3;
  }

  onAreaQueryChange() {
    const q = this.areaQuery.trim().toLowerCase();
    this.filteredCities = q
      ? this.cities.filter((c) => c.toLowerCase().includes(q))
      : this.cities.slice(0, 8);
    this.showSuggestions = true;
    this.activeIndex = this.filteredCities.length ? 0 : -1;
  }

  addCity(city: string) {
    if (!this.area.includes(city)) {
      this.area = [...this.area, city];
    }
    this.areaQuery = "";
    this.filteredCities = [];
    this.showSuggestions = false;
    this.activeIndex = -1;
  }

  removeCity(city: string) {
    this.area = this.area.filter((c) => c !== city);
  }

  hideSuggestions() {
    // allow click selection before closing
    setTimeout(() => {
      this.showSuggestions = false;
      this.activeIndex = -1;
    }, 150);
  }

  onAreaKeydown(event: KeyboardEvent) {
    if (!this.showSuggestions) {
      if (event.key === "ArrowDown" && this.filteredCities.length) {
        this.showSuggestions = true;
        this.activeIndex = 0;
        event.preventDefault();
      }
      return;
    }

    if (event.key === "ArrowDown") {
      if (this.filteredCities.length) {
        this.activeIndex =
          this.activeIndex < this.filteredCities.length - 1
            ? this.activeIndex + 1
            : 0;
        event.preventDefault();
      }
    } else if (event.key === "ArrowUp") {
      if (this.filteredCities.length) {
        this.activeIndex =
          this.activeIndex > 0
            ? this.activeIndex - 1
            : this.filteredCities.length - 1;
        event.preventDefault();
      }
    } else if (event.key === "Enter") {
      if (this.activeIndex >= 0 && this.filteredCities[this.activeIndex]) {
        this.addCity(this.filteredCities[this.activeIndex]);
        event.preventDefault();
      }
    } else if (event.key === "Escape") {
      this.showSuggestions = false;
      this.activeIndex = -1;
    }
  }

  formatPhone(event: any) {
    const el = event.target as HTMLInputElement;
    let digits = (el.value || "").replace(/\D/g, "").slice(0, 10);
    let formatted = digits;
    if (digits.length > 6) {
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    } else if (digits.length > 3) {
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else if (digits.length > 0) {
      formatted = `(${digits}`;
    }
    this.phone = formatted;
    el.value = formatted;
  }
}

