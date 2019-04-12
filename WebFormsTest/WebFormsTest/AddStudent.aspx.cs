using System;
using System.Data.Sql;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class AddStudent : System.Web.UI.Page
{

    protected void Page_Load(object sender, EventArgs e)
    {

        btnCancel.Click += BtnCancel_Click;
        btnSave.Click += BtnSave_Click;
    }

    private void BtnSave_Click(object sender, EventArgs e)
    {
        using (StrPO_2018Entities db = new StrPO_2018Entities())
        {
            Student dbObject = editor.Data;
            db.Students.Add(dbObject);
            db.SaveChanges();
        }
        Response.Redirect("MainForm.aspx");
    }

    private void BtnCancel_Click(object sender, EventArgs e)
    {
        Response.Redirect("MainForm.aspx");
    }

    private void ShowError(string sError)
    {
        lblError.Text = sError;
        phError.Visible = true;
        phCtrls.Visible = false;
    }
}