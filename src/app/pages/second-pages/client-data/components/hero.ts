import { Component, computed, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppNavbar } from "@/layout/components/app.navbar";
import { AuthService } from "@/layout/service/auth.service";
import { LayoutService } from "@/layout/service/layout.service";

@Component({
  selector: "client-data-hero",
  standalone: true,
  imports: [CommonModule, AppNavbar],
  template: `
    <div
      [ngClass]="{
        'relative overflow-hidden': true,
        'bg-main-gradient rounded-3xl lg:rounded-4xl shadow-black-card': !isWide()
      }"
    >
      <div class="relative z-20 px-6">
        <app-navbar />
        <div class="py-16 lg:py-24">
          <h1 class="text-4xl lg:text-6xl font-semibold text-surface-0 text-center">
            Welcome, {{ username() }}
          </h1>
          <p class="text-xl text-white/64 text-center mt-6">
            Your personalized dashboard
          </p>
        </div>
      </div>
    </div>
  `,
})
export class ClientDataHero {
  authService = inject(AuthService);
  layoutService = inject(LayoutService);

  isWide = computed(() => this.layoutService.isWide());
  username = computed(() => this.authService.getUser()?.username || 'User');
}
