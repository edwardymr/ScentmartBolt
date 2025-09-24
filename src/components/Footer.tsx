import React, { useState } from "react";
import { Instagram, Mail, Phone, Key } from "lucide-react";
import LegalModal from "./LegalModal";
import { legalTexts } from "./legalTexts"; // 👈 importa aquí

interface FooterProps {
  onAdminAccess: () => void;
}

export default function Footer({ onAdminAccess }: FooterProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", content: "" });

  const handleOpenModal = (type: string) => {
    let title = "";
    let content = "";

    switch (type) {
      case "terms":
        title = "Términos de Servicio";
        content = `Términos del Servicio
Información General
El presente documento contiene los términos y condiciones generales (los “Términos y Condiciones Generales”) aplicables al uso del portal web www.misaromas.com.
Cualquier Usuario que desee acceder y/o usar el portal web podrá hacerlo sujetándose a estos Términos y Condiciones Generales, junto con todas las demás políticas y principios que son incorporados en www.misaromas.com.
La visita, acceso, participación, el suministro de datos, la utilización y la navegación en la web implica que el Usuario ha leído, entendido, consentido y aceptado plena y expresamente los Términos y Condiciones de Uso que aquí se establecen.
El ingreso a la web constituye el consentimiento expreso del Usuario a utilizar la web, sus servicios y contenidos sin contravenir la legislación vigente, la buena fe y el orden público. La violación a estos Términos y Condiciones de Uso, o la omisión de actos por parte del Usuario que a criterio de Mis Aromas constituyan conductas abusivas, lesivas o ilícitas, generará el derecho de Mis Aromas de denegar de manera inmediata el acceso a la web al Usuario en falta.
En consecuencia, todas las visitas y todos los contratos y/o transacciones que se realicen en este Sitio, así como sus efectos jurídicos, quedarán regidos por estas reglas y sometidos a la legislación aplicable en Colombia.
Cualquier persona que no acepte estos Términos y Condiciones, los cuales tienen un carácter obligatorio y vinculante, deberá abstenerse de utilizar el Sitio y/o los Servicios ofrecidos en el sitio web.
Condiciones Generales
Estas condiciones generales tienen por objeto regular el acceso y la utilización del portal web www.misaromas.com que Mis Aromas pone gratuitamente a disposición de los Usuarios, salvo en lo relativo al coste de la conexión a través de la red de telecomunicaciones suministrada por el proveedor de acceso contratado por los Usuarios. El acceso al portal web www.misaromas.com y la navegación por el mismo implica la aceptación, sin reservas, de todas las condiciones incluidas en este documento.
Condiciones de Uso
El Usuario se obliga a hacer un uso correcto del portal web www.misaromas.com de conformidad con la legislación colombiana vigente y con las condiciones incluidas en este documento. El Usuario responderá frente a Mis Aromas o frente a terceros, por cualquier daño y/o perjuicio que pudiera causarse como consecuencia del incumplimiento de dichas obligaciones.
Queda expresamente prohibido el uso del portal web www.misaromas.com con fines lesivos de bienes o intereses de Mis Aromas o de terceros o que de cualquier otra forma sobrecarguen, dañen o inutilicen las redes, servidores y demás equipos informáticos o productos y aplicaciones informáticas de Mis Aromas o de terceros.
Mis Aromas se reserva la facultad de efectuar, en cualquier momento y sin necesidad de previo aviso las modificaciones y actualizaciones de la información contenida en el portal web www.misaromas.com que resulten pertinentes, así como de la configuración y presentación de este, y de sus Condiciones de Uso.
La prestación del servicio del portal web www.misaromas.com tiene una duración limitada al momento en el que el Usuario se encuentre conectado al mismo o a alguno de los servicios que a través de éste se facilitan. Por eso, se recomienda que los Usuarios lean, atenta y detenidamente, estas Condiciones de Uso en cada una de las ocasiones en que se propongan entrar y hacer uso del portal web, puesto que el mismo puede estar sujeto a modificaciones.
Mis Aromas no garantiza la inexistencia de interrupciones o errores en el acceso a la web www.misaromas.com o a su contenido, ni que éste se encuentre actualizado. Mis Aromas llevará a cabo, siempre que no implique causas que lo hagan imposible o de difícil ejecución, y tan pronto tenga noticia de los errores, desconexiones o falta de actualización en los contenidos, todas aquellas tareas necesarias para resolver los errores, restablecer la comunicación y actualizar los contenidos.
Tanto el acceso al portal web www.misaromas.com como el uso no autorizado que pueda efectuarse de la información contenida en el mismo es responsabilidad exclusiva de quien lo realiza.
Mis Aromas no responderá de ninguna consecuencia, daño o perjuicio que pudieran derivarse de este acceso o uso. Mis Aromas no se hace responsable de los errores de seguridad, que se puedan producir ni de los daños que puedan producirse en el sistema informático del Usuario, o a los ficheros o documentos almacenados en el mismo, como consecuencia de la presencia de un software malicioso en el dispositivo que sea utilizado para la conexión a los contenidos del portal web www.misaromas.com, de un mal funcionamiento del navegador o del uso de versiones no actualizadas del navegador.
Naturaleza Jurídica
Estos Términos y Condiciones son de naturaleza y esencia comercial. No originan subordinación, dependencia, ni relación alguna de carácter laboral entre el Usuario y Mis Aromas, de manera que el Usuario no tiene ni tendrá la calidad de trabajador dependiente o empleado de Mis Aromas. Cada una de las Partes asume sus propios riesgos comerciales y la totalidad de los costos que acarree la utilización del portal web.
Revisión de los Términos y Condiciones de Uso
Mis Aromas se reserva el derecho de revisar, actualizar y modificar los presentes Términos y Condiciones de Uso en cualquier momento. El Usuario entiende y conviene en que es el único responsable de revisar periódicamente los Términos y Condiciones de Uso para verificar si se ha producido alguna modificación. Al hacer uso del Sitio una vez producida la modificación, dicho uso implicará su aceptación de los términos modificados.
En caso de que el Usuario no esté de acuerdo con los Términos y Condiciones de Uso, algún lineamiento o una de sus modificaciones; o bien, no esté satisfecho con los Servicios que Mis Aromas provee a través del portal web por cualquier motivo, deberá abstenerse de utilizar el Sitio en forma inmediata.
Comunicaciones
El Usuario comprende y acepta que podrá recibir comunicaciones de Mis Aromas o de quienes Mis Aromas designe, incluyendo, pero no limitándose a avisos, consultas, encuestas y/o notificaciones requeridas o no por el ordenamiento jurídico vigente. Con la aceptación de los presentes términos y condiciones, el Usuario declara y acepta que cualquier notificación y/o información relacionada con el estado de su pedido o cuenta podrá hacerse por medio electrónico. A su vez, el Usuario acepta expresamente con el uso del portal web el envío de la factura emitida por las transacciones que llegare a realizar en el portal por medios electrónicos.
Fallas del Sistema
El acceso al portal Web podrá estar temporalmente no disponible en caso de interrupciones necesarias por mantenimiento, fallas en la operación de los servidores, empresas proveedoras de energía eléctrica, servicios de telecomunicaciones, casos fortuitos, fuerza mayor, o acciones de terceros sobre los que Mis Aromas no tenga control.
`;
        break;
      case "privacy":
        title = "Política de Privacidad";
        content = `Política de Privacidad
Última actualización: 20 de septiembre de 2025
Esta Política de Privacidad describe cómo Mis Aromas (en adelante, el "Sitio", "nosotros" o "nuestro") recopila, utiliza y divulga su información personal al visitar o utilizar nuestros servicios, al realizar una compra en www.misaromas.com (en adelante, el "Sitio") o al comunicarse con nosotros de cualquier otra manera con respecto al Sitio (denominado de manera colectiva como, los "Servicios"). A los efectos de la presente Política de privacidad, los términos "usted" y "su" hacen referencia a usted como usuario de los Servicios, ya sea en calidad de cliente, visitante del sitio web o como cualquier otro individuo cuya información hayamos recopilado de conformidad con la presente Política de privacidad.
Lea atentamente la presente Política de privacidad. Al utilizar y acceder a cualquiera de los Servicios, usted acepta que se recopile, use y divulga su información tal como se describe en la presente Política de privacidad. Si no está de acuerdo con esta Política de privacidad, no utilice ni acceda a ninguno de los Servicios.
Cambios en la presente Política de privacidad
Esta Política de privacidad se podrá actualizar puntualmente para reflejar cambios en nuestras prácticas o por cualesquiera otras razones operativas, legales o normativas. Publicaremos la Política de privacidad revisada en el Sitio, actualizaremos la fecha de "Última actualización" y tomaremos cualquier otra medida que pueda exigir la ley aplicable.
Recopilación y utilización de su información personal
Para prestar los Servicios, recopilamos información personal sobre usted de una variedad de fuentes, como se indica a continuación. La información que recopilamos y utilizamos varía en función de cómo interactúa con nosotros.
Además de los usos específicos que se establecen a continuación, podremos usar la información que recopilamos para comunicarnos con usted, proporcionarle o mejorar los Servicios, cumplir con cualquier obligación legal aplicable, hacer cumplir los términos de servicio aplicables y proteger o defender los Servicios, nuestros derechos, los de nuestros usuarios y los de otros.
Información personal que recopilamos
Los tipos de información personal que obtenemos sobre usted dependen de cómo interactúa con nuestro Sitio y cómo utiliza nuestros Servicios. El término "información personal" se utiliza para hacer referencia a la información que le identifica o describe individualmente, así como a la información que puede relacionarse o asociarse a usted. Las secciones siguientes describen las categorías y tipos específicos de información personal que recopilamos.
Información que recopilamos directamente de usted
La información que nos envía directamente a través de nuestros Servicios puede incluir lo siguiente:
Detalles de contacto: Incluye su nombre, dirección, número de teléfono y correo electrónico.
Información del pedido: Incluye su nombre, dirección de facturación, dirección de envío, confirmación de pago, dirección de correo electrónico y número de teléfono.
Información de la cuenta: Incluye su nombre de usuario, contraseña, preguntas de seguridad y otra información utilizada con fines de seguridad de la cuenta.
Información de atención al cliente: Incluye la información que usted elige incluir en las comunicaciones con nosotros, como, por ejemplo, al enviar un mensaje a través de los Servicios.
Algunas características de los Servicios pueden requerir que nos proporcione directamente cierta información sobre usted. Puede optar por no proporcionar estos datos; sin embargo, ello puede impedirle usar o acceder a estas funciones.
Información que recopilamos sobre su uso
También podemos recopilar automáticamente cierta información sobre su interacción con los Servicios (en adelante, "Datos de uso"). Para ello, podemos utilizar cookies, píxeles y tecnologías similares (en adelante, "Cookies"). Los Datos de uso pueden incluir información sobre cómo accede y utiliza nuestro Sitio y su cuenta, incluida información del dispositivo, información del navegador, información sobre su conexión de red, su dirección IP y otra información sobre su interacción con los Servicios.
Información que obtenemos de terceros
Por último, podemos obtener información sobre usted de terceros, entre los que se incluyen vendedores y proveedores de servicios que pueden recopilar información en nuestro nombre, como por ejemplo:
Empresas que respaldan nuestro Sitio y Servicios.
Nuestros procesadores de pagos, que recopilan información de pago (por ejemplo, cuenta bancaria, información de tarjeta de crédito o débito, dirección de facturación) para procesar su pago con el fin de cumplir con sus pedidos y proporcionar los productos o servicios que ha solicitado y, de este modo, poder cumplir con nuestro contrato con usted.
Al visitar nuestro Sitio, al abrir o hacer clic en los correos electrónicos que le enviamos o al interactuar con nuestros Servicios o anuncios, nosotros, o los terceros con los que trabajamos, podremos recopilar automáticamente determinada información mediante tecnologías de seguimiento online, como, por ejemplo, píxeles, balizas web, kits de desarrolladores de software, bibliotecas de terceros y cookies.
Toda información que obtengamos de terceros se tratará de conformidad con la presente Política de privacidad. Consulte también la sección siguiente, Sitios web y enlaces de terceros.
Utilización de su información personal
Prestación de servicios y productos. Usamos su información personal para prestarle los Servicios y, de este modo, cumplir con nuestro contrato con usted, lo que incluye el procesamiento de sus pagos, el cumplimiento de los pedidos, el envío de notificaciones relacionadas con su cuenta, así como con sus compras, devoluciones, cambios u otras transacciones, con el fin de crear, mantener y administrar su cuenta, organizar el envío, facilitar las devoluciones o los cambios, además de otras características y funcionalidades relacionadas con su cuenta.
Marketing y publicidad. Podemos utilizar su información personal con fines promocionales y de marketing, como, por ejemplo, al enviarle comunicaciones promocionales, publicitarias y de marketing por correo electrónico, mensaje de texto o correo postal, así como para mostrarle anuncios de productos o servicios. Esto puede incluir el uso de su información personal para adaptar mejor los Servicios y la publicidad tanto en nuestro Sitio con en otros sitios web.
Seguridad y prevención de fraude. Utilizamos su información personal para detectar, investigar o tomar medidas respecto a posibles actividades fraudulentas, ilegales o maliciosas. Si elige utilizar los Servicios y registrar una cuenta, usted será responsable de mantener seguras las credenciales de su cuenta. Recomendamos encarecidamente que no comparta con nadie su nombre de usuario, su contraseña u otros detalles. Si cree que su cuenta se ha visto comprometida, póngase en contacto con nosotros de inmediato.
Comunicaciones y mejora del servicio. Utilizamos su información personal para prestarle servicios de atención al cliente y mejorar nuestros Servicios. Esto es de nuestro interés legítimo para poder responder ante usted, así como para prestar servicios efectivos y mantener nuestra relación comercial con usted.
Cookies
Al igual que ocurre con muchos otros sitios web, nuestro Sitio también utiliza cookies. Usamos Cookies para operar y mejorar nuestro Sitio y nuestros Servicios (lo que incluye recordar sus acciones y preferencias), así como para realizar análisis y comprender mejor la interacción del usuario con los Servicios (en nuestro interés legítimo de administrar, mejorar y optimizar los Servicios). También podemos permitir que terceros y proveedores de servicios utilicen Cookies en nuestro Sitio para personalizar mejor los servicios, productos y la publicidad de nuestro Sitio y otros sitios web.
La mayoría de los navegadores aceptan las Cookies automáticamente de forma predeterminada, pero usted puede optar por configurar su navegador para que elimine o rechace las cookies a través de los controles de su navegador. Tenga en cuenta que eliminar o bloquear las Cookies puede afectar negativamente a su experiencia de usuario y puede hacer que algunos de los Servicios, incluidas ciertas características y funcionalidades generales, funcionen de manera incorrecta o dejen de estar disponibles. Además, es posible que el bloqueo de Cookies no impida por completo compartir la información con terceros, como nuestros socios publicitarios.
Divulgación de su información personal
En determinadas circunstancias, podemos divulgar su información personal a terceros con fines de cumplimiento de contratos, fines legítimos u otras razones en virtud de la presente Política de privacidad. Tales circunstancias pueden incluir las siguientes:
Con proveedores u otros terceros que prestan servicios en nuestro nombre (por ejemplo, gestión de TI, procesamiento de pagos, análisis de datos, servicios de atención al cliente, almacenamiento en la nube, cumplimiento y envío).
Con socios comerciales y de marketing para mostrarle publicidad y prestarle servicios a usted. Nuestros socios comerciales y de marketing utilizarán su información de acuerdo con sus propios avisos de privacidad.
Cuando usted indica, solicita o consiente de cualquier otro modo que divulguemos cierta información a terceros, como, por ejemplo, para enviarle productos o mediante el uso de widgets de redes sociales o integraciones de inicio de sesión con su consentimiento.
Con nuestras afiliados o de cualquier otro modo en el ámbito de nuestro grupo empresarial, en nuestro interés legítimo de dirigir un negocio con éxito.
En relación con las transacciones comerciales, como, por ejemplo, fusiones o quiebras, para cumplir con las obligaciones legales aplicables (incluso responder a citaciones, órdenes de registro y solicitudes similares), hacer cumplir los términos de servicio aplicables y proteger o defender los Servicios, así como nuestros derechos, los de nuestros usuarios y de otros.
No utilizamos ni divulgamos información personal confidencial sin su consentimiento o con el propósito de deducir características sobre usted.
Sitios web y enlaces de terceros
Nuestro Sitio puede proporcionar enlaces a sitios web u otras plataformas online operadas por terceros. Si sigue enlaces a sitios no afiliados o que no están bajo nuestro control, debe revisar sus políticas de privacidad y seguridad, así como otros términos y condiciones. No garantizamos ni somos responsables de la privacidad o seguridad de dichos sitios, incluida la exactitud, integridad o fiabilidad de la información que se encuentra en ellos. La información que usted proporcione en sitios públicos o semipúblicos, incluida la información que comparta en plataformas de redes sociales de terceros, también puede ser visible para otros usuarios de los Servicios y/o usuarios de dichas plataformas de terceros, sin limitación en cuanto a su uso por nuestra parte o por la de terceros. Nuestra inclusión de dichos enlaces no implica, por sí sola, ningún tipo de promoción del contenido de dichas plataformas o de sus propietarios u operadores, excepto el divulgado en los Servicios.
Datos de niños
Los Servicios no están destinados al uso por parte de niños, por lo que no recopilamos de manera intencionada ninguna información personal sobre niños. Si usted es padre o tutor de un niño que nos ha proporcionado su información personal, puede comunicarse con nosotros a través de los detalles de contacto que se indican a continuación para solicitar su eliminación.
A la fecha de entrada en vigor de la presente Política de privacidad, no tenemos conocimiento real de que “compartamos” o “vendamos” (entendiendo estos términos tal como se definen en la ley aplicable) información personal de menores de 16 años.
Seguridad y retención de su información
Tenga en cuenta que ninguna medida de seguridad es perfecta o impenetrable, por lo que no podemos garantizar una "seguridad perfecta". Además, es posible que la información que nos envíe no esté segura mientras esté en tránsito. Por lo tanto, recomendamos que no utilice canales inseguros para comunicar información sensible o confidencial.
El tiempo de conservación de su información personal depende de diferentes factores, como, por ejemplo, si necesitamos la información para mantener su cuenta, prestar los Servicios, cumplir con obligaciones legales, resolver disputas o hacer cumplir otros contratos y políticas aplicables.
Sus derechos
Dependiendo de dónde viva, es posible que tenga algunos o todos los derechos que se enumeran a continuación con respecto a su información personal. Sin embargo, tales derechos no son absolutos, por lo que pueden aplicarse solo en determinadas circunstancias, lo que nos permitiría rechazar su solicitud en determinados casos y según lo permita la ley.
Derecho de acceso/conocimiento: Es posible que tenga derecho a solicitar acceso a la información personal que tenemos sobre usted, incluidos los detalles relacionados con las formas en que usamos y compartimos su información.
Derecho de eliminación: Es posible que tenga derecho a solicitar la eliminación de la información personal que conservamos sobre usted.
Derecho de corrección: Es posible que tenga derecho a solicitar la corrección de la información personal errónea que conservamos sobre usted.
Derecho de portabilidad: Es posible que tenga derecho a recibir una copia de la información personal que conservamos sobre usted y a solicitar su transferencia a un tercero, en determinadas circunstancias y con determinadas excepciones.
Restricción de procesamiento: Es posible que tenga derecho a solicitar que detengamos o restrinjamos el procesamiento de la información personal.
Revocación del consentimiento: Siempre que dependamos de su consentimiento para procesar su información personal, es posible que tenga derecho a retirar dicho consentimiento.
Apelación: Es posible que tenga derecho a apelar nuestra decisión si nos negamos a procesar su solicitud. Para ello, puede responder directamente a nuestra denegación.
Gestión de las preferencias de comunicación: Podemos enviarle correos electrónicos promocionales y usted puede optar por no recibirlos en cualquier momento a través de la opción para cancelar la suscripción que está disponible en los correos electrónicos que enviamos. Si opta por no recibirlos, es posible que aún le enviemos correos electrónicos no promocionales, como los relacionados con su cuenta o con los pedidos que haya realizado.
Puede ejercer cualquiera de estos derechos donde se indica en nuestro Sitio o al ponerse en contacto con nosotros mediante los detalles de contacto que se proporcionan a continuación.
Sepa que el ejercicio de cualquiera de estos derechos no será motivo de ningún tipo de discriminación por nuestra parte. Es posible que necesitemos recopilar información de usted para verificar su identidad, como, por ejemplo, su dirección de correo electrónico o información de su cuenta, antes de proporcionar una respuesta sustancial a la solicitud. De acuerdo con las leyes aplicables, usted puede designar a un agente autorizado para realizar solicitudes en su nombre para ejercer sus derechos. Antes de aceptar solicitudes de un agente, le exigiremos que proporcione pruebas de que usted ha autorizado a dicho agente para actuar en su nombre. Asimismo, es posible que necesitemos que verifique su identidad directamente con nosotros. Responderemos a su solicitud de manera oportuna tal como lo exige la ley aplicable.
Reclamaciones
Si tiene alguna reclamación sobre cómo procesamos su información personal, póngase en contacto con nosotros a través de los detalles de contacto que se proporcionan a continuación. Si no está satisfecho con la respuesta que hemos proporcionado a su reclamación, dependiendo de dónde viva, puede tener derecho a apelar nuestra decisión poniéndose en contacto con nosotros a través de los detalles de contacto que se indican a continuación, o bien a presentar su reclamación ante la autoridad local competente en materia de protección de datos.
Usuarios internacionales
Tenga en cuenta que podemos transferir, almacenar y procesar su información personal fuera del país en el que vive. Su información personal también se procesará con personal y proveedores de servicios externos y socios de dichos países.
Si transferimos su información personal fuera de Europa, utilizaremos mecanismos de transferencia reconocidos, como las Cláusulas Contractuales Estándar de la Comisión Europea o cualquier contrato equivalente emitido por la autoridad competente del Reino Unido, según corresponda, a menos que la transferencia de datos se realice a países que proporcionen un nivel de protección adecuado.
Contacto
Si tiene alguna pregunta sobre nuestras prácticas de privacidad o sobre la presente Política de privacidad, o bien si desea ejercer cualquiera de sus derechos, puede enviar un correo electrónico a misaromas.store@gmail.com o contactarnos por WhatsApp al +573213200601.
`;
        break;
      case "returns":
        title = "Política de Devoluciones";
        content = `Política de Envío
El envío es gratuito para todos los pedidos dentro de la ciudad de Santa Marta. Para el resto del país, el envío tendrá un costo de $16.000. El servicio de pago contra entrega está supeditado a la disponibilidad de la transportadora para ofrecerlo.
Nuestros envíos son operados por las transportadoras más importantes y seguras del país. Todos nuestros envíos están asegurados. Te enviaremos la guía de envío tan pronto sea despachado tu pedido para que puedas rastrearlo en todo momento.
El tiempo de entrega de tu pedido es de 2 a 4 días hábiles para Bogotá y Soacha, de 4 a 6 días para ciudades principales del país y de 3 a 6 días para ciudades intermedias. Sin embargo, estamos sujetos siempre a los tiempos de entrega de la transportadora y a las novedades que se puedan presentar en la ruta.
Es responsabilidad del cliente proporcionarnos los datos completos y correctos para realizar la entrega de forma oportuna.
La transportadora realiza hasta 2 intentos de entrega. Si después de estos 2 intentos no se logra realizar la entrega, la transportadora nos devolverá tu pedido. En caso de que tu pedido ya haya sido pagado, te intentaremos contactar por hasta 30 días después del primer intento de entrega. Después de este plazo, no se hará devolución de dinero ni entrega de los productos. Una vez que la transportadora nos haya devuelto tu pedido sin éxito, será necesario realizar el pago del envío nuevamente para despacharlo.

Política de Reembolso
Política de Devoluciones y Reembolsos
POR ERROR EN EL DESPACHO
Cuando por error de Mis Aromas se envíe un producto diferente al solicitado por el cliente, se hará la devolución y cambio del mismo sin ningún costo.
Sin embargo, el usuario deberá devolver el producto a Mis Aromas, en las mismas condiciones que lo recibió. Debido al tipo de producto que se comercializa en Mis Aromas, no se aceptarán devoluciones de perfumes cuya caja original y embalaje (celofán) hayan sido abiertos y la fragancia se haya probado.
No recibimos devoluciones si no gusta el aroma de los perfumes. Para evitar esto, en cada producto se detallan las características del aroma.
A SOLICITUD DEL CLIENTE
El cliente cuenta con hasta 5 días hábiles a partir de la entrega del producto para presentar ante Mis Aromas la solicitud de devolución. Para poder aceptar la devolución se deben cumplir con los siguientes criterios:
Oportunidad: Dentro de los cinco (5) días hábiles siguientes a la entrega del producto.
Estado de la mercancía: El usuario deberá devolver el producto a Mis Aromas, en las mismas condiciones que lo recibió. No se aceptarán devoluciones de perfumes cuya caja original y embalaje (celofán) hayan sido abiertos y la fragancia se haya probado.
Costos de transporte: Deberán ser asumidos por el usuario y los demás que conlleven la devolución del bien.
Productos excluidos: El derecho de retracto no aplicará para productos sobre pedido o aquellos que fueron elaborados, fabricados, armados, cortados o preparados conforme a las especificaciones del usuario o que son claramente personalizados.
POR GARANTÍA
Garantía de Calidad e Idoneidad: El usuario podrá hacer exigible la garantía sobre los productos adquiridos en el Sitio por cualquier falla de calidad del producto, ya sea en su contenido o empaque. Dicha garantía comprende el cambio o devolución del dinero, de conformidad con el caso particular.
Condiciones para hacer exigible la garantía: La garantía por fallas de calidad e idoneidad del producto es exigible teniendo en cuenta los siguientes puntos:
Se solicita a través de nuestro Servicio de Atención al Cliente, contactándose al correo misaromas.store@gmail.com o al WhatsApp +573213200601.
El plazo para ingresar la solicitud es dentro de los seis (6) meses, contabilizados desde la entrega del producto.
En el caso de productos faltantes del pedido, el cliente contará con el plazo de tres (03) días hábiles a partir de la recepción del pedido para solicitar el producto faltante.
En el caso de productos en promoción o combos, se requiere la entrega de todos los productos incluidos en la promoción correspondiente.
El producto deberá ser entregado en su empaque original dentro de una caja correctamente embalada y sin presentar alteración alguna.
Mis Aromas procederá a realizar el recojo del producto en el domicilio registrado por el Usuario para la entrega del pedido, salvo casos en los que previa coordinación con el Usuario se determine una ubicación distinta, y con ello iniciar el proceso de cambio y/o devolución del producto.
`;
        break;
    }

    setModalContent({ title, content });
    setModalOpen(true);
  };

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/images/logo-scentmart.png"
                alt="ScentMart Logo"
                className="h-10 w-10 rounded-md bg-white/10 p-1"
              />
              <div className="flex flex-col">
                <span className="text-xl font-serif font-bold leading-tight">
                  MisAromas
                </span>
              </div>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Tu destino para paisajes olfativos únicos. Cada fragancia cuenta
              una historia, cada aroma despierta una emoción.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/misaromas.store"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-amber-400 transition-colors"
                aria-label="Síguenos en Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/share/175XYkuAi1/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-amber-400 transition-colors"
                aria-label="Síguenos en Facebook"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="mailto:misaromas.store@gmail.com"
                className="text-gray-300 hover:text-amber-400 transition-colors"
                aria-label="Envíanos un correo"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#catalog"
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  Catálogo
                </a>
              </li>
              <li>
                <a
                  href="#bestsellers"
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  Más Vendidos
                </a>
              </li>
              <li>
                <a
                  href="#hero"
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  Quiz de Aromas
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Atención al Cliente</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400" />
                <a
                  href="tel:+573213200601"
                  className="text-gray-300 text-sm hover:text-amber-400 transition-colors"
                >
                  +57 321 320 0601
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400" />
                <a
                  href="mailto:misaromas.store@gmail.com"
                  className="text-gray-300 text-sm hover:text-amber-400 transition-colors"
                >
                  misaromas.store@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Admin */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2 mb-6">
              <li>
                <button
                  onClick={() => handleOpenModal("terms")}
                  className="text-gray-300 hover:text-amber-400 transition-colors text-sm"
                >
                  Términos de Servicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenModal("privacy")}
                  className="text-gray-300 hover:text-amber-400 transition-colors text-sm"
                >
                  Política de Privacidad
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenModal("returns")}
                  className="text-gray-300 hover:text-amber-400 transition-colors text-sm"
                >
                  Política de Devoluciones
                </button>
              </li>
            </ul>

            <button
              onClick={onAdminAccess}
              className="flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors text-sm group"
            >
              <Key className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              Acceso Administrador
            </button>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 MisAromas. Todos los derechos reservados.
          </p>
        </div>
      </div>

      {/* Modal */}
      <LegalModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalContent.title}
        content={modalContent.content}
      />
    </footer>
  );
}
