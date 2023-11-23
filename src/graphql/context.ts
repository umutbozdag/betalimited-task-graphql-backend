import { RestAPI } from "../datasources/api";

export type DataSourceContext = {
  dataSources: {
    restAPI: RestAPI;
  };
  request?: any;
};
