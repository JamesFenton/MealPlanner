import React from "react";

interface SpinnerProps {
  center?: boolean;
}

export const Spinner: React.FunctionComponent<SpinnerProps> = ({ center }) => {
  return (
    <div className={center ? "text-center" : ""}>
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
