import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

// import pages
import { SignInComponent } from "./sign-in/sign-in.component";

const routes: Routes = [
    { path: "", redirectTo: "/sign-in", pathMatch: "full" },
    { path: "sign-in", component: SignInComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }