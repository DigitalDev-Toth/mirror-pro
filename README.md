Mirror Profesional
=============

<p align="center"><img src="http://www.toth.cl/toth/img/mirror.png" alt="mirro alt" /></p>

(http://toth.cl:88/digitaldev-toth/mirror-pro/badge?branch=master)

## Indicate for Use ##

Node v5.0.0

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

Testing deploy to cao and cisanmartin - intent 18