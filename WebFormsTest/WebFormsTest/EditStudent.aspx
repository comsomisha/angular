<%@ Page Language="C#" AutoEventWireup="true" CodeFile="EditStudent.aspx.cs" Inherits="EditStudent" %>
<%@ Register Src="~/Controls/StudentControl.ascx" TagName="StudentEditor" TagPrefix="strpo" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script type="text/javascript" src ="Scripts/jquery-1.10.2.min.js" ></script>
</head>
<body>
    <form id="frmEdit" runat="server">
        <asp:PlaceHolder id="phError" runat="server" Visible="false" >
            <asp:Label runat="server" ID="lblError" ForeColor="Red"></asp:Label>
        </asp:PlaceHolder>
        <asp:PlaceHolder id="phCtrls" runat="server" >
            <strpo:StudentEditor ID="editor" runat="server" />
        <asp:Button ID="btnCancel" runat="server" Text="Cancel" />
        <asp:Button ID="btnSave" runat="server" Text="Save" />
            <br />
        </asp:PlaceHolder>       
    </form>
</body>
</html>
