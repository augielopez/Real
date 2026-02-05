import { AppLayout } from "@/layout/components/app.layout";
import { Routes } from "@angular/router";

export const appRoutes: Routes = [
  {
    path: "",
    component: AppLayout,
    children: [
      {
        path: "",
        loadComponent: () =>
          import("./app/pages/real-estate/index").then((c) => c.RealEstate),
      },
      {
        path: "real-estate",
        redirectTo: "",
        pathMatch: "full",
      },
      {
        path: "real-estate",
        loadComponent: () =>
          import("./app/pages/real-estate/index").then((c) => c.RealEstate),
      },
      {
        path: "logistic",
        loadComponent: () =>
          import("./app/pages/logistic/index").then((c) => c.Logistic),
      },
      {
        path: "help",
        loadComponent: () =>
          import("./app/pages/help-center/index").then((c) => c.HelpCenter),
      },
      {
        path: "get-started",
        loadComponent: () =>
          import("./app/pages/get-started/index").then((c) => c.GetStarted),
      },
      {
        path: "404",
        loadComponent: () => import("./app.error").then((c) => c.Error),
      },
      {
        path: "second-pages",
        children: [
          {
            path: "about",
            loadComponent: () =>
              import("./app/pages/second-pages/about/index").then(
                (c) => c.About
              ),
          },
          {
            path: "contact",
            loadComponent: () =>
              import("./app/pages/second-pages/contact/index").then(
                (c) => c.Contact
              ),
          },
          {
            path: "signup",
            loadComponent: () =>
              import("./app/pages/second-pages/signup/index").then(
                (c) => c.Signup
              ),
          },
          {
            path: "signin",
            loadComponent: () =>
              import("./app/pages/second-pages/signin/index").then(
                (c) => c.Signin
              ),
          },
          {
            path: "error",
            loadComponent: () => import("./app.error").then((c) => c.Error),
          },
          {
            path: "reset-password",
            loadComponent: () =>
              import("./app/pages/second-pages/reset-password/index").then(
                (c) => c.ResetPassword
              ),
          },
          {
            path: "account",
            loadComponent: () =>
              import("./app/layout/components/app.accountlayout").then(
                (c) => c.AccountLayout
              ),
            children: [
              {
                path: "",
                loadComponent: () =>
                  import("./app/pages/second-pages/account/index").then(
                    (c) => c.Account
                  ),
              },
              {
                path: "privacy-security",
                loadComponent: () =>
                  import(
                    "./app/pages/second-pages/account/privacy-security/index"
                  ).then((c) => c.PrivacySecurity),
              },
              {
                path: "subscription-billing",
                loadComponent: () =>
                  import(
                    "./app/pages/second-pages/account/subscription-billing/index"
                  ).then((c) => c.SubscriptionBilling),
              },
              {
                path: "support",
                loadComponent: () =>
                  import("./app/pages/second-pages/account/support/index").then(
                    (c) => c.Support
                  ),
              },
            ],
          },
        ],
      },
    ],
  },

  { path: "**", redirectTo: "/404" },
];
