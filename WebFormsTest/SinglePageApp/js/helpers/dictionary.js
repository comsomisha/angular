
var
    tmp = null;
//Example dicts = [{templateName, url, elementID, onsuccess}]
function prepareDictionaries(dicts) {
    for (var i = 0; i < dicts.length; i++) {
        $.ajax(
            {
                url: dicts[i].url, 
                method: "GET",
                context: dicts[i],
                success: function (data, status) {
                    $.tmpl(this.templateName, data).appendTo("#" + this.elementID);
                    if (this.onsuccess && this.onsuccess != 'undefined') {
                        this.onsuccess(this);
                    }                    
                }
            });
    }
}