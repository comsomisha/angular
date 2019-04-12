function loadAndRegisterTemplate(name, URL) {
    $.ajax(
        {
            url: URL,
            method: "GET",
            cache: false,
            success: function (data, status) {
                $.template(name, data);
                console.log(data);
            }
        });
}
function prepareTemplates() {
    loadAndRegisterTemplate("student_table_item", "http://localhost:63505/tmpl/student_table_item.html")
    loadAndRegisterTemplate("radio_item", "http://localhost:63505/tmpl/radio_item.html")
}
