import { Component } from "@angular/core";
import { AboutVisionMission } from "./components/visionmission";
import { AboutTestimonials } from "./components/testimonials";
import { AboutTeam } from "./components/team";
import { AppFAQ } from "@/layout/components/app.faq";
import { RealEstateHero } from "@/pages/real-estate/components/hero";
import { AppFooter } from "@/layout/components/app.footer";

@Component({
  selector: "about",
  standalone: true,
  imports: [
    RealEstateHero,
    AboutVisionMission,
    AboutTestimonials,
    AboutTeam,
    AppFAQ,
    AppFooter
],
  template: `<real-estate-hero />
    <about-vision-mission />
    <about-testimonials />
    <about-team />
    <app-faq className="mt-64" />
    <app-footer className="mt-64" />`,
})
export class About {}
