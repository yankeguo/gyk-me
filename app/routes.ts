import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

/**
 * Route ids must be unique, so each page has one module per locale under
 * `app/routes/**`; they are one-line re-exports of the page implementations in
 * `app/pages/**`. English is the unprefixed default locale, and Chinese mirrors
 * the same tree under `/zh`.
 *
 * Posts get static routes rather than a `:slug` parameter: the site is
 * prerendered, and only static routes are rendered to HTML at build time. A new
 * post means a new entry here plus its route modules.
 */
export default [
  index("routes/home.tsx"),
  route("posts/policy-rehearsal", "routes/post.policy-rehearsal.tsx"),
  route("posts/random-room", "routes/post.random-room.tsx"),
  route("posts/taste", "routes/post.taste.tsx"),
  route("posts/weft", "routes/post.weft.tsx"),
  route("posts/sensor-actuator", "routes/post.sensor-actuator.tsx"),
  ...prefix("zh", [
    index("routes/zh/home.tsx"),
    route("posts/policy-rehearsal", "routes/zh/post.policy-rehearsal.tsx"),
    route("posts/random-room", "routes/zh/post.random-room.tsx"),
    route("posts/taste", "routes/zh/post.taste.tsx"),
    route("posts/weft", "routes/zh/post.weft.tsx"),
    route("posts/sensor-actuator", "routes/zh/post.sensor-actuator.tsx"),
  ]),
] satisfies RouteConfig;
