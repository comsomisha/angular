<%@ Control Language="C#" AutoEventWireup="true" CodeFile="StudentControl.ascx.cs" Inherits="Controls_StudentControl" %>
<%@ Register Assembly="WebControlsLib" TagPrefix="strpo" Namespace="WebControlsLib"%>
        <asp:Label runat="server">
            Name
        </asp:Label>
        <asp:TextBox ID ="txtName" runat="server" CssClass="notEmpty"></asp:TextBox> 
            <br />
        <asp:Label runat="server">
            Surname
        </asp:Label>
        <asp:TextBox ID ="txtSurname" runat="server" CssClass="notEmpty"></asp:TextBox>
            <br />
        <asp:Label runat="server">
            Course
        </asp:Label>
        <asp:TextBox ID ="txtCourse" runat="server" CssClass="notEmpty"></asp:TextBox>
            <br />
        <asp:Label runat="server">
            Group
        </asp:Label>
        <asp:TextBox ID ="txtGroup" runat="server" CssClass="notEmpty"></asp:TextBox>
            <br />
        <strpo:SexRadioList ID="rblSex" runat="server" ></strpo:SexRadioList>
        
<script type="text/javascript">
    $(document).ready(
        
        function () {

            $(".notEmpty").change(
                function (ev) {
                    if ($(ev.target).val() == "" || $(ev.target).val() == "Can not be empty!") {
                        $(ev.target).val("Can not be empty!");
                        $(ev.target).css("color", "red");
                        $(ev.target).focus();
                        $("input[type='submit']").hide();
                    }
                    else {
                        $("input[type='submit']").fadeIn(1500);
                    }
                });
            $(".notEmpty").keydown(
                function (ev) {
                    if ($(ev.target).val() == "Can not be empty!") {
                        $(ev.target).val("");
                        $(ev.target).css("color", "");
                    };
                });
        });

    /*
    console.log("script running");
    window.onload = function () {
        var editName = document.getElementById("<%=txtName.ClientID%>");
        console.log(editName);
        editName.onchange = function () {
            console.log(editName.value);
            if (editName.value == '') {
                editName.value = "Can not be empty!";
                editName.style.color = "Red";
                editName.focus();
            }
        }
        editName.onkeydown = function () {
            if (editName.value == "Can not be empty!") {
                editName.style.color = "";
                editName.value = "";
            }

        }

    }*/
</script>