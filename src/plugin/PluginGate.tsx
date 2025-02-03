import React, { useEffect, useState } from "react";
import {isAvailable, onReady} from "./Owlbear";

/**
 * Only render the children when we're within a plugin
 * and that plugin is ready.
 */
export function PluginGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (isAvailable()) {
      onReady(() => setReady(true));
    }
  }, []);

  if (ready) {
    return <>{children}</>;
  } else {
    return null;
  }
}
