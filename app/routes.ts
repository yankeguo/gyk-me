import { type RouteConfig, index, prefix } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  // Chinese mirrors the English tree under `/zh`. Route ids must be unique, so
  // each locale has its own module that re-exports the shared page.
  ...prefix("zh", [index("routes/zh/home.tsx")]),
] satisfies RouteConfig;
