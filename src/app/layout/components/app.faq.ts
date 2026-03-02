import { Component, Input } from "@angular/core";
import { twMerge } from "tailwind-merge";
import { AccordionModule } from "primeng/accordion";
import { QuestionsComments } from "./icon/questionscomments";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-faq",
  standalone: true,
  imports: [CommonModule, AccordionModule, QuestionsComments],
  template: `
    <div [class]="twMerge('max-w-[58rem] px-4 mx-auto', className)">
      <div class="icon-box">
        <IconQuestionsComments className="w-9 h-9 lg:w-11 lg:h-11" />
      </div>
      <h1
        class="mt-10 text-center text-3xl lg:text-5xl font-semibold text-surface-950 dark:text-surface-0 leading-tight"
      >
        Frequently <br />
        Asked Questions
      </h1>
      <p class="text-xl text-center text-surface-500 dark:text-white/64 mt-6">
        Find quick answers to common questions about buying and selling homes with us.
      </p>
      <p-accordion
        class="mt-14 flex flex-col gap-4"
        expandIcon="pi pi-plus"
        collapseIcon="pi pi-minus"
      >
        <p-accordion-panel
          *ngFor="let item of faqData; let index = index"
          [value]="index"
          class="rounded-3xl px-6 overflow-hidden shadow-stroke dark:shadow-none !border-0 dark:!border dark:border-white/12"
        >
          <p-accordion-header class="!py-6 !bg-surface-0 dark:!bg-surface-950">
            <h3
              class="text-xl font-semibold text-surface-950 dark:text-surface-0 flex-1"
            >
              {{ item.title }}
            </h3>
          </p-accordion-header>
          <p-accordion-content :pt="{ content: 'dark:!bg-surface-950' }">
            <p
              class="pb-6 text-lg font-medium text-surface-500 dark:text-white/64"
            >
              {{ item.content }}
            </p>
          </p-accordion-content>
        </p-accordion-panel>
      </p-accordion>
    </div>
  `,
  styles: `
    :host ::ng-deep .p-accordioncontent-content {
      @apply dark:bg-surface-950;
    }
  `,
})
export class AppFAQ {
  twMerge = twMerge;

  @Input() className: any = "";

  faqData = [
    {
      title: "How do I schedule a home showing?",
      content:
        "You can schedule a showing by contacting us through the property listing page, calling our office, or using the 'Get Started' form. We’ll coordinate a time that works for you and the seller.",
    },
    {
      title: "How is the listing price determined?",
      content:
        "We perform a Comparative Market Analysis (CMA) using recent local sales, current market conditions, and the unique features of your property to recommend a competitive listing price.",
    },
    {
      title: "What are your fees and commissions?",
      content:
        "Our commission structure is shared upfront during the listing consultation. We focus on delivering value through professional marketing, negotiation, and transaction management to maximize your net proceeds.",
    },
    {
      title: "Do you help buyers with financing?",
      content:
        "Yes — we can connect buyers with trusted lenders and mortgage brokers to explore loan options, pre-qualification, and down payment guidance to make the buying process smoother.",
    },
    {
      title: "How long does it typically take to sell a home?",
      content:
        "Time on market varies by location and price. We’ll provide an estimated timeline during the listing process based on comparable sales and current demand, and actively adjust strategy to reach the right buyers.",
    },
  ];
}
