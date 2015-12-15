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

## CI-CD Phases ##

Prepare
===
sh /etc/init.d/xvfb start && 
npm run dev & 
sleep 10s 

Test
===
npm run test:units ; 
npm run test:features 

Deploy
===
ssh -T toth@cao.biopacs.com << EOF

cd mirror-pro
git pull
exit

EOF

ssh -T digitaldev@biopacs.cisanmartin.com << EOF

cd mirror-pro 
git pull
exit

EOF

Cleanup
===
killall -9 node && 
sh /etc/init.d/xvfb stop 