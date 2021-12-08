import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightSidebarService } from './service/rightsidebar.service';
import { DynamicScriptLoaderService } from './service/dynamic-script-loader.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    RightSidebarService,
    DynamicScriptLoaderService,
  ],
})
export class CoreModule {}
