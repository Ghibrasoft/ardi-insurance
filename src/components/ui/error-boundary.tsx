import { Component, type ReactNode } from "react";
import { Button } from "./button";

interface Props {
  children: ReactNode;
  onBack?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 rounded-xl border border-red-200 bg-red-50 flex flex-col items-center gap-4 text-center">
          <div>
            <p className="text-sm font-medium text-red-600">
              დაფიქსირდა შეცდომა
            </p>
            <p className="text-xs text-red-400 mt-1">
              {this.state.error?.message}
            </p>
          </div>

          <div className="flex gap-3">
            {this.props.onBack && (
              <Button
                onClick={this.props.onBack}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                ← უკან
              </Button>
            )}
            <Button
              onClick={this.handleReset}
              className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors"
            >
              განახლება
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
