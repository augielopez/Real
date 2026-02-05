import { Component } from "@angular/core";
import { RealEstateHero } from "./components/hero";
import { RealEstatePartner } from "./components/partner";
import { RealEstateListing } from "./components/listing";
import { RealEstateBestProjectsFirst } from "./components/bestprojectsfirst";
import { RealEstateWorkflow } from "./components/workflow";
import { RealEstateTestimonials } from "./components/testimonial";
import { RealEstateCTA } from "./components/cta";
import { RealEstateBestProjectsSecond } from "./components/bestprojectssecond";
import { AppFooterWithCTA } from "@/layout/components/app.footerwithcta";

@Component({
  selector: "real-estate",
  standalone: true,
  imports: [
    RealEstateHero,
    RealEstatePartner,
    RealEstateListing,
    RealEstateBestProjectsFirst,
    RealEstateWorkflow,
    RealEstateTestimonials,
    RealEstateCTA,
    RealEstateBestProjectsSecond,
    AppFooterWithCTA,
  ],
  template: ` <real-estate-hero />
    <real-estate-partner />
    <real-estate-listing />
    <real-estate-best-projects-first />
    <real-estate-workflow />
    <real-estate-testimonials />
    <real-estate-cta />
    <real-estate-best-projects-second />
    <app-footer-with-cta className="mt-64" />`,
})
export class RealEstate {}
