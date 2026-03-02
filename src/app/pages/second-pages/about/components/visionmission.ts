import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";

@Component({
  selector: "about-vision-mission",
  standalone: true,
  imports: [CommonModule, AnimatedContainer],
  template: ` <div class="container flex flex-col gap-24 lg:gap-40 mt-24">
    <animated-container
      *ngFor="let item of data; let index = index"
      [className]="{
        'flex items-center gap-10 lg:gap-28': true,
        'lg:flex-row flex-col-reverse': index % 2 === 0,
        'lg:flex-row-reverse flex-col': index % 2 !== 0,
      }"
    >
      <div class="flex-1">
        <span class="badge">{{ item.badge }}</span>
        <h6
          class="mt-4 text-3xl lg:text-5xl font-semibold text-surface-950 dark:text-surface-0"
        >
          {{ item.title }}
        </h6>
        <p class="mt-6 text-lg lg:text-xl text-surface-500 dark:text-white/64">
          <span *ngFor="let p of item.text; let j = index">
            {{ p }}
            <ng-container *ngIf="j < item.text.length - 1">
              <br />
              <br />
            </ng-container>
          </span>
        </p>
      </div>
      <div
        class="h-[25rem] w-full lg:flex-1 relative rounded-4xl shadow-blue-card overflow-hidden"
      >
        <img
          class="object-cover w-full h-full"
          [src]="item.image"
          alt="Vision Mission Image"
        />
      </div>
    </animated-container>
  </div>`,
})
export class AboutVisionMission {
  data = [
    {
      badge: "Vision",
      title: "Our Vision",
      text: [
        "To be the trusted local real estate partner, helping every client find a place they’re proud to call home. We envision thriving neighborhoods shaped by thoughtful guidance, strong relationships, and a commitment to ethical service.",
        "We strive to set the standard for client care and market expertise, building lasting value for homeowners and communities alike.",
      ],
      image: "/pages/real-estate/our-vision_files/augie-water-color.png",
    },
    {
      badge: "Mission",
      title: "Our Mission",
      text: [
        "To provide personalized, transparent, and results-driven real estate services that prioritize our clients’ goals. We guide buyers and sellers through every step—offering accurate market insights, tailored marketing strategies, and relentless advocacy.",
        "Through clear communication and local expertise, we aim to make the buying and selling process simple, confident, and successful for each client.",
      ],
      image: "/pages/real-estate/our-mission/showing-water-color.png",
    },
  ];
}
