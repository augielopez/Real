import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { ClientDataHero } from "./components/hero";
import { BuyerDashboard } from "./components/buyer-dashboard";
import { SellerDashboard } from "./components/seller-dashboard";
import { AppFooter } from "@/layout/components/app.footer";
import { AuthService } from "@/layout/service/auth.service";
import { LayoutService } from "@/layout/service/layout.service";
import { SupabaseService } from "@/layout/service/supabase.service";
import { ClientData as ClientDataType } from "@/supabase/api/client-data.api";

@Component({
  selector: "client-data",
  standalone: true,
  imports: [
    CommonModule,
    AnimatedContainer,
    ClientDataHero,
    BuyerDashboard,
    SellerDashboard,
    AppFooter,
  ],
  template: `
    <animated-container
      [className]="isWide() ? 'bg-main-gradient shadow-black-card' : 'pt-6'"
    >
      <client-data-hero></client-data-hero>
      <div class="container">
        <div *ngIf="loading()" class="py-16 lg:py-24 text-center">
          <p class="text-xl text-surface-600 dark:text-surface-400">Loading your data...</p>
        </div>
        <div *ngIf="!loading() && error()" class="py-16 lg:py-24 text-center">
          <p class="text-xl text-red-600 dark:text-red-400">{{ error() }}</p>
        </div>
        <buyer-dashboard *ngIf="!loading() && !error() && isBuyer()" [clientData]="clientData()"></buyer-dashboard>
        <seller-dashboard *ngIf="!loading() && !error() && isSeller()" [clientData]="clientData()"></seller-dashboard>
      </div>
      <app-footer className="mt-24" />
    </animated-container>
  `,
})
export class ClientData implements OnInit {
  authService = inject(AuthService);
  layoutService = inject(LayoutService);
  supabaseService = inject(SupabaseService);

  isWide = computed(() => this.layoutService.isWide());
  user = computed(() => this.authService.getUser());
  
  isBuyer = computed(() => this.user()?.clientType === 'Buyer');
  isSeller = computed(() => this.user()?.clientType === 'Seller');

  clientData = signal<ClientDataType | null>(null);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  async ngOnInit() {
    await this.loadClientData();
  }

  async loadClientData() {
    const user = this.user();
    if (!user?.email) {
      this.error.set('No user session found');
      this.loading.set(false);
      return;
    }

    try {
      this.loading.set(true);
      this.error.set(null);

      const data = await this.supabaseService.getClientData(user.email);
      
      if (data) {
        this.clientData.set(data);
      } else {
        this.error.set('No client data found');
      }
    } catch (err: any) {
      console.error('Error loading client data:', err);
      this.error.set('Failed to load client data');
    } finally {
      this.loading.set(false);
    }
  }
}
