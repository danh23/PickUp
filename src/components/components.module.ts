import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MapComponent } from "./map/map";
import { MenuComponent } from "./menu/menu";
import { AppModule } from "../app/app.module";
@NgModule({
	declarations: [
		MapComponent,
		MenuComponent,
	],
	imports: [],
	exports: [
		MapComponent,
		MenuComponent,
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
