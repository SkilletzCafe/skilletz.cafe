import Script from 'next/script';

import { DOORDASH_SMART_BUTTON_CONFIG, DOORDASH_STOREFRONT } from '@/config/doordash';

const doorDashSmartButtonScript = `
  !function(e,t,r,n){var o,c,s;o=e.document,c=t.children[0],s=o.createElement("script"),e.StorefrontSDKObject="StorefrontSDK",e[e.StorefrontSDKObject]={executeCommand:function(t,r){e[e.StorefrontSDKObject].buffer.push([t,r])},buffer:[]},s.async=1,s.src="${DOORDASH_STOREFRONT.sdkUrl}",t.insertBefore(s,c)}(window,document.head);

  StorefrontSDK.executeCommand('renderFloatingButton', ${JSON.stringify(DOORDASH_SMART_BUTTON_CONFIG)});
`;

export default function DoorDashSmartButton() {
  return (
    <Script
      id="doordash-smart-button"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: doorDashSmartButtonScript }}
    />
  );
}
