import {ReactNode, PropsWithChildren, useEffect, useState, FC} from "react";
import {isAvailable, onReady} from "./Owlbear";

type PluginGateProps = PropsWithChildren<{
  fallback?: ReactNode
}>

/**
 * Only render the children when we're within a plugin
 * and that plugin is ready.
 */
export const PluginGate = ({ fallback = null, children = null }: PluginGateProps) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (isAvailable()) {
      onReady(() => setReady(true));
    }
  }, []);

  if (ready) {
    return <>{children}</>;
  } else if (fallback) {
    return <>{fallback}</>;
  }
  return null;
}
