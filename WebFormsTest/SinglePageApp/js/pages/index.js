

function addStudent(student) {
    $.ajax(
        {
            url: "http://localhost:64448/api/student",
            method: "POST",
            data: student,
            success: function (data, status) {
                $("#addDialog").dialog("close");
                loadStudents();
            },
            error: function (e) {
                if (e.status == 400) {
                    showError("#addStudentErrorDiv", "Please input correct data");
                }
                else {
                    showError("#addStudentErrorDiv", e.statusText);
                }

            }
        });
}

function deleteStudent(id) {
    $.ajax(
        {
            url: "http://localhost:64448/api/student?id=" + id,
            method: "DELETE",
            success: function (data, status) {
                console.log(data);
                console.log(status);
                loadStudents();
            }
        });
}

function updateStudent(id, student) {
    console.log('data to be sent');
    console.log(student);
    $.ajax(
        {
            url: "http://localhost:64448/api/student?id=" + id,
            method: "PUT",
            data: student,
            success: function (data, status) {
                $("#addDialog").dialog("close");
                loadStudents();
            },
            error: function (e) {
                if (e.status == 400) {
                    showError("#addStudentErrorDiv", "Please input correct data");
                }
                else {
                    showError("#addStudentErrorDiv", e.statusText);
                }

            }
        });

}

function getSexID() {
    var o = $("input[name=radioGroup]:checked").attr('id');
    if (o != null && o !== "undefined")
        return parseInt(o.replace('radio-', ''));
    return null;
}

function editStudent(id) {
    $.ajax(
        {
            url: "http://localhost:64448/api/student?id=" + id,
            method: "GET",
            success: function (data, status) {
                console.log(data);
                $("#iName").val(data.Name);
                $("#iSurname").val(data.Surname);
                $("#iCourse").val(data.Course);
                $("#iGroup").val(data.Group);
                $(".radio_item").prop('checked', false);
                $("#radio-" + data.SexID).prop('checked', true);
                $(".radio_item").checkboxradio("refresh");

                $("#addDialog").dialog(
                    {
                        title: "Edit student",
                        closeOnEscape: true,
                        buttons: [
                            {
                                text: "Save",
                                icon: "ui-icon-delete",
                                click: function () {
                                    updateStudent(id, {
                                        ID: id,
                                        Name: $("#iName").val(),
                                        Surname: $("#iSurname").val(),
                                        Course: $("#iCourse").val(),
                                        Group: $("#iGroup").val(),
                                        SexID: getSexID()
                                    });
                                    $("#addDialog").dialog("close");
                                }
                            },
                            {
                                text: "Close",
                                icon: "ui-icon-close",
                                click: function () {
                                    $("#addDialog").dialog("close");
                                }
                            },
                        ]
                    }
                );
            }
        });
}

function loadStudents() {
    $(".target").empty();
    $.ajax(
        {
            url: "http://localhost:64448/api/students",
            method: "GET",
            success: function (data, status) {
                $.tmpl("student_table_item", data).appendTo(".target");
                $("#loading").hide();
                $("#content").show();
                console.log(data);
            }
        });
}


function pageLoad()
{
    prepareTemplates();

    $(".target").on("click", ".btnDelete", function (e) {
        var id = e.currentTarget.value;
        //console.log("Going to delete " + id);
        $("#deleteConfirmDialog").dialog(
            {
                title: "PLease confirm",
                closeOnEscape: true,
                buttons: [
                    {
                        text: "Delete",
                        icon: "ui-icon-delete",
                        click: function () {
                            deleteStudent(id);
                            $("#deleteConfirmDialog").dialog("close");
                        }
                    },
                    {
                        text: "Close",
                        icon: "ui-icon-close",
                        click: function () {
                            $("#deleteConfirmDialog").dialog("close");
                        }
                    },
                ]
            }
        );

        console.log(id);
    });

    $(".target").on("click", ".btnEdit", function (e) {
        var id = e.currentTarget.value;
        editStudent(id);
    });

    loadStudents();

    prepareDictionaries([{
        templateName: "radio_item",
        url: "http://localhost:64448/api/sexes",
        elementID: "iSex",
        onsuccess: function () {
            $(".radio_item").checkboxradio();
        }
    }]);

    $("#btnAdd").click(function () {
        $("#iName").val('');
        $("#iSurname").val('');
        $("#iCourse").val('');
        $("#iGroup").val('');
        $(".radio_item").prop('checked', false);
        $(".radio_item").checkboxradio("refresh");

        $("#addDialog").dialog(
            {
                title: "Add New Student",
                closeOnEscape: true,
                buttons: [
                    {
                        text: "Save",
                        icon: "ui-icon-save",
                        click: function () {
                            addStudent({
                                name: $("#iName").val(),
                                surname: $("#iSurname").val(),
                                course: $("#iCourse").val(),
                                group: $("#iGroup").val(),
                                SexID: getSexID()
                            });
                        }
                    },
                    {
                        text: "Close",
                        icon: "ui-icon-close",
                        click: function () {
                            $("#addDialog").dialog("close");
                        }
                    },
                ]
            });
    })
}

