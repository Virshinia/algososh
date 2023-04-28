import { defineConfig } from "cypress";
import {MAIN_URL} from "./src/constants/utils";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
      baseUrl: MAIN_URL,
  },
});
