import { Component, computed, inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CirclePattern } from "@/layout/components/circlepattern";
import { AppNavbar } from "@/layout/components/app.navbar";
import { InputTextModule } from "primeng/inputtext";
import { FormsModule } from "@angular/forms";
import { CheckboxModule } from "primeng/checkbox";
import { CommonModule } from "@angular/common";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { AugieLopezReaLogo } from "@/layout/components/icon/shapes/augie-lopez-rea-logo";
import { LayoutService } from "@/layout/service/layout.service";
import { RouterLink } from "@angular/router";
import { AppFooter } from "@/layout/components/app.footer";
import { listClients, Client } from "./client.service";
import { AuthService } from "@/layout/service/auth.service";

@Component({
  selector: "signup",
  standalone: true,
  imports: [
    CommonModule,
    AnimatedContainer,
    CirclePattern,
    AppNavbar,
    InputTextModule,
    FormsModule,
    CheckboxModule,
    AugieLopezReaLogo,
    RouterLink,
    AppFooter,
  ],
  template: ` <animated-container
    [className]="isWide() ? 'bg-main-gradient shadow-black-card' : 'pt-6'"
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
              <div
                class="flex items-center justify-center border border-white/8 w-[5.5rem] h-[5.5rem] mx-auto rounded-3xl bg-white/8 backdrop-blur-[48px] shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]"
              >
                <IconShapesAugieLopezReaLogo className="w-10 h-10" />
              </div>
              <h1
                class="text-3xl lg:text-6xl font-semibold text-surface-0 text-center mt-8"
              >
                Sign Up
              </h1>
              <p class="text-xl text-white/64 text-center mt-6">
                {{ stepDescription }}
              </p>

              <!-- Progress bar -->
              <div class="flex items-center justify-center gap-2 mt-8">
                <div
                  *ngFor="let s of [1, 2, 3]; let i = index"
                  class="h-2 rounded-full transition-all"
                  [ngClass]="{
                    'w-12 bg-white': currentStep === s,
                    'w-8 bg-white/30': currentStep !== s
                  }"
                ></div>
              </div>

              <!-- Step 1: Credentials -->
              <form *ngIf="currentStep === 1" (ngSubmit)="onStep1Next()" class="flex flex-col gap-8 mt-16">
                <div class="flex flex-col gap-2">
                  <label for="signup_email" class="text-surface-0">Email Address</label>
                  <input
                    pInputText
                    id="signup_email"
                    [(ngModel)]="email"
                    name="email"
                    type="email"
                    required
                    class="!bg-white/16 !rounded-full !py-2 !px-4 outline-none !text-white/90 backdrop-blur-[48px] !border-white/12 placeholder:!text-surface-0/60 !shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]"
                  />
                  <div *ngIf="step1Submitted && !isValidEmail()" class="text-sm text-red-400">Valid email is required.</div>
                </div>

                <div class="flex flex-col gap-2">
                  <label for="signup_username" class="text-surface-0">Username</label>
                  <input
                    pInputText
                    id="signup_username"
                    [(ngModel)]="username"
                    name="username"
                    required
                    class="!bg-white/16 !rounded-full !py-2 !px-4 outline-none !text-white/90 backdrop-blur-[48px] !border-white/12 placeholder:!text-surface-0/60 !shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]"
                  />
                  <div *ngIf="step1Submitted && !username" class="text-sm text-red-400">Username is required.</div>
                </div>

                <div class="flex flex-col gap-2">
                  <label for="signup_password" class="text-surface-0">Password</label>
                  <input
                    pInputText
                    id="signup_password"
                    [(ngModel)]="password"
                    name="password"
                    type="password"
                    required
                    class="!bg-white/16 !rounded-full !py-2 !px-4 outline-none !text-white/90 backdrop-blur-[48px] !border-white/12 placeholder:!text-surface-0/60 !shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]"
                  />
                  <div *ngIf="step1Submitted && password.length < 8" class="text-sm text-red-400">Password must be at least 8 characters.</div>
                </div>

                <button type="submit" class="button-regular w-full py-3">Next</button>
              </form>

              <!-- Step 2: Select Client -->
              <div *ngIf="currentStep === 2" class="flex flex-col gap-8 mt-16">
                <div class="flex flex-col gap-2">
                  <label class="text-surface-0">Find your profile</label>
                  <input
                    pInputText
                    [(ngModel)]="clientSearchQuery"
                    (input)="onClientSearch()"
                    placeholder="Search by name or email"
                    class="!bg-white/16 !rounded-full !py-2 !px-4 outline-none !text-white/90 backdrop-blur-[48px] !border-white/12 placeholder:!text-surface-0/60"
                  />
                </div>

                <div *ngIf="loadingClients" class="text-center text-white/64">Loading clients...</div>

                <div *ngIf="!loadingClients && filteredClients.length" class="max-h-64 overflow-auto rounded-2xl bg-white/8 border border-white/12 p-2">
                  <button
                    type="button"
                    *ngFor="let client of filteredClients"
                    (click)="selectClient(client)"
                    [ngClass]="{
                      'bg-white/20': selectedClientId === client.id,
                      'hover:bg-white/10': selectedClientId !== client.id
                    }"
                    class="w-full text-left px-4 py-3 rounded-lg text-surface-0 transition-all"
                  >
                    <div class="font-semibold">{{ client.name }}</div>
                    <div class="text-sm text-white/64" *ngIf="client.email">{{ client.email }}</div>
                  </button>
                </div>

                <button type="button" (click)="createNewClient()" class="button-outlined w-full py-3">
                  My name isn't here / Create New Profile
                </button>

                <div class="flex gap-4">
                  <button type="button" (click)="prevStep()" class="button-regular flex-1 py-3">Back</button>
                  <button
                    type="button"
                    (click)="onStep2Next()"
                    [disabled]="!selectedClientId"
                    class="button-regular flex-1 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>

              <!-- Step 3: New Client Form -->
              <form *ngIf="currentStep === 3" (ngSubmit)="onFinalSubmit()" class="flex flex-col gap-8 mt-16">
                <div class="flex flex-col gap-2">
                  <label for="client_name" class="text-surface-0">Name</label>
                  <input
                    pInputText
                    id="client_name"
                    [(ngModel)]="newClientName"
                    name="clientName"
                    required
                    class="!bg-white/16 !rounded-full !py-2 !px-4 outline-none !text-white/90 backdrop-blur-[48px] !border-white/12 placeholder:!text-surface-0/60"
                  />
                  <div *ngIf="step3Submitted && !newClientName" class="text-sm text-red-400">Name is required.</div>
                </div>

                <div class="flex flex-col gap-2">
                  <label for="client_email" class="text-surface-0">Email</label>
                  <input
                    pInputText
                    id="client_email"
                    [(ngModel)]="newClientEmail"
                    name="clientEmail"
                    type="email"
                    required
                    class="!bg-white/16 !rounded-full !py-2 !px-4 outline-none !text-white/90 backdrop-blur-[48px] !border-white/12 placeholder:!text-surface-0/60"
                  />
                  <div *ngIf="step3Submitted && !newClientEmail" class="text-sm text-red-400">Email is required.</div>
                </div>

                <div class="flex flex-col gap-2">
                  <label for="client_phone" class="text-surface-0">Phone Number</label>
                  <input
                    pInputText
                    id="client_phone"
                    [(ngModel)]="newClientPhone"
                    name="clientPhone"
                    required
                    class="!bg-white/16 !rounded-full !py-2 !px-4 outline-none !text-white/90 backdrop-blur-[48px] !border-white/12 placeholder:!text-surface-0/60"
                  />
                  <div *ngIf="step3Submitted && !newClientPhone" class="text-sm text-red-400">Phone is required.</div>
                </div>

                <div class="flex flex-col gap-2">
                  <label for="client_type" class="text-surface-0">Type</label>
                  <div class="relative">
                    <select
                      [(ngModel)]="newClientType"
                      name="clientType"
                      required
                      class="!bg-white/16 !rounded-full !py-2 !px-4 !h-11 outline-none !text-white/90 backdrop-blur-[48px] !border-white/12 appearance-none w-full pr-10"
                    >
                      <option value="">Select type</option>
                      <option>Buyer</option>
                      <option>Seller</option>
                      <option>Investor</option>
                      <option>Other</option>
                    </select>
                    <i class="pi pi-angle-down absolute right-4 top-1/2 -translate-y-1/2 text-white/70"></i>
                  </div>
                  <div *ngIf="step3Submitted && !newClientType" class="text-sm text-red-400">Type is required.</div>
                </div>

                <div *ngIf="statusMessage" class="text-sm text-white/64 text-center">{{ statusMessage }}</div>

                <div class="flex gap-4">
                  <button type="button" (click)="prevStep()" class="button-regular flex-1 py-3">Back</button>
                  <button type="submit" class="button-regular flex-1 py-3">Finish Sign Up</button>
                </div>
              </form>

              <div class="text-center mt-6" *ngIf="currentStep < 3">
                <span class="text-white/64">Already have an account? </span>
                <a
                  routerLink="/second-pages/signin"
                  class="text-surface-0 font-semibold hover:opacity-90 transition-opacity"
                >
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <app-footer className="mt-24" />
  </animated-container>`,
  styles: `
    :host ::ng-deep {
      .p-checkbox-box {
        @apply text-white/90 !w-6 !h-6 !rounded-lg !bg-white/16 !border-white/12 backdrop-blur-[48px] !shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)];
      }
      .p-checkbox-icon {
        @apply text-white !leading-none  !text-xs !text-white;
      }
    }
  `,
})
export class Signup implements OnInit {
  layoutService = inject(LayoutService);
  router = inject(Router);
  authService = inject(AuthService);

  isWide = computed(() => this.layoutService.isWide());

  currentStep = 1;
  statusMessage: string | null = null;

  // Step 1: Auth credentials
  username = "";
  email = "";
  password = "";
  step1Submitted = false;

  // Step 2: Client selection
  clients: Client[] = [];
  filteredClients: Client[] = [];
  clientSearchQuery = "";
  selectedClientId: string | null = null;
  loadingClients = false;

  // Step 3: New client
  newClientName = "";
  newClientEmail = "";
  newClientPhone = "";
  newClientType = "";
  step3Submitted = false;
  isNewClient = false;

  get stepDescription() {
    if (this.currentStep === 1) return "Enter your account credentials.";
    if (this.currentStep === 2) return "Select your client profile.";
    if (this.currentStep === 3) return "Create your client profile.";
    return "";
  }

  async ngOnInit() {
    await this.loadClients();
  }

  async loadClients() {
    this.loadingClients = true;
    try {
      this.clients = await listClients();
      this.filteredClients = this.clients;
    } catch (err) {
      console.error("Failed to load clients:", err);
      this.clients = [];
      this.filteredClients = [];
    } finally {
      this.loadingClients = false;
    }
  }

  isValidEmail() {
    return this.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
  }

  onStep1Next() {
    this.step1Submitted = true;
    if (!this.username || !this.isValidEmail() || this.password.length < 8) {
      return;
    }
    this.currentStep = 2;
  }

  onClientSearch() {
    const query = this.clientSearchQuery.toLowerCase().trim();
    this.filteredClients = query
      ? this.clients.filter(
          (c) =>
            c.name.toLowerCase().includes(query) ||
            (c.email && c.email.toLowerCase().includes(query))
        )
      : this.clients;
  }

  selectClient(client: Client) {
    this.selectedClientId = client.id;
    this.isNewClient = false;
  }

  createNewClient() {
    this.isNewClient = true;
    this.selectedClientId = null;
    this.currentStep = 3;
  }

  onStep2Next() {
    if (!this.selectedClientId) return;
    this.onFinalSubmit();
  }

  async onFinalSubmit() {
    if (this.isNewClient) {
      this.step3Submitted = true;
      if (!this.newClientName || !this.newClientEmail || !this.newClientPhone || !this.newClientType) {
        return;
      }
    }

    this.statusMessage = "Submitting...";

    const payload = {
      auth_info: {
        email: this.email,
        username: this.username,
        password: this.password,
      },
      is_new_client: this.isNewClient,
      client_data: this.isNewClient
        ? {
            name: this.newClientName,
            email: this.newClientEmail,
            phone: this.newClientPhone,
            type: this.newClientType,
          }
        : { id: this.selectedClientId },
      source: "Website - Signup Wizard",
      date_created: new Date().toISOString(),
    };

    try {
      const res = await fetch("https://augielopez.app.n8n.cloud/webhook-test/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      this.statusMessage = "Account created successfully!";
      
      // try parse token info if backend provided it
      let token: string | undefined;
      let expiresAt: number | undefined;
      try {
        const respJson = await res.json();
        token = respJson.token || respJson.access_token || respJson.authToken;
        const expiresIn = respJson.expiresIn || respJson.expires_in;
        expiresAt = respJson.expiresAt || respJson.expires_at || (expiresIn ? Date.now() + Number(expiresIn) * 1000 : undefined);
      } catch (e) {
        // ignore parse errors; fallback to no token
      }

      const userSession = {
        email: this.email,
        username: this.username,
        clientType: (this.isNewClient 
          ? this.newClientType 
          : this.clients.find(c => c.id === this.selectedClientId)?.type || 'Other') as 'Buyer' | 'Seller' | 'Investor' | 'Other',
        isNewClient: this.isNewClient,
        token: token,
        tokenExpiresAt: expiresAt,
      };

      this.authService.login(userSession);
      
      setTimeout(() => {
        this.router.navigate(["/client-data"]);
      }, 1500);
    } catch (err: any) {
      this.statusMessage = "An error occurred. Please try again.";
      console.error("Signup submit error:", err);
      setTimeout(() => (this.statusMessage = null), 4000);
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      if (this.currentStep === 3 && this.isNewClient) {
        this.currentStep = 2;
        this.isNewClient = false;
      } else {
        this.currentStep--;
      }
    }
  }
}
