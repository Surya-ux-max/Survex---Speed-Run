import { useState } from 'react';

export function useActiveFeature(initialFeature = 'orchestration') {
  const [activeFeature, setActiveFeature] = useState(initialFeature);

  const toggleFeature = (featureId) => {
    setActiveFeature((prev) => (prev === featureId ? '' : featureId));
  };

  return {
    activeFeature,
    setActiveFeature,
    toggleFeature,
  };
}
