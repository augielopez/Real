import { AugieLopezReaRegular } from "@/layout/components/icon/augie-lopez-rea-regular";
import { Component } from "@angular/core";
import { InputText } from "primeng/inputtext";
import { TextareaModule } from "primeng/textarea";

@Component({
  selector: "account",
  standalone: true,
    imports: [AugieLopezReaRegular, InputText, TextareaModule],
  template: ` <div
    class="p-6 md:p-12 rounded-2.5xl lg:rounded-4xl bg-white/16 backdrop-blur-[48px] max-w-[calc(100%-3rem)] lg:max-w-none mx-auto shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]"
  >
    <div
      class="pb-10 border-b border-white/12 flex md:flex-row flex-col items-start gap-4"
    >
      <div class="md:flex-[0.45] flex flex-col gap-1">
        <span class="text-xl font-medium text-surface-0">Your Photo</span>
          <span class="text-white/64"
            >This will be displayed on your profile.</span
        >
      </div>
      <div class="md:flex-[0.55] flex items-center gap-4">
        <div
          class="w-16 h-16 flex items-center justify-center rounded-full bg-white/16 shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]"
        >
          <IconAugieLopezReaRegular />
        </div>
        <button class="text-surface-0 hover:text-surface-200">Update</button>
        <button class="text-red-400 hover:text-red-500">Delete</button>
      </div>
    </div>
    <div class="py-10 border-b border-white/12 flex flex-col gap-10">
      <div class="flex flex-col sm:flex-row gap-2 items-start">
        <div class="sm:flex-[0.45] text-lg text-surface-0 font-medium">
          Username
        </div>
        <div class="sm:flex-[0.55] w-full">
          <input
            pInputText
            fluid
            class="!px-5 !py-3 !bg-white/16 !rounded-full outline-none !text-white/90 backdrop-blur-[48px] !border-white/12 placeholder:!text-surface-0/60 !shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]"
            placeholder="@augielopezrea"
          />
        </div>
      </div>
      <div class="flex flex-col sm:flex-row gap-2 items-start">
        <div class="sm:flex-[0.45] text-lg text-surface-0 font-medium">
          Email
        </div>
        <div class="sm:flex-[0.55] w-full">
          <input
            pInputText
            fluid
            class="!px-5 !py-3 !bg-white/16 !rounded-full outline-none !text-white/90 backdrop-blur-[48px] !border-white/12 placeholder:!text-surface-0/60 !shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]"
            placeholder="info@augielopezrea.com "
          />
        </div>
      </div>
      <div class="flex flex-col sm:flex-row gap-2 items-start">
        <div class="sm:flex-[0.45] text-lg text-surface-0 font-medium">Bio</div>
        <div class="sm:flex-[0.55] w-full">
          <textarea
            pTextarea
            fluid
            class="!px-5 !py-3 !rounded-xl sm:!rounded-3xl !bg-white/16 outline-none !text-white/90 placeholder:!text-surface-0/60 backdrop-blur-[48px] !border-white/12 !shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]"
            placeholder="Write bio"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="py-10 border-b border-white/12 flex flex-col gap-10">
      <div class="flex flex-col sm:flex-row gap-2 items-start">
        <div class="sm:flex-[0.45] text-lg text-surface-0 font-medium">
          Change Password
        </div>
        <div class="sm:flex-[0.55] w-full">
          <input
            pInputText
            fluid
            class="!px-5 !py-3 !bg-white/16 !rounded-full outline-none !text-white/90 backdrop-blur-[48px] !border-white/12 placeholder:!text-surface-0/60 !shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]"
            type="password"
            placeholder="*******"
          />
        </div>
      </div>
      <div class="flex flex-col sm:flex-row gap-2 items-start">
        <div class="sm:flex-[0.45] text-lg text-surface-0 font-medium">
          Enter Password Again
        </div>
        <div class="sm:flex-[0.55] w-full">
          <input
            pInputText
            fluid
            class="!px-5 !py-3 !bg-white/16 !rounded-full outline-none !text-white/90 backdrop-blur-[48px] !border-white/12 placeholder:!text-surface-0/60 !shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]"
            type="password"
            placeholder="*******"
          />
        </div>
      </div>
    </div>
    <div class="pt-10 flex justify-end">
      <button class="button-regular px-5 py-3 min-w-40">Save</button>
    </div>
  </div>`,
})
export class Account {}
