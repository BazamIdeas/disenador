const langs = ["ES", "EN", "PR"];


exports.getOrSetLang = (req, res, lowerCase) => {

    const cookies = req.cookies;

    let langCookie = cookies["logoLang"];

    //si no existe o si existe y es invalido
    if(!langCookie || (langCookie && !langs.includes(langCookie))) {
        
        res.cookie("logoLang", "ES"); 

        langCookie = "ES";
    }  

    if(lowerCase){//llevar a miniscula si necesario
        langCookie = langCookie.toLowerCase();
    }

    return langCookie;

}

exports.setLang = (res, lang) => {

    let langValue = lang ? lang.toUpperCase() : "ES";

    if(!langs.includes(langValue)) {
        langValue = "ES";
    }

    res.cookie("logoLang", langValue); 

}