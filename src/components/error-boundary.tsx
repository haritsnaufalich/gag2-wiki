import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RotateCw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

/**
 * Top-level error boundary. Catches render-time errors anywhere in the
 * descendant tree and renders a recoverable fallback instead of a blank
 * screen. Logs to console for dev; user can reload to retry.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  reset = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen grid place-items-center bg-background text-foreground p-6">
          <div className="max-w-md text-center space-y-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-semibold">Something went sideways</h1>
            <p className="text-sm text-muted-foreground">
              A render error broke this view. Reloading usually clears it. If
              it keeps happening, please file an issue.
            </p>
            <pre className="rounded-lg border border-border bg-card p-3 text-left text-xs text-muted-foreground overflow-auto max-h-40">
              {this.state.error.message}
            </pre>
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={this.reset}
                className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90"
              >
                <RotateCw className="h-4 w-4" /> Try again
              </button>
              <a
                href="/"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-secondary"
              >
                Go home
              </a>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
