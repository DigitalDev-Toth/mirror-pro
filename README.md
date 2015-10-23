Mirror Profesional
=============

<p align="center"><img src="http://www.toth.cl/toth/img/mirror.png" alt="mirro alt" /></p>

## Indicate for Use ##

Node v4.2.1

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
npm run watch (watch test files)
```

CI
```
npm run test:unit
npm run test:features
```