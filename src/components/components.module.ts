import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MapComponent } from "./map/map";
import { MenuComponent } from "./menu/menu";
import { AppModule } from "../app/app.module";
import { MapControlsComponent } from './map-controls/map-controls';
import { IonicModule } from "ionic-angular";
@NgModule({
	declarations: [
		MapComponent,
		MenuComponent,
    MapControlsComponent,
	],
	imports: [
		IonicModule
	],
	exports: [
		MapComponent,
		MenuComponent,
    MapControlsComponent,
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
