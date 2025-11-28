// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import history from "connect-history-api-fallback";

// export default defineConfig({
//   plugins: [
//     react(),
//     {
//       name: "spa-fallback",
//       configureServer(server) {
//         server.middlewares.use(
//           history({
//             index: "/index.html",
//             disableDotRule: true,
//           })
//         );
//       },
//     },
//   ],
//   server: {
//     proxy: {
//       "/api": {
//         target: "http://localhost:5000",
//         changeOrigin: true,
//       },
//     },
//   },
// });

export default {
  server: {
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
};
