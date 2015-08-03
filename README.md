Mirror Estándar v2
=============

<p align="center"><img src="http://www.toth.cl/toth/img/mirror.png" alt="mirro alt" /></p>

## Indicaciones de Uso ##

<p align="justify">Mirror Estándar es un software web de visualización de imágenes médicas propiedad de la empresa chilena Toth Limitada, orientado al uso por parte de médicos clínicos y pacientes. La finalidad es asistir al médico clínico con una herramienta de estudio que le permita tomar mejores decisiones frente un tratamiento, y para el paciente otorgando un medio digital por el cual pueda contar con más opiniones médicas.
Mirror Estándar está diseñado para ser un sistema multidispositivo que facilita el acceso a estudios radiológicos por medio de cualquier dispositivo que cuente con un navegador y conexión a red, permitiendo la manipulación de imágenes, cálculo de medidas, acceso a informes de estudio y presentación de la información del paciente e institución médica.</p>

<p align="justify">Mirror Estándar es un software que necesita conexión a un servicio PACS que proporcione los datos a visualizar, por lo tanto, Mirror Estándar no puede ser utilizado sin contar con dicha conexión. Mirror Estándar no pretende ser un sistema de manejo y almacenamiento de estudios DICOM.
Mirror Estándar utiliza la arquitectura cliente servidor, donde el cliente se ejecuta en el navegador y conectado al servicio PACS del centro médico.
La comunicación entre Mirror Estándar y el servicio PACS se realiza a través de un webservice (cliente servidor) que devuelve la información de los pacientes e institución médica, informes asociados al estudio y acceso a las imágenes. Finalmente la visualización de las imágenes se realiza por medio del protocolo WADO.</p>

<p align="justify">Mirror Estándar en general es usado por médicos clínicos, asistentes, personal de enfermería o pacientes, ya sea en un hospital, clínica, centro radiológico o en el hogar. Mirror Estándar no pretende ser utilizado para diagnósticos primarios.</p>

## Descripción ##

<p align="justify">Mirror Estándar es un software web que funciona en base a un Picture Archiving and Communications System (PACS). Mirror Estándar provee de un acceso seguro a la visualización de los datos de las imágenes médicas y manipulación de las mismas por medio de un navegador en una estación de trabajo o dispositivo móvil conectado al dominio de la institución médica (conexión local o internet).</p>

<p align="justify">Mirror Estándar visualiza y manipula imágenes rasterizadas, por lo cual el servicio PACS debe proveer imágenes DICOM transformadas a formatos soportados por el estándar HTML5 (JPG, PNG, entre otros). De esta forma, Mirror Estándar es capaz de visualizar y manipular imágenes tipo CT, CR, MR, MG y US, en una amplia gama de dispositivos y sin la necesidad de hardware poderoso.
Mirror Estándar puede ser usado en estaciones de trabajo, smartphones, y tablets, siendo el  único requerimiento un navegador soportado.</p>

<p align="justify">Mirror Estándar se caracteriza por ser una herramienta con tiempos de ejecución mínimos y pocas exigencias, ideal para ser utilizado en dispositivos carentes de hardware poderoso. Permitiendo el acceso a estudios médicos a una mayor cantidad de usuarios y entidades médicas de escasos recursos.</p>

## Mirror Estándar v2 ##

<p align="justify">Mirror Estándar v2 es la nueva versión del visor de imágenes médicas propiedad de la empresa chilena Toth Limitada. Esta versión corresponde a una reescritura completa del software, en donde se prima la escalabilidad y mantención del sistema. Además se añaden nuevas características y herramientas que permiten un mejor análisis de estudios radiológicos.</p>

<p align="justify">Mirror Estándar v2 mejora la experiencia de usuario, permitiendo mayor flexibilidad e interacción en el análisis de estudios radiológicos sin perder funcionalidad y rendimiento multidispositivo.</p>

## Características y Funcionalidades ##

<ul>
    <li>
        <p align="justify"><b>Tecnología</b>. Mirror Estándar v2 utiliza tecnología HTML5 con soporte WebGL, Canvas 2D y CSS 3. Mirror Estándar v2 utiliza la mejor tecnología según las capacidades del cliente.</p>
    </li>
    <li>
        <p align="justify"><b>Multidispositivo</b>. Mirror Estándar v2 gracias a su sistema responsivo, es capaz de ser funcional y operativo en diferentes dispositivos, tales como estaciones de trabajo y móviles tipo tablet y smartphones. Mirror Estándar v2 se adapta a las características del cliente.</p>
    </li>
    <li>
        <p align="justify"><b>Navegadores</b>. Mirror Estándar v2 mantiene un amplio soporte con los navegadores existentes.</p>
        <ul>
            <li>Internet Explorer 9+</li>
            <li>Google Chrome</li>
            <li>Mozilla Firefox</li>
            <li>Opera</li>
            <li>Safari</li>
        </ul>
    </li>
    <li>
        <p align="justify"><b>Filtros</b>. Dependiendo de las capacidades del cliente, Mirror Estándar v2 utiliza WebGL, Canvas 2D o CSS 3 para realizar brillo, contraste y negativo.</p>
        <p align="justify">En el caso del brillo y contraste con soporte WebGL, se realiza una conversión para simular el efecto de ventaneo (windowing) para imágenes DICOM, utilizando la siguiente fórmula:</p>
    </li>
</ul>
```
windowCenter = (1.0 - brightness) * 255.0
windowWidth = (1.0 - contrast) * 255.0
```
<ul>
    <li>
        <p align="justify"><b>Escritorios</b>. Corresponde a contextos que visualizan series de imágenes. Mirror Estándar v2 permite tener hasta cuatro escritorios en su versión de escritorio, dos escritorios para tablets y solo un escritorio en smartphones.</p>
        <p align="justify">Cada escritorio es independiente, al que se le adjunta una serie del estudio y en donde se pueden aplicar transformaciones, filtros, cálculo de mediciones y navegación dentro de la serie.</p>
    </li>
    <li>
        <p align="justify"><b>Localizador</b>. En estudios con modalidad CT o MR, Mirror Estándar v2 muestra la ubicación del slice dentro del scout/localizer por medio de una línea horizontal.</p>
    </li>
    <li>
        <p align="justify"><b>Cálculo de mediciones</b>. Mirror Estándar v2 permite calcular distancias, ángulos y áreas, como también el cálculo de unidades de hounsfield para puntos, elipses y polígonos.</p>
    </li>
    <li>
        <p align="justify"><b>Vistas</b>. Con soporte WebGL, Mirror Estándar v2 permite realizar estimaciones de presets de ventaneo (windowing).</p>
    </li>
    <li>
        <p align="justify"><b>Transformaciones</b>. Mirror Estándar v2 permite escalar, mover y rotar al punto de interacción. En estaciones de trabajo se realizan las transformaciones mediante interacciones con el mouse, y para móviles mediante la interacción con dos dedos.</p>
    </li>
    <li>
        <p align="justify"><b>Barra de carga/navegación</b>. Mirror Estándar v2 visualiza la carga de imágenes de una serie por medio de una barra, la cual además permite navegar en la serie seleccionando la altura a la que se desea llegar.</p>
    </li>
    <li>
        <p align="justify"><b>Información de la serie</b>. Mirror Estándar v2 muestra información relevante acerca del estudio y serie en cuestión, y además muestra información respecto a la manipulación que se le ha realizado a la serie.</p>
        <p align="justify">Como información del estudio y serie, Mirror Estándar v2 muestra: nombre del paciente, DNI/Edad del paciente, sexo del paciente, descripción del estudio, ID de la serie, modalidad del estudio y el nombre de la institución.</p>
        <p align="justify">Como datos de manipulación de la serie, Mirror Estándar v2 muestra:</p>
        <ul>
            <li>Window Center y Window Width, siendo estos variables si hay soporte WebGL por parte del cliente.</li>
            <li>Brillo y Contraste, siendo distinta la escala según la tecnología que soporte el cliente.</li>
            <li>Escala y Ángulo de las transformaciones que se hayan realizado.</li>
            <li>Cantidad de imágenes de la serie e imagen que se está visualizando.</li>
            <li>Espesor de la imagen y Ubicación de la imagen en el eje coordenado del dispositivo que realizó el estudio. La ubicación se visualiza sólo en series que contengan más de ocho imágenes.</li>
        </ul>
    </li>
</ul>

## Herramientas ##

<ul>
    <li>
        <p align="justify"><b>Selección de series</b>. Las series se arrastran hacia el escritorio en donde se desea trabajar. En estaciones de trabajo las series se encuentran en la barra de herramientas y en móviles se presiona un botón de la barra de herramientas con el cual se despliegan las series en un menú contextual.</p>
    </li>
    <li>
        <p align="justify"><b>Imitación</b>. Otorga a un escritorio la facultad de que los otros escritorios lo imiten en las transformaciones, filtros, negación que se le realicen. Se requieren al menos dos escritorios para utilizar esta herramienta.</p>
    </li>
    <li>
        <p align="justify"><b>Rotación</b>. Activa la opción de rotar la imagen al punto de interacción del mouse. En móviles esto no es necesario, ya que la rotación viene por defecto con la interacción de dos dedos.</p>
    </li>
    <li>
        <p align="justify"><b>Lupa</b>. Aumenta la escala de la imagen en una zona determinada por la interacción del mouse. Solo disponible en estaciones de trabajo.</p>
    </li>
    <li>
        <p align="justify"><b>Negativo</b>. Filtra la imagen a su inverso de colores.</p>
    </li>
    <li>
        <p align="justify"><b>Efecto película</b>. Recorre la serie de imágenes secuencialmente, provocando un efecto similar a un video.</p>
    </li>
    <li>
        <p align="justify"><b>Escritorios</b>. Despliega un menú contextual con la cantidad de escritorios que se desea trabajar.</p>
    </li>
    <li>
        <p align="justify"><b>Cálculo de mediciones</b>. Despliega un menú contextual con las opciones de medición que se desea trabajar. Estas opciones pueden ser el cálculo de distancias, ángulos o áreas mediante polígonos irregulares.</p>
    </li>
    <li>
        <p align="justify"><b>Cálculo de unidades de hounsfield</b>. Despliega un menú contextual con las opciones de medición que se desea trabajar. Estas opciones pueden ser el cálculo por puntos, elipses o polígonos irregulares.</p>
    </li>
    <li>
        <p align="justify"><b>Vistas</b>. Despliega un menú contextual con las opciones de ventaneo (windowing) que se desea aplicar a la imagen. Estas opciones pueden ser: por defecto, hueso, pulmón, tórax, angio, abdomen y cerebro.</p>
    </li>
    <li>
        <p align="justify"><b>Por defecto</b>. Quita todas las transformaciones, filtros y acciones a todos los escritorios, dejando las series con su forma por defecto.</p>
    </li>
    <li>
        <p align="justify"><b>Cerrar</b>. Cierra la aplicación.</p>
    </li>
    <li>
        <p align="justify"><b>Reportes</b>. Muestra reportes adjuntos al estudio.</p>
    </li>
    <li>
        <p align="justify"><b>Envío por correo</b>. Envío por correo de un acceso temporal al estudio.</p>
    </li>
    <li>
        <p align="justify"><b>Mostrar/ocultar informaciones</b>. Muestra u oculta la información asociada a una serie.</p>
    </li>
    <li>
        <p align="justify"><b>Barra de carga/navegación</b>. Muestra el avance de imágenes cargadas de la serie y permite navegar en la serie.</p>
    </li>
    <li>
        <p align="justify"><b>Localizador</b>. Dibuja una línea horizontal en series sagitales o coronales respecto a una serie axial, en donde determina la posición de las imágenes sobre el individuo. Se requieren al menos dos escritorios para que se visualice el localizador.</p>
    </li>
    <li>
        <p align="justify"><b>Brillo y contraste (windowing)</b>. Dependiendo de la tecnología soportada por el cliente se utiliza una forma eficiente para realizar los filtros de brillo y contraste. En clientes con soporte WebGL se imita el efecto de ventaneo de las imágenes DICOM mediante fórmulas adecuadas. La simulación de ventaneo solo está disponible para clientes en estación de trabajo y con soporte WebGL. En móviles el filtro de brillo y contraste se realiza mediante CSS3.</p>
    </li>
    <li>
        <p align="justify"><b>Zoom y pan</b>. Las transformaciones de zoom y pan se realizan al punto de interacción.</p>
    </li>
    <li>
        <p align="justify"><b>Información relevante de las series</b>. Para clientes en estaciones de trabajo se visualiza información relevante de las series al pasar con el mouse por sobre ellas.</p>
    </li>
</ul>

## Proyecto ##

```
MIRROR ___ _____ application: production version
          |
          |_____ develop: develop version
          |
          |_____ css: styles 
          |
          |_____ fonts: fonts
          |
          |_____ img: images
          |
          |_____ libs: external libs
          |
          |_____ services: services in python
```
#### Dependencias ####
CSS
```
bootstrap.min
perfect-scrollbar
```
Javascript
```
jquery-2.1.3.min.js       
jquery-ui.min.js
jquery.ui.touch-punch.min.js
hammer.min.js
jquery.mousewheel.min.js
jquery-resizeEnd.min.js
jquery.tothtip.js
perfect-scrollbar.jquery.min.js
bootstrap.min.js
math.min.js
pixi.min.js
```
#### Como Usar Mirror Estándar v2 ####
Se añaden las dependencias CSS a la hoja de estilo `style.css` en la ruta `css/`
```css
@import url('bootstrap.css');
@import url('perfect-scrollbar.css');
@import url('http://fonts.googleapis.com/css?family=Oswald');

html, body {
    overflow: hidden;
    margin: 0px;
    padding: 0px;
}
```
```html
<link rel="stylesheet" href="../css/style.css" />
```
Se añaden las dependencias en la ruta `libs/`
```html
<script src="../libs/jquery-2.1.3.min.js"></script>        
<script src="../libs/jquery-ui.min.js"></script>
<script src="../libs/jquery.ui.touch-punch.min.js"></script>
<script src="../libs/hammer.min.js"></script>
<script src="../libs/jquery.mousewheel.min.js"></script>
<script src="../libs/jquery-resizeEnd.min.js"></script>
<script src="../libs/jquery.tothtip.js"></script>
<script src="../libs/perfect-scrollbar.jquery.min.js"></script>
<script src="../libs/bootstrap.min.js"></script>
<script src="../libs/math.min.js"></script>
<script src="../libs/pixi.min.js"></script>
```
Se añade Mirror Estándar v2 para producción en la ruta `app/`
```html
<script src="app/language.js"></script>
<script src="app/mirror-std-v2.min.js"></script>
```
Se añade los elementos DOM al body
```html
<div id="renderers" style="display: none;"></div>
<div id="main"></div>
```
Finalmente se ejecuta Mirror Estándar v2 al cargar el documento HTML
```javascript
$(function () {
    var studyId = 44327, // ID del estudio en el que se desea trabajar
        make = new MIRROR.maker (studyId);
    make.init ();
});
```
#### Construir Mirror Estándar v2 ####
Mirror Estándar v2 se construye utilizando [Closure Compiler Service](https://closure-compiler.appspot.com/home) y con el siguiente orden de archivos:
```
ui.js
filter.js
mirror.js
maker.js 
layer.js
loader.js
serie.js
measuring.js
hounsfield.js
```
#### Activar Servicios de Reportes y Envío por Correo ####
Para activar los botones correspondientes a las herramientas de reportes y envío por correo, en el archivo `mirror.js` en la clase `maker` hay que cambiar la condición a `true`:
```javascript
this.mailState = true;
this.reportsState = true;
```
#### Servicios en Python ####
Los servicios que proveen de información del estudio necesarios a Mirror Estándar v2 son escritos en `Python`, esto para obtener una mayor velocidad de respuesta en la lectura de archivos DICOM.<br />
Para correr aplicaciones en `Python` sobre `Apache` se utiliza la tecnología `WSGI` mediante `mod_wsgi`. Para obtener `mod_wsgi` en `Apache` con `Python 2.7` se instala:
```
$sudo apt-get install libapache2-mod-wsgi
```
Para habilitar el directorio de servicios de Mirror Estándar v2 para que sea capaz de ejecutar scripts `Python` en `Apache`, se agregan las siguientes líneas en el archivo de configuración de `Apache` ubicado en `/etc/apache2/apache2.conf`:
```
WSGIScriptAlias /url/to/mirror-std-v2/services/ /path/to/mirror-std-v2/services/
<Directory /path/to/mirror-std-v2/services/>
    Order allow,deny
    Allow from all
</Directory>
```
En los servicios de Mirror Estándar v2 es necesario de las librerías `numpy` y `pydicom` para extraer información desde archivos DICOM. Para instalarlas es necesario contar con `python-pip` y `python-dev`:
```
$sudo apt-get install python-dev python-pip
```
Y luego:
```
$sudo pip install numpy
$sudo pip install pydicom
```

## Licencia ##

&copy; 2015 Todos los derechos reservados para Toth Limitada.