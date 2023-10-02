import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { theme as defaultTheme } from "@/theme/index";
import { createVuetify } from "vuetify";

/*
The following imports are not needed and can be removed, while for the time
being they must stay because of the use of components in the dynamic form <component />
*/
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default createVuetify({
	theme: {
		defaultTheme: "defaultTheme",
		themes: {
			defaultTheme
		}
	},
	components,
	directives
});
