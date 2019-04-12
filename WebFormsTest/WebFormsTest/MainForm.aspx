<%@ Page Language="C#" AutoEventWireup="true" CodeFile="MainForm.aspx.cs" Inherits="MainForm" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdnColor" runat="server" />
        <label id="lblHello" runat="server">
            Hello ASP.NET
        </label>

        <asp:DataGrid ID="dgStudents" runat="server" DataSourceID="dsStudents" AllowSorting="true" AutoGenerateColumns="false">
            <Columns>
                <asp:BoundColumn DataField="Name" HeaderText="Name" SortExpression="Name"></asp:BoundColumn>
                <asp:BoundColumn DataField="Surname" HeaderText="Surname" SortExpression="Surname"></asp:BoundColumn>
                <asp:BoundColumn DataField="Birthday" HeaderText="Birthday"></asp:BoundColumn>
                <asp:BoundColumn DataField="Sex" HeaderText="Sex"></asp:BoundColumn>
                <asp:BoundColumn DataField="Course" HeaderText="Course"></asp:BoundColumn>
                <asp:BoundColumn DataField="Group" HeaderText="Group"></asp:BoundColumn>
                <asp:ButtonColumn ButtonType="PushButton" Text="Edit" CommandName="Edit"> </asp:ButtonColumn>
                <asp:ButtonColumn ButtonType="PushButton" Text="Delete" CommandName="Delete" ></asp:ButtonColumn>
            </Columns>
        </asp:DataGrid>

        <asp:sqldatasource id="dsStudents"
        selectcommand="Select * From [Students]"
        DeleteCommand="delete from [Students]"
        connectionstring="<%$ ConnectionStrings:StrPOConnection%>" 
        DataSourceMode ="DataSet"
        runat="server"/>
        


        <asp:Button id="btnAdd" runat="server" Text ="Add Student"/>
    </form>
</body>
</html>
