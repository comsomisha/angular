using System;
using System.Data.Sql;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class EditStudent : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (string.IsNullOrEmpty(Request.Params["id"]))
        {
            ShowError("Unknown ID");
            return;
        }

        long id = long.Parse(Request.Params["id"]);

        if (!IsPostBack)
        {
            loadData(id);
        }
        btnCancel.Click += BtnCancel_Click;
        btnSave.CommandArgument = id.ToString();
        btnSave.Click += BtnSave_Click;
    }

    private void BtnSave_Click(object sender, EventArgs e)
    {
        long id = long.Parse((sender as Button).CommandArgument);

        using (StrPO_2018Entities db = new StrPO_2018Entities())
        {
            var dbObject = editor.Data;
            dbObject.ID = id;            


            db.Students.Attach(dbObject);
            db.Entry(dbObject).State = System.Data.Entity.EntityState.Modified;
            
                /*(from s in db.Students where s.ID == id select s).FirstOrDefault();
            if (dbObject == null)
            {
                ShowError(string.Format("Student with ID = {0} is not found", id));
                return;
            }
            dbObject.Name = txtName.Text;
            dbObject.Surname = txtSurname.Text;
            dbObject.Group = int.Parse(txtGroup.Text);
            dbObject.Course = int.Parse(txtCourse.Text);*/
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

    private void loadData(long id)
    {
        using (StrPO_2018Entities db = new StrPO_2018Entities())
        {
            var dbObject = (from s in db.Students where s.ID == id select s).FirstOrDefault();
            if (dbObject == null)
            {
                ShowError(string.Format("Student with ID = {0} is not found", id));
                return;
            }
            editor.Data = dbObject;
        }
    }
}