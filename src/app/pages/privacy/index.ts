import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { AppFooter } from "@/layout/components/app.footer";

@Component({
  selector: "privacy-policy",
  standalone: true,
  imports: [CommonModule, AnimatedContainer, AppFooter],
  template: `
    <animated-container [className]="'pt-6 min-h-screen'">
      <div class="container py-16">
        <div class="bg-white/4 px-6 md:px-8 py-8 border border-white/8 backdrop-blur-[48px] rounded-2xl lg:rounded-3xl shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset] max-w-[64rem] mx-auto">
          <h1 class="text-3xl lg:text-4xl font-semibold text-surface-0 mb-4">PRIVACY POLICY FOR INDIVIDUALS INTERACTING WITH ALX SYSTEMS</h1>
          <div class="text-sm text-white/70 mb-6">Last Updated: May 8, 2025</div>

          <h2 class="text-xl font-semibold text-surface-0 mt-4">Introduction</h2>
          <p class="mt-2 text-white/70">
            ALX Systems (“ALX Systems,” “we,” “us,” or “our”) provides technologies, AI-powered automation tools, workflow systems, CRM integrations, and related services (collectively, the “Services”).
            This Privacy Policy describes our policies and practices regarding the collection, use, and disclosure of your personal information when you visit our website or interact with our Services.
          </p>

          <h2 class="text-xl font-semibold text-surface-0 mt-6">Personal Information We Collect</h2>
          <h3 class="mt-4 font-semibold text-surface-0">1. Information You Provide to Us</h3>
          <p class="mt-2 text-white/70">
            Personal information you voluntarily provide may include:
          </p>
          <ul class="list-disc ml-6 mt-2 text-white/70">
            <li>First and last name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Business name</li>
            <li>Information submitted through contact forms, booking forms, or audits</li>
            <li>Feedback, inquiries, or other correspondence</li>
            <li>Communication preferences</li>
          </ul>
          <p class="mt-2 text-white/70">We use this information only for the purposes described below or as disclosed at the time of collection.</p>

          <h3 class="mt-4 font-semibold text-surface-0">2. Information Collected Automatically</h3>
          <p class="mt-2 text-white/70">
            We and our service providers may automatically collect certain information when you use our website, including:
          </p>
          <h4 class="mt-2 font-medium text-surface-0">Device Information:</h4>
          <ul class="list-disc ml-6 mt-2 text-white/70">
            <li>IP address</li>
            <li>Browser type</li>
            <li>Operating system</li>
            <li>Device type</li>
            <li>Language settings</li>
            <li>Approximate location (city/state level)</li>
          </ul>
          <h4 class="mt-2 font-medium text-surface-0">Usage Information:</h4>
          <ul class="list-disc ml-6 mt-2 text-white/70">
            <li>Pages visited</li>
            <li>Time spent on pages</li>
            <li>Navigation paths</li>
            <li>Date and time of visits</li>
            <li>Interaction with emails or SMS communications</li>
          </ul>
          <p class="mt-2 text-white/70">
            We may use cookies, web beacons (pixel tags), and analytics tools (such as Google Analytics) to help us improve site performance, analyze traffic, and enhance user experience.
          </p>

          <h2 class="text-xl font-semibold text-surface-0 mt-6">How We Use Your Personal Information</h2>
          <p class="mt-2 text-white/70">We may use your personal information to:</p>
          <ul class="list-disc ml-6 mt-2 text-white/70">
            <li>Provide and operate our Services</li>
            <li>Respond to inquiries and provide customer support</li>
            <li>Schedule consultations or Systems Audits</li>
            <li>Send transactional communications</li>
            <li>Send marketing communications (if you have opted in)</li>
            <li>Improve our Services</li>
            <li>Comply with legal obligations</li>
            <li>Protect against fraud or misuse</li>
          </ul>

          <h2 class="text-xl font-semibold text-surface-0 mt-6">SMS and Marketing Communications</h2>
          <p class="mt-2 text-white/70">
            If you opt in, we may send appointment confirmations, follow-up communications, service-related updates, and marketing messages via email, phone, or SMS. To opt out of SMS, reply STOP. To unsubscribe from emails, use the unsubscribe link included in the email.
            We do not sell personal information and we do not share phone numbers or SMS consent with third parties for marketing purposes.
          </p>

          <h2 class="text-xl font-semibold text-surface-0 mt-6">How We Share Your Personal Information</h2>
          <p class="mt-2 text-white/70">
            We may share personal information with service providers who help operate our business (e.g., hosting providers, CRM platforms, email service providers, analytics providers), professional advisors (lawyers, accountants), and authorities when required by law. We do not sell your personal information or share personal information for third-party marketing purposes.
          </p>

          <h2 class="text-xl font-semibold text-surface-0 mt-6">Data Security</h2>
          <p class="mt-2 text-white/70">
            We implement appropriate technical and organizational safeguards to protect your personal information. However, no method of electronic transmission or storage is 100% secure. We cannot guarantee absolute security.
          </p>

          <h2 class="text-xl font-semibold text-surface-0 mt-6">Data Retention</h2>
          <p class="mt-2 text-white/70">
            We retain personal information only as long as necessary to provide Services, comply with legal obligations, resolve disputes, and enforce agreements.
          </p>

          <h2 class="text-xl font-semibold text-surface-0 mt-6">Your Privacy Rights</h2>
          <p class="mt-2 text-white/70">
            Depending on your state of residence, you may have the right to request access to, correction of, or deletion of your personal information, and to withdraw consent where applicable. To exercise your rights, contact us using the information below.
          </p>

          <h2 class="text-xl font-semibold text-surface-0 mt-6">Children</h2>
          <p class="mt-2 text-white/70">Our Services are not directed to individuals under 18. We do not knowingly collect personal information from children.</p>

          <h2 class="text-xl font-semibold text-surface-0 mt-6">Third-Party Links</h2>
          <p class="mt-2 text-white/70">Our website may contain links to third-party websites. We are not responsible for their privacy practices.</p>

          <h2 class="text-xl font-semibold text-surface-0 mt-6">Changes to This Privacy Policy</h2>
          <p class="mt-2 text-white/70">We may update this Privacy Policy from time to time. The updated version will be posted on this page with a revised “Last Updated” date.</p>

          <h2 class="text-xl font-semibold text-surface-0 mt-6">Contact Information</h2>
          <p class="mt-2 text-white/70">
            If you have questions regarding this Privacy Policy, you may contact us at:
          </p>
          <p class="mt-2 text-white/70">
            ALX Systems<br />
            Email: <a class="underline" href="mailto:support@alxsystems.com">support&#64;alxsystems.com</a>
          </p>
        </div>
      </div>
      <app-footer className="mt-24" />
    </animated-container>
  `,
})
export class Privacy {}

