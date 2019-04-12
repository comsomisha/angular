function showError(selector, text) {
    $(selector).html(text);
    $(selector).show().delay(3000).hide("slow");
}