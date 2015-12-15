Mirror Profesional
=============

<p align="center"><img src="http://www.toth.cl/toth/img/mirror.png" alt="mirro alt" /></p>
---
![Strider Badge](http://strider.toth.cl/digitaldev-toth/mirror-pro/badge?branch=master)
---

## Indicate for Use ##

Tested with Node v5.2.0

Depencencies:
```
openjdk-7-jre-headless (for selenium-standalone)
```

Install environment:
```
npm install
npm install -g selenium-standalone
selenium-standalone install
```

Production:
```
npm run build
npm run server
```

Develop:
```
selenium-standalone start
npm run dev
npm run test:unit
npm run test:features
```