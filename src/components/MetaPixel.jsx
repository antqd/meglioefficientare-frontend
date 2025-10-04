import { useEffect } from "react";

const PIXEL_ID = "1849717819300907";

export default function MetaPixel() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!window.fbq) {
      const fbq = function (...args) {
        fbq.callMethod ? fbq.callMethod(...args) : fbq.queue.push(args);
      };

      fbq.push = fbq;
      fbq.loaded = true;
      fbq.version = "2.0";
      fbq.queue = [];

      window.fbq = fbq;
      window._fbq = fbq;

      const script = document.createElement("script");
      script.async = true;
      script.src = "https://connect.facebook.net/en_US/fbevents.js";

      const firstScript = document.getElementsByTagName("script")[0];
      firstScript?.parentNode?.insertBefore(script, firstScript);
    }

    window.fbq?.("init", PIXEL_ID);
    window.fbq?.("track", "PageView");
  }, []);

  return (
    <noscript
      dangerouslySetInnerHTML={{
        __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1" alt="" />`,
      }}
    />
  );
}
