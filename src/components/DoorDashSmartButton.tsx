'use client';

import { useEffect } from 'react';

import { DOORDASH_SMART_BUTTON_CONFIG, DOORDASH_STOREFRONT } from '@/config/doordash';

type DoorDashSmartButtonConfig = typeof DOORDASH_SMART_BUTTON_CONFIG;
type StorefrontSDKCommand = 'renderFloatingButton';
type StorefrontSDKCommandHandler = (
  command: StorefrontSDKCommand,
  config: DoorDashSmartButtonConfig
) => void;

type StorefrontSDK = {
  executeCommand?: StorefrontSDKCommandHandler;
  executeCmd?: StorefrontSDKCommandHandler;
  buffer?: [StorefrontSDKCommand, DoorDashSmartButtonConfig][];
};

declare global {
  interface Window {
    StorefrontSDK?: StorefrontSDK;
    StorefrontSDKObject?: 'StorefrontSDK';
  }
}

function renderDoorDashSmartButton() {
  const sdk = window.StorefrontSDK;

  if (typeof sdk?.executeCommand === 'function') {
    sdk.executeCommand('renderFloatingButton', DOORDASH_SMART_BUTTON_CONFIG);
    return;
  }

  if (typeof sdk?.executeCmd === 'function') {
    sdk.executeCmd('renderFloatingButton', DOORDASH_SMART_BUTTON_CONFIG);
  }
}

function initializeDoorDashSDK() {
  if (window.StorefrontSDK) {
    return;
  }

  window.StorefrontSDKObject = 'StorefrontSDK';
  window.StorefrontSDK = {
    executeCommand(command, config) {
      window.StorefrontSDK?.buffer?.push([command, config]);
    },
    buffer: [],
  };
}

function loadDoorDashSDK() {
  if (document.getElementById('doordash-storefront-sdk')) {
    return;
  }

  const firstHeadChild = document.head.children[0];
  const script = document.createElement('script');
  script.id = 'doordash-storefront-sdk';
  script.async = true;
  script.src = DOORDASH_STOREFRONT.sdkUrl;

  document.head.insertBefore(script, firstHeadChild);
}

export default function DoorDashSmartButton() {
  useEffect(() => {
    initializeDoorDashSDK();
    renderDoorDashSmartButton();
    loadDoorDashSDK();
  }, []);

  return null;
}
