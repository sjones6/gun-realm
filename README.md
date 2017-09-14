# Gun-Realm

Store [GunJS](https://github.com/amark/gun) graph data in [RealmJS](https://realm.io/docs/javascript/latest/#getting-started) for React Native apps.

## Motivation

In most apps, you will want to keep local state of your Gunjs data between application sessions and when offline. In the browser, Gun will dump to local storage to provide offline capabilities. This wires up your Gun database to a Realm store for fast and 

For an alternative with AsyncStorage, see Andre Staltz's [gun-asyncstorage](https://github.com/staltz/gun-asyncstorage).

## Installation

Clone this repo (eventually will be available on `npm`).

```javascript

// Still working out bugs when loading Gun in React Native
import Gun from 'gun/gun';
import registerGunRealm from './gun-realm/register';
registerGunRealm(Gun);

let gun = new Gun();
```

### WARNING

NOT production ready. Does not handle boolean values

## Caution about Expo

Currently, Expo does not support [Realm](https://forums.expo.io/t/is-realm-support-for-expo-coming/31), but you can detach your app or use a simple `react-native init` type [install](https://facebook.github.io/react-native/docs/getting-started.html). Eventually, support for Realm may be built in to Expo which will take away some of the manual steps required.

## Issues

Issues welcome on [Github](https://github.com/sjones6/gun-realm).