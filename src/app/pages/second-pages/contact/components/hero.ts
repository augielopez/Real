import { Component, computed, inject } from "@angular/core";
import { LayoutService } from "@/layout/service/layout.service";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { CommonModule } from "@angular/common";
import { AppNavbar } from "@/layout/components/app.navbar";
import { CirclePattern } from "@/layout/components/circlepattern";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { SplitButtonModule } from "primeng/splitbutton";
import { MenuModule } from "primeng/menu";
import { TextareaModule } from "primeng/textarea";

@Component({
  selector: "contact-hero",
  standalone: true,
  imports: [
    AnimatedContainer,
    CommonModule,
    CirclePattern,
    AppNavbar,
    InputTextModule,
    ButtonModule,
    TextareaModule,
    SplitButtonModule,
    MenuModule,
  ],
  template: `
    <animated-container
      [className]="isWide() ? 'relative bg-main-gradient' : 'pt-6'"
    >
      <div class="container">
        <div
          [ngClass]="{
            'relative lg:pb-20 pb-6': true,
            'bg-main-gradient rounded-3xl lg:rounded-4xl': !isWide(),
          }"
        >
          <div class="relative z-20">
            <app-navbar />
            <h1
              class="max-w-[calc(100%-3rem)] lg:max-w-5xl mx-auto title lg:text-7xl text-4xl text-center mt-18"
            >
              Get in Touch with Us
            </h1>
            <p
              class="text-base lg:text-xl text-white/64 max-w-[calc(100%-3rem)] lg:max-w-[44rem] mx-auto text-center mt-8"
            >
              We’re here to assist you with any questions or concerns—reach out
              to our dedicated support team anytime.
            </p>
            <div class="mt-16 max-w-[calc(100%-3rem)] lg:max-w-[80rem] mx-auto">
              <div class="flex flex-col gap-8 items-center">
                <!-- Call Miles card placed above the form (outside the form) -->
                <div class="w-full max-w-3xl">
                  <div class="mb-4 p-4 rounded-xl bg-white/6 border border-white/10 flex items-center">
                    <div class="flex-1 min-w-0 pr-4">
                      <h3 class="text-lg font-semibold text-surface-0 mb-1">Call Miles 24/7 - (559) 678 7160</h3>
                      <p class="text-white/64 text-sm">Call anytime to speak with our AI assistant Miles. It can answer questions, collect details, and schedule an appointment with our team.</p>
                    </div>
                    <div class="flex items-center">
                      <p-button label="Call Miles" icon="pi pi-phone" styleClass="button-regular px-6" (onClick)="callPrimary()"></p-button>
                    </div>
                  </div>
                </div>

                <form
                  class="mx-auto w-full max-w-3xl p-6 lg:p-8 rounded-2xl lg:rounded-4xl bg-white/4 backdrop-blur-[48px] border border-white/8 shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]"
                >
                  <div class="flex flex-col gap-6">
                    <div class="flex flex-wrap gap-8">
                      <div class="flex-1 flex flex-col gap-2">
                        <label class="font-medium text-surface-0" for="contact_first_name">First Name</label>
                        <input pInputText id="contact_first_name" class="!bg-white/16 !rounded-full !py-2 !px-4 outline-none !text-white/90 backdrop-blur-[48px] !border-white/12 placeholder:!text-surface-0/60" />
                      </div>
                      <div class="flex-1 flex flex-col gap-2">
                        <label class="font-medium text-surface-0" for="contact_last_name">Last Name</label>
                        <input pInputText id="contact_last_name" class="!bg-white/16 !rounded-full !py-2 !px-4 outline-none !text-white/90 backdrop-blur-[48px] !border-white/12 placeholder:!text-surface-0/60" />
                      </div>
                    </div>
                    <div class="flex flex-col gap-2">
                      <label class="font-medium text-surface-0" for="contact_email">Email Address</label>
                      <input pInputText id="contact_email" class="!bg-white/16 !rounded-full !py-2 !px-4 outline-none !text-white/90 backdrop-blur-[48px] !border-white/12 placeholder:!text-surface-0/60" />
                    </div>
                    <div class="flex flex-col gap-2">
                      <label class="font-medium text-surface-0" for="contact_phone">Phone Number</label>
                      <input pInputText id="contact_phone" class="!bg-white/16 !rounded-full !py-2 !px-4 outline-none !text-white/90 backdrop-blur-[48px] !border-white/12 placeholder:!text-surface-0/60" />
                    </div>
                    <div class="flex flex-col gap-2">
                      <label class="font-medium text-surface-0" for="contact_message">Message</label>
                      <textarea pTextarea id="contact_message" class="resize-none !bg-white/16 !rounded-2xl !px-4 !py-2 outline-none !text-white/90 placeholder:!text-surface-0/60 backdrop-blur-[48px] !border-white/12"></textarea>
                    </div>
                    <button class="button-regular mt-4 w-full">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="absolute inset-0 overflow-hidden hidden lg:block">
            <circle-pattern
              className="absolute w-[86rem] -bottom-full -translate-y-[32%] left-1/2 -translate-x-1/2"
            />
          </div>
        </div>
      </div>
    </animated-container>
  `,
})
export class ContactHero {
  layoutService = inject(LayoutService);

  isDarkTheme = computed(() => this.layoutService.isDarkTheme());

  isWide = computed(() => this.layoutService.isWide());
 
  callItems = [
    {
      label: "+1 (559) 678-7160",
      icon: "pi pi-phone",
      command: () => {
        try {
          window.location.href = "tel:+15596787160";
        } catch {}
      },
    },
  ];

  callPrimary() {
    try {
      window.location.href = "tel:+15596787160";
    } catch {}
  }
}
