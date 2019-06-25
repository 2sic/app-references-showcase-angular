import { RuntimeSettings } from '@2sic.com/dnn-sxc-angular';

const set = new RuntimeSettings();
set.ignoreMissing$2sxc = true;
set.ignoreMissingServicesFramework = true;

// The base path to your DNN environment's API
// In most of the cases, this is http://[domain]/DesktopModules/2sxc/API/
set.path = 'http://app-dev.2sxc.org/showcase-references-angular/DesktopModules/2sxc/API/';

// The module and tab id to get data from
set.moduleId = 3952;
set.tabId = 2018;

// In most of the cases, you won't need to set this as it's the same as the module id
// set.contentBlockId = 0;

// Set this value to allow requests to APIs that are secured with anti forgery
// set.antiForgeryToken = 'ThisIsaTestAntiForgeryToken';

// Override the app name - only needed if you do not set module and tabid values
// set.appNameInPath = 'app-dnn-sxc-angular-dev'

export const DnnDevSettings = set;
