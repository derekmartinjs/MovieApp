fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew cask install fastlane`

# Available Actions
### prepare4Release
```
fastlane prepare4Release
```


----

## iOS
### ios beta
```
fastlane ios beta
```
Push a new beta build to TestFlight
### ios certificates
```
fastlane ios certificates
```
Fetch certificates and provisioning profiles
### ios build
```
fastlane ios build
```

### ios release
```
fastlane ios release
```


----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
