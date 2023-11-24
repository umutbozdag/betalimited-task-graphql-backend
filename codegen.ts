import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/graphql/schema.ts",
  generates: {
    "./src/__generated__/types/index.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "../../graphql/context#DataSourceContext",
      }
    },
  },
};

export default config;
