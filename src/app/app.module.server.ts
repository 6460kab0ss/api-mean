import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { provideServerRendering } from '@angular/platform-server';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule({
  imports: [AppModule, ServerModule], // Ensure AppModule is imported
  providers: [provideServerRendering()], // Proper SSR support
  bootstrap: [AppComponent] // AppComponent is standalone and should be bootstrapped
})
export class AppServerModule {}
