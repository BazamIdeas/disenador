exports.langs = {
    "ES": [
        {
            idPlan: 0,
            plan: 'PLAN GRATUITO',
            status: 1,
            info: 'Información del plan Básico',
            precios: [{
                precio: 'GRATIS',
            }],
            caracteristicas: [{
                clave: 'resolucion',
                valor: '1',
                descripcion: 'Versión pequeña de su logo.'
            }]
        },
        {
            idPlan: 1,
            plan: 'Plan Básico',
            status: 1,
            info: 'Información del plan Básico',
            precios: [{
                idPrecio: 1,
                precio: 9.9,
                status: 1,
                planes_idPlan: 1,
                monedas_idMoneda: 1,
                idMoneda: 1,
                moneda: 'USD'
            }],
            caracteristicas: [{
                clave: 'resolucion',
                valor: '0',
                descripcion: 'Logo en Alta Resolución.'
            },
            {
                clave: 'png',
                valor: '1',
                descripcion: 'Archivo Png Transparente.'
            },
            {
                clave: 'editable',
                valor: '0',
                descripcion: 'Archivo editable con la  tipografia incluida.'
            },
            { clave: 'manual', valor: '0', descripcion: 'Manual de marca.' },
            {
                clave: 'tamanios',
                valor: '1',
                descripcion: 'Tamaño del logo adaptado a papeleria y redes sociales.'
            },
            {
                clave: 'copia',
                valor: '1',
                descripcion: 'Copia de seguridad de por vida.'
            },
            {
                clave: 'licencia',
                valor: '1',
                descripcion: 'Licencia comercial.'
            }]
        },
        {
            idPlan: 2,
            plan: 'Plan Profesional',
            status: 1,
            info: 'Descripción del plan profesional',
            precios: [{
                idPrecio: 2,
                precio: 36,
                status: 1,
                planes_idPlan: 2,
                monedas_idMoneda: 1,
                idMoneda: 1,
                moneda: 'USD'
            }],
            caracteristicas: [
                {
                    clave: 'editable',
                    valor: '1',
                    descripcion: 'Archivo editable con la  tipografia incluida.'
                },
                {
                    clave: 'resolucion',
                    valor: '1',
                    descripcion: 'Logo en Alta Resolución.'
                },
                {
                    clave: 'manual',
                    valor: '1',
                    descripcion: 'Manual de marca.'
                },
                {
                    clave: 'png',
                    valor: '1',
                    descripcion: 'Archivo Png Transparente.'
                },
                {
                    clave: 'licencia',
                    valor: '1',
                    descripcion: 'Licencia comercial.'
                },
                {
                    clave: 'copia',
                    valor: '1',
                    descripcion: 'Copia de seguridad de por vida.'
                },
                {
                    clave: 'tamanios',
                    valor: '1',
                    descripcion: 'Tamaño del logo adaptado a papeleria y redes sociales.'
                },
                {
                    clave: 'papeleria',
                    valor: '1',
                    descripcion: 'Papeleria con increibles modelos a elegir'
                }
            ]
        }
    ],
    "EN": [
        {
            idPlan: 0,
            plan: 'FREE PLAN',
            status: 1,
            info: 'Basic plan information',
            precios: [{
                precio: 'FREE',
            }],
            caracteristicas: [{
                clave: 'resolucion',
                valor: '1',
                descripcion: 'Small version of your logo.'
            }]
        },
        {
            idPlan: 1,
            plan: 'Basic plan',
            status: 1,
            info: 'Basic plan information',
            precios: [{
                idPrecio: 1,
                precio: 9.9,
                status: 1,
                planes_idPlan: 1,
                monedas_idMoneda: 1,
                idMoneda: 1,
                moneda: 'USD'
            }],
            caracteristicas: [{
                clave: 'resolucion',
                valor: '0',
                descripcion: 'Logo in High Resolution.'
            },
            {
                clave: 'png',
                valor: '1',
                descripcion: 'Transparent PNG file.'
            },
            {
                clave: 'editable',
                valor: '0',
                descripcion: 'Editable file with typography included.'
            },
            { clave: 'manual', valor: '0', descripcion: 'Manual de marca.' },
            {
                clave: 'tamanios',
                valor: '1',
                descripcion: 'Size of the logo adapted to stationery and social networks.'
            },
            {
                clave: 'copia',
                valor: '1',
                descripcion: 'Lifetime backup.'
            },
            {
                clave: 'licencia',
                valor: '1',
                descripcion: 'Commercial license.'
            }]
        },
        {
            idPlan: 2,
            plan: 'Professional Plan',
            status: 1,
            info: 'Description of the professional plan',
            precios: [{
                idPrecio: 2,
                precio: 36,
                status: 1,
                planes_idPlan: 2,
                monedas_idMoneda: 1,
                idMoneda: 1,
                moneda: 'USD'
            }],
            caracteristicas: [
                {
                    clave: 'editable',
                    valor: '1',
                    descripcion: 'Editable file with typography included.'
                },
                {
                    clave: 'resolucion',
                    valor: '1',
                    descripcion: 'Logo in High Resolution.'
                },
                {
                    clave: 'manual',
                    valor: '1',
                    descripcion: 'Brand manual.'
                },
                {
                    clave: 'png',
                    valor: '1',
                    descripcion: 'Transparent PNG file.'
                },
                {
                    clave: 'licencia',
                    valor: '1',
                    descripcion: 'Commercial license.'
                },
                {
                    clave: 'copia',
                    valor: '1',
                    descripcion: 'Lifetime backup.'
                },
                {
                    clave: 'tamanios',
                    valor: '1',
                    descripcion: 'Size of the logo adapted to stationery and social networks.'
                },
                {
                    clave: 'papeleria',
                    valor: '1',
                    descripcion: 'Stationery with incredible models to choose from'
                }
            ]
        }
    ],
    "PT": [
        {
            idPlan: 0,
            plan: 'PLANO LIVRE',
            status: 1,
            info: 'Informação básica do plano',
            precios: [{
                precio: 'GRÁTIS',
            }],
            caracteristicas: [{
                clave: 'resolucion',
                valor: '1',
                descripcion: 'Versão pequena do seu logotipo.'
            }]
        },
        {
            idPlan: 1,
            plan: 'Plano Básico',
            status: 1,
            info: 'Informação básica do plano',
            precios: [{
                idPrecio: 1,
                precio: 9.9,
                status: 1,
                planes_idPlan: 1,
                monedas_idMoneda: 1,
                idMoneda: 1,
                moneda: 'USD'
            }],
            caracteristicas: [{
                clave: 'resolucion',
                valor: '0',
                descripcion: 'Logo em alta resolução.'
            },
            {
                clave: 'png',
                valor: '1',
                descripcion: 'Arquivo PNG transparente.'
            },
            {
                clave: 'editable',
                valor: '0',
                descripcion: 'Arquivo editável com tipografia incluída.'
            },
            { clave: 'manual', valor: '0', descripcion: 'Manual da marca.' },
            {
                clave: 'tamanios',
                valor: '1',
                descripcion: 'Tamanho do logotipo adaptado para papelaria e redes sociais.'
            },
            {
                clave: 'copia',
                valor: '1',
                descripcion: 'Backup vitalício'
            },
            {
                clave: 'licencia',
                valor: '1',
                descripcion: 'Licença comercial'
            }]
        },
        {
            idPlan: 2,
            plan: 'Plano Profissional',
            status: 1,
            info: 'Descrição do plano profissional',
            precios: [{
                idPrecio: 2,
                precio: 36,
                status: 1,
                planes_idPlan: 2,
                monedas_idMoneda: 1,
                idMoneda: 1,
                moneda: 'USD'
            }],
            caracteristicas: [{
                clave: 'editable',
                valor: '1',
                descripcion: 'Arquivo editável com tipografia incluída.'
            },
            {
                clave: 'resolucion',
                valor: '1',
                descripcion: 'Logo em alta resolução.'
            },
            { clave: 'manual', valor: '1', descripcion: 'Manual da marca.' },
            {
                clave: 'png',
                valor: '1',
                descripcion: 'Arquivo PNG transparente.'
            },
            {
                clave: 'licencia',
                valor: '1',
                descripcion: 'Licença comercial'
            },
            {
                clave: 'copia',
                valor: '1',
                descripcion: 'Backup vitalício'
            },
            {
                clave: 'tamanios',
                valor: '1',
                descripcion: 'Tamanho do logotipo adaptado para papelaria e redes sociais.'
            },
            {
                clave: 'papeleria',
                valor: '1',
                descripcion: 'Artigos de papelaria com modelos incríveis para escolher'
            }]
        }
    ]
}