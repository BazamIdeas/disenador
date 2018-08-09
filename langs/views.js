module.exports = {
    "ES": {
        app_editor: {
            header: ['Acceder | Registro'],
            secciones: {
                inicio: {
                    combinaciones: {
                        guardar: "GUARDAR",
                        editar: "EDITAR"
                    },
                    formulario: {
                        nombre: {
                            label: 'Nombre',
                            value: 'Mi logo',
                            placeholder: '',
                            validacion: []
                        },
                        categorias: {
                            label: 'Actividad o sector',
                            placeholder: 'Actividad o sector',
                            validacion: []
                        },
                        fuentes: {
                            label: "Estilo de tipografía",
                            placeholder: "",
                            validacion: ["Debes elegir un estilo de Tipografía."]
                        },
                        etiquetas: {
                            label: '¿Que buscas?',
                            placeholder: 'Ejemplo: Café',
                            validacion: []
                        },
                        color: {
                            label: 'Seleccionar colores',
                            placeholder: '',
                            validacion: ['Debes elegir al menos un color.']
                        },
                        submit: ['CARGAR MÁS', 'BUSCAR']
                    }
                },
                logos: [
                    'GUARDADOS',
                    'COMPRADOS',
                    'AUN NO TIENES LOGOS',
                    'EDITAR',
                    'COMPRAR',
                    'BORRAR',
                    'El logo fue borrado exitosamente!',
                    'Un error ha ocurrido',
                    'PAPELERIA',
                    'DESCARGAR',
                    'ENVIAR'
                ],
                cuenta: [
                    'Correo',
                    'Nombre',
                    'Teléfono',
                    'País',
                    'Editar Datos',
                    'Cambiar Contraseña',
                    'Este campo es requerido.',
                    'Guardar',
                    'Cancelar',
                    'Antigua contraseña',
                    'Debe tener un minimo de 8 caracteres.',
                    'Contraseña Nueva',
                    'Cambiar',
                    'N° de pedido',
                    'Fecha',
                    'Estado',
                    'Logo',
                    'Plan',
                    'Precio',
                    'Impuesto',
                    'TOTAL',
                    'NO HA REALIZADO NINGUNA COMPRA'
                ],
                planes: [
                    'ESCOJA EL MEJOR PLAN PARA USTED',
                    'SELECCIONAR',
                    'Planes',
                    'GRACIAS POR TOMAR NUESTRO PLAN GRATIS',
                    '¿Deseas elegir otro plan?',
                    'ELEGIR OTRO PLAN',
                    'SEGUIR EDITANDO MI LOGO'
                ],
                editor: [
                    'Nombre del logo',
                    'Nombre',
                    'Estilo de tipografía',
                    'Debes elegir un estilo de Tipografía.',
                    'Texto',
                    'Tamaño',
                    'Negrita',
                    'Cursiva',
                    'Disminuir Tamaño',
                    'Anumentar Tamaño',
                    'Agregar Eslogan',
                    'Eslogan del logo',
                    'Eslogan',
                    'Etiquetas (Opcional)',
                    'Categoria del icono',
                    'Buscar simbolos',
                    'Orientación',
                    'Simbolo arriba',
                    'Simbolo a la izquierda',
                    'TU LOGO',
                    'Fondo',
                    'Cuadricula',
                    'VOLVER',
                    'Planes',
                    'GUARDAR',
                    'COMPRAR',
                    'CARGAR',
                    'MAS',
                    'Buscar iconos'
                ],
                pago: [
                    'Resumen de su pedido',
                    'Acepto los',
                    'Términos de Condiciones y Uso',
                    'Tarjeta de Crédito o Débito',
                    'PAGAR',
                ],
                descargar: [
                    'Mi logo',
                    'Papeleria',
                    'Documentos',
                    'Zip (Todo)',
                    'MEJORAR MI PLAN',
                    'DESCARGAR',
                    'Sociales',
                    'Manual de marcas',
                    '(Proximamente)',
                    'AUMENTE SU PLAN Y OBTENGA MEJORES BENEFICIOS',
                    'COMPRAR'
                ],
                papeleria: [
                    'GUARDAR',
                    'DESCARGAR',
                    'PAPELERIAS',
                    'EDITAR',
                    'DUPLICAR',
                    'ELIMINAR',
                    'COMPRAR',
                    'Usar Diseño',
                    'Crear Papeleria',
                    'GUARDADOS',
                    'Mejorar mi plan',
                    'AUMENTE SU PLAN Y OBTENGA MEJORES BENEFICIOS',
                ],
                papeleriaEditor: [
                    'GUARDAR',
                    'DESCARGAR',
                    'PAPELERIAS',
                    'EDITAR',
                    'DUPLICAR',
                    'ELIMINAR',
                    'COMPRAR',
                    'Usar Diseño',
                    'Crear Papeleria',
                    'GUARDADOS',
                    'Mejorar mi plan',
                    'AUMENTE SU PLAN Y OBTENGA MEJORES BENEFICIOS',
                    'Suelta los elementos en el espacio que prefieras',
                    'Alinear a la Izquierda',
                    'Alinear al centro',
                    'Alinear a la Derecha',
                    'Fuentes',
                    'Eliminar',
                    'Suelta Elementos'
                ]
            }
        },
        landing: {
            SEO: {
                title: 'Logopro | Tu logo en 3 minutos',
                keywords: 'creador de logos, diseño de logos, creador de logos online, generador de logos, Creador de logos gratis',
                description: 'El creador de logos Logopro te ayuda a crear logotipos personalizados en minutos, sin necesidad de experiencia en diseño. ¡Prueba con millones de iconos y más de 100 fuentes inmediatamente!',
                lang: 'es-es',
            },
            header: {
                botones: ['Acceder', 'Registro'],
                iconos: ['Crear logo', 'Mis logos', 'Mi cuenta', 'Cerrar Sesion']
            },
            secciones: {
                seccion_uno: {
                    titulo: `Crea en segundos  <br> un logo que amaras`,
                    subtitulo: `Nuestro generador de logos utiliza<br>  aprendizaje automático para diseñar<br> conceptos llamativos y únicos`,
                    formulario: {
                        nombre: {
                            label: 'Nombre de su logo',
                            placeholder: 'Mi logo',
                            validacion: ['Escriba el nombre de su logo.']
                        },
                        actividad: {
                            label: 'Actividad o sector',
                            default_Select: 'Selecciona'
                        },
                        etiquetas: {
                            label: '¿Que buscas?',
                            placeholder: 'Ejemplo: Café'
                        },
                        color: {
                            label: 'Color y Tipografía',
                            validacion: ['Selecciona un estilo de tipografía.']
                        },
                        boton: 'GENERAR LOGO'
                    }
                },
                seccion_dos: {
                    titulo: `GALERÍA DE LOGOS`,
                    url_categoria: '/logos-de-'
                },
                seccion_tres: {
                    titulo: '',
                    caracteristicas: [{
                        titulo: "De inmediato",
                        descripcion: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh",
                        icono: ["bg-carac-1", "right-bottom"]
                    }, {
                        titulo: "Más de 1 millon de logos",
                        descripcion: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh",
                        icono: ["bg-carac-2", "b-bottom"]
                    }, {
                        titulo: "Archivos en alta resolución",
                        descripcion: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh",
                        icono: ["bg-carac-3", "right-bottom"]
                    }, {
                        titulo: "Inteligencia artificial",
                        descripcion: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh",
                        icono: ["bg-carac-4", "b-bottom"]
                    }, {
                        titulo: "Gratis",
                        descripcion: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh",
                        icono: ["bg-carac-5", "b-right"]
                    }, {
                        titulo: "Múltiples aplicaciones",
                        descripcion: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh",
                        icono: ["bg-carac-6", ""]
                    }]
                },
                seccion_cuatro: {
                    titulo: 'Escoja el mejor plan para usted',
                    planes: [
                    ],
                    boton_plan: 'SELECCIONAR',
                    boton_final: 'CREAR LOGO AHORA'
                },
                seccion_cinco: {
                    titulo: 'Preguntas Frecuentes',
                    preguntas: [{
                        pregunta: "¿Cuanto cuesta el servicio?",
                        respuesta: `Logopro ofrece excelentes opciones de planes para la compra: el Plan básico de logotipo y el  Plan Profesional.<br/> <br/>
                        
                        Puede comprar sus archivos de logotipo por $9.9 por logo como parte de nuestro Plan básico, o elija el Plan Profesional $36, que le ofrece nuestra completa solución de marca y contiene una amplia gama de increíbles herramientas , archivos y características, ¡lo que le permite impulsar, construir y mejorar su marca realmente!
                        <br/> <br/>
                        
                        Para obtener más información, comuníquese con nuestro equipo de Atención al cliente a <a href="mailto:info@logo.pro">info@logo.pro</a>.<br/> `
                    }, {
                        pregunta: "¿Cómo puedo pagarlo?",
                        respuesta: `Logopro le da la facilidad mediante su tarjeta de credito o por paypal si asi lo desea.<br/> <br/>
                        
                        Para obtener más información, comuníquese con nuestro equipo de Atención al cliente a <a href="mailto:info@logo.pro">info@logo.pro</a>.<br/> `
                    }, {
                        pregunta: "¿Puedo cambiar el diseño después de comprar?",
                        respuesta: `
                        En sus logos guardados aparecerá el logo que acaba de comprar y podrá editarlo ilimitadamente. 
                        <br/> <br/>
                        
                        Para obtener más información, comuníquese con nuestro equipo de Atención al cliente a <a href="mailto:info@logo.pro">info@logo.pro</a>.<br/> `
                    }, {
                        pregunta: "¿Dónde lo puedo descargar?",
                        respuesta: `Igresando al sitio con su cuenta, podrá ir a sus logos comprados presionando el icono del menu.<br /><br /><div class='flex --row --center'><img src='landing/assets/img/tus-logos.jpg'></div>
                        <br/> <br/>
                        Para obtener más información, comuníquese con nuestro equipo de Atención al cliente a 
                        <a href="mailto:info@logo.pro">info@logo.pro</a>.<br/> `
                    }, {
                        pregunta: "¿En que formato puedo descargar el logo?",
                        respuesta: `Al momento de descargar su logo, este viene dentro de
                        un archivo comprimido en formato PNG y adecuado en varios tamaños listo para redes sociales, papeleria y publicidad.<br/> <br/>
                        
                        Para obtener más información, comuníquese con nuestro equipo de Atención al cliente a 
                        <a href="mailto:info@logo.pro">info@logo.pro</a>.<br/> `
                    },
                    {
                        pregunta: "¿Poseo los derechos plenos de mi logotipo comprado?",
                        respuesta: `Usted es libre de usar su logotipo comprado  para cualquier uso comercial o no comercial sin permiso adicional. Si desea colocar una marca comercial en su diseño, deberá hacerlo con la ayuda de un abogado familiarizado con las leyes de su estado o país en este momento.<br/> <br/>
                        Para obtener más información, comuníquese con nuestro equipo de Atención al cliente a 
                        <a href="mailto:info@logo.pro">info@logo.pro</a>`
                    }]
                }
            },
            footer: {
                linksInternos: [
                    {
                        url: '/terminos-y-condiciones',
                        nombre: 'Términos y condiciones'
                    },
                    {
                        url: '/avisos-legales',
                        nombre: 'Avisos Legales'
                    },
                    {
                        url: '',
                        nombre: 'Blog'
                    }
                ],
                redes: [
                    {
                        nombre: 'Instagram',
                        url: '#',
                        awesomeIcon: 'fab fa-instagram'
                    },
                    {
                        nombre: 'Twitter',
                        url: '#',
                        awesomeIcon: 'fab fa-twitter'
                    },
                    {
                        nombre: 'Facebook',
                        url: '#',
                        awesomeIcon: 'fab fa-facebook'
                    }
                ]
            }
        },
        categoria_pagina: {
            SEO: {
                title: 'Logopro | Tu logo en 3 minutos',
                keywords: 'creador de logos, diseño de logos, creador de logos online, generador de logos, Creador de logos gratis',
                description: 'El creador de logos Logopro te ayuda a crear logotipos personalizados en minutos, sin necesidad de experiencia en diseño. ¡Prueba con millones de iconos y más de 100 fuentes inmediatamente!',
                lang: 'es-es',
            },
            header: {
                botones: ['Acceder', 'Registro']
            },
            secciones: {
                seccion_uno: {
                    titulo: 'DISEÑA LOGOTIPOS DE',
                    descripcion: 'Si necesitas un diseño, Logopro es el creador de logotipos perfecto que estás buscando. Te proporciona plantillas bien diseñadas que pueden ofrecerte una inspiración continua para obtener ideas para crear logotipos. Las herramientas de edición fáciles de usar y los enormes recursos de arte, como los millones de iconos y las preciosas fuentes, proporcionan un sinfín de posibilidades de personalización para que consigas un logotipo de',
                    boton: 'GENERAR LOGO'
                },
                seccion_dos: {
                    titulo: 'Plantillas de diseño de ',
                    descripcion: 'Todas estas plantillas pueden ayudarte a personalizar tus diseños de',
                    boton: 'MAS LOGOTIPOS'
                },
                seccion_tres: {
                    titulo: 'Busquedas relacionadas'
                },
                seccion_cuatro: {
                    titulo: 'Cómo diseñar en 3 pasos un logo de',
                    descripcion: 'Sigue estos pasos para personalizar un',
                    descripcion_end: 'perfecto con gran facilidad.',
                    pasos: [
                        {
                            titulo: 'Elige una plantilla',
                            descripcion: 'Elige entre miles de plantillas para empezar a diseñar tu logo.',
                            imagen_url: '../landing/assets/img/mockup1.png',
                            video_url: '../landing/assets/img/video1.mp4'
                        },
                        {
                            titulo: 'Añade texto e icono',
                            descripcion: 'Personaliza tu logotipo con millones de iconos, más de 100 fuentes y potentes herramientas de edición.',
                            imagen_url: '../landing/assets/img/mockup2.png',
                            video_url: '../landing/assets/img/video2.mp4'
                        },
                        {
                            titulo: 'Guarda',
                            descripcion: 'Guarda tu logotipo en alta  resolución.',
                            imagen_url: '../landing/assets/img/mockup3.png',
                            video_url: '../landing/assets/img/video3.mp4'
                        }
                    ]
                },
                seccion_cinco: {
                    titulo: 'CREA LOGOTIPOS ONLINE GRATIS DE',
                    descripcion: 'Pruébalo gratis, sin descargas ni registros.',
                    boton: 'Crea un logotipo gratis'
                },
                seccion_seis: {
                    titulo: 'Puede que también te interese'
                }
            },
            footer: {
                linksInternos: [
                    {
                        url: '/terminos-y-condiciones',
                        nombre: 'Términos y condiciones'
                    },
                    {
                        url: '/avisos-legales',
                        nombre: 'Avisos Legales'
                    },
                    {
                        url: '',
                        nombre: 'Blog'
                    }
                ],
                redes: [
                    {
                        nombre: 'Instagram',
                        url: '#',
                        awesomeIcon: 'fab fa-instagram'
                    },
                    {
                        nombre: 'Twitter',
                        url: '#',
                        awesomeIcon: 'fab fa-twitter'
                    },
                    {
                        nombre: 'Facebook',
                        url: '#',
                        awesomeIcon: 'fab fa-facebook'
                    }
                ]
            }
        },
        login: {
            registro: {
                titulo: 'Crea una cuenta nueva',
                subtitulo: 'Busca los mejores diseños y guardalos solo para ti',
                form: {
                    nombre: {
                        label: 'Nombre',
                        validaciones: ['Este campo es requerido.']
                    },
                    correo: {
                        label: 'Correo',
                        validaciones: ['Este campo es requerido.', 'Debe ser un email válido', 'Este email no esta disponible.', 'Verificando la disponibilidad del email.']
                    },
                    contrasena: {
                        label: 'Contraseña',
                        validaciones: ['Este campo es requerido.', 'Debe tener más de 5 carácteres.', 'Debe tener menos de 20 carácteres.']
                    },
                    boton_submit: 'ENVIAR',
                    cuenta: 'Ya tienes una cuenta? Ingresa.'
                },
                imagenes: [
                    {
                        titulo: 'Ver tus logotipos ',
                        descripcion: 'editarlos y crear nuevos diseños',
                        url_imagen: 'eye.svg',
                        class: 'eye-image'
                    },
                    {
                        titulo: 'Guarda tus logos favoritos ',
                        descripcion: 'y ve su diseño en tarjetas de visita, indumentaria, perfiles de redes sociales y mucho mas!',
                        url_imagen: 'favorite_border',
                        icon: true
                    },
                    {
                        titulo: 'Personaliza tu logo',
                        descripcion: 'cambiando las fuentes, los colores, los iconos, el espaciado y más',
                        url_imagen: 'gear.svg',
                        class: 'gear-image'
                    }
                ]
            },
            login: {
                titulo: 'Ingresa a tu Cuenta',
                subtitulo: 'Mira tus creaciones en cualquier momento',
                form: {
                    correo: {
                        label: 'Correo',
                        validaciones: ['Este campo es requerido.', 'Debe ser un email válido.']
                    },
                    contrasena: {
                        label: 'Contraseña',
                        validaciones: ['Este campo es requerido.', 'Debe tener más de 6 carácteres.', 'Debe tener menos de 20 carácteres.']
                    },
                    boton_submit: 'INGRESAR',
                    cuenta: 'Aun no posees una cuenta? Registrate.',
                    olvido_contrasena: 'Olvidaste tu contraseña?'
                }
            },
            olvido: {
                titulo: 'Olvido de Contraseña',
                subtitulo: 'Segui los pasos y listo',
                boton_submit: 'Enviar',
                regresar: 'Regresar',
                form: {
                    correo: {
                        label: 'Correo',
                        validaciones: ['Este campo es requerido.', 'Debe ser un email válido.']
                    },
                    codigo: {
                        label: 'Codigo'
                    },
                    contrasena: {
                        label: 'Contraseña Nueva',
                        validaciones: ['Este campo es requerido.', 'Debe tener más de 6 carácteres.']
                    }
                }
            }
        }
    },
    "EN": {
        app_editor: {
            secciones: {
                inicio: {
                    combinaciones: {
                        guardar: "SAVE",
                        editar: "EDIT"
                    },
                    formulario: {
                        nombre: {
                            label: 'Name',
                            value: 'My logo',
                            placeholder: '',
                            validacion: []
                        },
                        categorias: {
                            label: 'Activity or sector',
                            placeholder: 'Activity or sector',
                            validacion: []
                        },
                        fuentes: {
                            label: "Typography style",
                            placeholder: "",
                            validacion: ["You must choose a Typography style."]
                        },
                        etiquetas: {
                            label: 'What are you looking for?',
                            placeholder: 'Example: Coffee',
                            validacion: []
                        },
                        color: {
                            label: 'Choose Colors',
                            placeholder: '',
                            validacion: ['You must choose a color.']
                        },
                        submit: ['LOAD MORE', 'SEARCH']
                    }
                },
                logos: [
                    'SAVED',
                    'PURCHASED',
                    'YOU DO NOT HAVE LOGOS YET',
                    'EDIT',
                    'BUY',
                    'DELETE',
                    'The logo was successfully deleted!',
                    'An error has occurred',
                    'STATIONERY',
                    'DOWNLOAD',
                    'SEND'
                ],
                cuenta: [
                    'Mail',
                    'First name',
                    'Phone',
                    'Country',
                    'Edit Data',
                    'Change Password',
                    'This field is required.',
                    'Save',
                    'Cancel',
                    'Old password',
                    'Must have a minimum of 8 characters.',
                    'New password',
                    'Change',
                    'Order number',
                    'Date',
                    'State',
                    'Logo',
                    'Plan',
                    'Price',
                    'Tax',
                    'TOTAL',
                    'HE HAS NOT MADE ANY PURCHASE'
                ],
                planes: [
                    'CHOOSE THE BEST PLAN FOR YOU',
                    'SELECT',
                    'Plans',
                    'THANK YOU FOR TAKING OUR FREE PLAN',
                    'Do you want to choose another plan?',
                    'CHOOSE ANOTHER PLAN',
                    'FOLLOW EDITING MY LOGO'
                ],
                editor: [
                    'Name of the logo', 'First name',
                    'Typography style',
                    'You must choose a Typography style.',
                    'Text',
                    'Size',
                    'Bold font',
                    'Italics',
                    'Decrease Size',
                    'Anumentar Size',
                    'Add slogan',
                    'Logo slogan',
                    'Slogan',
                    'Tags (Optional)',
                    'Category of the icon',
                    'Look for symbols',
                    'Orientation',
                    'Symbol above',
                    'Symbol to the left',
                    'YOUR LOGO',
                    'Background',
                    'Grid',
                    'RETURN',
                    'Plans',
                    'SAVE',
                    'BUY',
                    'LOAD',
                    'MORE',
                    'Search icons'
                ],
                pago: [
                    'Summary of your order',
                    'I accept the',
                    'Terms of Conditions and Use',
                    'Credit or debit card',
                    'PAY',
                ],
                descargar: [
                    'My logo',
                    'Stationery',
                    'Documents',
                    'Zip (All)',
                    'IMPROVE MY PLAN',
                    'DOWNLOAD',
                    'Social',
                    'Manual of marks',
                    '(Coming soon)',
                    'INCREASE YOUR PLAN AND OBTAIN BETTER BENEFITS',
                    'TO BUY'
                ],
                papeleria: [
                    'SAVE',
                    'DOWNLOAD',
                    'STATIONERY',
                    'EDIT',
                    'DOUBLE',
                    'REMOVE',
                    'BUY',
                    'Use Design',
                    'Create Stationery',
                    'SAVED',
                    'Improve my plan',
                    'INCREASE YOUR PLAN AND OBTAIN BETTER BENEFITS',
                ],
                papeleriaEditor: [
                    'SAVE',
                    'DOWNLOAD',
                    'STATIONERY',
                    'EDIT',
                    'DOUBLE',
                    'REMOVE',
                    'BUY',
                    'Use Design',
                    'Create Stationery',
                    'SAVED',
                    'Improve my plan',
                    'INCREASE YOUR PLAN AND OBTAIN BETTER BENEFITS',
                    'Drop the elements in the space you prefer',
                    'Align to the left',
                    'Align to the center',
                    'To align to the right',
                    'Sources',
                    'Remove',
                    'Drop Elements'
                ]
            }
        },
        landing: {
            SEO: {
                title: 'Logopro | Your logo in 3 minutes',
                keywords: 'logo maker, logo design, free, online, logo designer, free logo maker, online logo maker, logo creator, logo generator, create a logo, make a logo, design logo',
                description: "Logopro's free logo maker helps you create custom logos in minutes, no design experience needed. Try with millions of icons and 100+ fonts immediately!",
                lang: 'en-en',
            },
            header: {
                botones: ['LOGIN', 'SING IN'],
                iconos: ['Create logo', 'My logos', 'My account', 'Sign out']
            },
            secciones: {
                seccion_uno: {
                    titulo: `
                    Create in seconds a<br> logo that will love`,
                    subtitulo: `Our logo generator uses automatic learning <br>to design striking and unique concepts`,
                    formulario: {
                        nombre: {
                            label: 'Name of your logo',
                            placeholder: 'My logo',
                            validacion: ['Write the name of your logo.']
                        },
                        actividad: {
                            label: 'Activity or sector',
                            default_Select: 'Select'
                        },
                        etiquetas: {
                            label: 'What are you looking for?',
                            placeholder: 'Example: Coffee'
                        },
                        color: {
                            label: 'Color and Tipografy',
                            validacion: ['Select an Tipografy.']
                        },
                        boton: 'CREATE LOGO NOW'
                    }
                },
                seccion_dos: {
                    titulo: `GALERY OF LOGOS`,
                    url_categoria: '/logos-of-'
                },
                seccion_tres: {
                    titulo: '',
                    caracteristicas: [{
                        titulo: "De inmediato",
                        descripcion: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh",
                        icono: ["bg-carac-1", "right-bottom"]
                    }, {
                        titulo: "Más de 1 millon de logos",
                        descripcion: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh",
                        icono: ["bg-carac-2", "b-bottom"]
                    }, {
                        titulo: "Archivos en alta resolución",
                        descripcion: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh",
                        icono: ["bg-carac-3", "right-bottom"]
                    }, {
                        titulo: "Inteligencia artificial",
                        descripcion: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh",
                        icono: ["bg-carac-4", "b-bottom"]
                    }, {
                        titulo: "Gratis",
                        descripcion: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh",
                        icono: ["bg-carac-5", "b-right"]
                    }, {
                        titulo: "Múltiples aplicaciones",
                        descripcion: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh",
                        icono: ["bg-carac-6", ""]
                    }]
                },
                seccion_cuatro: {
                    titulo: 'Choose the best plan for you',
                    planes: [
                    ],
                    boton_plan: 'SELECT',
                    boton_final: 'CREATE LOGO NOW'
                },
                seccion_cinco: {
                    titulo: 'Frequent questions',
                    preguntas: [{
                        pregunta: "¿Cuanto cuesta el servicio?",
                        respuesta: `Logopro ofrece excelentes opciones de planes para la compra: el Plan básico de logotipo y el  Plan Profesional.<br/> <br/>
                        
                        Puede comprar sus archivos de logotipo por $9.9 por logo como parte de nuestro Plan básico, o elija el Plan Profesional $36, que le ofrece nuestra completa solución de marca y contiene una amplia gama de increíbles herramientas , archivos y características, ¡lo que le permite impulsar, construir y mejorar su marca realmente!
                        <br/> <br/>
                        
                        Para obtener más información, comuníquese con nuestro equipo de Atención al cliente a <a href="mailto:info@logo.pro">info@logo.pro</a>.<br/> `
                    }, {
                        pregunta: "¿Cómo puedo pagarlo?",
                        respuesta: `Logopro le da la facilidad mediante su tarjeta de credito o por paypal si asi lo desea.<br/> <br/>
                        
                        Para obtener más información, comuníquese con nuestro equipo de Atención al cliente a <a href="mailto:info@logo.pro">info@logo.pro</a>.<br/> `
                    }, {
                        pregunta: "¿Puedo cambiar el diseño después de comprar?",
                        respuesta: `
                        En sus logos guardados aparecerá el logo que acaba de comprar y podrá editarlo ilimitadamente. 
                        <br/> <br/>
                        
                        Para obtener más información, comuníquese con nuestro equipo de Atención al cliente a <a href="mailto:info@logo.pro">info@logo.pro</a>.<br/> `
                    }, {
                        pregunta: "¿Dónde lo puedo descargar?",
                        respuesta: `Igresando al sitio con su cuenta, podrá ir a sus logos comprados presionando el icono del menu.<br /><br /><div class='flex --row --center'><img src='landing/assets/img/tus-logos.jpg'></div>
                        <br/> <br/>
                        Para obtener más información, comuníquese con nuestro equipo de Atención al cliente a 
                        <a href="mailto:info@logo.pro">info@logo.pro</a>.<br/> `
                    }, {
                        pregunta: "¿En que formato puedo descargar el logo?",
                        respuesta: `Al momento de descargar su logo, este viene dentro de
                        un archivo comprimido en formato PNG y adecuado en varios tamaños listo para redes sociales, papeleria y publicidad.<br/> <br/>
                        
                        Para obtener más información, comuníquese con nuestro equipo de Atención al cliente a 
                        <a href="mailto:info@logo.pro">info@logo.pro</a>.<br/> `
                    },
                    {
                        pregunta: "¿Poseo los derechos plenos de mi logotipo comprado?",
                        respuesta: `Usted es libre de usar su logotipo comprado  para cualquier uso comercial o no comercial sin permiso adicional. Si desea colocar una marca comercial en su diseño, deberá hacerlo con la ayuda de un abogado familiarizado con las leyes de su estado o país en este momento.<br/> <br/>
                        Para obtener más información, comuníquese con nuestro equipo de Atención al cliente a 
                        <a href="mailto:info@logo.pro">info@logo.pro</a>`
                    }]
                }
            },
            footer: {
                linksInternos: [
                    {
                        url: '/terms-and-conditions',
                        nombre: 'Terms and Conditions'
                    },
                    {
                        url: '/avisos-legales',
                        nombre: 'Legal notices'
                    },
                    {
                        url: '',
                        nombre: 'Blog'
                    }
                ],
                redes: [
                    {
                        nombre: 'Instagram',
                        url: '#',
                        awesomeIcon: 'fab fa-instagram'
                    },
                    {
                        nombre: 'Twitter',
                        url: '#',
                        awesomeIcon: 'fab fa-twitter'
                    },
                    {
                        nombre: 'Facebook',
                        url: '#',
                        awesomeIcon: 'fab fa-facebook'
                    }
                ]
            }
        },
        categoria_pagina: {
            SEO: {
                title: 'Logopro | Tu logo en 3 minutos',
                keywords: 'creador de logos, diseño de logos, creador de logos online, generador de logos, Creador de logos gratis',
                description: 'El creador de logos Logopro te ayuda a crear logotipos personalizados en minutos, sin necesidad de experiencia en diseño. ¡Prueba con millones de iconos y más de 100 fuentes inmediatamente!',
                lang: 'es-es',
            },
            header: {
                botones: ['LOGIN', 'SING IN']
            },
            secciones: {
                seccion_uno: {
                    titulo: 'DESIGN LOGOS OF',
                    descripcion: "If you need a design, Logopro is the perfect logo maker you're looking for. It provides you with well-designed templates that can offer you a continuous inspiration to get ideas to create logos. Easy-to-use editing tools and huge art resources, such as millions of icons and beautiful fonts, provide endless customization possibilities for you to get a logo",
                    boton: 'GENERATE LOGO'
                },
                seccion_dos: {
                    titulo: 'Design templates of ',
                    descripcion: 'All these templates can help you customize your designs',
                    boton: 'MORE LOGO'
                },
                seccion_tres: {
                    titulo: 'Related searches'
                },
                seccion_cuatro: {
                    titulo: 'How to design a logo of 3 steps',
                    descripcion: 'Follow these steps to customize a',
                    descripcion_end: 'perfect with great ease.',
                    pasos: [
                        {
                            titulo: 'Choose a template',
                            descripcion: 'Choose from thousands of templates to start designing your logo.',
                            imagen_url: '../landing/assets/img/mockup1.png',
                            video_url: '../landing/assets/img/video1.mp4'
                        },
                        {
                            titulo: 'Add text and icon',
                            descripcion: 'Customize your logo with millions of icons, more than 100 fonts and powerful editing tools.',
                            imagen_url: '../landing/assets/img/mockup2.png',
                            video_url: '../landing/assets/img/video2.mp4'
                        },
                        {
                            titulo: 'Save',
                            descripcion: 'Save your logo in high resolution',
                            imagen_url: '../landing/assets/img/mockup3.png',
                            video_url: '../landing/assets/img/video3.mp4'
                        }
                    ]
                },
                seccion_cinco: {
                    titulo: 'CREATE FREE ONLINE LOGO',
                    descripcion: 'Try it for free, without downloads or registrations.',
                    boton: 'Create a free logo'
                },
                seccion_seis: {
                    titulo: 'You may also be interested'
                }
            },
            footer: {
                linksInternos: [
                    {
                        url: '/terms-and-conditions',
                        nombre: 'Terms and Conditions'
                    },
                    {
                        url: '/avisos-legales',
                        nombre: 'Legal notices'
                    },
                    {
                        url: '',
                        nombre: 'Blog'
                    }
                ],
                redes: [
                    {
                        nombre: 'Instagram',
                        url: '#',
                        awesomeIcon: 'fab fa-instagram'
                    },
                    {
                        nombre: 'Twitter',
                        url: '#',
                        awesomeIcon: 'fab fa-twitter'
                    },
                    {
                        nombre: 'Facebook',
                        url: '#',
                        awesomeIcon: 'fab fa-facebook'
                    }
                ]
            }
        },
        login: {
            registro: {
                titulo: 'Create a new account',
                subtitulo: 'Find the best designs and save them just for you',
                form: {
                    nombre: {
                        label: 'First name',
                        validaciones: ['This field is required.']
                    },
                    correo: {
                        label: 'Mail',
                        validaciones: ['This field is required.', 'Must be a valid email', 'This email is not available.', 'Verifying email availability.']
                    },
                    contrasena: {
                        label: 'Password',
                        validaciones: ['This field is required.', 'Must have more than 5 characters.', 'Must have less than 20 characters.']
                    },
                    boton_submit: 'SING IN',
                    cuenta: 'You have an account? Sing up'
                },
                imagenes: [
                    {
                        titulo: 'See your logos ',
                        descripcion: 'edit them and create new designs',
                        url_imagen: 'eye.svg',
                        class: 'eye-image'
                    },
                    {
                        titulo: 'Save your favorite logos',
                        descripcion: 'and see its design on business cards, clothing, social network profiles and much more!',
                        url_imagen: 'favorite_border',
                        icon: true
                    },
                    {
                        titulo: 'Customize your logo',
                        descripcion: 'changing fonts, colors, icons, spacing and more',
                        url_imagen: 'gear.svg',
                        class: 'gear-image'
                    }
                ]
            },
            login: {
                titulo: 'Log in to your account',
                subtitulo: 'See your creations at any time',
                form: {
                    correo: {
                        label: 'Mail',
                        validaciones: ['This field is required.', 'Must be a valid email.']
                    },
                    contrasena: {
                        label: 'Password',
                        validaciones: ['This field is required.', 'Must have more than 6 characters.', 'Must have less than 20 characters.']
                    },
                    boton_submit: 'SING IN',
                    cuenta: 'You do not have an account yet? Sign up',
                    olvido_contrasena: 'Did you forget your password?'
                }
            },
            olvido: {
                titulo: 'Forget password',
                subtitulo: 'Follow the steps and ready',
                boton_submit: 'Submit',
                regresar: 'Go Back',
                form: {
                    correo: {
                        label: 'Mail',
                        validaciones: ['This field is required.', 'Must be a valid email.']
                    },
                    codigo: {
                        label: 'Code'
                    },
                    contrasena: {
                        label: 'New password',
                        validaciones: ['This field is required.', 'Must have more than 6 characters.']
                    }
                }
            }
        }
    },
    "PT": {
        app_editor: {
            secciones: {
                inicio: {
                    combinaciones: {
                        guardar: "SALVAR",
                        editar: "EDITAR"
                    },
                    formulario: {
                        nombre: {
                            label: 'Nome',
                            value: 'Meu logotipo',
                            placeholder: '',
                            validacion: []
                        },
                        categorias: {
                            label: 'Atividade ou setor',
                            placeholder: 'Categorías',
                            validacion: []
                        },
                        fuentes: {
                            label: "Estilo de tipografía",
                            placeholder: "",
                            validacion: ["Debes elegir un estilo de Tipografía."]
                        },
                        etiquetas: {
                            label: '¿Que buscas?',
                            placeholder: 'Ejemplo: Café',
                            validacion: []
                        },
                        color: {
                            label: 'Seleccionar colores',
                            placeholder: '',
                            validacion: ['Debes elegir al menos un color.']
                        },
                        submit: ['CARGAR MÁS', 'BUSCAR']
                    }
                },
                logos: [
                    'SALVAR',
                    'COMPRADO',
                    'VOCÊ NÃO TEM LOGOS AINDA',
                    'EDIT',
                    'BUY',
                    'DELETE',
                    'O logotipo foi excluído com sucesso!',
                    'Ocorreu um erro',
                    'PAPERWORK',
                    'DOWNLOAD',
                    'SEND'
                ],
                cuenta: [
                    'Mail',
                    'Nome',
                    'Telefone',
                    'País',
                    'Editar dados',
                    'Alterar senha',
                    'Este campo é obrigatório',
                    'Salvar',
                    'Cancelar',
                    'Senha antiga',
                    'Deve ter no mínimo 8 caracteres.',
                    'Nova senha',
                    'Change',
                    'Número do pedido',
                    'Data',
                    'Estado',
                    'Logo',
                    'Plan',
                    'Preço',
                    'Imposto',
                    "TOTAL",
                    'ELE NÃO FEZ QUALQUER COMPRA'
                ],
                planes: [
                    'ESCOLHA O MELHOR PLANO PARA VOCÊ',
                    'SELECT',
                    'Planos',
                    "OBRIGADO POR TOMAR NOSSO PLANO LIVRE",
                    'Você quer escolher outro plano?',
                    "ESCOLHA OUTRO PLANO",
                    'SIGA EDITANDO MEU LOGOTIPO'
                ],
                editor: [
                    'Nome do logotipo',
                    'Nome',
                    'Tipografia',
                    "Você deve escolher um estilo de tipografia.",
                    'Text',
                    'Tamanho',
                    'Negrito',
                    'Cursive',
                    'Diminuir o tamanho',
                    'Anumentar Size',
                    'Adicionar slogan',
                    'Slogan do logotipo',
                    'Slogan',
                    'Tags (Opcional)',
                    'Categoria do ícone',
                    "Procure por símbolos",
                    'Orientação',
                    'Símbolo acima',
                    "Símbolo à esquerda",
                    'SEU LOGOTIPO',
                    'Fundo',
                    'Grid',
                    'BACK',
                    'Planos',
                    'SALVAR',
                    'BUY',
                    'LOAD',
                    'MAS',
                    'Pesquisar ícones'
                ],
                pago: [
                    "Resumo do seu pedido",
                    'Eu aceito o',
                    'Termos de Condições e Uso',
                    "Cartão de crédito ou débito",
                    'PAY',
                ],
                descargar: [
                    'Meu logotipo',
                    'Papelaria',
                    'Documentos',
                    'Zip (todos)',
                    'MELHORE MEU PLANO',
                    'DOWNLOAD',
                    'Social',
                    'Manual of marks',
                    '(Em breve)',
                    'Aumentar o seu plano e obter melhores benefícios',
                    'BUY'
                ],
                papeleria: [
                    'SALVAR',
                    'DOWNLOAD',
                    'PAPELARIA',
                    'EDIT',
                    'DUPLICATE',
                    'DELETE',
                    'BUY',
                    'Use Design',
                    'Criar papel de carta',
                    'SALVAR',
                    'Melhore meu plano',
                    'AUMENTE O SEU PLANO E OBTENHA MELHORES BENEFÍCIOS'
                ],
                papeleriaEditor: [
                    'SALVAR',
                    'DOWNLOAD',
                    'PAPELARIA',
                    'EDIT',
                    'DUPLICATE',
                    'DELETE',
                    'BUY',
                    'Use Design',
                    'Criar papel de carta',
                    'SALVAR',
                    'Melhore meu plano',
                    'Aumentar o seu plano e obter melhores benefícios',
                    'Solte os elementos no espaço que você preferir',
                    'Alinhar para a esquerda',
                    'Alinhar ao centro',
                    'Alinhar à direita',
                    'Fontes',
                    'Excluir',
                    'Soltar Elementos'
                ]
            }
        },
        landing: {
            SEO: {
                title: 'Logopro | Seu logotipo em 3 minutos',
                keywords: 'criador de logo, criador de logo online, gerador de logo',
                description: "O criador de logo grátis de DesignEvo ajuda-te a criar logótipos personalizados em poucos minutos, sem a necessidade de teres experiência em design. Experimenta imediatamente os seus milhões de ícones e +100 tipos de letra!",
                lang: 'pt-pt',
            },
            header: {
                botones: ['Acesso', 'Registo'],
                iconos: ['Criar logotipo', 'Meu logotipos', 'Minha conta', 'Fechar sessão']
            },
            secciones: {
                seccion_uno: {
                    titulo: `Crie um logotipo em <br> segundos que você  <br> vai amar`,
                    subtitulo: `O nosso gerador de logótipos utiliza a<br> aprendizagem automática para <br>conceber conceitos marcantes e únicos`,
                    formulario: {
                        nombre: {
                            label: 'Nome do seu logotipo',
                            placeholder: 'Meu logotipo',
                            validacion: ['Escreva o nome do seu logotipo.']
                        },
                        actividad: {
                            label: 'Atividade ou setor',
                            default_Select: 'Selecione'
                        },
                        etiquetas: {
                            label: 'O que procura?',
                            placeholder: 'Exemplo: Café'
                        },
                        color: {
                            label: 'Cor e Tipografia',
                            validacion: ['Selecione um estilo de tipografia']
                        },
                        boton: 'GERAR LOGO'
                    }
                },
                seccion_dos: {
                    titulo: `GALERIA DE LOGOS`,
                    url_categoria: '/logotipos-de-'
                },
                seccion_tres: {
                    titulo: '',
                    caracteristicas: [{
                        titulo: "De imediato",
                        descripcion: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh",
                        icono: ["bg-carac-1", "right-bottom"]
                    }, {
                        titulo: "Mais de 1 milhão de logotipos",
                        descripcion: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh",
                        icono: ["bg-carac-2", "b-bottom"]
                    }, {
                        titulo: "Arquivos em alta resolução",
                        descripcion: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh",
                        icono: ["bg-carac-3", "right-bottom"]
                    }, {
                        titulo: "Inteligência artificial",
                        descripcion: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh",
                        icono: ["bg-carac-4", "b-bottom"]
                    }, {
                        titulo: "Grátis",
                        descripcion: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh",
                        icono: ["bg-carac-5", "b-right"]
                    }, {
                        titulo: "Múltiplas aplicações",
                        descripcion: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh",
                        icono: ["bg-carac-6", ""]
                    }]
                },
                seccion_cuatro: {
                    titulo: 'Escolha o melhor plano para você',
                    planes: [
                    ],
                    boton_plan: 'SELECIONAR',
                    boton_final: 'CRIE LOGO AGORA'
                },
                seccion_cinco: {
                    titulo: 'Perguntas frequentes',
                    preguntas: [{
                        pregunta: "Quanto custa o serviço?",
                        respuesta: `Logopro ofrece excelentes opciones de planes para la compra: el Plan básico de logotipo y el  Plan Profesional.<br/> <br/>
                    
                    Puede comprar sus archivos de logotipo por $9.9 por logo como parte de nuestro Plan básico, o elija el Plan Profesional $36, que le ofrece nuestra completa solución de marca y contiene una amplia gama de increíbles herramientas , archivos y características, ¡lo que le permite impulsar, construir y mejorar su marca realmente!
                    <br/> <br/>
                    
                    Para obtener más información, comuníquese con nuestro equipo de Atención al cliente a <a href="mailto:info@logo.pro">info@logo.pro</a>.<br/> `
                    }, {
                        pregunta: "Como posso pagar?",
                        respuesta: `Logopro le da la facilidad mediante su tarjeta de credito o por paypal si asi lo desea.<br/> <br/>
                    
                    Para obtener más información, comuníquese con nuestro equipo de Atención al cliente a <a href="mailto:info@logo.pro">info@logo.pro</a>.<br/> `
                    }, {
                        pregunta: " Posso mudar o design depois de comprar?",
                        respuesta: `
                    En sus logos guardados aparecerá el logo que acaba de comprar y podrá editarlo ilimitadamente. 
                    <br/> <br/>
                    
                    Para obtener más información, comuníquese con nuestro equipo de Atención al cliente a <a href="mailto:info@logo.pro">info@logo.pro</a>.<br/> `
                    }, {
                        pregunta: "Onde posso baixá-lo?",
                        respuesta: `Igresando al sitio con su cuenta, podrá ir a sus logos comprados presionando el icono del menu.<br /><br /><div class='flex --row --center'><img src='landing/assets/img/tus-logos.jpg'></div>
                    <br/> <br/>
                    Para obtener más información, comuníquese con nuestro equipo de Atención al cliente a 
                    <a href="mailto:info@logo.pro">info@logo.pro</a>.<br/> `
                    }, {
                        pregunta: "Em qual formato posso baixar o logotipo?",
                        respuesta: `Al momento de descargar su logo, este viene dentro de
                    un archivo comprimido en formato PNG y adecuado en varios tamaños listo para redes sociales, papeleria y publicidad.<br/> <br/>
                    
                    Para obtener más información, comuníquese con nuestro equipo de Atención al cliente a 
                    <a href="mailto:info@logo.pro">info@logo.pro</a>.<br/> `
                    },
                    {
                        pregunta: "Eu tenho todos os direitos do meu logotipo comprado?",
                        respuesta: `Usted es libre de usar su logotipo comprado  para cualquier uso comercial o no comercial sin permiso adicional. Si desea colocar una marca comercial en su diseño, deberá hacerlo con la ayuda de un abogado familiarizado con las leyes de su estado o país en este momento.<br/> <br/>
                    Para obtener más información, comuníquese con nuestro equipo de Atención al cliente a 
                    <a href="mailto:info@logo.pro">info@logo.pro</a>`
                    }]
                }
            },
            footer: {
                linksInternos: [
                    {
                        url: '/terminos-y-condiciones',
                        nombre: 'Termos e Condições'
                    },
                    {
                        url: '/avisos-legales',
                        nombre: 'Avisos Legais'
                    },
                    {
                        url: '',
                        nombre: 'Blog'
                    }
                ],
                redes: [
                    {
                        nombre: 'Instagram',
                        url: '#',
                        awesomeIcon: 'fab fa-instagram'
                    },
                    {
                        nombre: 'Twitter',
                        url: '#',
                        awesomeIcon: 'fab fa-twitter'
                    },
                    {
                        nombre: 'Facebook',
                        url: '#',
                        awesomeIcon: 'fab fa-facebook'
                    }
                ]
            }
        },
        categoria_pagina: {
            SEO: {
                title: 'Logopro | Tu logo en 3 minutos',
                keywords: 'creador de logos, diseño de logos, creador de logos online, generador de logos, Creador de logos gratis',
                description: 'El creador de logos Logopro te ayuda a crear logotipos personalizados en minutos, sin necesidad de experiencia en diseño. ¡Prueba con millones de iconos y más de 100 fuentes inmediatamente!',
                lang: 'pt-pt',
            },
            header: {
                botones: ['Acesso', 'Registo']
            },
            secciones: {
                seccion_uno: {
                    titulo: 'LOGÓTIPOS DE DESIGN DE',
                    descripcion: 'Se você precisa de um design, o Logopro é o criador de logos perfeito que você está procurando. Ele fornece modelos bem projetados que podem oferecer uma inspiração contínua para obter ideias para criar logotipos. Ferramentas de edição fáceis de usar e grandes recursos de arte, como milhões de ícones e belas fontes, oferecem infinitas possibilidades de personalização para você obter um logotipo',
                    boton: 'GERAR LOGO'
                },
                seccion_dos: {
                    titulo: 'Modelos de design',
                    descripcion: 'Todos esses modelos podem ajudá-lo a personalizar seus projetos',
                    boton: 'MAIS LOGO'
                },
                seccion_tres: {
                    titulo: 'Pesquisas relacionadas'
                },
                seccion_cuatro: {
                    titulo: 'Como projetar um logotipo de 3 passos',
                    descripcion: 'Siga estas etapas para personalizar um',
                    descripcion_end: 'perfeito com grande facilidade.',
                    pasos: [
                        {
                            titulo: 'Escolha um modelo',
                            descripcion: 'Escolha entre milhares de modelos para começar a criar seu logotipo.',
                            imagen_url: '../landing/assets/img/mockup1.png',
                            video_url: '../landing/assets/img/video1.mp4'
                        },
                        {
                            titulo: 'Adicione texto e ícone',
                            descripcion: 'Personalize seu logotipo com milhões de ícones, mais de 100 fontes e poderosas ferramentas de edição.',
                            imagen_url: '../landing/assets/img/mockup2.png',
                            video_url: '../landing/assets/img/video2.mp4'
                        },
                        {
                            titulo: 'Guarda',
                            descripcion: 'Salve seu logotipo em alta resolução.',
                            imagen_url: '../landing/assets/img/mockup3.png',
                            video_url: '../landing/assets/img/video3.mp4'
                        }
                    ]
                },
                seccion_cinco: {
                    titulo: 'CRIE LOGO ONLINE GRATUITO',
                    descripcion: 'Experimente de graça, sem downloads ou registros.',
                    boton: 'Crie um logo grátis'
                },
                seccion_seis: {
                    titulo: 'Você também pode estar interessado'
                }
            },
            footer: {
                linksInternos: [
                    {
                        url: '/terminos-y-condiciones',
                        nombre: 'Termos e Condições'
                    },
                    {
                        url: '/avisos-legales',
                        nombre: 'Avisos Legais'
                    },
                    {
                        url: '',
                        nombre: 'Blog'
                    }
                ],
                redes: [
                    {
                        nombre: 'Instagram',
                        url: '#',
                        awesomeIcon: 'fab fa-instagram'
                    },
                    {
                        nombre: 'Twitter',
                        url: '#',
                        awesomeIcon: 'fab fa-twitter'
                    },
                    {
                        nombre: 'Facebook',
                        url: '#',
                        awesomeIcon: 'fab fa-facebook'
                    }
                ]
            }
        },
        login: {
            registro: {
                titulo: 'Create a new account',
                subtitulo: 'Encontre os melhores desenhos e salve-os só para você',
                form: {
                    nombre: {
                        label: 'Nome',
                        validaciones: ['Este campo é obrigatório.']
                    },
                    correo: {
                        label: 'Mail',
                        validaciones: ['Este campo é obrigatório.', 'Deve ser um e-mail válido', 'Este e-mail não está disponível.', 'Verificando a disponibilidade de e-mail']
                    },
                    contrasena: {
                        label: 'Senha',
                        validaciones: ['Este campo é obrigatório.', 'Deve ter mais de 5 caracteres.', 'Deve ter menos de 20 caracteres.']
                    },
                    boton_submit: 'ENVIAR',
                    cuenta: 'Já tem uma conta? Entrar'
                },
                imagenes: [
                    {
                        titulo: 'Veja seus logotipos ',
                        descripcion: 'Edite-os e crie novos designs',
                        url_imagen: 'eye.svg',
                        class: 'eye-image'
                    },
                    {
                        titulo: 'Salve seus logotipos favoritos ',
                        descripcion: 'e veja seu design em cartões de visita, roupas, perfis de redes sociais e muito mais!',
                        url_imagen: 'favorite_border',
                        icon: true
                    },
                    {
                        titulo: 'Personalize seu logotipo',
                        descripcion: 'mudança de fontes, cores, ícones, espaçamento e muito mais',
                        url_imagen: 'gear.svg',
                        class: 'gear-image'
                    }
                ]
            },
            login: {
                titulo: 'Entre na sua conta',
                subtitulo: 'Veja suas criações a qualquer momento',
                form: {
                    correo: {
                        label: 'Mail',
                        validaciones: ['Este campo é obrigatório.', 'Deve ser um email válido.']
                    },
                    contrasena: {
                        label: 'Senha',
                        validaciones: ['Este campo é obrigatório.', 'Deve ter mais de 6 caracteres.', 'Deve ter menos de 20 caracteres.']
                    },
                    boton_submit: 'ENTER',
                    cuenta: 'Você ainda não tem uma conta? Cadastre-se',
                    olvido_contrasena: 'Esqueceu sua senha?'
                }
            },
            olvido: {
                titulo: 'Esqueceu a Senha',
                subtitulo: 'Siga os passos e pronto',
                boton_submit: 'Enviar',
                regresar: 'Retorno',
                form: {
                    correo: {
                        label: 'Mail',
                        validaciones: ['Este campo é obrigatório.', 'Deve ser um email válido.']
                    },
                    codigo: {
                        label: 'Code'
                    },
                    contrasena: {
                        label: 'Nova senha',
                        validaciones: ['Este campo é obrigatório.', 'Deve ter mais de 6 caracteres.']
                    }
                }
            }
        }
    }
};
