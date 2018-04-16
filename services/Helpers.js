exports.normalize = (() => {
    const from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
        to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
        mapping = {};

    for (let i = 0, j = from.length; i < j; i++)
        mapping[from.charAt(i)] = to.charAt(i);

    return (str) => {
        let ret = [];
        for (var i = 0, j = str.length; i < j; i++) {
            let c = str.charAt(i);
            if (mapping.hasOwnProperty(str.charAt(i)))
                ret.push(mapping[c]);
            else
                ret.push(c);
        }
        return ret.join('');
    }
})();